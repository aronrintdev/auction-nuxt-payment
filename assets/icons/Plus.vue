<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="plus-icon"
  >
    <line
      class="verticle"
      :class="{ collapsed: active }"
      x1="11.4688"
      y1="20.2656"
      x2="11.4688"
      y2="1.73229"
      stroke="#667799"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="1.732"
      y1="11.4625"
      x2="20.2653"
      y2="11.4185"
      stroke="#667799"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
<script>
export default {
  props: {
    active: { type: Boolean, default: false },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.verticle
  transform-origin: center
  transition: 0.3s all ease-in
  &.collapsed
    transform: rotate(90deg)
</style>
