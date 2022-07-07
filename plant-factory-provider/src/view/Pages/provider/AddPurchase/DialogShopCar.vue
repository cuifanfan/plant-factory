<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          购物车信息
          <span class="grey--text lighten-1">(共{{ desserts.length }}件商品)</span>
        </span>
        <v-btn plain depressed class="text-body-1 font-weight-medium ml-5" @click="clearShop">
          <v-icon left>mdi-trash-can-outline</v-icon>
          清空购物车
        </v-btn>
        <v-spacer></v-spacer>
        <v-icon large @click="$emit('click')">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="py-0 pt-4">
        <v-list subheader two-line>
          <v-list-item v-for="(value, index) in desserts" :key="index">
            <v-list-item-avatar tile>
              <v-img :src="$staticpath.commodity + value.sku.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-h6 font-weight-bold">{{ value.sku.title }}</v-list-item-title>
              <v-list-item-subtitle class="red--text text-body-1 d-flex align-center">
                ￥{{ (value.sku.price / 100).toFixed(2) }}
                <v-spacer></v-spacer>
                <button class="border" @click="sub(value)">
                  <v-icon>mdi-minus</v-icon>
                </button>
                <span class="text-h6 text-center px-4 black--text">
                  {{ value.quantity }}
                </span>
                <button class="border yellow" @click="add(value)">
                  <v-icon>mdi-plus</v-icon>
                </button>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" class="success" text @click="createOrder"> 结算 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getShopCar, clearShopCar, updateShopCar } from "../../../../api/shopCar";
import { createProviderOrder } from "../../../../api/order";
import { getCommonSku } from "../../../../api/commodity";
export default {
  props: ["dialog"],
  data() {
    return {
      headers: [
        {
          text: "商品名称",
          value: "title",
          sortable: false,
          align: "start"
        },
        { text: "数量", value: "number", align: "start", sortable: false }
      ],
      desserts: [],

      folders: [
        {
          subtitle: "Jan 9, 2014",
          title: "Photos"
        },
        {
          subtitle: "Jan 17, 2014",
          title: "Recipes"
        },
        {
          subtitle: "Jan 28, 2014",
          title: "Work"
        }
      ]
    };
  },

  watch: {
    dialog(value) {
      if (value) {
        this.getShop();
      }
    }
  },

  methods: {
    clearShop() {
      clearShopCar().then((value) => {
        console.log(value);
        this.desserts = [];
        this.$message("success", "购物车已清空");
        this.$parent.getShop();
      });
    },

    getShop() {
      getShopCar().then(async (value) => {
        // console.log(value);
        let data = value.payload;
        if (!data) return;

        let newData = data.items.map((v) => {
          return new Promise((resolve) => {
            getCommonSku(v.skuId).then((value) => {
              v.sku = value.payload;
              resolve(v);
            });
          });
        });

        let result = await Promise.all(newData);

        console.log(result);

        this.desserts = result;
      });
    },

    createOrder() {
      createProviderOrder({
        rcvName: "ZYJ",
        rcvPhone: "11011011011",
        rcvAddr: "秋名山",
        remark: "测试"
      }).then(
        (value) => {
          // console.log(value);
          this.$message("success", "结算成功,订单已生成");
          this.desserts = [];
          this.$emit("click");
          this.$parent.getShop();
        },
        (reason) => {
          this.$message("error", "结算失败");
        }
      );
    },
    sub(value) {
      if (value.quantity <= 1) {
        value.quantity--;
        let data = [];
        for (let item of this.desserts) {
          if (!item.number) continue;
          data.push({
            skuId: item.skuId,
            quantity: item.quantity
          });
        }
        updateShopCar({ items: data }).then((value) => {
          this.getShop();
        });
        return;
      }
      value.quantity--;
      this.update();
    },
    add(value) {
      value.quantity++;
      this.update();
    },
    update() {
      let data = [];
      for (let item of this.desserts) {
        data.push({
          skuId: item.skuId,
          quantity: item.quantity
        });
      }
      updateShopCar({ items: data }).then((value) => {});
    }
  }
};
</script>

<style scoped>
.border {
  border: 1px solid yellow;
  border-radius: 10px;
}
</style>
