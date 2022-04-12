<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import { compile } from "path-to-regexp";
export default {
  name: "breadCrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // 跳转到重定向页面，不更新面包屑
      if (route.path.startsWith("/redirect/")) {
        return false;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 仅显示 meta.title中有值的路由
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      //第一个matched非首页，增加一个首页dashboard(如果路由中首页非dashboard，对应修改)
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        if (redirect === this.$route.path) {
          return false;
        } else {
          this.$router.push(redirect);
          return false;
        }
      }
      this.$router.push(this.pathCompile(path));
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = compile(path);
      return toPath(params);
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
