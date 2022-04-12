<template>
  <div @click="toggleClick">
    <svg
      :class="{ 'is-active': !isActive }"
      class="toggleIcon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M0 64h1024v128H0V64z m0 768h1024v128H0v-128z m0-384h640v128H0V448z m768-128l256 196.672L768 704V320z"
        fill="#909399"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "toggleIcon",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    },
  },
};
</script>
<style lang="scss" scoped>
.toggleIcon {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  color: red;
}
.toggleIcon.is-active {
  transform: rotate(180deg);
}
</style>
