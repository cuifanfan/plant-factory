<template>
  <v-dialog v-model="dialog" persistent max-width="500px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title style="position: fixed; z-index: 9999; width: 500px" class="white">
        <span class="text-h5">新增子角色</span>
        <v-spacer></v-spacer>
        <v-icon large @click="$emit('click')">mdi-close-octagon-outline</v-icon>
      </v-card-title>
      <v-card-text class="py-0 pt-16">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row class="mb-2"><h3>基本信息</h3></v-row>
            <v-row>
              <v-col class="py-1">
                <v-text-field label="角色名称" outlined dense v-model="title" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
              </v-col>
              <v-col class="py-1">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field label="角色标识" outlined dense v-model="value" :rules="[(v) => !!v || '不能为空']" v-bind="attrs" v-on="on"> </v-text-field>
                  </template>
                  <span>角色标识用来唯一的标识一个角色，值为小写英文字母，角色标识设置后无法更改</span>
                </v-tooltip>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="py-1">
                <v-text-field label="备注" outlined dense v-model="remark" :rules="[(v) => !!v || '不能为空']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <h3>选择权限</h3>

              <div class="pa-2 pt-4">
                <div v-for="(item, i) in Permissions" :key="i">
                  <h3>{{ item.title }}</h3>
                  <div class="d-flex flex-wrap">
                    <v-checkbox :label="item2.title" v-model="selected" color="red" v-for="(item2, j) in item.permissions" :value="item2.id" hide-details :key="j" class="ma-2"></v-checkbox>
                  </div>
                </div>
              </div>

              <!-- <v-tabs v-model="tab" slider-size="0">
                <v-tab v-for="(item, i) in Permissions" :key="i">{{
                  item.title
                }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="(item, i) in Permissions" :key="i">
                  <div class="d-flex flex-wrap">
                    <v-checkbox
                      :label="item2.title"
                      v-model="selected"
                      color="red"
                      v-for="(item2, j) in item.permissions"
                      :value="item2.id"
                      hide-details
                      :key="j"
                      class="ma-2"
                    ></v-checkbox>
                  </div>
                </v-tab-item>
              </v-tabs-items> -->
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
import { getAllPermissions, addRole } from "@/api/account";
export default {
  props: ["dialog", "item"],
  data() {
    return {
      loading: false,
      valid: true,

      tab: undefined,

      Permissions: [],

      title: "",
      value: "",
      remark: "",
      selected: []
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        addRole({
          title: this.title,
          value: this.value,
          remark: this.remark,
          permissions: this.selected,
          pid: this.item.id
        }).then(
          (value) => {
            this.$message("success", "添加成功");
            this.$parent.getdata();
            this.$emit("click");
            this.loading = false;
          },
          (reason) => {
            this.$message("error", reason.message);
            this.loading = false;
          }
        );
      }
    },
    getPermissions() {
      getAllPermissions().then((value) => {
        let data = value.payload;
        this.Permissions = data;
      });
    }
  },
  watch: {
    dialog(value) {
      if (value) {
      } else {
        this.$refs.form.reset();
      }
    }
  },
  created() {
    this.getPermissions();
  }
};
</script>

<style></style>
