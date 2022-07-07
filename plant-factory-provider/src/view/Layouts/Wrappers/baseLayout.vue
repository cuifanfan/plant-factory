<template>
  <v-app>
    <!-- 此处运用了父孙组件数据双向绑定 请勿随意更改 -->
    <my-subnav :ismini="ismini" :isopen.sync="isopen"></my-subnav>
    <my-navbar @subnavCtrl="subnavCtrl"></my-navbar>
    <my-main><slot></slot></my-main>
  </v-app>
</template>

<script>
import mySubnav from "../Components/Subnav.vue";
import myMain from "../Components/Content.vue";
import myNavbar from "../Components/Navbar.vue";
export default {
  data() {
    return {
      // 侧边栏是否缩小控制
      ismini: false,
      //侧边栏是否打开
      isopen: null
    };
  },
  methods: {
    // 侧边栏是否缩小控制 以及手机端是否关闭
    subnavCtrl() {
      if (this.isopen) {
        this.ismini = !this.ismini;
      } else {
        this.ismini = false;
        this.isopen = true;
      }
    }
  },
  components: {
    mySubnav,
    myNavbar,
    myMain
  }
};
</script>

<style scoped></style>
