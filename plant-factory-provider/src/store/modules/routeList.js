const routesListModule = {
  namespaced: true,
  state: {
    // 该路由列表的父路由
    parentRoute: {
      path: "/admin/provider",
      name: "admin",
      redirect: "/admin/provider/homepage",
      meta: {
        title: "后台",
        layout: "basepages"
      },
      component: () => import("@/view/Layouts/Wrappers/Admin")
    },
    // 该路由列表组件的路径
    componentPath: "@/view/Pages/provider",
    routeList: [
      {
        path: "/homepage",
        name: "homepage",
        component: "/HomePage/Home.vue",
        meta: {
          title: "首页",
          layout: "basepages",
          isHide: false,
          isKeepAlive: false,
          icon: " mdi-home"
        }
      },
      {
        meta: {
          title: "账户管理",
          isHide: false,
          isKeepAlive: false,
          icon: "mdi-account-edit-outline"
        },
        children: [
          {
            path: "/roles",
            name: "roles",
            component: "/ProviderRoles/index.vue",
            meta: {
              title: "角色管理",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-account-tie"
            }
          },
          {
            path: "/communitysever",
            name: "communitysever",
            component: "/CommunitySever",
            meta: {
              title: "社区服务人员管理",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-bike"
            }
          },
          {
            path: "/users",
            name: "users",
            component: "/Users",
            meta: {
              title: "用户管理",
              layout: "basepages",
              isHide: true,
              isKeepAlive: false,
              icon: "mdi-account-outline"
            }
          }
        ]
      },
      {
        meta: {
          title: "设备管理",
          isHide: false,
          isKeepAlive: false,
          icon: "mdi-bike"
        },
        children: [
          {
            path: "/deviceHome",
            name: "deviceHome",
            component: "/DeviceHome",
            meta: {
              title: "家用设备管理",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-cart-outline"
            }
          },
          {
            path: "/deviceGrow",
            name: "deviceGrow",
            component: "/DeviceGrow",
            meta: {
              title: "育苗设备管理",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-cart-outline"
            }
          }
        ]
      },
      {
        meta: {
          title: "订单管理",
          isHide: false,
          isKeepAlive: false,
          icon: "mdi-order-bool-ascending"
        },
        children: [
          {
            path: "/orderUser",
            name: "orderUser",
            component: "/OrderUser/index.vue",
            meta: {
              title: "用户订单",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-file-search-outline"
            }
          },
          {
            path: "/orderPurchase",
            name: "orderPurchase",
            component: "/OrderPurchase/index.vue",
            meta: {
              title: "采购订单",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-file-search-outline"
            }
          },
          {
            path: "/addPurchase",
            name: "addPurchase",
            component: "/AddPurchase/index.vue",
            meta: {
              title: "新增采购",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-file-search-outline"
            }
          }
        ]
      },
      {
        meta: {
          title: "我的",
          isHide: false,
          isKeepAlive: false,
          icon: "mdi-clipboard-text-outline"
        },
        children: [
          {
            path: "/financeinfo",
            name: "financeinfo",
            component: "/FinanceInfo",
            meta: {
              title: "财务信息",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-currency-usd"
            }
          },
          {
            path: "/syslog",
            name: "syslog",
            component: "/SysLog",
            meta: {
              title: "日志",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-note-text"
            }
          },
          {
            path: "/providerinfo",
            name: "providerinfo",
            component: "/ProviderInfo/index.vue",
            meta: {
              title: "服务商信息",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-account-outline"
            }
          },
          {
            path: "/about",
            name: "about",
            component: "/About",
            meta: {
              title: "关于我们",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-information-variant"
            }
          }
        ]
      },
      {
        meta: {
          title: "其他",
          isHide: false,
          isKeepAlive: false,
          icon: "mdi-checkbox-multiple-blank-outline"
        },
        children: [
          {
            path: "/sysback",
            name: "sysback",
            component: "/Sysback",
            meta: {
              title: "系统反馈",
              layout: "basepages",
              isHide: false,
              isKeepAlive: false,
              icon: "mdi-message-alert"
            }
          }
        ]
      },
      {
        path: "/provideruser",
        name: "provideruser",
        component: "/ProviderUser",
        meta: {
          title: "个人信息",
          layout: "basepages",
          isHide: true,
          isKeepAlive: false,
          icon: ""
        }
      }
    ]
  },
  mutations: {
    // 设置路由，菜单中使用到
    getRoutesList(state, data) {
      state.routesList = data;
    }
  },
  actions: {
    // 设置路由，菜单中使用到
    async setRoutesList({ commit }, data) {
      commit("getRoutesList", data);
    }
  }
};

export default routesListModule;
