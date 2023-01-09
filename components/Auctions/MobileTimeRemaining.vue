<template>
  <div v-if="endAt">
    <div v-if="isExpired" class="mb-3 d-md-none d-flex flex-column align-items-center justify-content-center expired-status">
      <span>{{ $t('bids.expired_on') }}</span>
      <div class="d-flex align-items-center justify-content-center mt-1">
        <span class="date">{{ endAt | formatDate }}</span>
        <span class="ml-2 w-auto h-auto time">@ {{ formatTime(endAt) }}</span>
      </div>
    </div>
    <div v-else-if="isScheduled" class="mb-3 d-md-none d-flex flex-column align-items-center justify-content-center expired-status">
      <span>{{ $t('auctions.frontpage.scheduled_on') }}</span>
      <div class="d-flex align-items-center justify-content-center mt-1">
        <span class="date">{{ endAt | formatDate }}</span>
        <span class="ml-2 w-auto h-auto time">@ {{ formatTime(endAt) }}</span>
      </div>
    </div>
    <div v-else-if="isSold" class="mb-3 d-md-none d-flex flex-column align-items-center justify-content-center expired-status">
      <span>{{ $t('auctions.frontpage.sold_on') }}</span>
      <div class="d-flex align-items-center justify-content-center mt-1">
        <span class="date">{{ endAt | formatDate }}</span>
        <span class="ml-2 w-auto h-auto time">@ {{ formatTime(endAt) }}</span>
      </div>
    </div>
    <div v-else class="d-md-none d-flex justify-content-center mobile-time-remaining">
      <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
        <div class="time-value">{{ days >= 10 ? days : `0${days}` }}</div>
        <div class="time-unit text-lowercase">{{ $t('promotions.days') }}</div>
      </div>
      <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
        <div class="time-value">{{ hours >= 10 ? hours : `0${hours}` }}</div>
        <div class="time-unit text-lowercase">{{ $t('promotions.hours') }}</div>
      </div>
      <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
        <div class="time-value">{{ mins >= 10 ? mins : `0${mins}` }}</div>
        <div class="time-unit text-lowercase">{{ $t('promotions.mins') }}</div>
      </div>
      <div class="time position-relative d-flex flex-column justify-content-center align-items-center">
        <div class="time-value">{{ secs >= 10 ? secs : `0${secs}` }}</div>
        <div class="time-unit text-lowercase">{{ $t('promotions.secs') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
    isExpired: {
      type: Boolean,
      default: false,
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    isSold: {
      type: Boolean,
      default: false,
    }
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
    },
    formatTime(time) {
      return dayjs(time).format('h:mm A')
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
    top: 13px
    right: 0
    display: block
    width: 0.5px
    height: 34px
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
    line-height: 14px
    font-family: $font-sp-pro
    font-weight: $light
    color: $black
.expired-status
  span
    font-weight: $normal
    font-family: $font-sp-pro
    @include body-5
    color: $black
    &.time
      @include body-2
      color: $color-gray-5
      white-space: nowrap
    &.date
      @include body-2
      color: $black

</style>
  