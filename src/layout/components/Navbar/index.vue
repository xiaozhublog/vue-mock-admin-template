<template>
  <div class="navbar">
    <div class="left-container">
      <logo-title
        v-if="fullHeader"
        class="navBar-logo-title"
        :collapse="isCollapse"
      />
      <toggle-icon
        :is-active="isCollapse"
        class="toggleIcon-container"
        @toggleClick="toggleSideBar"
      ></toggle-icon>
      <breadcrumb v-if="breadcrumb" class="breadcrumb-container"></breadcrumb>
    </div>
    <div class="right-container">
      <el-tooltip content="全屏" effect="dark" placement="bottom">
        <screen-full v-if="screenFull" class="screenFull" />
      </el-tooltip>
      <el-tooltip
        v-if="selectSize"
        content="Global Size"
        effect="dark"
        placement="bottom"
      >
        <size-select class="sizeSelect" />
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatarSrc" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
          <span class="user-name">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>
          <!-- <router-link to="/personal-center">
            <el-dropdown-item> 个人中心 </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import logoTitle from "../LogoTitle/index.vue";
import toggleIcon from "./ToggleIcon.vue";
import breadcrumb from "./Breadcrumb.vue";
import screenFull from "./Screenfull.vue";
import sizeSelect from "./SizeSelect.vue";
export default {
  name: "navBar",
  components: {
    logoTitle,
    toggleIcon,
    screenFull,
    sizeSelect,
    breadcrumb,
  },
  data() {
    return {
      avatarSrc: require("@/assets/images/userHead.gif"),
    };
  },
  computed: {
    ...mapGetters({
      sidebar: "app/sidebar",
      settingOptions: "settings/settingOptions",
      name: "user/name",
    }),
    isCollapse() {
      return !this.sidebar.opened;
    },
    fullHeader() {
      return this.settingOptions.fullHeader;
    },
    breadcrumb() {
      return this.settingOptions.breadcrumb;
    },
    screenFull() {
      return this.settingOptions.screenFull;
    },
    selectSize() {
      return this.settingOptions.selectSize;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.module.scss";
.navbar {
  display: flex;
  justify-content: space-between;
  height: 56px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.navBar-logo-title {
  width: $sideBarWidth;
}
.left-container {
  display: flex;
  align-items: center;
  .toggleIcon-container {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .breadcrumb-container {
    margin-left: 20px;
  }
}
.right-container {
  display: flex;
  align-items: center;
  .screenFull,
  .sizeSelect {
    margin-right: 10px;
  }
  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      .user-name {
        cursor: pointer;
        padding-left: 5px;
      }
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
