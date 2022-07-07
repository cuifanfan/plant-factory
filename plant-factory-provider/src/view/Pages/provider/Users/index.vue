<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      show-select
      class=""
      hide-default-footer
      :items-per-page="10"
      loading="true"
      loading-text="未查询到数据"
    >
      <template slot="top">
        <v-row class="py-5 px-7 pb-0">
          <v-btn text class="text-h6 pa-0">搜索:</v-btn>
          <v-text-field placeholder="姓名" outlined style="max-width: 200px" dense hide-details></v-text-field>
          <v-text-field
            placeholder="电话"
            outlined
            style="max-width: 200px"
            dense
            hide-details
            class="ml-1 mr-5"
          ></v-text-field>
          <my-date v-model="dateStart" text="开始日期"></my-date>
          <my-date v-model="dateEnd" text="结束日期"></my-date>

          <v-btn text class="light-blue darken-1 ml-2 align-self-center" color="white" tile depressed @click="search"
            >搜索</v-btn
          >
        </v-row>
        <v-row class="py-5 px-7">
          <v-btn tile color="white" small depressed class="light-blue darken-1" text @click="dialog = true">
            <v-icon x-small left>fas fa-plus</v-icon>
            新增
          </v-btn>
          <v-btn tile color="white" small depressed class="light-blue darken-1 ml-1" text @click="exportExcel">
            <!-- <v-icon x-small left>fas fa-plus</v-icon> -->
            导出excel
          </v-btn>
        </v-row>
      </template>
      <template slot="footer" slot-scope="{ props }">
        <v-pagination v-model="props.options.page" :length="pages"></v-pagination>
      </template>
      <template slot="item.avatar" slot-scope="{ item }">
        <v-avatar color="red" size="35">
          <v-img :src="item.avatar" alt="无" v-if="item.avatar">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" size="20" width="2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <template v-else><span class="white--text">无</span></template>
        </v-avatar>
      </template>
      <template slot="item.reset" slot-scope="{ item }">
        <v-btn
          tile
          color="success"
          x-small
          @click="
            waitToDel = item.phone;
            dialogDel = true;
          "
        >
          修改
        </v-btn>
      </template>
      <template slot="item.del" slot-scope="{ item }">
        <v-btn
          tile
          color="error"
          x-small
          @click="
            waitToDel = item.phone;
            dialogDel = true;
          "
        >
          禁用
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
import exportExcel from "@/utils/exportExcel";
import myDate from "../../../Components/Date.vue";
export default {
  data: () => ({
    dateStart: "",
    dateEnd: "",

    waitToDel: "",
    dialog: false,
    dialogDel: false,
    singleSelect: false,
    selected: [],
    headers: [
      { text: "ID", value: "id", sortable: false, align: "center", width: 10 },
      { text: "姓名", value: "name", sortable: false, align: "start" },
      { text: "手机号码", value: "phone", align: "center", sortable: false },
      { text: "状态", value: "status", align: "center", sortable: false },
      { text: "添加时间", value: "createAt", align: "center", sortable: false },
      {
        text: "修改",
        value: "reset",
        align: "center",
        width: 10,
        sortable: false
      },
      {
        text: "删除",
        value: "del",
        align: "center",
        width: 10,
        sortable: false
      }
    ],
    desserts: [
      {
        id: 1,
        name: "小明",
        phone: "13317536459",
        status: "正常",
        createAt: "2020-10-2"
      },
      {
        id: 2,
        name: "小明",
        phone: "13317536459",
        status: "正常",
        createAt: "2020-10-2"
      },
      {
        id: 3,
        name: "小明",
        phone: "13317536459",
        status: "正常",
        createAt: "2020-10-2"
      }
    ]
  }),
  methods: {
    del() {},
    getdata() {},
    search() {
      console.log(this.date);
    },
    exportExcel() {
      exportExcel(this.headers, this.desserts);
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.desserts.length / 10);
    }
  },
  components: {
    myDialog,
    myDate
  },
  created() {
    this.getdata();
  }
};
</script>

<style></style>
