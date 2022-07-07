<template>
  <v-dialog v-model="dialog" persistent max-width="500px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title style="position: fixed; z-index: 9999; width: 500px" class="white">
        <span class="text-h5"> 角色详情 </span>
        <v-spacer></v-spacer>
        <v-icon large @click="$emit('click')">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="py-0 pt-16">
        <v-tabs v-model="tab">
          <v-tab>基本信息</v-tab>
          <v-tab>更改权限</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-container>
              <v-row class="pt-5">
                <v-col class="py-1">
                  <v-text-field label="称呼" outlined dense v-model="itemRole.title"> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <!-- <v-col cols="2">修改描述:</v-col> -->
                <v-col class="py-1">
                  <v-text-field label="创建时间" outlined dense v-model="itemRole.createTime" readonly> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <!-- <v-col cols="2">地址:</v-col> -->
                <v-col class="py-1">
                  <v-text-field label="描述" outlined dense v-model="itemRole.remark"> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="$emit('click')" small> 取消 </v-btn>
                <v-btn :color="loading ? 'blue darken-1' : 'white'" :class="loading ? '' : 'blue'" text @click="submitRoleProfile" small>
                  <v-icon v-if="loading">fas fa-circle-notch fa-spin</v-icon>
                  <template v-else>修改</template>
                </v-btn>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <div class="pa-2 pt-4">
              <div v-for="(item, i) in Permissions" :key="i">
                <h3>{{ item.title }}</h3>
                <div class="d-flex flex-wrap">
                  <v-checkbox :label="item2.title" v-model="selected" color="red" v-for="(item2, j) in item.permissions" :value="item2.id" hide-details :key="j" class="ma-2"></v-checkbox>
                </div>
              </div>

              <v-row class="ma-0">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="$emit('click')" small> 取消 </v-btn>
                <v-btn :color="loading ? 'blue darken-1' : 'white'" :class="loading ? '' : 'blue'" text @click="submit" small>
                  <v-icon v-if="loading">fas fa-circle-notch fa-spin</v-icon>
                  <template v-else>修改</template>
                </v-btn>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getAllPermissions, getPermissionsOfRole, updateRoleProfile, updateRolePermissions } from "@/api/account";
import { updateProviderDetail } from "@/api/provider";
export default {
  props: ["dialog", "item"],
  data() {
    return {
      loading: false,
      valid: true,
      // 当前角色
      itemRole: {},

      tab: null,

      Permissions: [],
      // 初始权限
      selectedInit: [],
      // 被选中的权限
      selected: []
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      this.loading = true;
      let added = [];
      let subed = [];
      for (let i of this.selected) {
        if (this.selectedInit.indexOf(i) === -1) {
          added.push(i);
        }
      }
      for (let i of this.selectedInit) {
        if (this.selected.indexOf(i) === -1) {
          subed.push(i);
        }
      }
      updateRolePermissions({
        id: this.item.id,
        removePermissions: subed,
        addPermissions: added
      }).then(
        (value) => {
          // console.log(value);
          this.loading = false;
          this.$message("success", "修改成功");
          this.$emit("click");
        },
        (reason) => {
          // console.log(reason);
          this.loading = false;
          this.$message("error", "修改失败:" + reason.message);
        }
      );
    },
    getPermissions() {
      getAllPermissions().then((value) => {
        let data = value.payload;
        this.Permissions = data;
      });
    },
    getOwnPermissions() {
      getPermissionsOfRole(this.item.id).then((value) => {
        let data = value.payload;
        for (let item of data) {
          for (let child of item.permissions) {
            if (child.enabled) {
              this.selected.push(child.id);
              this.selectedInit.push(child.id);
            }
          }
        }
      });
    },
    reset() {
      this.tab = 0;
      this.selected = [];
      this.selectedInit = [];
    },
    submitRoleProfile() {
      updateRoleProfile({
        id: this.itemRole.id,
        title: this.itemRole.title,
        remark: this.itemRole.remark
      }).then(
        (value) => {
          this.$message("success", "修改成功");
          this.$emit("click");
        },
        (reason) => {
          this.$message("error", reason.message);
          this.$emit("click");
        }
      );
    }
  },
  watch: {
    dialog(value) {
      if (value) {
        this.itemRole = this.item;
        this.getOwnPermissions();
      } else {
        this.reset();
      }
    }
  },
  created() {
    this.getPermissions();
  }
};
</script>
