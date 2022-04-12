<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 左侧菜单栏 -->
    <sidebar v-if="sidebarMenu" class="sidebar-container"></sidebar>
    <!-- 内容区 -->
    <div class="main-container" :class="{ 'sidebar-menu-hide': !sidebarMenu }">
      <div
        v-if="hasHeader"
        :class="{ 'fixed-header': fixedHeader, 'full-header': fullHeader }"
      >
        <navbar></navbar>
      </div>
      <app-main></app-main>
      <setting v-if="showSettings"></setting>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar/index";
import Navbar from "./components/Navbar/index";
import Setting from "./components/Setting/index";
export default {
  name: "LayoutView",
  components: {
    AppMain,
    Sidebar,
    Navbar,
    Setting,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      sidebar: "app/sidebar",
      settingOptions: "settings/settingOptions",
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
    showSettings() {
      return this.settingOptions.showSettings;
    },
    sidebarMenu() {
      return this.settingOptions.sidebarMenu;
    },
    hasHeader() {
      return this.settingOptions.hasHeader;
    },
    fullHeader() {
      return this.settingOptions.fullHeader;
    },
    fixedHeader() {
      return this.settingOptions.fixedHeader;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.module.scss";
.app-wrapper {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;
}
.sidebar-menu-hide {
  margin-left: 0 !important;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - $sideBarWidth);
  transition: width 0.28s;
}
.full-header {
  width: 100% !important;
  padding: 0;
  z-index: 1004;
}
.hideSidebar .fixed-header {
  width: calc(100% - 64px);
}
</style>
