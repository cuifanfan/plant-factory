<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">新增用户</span>
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
                  :rules="[(v) => !!v || '不能为空']"
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
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">验证码:</v-col>
              <v-col cols="4" class="py-1">
                <v-text-field label="验证码" solo dense v-model="code" :error-messages="errmsg" @input="validcode">
                </v-text-field>
              </v-col>
              <v-btn :class="waiting ? 'mt-1 grey lighten-1' : 'mt-1 blue'" text color="white" @click="sendcode">
                {{ waiting ? time : "发送" }}
              </v-btn>
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
import { addProviderRole } from "@/api/account";
export default {
  props: ["dialog"],
  data() {
    return {
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
        addProviderRole({
          name: this.name,
          phone: this.phone,
          password: this.password
        }).then(
          (value) => {
            setTimeout(() => {
              this.$message("success", "添加成功");
              this.$parent.getdata();
              this.$emit("click");
              this.loading = false;
            }, 3000);
          },
          (reason) => {
            setTimeout(() => {
              this.$message("error", "添加失败");
              this.loading = false;
            }, 3000);
          }
        );
      }
    },
    validcode() {
      if (!this.phone) {
        this.errmsg = "请输入手机号";
        return false;
      }
      if (!this.code) {
        this.errmsg = "请输入验证码";
        return false;
      }
      this.errmsg = "";
      return true;
    },
    sendcode() {
      if (this.waiting) return;
      if (this.validcode()) {
        this.waiting = true;
        let a = setInterval(() => {
          this.time -= 1;
          if (!this.time) {
            clearInterval(a);
            this.time = 60;
            this.waiting = false;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style></style>
