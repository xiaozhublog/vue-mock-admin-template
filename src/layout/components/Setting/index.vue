<template>
  <div class="settingPage">
    <div>
      <el-button
        size="medium"
        type="primary"
        icon="el-icon-setting"
        plain
        @click="showSetting"
      ></el-button>
    </div>
    <el-drawer
      title="系统布局配置"
      :visible.sync="settingDrawer"
      size="20%"
      append-to-body
    >
      <div class="drawer-container">
        <div>
          <el-alert
            title="仅为展示，刷新恢复，如需固定，需要更改/src/settings.js文件"
            type="warning"
            show-icon
            :closable="false"
          >
          </el-alert>
          <div class="drawer-item">
            <span>开启多页签</span>
            <el-switch v-model="tagsView" class="drawer-switch" />
          </div>

          <div class="drawer-item">
            <span>左侧菜单</span>
            <el-switch v-model="sidebarMenu" class="drawer-switch" />
          </div>
          <div class="drawer-item">
            <span>侧栏logo</span>
            <el-switch v-model="sidebarLogo" class="drawer-switch" />
          </div>
          <div class="drawer-item">
            <span>顶部header</span>
            <el-switch v-model="hasHeader" class="drawer-switch" />
          </div>
          <div class="drawer-item">
            <span>固定头部</span>
            <el-switch v-model="fixedHeader" class="drawer-switch" />
          </div>

          <div class="drawer-item">
            <span>置顶顶栏</span>
            <el-tooltip
              effect="dark"
              content="需要先开启固定头部与侧栏logo"
              placement="top"
            >
              <i class="el-icon-warning" style="color: red" />
            </el-tooltip>
            <el-switch
              v-model="fullHeader"
              :disabled="!fullHeaderDisable"
              class="drawer-switch"
            />
          </div>

          <div class="drawer-item">
            <span>面包屑导航</span>
            <el-switch v-model="breadcrumb" class="drawer-switch" />
          </div>
          <div class="drawer-item">
            <span>全屏按钮</span>
            <el-switch v-model="screenFull" class="drawer-switch" />
          </div>
          <div class="drawer-item">
            <span>尺寸按钮</span>
            <el-switch v-model="selectSize" class="drawer-switch" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "settingPage",
  data() {
    return {
      settingDrawer: false,
    };
  },
  computed: {
    ...mapGetters({
      settingOptions: "settings/settingOptions",
    }),
    tagsView: {
      get() {
        return this.settingOptions.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val,
        });
      },
    },
    sidebarMenu: {
      get() {
        return this.settingOptions.sidebarMenu;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "sidebarMenu",
          value: val,
        });
      },
    },

    sidebarLogo: {
      get() {
        return this.settingOptions.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "sidebarLogo",
          value: val,
        });
      },
    },
    hasHeader: {
      get() {
        return this.settingOptions.hasHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "hasHeader",
          value: val,
        });
      },
    },
    fullHeader: {
      get() {
        return this.settingOptions.fullHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fullHeader",
          value: val,
        });
      },
    },
    fixedHeader: {
      get() {
        return this.settingOptions.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fixedHeader",
          value: val,
        });
      },
    },
    fullHeaderDisable() {
      const tmpSattus =
        this.settingOptions.fixedHeader && this.settingOptions.sidebarLogo;
      if (!tmpSattus) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fullHeader",
          value: false,
        });
      }
      return tmpSattus;
    },

    breadcrumb: {
      get() {
        return this.settingOptions.breadcrumb;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "breadcrumb",
          value: val,
        });
      },
    },
    screenFull: {
      get() {
        return this.settingOptions.screenFull;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "screenFull",
          value: val,
        });
      },
    },
    selectSize: {
      get() {
        return this.settingOptions.selectSize;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "selectSize",
          value: val,
        });
      },
    },
  },
  methods: {
    showSetting() {
      this.settingDrawer = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.settingPage {
  position: fixed;
  top: 30%;
  right: 0;
}
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
