<template>
  <v-dialog v-model="dialog" persistent max-width="800px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title style="position: fixed; z-index: 9999; width: 800px" class="white">
        <span class="text-h5">商品详情</span>
        <v-spacer></v-spacer>
        <v-icon large @click="reset">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="pt-16">
        <v-row class="flex-nowrap">
          <v-col cols="6" class="d-flex align-center">
            <v-carousel cycle show-arrows-on-hover height="auto" hide-delimiter-background interval="2000">
              <v-carousel-item v-for="(link, i) in activeItem.images" :key="i">
                <v-img :src="$staticpath.commodity + link"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col>
            <v-card flat>
              <v-card-title>
                <span class="text-h6 font-weight-bold">{{ activeItem.title }}</span>
              </v-card-title>
              <v-card-text class="py-0">
                <p class="d-flex justify-space-between mb-1">
                  <span class="subtitle-1">建议价格:</span>
                  <span class="body-1 black--text"> {{ activeItem.showPrice }}元 </span>
                </p>

                <p class="d-flex justify-space-between mb-1">
                  <span class="subtitle-1">品牌:</span>
                  <span class="body-1 black--text">{{ activeItem.brand }}</span>
                </p>
                <p class="d-flex justify-space-between mb-1">
                  <span class="subtitle-1">状态:</span>
                  <span class="body-1 black--text">{{ activeItem.status === 1 ? "正常" : "禁用" }}</span>
                </p>
                <v-divider class="mb-2"></v-divider>
                <p class="d-flex justify-space-between mb-1" v-for="(value, key) in activeItem.specs" :key="key">
                  <span class="subtitle-1">{{ value.title }}:</span>
                  <span class="body-1 black--text">{{ value.value }}</span>
                </p>
                <p class="d-flex flex-wrap mb-1" v-for="(value, i) in activeItem.specOptions" :key="'a' + i">
                  <span class="subtitle-1 d-flex align-center" style="width: 100%">{{ value.title }}:</span>
                  <v-btn-toggle
                    :value="bindSku[i]"
                    @change="
                      changeStatus(i, $event);
                      showPrice();
                    "
                    dense
                    group
                    color="indigo"
                    class="d-flex flex-wrap"
                  >
                    <v-btn
                      text
                      outlined
                      :value="j"
                      v-for="(itm, j) in value.options"
                      :key="j"
                      class="border"
                      :disabled="isdisable(i, j)"
                    >
                      {{ itm }}
                    </v-btn>
                  </v-btn-toggle>
                </p>
                <p class="d-flex mb-1 flex-wrap align-start mt-2">
                  <span class="subtitle-1 pt-1 pr-2">数量:</span>
                  <v-text-field
                    ref="text"
                    v-model="number"
                    outlined
                    dense
                    style="max-width: 120px; text-align: center"
                    :error-messages="err"
                    @input="valid"
                    class="text-center aaaa"
                  >
                    <template slot="append">
                      <v-icon @click="number++">mdi-plus</v-icon>
                    </template>
                    <template slot="prepend-inner">
                      <v-icon @click="sub">mdi-minus</v-icon>
                    </template>
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn color="white" class="red ml-2" text tile style="margin-top: 2px" @click="addToShopCar">
                    加入购物车
                  </v-btn>
                </p>
                <p class="ma-0 red--text text-body-1">￥{{ (price / 100).toFixed(2) }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/*
 * 实现不同标签的选择 以及禁用
 * skus是请求的所有可能选择的组合
 * skuStatus是为了显示哪些是禁用状态的标签 假如选择第一行标签的第二个 那么skuStatus[0]==2
 * bindSku这个数组实现的对上面多重按钮组的绑定
 * 说明 当每选择一次标签就会触发:disabled="isdisable"中isdisable()的调用
 * 请后来的维护人员首先弄清后端的传值 再仔细阅读该代码
 */
import { getCommonSkuList } from "../../../../api/commodity";
import { updateShopCar, getShopCar } from "../../../../api/shopCar";
export default {
  props: {
    dialog: {},
    activeItem: {
      type: Object,
      default: function () {
        return {
          name: "123"
        };
      }
    }
  },
  data: () => ({
    skus: [],
    skuStatus: [],
    bindSku: [],

    err: "",
    number: 1,
    price: 0
  }),
  methods: {
    getdata() {
      getCommonSkuList(this.activeItem.id).then(
        (value) => {
          // console.log(value);
          let data = value.payload;
          this.skus = data;
        },
        (reason) => {
          this.$message("error", "网络请求失败，请刷新重试");
        }
      );
    },
    changeStatus(indexp, indexsku) {
      this.skuStatus[indexp] = indexsku;
      this.bindSku[indexp] = indexsku;
      this.skuStatus = this.skuStatus.slice();

      if (indexp < this.bindSku.length - 1) {
        this.bindSku[this.bindSku.length - 1] = undefined;
      }
    },

    isdisable(indexp, indexsku) {
      // 判断只有一行标签的情况
      if (this.skuStatus.length === 1) {
        for (let item of this.skus) {
          if (indexsku.toString() === item.indexes) {
            if (item.status) {
              return false;
            } else {
              return true;
            }
          }
        }

        return true;
      }

      // 只监控最后一行标签的禁用状态
      if (indexp < this.skuStatus.length - 1) return false;

      this.skuStatus[indexp] = indexsku;
      let list = [];
      for (let i = 0; i <= indexp; i++) {
        // console.log(this.skuStatus[i]);
        if (this.skuStatus[i] == undefined) {
          // console.log("un");
          return false;
        }
        list.push(this.skuStatus[i]);
      }
      let indexes = list.join("_");
      //   console.log(indexes);
      for (let item of this.skus) {
        if (indexes === item.indexes) {
          if (item.status) {
            //   console.log(item.status);
            return false;
          } else {
            return true;
          }
        }
      }
      return true;
    },

    addToShopCar() {
      if (!this.valid()) return;

      if (this.bindSku.includes(undefined)) {
        this.$message("warning", "所有规格都必须选择");
        return;
      }
      let indexes = this.bindSku.join("_");
      let data = [];
      let cur;

      for (let item of this.skus) {
        if (indexes === item.indexes) {
          cur = {
            skuId: item.id,
            quantity: Number(this.number)
          };
          data.push(cur);
        }
      }
      getShopCar().then((value) => {
        let data1 = value.payload;
        // console.log(data1);
        if (data1 && data1.items) {
          for (let item of data1.items) {
            let num = item.quantity;
            let id = item.skuId;
            // 判断当前商品是否已存在购物车，如果存在则覆盖原来的
            if (id === cur.skuId) {
              data.shift();
              num = cur.quantity;
            }
            data.push({
              skuId: id,
              quantity: num
            });
          }
        }
        // console.log(data);
        updateShopCar({ items: data }).then((value) => {
          // console.log(value);
          this.$message("success", "添加至购物车成功");
          this.$parent.getShop();
          this.reset();
        });
      });
    },

    valid() {
      let v = this.number;
      if (/^[\d]+$/.test(v) && parseInt(v) > 0) {
        this.err = "";
        return true;
      } else {
        this.err = "必须为大于0整数";
        return false;
      }
    },

    reset() {
      this.$emit("click");
      this.bindSku = [];
      this.number = 1;
      this.err = "";
    },

    sub() {
      if (this.number <= 1) return;
      this.number--;
    },

    showPrice() {
      for (let i of this.bindSku) {
        if (i == undefined) {
          this.price = 0;
          return;
        }
      }
      let indexes = this.bindSku.join("_");
      for (let item of this.skus) {
        if (indexes === item.indexes) {
          this.price = item.price;
        }
      }
    }
  },

  watch: {
    // 监控被选择的商品是否传来了值
    dialog(value) {
      setTimeout(() => {
        let text = this.$refs.text.$refs.input;
        text.style.textAlign = "center";
      });
      if (value) {
        this.getdata();
        this.skuStatus = new Array(Object.keys(this.activeItem.specOptions).length);
        this.bindSku = new Array(Object.keys(this.activeItem.specOptions).length);
        // console.log(this);
        //   console.log(this.skuStatus);
      }
    }
  }
};
</script>

<style scoped>
.scoll::-webkit-scrollbar {
  width: 5px;
}
.scoll::-webkit-scrollbar-thumb {
  background-color: tomato;
}
.border {
  border: 1px solid rgba(0, 0, 0, 0.5) !important;
}
</style>
<style>
/* #input-148 {
  text-align: center !important;
} */
.aaaa .v-text-field--outlined .v-text-field__slot,
.v-text-field--single-line .v-text-field__slot {
  justify-content: center !important;
}
</style>
