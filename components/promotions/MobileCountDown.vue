<template>
  <div>
    <vue-countdown v-slot="{ days, hours, minutes, seconds }" :auto-start="true" :time="timeDiff"
                   :transform="transformSlotProps"
                   class="counter-section" tag="div">
      <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex timer">
          <div class="text-center">
            <div class="timer-number">{{ days }}</div>
            <div class="body-sub-menu">{{ $t('promotions.days') }}</div>
          </div>
          <div class="timer-number px-2">:</div>
          <div class="text-center">
            <div class="timer-number">{{ hours }}</div>
            <div class="body-sub-menu">{{ $t('promotions.hours') }}</div>
          </div>
          <div class="timer-number px-2">:</div>
          <div class="text-center">
            <div class="timer-number">{{ minutes }}</div>
            <div class="body-sub-menu">{{ $t('promotions.minutes') }}</div>
          </div>
          <div class="timer-number px-2">:</div>
          <div class="text-center">
            <div class="timer-number">{{ seconds }}</div>
            <div class="body-sub-menu">{{ $t('promotions.seconds') }}</div>
          </div>
        </div>
      </div>
    </vue-countdown>
  </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
  name: 'MobileCountDown',
  components: {VueCountdown},
  props: {
    promotion: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeDiff() {
      const startDate = new Date();
      const endDate = new Date(this.promotion.end_at);
      return (endDate.getTime() - startDate.getTime());
    }
  },
  methods: {
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    }
  }

}
</script>

<style lang="sass" scoped>
@import '~/assets/css/variables'

.timer-number
  @include body-24
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-gray-5

.body-sub-menu
  @include body-5
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  color: $color-black-1

.counter-section
  width: 350px
</style>
