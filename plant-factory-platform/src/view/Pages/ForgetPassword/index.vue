<template>
  <v-container>
    <v-row justify="center" align-content="center" class="" style="height: 100vh">
      <v-col xl="3" lg="5" sm="7" xs="9">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"> 确认账号密码 </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"> 重置成功 </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="form">
                <v-text-field label="请输入绑定的手机号" :rules="phonerules" v-model="phoneForm.phone"></v-text-field>
                <v-text-field
                  label="请输入新密码"
                  :rules="newpasswordrules"
                  v-model="phoneForm.newpassword"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                ></v-text-field>
                <v-text-field
                  label="请确认新密码"
                  :rules="surepasswordrule"
                  v-model="phoneForm.surepassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
              <v-form>
                <v-row>
                  <v-col cols="7">
                    <v-text-field label="请输入手机验证码" :rules="validatedrules" v-model="phoneForm.validated"></v-text-field>
                  </v-col>
                  <v-col></v-col>
                  <v-col cols="4">
                    <v-btn color="primary" light :disabled="disabled" @click="makeSurePhone">{{ validInfo }}</v-btn>
                  </v-col>
                </v-row>
                <v-btn color="primary" @click="findpassword">确认</v-btn>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card class="mb-12" height="200px" elevation="0">
                <v-row justify="center">
                  <v-col cols="1" align-self="center"><v-icon color="green" large>mdi-check-bold</v-icon></v-col>
                  <v-col cols="5">
                    <v-card-title> 重置密码成功 </v-card-title>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="5"
                    ><v-card-title> {{ jumpInfo }}</v-card-title></v-col
                  >
                </v-row>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title>
          <v-icon large left> mdi-twitter </v-icon>
          <span class="text-h6 font-weight-light">验证码</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form1" lazy-validation class="white">
            <v-row>
              <v-col cols="6">
                <v-text-field label="请输入验证码" :rules="validatedrules" v-model="validatedForm.validated"></v-text-field>
              </v-col>
              <v-col></v-col>
              <v-col cols="5">
                <v-img width="120" height="50" img :src="img" alt="" v-if="showImg" @click="getImageagain"></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-btn color="primary" @click="sendmessage">确认 </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getImage, getvalid, findpassword } from "@/api/authentication";
export default {
  data() {
    return {
      jumpInfo: "等待5s跳转到登录页面",
      //禁用按钮
      disabled: false,
      //获取验证码文字
      validInfo: "获取验证码",
      //展示密码
      show: false,
      sessionKey: "",
      //展示验证码
      show1: false,
      validatedForm: {
        validated: ""
      },
      //展示对话框
      showDialog: false,
      showImg: false,
      e1: 1,
      phonerules: [(v) => !!v || "账号不能为空", (v) => (v && v.length == 11) || "请输入11位手机号"],
      newpasswordrules: [
        (v) => {
          const reg = /^([a-zA-Z]+.*)$/;
          return reg.test(v) || "必须以字母开头";
        },
        (v) => !!v || "密码不能为空",
        (v) => (v && v.length >= 8) || "密码须8位以上"
      ],
      surepasswordrule: [(v) => !!v || "确认密码不能为空", (v) => v === this.phoneForm.newpassword || "密码不一致", (v) => (v && v.length >= 8) || "确认密码须8位以上"],
      validatedrules: [(v) => !!v || "验证码不能为空"],
      phoneForm: {
        phone: "",
        newpassword: "",
        surepassword: "",
        validated: ""
      },
      img: ""
    };
  },
  methods: {
    makeSurePhone() {
      let valid = this.$refs.form.validate();
      if (valid) {
        getImage()
          .then((data) => {
            console.log(data);
            this.showDialog = true;
            this.session = data.payload.session;
            this.validatedForm.validated = "";
            this.showImg = true;
            this.img = "data:image/png;base64," + data.payload.image;
          })
          .catch((err) => {
            this.$message("error", "账号不存在");
          });
      }
    },
    getImageagain() {
      getImage().then((data) => {
        this.session = data.payload.session;
        this.img = "data:image/png;base64," + data.payload.image;
      });
    },
    sendmessage() {
      getvalid({
        // goal: "forgotProviderPassword",
        phone: this.phoneForm.phone,
        // imageCaptcha: this.validatedForm.validated,
        session: this.session,
        purpose: 2,
        code: this.validatedForm.validated
      })
        .then((data) => {
          this.showDialog = false;
          this.$message("success", "发送验证码成功");
          this.disabled = true;
          this.validInfo = "等待60s获取";
          let count = 60;
          let interId = setInterval(() => {
            count = count - 1;
            this.validInfo = "等待" + count + "s获取";
            if (count == 0) {
              this.disabled = false;
              clearInterval(interId);
              this.validInfo = "获取验证码";
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          this.$message("error", "验证码错误");
          this.validatedForm.validated = "";
          this.getImageagain();
        });
    },
    findpassword() {
      let valid = this.$refs.form.validate();
      if (valid) {
        findpassword({
          phone: this.phoneForm.phone,
          newPassword: this.phoneForm.newpassword,
          code: this.phoneForm.validated
        })
          .then((data) => {
            this.$message("success", "修改成功");
            this.e1 = 2;
            let count = 5;
            let interId = setInterval(() => {
              count = count - 1;
              this.jumpInfo = "等待" + count + "s跳转到登录页面";
              if (count == 0) {
                this.$router.push("/");
                clearInterval(interId);
              }
            }, 1000);
          })
          .catch((err) => {
            this.$message("error", "验证码不正确");
          });
      }
    }
  }
};
</script>
<style></style>
