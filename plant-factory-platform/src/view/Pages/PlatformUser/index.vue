<template>
  <v-row class="ma-0">
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
