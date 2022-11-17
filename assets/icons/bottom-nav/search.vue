<template>
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ active: active }">
    <path d="M11.2168 20.6756C16.6501 20.6756 21.0546 16.2711 21.0546 10.8378C21.0546 5.40454 16.6501 1 11.2168 1C5.78346 1 1.37891 5.40454 1.37891 10.8378C1.37891 16.2711 5.78346 20.6756 11.2168 20.6756Z" stroke="#ECECEC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23.5134 23.1345L18.1641 17.7852" stroke="#ECECEC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
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
