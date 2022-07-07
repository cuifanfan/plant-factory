<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      class=""
      hide-default-footer
      loading="true"
      loading-text="未查询到数据"
      :items-per-page="10"
      no-data-text="没有数据"
    >
      <template slot="top">
        <v-row class="py-5 px-7 pb-0" align="center">
          <my-search v-model="showSearch">
            <template slot="header">
              <v-text-field label="操作人电话" outlined style="max-width: 200px" dense v-model="phone"> </v-text-field>
              <v-text-field label="服务商" outlined style="max-width: 200px" dense class="ml-3" v-model="group">
              </v-text-field>
              <!-- <v-icon>mdi-menu-down</v-icon> -->

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
              <v-list-item class="pa-0 pt-1">
                <my-date v-model="startTime" text="开始日期"></my-date>
                <my-date v-model="endTime" text="结束日期" myclass="ml-3"></my-date>
              </v-list-item>
              <v-list-item class="pa-0 pt-1">
                <v-text-field
                  label="操作的模块"
                  outlined
                  style="max-width: 200px"
                  dense
                  v-model="module"
                ></v-text-field>
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

      <template slot="item.result" slot-scope="{ item }">
        <span :class="item.result ? 'green--text' : 'red--text'">{{ item.result ? "操作成功" : "操作失败" }}</span>
      </template>
      <template slot="footer" slot-scope="{}">
        <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import myDate from "../../../Components/Date.vue";
import mySearch from "../../../Components/Search.vue";
import exportExcel from "@/utils/exportExcel";
import { getProviderLogList, exportProviderLogs } from "@/api/log";
export default {
  data: () => ({
    //进度条
    process: false,
    showSearch: false,
    // 表格头部搜索框绑定的数据
    phone: undefined,
    group: undefined,
    module: undefined,
    startTime: undefined,
    endTime: undefined,
    // 页面相关绑定数据
    page: 1,
    size: 10,
    pages: 0,
    // 弹出框绑定数据
    waitToDel: "",
    dialog: false,
    dialogDel: false,
    selected: [],
    headers: [
      // { text: "ID", value: "id", sortable: false, align: "center", width: 10 },
      { text: "操作者", value: "phone", sortable: false, align: "center" },
      { text: "操作板块", value: "module", sortable: false, align: "center" },
      { text: "IP", value: "ip", sortable: false, align: "center" },
      { text: "操作类型", value: "type", sortable: false, align: "center" },
      { text: "操作结果", value: "result", align: "center", sortable: false },
      { text: "时间", value: "time", align: "center", sortable: false }
    ],
    desserts: []
  }),
  methods: {
    del() {},
    getdata() {
      getProviderLogList({
        phone: this.phone,
        group: this.group,
        module: this.module,
        startTime: this.startTime,
        endTime: this.endTime,
        page: this.page - 1,
        size: this.size
      }).then((value) => {
        let data = value.payload;
        // console.log(data.results);
        for (let i of data.results) {
          // console.log(i);
          i.time = i.time.split("T").join(" ");
        }
        this.desserts = data.results;

        this.pages = Math.ceil(data.total / this.size);
      });
    },

    exportExcel() {
      this.process = !this.process;
      setTimeout(() => {
        this.process = !this.process;
      }, 1000);
      exportProviderLogs({
        start: this.dateStart,
        end: this.dateEnd
      }).then(
        (value) => {
          // console.log(value);
          exportExcel(value, "日志");
        },
        (reason) => {
          console.log(reason);
          this.$message("error", reason.message);
        }
      );
    },

    search(page) {
      this.page = page;
      this.getdata();
    }
  },

  components: {
    myDate,
    mySearch
  },
  created() {
    this.getdata();
  }
};
</script>

<style></style>
