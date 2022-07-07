<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">新增服务商</span>
      </v-card-title>
      <v-card-text class="py-0 pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="2">公司名:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field label="用户名" solo dense v-model="name" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">状态:</v-col>
              <v-col class="py-1" cols="5">
                <v-select
                  :items="[
                    { text: '正常', value: '1' },
                    { text: '禁用', value: '0' }
                  ]"
                  label="状态"
                  dense
                  v-model="status"
                  clearable
                  solo
                  :rules="[(v) => !!v || '必须选择']"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">位置:</v-col>
              <v-col class="py-1">
                <v-select :items="provinceItem" label="省份" dense v-model="provinceCode" @input="getCityItem($event)" clearable solo :rules="[(v) => !!v || '必须选择']"></v-select>
              </v-col>
              <v-col class="py-1">
                <v-select :items="cityItem" label="城市" dense v-model="cityCode" clearable no-data-text="请先选择省份" solo :rules="[(v) => !!v || '必须选择']"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">具体位置:</v-col>
              <v-col class="py-1">
                <v-text-field label="详细位置" solo dense v-model="address" :rules="[(v) => !!v || '不能为空']"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">负责人:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field label="手机号码" solo dense v-model="principalName" :rules="[(v) => !!v || '不能为空']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">手机号码:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field label="负责人手机号" solo dense v-model="principalPhone" :rules="[(v) => !!v || '不能为空']"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('click')" small> 取消 </v-btn>
        <v-btn :color="loading ? 'blue darken-1' : 'white'" :class="loading ? '' : 'blue'" text @click="submit" small>
          <v-icon v-if="loading">fas fa-circle-notch fa-spin</v-icon>
          <template v-else>保存</template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addNewProvider } from "@/api/provider";
import { getArea } from "@/api/basic";
export default {
  props: ["dialog"],
  data() {
    return {
      loading: false,
      valid: true,

      provinceItem: [],
      cityItem: [],

      name: "",
      status: "",
      provinceCode: "",
      cityCode: "",
      address: "",
      principalName: "",
      principalPhone: ""
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        addNewProvider({
          name: this.name,
          status: parseInt(this.status),
          province: this.provinceCode.split("|")[1],
          provinceCode: parseInt(this.provinceCode.split("|")[0]),
          city: this.cityCode.split("|")[1],
          cityCode: parseInt(this.cityCode.split("|")[0]),
          address: this.address,
          principalName: this.principalName,
          principalPhone: this.principalPhone
        }).then(
          (value) => {
            console.log(value);
            this.$message("success", "添加成功");
            this.$parent.getdata();
            this.$emit("click");
            this.loading = false;
          },
          (reason) => {
            // console.log(reason);
            this.$message("error", reason.message);
            this.loading = false;
          }
        );
      }
    },
    getProvinceItem() {
      getArea(0).then((value) => {
        let data = value.payload;
        this.provinceItem = data.map((value) => {
          return {
            text: value.name,
            value: `${value.code}|${value.name}`
          };
        });
      });
    },
    getCityItem(pcode) {
      this.cityCode = "";
      if (!pcode) {
        this.cityItem = [];
        return;
      }
      pcode = pcode.split("|")[0];
      getArea(pcode).then((value) => {
        let data = value.payload;
        this.cityItem = data.map((value) => {
          return {
            text: value.name,
            value: `${value.code}|${value.name}`
          };
        });
      });
    }
  },
  watch: {
    dialog(value) {
      if (value) {
        this.getProvinceItem();
      } else {
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style></style>
