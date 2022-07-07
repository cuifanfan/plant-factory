<template>
  <v-dialog v-model="dialog" persistent max-width="500px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5"> 服务商详情 </span>
      </v-card-title>
      <v-card-text class="py-0 pt-5">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <!-- <v-col cols="2">修改名称:</v-col> -->
              <v-col class="py-1">
                <v-text-field label="公司名称" outlined dense v-model="name" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
              </v-col>
              <v-col class="py-1">
                <v-select
                  :items="[
                    { text: '正常', value: 1 },
                    { text: '禁用', value: 0 }
                  ]"
                  label="状态设置"
                  outlined
                  dense
                  v-model="status"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <!-- <v-col cols="2">修改描述:</v-col> -->
              <v-col class="py-1">
                <v-textarea no-resize height="100" label="修改描述备注" outlined dense v-model="statusRemark" :rules="[(v) => !!v || '不能为空']"> </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <!-- <v-col cols="2">地址:</v-col> -->
              <v-col class="py-1">
                <v-text-field label="修改详细地址" outlined dense v-model="address" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- <v-col cols="2">负责人:</v-col> -->
              <v-col class="py-1">
                <v-text-field label="负责人" outlined dense v-model="principalName" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
              </v-col>
              <v-col class="py-1">
                <v-text-field label="负责人手机号码" outlined dense v-model="principalPhone" :rules="[(v) => !!v || '不能为空']"> </v-text-field>
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
import { updateProviderDetail } from "@/api/provider";
export default {
  props: ["dialog", "item"],
  data() {
    return {
      loading: false,
      valid: true,

      name: "",
      status: 0,
      statusRemark: "",
      address: "",
      principalName: "",
      principalPhone: ""
    };
  },
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        updateProviderDetail({
          id: this.item.id,
          name: this.name,
          status: this.status,
          statusRemark: this.statusRemark,
          address: this.address,
          principalName: this.principalName,
          principalPhone: this.principalPhone
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
      if (value) {
        // console.log(this.item);
        this.name = this.item.name;
        this.address = this.item.address;
        this.principalName = this.item.principalName;
        this.principalPhone = this.item.principalPhone;

        this.status = this.item.status;
      } else {
        this.$refs.form.reset();
      }
    }
  }
};
</script>
