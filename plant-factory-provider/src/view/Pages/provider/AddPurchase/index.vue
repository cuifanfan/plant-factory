<template>
  <div class="white pt-4">
    <v-row class="py-5 px-7 pb-0 mb-5">
      <v-text-field
        label="商品名称"
        outlined
        style="max-width: 300px"
        dense
        hide-details
        class="ml-1 mr-5"
        v-model="title"
        clearable
      ></v-text-field>

      <v-select
        :items="selectItems"
        placeholder="分类"
        solo
        dense
        hide-details
        v-model="selected"
        style="max-width: 200px"
        clearable
      ></v-select>
      <v-btn
        text
        class="light-blue darken-1 align-self-center ml-4"
        color="white"
        depressed
        min-width="100"
        @click="search(1)"
        >搜索</v-btn
      >
      <v-spacer></v-spacer>

      <v-badge class="mr-2" :color="ordernum === 0 ? 'white' : 'red'">
        <template slot="badge">{{ ordernum }}</template>
        <v-icon large @click="dialogShop = true">mdi-cart-minus</v-icon>
      </v-badge>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="space-around" ref="row" class="ma-0 pt-4">
      <v-skeleton-loader min-width="300" type="card" v-if="loading"></v-skeleton-loader>
      <v-card
        class="mb-4"
        max-width="300"
        min-width="300"
        v-for="(item, i) in dataList"
        :key="i"
        style="position: relative"
        hover
      >
        <div class="pa-2">
          <v-img height="200" :src="$staticpath.commodity + item.images[0]">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="black"
                  size="40"
                  width="2"
                  v-if="item.images[0]"
                ></v-progress-circular>
                <v-icon v-else x-large>mdi-close-outline</v-icon>
              </v-row>
            </template>
          </v-img>
        </div>
        <v-card-title class="font-weight-bold">
          {{ item.title }}
          <v-chip class="ma-2 font-weight-regular" color="green" text-color="white" small>
            {{ item.brand }}
          </v-chip>
        </v-card-title>
        <v-card-text class="pb-0">
          <div>{{ item.intro }}</div>
        </v-card-text>
        <!-- <v-card-title class="font-weight-light py-2">规格大小</v-card-title>
        <v-card-text class="pb-0">
          <div>{{ item.specList }}</div>
        </v-card-text> -->
        <v-card-title class="font-weight-light py-2 d-flex justify-space-between">
          <span>建议零售价</span>
          <span>{{ item.showPrice }}元</span>
        </v-card-title>

        <v-card-actions>
          <v-btn text disabled></v-btn>
        </v-card-actions>

        <div style="position: absolute; bottom: 0; width: 100%">
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" text @click="use(item)"> 选择规格 </v-btn>
          </v-card-actions>
        </div>
      </v-card>

      <v-card width="300" v-for="i in 10" :key="i + 'add'" color="rgba(0,0,0,0)" elevation="0"></v-card>
      <my-dialog :dialog.sync="dialog" @click="dialog = false" :activeItem="activeItem"></my-dialog>
      <shop-car :dialog="dialogShop" @click="dialogShop = false"></shop-car>
    </v-row>
    <v-row justify="center">
      <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
    </v-row>
  </div>
</template>

<script>
import { getShopCar } from "../../../../api/shopCar";
import { getCommonSpuList, getAllCategory } from "../../../../api/commodity";
import myDialog from "../AddPurchase/Dialog.vue";
import shopCar from "../AddPurchase/DialogShopCar.vue";
export default {
  data: () => ({
    loading: false,
    selected: undefined,
    selectItems: [{ text: "加载中...", value: "213" }],

    dialog: false,
    activeItem: undefined,

    dialogShop: false,

    dataList: [],

    number: 0,
    page: 1,
    size: 10,
    pages: 0,
    title: undefined,
    ordernum: 0
  }),

  methods: {
    // 设置对话框弹出时的活动的对象
    use(item) {
      this.dialog = true;
      this.activeItem = item;
    },

    getall() {
      this.loading = true;
      getCommonSpuList({
        page: this.page - 1,
        size: this.size,
        title: this.title,
        cid: this.selected
      }).then(async (value) => {
        // console.log(value);
        let data = value.payload;
        data.results.forEach((element) => {
          let price = element.showPrice;
          element.showPrice = (price / 100).toFixed(2);
          let images = element.images;
          element.images = images ? images.split(",") : "";
        });
        this.dataList = data.results;
        this.pages = Math.ceil(data.total / this.size);
        this.loading = false;
      });
    },

    search(page) {
      this.page = page;
      this.getall();
    },
    getShop() {
      getShopCar().then((value) => {
        // console.log(value);
        let data = value.payload;
        if (data && data.items) {
          this.ordernum = data.items.length;
          return;
        }
        this.ordernum = 0;
      });
    },

    getAllCategory() {
      getAllCategory().then((value) => {
        let data = value.payload;
        this.selectItems = data.results.map((value, index) => {
          return {
            text: value.categoryName,
            value: value.id
          };
        });
      });
    }
  },

  created() {
    this.getall();
    this.getShop();
    this.getAllCategory();
  },
  components: {
    myDialog,
    shopCar
  }
};
</script>
