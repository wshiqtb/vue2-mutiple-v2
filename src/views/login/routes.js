function index() {
  return import(/* webpackChunkName: "router-index" */ "./pages/index.vue");
}

export default [
  {
    name: "index",
    path: "/",
    component: index,
  },
];
