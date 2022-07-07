<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">
          修改社区服务人员:
          <span class="text-h6 font-weight-bold">{{ item.name }}</span>
        </span>
      </v-card-title>
      <v-card-text class="py-0 pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="2">修改姓名:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field
                  label="姓名"
                  solo
                  dense
                  :value="item.name"
                  @input="name = $event"
                  :rules="[(v) => !!v || '不能为空']"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">修改状态:</v-col>
              <v-col cols="10" class="py-1">
                <v-select
                  :items="[
                    { text: '正常', value: 1 },
                    { text: '禁用', value: 0 }
                  ]"
                  :label="'状态设置(当前:' + item.status + ')'"
                  solo
                  dense
                  v-model="status"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">登录密码:</v-col>
              <v-col cols="10" class="py-1">
                <v-text-field
                  label="密码(不填则不修改)"
                  solo
                  dense
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('click')" small> 取消 </v-btn>
        <v-btn :color="loading ? 'blue darken-1' : 'white'" :class="loading ? '' : 'blue'" text @click="submit" small>
          <v-icon v-if="loading">fas fa-circle-notch fa-spin</v-icon>
          <template v-else>修改</template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { updateEngineer } from "@/api/account";
export default {
  props: ["dialog", "item"],
  data() {
    return {
      show1: false,

      time: 60,
      errmsg: "",
      loading: false,
      waiting: false,
      valid: true,
      name: "",
      status: undefined,
      password: ""
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        console.log(this.status);
        this.loading = true;
        updateEngineer({
          phone: this.item.phone,
          name: this.name,
          status: this.status,
          password: this.password
        }).then(
          (value) => {
            this.$message("success", "修改成功");
            this.$parent.getdata();
            this.$emit("click");
            this.loading = false;
          },
          (reason) => {
            if (reason.code === 40000 && !!reason.message) {
              this.$message("error", reason.message);
            } else {
              this.$message("error", "修改失败，请稍后再试");
            }
            this.loading = false;
          }
        );
      }
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        // this.$refs.form.reset();
      }
    }
  }
};
</script>
