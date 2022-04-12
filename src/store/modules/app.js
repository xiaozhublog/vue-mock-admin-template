import Cookies from "js-cookie";

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? !!+Cookies.get("sidebarStatus")
      : true,
  },
  size: Cookies.get("size") || "small",
};
const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", 1);
    } else {
      Cookies.set("sidebarStatus", 0);
    }
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set("size", size);
  },
};
const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
};
const getters = {
  sidebar: (state) => state.sidebar,
  size: (state) => state.size,
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
