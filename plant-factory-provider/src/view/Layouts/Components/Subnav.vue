<template>
  <!-- 侧边导航栏组件 -->
  <v-navigation-drawer
    app
    color="#304156"
    class="evevation-6"
    :value="isopen"
    :mini-variant="ismini"
    @input="open($event)"
    mobile-breakpoint="1200"
  >
    <template slot="prepend" class="pa-2">
      <div class="pa-1" style="overflow: hidden">
        <v-img
          src="../../../assets/images/logo.png"
          alt="方芯水培"
          class="rounded-lg float-left"
          height="60"
          width="60"
        ></v-img>
        <div class="ml-15 logo" style="height: 60px;font">服务商管理</div>
      </div>
    </template>
    <v-list height="100%" style="padding: 0" expand>
      <template v-for="(itemGroup, i) in listGroups">
        <template v-if="itemGroup.children && itemGroup.children.length">
          <v-list-group :key="i" color="#1796f9" v-if="!itemGroup.meta.isHide">
            <template slot="prependIcon" class="aa" style="justify-content: center">
              <v-icon class="fontcolor" small>{{ itemGroup.meta.icon }}</v-icon>
            </template>
            <template slot="appendIcon">
              <v-icon class="fontcolor" x-small>fas fa-sort-down</v-icon>
            </template>
            <template slot="activator">
              <v-list-item-title class="fontcolor fontsize">
                {{ itemGroup.meta.title }}
              </v-list-item-title>
            </template>

            <v-list-item
              v-for="(item, j) in itemGroup.children"
              :key="j"
              :to="toPath(item.path)"
              link
              :class="ismini ? '' : 'pl-8'"
              class="blue-grey darken-4 bg"
              style="background-color: #304156"
            >
              <v-list-item-icon>
                <v-icon
                  :style="{
                    color: $route.path == toPath(item.path) ? '#2390ff' : '#bfcbd9'
                  }"
                  small
                >
                  {{ item.meta.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title
                class="fontsize"
                :style="{
                  color: $route.path == toPath(item.path) ? '#2390ff' : '#bfcbd9'
                }"
              >
                {{ item.meta.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>

        <template v-else>
          <v-list-item v-if="!itemGroup.meta.isHide" :key="i" link :to="toPath(itemGroup.path)" color="#304156">
            <v-list-item-icon>
              <v-icon
                :style="{
                  color: $route.path == toPath(itemGroup.path) ? '#2390ff' : '#bfcbd9'
                }"
                small
              >
                {{ itemGroup.meta.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="fontsize"
              :style="{
                color: $route.path == toPath(itemGroup.path) ? '#2390ff' : '#bfcbd9'
              }"
            >
              {{ itemGroup.meta.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    ismini: {
      type: Boolean,
      default: false
    },
    isopen: {
      type: Boolean,
      default: null
    }
  },
  data: () => ({
    waitItem: {},
    color: "#bfcbd9"
  }),
  methods: {
    open(value) {
      this.$emit("update:isopen", value);
    },

    toPath(path) {
      return this.parentPath + path;
    }
  },
  computed: {
    listGroups() {
      return this.$store.state.routeList.routeList;
    },
    parentPath() {
      return this.$store.state.routeList.parentRoute.path;
    }
  }
};
</script>

<style scoped>
.bg::before {
  background-color: transparent;
}
.fontcolor {
  color: #bfcbd9 !important;
}
.fontcolor:hover {
  color: rgb(68, 184, 230) !important;
}
.fontsize {
  font-size: 14px;
}
.logo {
  font-size: 30px;
  line-height: 55px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  padding-left: 10px;
  font-family: SimSun !important;
  user-select: none;
}
</style>
