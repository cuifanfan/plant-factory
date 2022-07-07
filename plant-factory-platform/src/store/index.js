import Vuex from "vuex";
import Vue from "vue";
import routeList from "./modules/routeList";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { routeList }
});

export default store;
