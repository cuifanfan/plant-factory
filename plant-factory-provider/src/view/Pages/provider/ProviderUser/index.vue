<template>
  <v-row class="ma-0">
    <!-- <div>
      <v-card width="400" class="pb-8">
        <v-card-title class="text-h5">个人信息</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-center pb-2">
          <v-avatar color="primary" size="100" class="">
            <v-img
              :src="$staticpath.avatar + myinfo.avatar"
              v-if="myinfo.avatar"
            >
            </v-img>
          </v-avatar>
        </v-card-text>
        <v-card-text class="d-flex justify-center pa-0 pb-2">
          <v-btn outlined color="indigo" small @click="changeAvatar">
            更改头像
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between py-2 black--text">
          <div class="d-flex align-center">用户名</div>
          <div class="d-flex align-center">{{ myinfo.name }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between py-2 black--text">
          <div class="d-flex align-center">手机号码</div>
          <div class="d-flex align-center">{{ myinfo.phone }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between py-2 black--text">
          <div class="d-flex align-center">选项3</div>
          <div class="d-flex align-center">123456</div>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </div> -->

    <v-col class="pa-0 ml-2">
      <v-card>
        <v-card-title class="text-h5">基本资料</v-card-title>
        <v-card-text class="py-0">
          <v-tabs v-model="tab">
            <v-tab>个人资料</v-tab>
            <v-tab>修改密码</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <my-info></my-info>
            </v-tab-item>
            <v-tab-item>
              <reset-pwd></reset-pwd>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import myInfo from "./resetInfo.vue";
import resetPwd from "./resetPwd.vue";
export default {
  data() {
    return {
      tab: null
    };
  },
  components: {
    myInfo,
    resetPwd
  }
};
</script>

<style></style>
