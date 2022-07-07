<template>
  <v-dialog v-model="dialog" persistent max-width="500px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title style="position: fixed; z-index: 9999; width: 500px" class="white">
        <span class="text-h5"> 账户详情 </span>
        <v-spacer></v-spacer>
        <v-icon large @click="$emit('click')">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="pt-16">
        <v-tabs v-model="tab">
          <v-tab>基本信息</v-tab>
          <v-tab>权限信息</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row class="pt-5">
                  <v-col cols="8">
                    <v-row>
                      <div class="pa-2" style="width: 120px">
                        <!-- <v-text-field
                          label="昵称"
                          outlined
                          dense
                          v-model="account.nickname"
                          :rules="[(v) => !!v || '不能为空']"
                          readonly
                        >
                        </v-text-field> -->
                        <h2 class="text-h6 black--text">昵称:</h2>
                      </div>
                      <v-col class="pa-2">
                        <h2 class="text-h6">
                          {{ account.nickname }}
                        </h2>
                      </v-col>
                    </v-row>

                    <v-row>
                      <div class="pa-2" style="width: 120px">
                        <h2 class="text-h6 black--text">性别:</h2>
                      </div>
                      <v-col class="pa-2">
                        <h2 class="text-h6">
                          {{ sex[account.gender] }}
                        </h2>
                      </v-col>
                    </v-row>

                    <!-- <v-row>
                      <v-col class="py-1">
                        <v-select
                          label="状态"
                          :items="[
                            { text: '正常', value: 1 },
                            { text: '禁用', value: 0 },
                          ]"
                          outlined
                          dense
                          v-model="account.status"
                        ></v-select>
                      </v-col>
                      <v-col class="py-1">
                        <v-select
                          label="性别"
                          :items="[
                            { text: '女', value: 2 },
                            { text: '男', value: 1 },
                            { text: '保密', value: 0 },
                          ]"
                          outlined
                          dense
                          v-model="account.gender"
                          readonly
                        ></v-select>
                      </v-col>
                    </v-row> -->

                    <v-row>
                      <div class="pa-2" style="width: 120px">
                        <h2 class="text-h6 black--text">真实姓名:</h2>
                      </div>
                      <v-col class="pa-2">
                        <h2 class="text-h6">
                          {{ account.realName }}
                        </h2>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row justify="center" class="pt-2">
                      <v-avatar color="primary" size="100" class="">
                        <v-img :src="$staticpath.avatar + account.avatar" alt="无" v-if="account.avatar" @error="account.avatar = false">
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey lighten-5" size="20" width="2"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                        <template v-else><span class="white--text">无</span></template>
                      </v-avatar>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col class="py-1">
                    <v-text-field
                      label="真实姓名"
                      outlined
                      dense
                      v-model="account.realName"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="py-1">
                    <v-text-field
                      label="生日"
                      outlined
                      dense
                      v-model="account.birth"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                </v-row> -->
                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">生日:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.birth }}
                    </h2>
                  </v-col>
                </v-row>

                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">个人介绍:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.intro }}
                    </h2>
                  </v-col>
                </v-row>
                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">手机号码:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.phone }}
                    </h2>
                  </v-col>
                </v-row>
                <!-- <v-row>
                  <v-col class="py-1">
                    <v-text-field
                      label="个人介绍"
                      outlined
                      dense
                      v-model="account.intro"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                </v-row> -->
                <!-- <v-row>
                  <v-col class="py-1">
                    <v-text-field
                      label="手机号码"
                      outlined
                      dense
                      v-model="account.phone"
                      :rules="[(v) => !!v || '不能为空']"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                </v-row> -->

                <v-row>
                  <div class="pa-2 d-flex align-center" style="width: 120px">
                    <h2 class="text-h6 black--text">状态:</h2>
                  </div>
                  <v-col class="pa-2 d-flex align-center justify-space-between">
                    <h2 class="text-h6">
                      {{ status[account.status] }}
                    </h2>
                    <div>
                      <v-btn depressed color="error" small @click="dialogStop = true"> 禁用 </v-btn>
                      <v-btn depressed color="warning" small class="ml-2" @click="dialogOut = true"> 下线 </v-btn>
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <div class="pa-2 d-flex align-center" style="width: 120px">
                    <h2 class="text-h6 black--text">服务商:</h2>
                  </div>
                  <v-col class="pa-2 d-flex align-center justify-space-between">
                    <h2 class="text-h6">
                      {{ account.group }}
                    </h2>

                    <v-btn depressed color="success" small> 指定服务商 </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">所在省份:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.province }}
                    </h2>
                  </v-col>
                </v-row>

                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">所在城市:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.city }}
                    </h2>
                  </v-col>
                </v-row>

                <v-row>
                  <div class="pa-2" style="width: 120px">
                    <h2 class="text-h6 black--text">创建时间:</h2>
                  </div>
                  <v-col class="pa-2">
                    <h2 class="text-h6">
                      {{ account.createTime }}
                    </h2>
                  </v-col>
                </v-row>

                <!-- <v-row>
                  <v-col class="py-1">
                    <v-text-field
                      label="所在省份"
                      outlined
                      dense
                      v-model="account.province"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="py-1">
                    <v-text-field
                      label="所在城市"
                      outlined
                      dense
                      v-model="account.city"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-1">
                    <v-text-field
                      label="所属组织"
                      outlined
                      dense
                      v-model="account.group"
                      :rules="[(v) => !!v || '不能为空']"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="py-1">
                    <v-text-field
                      label="创建时间"
                      outlined
                      dense
                      v-model="account.createTime"
                      :rules="[(v) => !!v || '不能为空']"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <div class="pa-2 pt-4">
              <div>
                <h3>平台角色</h3>
                <v-radio-group v-model="powerPlatform" row class="ma-0">
                  <v-radio v-for="(item, i) in roles.platform" :label="item.title" :value="item.id" :key="i"></v-radio>
                </v-radio-group>
              </div>

              <div>
                <h3>服务商角色</h3>
                <v-radio-group v-model="powerProvider" row class="ma-0">
                  <v-radio v-for="(item, i) in roles.provider" :label="item.title" :value="item.id" :key="i"></v-radio>
                </v-radio-group>
              </div>
              <v-row class="ma-0" justify="center">
                <v-btn depressed color="primary" small @click="updateRoles">保存角色</v-btn>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('click')" small>
          取消
        </v-btn>
        <v-btn
          :color="loading ? 'blue darken-1' : 'white'"
          :class="loading ? '' : 'blue'"
          text
          @click="submit"
          small
        >
          <v-icon v-if="loading">fas fa-circle-notch fa-spin</v-icon>
          <template v-else>修改</template>
        </v-btn>
      </v-card-actions> -->
    </v-card>
    <v-dialog v-model="dialogOut" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 确定要踢下线吗? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="loginOut"> 确定 </v-btn>
          <v-btn color="green darken-1" text @click="dialogOut = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogStop" max-width="290" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5"> 确定要禁用吗? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="submit"> 确定 </v-btn>
          <v-btn color="green darken-1" text @click="dialogStop = false"> 取消 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { getAccountRoles, getAccountProfile, updateAccountRoles, updateAccountStatus, forceOffline } from "@/api/account";
import { getAllRoles } from "@/api/account/";
export default {
  props: ["dialog", "item"],
  data() {
    return {
      dialogOut: false,
      dialogStop: false,

      // 个人账户信息
      account: {},
      // 个人角色信息
      // roles: [],

      tab: null,

      powerPlatform: -1,
      powerProvider: -1,

      originRoles: [],

      roles: {
        platform: [],
        provider: []
      },

      sex: {
        0: "保密",
        1: "男",
        2: "女"
      },
      status: {
        0: "禁用",
        1: "正常"
      }
    };
  },
  methods: {
    submit() {
      updateAccountStatus(this.account.uid, this.account.status).then(
        (value) => {
          this.$message("success", "修改成功");
          this.dialogStop = false;
        },
        (reason) => {
          this.$message("error", "修改失败");
          this.dialogStop = false;
        }
      );
    },
    getRoles() {
      getAllRoles().then((value) => {
        let data = value.payload;
        this.originRoles = data;
        for (let item of data) {
          if (item.value === "platform") {
            this.roles.platform.push(item, ...item.subRoles);
          } else if (item.value === "provider") {
            this.roles.provider.push(item, ...item.subRoles);
          } else if (item.value === "user") {
            this.roles.platform.push({
              id: -1,
              title: "无"
            });
            this.roles.provider.push({
              id: -1,
              title: "无"
            });
          }
        }
      });
    },
    reset() {
      this.powerPlatform = -1;
      this.powerProvider = -1;
      this.tab = 0;
    },
    getProfile() {
      getAccountProfile(this.item.uid).then((value) => {
        let data = value.payload;
        this.account = data;
      });
    },
    getOwnRoles() {
      getAccountRoles(this.item.uid).then((value) => {
        let data = value.payload;
        for (let id of data) {
          for (let item of this.originRoles) {
            if (item.id === id && item.value === "platform") {
              this.powerPlatform = id;
              break;
            } else if (item.id === id && item.value === "provider") {
              this.powerProvider = id;
              break;
            }
            for (let child of item.subRoles) {
              if (child.id === id && item.value === "platform") {
                this.powerPlatform = id;
                break;
              } else if (child.id === id && item.value === "provider") {
                this.powerProvider = id;
                break;
              }
            }
          }
        }
      });
    },
    updateRoles() {
      let p1 = this.powerProvider === -1 ? null : this.powerProvider;
      let p2 = this.powerPlatform === -1 ? null : this.powerPlatform;
      updateAccountRoles({
        uid: this.item.uid,
        providerRole: p1,
        platformRole: p2
      }).then(
        (value) => {
          this.$message("success", "保存用户角色成功");
        },
        (reason) => {
          this.$message("error", "已有服务商角色的情况下，不能设置无角色");
        }
      );
    },

    loginOut() {
      forceOffline(this.account.uid).then(
        (value) => {
          this.$message("success", "踢下线成功");
          this.getProfile();
          this.dialogOut = false;
        },
        (reason) => {
          // console.log(reason);
          this.$message("error", "踢下线失败");
          this.dialogOut = false;
        }
      );
    }
  },
  watch: {
    dialog(value) {
      if (value) {
        this.getProfile();
        this.getOwnRoles();
      } else {
        this.$refs.form.reset();
        this.reset();
      }
    }
  },
  created() {
    this.getRoles();
  }
};
</script>
