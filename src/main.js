import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router.js";
import store from "./store.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("setData");
  },
  computed: {
    strings() {
      return this.$store.state.strings;
    }
  },
  render: h => h(App)
}).$mount("#app");
