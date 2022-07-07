<template>
  <div>
    <v-data-table
      :headers="dessertHeaders"
      :items="desserts"
      :page.sync="page"
      :items-per-page="pagesize"
      hide-default-footer
      @page-count="pagelength = $event"
      item-key="id"
      loading="true"
      loading-text="未查询到数据"
      disable-sort
      :search="search"
    >
      <template slot="top">
        <v-row class="py-5 px-7 pb-0" align="center">
          <my-search v-model="showSearch">
            <template slot="header">
              <v-text-field placeholder="订单号" outlined style="max-width: 200px" dense v-model="searchItem.source">
              </v-text-field>
              <v-text-field
                placeholder="收益类别"
                outlined
                style="max-width: 200px"
                dense
                class="ml-3"
                v-model="searchItem.type"
              >
              </v-text-field>
              <v-btn
                text
                class="light-blue darken-1 align-self-start ml-auto"
                color="white"
                depressed
                min-width="100"
                @click="searchInfo"
              >
                搜索
              </v-btn>
              <v-btn
                text
                class="px-1 mx-3 align-self-start"
                color="light-blue darken-1"
                @click="showSearch = !showSearch"
                >高级搜索
                <v-icon v-if="showSearch">mdi-menu-up</v-icon>
                <v-icon v-else>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item class="pa-0 py-1">
                <my-date v-model="searchItem.dateStart" text="开始日期"></my-date>
                <my-date v-model="searchItem.dateEnd" text="结束日期" myclass="ml-3"></my-date>
              </v-list-item>
            </v-list>
          </my-search>
        </v-row>
        <v-row class="py-5 px-7 pt-0">
          <v-btn tile color="white" small depressed class="light-blue darken-1" text @click="exportExcel">
            <div v-if="!process">导出excel</div>
            <div v-else>
              <v-progress-circular indeterminate color="grey lighten-2" size="25"></v-progress-circular>
            </div>
          </v-btn>
        </v-row>
      </template>
      <!-- 自定义金额列-->
      <!-- v-slot:item.amount="{ item }" -->
      <template slot="item.amount" slot-scope="{ item }">
        <span v-if="[1, 2].includes(item.type)" class="font-weight-bold" style="color: green">+ {{ item.amount }}</span>
        <span v-else class="font-weight-bold" style="color: red">- {{ item.amount }}</span>
      </template>

      <!-- // 自定义到账时间列 -->
      <template slot="item.completeTime" slot-scope="{ item }">
        {{ item.completeTime | getDate }}
      </template>
    </v-data-table>

    <!-- 外部分页器 -->
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pagelength" :total-visible="7"> </v-pagination>
    </div>
  </div>
</template>

<script>
import myDate from "../../../Components/Date.vue";
import mySearch from "../../../Components/Search.vue";
import exportExcel from "@/utils/exportExcel";
import { getProviderBillList, exportBills } from "@/api/bill";
export default {
  name: "OrderInfo",
  components: { myDate, mySearch },
  data() {
    return {
      //进度条
      process: false,
      // 点击高级搜索滑出下部搜索框
      showSearch: false,
      search: "",
      //状态列表
      items: ["create", "complete"],
      // 分页相关
      page: 1,
      pagelength: 0,
      pagesize: 10,
      // 用户在界面选择的搜索条件
      searchItem: {
        providerId: "",
        type: "",
        source: "",
        dateStart: "",
        dateEnd: ""
      },
      // 表格头部内容
      dessertHeaders: [
        {
          text: "收益来源(订单号)",
          align: "start",
          sortable: false,
          value: "source"
        },
        { text: "收益类别", value: "type" },
        { text: "金额", value: "amount" },
        { text: "到账日期", value: "completeTime" }
        // { text: "主键", value: "id" },
        // { text: "状态", value: "status" },
      ],
      // 表格数据
      desserts: []
    };
  },
  created() {
    // 获取要展示在表格中的内容
    getProviderBillList({
      page: this.page - 1,
      size: this.pagesize,
      timeOrder: "asc"
    }).then((data) => {
      this.desserts = data.payload.results;
      this.pagelength = Math.ceil(data.payload.total / this.pagesize);
    });
  },
  filters: {
    // 过滤日期
    getDate(date) {
      return date.split("T").join(" ");
    }
  },
  methods: {
    searchInfo() {
      // 根据用户选择的搜索信息搜索数据
      getProviderBillList({
        providerId: this.searchItem.providerId,
        type: this.searchItem.type,
        source: this.searchItem.source,
        start: this.searchItem.dateStart,
        end: this.searchItem.dateEnd,
        page: this.page - 1,
        size: this.pagesize,
        timeOrder: "asc"
      }).then((data) => {
        console.log(this.searchItem);
        console.log(data);
        this.desserts = data.payload.results;
        this.pagelength = Math.ceil(data.payload.total / this.pagesize);
      });
    },
    exportExcel() {
      this.process = !this.process;
      setTimeout(() => {
        this.process = !this.process;
      }, 1000);
      exportBills({
        start: this.searchItem.dateStart,
        end: this.searchItem.dateEnd
      }).then(
        (value) => {
          exportExcel(value, "财务信息");
        },
        (reason) => {
          console.log(reason);
          this.$message("error", reason.message);
        }
      );
    }
  }
};
</script>

<style scoped></style>
