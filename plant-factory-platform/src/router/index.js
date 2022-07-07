import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// 解决router中push方法的错误提示bug
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const staticRoutes = [
  {
    path: "/",
    redirect: "/admin/platform/homepage"
  },
  {
    path: "/login",
    name: "login-page",
    meta: {
      title: "登录",
      layout: "loginpages"
    },
    component: () => import("../view/Pages/Login/Login.vue")
  },
  {
    path: "/findpassword",
    name: "find-page",
    meta: {
      title: "找回密码",
      layout: "loginpages"
    },
    component: () => import("../view/Pages/ForgetPassword/index.vue")
  }
];
console.log(process.env);
const router = new VueRouter({
  mode: process.env.VUE_APP_MODE, //切换hush请注释掉该行
  base: process.env.BASE_URL, //切换hush请注释掉该行
  routes: staticRoutes
});

const parentRoute = store.state.routeList.parentRoute;
const routeListStore = store.state.routeList.routeList;
console.log(routeListStore);
const loadview = (component) => {
  return () => import(`@/view/Pages${component}`);
};

const routeList = { children: routeListStore }; //方便递归
const routeListBack = [];
const handleRoute = (route) => {
  const newRoute = { ...route };
  if (newRoute.path) {
    newRoute.path = newRoute.path.slice(1);
    routeListBack.push(newRoute);
  }
  if (newRoute.component) newRoute.component = loadview(newRoute.component);
  if (route.children) route.children.map((item) => handleRoute(item));
};

const addRoutes = () => {
  handleRoute(routeList);
  router.addRoute(parentRoute);
  routeListBack.forEach((item) => {
    router.addRoute(parentRoute.name, { ...item });
  });
};

addRoutes();

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}-方芯水培-平台商管理系统`;
  next();
});

export default router;
