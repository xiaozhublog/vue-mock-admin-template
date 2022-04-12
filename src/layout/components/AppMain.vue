<template>
  <section class="app-main">
    <router-view></router-view>
  </section>
</template>
<script>
export default {
  name: "AppMain",
};
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: calc(100vh - 56px);
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 56px;
}
</style>
