<template>
  <div>
    <v-textarea outlined name="input-7-4" label="请尽可能详细的描述您在系统使用过程中遇到的问题" v-model="text" hide-details class="pb-4"></v-textarea>
    <v-btn class="blue text-subtitle-2" text color="white" @click="submit"> 提交反馈 </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    submit() {
      this.$message("success", "反馈提交成功");
    }
  }
};
</script>

<style></style>
