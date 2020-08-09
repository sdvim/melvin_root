import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [],
    strings: {}
  },
  mutations: {
    SET_STATE: (state, data) => {
      Object.entries(data).forEach(entry => {
        state[entry[0]] = entry[1];
      });
    },
    UPDATE_ROW: (state, updatedRow) => {
      const page = state.pages.find(p => p.title === router.currentRoute.name);
      const section = page.rows.find(s => s.title === updatedRow.sectionTitle);
      const item = section.items.find(i => i.title === updatedRow.property);
      item.value = updatedRow.value;
    }
  },
  actions: {
    setData() {
      axios.get("https://api.npoint.io/72bda29bf37b679bf564").then(response => {
        this.commit("SET_STATE", response.data);
      });
    },
    updateRow({ commit }, row) {
      commit("UPDATE_ROW", row);
    }
  },
  modules: {}
});
