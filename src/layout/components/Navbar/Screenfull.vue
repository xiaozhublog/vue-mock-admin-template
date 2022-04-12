<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'resize_2' : 'resize_1'"
      @click="clickFull"
    />
  </div>
</template>
<script>
import screenfull from "screenfull";
export default {
  name: "screenFull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  methods: {
    clickFull() {
      if (screenfull.isEnabled) {
        this.isFullscreen = !this.isFullscreen;
        screenfull.toggle();
      } else {
        this.$message({
          message: "您的浏览器不支持全屏",
          type: "warning",
        });
        return false;
      }
    },
  },
};
</script>
