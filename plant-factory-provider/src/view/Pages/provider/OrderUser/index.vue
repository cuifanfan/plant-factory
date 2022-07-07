<template>
  <div>
    <v-data-table
      :headers="dessertHeaders"
      :items="desserts"
      :expanded.sync="expanded"
      :page.sync="page"
      :items-per-page="pagesize"
      hide-default-footer
      item-key="id"
      :search="search"
      loading="true"
      loading-text="未查询到数据"
      disable-sort
    >
      <template slot="top">
        <v-form ref="form">
          <v-row class="py-5 px-7 pb-0" align="center">
            <my-search v-model="showSearch">
              <template slot="header">
                <v-text-field
                  placeholder="收货人电话"
                  label="收货人电话"
                  style="max-width: 200px"
                  dense
                  outlined
                  :rules="[rules.number]"
                  v-model="searchForm.recphone"
                ></v-text-field>
                <v-text-field
                  placeholder="购买人电话"
                  outlined
                  label="购买人电话"
                  style="max-width: 200px"
                  :rules="[rules.number]"
                  dense
                  class="ml-3"
                  v-model="searchForm.ownerphone"
                ></v-text-field>

                <v-btn
                  text
                  class="light-blue align-self-start darken-1 ml-auto"
                  color="white"
                  depressed
                  min-width="100"
                  @click="searchInfo()"
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
              <v-list class="pa-0 mt-2">
                <v-list-item class="pa-0" style="height: 60px">
                  <my-date v-model="searchForm.dateStart" style="max-width: 200px" text="开始日期"></my-date>
                  <my-date v-model="searchForm.dateEnd" myclass="ml-3" text="结束日期"></my-date>
                </v-list-item>
                <v-list-item class="pa-0 mt-2" style="height: 60px">
                  <v-text-field
                    placeholder="收货人姓名"
                    outlined
                    label="收货人姓名"
                    :rules="[rules.name]"
                    style="max-width: 200px"
                    dense
                    v-model="searchForm.rcvName"
                  ></v-text-field>
                </v-list-item>
              </v-list>
            </my-search>
          </v-row>
          <v-row class="py-5 px-7 mt-n4">
            <v-btn tile color="white" small depressed class="light-blue darken-1" text @click="exportExcel()">
              <div v-if="!process">导出excel</div>
              <div v-else>
                <v-progress-circular indeterminate color="grey lighten-2" size="25"></v-progress-circular>
              </div>
            </v-btn> </v-row
        ></v-form>
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
          @click="searchsingle(item.item.id)"
        >
          详情
        </v-btn>
        <v-btn color="#98e165" class="ml-4 white--text success" depressed small @click="distributServer(item.item.id)">
          分配工程师
        </v-btn>
      </template>

      <template slot="item.status" slot-scope="item">
        <div v-if="item.item.status == -1" style="color: #616161; font-weight: 900">
          {{ itemStatus[item.item.status] }}
        </div>
        <div v-else-if="item.item.status == 1" style="color: #81d4fa; font-weight: 900">
          {{ itemStatus[item.item.status] }}
        </div>
        <div v-else-if="(item.item.status == 2) | (item.item.status == 3)" style="color: #f4511e; font-weight: 900">
          {{ itemStatus[item.item.status] }}
        </div>
        <div v-else style="color: green; font-weight: 900">
          {{ itemStatus[item.item.status] }}
        </div>
      </template>
    </v-data-table>

    <v-dialog transition="dialog-bottom-transition" v-model="showDialog" class="elevation-0" max-width="500">
      <v-card class="mx-auto">
        <v-card-title>订单详情</v-card-title>
        <v-card-text v-for="(value, key, index) in curritem" :key="index">
          <v-row v-if="key == 'status'">
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8"
              ><v-select
                :items="items"
                label="订单状态"
                dense
                outlined
                :value="`${value}`"
                item-text="key"
                item-value="value"
                @input="curritem.status = $event"
                hide-details
              ></v-select
            ></v-col>
          </v-row>
          <v-row v-else-if="key == 'type'">
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8">{{ orderType[value] }}</v-col>
          </v-row>
          <v-row v-else-if="key == 'items'" v-for="(item, index) in value" :key="index">
            <v-col cols="4"> 购买商品{{ index + 1 }} </v-col>
            <v-col cols="8">
              <!-- {{ getValue(item) }} -->
              <v-row v-for="(value, key, index) in delitems(item)" :key="index">
                <v-col>{{ purchaseItem[key] + ":" + value }}</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="4">{{ status[key] }}</v-col>
            <v-col cols="8">{{ value }}</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn tile color="white" depressed class="light-blue darken-1" @click="save" text> 修改 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog transition="dialog-bottom-transition" v-model="distributeDialog" class="elevation-0" max-width="500">
      <v-card class="mx-auto">
        <v-card-title>分配工程师</v-card-title>
        <v-card-text>
          <v-select
            :items="engineer"
            label="分配工程师"
            dense
            outlined
            item-text="name"
            item-value="phone"
            v-model="selectEnginer.engineerPhone"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn tile color="white" depressed class="light-blue darken-1" @click="saveEngineer" text> 分配 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getProviderOrderList, getOrderDetail, exportOrders, updateOrderEnginer, updateOrderStatus } from "@/api/order";
import { getMyEngineerList } from "@/api/account";
import mySearch from "../../../Components/Search.vue";
import myDate from "../../../Components/Date.vue";
import exportExcel from "@/utils/exportExcel";
//读取json文件
import { OrderStatus, OrderType } from "@/assets/json/TypeMapper.json";
export default {
  name: "OrderInfo",
  components: { myDate, mySearch },
  data() {
    return {
      //进度条
      process: false,
      //订单类型
      orderType: OrderType,
      //工程师列表，用来分配工程师
      engineer: [],
      //选中的工程师及订单编号
      selectEnginer: {},
      //展示高级搜索
      showSearch: false,
      //控制展示新订单
      showNewOrder: false,
      //未转换订单列表
      itemStatus: OrderStatus,
      //转换后订单状态列表
      items: [],
      reveal: false,
      status: {
        id: "订单编号",
        providerId: "服务商id",
        createAt: "创建时间",
        amount: "总价格",
        type: "订单类型",
        status: "订单状态",
        remark: "备注",
        reason: "原因",
        engineer: "工程师ID",
        rcvName: "收货人姓名",
        rcvPhone: "收货人电话",
        rcvProvince: "收货地址省份",
        rcvCity: "收货人地址城市",
        rcvAddress: "收货详细地址",
        ownerPhone: "购买人电话",
        items: "购买列表"
      },
      //当前的查询的订单的详细信息
      curritem: "",
      //订单详情的dialog
      showDialog: false,
      //分配工程师dialog
      distributeDialog: false,
      // moreInfo: false,
      search: "",
      page: 1,
      pagelength: 0,
      pagesize: 10,
      expanded: [],
      searchForm: {
        recphone: "",
        ownerphone: "",
        rcvName: "",
        dateEnd: "",
        dateStart: ""
      },
      dessertHeaders: [
        {
          text: "订单号",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "总金额", value: "amount" },
        { text: "收货人姓名", value: "rcvName" },
        { text: "收货人电话", value: "rcvPhone" },
        { text: "购买人电话", value: "ownerPhone" },
        { text: "订单状态", value: "status" },
        { text: "订单创建时间", value: "createAt" },
        { text: "操作", value: "moreInfo", align: "center" }
        // { text: "订单分配服务人员", value: "distribute",align:'center'},
      ],

      // 随手写的一些本地数据用于测试
      desserts: [],
      purchaseItem: {
        name: "商品名称",
        price: "价格",
        number: "数量",
        description: "描述"
      },
      rules: {
        number: (value) => {
          const reg = /^\d{4,}$/;
          return !value || reg.test(value) || "必须为4位以上数字";
        },
        name: (value) => {
          const reg = /^([a-zA-Z]|[\u4e00-\u9fa5])*$/;
          return reg.test(value) || "只能为中文或英文";
        }
      }
    };
  },
  created() {
    this.transformOrderStatus();
    this.getProviderOrderList();
  },
  methods: {
    //得到订单数据
    getProviderOrderList() {
      getProviderOrderList({
        page: this.page - 1,
        size: this.pagesize,
        timeOrder: "desc"
      }).then((data) => {
        console.log(data);
        this.desserts = data.payload.results;
        //格式化时间
        this.desserts.forEach((element) => {
          element.createAt = element.createAt.replace("T", " ");
        });
        //格式化总金额
        this.desserts.forEach((element) => {
          element.amount = element.amount.toFixed(2);
        });
        this.pagelength = Math.ceil(data.payload.total / this.pagesize);
      });
    },
    //转换订单状态JSON对象为对象数组，使支持select
    transformOrderStatus() {
      let status = [];
      console.log(OrderStatus);
      for (let key in OrderStatus) {
        //禁止使用这三种状态其他所有状态
        if (key == -1 || key == 3 || key == 4) {
          status.push({ value: key, key: OrderStatus[key] });
        } else {
          status.push({ value: key, key: OrderStatus[key], disabled: true });
        }
      }
      console.log(status);
      this.items = status;
    },
    distributServer(id) {
      this.selectEnginer.orderId = id;
      this.selectEnginer.engineerPhone = null;
      getMyEngineerList().then((data) => {
        this.engineer = data.payload.results;
        this.distributeDialog = true;
      });
    },
    searchsingle(id) {
      getOrderDetail(id).then((data) => {
        console.log(data.payload);
        this.curritem = data.payload;
        //格式化时间
        this.curritem.createAt = this.curritem.createAt.replace("T", " ");
        this.curritem.amount = this.curritem.amount.toFixed(2);
        this.showDialog = true;
      });
    },
    saveEngineer() {
      updateOrderEnginer(this.selectEnginer).then((data) => {
        console.log(data);
        if (data.flag) {
          this.$message("success", "分配工程师成功");
          this.distributeDialog = false;
        } else {
          this.$message("error", data.message);
        }
      });
      // console.log(this.selectEnginer)
    },
    save() {
      console.log(this.curritem);
      updateOrderStatus({
        orderId: this.curritem.id,
        statusCode: parseInt(this.curritem.status)
      }).then(
        (res) => {
          console.log(res);
          this.showDialog = false;
          this.getProviderOrderList();
          this.$message("success", "订单状态修改成功");
        },
        (err) => {
          this.showDialog = false;
          this.$message("error", err.message);
        }
      );
    },
    searchInfo() {
      if (this.$refs.form.validate()) {
        getProviderOrderList({
          page: this.page - 1,
          size: this.pagesize,
          timeOrder: "desc",
          ownerPhone: this.searchForm.ownerphone,
          rcvName: this.searchForm.rcvName,
          rcvPhone: this.searchForm.recphone,
          start: this.searchForm.dateStart,
          end: this.searchForm.dateEnd
        }).then((data) => {
          this.desserts = data.payload.results;
          //格式化时间
          this.desserts.forEach((element) => {
            element.createAt = element.createAt.replace("T", " ");
          });
          //格式化总金额
          this.desserts.forEach((element) => {
            element.amount = element.amount.toFixed(2);
          });
          this.pagelength = Math.ceil(data.payload.total / this.pagesize);
        });
      }
    },
    exportExcel() {
      this.process = !this.process;
      setTimeout(() => {
        this.process = !this.process;
      }, 1000);
      exportOrders({
        start: this.searchForm.dateStart,
        end: this.searchForm.dateEnd
      }).then(
        (res) => {
          exportExcel(res, "订单信息");
        },
        (err) => {
          this.$message("error", err.message);
        }
      );
    },
    //处理items。删除多余的部分，例如id等
    delitems(items) {
      for (let item in items) {
        if (this.purchaseItem.hasOwnProperty(item)) {
          continue;
        } else {
          delete items[item];
        }
      }
      return items;
    }
  },
  watch: {
    page: function () {
      this.searchInfo();
    }
  }
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
