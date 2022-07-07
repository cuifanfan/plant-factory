<template>
  <v-container>
    <v-row class="mt-16" justify="center">
      <v-col xl="6" lg="8" sm="11" class="bg pa-8 rounded-lg">
        <v-container>
          <v-row>
            <v-col lg="6" class="white--text" :style="{ display: isblock }">
              <h1 class="title text-h1 font-weight-bold text-center mt-16">方芯</h1>
              <div class="hr white mx-5 my-8"></div>
              <p class="text-h6 text-center p">发展智慧农业科技的创新企业</p>
            </v-col>
            <v-col lg="6" class="right white rounded-lg pa-0 pt-8 pb-5">
              <v-col cols="10" offset="1">
                <v-row justify="center">
                  <v-avatar color="primary" size="100">
                    <v-img :src="avatar" alt="头像"></v-img>
                  </v-avatar>
                </v-row>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="username"
                    :counter="20"
                    :rules="usernameRules"
                    label="手机号"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="密码"
                    required
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-checkbox
                    v-model="checkbox"
                    label="记住账号密码"
                    required
                    :style="{ display: 'inline-block' }"
                  ></v-checkbox>
                  <a href="javascript:;" class="grey--text float-right pt-5" @click="$router.push('/findpassword')">
                    忘记密码
                  </a>
                  <v-btn
                    class="mr-4 black"
                    @click="validate"
                    :text="true"
                    color="#fff"
                    block
                    :large="true"
                    :style="{
                      display: 'block',
                      fontSize: '25px'
                    }"
                  >
                    登录
                  </v-btn>
                </v-form>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { providerLogin } from "@/api/authentication";

export default {
  data: () => ({
    avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
    valid: "",
    //用于密码是否显示
    show1: false,
    //响应式显示
    isshow: true,
    //以下为form表单内容及其验证规则
    username: "",
    usernameRules: [
      (v) => !!v || "账号不能为空",
      (v) => (v && v.length == 11) || "请输入正确的手机号"
      // (v) => (v && v.length <= 20) || "必须在20个字符以内",
      // (v) => checkEmail(v) || "邮箱格式要正确",
    ],
    password: "",
    passwordRules: [(v) => !!v || "密码不能为空"],
    checkbox: false
  }),

  methods: {
    //提交前对整个form表单进行校验
    validate() {
      let valid = this.$refs.form.validate();
      if (valid) {
        providerLogin({
          phone: this.username,
          password: this.password
        }).then(
          //登录成功回调
          (value) => {
            let data = value;
            console.log(data);
            // 登录成功提示
            this.$message("success", "登录成功");
            let storage = window.localStorage;
            // let storageData = {
            //   token: data.payload.token,
            // };

            //清除之前的信息并存入新的信息
            // if (storage.getItem("storageData")) {
            //   storage.removeItem("storageData");
            // }
            // // 登陆成功则储存token
            // storage.setItem("storageData", JSON.stringify(storageData));
            setTimeout(() => {
              this.$router.push("/admin/provider");
            }, 0);

            //判断是否存储账号和密码
            if (this.checkbox) {
              let user = {
                username: this.username,
                password: this.password,
                avatarpath: ""
              };
              storage.setItem("user", JSON.stringify(user));
            } else {
              storage.removeItem("user");
            }
          },
          //登录失败回调
          (reason) => {
            // console.log(reason);

            this.$message("error", "登录失败，请稍后再试");

            //登录失败移除之前的用户信息
            window.localStorage.clear();
          }
        );
      }
    }
  },

  computed: {
    //响应式设置控件是否显示
    isblock() {
      return this.isshow ? "block" : "none";
    }
  },
  created() {
    document.body.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          if (this.$route.path === "/login") {
            this.validate();
          }
        }
      },
      false
    );
    //渲染前先获取屏幕宽度
    let initWidth = window.document.body.offsetWidth;
    if (initWidth <= 700) {
      this.isshow = false;
    } else {
      this.isshow = true;
    }

    window.onresize = () => {
      let offsetWidth = window.document.body.offsetWidth;
      if (offsetWidth <= 700) {
        this.isshow = false;
      } else {
        this.isshow = true;
      }
    };

    //判断是否有用户信息
    let user = window.localStorage.getItem("user");
    if (user) {
      let data = JSON.parse(user);
      this.checkbox = true;
      if (data.username) this.username = data.username;
      if (data.password) this.password = data.password;
      // console.log(data.avatarpath);
      if (data.avatarpath) this.avatar = data.avatarpath;
    } else {
      this.checkbox = false;
    }
  }
};
</script>
<style scoped>
.bg {
  background-color: rgba(0, 0, 0, 0.4);
}

.title {
  height: 120px;
  font-family: SimSun !important;
  line-height: 120px;
}

.hr {
  height: 3px;
}

.p {
  height: 30px;
  letter-spacing: 5px !important;
}
</style>
