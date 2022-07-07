<template>
  <!-- 日期组件 -->
  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="date"
        @input="send"
        prepend-inner-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :label="text"
        style="max-width: 200px"
        dense
        outlined
        clearable
        :class="myclass"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="date"
      @input="send($event)"
      :active-picker.sync="activePicker"
      :max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
      locale="zh-cn"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["value", "text", "myclass", "mystyle"],
  data: () => ({
    activePicker: null,
    date: null,
    menu: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    send(e) {
      this.date = e;
      this.$emit("input", e);
    }
  }
};
</script>

<style></style>
