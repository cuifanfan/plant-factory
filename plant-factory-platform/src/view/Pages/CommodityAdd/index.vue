<template>
  <div class="white pt-4">
    <v-row class="py-5 px-7 pb-0 mb-5">
      <v-text-field placeholder="商品名称" outlined style="max-width: 300px" dense hide-details class="mr-5" v-model="title"></v-text-field>

      <v-select :items="selectCategoryItems" label="分类" solo dense hide-details v-model="selected" style="max-width: 200px"></v-select>
      <v-btn text class="light-blue darken-1 align-self-start ml-4" color="white" depressed min-width="100" @click="search(1)"> 搜索 </v-btn>
      <v-spacer></v-spacer>
      <v-btn text class="light-blue darken-1 ml-4 mr-4" color="white" depressed min-width="100" @click="addProduction"> 添加商品 </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="space-around" ref="row" class="ma-0 pt-4">
      <v-skeleton-loader min-width="300" type="card" v-if="loading"></v-skeleton-loader>
      <v-card class="mb-4" max-width="300" min-width="300" v-for="(item, i) in dataList" :key="i" style="position: relative" hover>
        <div class="pa-2">
          <v-img height="200" :src="$staticpath.commodity + item.images[0]">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black" size="40" width="2" v-if="item.images[0]"></v-progress-circular>
                <v-icon v-else x-large>mdi-close-outline</v-icon>
              </v-row>
            </template>
          </v-img>
        </div>
        <v-card-title class="font-weight-bold">
          {{ item.title }}
          <v-chip class="ma-2 font-weight-regular" color="green" text-color="white" small>
            {{ item.brand }}
          </v-chip>
        </v-card-title>
        <v-card-text class="pb-0">
          <div>{{ item.intro }}</div>
        </v-card-text>
        <v-card-title class="font-weight-light py-2 d-flex justify-space-between">
          <span>建议零售价</span>
          <span>{{ item.showPrice }}元</span>
        </v-card-title>

        <v-card-actions>
          <v-btn text disabled></v-btn>
        </v-card-actions>

        <div style="position: absolute; bottom: 0; width: 100%">
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" text @click="showDetaild(item)"> 查看商品详情 </v-btn>
          </v-card-actions>
        </div>
      </v-card>

      <v-card width="300" v-for="i in 10" :key="i + 'add'" color="rgba(0,0,0,0)" elevation="0"></v-card>
    </v-row>
    <v-row justify="center">
      <v-pagination :value="page" :length="pages" @input="search($event)"></v-pagination>
    </v-row>

    <v-dialog v-model="showdialog" max-width="750px" class="productDialog">
      <div style="position: relative">
        <v-stepper v-model="e1">
          <v-stepper-header style="position: fixed; z-index: 9999; width: 750px; background-color: #eeeeee">
            <v-stepper-step :complete="e1 > 1" step="1"> 添加商品 </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2"> 添加价格 </v-stepper-step>
            <v-stepper-step :complete="e1 > 3" step="3"> 添加图片 </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items class="mt-15">
            <v-form ref="form">
              <v-stepper-content step="1">
                <v-card>
                  <!-- <v-card-title>添加商品</v-card-title>
              <v-divider></v-divider> -->
                  <v-card-subtitle class="text-h6 mt-4">
                    <v-row>
                      <v-col cols="2" class="align-self-center">标题</v-col>
                      <v-col cols="4"><v-text-field placeholder="标题" outlined dense hide-details v-model="form.title"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">副标题</v-col>
                      <v-col cols="4"><v-text-field placeholder="副标题" outlined dense hide-details v-model="form.subtitle"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">品牌</v-col>
                      <v-col cols="4"><v-text-field placeholder="品牌" outlined dense hide-details v-model="form.brand"></v-text-field></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">分类</v-col>
                      <v-col cols="4">
                        <v-select :items="ciditem" label="分类" item-text="categoryName" item-value="id" solo full-width dense hide-details v-model="form.cid"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">类型</v-col>
                      <v-col cols="4">
                        <v-select :items="typeItem" label="类型" item-text="text" item-value="value" solo full-width dense hide-details v-model="form.type"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">状态</v-col>
                      <v-col cols="4">
                        <v-select :items="selectItems" label="状态" solo full-width dense hide-details v-model="form.status"></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">固定规格</v-col>
                      <v-col cols="10">
                        <v-row v-for="(value, index) in form.specs" :key="index">
                          <v-col cols="5"><v-text-field class="pr-3" placeholder="名称" outlined dense hide-details :rules="rules" v-model="value.title"></v-text-field></v-col>
                          <v-col cols="5"><v-text-field placeholder="内容" outlined :rules="rules" dense hide-details v-model="value.value"></v-text-field></v-col>
                          <v-col cols="2" v-if="index === form.specs.length - 1"
                            ><v-btn fab dark x-small color="grey" @click="addfixedSpecifications"><v-icon dark> mdi-plus </v-icon></v-btn>
                            <v-btn fab dark class="ml-1" x-small color="grey" @click="cancelfixedSpecifications"><v-icon dark> mdi-minus </v-icon></v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">可选规格</v-col>
                      <v-col cols="10">
                        <v-row v-for="(value, index) in form.specOptions" :key="index">
                          <v-col cols="5"><v-text-field class="pr-3" placeholder="名称,例:型号" outlined dense hide-details :rules="rules" v-model="value.title"></v-text-field></v-col>
                          <v-col cols="5"><v-text-field placeholder="例:型号A,型号B,型号C" outlined dense hide-details :rules="rules" v-model="value.options"></v-text-field></v-col>
                          <v-col cols="2" v-if="index == form.specOptions.length - 1"
                            ><v-btn fab dark x-small color="grey" @click="addoptionalSpecifications"><v-icon dark> mdi-plus </v-icon></v-btn
                            ><v-btn class="ml-1" fab dark x-small color="grey" @click="canceloptionalSpecifications"><v-icon dark> mdi-minus </v-icon></v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-card-actions>
                    <div class="mx-auto">
                      <v-btn text class="light-blue darken-1" color="white" depressed min-width="100" @click="addProduct"> 添加商品 </v-btn>
                      <v-btn depressed class="ml-3" style="border: 1px solid #eeeeee" min-width="100" @click="showdialog = false"> 取消添加 </v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-form>
            <v-form ref="form1">
              <v-stepper-content step="2">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th style="text-align: center" v-for="(title, index) in headers" :key="index">
                          {{ title.text }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(type, index) in desserts" :key="index">
                        <template v-for="(item, key) in type">
                          <td :key="key" v-if="key == 'price'">
                            <v-text-field label="价格" dense hide-details outlined :rules="rules" style="max-width: 110px; margin: 0 auto" v-model="type.price"></v-text-field>
                          </td>
                          <td :key="key" v-else-if="key == 'status'">
                            <v-select :items="productItems" label="分类" outlined dense :rules="rules" hide-details v-model="type.status" style="max-width: 110px; margin: 0 auto"></v-select>
                          </td>
                          <!-- :rules="type.status === 0 ? [] : rules" -->
                          <!-- :disabled="type.status === 0 ? true : false" -->
                          <td :key="key" v-else-if="key == 'suggestPrice'">
                            <v-text-field label="建议价格" dense :rules="rules" hide-details outlined style="max-width: 110px; margin: 0 auto" v-model="type.suggestPrice"></v-text-field>
                          </td>
                          <td :key="key" v-else-if="key != 'indexes'">
                            {{ item }}
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-card-actions>
                  <v-btn text class="light-blue darken-1 mt-2" color="white" depressed min-width="100" @click="addPrice"> 添加价格 </v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-form>
            <v-stepper-content step="3">
              <v-row class="mt-5">
                <v-col cols="4"></v-col>
                <!-- <v-spacer></v-spacer> -->
                <v-col cols="4" class="text-h6" style="text-align: center">
                  <v-icon class="auto" x-large color="success"> mdi-checkbox-marked-circle-outline </v-icon>
                  添加成功
                </v-col>
                <v-col cols="4"></v-col>
              </v-row>
              <v-row class="mt-3">
                <div class="mx-auto text-h6">你已成功添加一项商品，请继续添加图片</div>
              </v-row>
              <v-row class="mt-5">
                <div class="mx-auto text-h6" style="color: red">否则商品可能无法成功上架</div>
              </v-row>

              <v-row class="mt-5">
                <v-col cols="4"></v-col>
                <v-col cols="4"
                  ><v-file-input
                    small-chips
                    light
                    prepend-icon=""
                    prepend-inner-icon="mdi-text-box-plus"
                    outlined
                    counter
                    dense
                    multiple
                    label="上传图片"
                    accept="image/png, image/jpeg, image/jpg"
                    v-model="file"
                    @change="vaild"
                    :error-messages="errmsg"
                  ></v-file-input
                ></v-col>
              </v-row>
              <v-row class="">
                <v-col cols="4"></v-col>
                <v-col
                  ><v-btn text class="light-blue darken-1" color="white" depressed min-width="100" @click="uploadImg"> 完成添加 </v-btn>
                  <v-btn depressed class="ml-3" style="border: 1px solid #eeeeee" @click="laterFillded"> 待会完善 </v-btn></v-col
                >
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </v-dialog>
    <product-detail :activeItem="activeItem" :dialog.sync="detailDialog" @update="getall"></product-detail>
    <v-dialog v-model="querydialog" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 您有未完成新增商品，确认恢复吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="recover"> 恢复 </v-btn>
          <v-btn color="error darken-1" text @click="delrecover"> 删除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { addSpu, getAllCategory, getIncompleteAdding, cancelAdding, addSkus, uploadSpuImages, getCommonSpuList } from "@/api/commodity";
import ProductDetail from "./ProductDetail.vue";
export default {
  data() {
    return {
      detailDialog: false,
      errmsg: "",
      //上传图片file
      file: undefined,
      spuid: "",
      e1: 1,
      target: "",
      selected: null,
      //询问恢复dialog
      querydialog: false,
      //添加商品dialog
      showdialog: false,
      //状态选择
      selectItems: [
        { text: "上架", value: 1 },
        { text: "下架", value: 0 }
      ],
      typeItem: [
        { text: "积分商品", value: 1 },
        {
          text: "普通商品",
          value: 2
        }
      ],
      rules: [(v) => !!v || v === 0 || "请填写完整"],
      //添加商品状态选择
      productItems: [
        { text: "可用", value: 1 },
        { text: "不可用", value: 0 }
      ],
      ciditem: [],
      form: {
        title: "",
        subtitle: "",
        brand: "",
        type: "",
        status: "",
        specs: [{ title: "", value: "" }],
        specOptions: [{ title: "", options: "" }]
      },
      headers: [
        { text: "型号", value: "type", sortable: false },
        { text: "内存", value: "memory", sortable: false },
        { text: "外存", value: "outmemory", sortable: false },
        {
          text: "价格",
          value: "price",
          sortable: false,
          width: "135",
          height: "50",
          align: "center"
        },
        {
          text: "建议价格",
          value: "suggestprice",
          sortable: false,
          width: "135",
          align: "center"
        },
        {
          text: "状态",
          value: "status",
          sortable: false,
          width: "135",
          align: "center"
        }
      ],
      desserts: [],

      loading: false,
      selectCategoryItems: [{ text: "加载中...", value: "213" }],
      dialog: false,
      activeItem: undefined,
      dialogShop: false,
      dataList: [],
      number: 0,
      page: 1,
      size: 10,
      pages: 0,
      title: undefined,
      ordernum: 0
    };
  },
  methods: {
    showDetaild(item) {
      this.detailDialog = true;
      this.activeItem = item;
      console.log(this.activeItem);
    },
    getall() {
      this.loading = true;
      getCommonSpuList({
        page: this.page - 1,
        size: this.size,
        title: this.title,
        cid: this.selected
      }).then(async (value) => {
        let data = value.payload;
        data.results.forEach((element) => {
          let price = element.showPrice;
          element.showPrice = (price / 100).toFixed(2);
          let images = element.images;
          element.images = images ? images.split(",") : "";
        });
        this.dataList = data.results;
        this.pages = Math.ceil(data.total / this.size);
        this.loading = false;
      });
    },

    search(page) {
      this.page = page;
      this.getall();
    },

    getAllCategory() {
      getAllCategory().then((value) => {
        let data = value.payload;
        this.selectCategoryItems = data.results.map((value, index) => {
          return {
            text: value.categoryName,
            value: value.id
          };
        });
      });
    },

    //重置表单
    resetForm() {
      this.form = {
        title: null,
        subtitle: "",
        brand: "",
        type: "",
        specs: [{ title: "", value: "" }],
        specOptions: [{ title: "", options: "" }]
      };
    },
    //上传商品图片
    uploadImg() {
      if (this.vaild()) {
        let formata = new FormData();
        this.file.forEach((file) => {
          formata.append("image", file);
        });
        uploadSpuImages({ spuId: this.spuid, image: formata }).then(
          (res) => {
            console.log(res);
            this.$message("success", "已成功添加商品");
            this.showdialog = false;
            this.resetForm();
            this.e1 = 1;
            this.getall();
          },
          (err) => {
            this.$message("error", err.message);
          }
        );
      }
    },
    //上传商品图片验证
    vaild() {
      let flag = true;
      this.file.forEach((img) => {
        if (img.size > 1048576) {
          console.log(img.size);
          flag = false;
        }
      });
      if (flag) {
        this.errmsg = "";
        return true;
      } else {
        this.errmsg = "单个照片最大不能超过 1 MB!";
        return false;
      }
    },
    addProduction() {
      getIncompleteAdding().then(
        (res) => {
          if (res.payload) {
            this.querydialog = true;
          } else {
            this.showdialog = true;
          }
        },
        (err) => {
          this.$message("error", err.message);
        }
      );
    },
    //增加固定规格的参数
    addfixedSpecifications() {
      this.form.specs.push({ title: "", value: "" });
    },
    //删除固定规格的参数
    cancelfixedSpecifications() {
      if (this.form.specs.length >= 2) {
        this.form.specs.pop();
      } else {
        this.$message("error", "请至少保留一个参数");
      }
    },
    //增加可选规格的参数
    addoptionalSpecifications() {
      this.form.specOptions.push({ title: "", options: "" });
    },
    canceloptionalSpecifications() {
      if (this.form.specOptions.length >= 2) {
        this.form.specOptions.pop();
      } else {
        this.$message("error", "请至少保留一个参数");
      }
    },
    addProduct() {
      if (this.$refs.form.validate()) {
        this.form.specOptions.forEach((option) => {
          //分割字符串为数组
          if (typeof option.options == "string") {
            option.options = option.options.split(/,|，/);
          }
        });
        addSpu(this.form).then(
          (res) => {
            this.getSku(res);
          },
          (err) => {
            this.$message("error", err.message);
          }
        );
      } else {
        this.$message("error", "请输入完整信息");
      }
    },
    //回溯法排列组合获取sku
    getSku(res) {
      //表格header
      let newheader = [];
      res.payload.specOptions.forEach((type) => {
        newheader.push({ text: type.title });
      });
      newheader.push({ text: "状态" }, { text: "建议价格" }, { text: "价格" });
      let option = res.payload.specOptions;
      var result = [];
      var temp = {};
      var index = [];
      function TracBack(currindex) {
        if (currindex == option.length) {
          let i = index.join("_");
          let tempObject = JSON.parse(JSON.stringify(temp));
          tempObject["indexes"] = i;
          result.push(tempObject);
          return;
        }
        for (let i = 0; i < option[currindex].options.length; i++) {
          temp[option[currindex].title] = option[currindex].options[i];
          index.push(i);
          TracBack(currindex + 1);
          index.pop();
          delete temp[option[currindex].title];
        }
      }
      TracBack(0);
      result.forEach((type) => {
        type["status"] = "";
        type["suggestPrice"] = "";
        type["price"] = "";
      });
      this.desserts = result;
      this.headers = newheader;
      this.e1 = 2;
      this.showdialog = true;
    },
    //恢复添加商品
    recover() {
      this.querydialog = false;
      getIncompleteAdding().then((res) => {
        this.getSku(res);
      });
    },
    //删除添加商品
    delrecover() {
      this.querydialog = false;
      cancelAdding((res) => {
        this.$message("success", res.message);
      });
    },
    //添加sku商品价格
    addPrice() {
      if (this.$refs.form1.validate()) {
        this.desserts.forEach((type) => {
          // if (type.status === 0) {
          //   type.price = 0;
          //   type.suggestPrice = 0;
          // }
          //数据库以分存储
          type.price = type.price * 100;
          type.suggestPrice = type.suggestPrice * 100;
        });
        addSkus(this.desserts).then(
          (res) => {
            console.log(res);
            this.spuid = res.payload.spuId;
            this.$message("success", "添加商品价格成功");
            this.e1 = 3;
          },
          (err) => {
            this.$message("error", err.message);
          }
        );
      }
    },
    laterFillded() {
      this.showdialog = false;
      this.e1 = 1;
      this.resetForm();
    }
  },
  created() {
    getAllCategory().then((res) => {
      this.ciditem = res.payload.results;
    });
    this.getall();
    this.getAllCategory();
  },
  components: {
    ProductDetail
  }
};
</script>

<style></style>
