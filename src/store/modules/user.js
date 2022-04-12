import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    menus: [],
    buttons: [],
  };
};
const state = getDefaultState();
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
};
const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
      })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;
          if (!data) {
            reject("获取用户信息失败，请重新登录");
          }
          const { menus, name } = data;

          if (!menus || menus.length <= 0) {
            reject("菜单必须为一个非空数组");
          }

          commit("SET_MENUS", menus);
          commit("SET_NAME", name);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); //一定要先清除cookie中token
          commit("RESET_STATE");
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); //一定要先清除cookie中token
      commit("RESET_STATE");
      resolve();
    });
  },
};
const getters = {
  token: (state) => state.token,
  name: (state) => state.name,
  menus: (state) => state.menus,
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
