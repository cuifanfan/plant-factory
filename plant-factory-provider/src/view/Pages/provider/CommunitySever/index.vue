<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :single-select="false"
      class=""
      hide-default-footer
      :items-per-page="size"
      loading="true"
      loading-text="未查询到数据"
    >
      <template slot="top">
        <v-row class="py-5 px-7 pb-0">
          <my-search v-model="showSearch">
            <template slot="header">
              <v-text-field label="手机号" outlined style="max-width: 200px" dense v-model="phone"> </v-text-field>
              <v-text-field label="姓名" outlined style="max-width: 200px" dense class="ml-3" v-model="name">
              </v-text-field>

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
                ></v-select>
              </v-list-item>
            </v-list>
          </my-search>
        </v-row>
        <v-row class="py-5 px-7 pt-0">
          <v-btn tile color="white" small depressed class="light-blue darken-1 mr-2" text @click="dialog = true">
            <v-icon x-small left>fas fa-plus</v-icon>
            新增
          </v-btn>
        </v-row>
      </template>
      <template slot="footer" slot-scope="{}">
        <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
      </template>

      <!-- <template slot="item.reset" slot-scope="{}"> </template> -->
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
          修改
        </v-btn>
        <v-btn
          min-width="90px"
          class="ml-4 white--text text--lighten-1 error"
          depressed
          small
          @click="
            waitToDel = item.phone;
            dialogDel = true;
          "
        >
          删除
        </v-btn>
      </template>
    </v-data-table>
    <my-dialog v-bind:dialog.sync="dialog" @click="dialog = false"></my-dialog>
    <my-dialog-2 :item="waitToPut" v-bind:dialog.sync="dialog2" @click="dialog2 = false"></my-dialog-2>
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
import myDialog from "./Dialog.vue";
import myDate from "../../../Components/Date.vue";
import mySearch from "../../../Components/Search.vue";
import myDialog2 from "./Dialog2.vue";
import { removeEngineer, searchEngineers } from "../../../../api/account";
export default {
  data: () => ({
    showSearch: false,

    waitToDel: "",
    waitToPut: {},
    dialog: false,
    dialog2: false,
    dialogDel: false,
    selected: [],
    headers: [
      // { text: "ID", value: "uid", sortable: false, align: "center", width: 10 },
      {
        text: "姓名",
        value: "name",
        sortable: false,
        align: "center",
        width: "150"
      },
      { text: "手机号码", value: "phone", align: "center", sortable: false },
      { text: "状态", value: "status", align: "center", sortable: false },
      { text: "添加时间", value: "createAt", align: "center", sortable: false },
      {
        text: "操作",
        value: "del",
        align: "center",
        width: "300",
        sortable: false
      }
    ],
    desserts: [],

    pages: 0,

    // 搜索字段
    phone: "",
    name: "",
    status: "",
    page: 1,
    size: 10
  }),
  methods: {
    del() {
      removeEngineer(this.waitToDel).then(
        (value) => {
          // console.log(value);
          this.$message("success", "删除成功");
          this.getdata();
          this.dialogDel = false;
        },
        (reason) => {
          // console.log(reason);
          this.$message("error", "删除失败");
        }
      );
    },
    getdata() {
      searchEngineers({
        phone: this.phone,
        name: this.name,
        status: this.status,
        page: this.page - 1,
        size: this.size
      }).then(
        (value) => {
          let data = value.payload;
          console.log(data);
          data.results.forEach((element) => {
            if (element.createAt) {
              element.createAt = element.createAt.split("T").join(" ");
            }

            let status = element.status;
            element.status = status == 1 ? "正常" : "禁用";
            // console.log(element.status);
          });
          this.desserts = data.results;
          this.pages = Math.ceil(data.total / this.size);
        },
        (reason) => {
          console.log(reason);
          this.$message("error", "获取失败");
        }
      );
    },
    search(page) {
      this.page = page;
      this.getdata();
    }
  },

  components: {
    myDialog,
    mySearch,
    myDialog2
  },
  created() {
    this.getdata();
  }
};
</script>

<style></style>
