import defaultSettings from "@/settings";

const {
  showSettings,
  tagsView,
  sidebarMenu,
  sidebarLogo,
  hasHeader,
  fixedHeader,
  fullHeader,
  breadcrumb,
  screenFull,
  selectSize,
} = defaultSettings;

const state = {
  settingOptions: {
    showSettings: showSettings,
    tagsView: tagsView,
    sidebarMenu: sidebarMenu,
    sidebarLogo: sidebarLogo,
    hasHeader: hasHeader,
    fixedHeader: fixedHeader,
    fullHeader: fullHeader,
    breadcrumb: breadcrumb,
    screenFull: screenFull,
    selectSize: selectSize,
  },
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state.settingOptions, key)) {
      state.settingOptions[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
};
const getters = {
  settingOptions: (state) => state.settingOptions,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
