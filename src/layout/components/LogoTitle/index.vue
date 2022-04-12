<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="fullHeader || !collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <el-image class="sidebar-logo" :src="logoSrc"></el-image>
        <div class="title">管理系统</div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <el-image class="sidebar-logo" :src="logoSrc"></el-image>
      </router-link>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "LogoTitle",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      settingOptions: "settings/settingOptions",
    }),
    fullHeader() {
      return this.settingOptions.fullHeader;
    },
  },
  data() {
    return {
      logoSrc: require("@/assets/logo.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  height: 56px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 40px;
    }
    & .title {
      margin-left: 12px;
      font-size: 20px;
      font-weight: bold;
      color: rgb(111, 111, 111);
    }
  }
}
</style>
