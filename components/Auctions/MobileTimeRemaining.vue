<template>
  <div class="d-md-none d-flex justify-content-center mobile-time-remaining ">
    <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
      <div class="time-value">{{ days }}</div>
      <div class="time-unit">{{ $t('promotions.days') }}</div>
    </div>
    <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
      <div class="time-value">{{ hours }}</div>
      <div class="time-unit">{{ $t('promotions.hours') }}</div>
    </div>
    <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
      <div class="time-value">{{ mins }}</div>
      <div class="time-unit">{{ $t('promotions.mins') }}</div>
    </div>
    <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
      <div class="time-value">{{ secs }}</div>
      <div class="time-unit">{{ $t('promotions.secs') }}</div>
    </div>
  </div>
</template>

<script>
/*
* AuctionsMobileTimeRemaing
*/
export default {
  name: 'AuctionsMobileTimeRemaing',
  props: {
    endAt: {
      type: String,
      default: '',
    },
  },
  computed: {
    days() {
      const diffInSeconds = this.getDiff()
      return parseInt(diffInSeconds / 86400)
    },
    hours() {
      let diffInSeconds = this.getDiff()
      diffInSeconds = diffInSeconds - this.days * 86400
      return parseInt(diffInSeconds / 3600)
    },
    mins() {
      let diffInSeconds = this.getDiff()
      diffInSeconds = diffInSeconds - this.days * 86400 - this.hours * 3600
      return parseInt(diffInSeconds / 60)
    },
    secs() {
      const diffInSeconds = this.getDiff()
      return Math.ceil(diffInSeconds % 60)
    }
  },
  methods: {
    getDiff() {
      const endingTimestamp = new Date(this.endAt).valueOf()
      const currentTimestamp = new Date().valueOf()
      const diff = (endingTimestamp - currentTimestamp) / 1000
      if (diff > 0) return diff
      return 0
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.time
  width: 60px
  height: 60px
  &::after
    content: ''
    position: absolute
    top: 11px
    right: 0
    display: block
    width: 0.5px
    height: 38px
    background: #EDEDED
  &:last-child
    &::after
      display: none
  &-value
    @include body-2
    font-family: $font-sp-pro
    font-weight: $normal
    color: $black
  &-unit
    @include body-1224
    font-family: $font-sp-pro
    font-weight: $light
    color: $black
</style>
  