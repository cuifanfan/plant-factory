<template>
  <v-card flat>
    <v-card-title>
      商品列表
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      hide-default-footer
      loading="true"
      loading-text="未查询到数据"
    >
      <template slot="item.opeation" slot-scope="item">
        <v-btn color="primary" class="mr-2" x-small> 编辑 </v-btn>
        <v-btn
          color="error"
          @click="
            dialogDel = true;
            currId = item.item.id;
          "
          x-small
        >
          删除
        </v-btn>
      </template>
      <template v-slot:footer>
        <v-pagination :value="page" :length="pagelength" @input="getPage($event)"></v-pagination>
      </template>
      <template slot="item.moreInfo" slot-scope="item">
        <v-btn
          small
          @click="
            curritem = item.item;
            moreInfo = true;
          "
        >
          <v-icon>fas fa-caret-square-right</v-icon>
        </v-btn>
      </template>
      <template slot="item.remark" slot-scope="item">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-if="item.item.remark" v-on="on">{{ item.item.remark }}</span>
          </template>
          <span>{{ item.item.remark }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDel" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 确定要删除这个商品吗? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="del"> 删除 </v-btn>
          <v-btn color="green darken-1" text @click="dialogDel = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="moreInfo"
      class="elevation-0 dialog"
      max-width="500"
      ref="dialog"
    >
      <v-card class="mx-auto">
        <v-card-title>商品详情</v-card-title>
        <!-- 轮播图 -->
        <v-carousel
          height="300px"
          cycle
          interval="1500"
          delimiter-icon="mdi-minus"
          class="mb-5"
          hide-delimiter-background
        >
          <v-carousel-item v-for="(item, i) in carousel" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
        <v-card-text v-for="(value, key, index) in curritem" :key="index">
          <v-row v-if="key === 'specList'">
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8">
              <v-row v-for="(value, key, index) in value" :key="index">
                <v-col>{{ key + ":" + value }}</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8">{{ value }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { getProviderItems, deleteItem } from "@/api/commodity";
export default {
  data() {
    return {
      carousel: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      status: {
        id: "商品编号",
        name: "商品名称",
        intro: "商品介绍",
        desc: "商品描述",
        specList: "规格",
        suggestedPrice: "建议零售价",
        price: "商品价格",
        status: "商品状态",
        stock: "商品库存",
        remark: "备注",
        type: "商品类别"
      },
      moreInfo: false,
      currId: "",
      curritem: "",
      dialogDel: false,
      singleSelect: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "商品名称",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "建议零售价", value: "suggestedPrice" },
        { text: "实际销售价格", value: "price" },
        { text: "商品状态", value: "status", sortable: false },
        { text: "商品库存", value: "stock" },
        { text: "备注", value: "remark", sortable: false },
        { text: "商品类别", value: "type", sortable: false },
        { text: "详细信息", value: "moreInfo", sortable: false },
        {
          text: "操作",
          value: "opeation",
          align: "center",
          sortable: false,
          width: 150
        }
      ],
      desserts: [],
      page: 1,
      pagelength: 1,
      pagesize: 10
    };
  },
  methods: {
    del() {
      console.log(this.currId);
      deleteItem(this.currId).then(
        (data) => {
          this.$message("success", "删除成功");
          this.dialogDel = false;
          this.getProductList();
        },
        (error) => {
          console.log(error);
          this.$message("error", "删除失败");
          this.dialogDel = false;
        }
      );
    },
    getProductList() {
      getProviderItems({ page: this.page - 1, size: this.pagesize }).then((data) => {
        console.log(data);
        this.desserts = data.payload.results;
        this.pagelength = Math.ceil(data.payload.total / this.pagesize);
      });
    },
    getPage(newPage) {
      this.page = newPage;
    }
  },
  watch: {
    page: function () {
      this.getProductList();
    }
  },
  mounted() {
    this.$refs.dialog.classes.dialog = true;
    console.log(this.$refs.dialog);
    this.getProductList();
  }
};
</script>

<style>
.dialog::-webkit-scrollbar {
  width: 1px;
}
</style>
