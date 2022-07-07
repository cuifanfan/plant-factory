<template>
  <v-card flat max-width="500px" no-click-animation transition="slide-y-transition" persistent>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-for="item in pwdItems"
          :key="item.tip"
          :label="item.tip"
          v-model="item.password"
          :type="item.show ? 'text' : 'password'"
          @click:append="item.show = !item.show"
          :append-icon="item.show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="item.showRules ? baseRules.concat(item.rules) : []"
          @input="item.showRules = true"
          outlined
          required
          dense
        >
        </v-text-field>
      </v-form>
      <v-btn @click="reset" color="error">重置</v-btn>
      <v-btn color="primary" class="mx-2">取消</v-btn>
      <v-btn @click="validate" color="success">确认</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { resetPassword } from "@/api/account/index.js";
export default {
  name: "ChangePassword",
  data() {
    return {
      pwdItems: [
        /**
         * tip:密码输入框提示
         * show:修改密码输入框输入内容可见模式
         * showRules:控制密码错误信息显示（调用reset方法后会清空密码框所有输入，此时修改密码验证提示信息为不可见，在输入内容后修改为可见）
         * rules:密码验证规则
         * baseRules:公共规则
         */
        {
          tip: "原密码",
          show: false,
          password: "",
          showRules: false,
          rules: []
        },
        {
          tip: "新密码",
          show: false,
          password: "",
          showRules: false,
          rules: [
            (v) => /^[A-Za-z][A-Za-z0-9!@#$%^&*._-]{7,19}$/.test(this.pwdItems[1].password) || "密码必须以字母开头"
          ]
        },
        {
          tip: "确认新密码",
          show: false,
          password: "",
          showRules: false,
          rules: [
            () => this.pwdItems[1].password === this.pwdItems[2].password || "两次密码不一致，请重新输入",
            () => this.pwdItems[0].password !== this.pwdItems[2].password || "原密码不能与新密码相同"
          ]
        }
      ],
      baseRules: [(v) => !!v || "密码不能为空", (v) => (v.length >= 8 && v.length <= 20) || "密码长度在8-20位之间"]
    };
  },
  methods: {
    reset() {
      // 清空密码输入框中的内容
      for (let item of this.pwdItems) {
        item.password = "";
        item.showRules = false;
      }
    },
    changeShowRules() {
      // 在密码框输入内容，修改密码验证提示信息可见
      this.showRules = true;
    },
    validate() {
      // this.$refs.form.validate()返回true说明当前表单验证全部通过
      if (this.$refs.form.validate()) {
        console.log(this.$refs.form.validate());
        // 发送网络请求修改密码
        resetPassword({
          oldPassword: this.pwdItems[0].password,
          newPassword: this.pwdItems[2].password
        })
          .then((res) => {
            this.$message("success", "修改成功");
            this["reset"](); // 避免下次再开启显示密码
          })
          .catch((err) => {
            this.$message("error", err.message);
          });
      }
    }
  }
};
</script>
<style></style>
