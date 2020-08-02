import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [],
    strings: {},
    stats: {}
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages;
    },
    SET_STATS: (state, stats) => {
      state.stats = stats;
    },
    SET_STRINGS: (state, strings) => {
      state.strings = strings;
    }
  },
  actions: {
    setData() {
      axios.get("https://api.npoint.io/5fdb935a883cea4b4c10").then(response => {
        this.commit("SET_PAGES", response.data.pages);
        this.commit("SET_STATS", response.data.stats);
        this.commit("SET_STRINGS", response.data.strings);
      });
    }
  },
  modules: {}
});
