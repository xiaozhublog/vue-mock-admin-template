/**
 * 路由访问权限
 */
import { asyncRoutes, constantRoutes } from "@/router";

// 判断权限，此处根据服务端返回的menus中包含路由name与路由name一致
function hasPermission(menus, route) {
  if (route.hidden) {
    return true;
  } else {
    return menus.includes(route.name);
  }
}

// 递归路由
export function filterAsyncRoutes(routes, menus) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus);
      }
      res.push(tmp);
    }
  });

  return res;
}
const state = {
  routes: [],
  addRoutes: [],
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};
const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};
const getters = {
  routes: (state) => {
    // console.log(state.routes);
    return state.routes;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
