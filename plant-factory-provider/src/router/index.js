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
    redirect: "/admin/provider/homepage"
  },
  {
    path: "/login",
    name: "login-page",
    meta: {
      title: "登录",
      layout: "loginpages"
    },
    component: () => import("../view/Pages/provider/Login/Login.vue")
  },
  {
    path: "/findpassword",
    name: "find-page",
    meta: {
      title: "找回密码",
      layout: "loginpages"
    },
    component: () => import("../view/Pages/provider/ForgetPassword/index.vue")
  },
  /*  {
    path: '/admin/provider',
    name: 'admin',
    meta: {
      title: '后台',
      layout: 'basepages'
    },
    component: () =>
      import('../view/Layouts/Wrappers/Admin.vue'),
    // 后台页面的所有路由都写在该路由的子路由下，并备注title
    // 注意一定要有layout属性
    children: [{
      path: 'homepage',
      name: 'homepage',
      meta: {
        title: '后台管理主页',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/HomePage/Home.vue'),
    },
    {
      path: 'roles',
      name: 'roles',
      meta: {
        title: '服务商角色管理',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/ProviderRoles/index.vue'),
    },
    {
      path: 'providerinfo',
      name: 'providerinfo',
      meta: {
        title: '服务商信息',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/ProviderInfo/index.vue'),
    },
    {
      path: 'commodityadd',
      name: 'commodityadd',
      meta: {
        title: '服务商添加商品',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/CommodityAdd/index.vue'),
    },
    // {
    //   path: 'commoditylist',
    //   name: 'commoditylist',
    //   meta: {
    //     title: '服务商查询商品列表',
    //     layout: 'basepages'
    //   },
    //   component: () =>
    //     import('../view/Pages/provider/CommodityList/index.vue'),
    // },
    {
      path: 'orderUser',
      name: 'orderUser',
      meta: {
        title: '用户订单列表',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/OrderUser/index.vue'),
    },
    {
      path: 'orderPurchase',
      name: 'orderPurchase',
      meta: {
        title: '采购订单列表',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/OrderPurchase/index.vue'),
    },
    {
      path: 'addPurchase',
      name: 'addPurchase',
      meta: {
        title: '新增采购',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/AddPurchase/index.vue'),
    },
    {
      path: 'sysback',
      name: 'sysback',
      meta: {
        title: '服务商系统反馈',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/Sysback'),
    },
    {
      path: 'deviceHome',
      name: 'deviceHome',
      meta: {
        title: '家用设备管理',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/DeviceHome'),
    },
    {
      path: 'deviceGrow',
      name: 'deviceGrow',
      meta: {
        title: '育苗设备模块',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/DeviceGrow'),
    },

    {
      path: 'communitysever',
      name: 'communitysever',
      meta: {
        title: '社区服务人员管理',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/CommunitySever'),
    },
    {
      path: 'users',
      name: 'users',
      meta: {
        title: '普通用户管理',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/Users'),
    },
    // {
    //   path: 'resetpwd',
    //   name: 'resetpwd',
    //   meta: {
    //     title: '修改密码',
    //     layout: 'basepages'
    //   },
    //   component: () =>
    //     import ('../view/Pages/provider/ResetPwd'),
    // },
    {
      path: 'financeinfo',
      name: 'financeinfo',
      meta: {
        title: '财务信息',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/FinanceInfo'),
    },
    {
      path: 'syslog',
      name: 'syslog',
      meta: {
        title: '日志',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/SysLog'),
    },
    {
      path: 'about',
      name: 'about',
      meta: {
        title: '关于',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/About'),
    },

    {
      path: 'provideruser',
      name: 'provideruser',
      meta: {
        title: '服务商个人用户信息修改和管理',
        layout: 'basepages'
      },
      component: () =>
        import('../view/Pages/provider/ProviderUser'),
    },
    ]
  }, */
  {
    path: "/404",
    name: "find-page",
    meta: {
      title: "404页面",
      layout: "notfound"
    },
    component: () => import("../view/Pages/provider/404/index.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: process.env.VUE_APP_MODE, //切换hush请注释掉该行
  base: process.env.BASE_URL, //切换hush请注释掉该行
  routes: staticRoutes
});

const parentRoute = store.state.routeList.parentRoute;
const routeListStore = store.state.routeList.routeList;

const loadview = (component) => {
  return () => import(`@/view/Pages/provider${component}`);
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
console.log(router.getRoutes());
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}-方芯水培-平台商管理系统`;
  next();
});

export default router;
