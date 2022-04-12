<template>
  <div class="sideBar-container">
    <logo-title v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.sideBarMenuBg"
        :text-color="variables.sideBarMenuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LogoTitle from "../LogoTitle/index.vue";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.module.scss";
export default {
  name: "SidebarView",
  components: {
    LogoTitle,
    SidebarItem,
  },
  computed: {
    ...mapGetters({
      sidebar: "app/sidebar",
      permissionRoutes: "permission/routes",
      settingOptions: "settings/settingOptions",
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.settingOptions.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    variables() {
      return variables;
    },
  },
};
</script>
