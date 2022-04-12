import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      //判断用户是否通过getInfo获取用户菜单
      const hasRoles =
        store.getters["user/menus"] && store.getters["user/menus"].length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取用户菜单权限
          const { menus } = await store.dispatch("user/getInfo");
          // 根据用户菜单权限生成可访问路由
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            menus
          );
          // 动态挂载路由可访问路由
          accessRoutes.forEach((element) => {
            router.addRoute(element);
          });
          next({ ...to, replace: true });
        } catch (error) {
          console.log("error", error);
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在whiteList白名单中路由直接放行
      next();
    } else {
      // 无权限页面重定向到登录页面
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
