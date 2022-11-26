<template>
  <div :class="{
    'mobile d-flex flex-column align-items-center' : isScreenXS
  }" class="stat-card bg-white br-10 mb-2 mb-md-0">
    <img :src="icon" aria-hidden="true" class="mb-11"/>
    <div
        :class="{
          'mobile': isScreenXS,
          'mb-0': !isScreenXS
        }"
        class="title body-8-regular  text-gray-simple font-secondary text-center text-sm-left title d-flex align-items-center align-items-sm-start justify-content-center justify-content-sm-start"
    >
      {{ title }}
    </div>
    <h3
        :style="coloredText? `--color: ${color}`: ''"
        :class="mobileClass"
        class="fw-7 fs-24 mb-0 font-primary text-center text-sm-left figures "
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
    coloredText: {
      type: Boolean,
      default: true,
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.figures
  &.mobile
    @include body-8-medium
    font-family: $font-montserrat
    font-style: normal
    color: $color-black-4

.stat-card
  padding: 15px 36px

  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px
    padding: 11px 6px

    .title
      @include body-9-regular
      font-family: $font-montserrat
      font-style: normal
      color: $color-gray-69 !important
      white-space: nowrap
      margin-bottom: 5px


.mb-11
  margin-bottom: 11px

@media (max-width: 576px)
  .title
    font-size: 12px
    color: $color-black-1 !important
    font-weight: $medium
  .figures
    font-size: 15px
    color: var(--color)
</style>
