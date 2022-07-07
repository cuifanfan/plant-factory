<template>
  <div class="white pt-4">
    <v-row class="py-5 px-7 pb-0 mb-5">
      <v-text-field
        placeholder="模板名称"
        outlined
        style="max-width: 300px"
        dense
        hide-details
        class="ml-1 mr-5"
        v-model="target"
      ></v-text-field>

      <v-select
        :items="selectItems"
        label="分类"
        solo
        dense
        hide-details
        v-model="selected"
        style="max-width: 200px"
      ></v-select>
      <v-btn
        text
        class="light-blue darken-1 align-self-start ml-auto"
        color="white"
        depressed
        min-width="100"
        @click="search(1)"
      >
        搜索
      </v-btn>
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
        <v-img height="150" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="black" size="40" width="2"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-title class="font-weight-bold">
          {{ item.name }}

          <v-chip
            class="ma-2 font-weight-regular"
            color="green"
            text-color="white"
            small
            style="position: absolute; right: 0; top: 135px"
          >
            {{ item.categoryName }}
          </v-chip>
        </v-card-title>
        <v-card-text class="pb-0">
          <div>{{ item.intro }}</div>
        </v-card-text>
        <v-card-title class="font-weight-light py-2"> 规格大小 </v-card-title>
        <v-card-text class="pb-0">
          <div>{{ item.specList }}</div>
        </v-card-text>
        <v-card-title class="font-weight-light py-2"> 建议零售价:{{ item.suggestedPrice }}元 </v-card-title>

        <v-card-actions>
          <v-btn text disabled> </v-btn>
        </v-card-actions>
        <div style="position: absolute; bottom: 0; width: 100%">
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="use(item)"> 使用模板 </v-btn>
          </v-card-actions>
        </div>
      </v-card>

      <v-card width="300" v-for="i in add" :key="i + 'add'" class="mb-4" color="rgba(0,0,0,0)" elevation="0"></v-card>
      <my-dialog :dialog.sync="dialog" @click="dialog = false" :activeItem="activeItem"></my-dialog>
    </v-row>
  </div>
</template>

<script>
import { getAllCategory, getTemplateByid } from "@/api/commodity";
import myDialog from "./Dialog.vue";
export default {
  data: () => ({
    target: "",
    loading: false,
    selected: "",
    selectItems: [{ text: "加载中...", value: "213" }],
    dialog: false,
    activeItem: undefined,
    add: 4,
    len: 1,
    categories: [],
    dataList: [
      // {
      //   id: "",
      //   name: "商品名称",
      //   categoryId: "",
      //   intro: "加载中...",
      //   images: "",
      //   specList: "",
      //   suggestedPrice: "加载中...",
      // },
    ]
  }),

  methods: {
    // 设置对话框弹出时的活动的对象
    use(item) {
      this.dialog = true;
      this.activeItem = item;
    },
    // 用flex布局space-around 最后一行对齐
    getwid() {
      // console.log(this.$refs.row);
      try {
        let wid = this.$refs.row.offsetWidth;
        let perrow = parseInt(wid / 300);
        this.add = perrow - (this.len % perrow);
      } catch (e) {}
    },
    // 先获取所有分类 再循环请求每个分类
    getall() {
      this.loading = true;
      getAllCategory().then(async (value) => {
        let categories = value.payload.results;
        // console.log(categories);

        let newselect = [{ text: "全部", value: "all" }];
        for (let i = 0; i < categories.length; i++) {
          newselect.push({
            text: categories[i].categoryName,
            value: categories[i].id
          });
        }
        this.selectItems = newselect;

        let newList = [];
        for (let i = 0; i < categories.length; i++) {
          let value = await getTemplateByid(categories[i].id);
          let data = value.payload.results;
          // console.log(data);
          for (let item of data) {
            Object.defineProperty(item, "categoryName", {
              value: categories[i].categoryName,
              writable: true
            });
          }
          newList = newList.concat(data);
        }
        this.len = newList.length;
        this.dataList = newList;
        this.getwid();
        this.loading = false;
      });
    }
  },

  watch: {
    selected(newvalue, oldvalue) {
      // console.log(newvalue);
      if (newvalue == "all") {
        // console.log(123123);
        this.getall();
        return;
      }
      getTemplateByid(newvalue).then((value) => {
        console.log(value);
        let data = value.payload.results;
        // console.log(data);
        this.dataList = data;
        this.len = data.length;
        this.getwid();
      });
    }
  },

  created() {
    // 动态调整卡片布局
    window.addEventListener("resize", () => this.getwid());
    this.getall();
  },
  components: {
    myDialog
  }
};
</script>
