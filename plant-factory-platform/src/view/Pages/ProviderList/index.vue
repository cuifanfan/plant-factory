<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" loading="true" loading-text="未查询到数据" hide-default-footer :items-per-page="size">
      <template slot="top">
        <v-row class="py-5 px-7 pb-0" align="center">
          <my-search v-model="showSearch">
            <template slot="header">
              <v-text-field label="服务商名字" outlined style="max-width: 200px" dense v-model="name"> </v-text-field>
              <v-select
                :items="[
                  { text: '正常', value: 1 },
                  { text: '禁用', value: 0 }
                ]"
                label="状态"
                dense
                v-model="status"
                style="max-width: 200px"
                outlined
                class="ml-3"
                clearable
              ></v-select>

              <v-btn text class="light-blue darken-1 align-self-start ml-auto" color="white" depressed min-width="100" @click="search(1)"> 搜索 </v-btn>
              <v-btn text class="px-1 mx-3 align-self-start" color="light-blue darken-1" @click="showSearch = !showSearch"
                >高级搜索
                <v-icon v-if="showSearch">mdi-menu-up</v-icon>
                <v-icon v-else>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item class="pa-0 pt-1">
                <v-select :items="provinceItem" label="省份" dense v-model="province" @input="getCityItem($event)" clearable outlined style="max-width: 200px"></v-select>

                <v-select :items="cityItem" label="城市" dense v-model="city" clearable no-data-text="请先选择省份" outlined class="ml-3" style="max-width: 200px"></v-select>
              </v-list-item>
            </v-list>
          </my-search>
        </v-row>
        <v-row class="py-5 px-7 pt-0">
          <v-btn tile color="white" small depressed class="light-blue darken-1" text @click="dialog = true">
            <v-icon x-small left>fas fa-plus</v-icon>
            新增
          </v-btn>
        </v-row>
      </template>
      <template slot="footer" slot-scope="{}">
        <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
      </template>
      <template slot="item.avatar" slot-scope="{ item }">
        <v-avatar color="red" size="35">
          <v-img :src="item.avatar" alt="无" v-if="item.avatar" @error="item.avatar = false">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" size="20" width="2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <template v-else><span class="white--text">无</span></template>
        </v-avatar>
      </template>

      <template slot="item.status" slot-scope="{ item }">
        {{ item.status === 1 ? "正常" : "禁用" }}
      </template>

      <template slot="item.del" slot-scope="{ item }">
        <v-btn
          min-width="90px"
          class="white--text text--lighten-1 success"
          depressed
          small
          @click="
            dialog2 = true;
            waitToPut = item;
          "
        >
          详情
        </v-btn>
        <v-btn
          min-width="90px"
          class="ml-4 white--text text--lighten-1 error"
          depressed
          small
          @click="
            waitToDel = item.id;
            dialogDel = true;
          "
        >
          删除
        </v-btn>
      </template>
    </v-data-table>
    <my-dialog v-bind:dialog.sync="dialog" @click="dialog = false"></my-dialog>
    <my-dialog-2 v-bind:dialog.sync="dialog2" @click="dialog2 = false" :item="waitToPut"></my-dialog-2>
    <v-dialog v-model="dialogDel" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 确定要删除吗? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="del"> 删除 </v-btn>
          <v-btn color="green darken-1" text @click="dialogDel = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getArea } from "@/api/basic";
import myDialog from "./Dialog.vue";
import myDialog2 from "./Dialog2.vue";
import { getProviderList, removeProvider } from "@/api/provider";
import mySearch from "@/view/Components/Search.vue";
export default {
  data: () => ({
    waitToDel: "",
    waitToPut: {},
    dialog: false,
    dialog2: false,
    dialogDel: false,

    showSearch: false,

    headers: [
      { text: "公司名", value: "name", sortable: false, align: "center" },
      { text: "状态", value: "status", sortable: false, align: "center" },
      {
        text: "状态描述",
        value: "statusRemark",
        sortable: false,
        align: "center"
      },
      {
        text: "所在省份",
        value: "province",
        sortable: false,
        align: "center"
      },
      {
        text: "所在城市",
        value: "city",
        sortable: false,
        align: "center"
      },
      {
        text: "所在地区",
        value: "address",
        sortable: false,
        align: "center"
      },
      {
        text: "创建时间",
        value: "createDate",
        align: "center",
        sortable: false
      },
      {
        text: "负责人",
        value: "principalName",
        align: "center",
        sortable: false
      },
      {
        text: "手机号码",
        value: "principalPhone",
        align: "center",
        sortable: false
      },
      {
        text: "操作",
        value: "del",
        align: "center",
        width: "300",
        sortable: false
      }
    ],
    desserts: [],

    page: 1,
    size: 10,
    pages: 0,

    status: "",
    name: "",
    province: "",
    city: "",

    provinceItem: [],
    cityItem: []
  }),
  methods: {
    del() {
      removeProvider(this.waitToDel).then(
        (value) => {
          this.$message("success", "删除成功");
          this.getdata();
          this.dialogDel = false;
        },
        (reason) => {
          console.log(reason);
          this.$message("error", "删除失败");
          this.dialogDel = false;
        }
      );
    },
    getdata() {
      getProviderList({
        status: this.status,
        name: this.name,
        provinceCode: this.province,
        cityCode: this.city,
        page: this.page - 1,
        size: this.size
      }).then(
        (value) => {
          // console.log(value);
          let data = value.payload;
          this.desserts = data.results.map((value) => {
            return value;
          });
          this.pages = Math.ceil(data.total / this.size);
        },
        (reason) => {
          console.log(reason);
        }
      );
    },
    search(page) {
      this.page = page;
      this.getdata();
    },

    getProvinceItem() {
      getArea(0).then((value) => {
        let data = value.payload;
        this.provinceItem = data.map((value) => {
          return {
            text: value.name,
            value: value.code
          };
        });
      });
    },
    getCityItem(pcode) {
      this.city = "";
      if (!pcode) {
        this.cityItem = [];
        return;
      }
      getArea(pcode).then((value) => {
        let data = value.payload;
        this.cityItem = data.map((value) => {
          return {
            text: value.name,
            value: value.code
          };
        });
      });
    }
  },

  components: {
    myDialog,
    mySearch,
    myDialog2
  },
  created() {
    this.getdata();
    this.getProvinceItem();
  }
};
</script>

<style></style>
