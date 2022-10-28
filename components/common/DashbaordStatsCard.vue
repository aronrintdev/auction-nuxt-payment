<template>
  <div class="bg-white br-10 px-1 px-sm-4 py-3 shadow-sm mb-2 mb-md-0">
    <img :src="icon" aria-hidden="true" class="mb-3 d-none d-sm-inline-block" />
    <h4
      class="fw-5 fs-15 mb-0 text-secondary font-primary text-center text-sm-left title d-flex align-items-center algin-items-sm-start justify-content-center justify-content-sm-start"
    >
      {{ title }}
    </h4>
    <h3
      class="fw-7 fs-24 mb-0 font-primary text-center text-sm-left figures"
      :style="`--color: ${color}`"
    >
      {{ value }}
    </h3> 
  </div>
</template>
<script>
export default {
  name: 'DashboardStatsCard',
  props: {
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 576px)
  .title
    font-size: 12px
    height: 40px
    color: $color-black-1 !important
    font-weight: $medium
  .figures
    font-size: 15px
    color: var(--color)
</style>
