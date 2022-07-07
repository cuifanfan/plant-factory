<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" loading="true" loading-text="未查询到数据" hide-default-footer :items-per-page="size">
      <template slot="top">
        <v-row class="py-5 px-7 pb-0" align="center">
          <my-search v-model="showSearch">
            <template slot="header">
              <v-text-field label="用户手机号" outlined style="max-width: 200px" dense v-model="phone"> </v-text-field>

              <v-combobox
                label="所属组织"
                outlined
                style="max-width: 200px"
                dense
                :value="group.name"
                @input="group.id = $event && $event.value"
                class="ml-3"
                :items="items"
                @update:search-input="changeItems($event)"
                clearable
              >
              </v-combobox>

              <!-- <v-select
                :items="[
                  { text: '正常', value: 1 },
                  { text: '禁用', value: 0 },
                ]"
                label="状态"
                dense
                v-model="status"
                style="max-width: 200px"
                outlined
                class="ml-3"
                clearable
              ></v-select> -->

              <v-btn text class="light-blue darken-1 align-self-start ml-auto" color="white" depressed min-width="100" @click="search(1)"> 搜索 </v-btn>
              <v-btn text class="px-1 mx-3 align-self-start" color="light-blue darken-1" @click="showSearch = !showSearch"
                >高级搜索
                <v-icon v-if="showSearch">mdi-menu-up</v-icon>
                <v-icon v-else>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item class="pa-0 pt-1">
                <!-- <v-select
                  :items="provinceItem"
                  label="省份"
                  dense
                  v-model="province"
                  @input="getCityItem($event)"
                  clearable
                  outlined
                  style="max-width: 200px"
                ></v-select>

                <v-select
                  :items="cityItem"
                  label="城市"
                  dense
                  v-model="city"
                  clearable
                  no-data-text="请先选择省份"
                  outlined
                  class="ml-3"
                  style="max-width: 200px"
                ></v-select> -->
              </v-list-item>
            </v-list>
          </my-search>
        </v-row>
        <!-- <v-row class="py-5 px-7 pt-0">
          <v-btn
            tile
            color="white"
            small
            depressed
            class="light-blue darken-1"
            text
            @click="dialog = true"
          >
            <v-icon x-small left>fas fa-plus</v-icon>
            新增
          </v-btn>
        </v-row> -->
      </template>
      <template slot="footer" slot-scope="{}">
        <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
      </template>
      <template slot="item.avatar" slot-scope="{ item }">
        <v-avatar color="red" size="35">
          <v-img :src="$staticpath.avatar + item.avatar" alt="无" v-if="item.avatar" @error="item.avatar = false">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" size="20" width="2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <template v-else><span class="white--text">无</span></template>
        </v-avatar>
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
        <!-- <v-menu open-on-hover bottom max-width="90">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              min-width="90px"
              class="ml-4 white--text text--lighten-1 warning"
              depressed
              small
            >
              其他操作
            </v-btn>
          </template>

          <v-list class="pa-0 ma-0">
            <v-list-item
              class="pa-0 justify-center point"
              @click="
                waitToPut = item;
                dialogDel = true;
              "
            >
              删除
            </v-list-item>
            <v-list-item
              class="pa-0 justify-center point"
              @click="
                waitToPut = item;
                dialogOut = true;
              "
            >
              强制下线
            </v-list-item>
          </v-list>
        </v-menu> -->
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

    <v-dialog v-model="dialogOut" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 确定要踢下线吗? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="loginOut"> 确定 </v-btn>
          <v-btn color="green darken-1" text @click="dialogOut = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { getArea } from "../../../../api/basic";
import myDialog from "./Dialog.vue";
import myDialog2 from "./Dialog2.vue";
import { getAccountList, forceOffline } from "@/api/account";
import mySearch from "@/view/Components/Search.vue";
import { getProviderNameList } from "@/api/provider";
export default {
  data: () => ({
    dialogOut: false,

    waitToPut: {},
    dialog: false,
    dialog2: false,
    dialogDel: false,

    showSearch: false,

    headers: [
      { text: "头像", value: "avatar", sortable: false, align: "center" },
      {
        text: "名称",
        value: "nickname",
        sortable: false,
        align: "center"
      },
      { text: "状态", value: "status", sortable: false, align: "center" },

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
        text: "所在组织",
        value: "group",
        sortable: false,
        align: "center"
      },

      {
        text: "手机号码",
        value: "phone",
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

    phone: undefined,
    group: {
      id: undefined,
      name: ""
    },

    // provinceItem: [],
    // cityItem: [],

    items: []
  }),
  methods: {
    del() {
      console.log(this.waitToPut);
      /*  removeProvider(this.waitToDel).then(
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
      ); */
    },
    getdata() {
      getAccountList({
        group: this.group.id,
        phone: this.phone,
        page: this.page - 1,
        size: this.size
      }).then(
        (value) => {
          // console.log(value);
          let data = value.payload;
          this.desserts = data.results.map((value) => {
            let status = value.status;
            value.status = status === 1 ? "正常" : "禁用";
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

    // getProvinceItem() {
    //   getArea(0).then((value) => {
    //     let data = value.payload;
    //     this.provinceItem = data.map((value) => {
    //       return {
    //         text: value.name,
    //         value: value.code,
    //       };
    //     });
    //   });
    // },
    // getCityItem(pcode) {
    //   this.city = "";
    //   if (!pcode) {
    //     this.cityItem = [];
    //     return;
    //   }
    //   getArea(pcode).then((value) => {
    //     let data = value.payload;
    //     this.cityItem = data.map((value) => {
    //       return {
    //         text: value.name,
    //         value: value.code,
    //       };
    //     });
    //   });
    // },

    changeItems(value) {
      // this.items = ["qwdq", "dwq"];
    },
    getItems() {
      getProviderNameList().then((value) => {
        let data = value.payload;
        this.items = data.map((value) => {
          return {
            text: value.name,
            value: value.id
          };
        });
      });
    },
    loginOut() {
      forceOffline(this.waitToPut.uid).then(
        (value) => {
          this.$message("success", "踢下线成功");
          this.getdata();
          this.dialogOut = false;
        },
        (reason) => {
          console.log(reason);
          this.$message("error", "踢下线失败");
          this.dialogOut = false;
        }
      );
    }
  },

  components: {
    myDialog,
    mySearch,
    myDialog2
  },
  created() {
    this.getdata();
    this.getItems();
    // this.getProvinceItem();
  }
};
</script>

<style scoped>
.point {
  cursor: pointer;
}
</style>
