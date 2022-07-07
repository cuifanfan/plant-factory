<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">新增社区服务人员</span>
      </v-card-title>
      <v-card-text class="py-0 pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="2">用户名:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field label="用户名" solo dense v-model="name" :rules="[(v) => !!v || '不能为空']">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">手机号码:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field
                  label="手机号码"
                  solo
                  dense
                  v-model="phone"
                  :rules="[(v) => !!v || '不能为空', (v) => (v && v.length == 11) || '请输入正确的手机号']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">登录密码:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field
                  label="密码"
                  solo
                  dense
                  v-model="password"
                  :rules="[(v) => !!v || '不能为空']"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
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
import { addNewEngineer } from "@/api/account";
export default {
  props: ["dialog"],
  data() {
    return {
      show1: false,

      time: 60,
      errmsg: "",
      loading: false,
      waiting: false,
      valid: true,
      name: "",
      phone: "",
      password: "",
      code: ""
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        addNewEngineer({
          name: this.name,
          phone: this.phone,
          password: this.password
        }).then(
          (value) => {
            this.$message("success", "添加成功");
            this.$parent.getdata();
            this.$emit("click");
            this.loading = false;
          },
          (reason) => {
            if (reason.code === 40000 && !!reason.message) {
              this.$message("error", reason.message);
            } else {
              this.$message("error", "添加失败，请稍后再试");
            }
            this.loading = false;
          }
        );
      }
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.form.reset();
      }
    }
  }
};
</script>
