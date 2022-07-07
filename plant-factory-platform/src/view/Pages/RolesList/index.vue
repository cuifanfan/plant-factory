<template>
  <div class="white">
    <v-data-table
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :headers="headers"
      :items="items"
      loading="true"
      loading-text="未查询到数据"
      hide-default-footer
      :items-per-page="10"
    >
      <template slot="expanded-item" slot-scope="{ item }">
        <td></td>
        <td>
          <div v-for="(v, i) in item.subRoles" :key="i" class="text-center" style="height: 48px; line-height: 48px">
            {{ v.title }}
          </div>
        </td>
        <td>
          <div v-for="(v, i) in item.subRoles" :key="i" class="text-center" style="height: 48px; line-height: 48px">
            {{ v.value }}
          </div>
        </td>
        <td>
          <div v-for="(v, i) in item.subRoles" :key="i" class="text-center" style="height: 48px; line-height: 48px">
            {{ v.remark }}
          </div>
        </td>
        <td>
          <div v-for="(v, i) in item.subRoles" :key="i" class="text-center" style="height: 48px; line-height: 48px">
            {{ v.createTime }}
          </div>
        </td>
        <td>
          <div v-for="(v, i) in item.subRoles" :key="i" class="text-center" style="height: 48px; line-height: 48px">
            <v-btn min-width="90px" class="white--text text--lighten-1 success" depressed small disabled> 添加子角色 </v-btn>
            <v-btn
              min-width="90px"
              class="ml-4 white--text text--lighten-1 warning"
              depressed
              small
              @click="
                dialog2 = true;
                waitToPut = v;
              "
            >
              设置权限
            </v-btn>
          </div>
        </td>

        <!-- </tr> -->

        <!-- <v-data-table :headers="h" :items="item.subRoles" hide-default-footer>
            <template slot="item.add" slot-scope="{ item }">
              <v-btn
                min-width="90px"
                class="white--text text--lighten-1 success"
                depressed
                small
              >
                添加子角色
              </v-btn>
            </template>
          </v-data-table> -->
        <!-- </td> -->
      </template>

      <template slot="item.data-table-expand" slot-scope="{ expand, isExpanded, item }">
        <v-icon @click="expand(!isExpanded)" v-if="item.subRoles.length" small>
          {{ isExpanded ? "fas fa-chevron-up" : "fas fa-chevron-down" }}
        </v-icon>
        <!-- <div>{{ item }}</div> -->
      </template>

      <template slot="item.add" slot-scope="{ item }">
        <v-btn
          min-width="90px"
          class="white--text text--lighten-1 success"
          depressed
          small
          @click="
            dialog = true;
            waitToPut = item;
          "
        >
          添加子角色
        </v-btn>
        <v-btn
          min-width="90px"
          class="ml-4 white--text text--lighten-1 warning"
          depressed
          small
          @click="
            dialog2 = true;
            waitToPut = item;
          "
        >
          设置权限
        </v-btn>
      </template>
    </v-data-table>

    <!-- <v-row class="px-7 pb-0" align="center">
      <v-treeview
        :items="items"
        item-text="title"
        item-children="subRoles"
        transition
      >
        <template slot="append" slot-scope="{ item }">
          <div>
            <v-btn
              depressed
              text
              color="white"
              class="blue lighten-2"
              x-small
              @click="
                dialog2 = true;
                waitToPut = item;
              "
            >
              详情
            </v-btn>
            <v-btn
              depressed
              text
              color="white"
              class="blue lighten-2 ml-2"
              x-small
              v-if="item.subRoles"
              @click="
                dialog = true;
                waitToPut = item;
              "
            >
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </div>
        </template>
      </v-treeview>
    </v-row> -->
    <my-dialog v-bind:dialog.sync="dialog" @click="dialog = false" :item="waitToPut"></my-dialog>
    <my-dialog-2 v-bind:dialog.sync="dialog2" @click="dialog2 = false" :item="waitToPut"></my-dialog-2>
  </div>
</template>

<script>
// import { getArea } from "../../../../api/basic";
import myDialog from "./Dialog.vue";
import myDialog2 from "./Dialog2.vue";
import { getAllRoles } from "@/api/account";
import mySearch from "@/view/Components/Search.vue";
export default {
  data: () => ({
    waitToDel: "",
    waitToPut: {},
    dialog: false,
    dialog2: false,
    dialogDel: false,

    showSearch: false,

    items: [],

    headers: [
      {
        text: "角色名称",
        value: "title",
        sortable: false,
        align: "center"
      },
      {
        text: "角色标识",
        value: "value",
        sortable: false,
        align: "center"
      },
      { text: "备注", value: "remark", sortable: false, align: "center" },

      {
        text: "创建时间",
        value: "createTime",
        sortable: false,
        align: "center"
      },
      {
        text: "操作",
        value: "add",
        sortable: false,
        align: "center",
        width: "300px"
      }
    ],

    expanded: [],
    singleExpand: false
  }),
  methods: {
    del() {
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
      getAllRoles().then(
        (value) => {
          let data = value.payload;

          /*    for (let item of data) {
            for (let i of item.subRoles) {
              if (i.subRoles === null) {
                i.subRoles = [];
              }
            }
          } */
          this.items = data;
        },
        (reason) => {
          console.log(reason);
        }
      );
    }
  },

  components: {
    myDialog,
    myDialog2
  },
  created() {
    this.getdata();
  }
};
</script>

<style></style>
