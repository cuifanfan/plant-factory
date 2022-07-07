<template>
  <!-- 顶部导航栏组件 -->
  <v-app-bar app :src="src">
    <v-app-bar-nav-icon @click="$emit('subnavCtrl')"></v-app-bar-nav-icon>
    <v-toolbar-title class="pa-0">
      <v-breadcrumbs :items="breadList" large active-class="red--text">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template slot="item" slot-scope="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled" class="font-weight-bold">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="primary" size="48" class="" v-on="on" v-bind="attrs">
          <v-img :src="$staticpath.avatar + myinfo.avatar" v-if="myinfo.avatar" @error="myinfo.avatar = false">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" size="20" width="2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <template v-else><span class="white--text">无</span></template>
        </v-avatar>
      </template>

      <v-list class="pa-0">
        <v-list-item v-for="(item, index) in hoveritems" :key="index" class="pa-0">
          <v-btn depressed @click="click(item.method)" class="mx-auto" plain>{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-slot:extension>
      <v-chip-group v-model="chipPath" active-class="red" @change="chipChange" mandatory>
        <v-chip
          v-for="item in chips"
          close
          label
          outlined
          small
          close-icon="mdi-close"
          :value="item.path"
          :key="item.path"
          @click:close="chipClose(item.path)"
        >
          {{ item.title }}
        </v-chip>
      </v-chip-group>
    </template>
  </v-app-bar>
</template>

<script>
import { getMyInfo } from "@/api/account";
export default {
  data() {
    return {
      // 当前路由路径
      chipPath: this.$route.path,
      // 存储个人信息
      myinfo: {},
      // 存储头像
      src: require("@/assets/images/1080.png"),
      // 头像hover时的列表
      hoveritems: [
        {
          title: "个人信息",
          method: "myInfo"
        },
        {
          title: "登出",
          method: "loginout"
        }
      ],
      //纸片导航的列表
      chips: [],
      // 处理后的路由列表
      routeList: [],
      // 面包屑导航列表
      breadList: []
    };
  },
  methods: {
    // 登出按钮操作
    loginout() {
      let storage = window.localStorage;
      storage.removeItem("user");
      this.$router.push("/login");
    },
    // 个人头像列表每一项的方法动态调用
    click(method) {
      this[method]();
    },
    // 跳转个人信息页面
    myInfo() {
      this.$emit("bread", ["个人信息"]);
      // this.$emit("nav", {
      //   value: "个人信息",
      //   route: "/admin/platform/platformuser",
      // });
      this.$router.push("/admin/provider/provideruser");
    },
    // 初始化nav纸片导航route数据
    getRouteList() {
      const routeList = this.$store.state.routeList.routeList;
      let newRouteList = routeList.reduce((pre, cur) => {
        if (cur.path) {
          const path = this.parentPath + cur.path;
          pre.push({
            title: cur.meta.title,
            path: path
          });
        }
        if (cur.children && cur.children.length) {
          cur.children.forEach((item) => {
            if (item.path) {
              const path = this.parentPath + item.path;
              pre.push({
                title: item.meta.title,
                path: path
              });
            }
          });
        }
        return pre;
      }, []);
      this.routeList = newRouteList;
    },
    // 添加纸片导航
    addChip(path) {
      const routeList = this.routeList;
      for (let item of routeList) {
        if (item.path === path) {
          this.chips.push({ ...item });
        }
      }
    },
    // 删除纸片导航
    deleteChip(path) {
      this.chips = this.chips.filter((item) => {
        return item.path !== path;
      });
    },
    // 目标纸片改变则跳转
    chipChange(route) {
      if (route) {
        this.$router.push(route);
      }
    },
    // 纸片关闭时操作
    chipClose(path) {
      if (path === this.chipPath) {
        let index = 0;
        for (let item of this.chips) {
          if (item.path === path) {
            break;
          }
          index++;
        }
        if (index - 1 >= 0) {
          let item = this.chips[index - 1];
          this.chipPath = item.path;
          this.$router.push(item.path);
          this.deleteChip(path);
        }
      } else {
        this.deleteChip(path);
      }
    },
    // 监控路由改变时操作
    routeChange(path) {
      for (let item of this.chips) {
        if (item.path === path) {
          this.$router.push(path);
          this.chipPath = path;
          return;
        }
      }
      this.addChip(path);
      this.$router.push(path);
      this.chipPath = path;
    },
    // 设置面包屑导航
    setBreadList() {
      const routeList = this.$store.state.routeList.routeList;
      this.breadList = [];
      for (let fatherRoute of routeList) {
        if (fatherRoute.children) {
          for (let childRoute of fatherRoute.children) {
            const path = this.parentPath + childRoute.path;
            if (path === this.$route.path) {
              this.breadList.push(
                {
                  text: fatherRoute.meta.title
                },
                {
                  text: childRoute.meta.title
                }
              );
              return;
            }
          }
        } else {
          const path = this.parentPath + fatherRoute.path;
          if (path === this.$route.path) {
            this.breadList.push({
              text: fatherRoute.meta.title
            });
            return;
          }
        }
      }
      console.log(this.breadList);
    }
  },

  created() {
    this.path = this.$route.path;
    this.setBreadList();
    getMyInfo()
      .then((value) => {
        // console.log(value);
        let data = value.payload;
        this.myinfo = data;
        // 本地存储头像信息
        let user = window.localStorage.getItem("user");
        let userdata = JSON.parse(user);
        // console.log(userdata);
        if (this.myinfo.avatar) {
          userdata.avatarpath = this.$staticpath.avatar + this.myinfo.avatar;
        }
        window.localStorage.setItem("user", JSON.stringify(userdata));
      })
      .catch((err) => err);
    // this.chipPath = this
    this.getRouteList();
    this.addChip(this.$route.path);
  },
  watch: {
    $route(to) {
      this.routeChange(to.path);
      this.setBreadList();
    }
  },
  computed: {
    parentPath() {
      return this.$store.state.routeList.parentRoute.path;
    }
  }
};
</script>
