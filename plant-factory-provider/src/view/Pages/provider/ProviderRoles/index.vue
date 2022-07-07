<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      loading="true"
      loading-text="未查询到数据"
      hide-default-footer
      :items-per-page="size"
    >
      <template slot="top">
        <v-row class="py-5 px-7">
          <v-btn tile color="white" small depressed class="light-blue darken-1" text @click="dialog = true">
            <v-icon x-small left>fas fa-plus</v-icon>
            新增
          </v-btn>
        </v-row>
      </template>
      <template slot="footer" slot-scope="{ props }">
        <v-pagination v-model="props.options.page" :length="pages"></v-pagination>
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
      <template slot="item.del" slot-scope="{ item }">
        <v-btn
          min-width="90px"
          class="white--text text--lighten-1 error"
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
import { getProviderRoles, delProviderRole } from "@/api/account";
export default {
  data: () => ({
    size: 10,

    waitToDel: "",
    dialog: false,
    dialogDel: false,
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: "头像",
        value: "avatar",
        align: "center",
        sortable: false,
        width: 35
      },
      { text: "用户名", value: "name", sortable: false, align: "start" },
      { text: "手机号码", value: "phone", align: "center", sortable: false },
      { text: "权限角色", value: "role", align: "center", sortable: false },
      { text: "创建时间", value: "createAt", align: "center", sortable: false },
      {
        text: "操作",
        value: "del",
        align: "center",
        width: 10,
        sortable: false
      }
    ],
    desserts: []
  }),
  methods: {
    del() {
      delProviderRole(this.waitToDel).then(
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
      getProviderRoles().then(
        (value) => {
          let results = value.payload.results;
          // console.log(results);
          this.desserts = results.map((element) => {
            if (element.avatar) {
              element.avatar = this.$staticpath.avatar + element.avatar;
            }
            //   console.log(element);
            let role = element.role;
            if (role == "provider_admin") {
              // console.log(1);
              element.role = "普通管理员";
            } else if (role == "provider_root") {
              element.role = "系统管理员";
            }
            let time = element.createAt;
            element.createAt = time.split("T").join(" ");

            return element;
          });
        },
        (reason) => {
          console.log(reason);
        }
      );
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.desserts.length / this.size);
    }
  },
  components: {
    myDialog
  },
  created() {
    this.getdata();
  }
};
</script>

<style></style>
