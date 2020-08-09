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
      if (!this.$store.state.strings.length) return false;
      const keys = {};
      this.$store.state.strings.forEach(pair => {
        keys[pair.k] = pair.v;
      });
      return keys;
    }
  },
  render: h => h(App)
}).$mount("#app");
