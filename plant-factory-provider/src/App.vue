<template>
  <!-- 这里的v-app是vuetify的入口 不可获取 切勿删除 -->
  <v-app>
    <my-tip v-model="istip" :type="tip.type" :timeout="tip.timeout">{{ tip.tiptext }}</my-tip>
    <!-- 这里是因为有两座layout基础布局 所以在路由元信息配置中要增加layout属性 -->
    <component :is="layout">
      <!-- 这里的routerview会被作为默认插槽 因此在baseLayout.vue中用默认插槽安放即可-->
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    istip: false,
    tip: {
      type: "success",
      tiptext: "",
      timeout: 3000
    }
  }),
  computed: {
    // 两座layout布局声明在main.js中 因为已被声明为全局组件所以不需要注册
    layout() {
      let layout = this.$route.meta.layout;
      if (layout) {
        return layout + "-layout";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
body::-webkit-scrollbar {
  width: 4px;
}
body::-webkit-scrollbar-thumb {
  background-color: tomato;
}
.v-list-group__header__prepend-icon,
.v-list-item__icon {
  justify-content: center;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

.v-expansion-panel-content__wrap {
  padding: 0 !important;
}

.v-carousel__controls {
  height: 30px !important;
}
</style>
