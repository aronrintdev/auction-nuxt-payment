<template>
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ active: active }"
  >
    <path
      d="M2.4696 22.2062L2.4696 22.2061H2.46033C2.29052 22.2061 2.12158 22.146 1.98883 22.0304L1.97899 22.0209L1.9739 22.016L0.67212 20.7613C0.559148 20.6444 0.5 20.4877 0.5 20.3348C0.5 20.1777 0.558237 20.0276 0.675054 19.911L0.689964 19.8967L11.2527 10.2913L12.8818 11.8614L2.94153 22.0156L2.93751 22.0194L2.92394 22.0325L3.27091 22.3925L2.92393 22.0325C2.80267 22.1494 2.6422 22.2094 2.4696 22.2062ZM2.46033 22.7061C2.1692 22.7061 1.87806 22.6016 1.64975 22.398L2.46033 22.7061Z"
      stroke="#ECECEC"
    />
    <rect
      y="0.694912"
      width="12.5883"
      height="5.79413"
      rx="1.5"
      transform="matrix(0.719095 0.694912 -0.719095 0.694912 13.0632 0.212009)"
      stroke="#ECECEC"
    />
    <rect
      x="15.333"
      y="21.8022"
      width="10.1672"
      height="1.69791"
      rx="0.848955"
      stroke="#ECECEC"
    />
    <rect
      x="17.1934"
      y="18.2051"
      width="6.44479"
      height="1.69791"
      rx="0.848955"
      stroke="#ECECEC"
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
  path
    fill: $color-white-1
  rect
    fill: $color-white-1
</style>
