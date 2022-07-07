<template>
  <v-card flat>
    <v-card-text class="">
      <v-row class="ma-0">
        <div class="ma-4 ml-0">
          <v-avatar color="primary" size="100" class="">
            <v-img :src="$staticpath.avatar + myinfo.avatar" v-if="myinfo.avatar"> </v-img>
          </v-avatar>
          <div class="d-flex justify-center mt-2">
            <v-btn outlined color="indigo" small @click="changeAvatar"> 更改头像 </v-btn>
          </div>
        </div>
        <div style="width: 500px">
          <v-text-field label="用户名" outlined dense v-model="myinfo.name"></v-text-field>
          <v-text-field label="手机号码" outlined dense v-model="myinfo.phone" disabled></v-text-field>
          <v-text-field label="创建时间" outlined dense v-model="myinfo.createAt" disabled></v-text-field>
          <v-text-field label="角色" outlined dense v-model="myinfo.role" disabled></v-text-field>
          <v-btn color="primary"> 保存 </v-btn>
        </div>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="400px" transition="slide-y-transition">
      <v-card>
        <v-card-text class="pa-2 pt-3">
          <v-file-input
            :loading="loading"
            v-model="file"
            label="上传头像"
            outlined
            dense
            show-size
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg, image/jpg"
            :error-messages="errmsg"
            @change="valid"
          >
          </v-file-input>
          <v-btn @click="dialog = false">关闭</v-btn>
          <v-btn @click="submit" class="ml-2">确定提交</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { getMyInfo, updateAccountAvatar } from "../../../../api/account";
export default {
  data() {
    return {
      myinfo: {},
      dialog: false,
      file: undefined,
      loading: false,
      errmsg: ""
    };
  },
  methods: {
    changeAvatar() {
      this.dialog = true;
    },
    submit() {
      if (!this.valid()) return;
      if (this.loading) return;
      this.loading = true;
      let formData = new FormData();
      // console.log(formData);
      formData.append("avatar", this.file);
      updateAccountAvatar(formData).then(
        (value) => {
          //   console.log(value);
          this.$message("success", "头像上传成功");
          this.loading = false;
          this.dialog = false;
          this.file = undefined;
        },
        (reason) => {
          //   console.log(reason);
          this.$message("error", "头像上传失败");
          this.loading = false;
        }
      );
    },
    valid() {
      if (!this.file) return false;
      if (this.file.size > 1048576) {
        this.errmsg = "最多不能超过 1 MB!";
        return false;
      }
      console.log(111);
      this.errmsg = "";
      return true;
    }
  },
  created() {
    getMyInfo().then(
      (value) => {
        // console.log(value);
        let data = value.payload;
        this.myinfo = data;
      },
      (reason) => {
        // console.log(reason);
      }
    );
  }
};
</script>

<style></style>
