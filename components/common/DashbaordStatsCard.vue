<template>
  <div :class="mobileClass" class="stat-card bg-white br-10mb-2 mb-md-0">
    <img :src="icon" aria-hidden="true" class="mb-11 d-none d-sm-inline-block"/>
    <h4
        class="body-8-regular mb-0 text-gray-simple font-secondary text-center text-sm-left title d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-start"
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
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'DashboardStatsCard',
  mixins: [screenSize],
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
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.stat-card
  padding: 15px 36px

.mb-11
  margin-bottom: 11px

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
