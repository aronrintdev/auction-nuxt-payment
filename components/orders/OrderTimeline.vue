<template>
  <div class="timeframe">
    <div v-for="(frame, index) in timeline" :key="index" class="row">
      <div class="col-3 text-right order-1 order-sm-0">
        <span v-if="frame.date">{{ frame.date | formatDate }}</span>
        <span v-if="!frame.date" class="next-step d-none">{{ $t('orders.next_step') }}</span>
      </div>
      <div class="col-9 order-0 order-sm-1">
        <div class="timeframe-content d-flex align-items-baseline">
          <div class="timeframe-icon">
            <TimelineIcon :status="getStyle(frame)"/>
          </div>
          <div :class="getStyle(frame)">
            {{ frame.status }}
            <div v-if="frame.label && getStyle(frame) === 'active'" class="label">{{ frame.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineIcon from './TimelineIcon.vue'

export default {
  name: 'OrderTimeline',
  components: {
    TimelineIcon,
  },
  props: {
    timeline: {
      type: Array,
      required: true,
    },
    activeFrames: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    document.querySelector('.timeframe .next-step')?.classList.remove('d-none')
  },
  methods: {
    getStyle(frame) {
      if (this.activeFrames.includes(frame.value)) {
        return 'active'
      }

      if (!frame.date) {
        return 'pending'
      }

      return 'past'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '/assets/css/variables'

.timeframe
  @include body-14

  .label
    @include body-5

  .next-step
    color: $color-white-17

.timeframe .row:last-child .timeframe-content
  min-height: 16px

.timeframe-content
  border-left: 5px dotted $light-gray
  min-height: 5rem
  position: relative

  .active
    font-weight: bold

  .pending
    color: $color-white-17

.timeframe-icon
  background-color: $color-white-1
  font-size: 1rem
  position: relative
  left: -0.65rem
  width: 1.1rem

@media (max-width: 992px)
  .timeframe
    @include body-5

  .timeframe-content
    min-height: 3rem

</style>
