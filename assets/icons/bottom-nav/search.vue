<template>
  <svg
    width="25"
    height="26"
    viewBox="0 0 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ active: active }"
  >
    <path
      d="M11.2168 21.6756C16.6501 21.6756 21.0546 17.2711 21.0546 11.8378C21.0546 6.40454 16.6501 2 11.2168 2C5.78346 2 1.37891 6.40454 1.37891 11.8378C1.37891 17.2711 5.78346 21.6756 11.2168 21.6756Z"
      stroke="#ECECEC"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="outer-path"
    />
    <path
      d="M23.5139 24.1352L18.1646 18.7859"
      stroke="#ECECEC"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  .outer-path
    fill: $color-white-1
</style>
