<template>
  <div>
    <v-data-table
      :headers="dessertHeaders"
      :items="desserts"
      :expanded.sync="expanded"
      :page.sync="page"
      :items-per-page="pagesize"
      hide-default-footer
      @page-count="pagelength = $event"
      item-key="id"
      :search="search"
      disable-sort
      loading="true"
      loading-text="未查询到数据"
    >
      <template slot="top">
        <v-form ref="form">
          <v-row class="py-5 px-7 pb-0" align="center">
            <my-search v-model="showSearch">
              <template slot="header">
                <v-text-field
                  placeholder="设备所有者电话"
                  label="设备所有者电话"
                  style="max-width: 200px"
                  dense
                  outlined
                  :rules="[rules.number]"
                  v-model="searchForm.owner"
                ></v-text-field>
                <v-text-field
                  placeholder="设备的mac地址"
                  outlined
                  label="设备的mac地址"
                  style="max-width: 200px"
                  :rules="[rules.mac]"
                  dense
                  class="ml-3"
                  v-model="searchForm.mac"
                ></v-text-field>
                <!-- <v-icon>mdi-menu-down</v-icon> -->

                <v-btn
                  text
                  class="light-blue align-self-start darken-1 ml-auto"
                  color="white"
                  depressed
                  min-width="100"
                  @click="searchDevice()"
                >
                  搜索
                </v-btn>
                <v-btn
                  text
                  class="pa-1 ml-3 align-self-start"
                  color="light-blue darken-1"
                  @click="showSearch = !showSearch"
                  >高级搜索
                  <v-icon v-if="showSearch">mdi-menu-up</v-icon>
                  <v-icon v-else>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list class="pa-0 mt-1">
                <v-list-item class="pa-0" style="height: 60px">
                  <my-date v-model="searchForm.startActiveTime" style="max-width: 200px" text="起始激活时间"></my-date>
                  <my-date v-model="searchForm.endActiveTime" myclass="ml-3" text="结束激活时间"></my-date>
                </v-list-item>
                <v-list-item class="pa-0 mt-2" style="height: 60px">
                  <my-date v-model="searchForm.startProdTime" style="max-width: 200px" text="起始生产日期"></my-date>
                  <my-date v-model="searchForm.endProdTime" myclass="ml-3" text="结束生产日期"></my-date>
                </v-list-item>
                <v-list-item class="pa-0 mt-1" style="height: 60px">
                  <v-text-field
                    placeholder="设备型号"
                    outlined
                    label="设备型号"
                    style="max-width: 200px"
                    dense
                    v-model="searchForm.model"
                  ></v-text-field>
                </v-list-item>
              </v-list>
            </my-search>
          </v-row>
          <!-- <v-row class="py-5 px-7 mt-n4">
            <v-btn
              tile
              color="white"
              small
              depressed
              class="light-blue darken-1"
              text
              @click="exportExcel()"
            >
              导出excel
            </v-btn>
          </v-row>-->
        </v-form>
      </template>
      <template slot="footer" slot-scope="">
        <v-pagination v-model="page" :length="pagelength"></v-pagination>
      </template>

      <template slot="item.moreInfo" slot-scope="item">
        <v-btn
          min-width="90px"
          class="white--text text--lighten-1"
          color="#039be5"
          depressed
          small
          @click="
            curritem = item.item;
            showDialog = true;
          "
        >
          详情</v-btn
        >
      </template>

      <template slot="item.status" slot-scope="item">
        {{ DeviceStatus[item.item.status] }}
      </template>
    </v-data-table>

    <v-dialog transition="dialog-bottom-transition" v-model="showDialog" class="elevation-0" max-width="500">
      <v-card class="mx-auto">
        <v-card-title>设备详情</v-card-title>
        <v-card-text v-for="(value, key, index) in curritem" :key="index">
          <v-row>
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8">{{ getvalue(key, value) }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getDeviceList } from "@/api/device";
import mySearch from "../../../Components/Search.vue";
import myDate from "../../../Components/Date.vue";
import { DeviceStatus } from "@/assets/json/TypeMapper.json";
export default {
  name: "OrderInfo",
  components: { myDate, mySearch },
  data() {
    return {
      //设别状态
      DeviceStatus: "",
      //控制高级搜索
      showSearch: false,
      reveal: false,
      //转义为中文
      status: {
        serialNo: "设备的序列号",
        mac: "设备的mac地址",
        model: "设备型号",
        activeTime: "设备首次激活时间",
        productionDate: "生产日期",
        owner: "设备所有者电话",
        status: "设备状态",
        afterSaleId: "售后服务id",
        alias: "别名",
        remark: "备注"
      },
      curritem: "",
      showDialog: false,
      moreInfo: false,
      search: "",
      page: 1,
      pagelength: 0,
      pagesize: 10,
      expanded: [],
      searchForm: {
        owner: "",
        mac: "",
        model: "",
        status: "",
        startActiveTime: "",
        endActiveTime: "",
        startProdTime: "",
        endProdTime: ""
      },
      dessertHeaders: [
        { text: "型号", value: "model" },
        { text: "激活时间", value: "activeTime" },
        { text: "生产日期", value: "productionDate" },
        { text: "设备所有者", value: "owner" },
        { text: "设备状态", value: "status" },
        { text: "详细信息", value: "moreInfo", align: "center" }
      ],

      // 随手写的一些本地数据用于测试
      desserts: [
        {
          serialNo: 1,
          mac: "user",
          model: "create",
          activeTime: "2021-07-21T10:16:32",
          productionDate: "2021-07-21T10:16:32",
          owner: "cuifan",
          status: "正常",
          afterSaleId: 11
        }
      ],
      rules: {
        number: (value) => {
          const reg = /^\d{11}$/;
          return !value || reg.test(value) || "电话号码必须为11位数字";
        },
        name: (value) => {
          const reg = /^([a-zA-Z]|[\u4e00-\u9fa5])*$/;
          return reg.test(value) || "只能为中文或英文";
        },
        mac: (value) => {
          //正则匹配mac码
          const reg =
            /^[A-F0-9]{2}([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})$/;
          return !value || reg.test(value) || "请输入正确的mac码";
        }
      }
    };
  },

  computed: {},

  created() {
    this.DeviceStatus = DeviceStatus;
    getDeviceList({
      timeOrder: "desc",
      page: this.page - 1,
      size: this.pagesize
    }).then((data) => {
      console.log(data);
      this.desserts = data.payload.results;
      //格式化时间
      this.desserts.forEach((element) => {
        element.activeTime = element.activeTime.replace("T", " ");
      });
      this.pagelength = Math.ceil(data.payload.total / this.pagesize);
    });
  },
  methods: {
    //控制高级搜索
    advancedSearch() {
      this.showSearch = !this.showSearch;
    },
    getvalue(key, value) {
      if (key === "status") {
        return this.DeviceStatus[value];
      } else {
        return value;
      }
    },
    searchDevice() {
      if (this.$refs.form.validate()) {
        getDeviceList({
          owner: this.searchForm.owner,
          mac: this.searchForm.mac,
          model: this.searchForm.model,
          status: this.searchForm.status,
          startActiveTime: this.searchForm.startActiveTime,
          endActiveTime: this.searchForm.endActiveTime,
          startProdTime: this.searchForm.startProdTime,
          endProdTime: this.searchForm.endProdTime,
          timeOrder: "desc",
          page: this.page - 1,
          size: this.pagesize
        }).then((data) => {
          console.log(data);
          this.desserts = data.payload.results;
          //格式化时间
          this.desserts.forEach((element) => {
            element.activeTime = element.activeTime.replace("T", " ");
            console.log(element.startActiveTime);
          });
          this.pagelength = Math.ceil(data.payload.total / this.pagesize);
        });
      }
    }
  },
  watch: {
    page: function () {
      this.searchDevice();
    }
  }
};
</script>

<style scoped></style>
