<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ active: active }"
  >
    <circle cx="12" cy="12" r="11.5" stroke="#ECECEC" />
    <line
      x1="5.38086"
      y1="10.4829"
      x2="19.4317"
      y2="10.4829"
      stroke="#ECECEC"
      stroke-linecap="round"
    />
    <line
      x1="14.7211"
      y1="7.76859"
      x2="19.1576"
      y2="10.4987"
      stroke="#ECECEC"
      stroke-linecap="round"
    />
    <line
      x1="19.4326"
      y1="13.8726"
      x2="5.38177"
      y2="13.8726"
      stroke="#ECECEC"
      stroke-linecap="round"
    />
    <line
      x1="10.0924"
      y1="16.5874"
      x2="5.65592"
      y2="13.8572"
      stroke="#ECECEC"
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
.active
  circle
    fill: $color-white-1
  line
    stroke: $color-black-1
</style>
