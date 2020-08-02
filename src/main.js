import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("setStrings");
  },
  computed: {
    strings() {
      return this.$store.state.strings;
    }
  },
  render: h => h(App)
}).$mount("#app");
