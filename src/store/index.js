import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strings: {},
    stats: {}
  },
  mutations: {
    SET_STRINGS: (state, strings) => {
      state.strings = strings;
    }
  },
  actions: {
    setStrings() {
      axios.get("https://api.npoint.io/5fdb935a883cea4b4c10").then(response => {
        this.commit("SET_STRINGS", response.data.strings);
      });
    }
  },
  modules: {}
});
