import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

export default (opts) => {
  let { routes: routesConfig, App: customApp } = opts;
  const _App = customApp || App;
  const router = new VueRouter({ routes: routesConfig });

  new Vue({
    el: "#app",
    router,
    store,
    components: { App: _App },
    template: "<App/>",
  });
};
