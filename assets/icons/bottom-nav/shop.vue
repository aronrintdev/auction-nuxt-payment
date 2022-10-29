<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ active: active }"
  >
    <path
      d="M3.18198 16.31L13.1849 6.30709L21.5922 6.30707C22.9729 6.30707 24.0922 7.42636 24.0922 8.80707L24.0922 16.4143L13.6348 26.7838C12.2663 28.1408 10.0583 28.1361 8.69555 26.7734L3.18198 21.2598C1.81515 19.893 1.81515 17.6769 3.18198 16.31Z"
      stroke="#ECECEC"
      class="icon-body"
    />
    <circle cx="18.3594" cy="11.6138" r="1.92576" stroke="#ECECEC" />
    <line
      x1="5.96785"
      y1="18.8909"
      x2="11.0826"
      y2="24.0056"
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
  .icon-body
    fill: $color-white-1
  circle
    stroke: $color-black-1
  line
    stroke: $color-black-1
</style>
