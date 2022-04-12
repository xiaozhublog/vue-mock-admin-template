import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'   // 当路由设置了该属性，则会高亮相对应的侧边栏。
    affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
  }
 */

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    hidden: true,
    component: () => import("@/views/login/index"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "basics" */ "@/views/dashboard/index"),
        meta: { title: "主页", icon: "home" },
      },
    ],
  },
];
export const asyncRoutes = [
  {
    path: "/auth-setting",
    name: "AuthSetting",
    component: Layout,
    redirect: "/auth-setting/users",
    meta: { title: "系统管理", icon: "setting" },
    children: [
      {
        path: "users",
        name: "usersView",
        component: () =>
          import(
            /* webpackChunkName: "basics" */ "@/views/auth-setting/users/index"
          ),
        meta: { title: "用户管理", icon: "el-icon-user" },
      },
      {
        path: "roles",
        name: "rolesView",
        component: () =>
          import(
            /* webpackChunkName: "basics" */ "@/views/auth-setting/roles/index"
          ),
        meta: { title: "角色管理", icon: "roles" },
      },
      {
        path: "menus",
        name: "menusView",
        component: () =>
          import(
            /* webpackChunkName: "basics" */ "@/views/auth-setting/menus/index"
          ),
        meta: { title: "菜单管理", icon: "menu" },
      },
      {
        path: "auth",
        name: "authView",
        component: () =>
          import(
            /* webpackChunkName: "basics" */ "@/views/auth-setting/auth/index"
          ),
        meta: { title: "权限管理", icon: "auth" },
      },
    ],
  },
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由
}
//路由导航冗余报错（路由重复）
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

export default router;
