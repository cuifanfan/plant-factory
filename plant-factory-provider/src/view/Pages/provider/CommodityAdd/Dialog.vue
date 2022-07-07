<template>
  <v-dialog v-model="dialog" persistent max-width="600px" no-click-animation transition="slide-y-transition">
    <v-card>
      <v-card-title>
        <span class="text-h5">新增商品：</span>
        <span class="text-h6 font-weight-bold">{{ activeItem.name }}</span>
      </v-card-title>
      <v-card-text class="py-0 pt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="2">价格设置:</v-col>
              <v-col cols="9" class="py-1">
                <v-text-field label="输入价格" solo dense v-model="price" :rules="priceRules"> </v-text-field>
              </v-col>
              <v-col cols="1" class="pt-0">
                <v-icon @click="calcadd('price')">fas fa-caret-up</v-icon>
                <v-icon @click="calcsub('price')">fas fa-caret-down</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">剩余库存:</v-col>
              <v-col cols="9" class="py-1">
                <v-text-field label="输入库存" solo dense v-model="stock" :rules="stockRules"></v-text-field>
              </v-col>
              <v-col cols="1" class="pt-0">
                <v-icon @click="calcadd('stock')">fas fa-caret-up</v-icon>
                <v-icon @click="calcsub('stock')">fas fa-caret-down</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">商品描述:</v-col>
              <v-col cols="10" class="py-1">
                <v-textarea solo name="input-7-4" label="请输入商品描述" no-resize v-model="remark"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="">面对群体:</v-col>
              <v-col cols="10" class="py-1">
                <v-radio-group v-model="type" row class="mt-0" :rules="[(v) => !!v || '必须选择一项']">
                  <v-radio label="用户" value="用户"></v-radio>
                  <v-radio label="下级服务商" value="下级服务商"></v-radio>
                </v-radio-group>
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
          <template v-else>添加商品</template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addMyItem } from "@/api/commodity";
export default {
  props: {
    dialog: {},
    activeItem: {
      type: Object,
      default: function () {
        return {
          name: "123"
        };
      }
    }
  },
  data: () => ({
    loading: false,
    valid: true,
    price: "",
    priceRules: [
      (v) => !!v || "不能为空",
      (v) => isNaN(parseInt(v)) || parseInt(v) >= 0 || "不得小于0",
      (v) => (v && /^\d[\.\d]+\d$/.test(v)) || "必须为纯数字"
    ],
    stock: "",
    stockRules: [
      (v) => !!v || "不能为空",
      (v) => isNaN(parseInt(v)) || parseInt(v) >= 0 || "不得小于0",
      (v) => (v && /^\d+$/.test(v)) || "必须为纯数字"
    ],
    remark: "",
    type: ""
  }),
  methods: {
    submit() {
      if (this.loading) return;
      let valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        addMyItem({
          templateId: this.activeItem.id,
          price: this.price,
          stock: this.stock,
          remark: this.remark,
          type: this.type
        }).then(
          (value) => {
            // console.log(value);
            this.$message("success", "添加成功");
            this.$emit("click");
            this.loading = false;
          },
          (reason) => {
            console.log(reason);
            setTimeout(() => {
              this.$message("error", "添加失败");
              this.loading = false;
            }, 1500);
          }
        );
      }
    },
    calcadd(v) {
      if (isNaN(parseInt(this[v]))) return;
      this[v] = String(parseInt(this[v]) + 1);
    },
    calcsub(v) {
      if (isNaN(parseInt(this[v]))) return;
      if (this[v] > 0) this[v] = String(parseInt(this[v]) - 1);
      else this[v] = "0";
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style scoped>
.scoll::-webkit-scrollbar {
  width: 5px;
}
.scoll::-webkit-scrollbar-thumb {
  background-color: tomato;
}
</style>
