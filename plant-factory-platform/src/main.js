import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify/lib";
import "@fortawesome/fontawesome-free/css/all.css";
// 以下为两座layout布局 声明为全局组件
import loginLayout from "./view/Layouts/Wrappers/loginLayout.vue";
import baseLayout from "./view/Layouts/Wrappers/baseLayout.vue";
import myTip from "./view/Components/Tip.vue";
import store from "./store";

Vue.use(Vuetify);
let vuetify = new Vuetify({});

Vue.config.productionTip = false;
Vue.component("loginpages-layout", loginLayout); //全局注册登录基础布局
Vue.component("basepages-layout", baseLayout); //全局注册后台基础布局
Vue.component("my-tip", myTip); //全局注册提示信息
// 对提示信息进行封装
Vue.prototype.$message = function (type, tiptext, timeout) {
  let tip = this.$root.$children[0];
  if (!timeout) timeout = 3000;
  let newtip = { type, tiptext, timeout };
  tip.tip = newtip;
  tip.istip = true;
};
// 远程服务器静态资源
Vue.prototype.$staticpath = {
  avatar: "https://www.fangxingarden.com/public/avatar/",
  commodity: "https://www.fangxingarden.com/public/commodity/"
};
export default new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount("#app");
