<template>
  <v-dialog v-model="dialog" persistent max-width="800px" no-click-animation>
    <v-card>
      <v-card-title style="position: fixed; z-index: 9999; width: 800px" class="white">
        <span class="text-h5">商品详情</span>
        <v-spacer></v-spacer>
        <v-icon large @click="reset">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="pt-16">
        <v-tabs v-model="tab">
          <v-tab>总览</v-tab>
          <v-tab>明细</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            ><v-card flat class="mt-3">
              <v-row>
                <v-col cols="7">
                  <v-card-text>
                    <v-row>
                      <v-col class="text-h6 textStyle" cols="3">名称:</v-col>
                      <v-col style="text-align: right">
                        <v-text-field placeholder="标题" outlined dense hide-details v-model="newActiveItem.title" :disabled="disabled"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="text-h6 textStyle" cols="3">副标题:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-text-field placeholder="副标题" outlined dense hide-details :disabled="disabled" v-model="newActiveItem.subtitle"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="text-h6 textStyle" cols="3">品牌:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-text-field placeholder="品牌" outlined dense :disabled="disabled" hide-details v-model="newActiveItem.brand"></v-text-field>
                      </v-col> </v-row
                    ><v-row>
                      <v-col class="text-h6 textStyle" cols="3">分类:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-select
                          :items="ciditem"
                          label="分类"
                          item-text="categoryName"
                          item-value="id"
                          v-model="newActiveItem.cid"
                          outlined
                          :disabled="disabled"
                          full-width
                          dense
                          hide-details
                        ></v-select>
                      </v-col> </v-row
                    ><v-row class="mb-1">
                      <v-col class="text-h6 textStyle" cols="3">状态:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-select :items="selectItems" label="状态" solo full-width :disabled="disabled" dense hide-details v-model="newActiveItem.status"></v-select>
                      </v-col> </v-row
                    ><v-row class="mb-1">
                      <v-col class="text-h6 textStyle" cols="3">类型:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-select :items="typeItem" label="类型" solo full-width :disabled="disabled" dense hide-details v-model="newActiveItem.type"></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1">
                      <v-col class="text-h6 textStyle" cols="4">创建时间:</v-col>
                      <v-col class="body-1 black--text textStyle" style="text-align: right">{{ activeItem.createTime }} </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="5">
                  <v-carousel cycle show-arrows-on-hover height="270" continuous hide-delimiter-background interval="8000" v-model="index">
                    <v-carousel-item v-for="(link, i) in activeItem.images" :key="i">
                      <div>
                        <v-img height="270" contain :src="$staticpath.commodity + link"></v-img>
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                  <div>
                    <div class="d-flex justify-center mt-4">
                      <v-btn text class="light-blue darken-1" color="white" depressed min-width="100" @click="setMainImage"> 设为主图 </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mb-4"></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-card-text>
                    <v-row v-for="spec in newActiveItem.specs" :key="spec.title">
                      <v-col class="text-h6 textStyle">{{ spec.title }}:</v-col>
                      <v-col class="body-1 black--text" style="text-align: right">
                        <v-text-field :placeholder="spec.title" outlined dense hide-details :disabled="disabled" v-model="spec.value"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row v-for="(spec, index) in newspecs" :key="index">
                      <v-col cols="6" class="body-1 black--text">
                        <v-text-field placeholder="规格名称" outlined dense hide-details :disabled="disabled" v-model="spec.title"></v-text-field>
                      </v-col>
                      <v-col cols="6" class="body-1 black--text" style="text-align: right">
                        <v-text-field placeholder="规格内容" outlined dense hide-details :disabled="disabled" v-model="spec.value"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-row class="my-auto" style="margin-top: 6px" v-for="(spec, index) in newActiveItem.specs" :key="spec.title">
                    <v-col
                      ><v-btn fab dark v-show="!disabled" color="grey" depressed small @click="deleteSpec(index)"><v-icon dark> mdi-trash-can-outline </v-icon></v-btn></v-col
                    >
                  </v-row>
                  <v-row class="my-auto" style="margin-top: 6px" v-for="(spec, index) in newspecs" :key="index">
                    <v-col
                      ><v-btn fab dark v-show="!disabled" color="grey" depressed small @click="deleteNewSpec(index)"><v-icon dark> mdi-trash-can-outline </v-icon></v-btn></v-col
                    >
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mt-n4 ml-1">
                <v-col v-if="!disabled">
                  <v-btn text class="light-blue darken-1" color="white" depressed :disabled="disabled" min-width="100" @click="addSpec"> 添加规格 </v-btn>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-col>
                  <v-card-text>
                    <v-row v-for="(specOption, index) in activeItem.specOptions" :key="index" :class="index == activeItem.specOptions.length - 1 ? '' : 'mb-10'">
                      <v-col cols="2" class="text-h6 textStyle">{{ specOption.title }}:</v-col>
                      <v-col cols="1"></v-col>
                      <v-col cols="2" v-for="(item, index) in specOption.options" :key="index" class="body-1 black--text textStyle text-center mr-10 grey lighten-4">
                        {{ item }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-row>
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6"> 图片管理 </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row style="padding: 0 20px">
                        <v-col v-for="(link, n) in activeItem.images" :key="n" class="d-flex child-flex imgStyle" cols="4">
                          <v-btn v-show="n == activeImg" icon class="butStyle" @click="deleteSpuImage(n)" @mouseleave="out" @mouseover="enter(n)" :class="[n == activeImg ? 'actImgStyle' : '']">
                            <v-icon small color="red" dark>mdi-close-circle-outline</v-icon>
                          </v-btn>
                          <v-img :src="$staticpath.commodity + link" aspect-ratio="1" class="grey lighten-2" @mouseleave="out" @mouseover="enter(n)">
                            <v-overlay absolute :value="n == activeImg">
                              <v-btn class="iconStyle" v-if="n == activeImg" @click="setMainImage(true, true)"> 设为主图 </v-btn>
                            </v-overlay>
                            <!-- <v-btn
                              class="iconStyle"
                              v-if="n == activeImg"
                              @click="setMainImage(true, true)"
                            >
                              设为主图
                            </v-btn> -->
                          </v-img>
                        </v-col></v-row
                      >
                      <v-row style="padding: 0 20px">
                        <v-col cols="4">
                          <v-file-input
                            small-chips
                            light
                            prepend-icon=""
                            prepend-inner-icon="mdi-text-box-plus"
                            outlined
                            counter
                            dense
                            multiple
                            label="上传图片"
                            accept="image/png, image/jpeg, image/jpg"
                            v-model="file"
                            @change="vaild"
                            :error-messages="errmsg"
                          ></v-file-input>
                        </v-col>
                        <v-col class="ml-n4">
                          <v-btn icon>
                            <v-icon color="green" dark @click="uploadImg">mdi-tray-arrow-up</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel></v-expansion-panels
                >
              </v-row>
              <v-divider></v-divider>
              <v-card-actions class="mt-5">
                <div class="mx-auto">
                  <v-btn text style="border: 1px solid #eeeeee" depressed min-width="100" @click="disabled = !disabled"> 编辑 </v-btn>
                  <v-btn text class="light-blue darken-1 ml-3" color="white" depressed min-width="100" @click="updataSpu"> 保存 </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item
            ><v-data-table :headers="headers" :items="desserts" hide-default-footer loading="true" loading-text="未查询到数据">
              <template slot="item.suggestPrice" slot-scope="item">
                <v-text-field
                  placeholder="建议价格"
                  outlined
                  dense
                  hide-details
                  style="max-width: 110px; display: inline-block; margin: 0, auto"
                  :disabled="disabled"
                  :value="item.item.suggestPrice"
                  @input="chagePrice($event, item.item, 'suggestPrice')"
                ></v-text-field>
              </template>
              <template slot="item.price" slot-scope="item">
                <v-text-field
                  placeholder="价格"
                  outlined
                  dense
                  hide-details
                  style="max-width: 110px; display: inline-block; margin: 0, auto"
                  :disabled="disabled"
                  :value="item.item.price"
                  @input="chagePrice($event, item.item, 'price')"
                ></v-text-field> </template
              ><template slot="item.status" slot-scope="item">
                <v-select
                  :items="productItems"
                  label="分类"
                  outlined
                  dense
                  :rules="rules"
                  :disabled="disabled"
                  hide-details
                  :value="item.item.status"
                  @input="chagePrice($event, item.item, 'status')"
                  style="max-width: 110px; display: inline-block; margin: 0, autp"
                ></v-select>
              </template>
            </v-data-table>
            <!-- <v-divider></v-divider> -->
            <v-card-actions class="mt-5">
              <div class="mx-auto">
                <v-btn text style="border: 1px solid #eeeeee" depressed min-width="100" @click="disabled = !disabled"> 编辑 </v-btn>
                <v-btn text class="light-blue darken-1 ml-3" color="white" depressed min-width="100" @click="updataSku"> 保存 </v-btn>
              </div>
            </v-card-actions>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { setMainImage, getAllCategory, updataSpu, getCommonSkuListByid, uploadSpuImages, deleteSpuImage, updateSkus } from "@/api/commodity";

export default {
  props: {
    dialog: { default: false },
    activeItem: {
      default() {
        return {
          title: ""
        };
      }
    }
  },
  data() {
    return {
      errmsg: "",
      //上传图片file
      file: undefined,
      activeImg: -1,
      headers: [],
      desserts: [],
      page: 0,
      pagelength: 1,
      tab: null,
      rules: [(v) => !!v || v === 0 || "请填写完整"],
      //更换的图片索引
      index: "",
      newActiveItem: {
        specs: []
      },
      newspecs: [],
      ciditem: [],
      //添加商品状态选择
      productItems: [
        { text: "可用", value: 1 },
        { text: "不可用", value: 0 }
      ],
      //状态选择
      selectItems: [
        { text: "上架", value: 1 },
        { text: "下架", value: 0 }
      ],
      typeItem: [
        { text: "积分商品", value: 1 },
        {
          text: "普通商品",
          value: 2
        }
      ],
      disabled: true
    };
  },
  methods: {
    //更新新的数值，并将changed变为true
    chagePrice(event, text, property) {
      text[property] = event;
      text.changed = true;
      console.log(text);
    },
    //更新sku信息
    updataSku() {
      let data = [];
      this.desserts.forEach((sku) => {
        if (sku.changed) {
          sku.price = sku.price * 100;
          sku.suggestPrice = sku.suggestPrice * 100;
          data.push(sku);
        }
      });
      updateSkus(data).then(
        (res) => {
          this.$message("success", "数据保存成功");
          this.$emit("update");
          this.reset();
        },
        (err) => {
          this.$message("error", "保存失败，请联系系统管理员");
        }
      );
    },
    //删除图片
    deleteSpuImage(n) {
      deleteSpuImage({
        spuId: this.activeItem.id,
        imageIndex: n
      }).then(
        (res) => {
          this.$message("success", "删除图片成功");
          this.$emit("update");
          this.reset();
        },
        (err) => {
          this.$message("error", err.message);
        }
      );
    },
    //上传商品图片
    uploadImg() {
      if (this.vaild()) {
        let formata = new FormData();
        this.file.forEach((file) => {
          formata.append("image", file);
        });
        uploadSpuImages({
          spuId: this.newActiveItem.id,
          image: formata
        }).then(
          (res) => {
            this.$message("success", "已成功上传图片");
            this.$emit("update");
            this.file = null;
            this.reset();
          },
          (err) => {
            this.$message("error", err.message);
          }
        );
      }
    },
    //上传商品图片验证
    vaild() {
      let flag = true;
      this.file.forEach((img) => {
        if (img.size > 1048576) {
          console.log(img.size);
          flag = false;
        }
      });
      if (flag) {
        this.errmsg = "";
        return true;
      } else {
        this.errmsg = "单个照片最大不能超过 1 MB!";
        return false;
      }
    },
    // 鼠标移出
    //activeImg代表活跃的img的索引移出设为-1
    out() {
      this.activeImg = -1;
    },
    //鼠标移入
    enter(n) {
      window.clearTimeout(this.timeoutId);
      this.activeImg = n;
    },
    addSpec() {
      this.newspecs.push({ title: "", value: "" });
    },
    deleteSpec(index) {
      this.newActiveItem.specs.splice(index, 1);
      console.log(this.newActiveItem.specs);
    },
    deleteNewSpec(index) {
      this.newspecs.splice(index, 1);
    },
    reset() {
      this.disabled = true;
      this.newspecs = [];
      this.$emit("update:dialog", false);
    },
    setMainImage(e, isSecondSetImg) {
      if (isSecondSetImg) {
        this.index = this.activeImg;
      }
      setMainImage({
        spuId: this.activeItem.id,
        imageIndex: this.index
      }).then(
        (res) => {
          this.$message("success", "更换主图成功");
          this.$emit("update:dialog", false);
          this.$emit("update");
          console.log(res);
        },
        (err) => {
          this.$message("error", err.message);
        }
      );
      // console.log(this.index)
    },
    updataSpu() {
      delete this.newActiveItem.images;
      delete this.newActiveItem.createTime;
      delete this.newActiveItem.showPrice;
      delete this.newActiveItem.updateTime;
      console.log(this.newActiveItem);
      //合并新数组
      this.newActiveItem.specs = this.newActiveItem.specs.concat(this.newspecs);
      updataSpu(this.newActiveItem).then((res) => {
        this.$message("success", "修改规格成功");
        this.reset();
        this.$emit("update");
      });
    }
  },
  created() {
    getAllCategory().then((res) => {
      this.ciditem = res.payload.results;
      console.log(this.ciditem);
    });
    console.log(this.activeItem);
  },
  watch: {
    dialog(newvalue) {
      if (newvalue) {
        this.newActiveItem = JSON.parse(JSON.stringify(this.activeItem));

        //处理明细中的详细信息,详情请打印下面的res，根据res处理成表格数据。
        //仔细体会newOption[spec[i].title] = spec[i].options[indexs[i]]这句代码。
        getCommonSkuListByid(this.activeItem.id).then((res) => {
          let data = res.payload;
          let spec = this.activeItem.specOptions;
          console.log(spec);
          this.headers = [];
          this.desserts = [];
          console.log(res);
          data.forEach((element) => {
            //后端数据库根据分来存储，处理成元。
            element.price = element.price / 100;
            element.suggestPrice = element.suggestPrice / 100;
            let indexs = element.indexes.split("_");
            let newOption = {};
            for (let i = 0; i < spec.length; i++) {
              //将索引变为真实的数据，例如0_0就是第一个spec的0，第二个spec的0
              newOption[spec[i].title] = spec[i].options[indexs[i]];
            }
            //加入pric、id
            newOption["price"] = element.price;
            newOption["suggestPrice"] = element.suggestPrice;
            newOption["id"] = element.id;
            newOption["status"] = element.status;
            newOption["changed"] = false;
            this.desserts.push(newOption);
          });
          spec.forEach((specItem) => {
            let headerItem = {};
            headerItem["text"] = specItem.title;
            headerItem["value"] = specItem.title;
            headerItem["sortable"] = false;
            headerItem["align"] = "center";
            this.headers.push(headerItem);
          });
          this.headers.push(
            {
              text: "价格",
              value: "price",
              sortable: false,
              align: "center"
            },
            {
              text: "建议价格",
              value: "suggestPrice",
              sortable: false,
              align: "center"
            },
            {
              text: "状态",
              value: "status",
              sortable: false,
              align: "center"
            }
          );
        });
      }
    }
  }
};
</script>

<style>
.textStyle {
  color: black;
}
.textStyle::before {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}
.imgStyle {
  position: relative;
}
.butStyle {
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 0;
  transform: translate(20%, -20%);
}
.iconStyle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.actImgStyle {
  /* transform: scale(1.5);
  transition: all 2s; */
  width: 500px;
}
</style>
