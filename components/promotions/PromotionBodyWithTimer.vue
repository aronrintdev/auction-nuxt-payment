<template>
  <div class="my-5 deadline-countdown-timer m-auto">
    <div class="d-flex mt-4">
      <b-row :class="{'flex-row-reverse': isCash}">
        <b-col md="6">
          <div class="deadline-title">{{ $t('promotions.deadline') }}</div>
          <div class="end-date mt-2">{{ promotion.end_at }}</div>
          <div class="divider-line my-4"></div>

          <vue-countdown v-slot="{ days, hours, minutes, seconds }" :auto-start="true" :time="timeDiff"
                         :transform="transformSlotProps"
                         class="counter-section" tag="div">
            <div class="d-flex timer">
              <div class="text-center">
                <div class="timer-number">{{ days }}</div>
                <div class="body-5-regular">{{ $t('promotions.days') }}</div>
              </div>
              <div class="timer-number px-2">:</div>
              <div class="text-center">
                <div class="timer-number">{{ hours }}</div>
                <div class="body-5-regular">{{ $t('promotions.hours') }}</div>
              </div>
              <div class="timer-number px-2">:</div>
              <div class="text-center">
                <div class="timer-number">{{ minutes }}</div>
                <div class="body-5-regular">{{ $t('promotions.minutes') }}</div>
              </div>
              <div class="timer-number px-2">:</div>
              <div class="text-center">
                <div class="timer-number">{{ seconds }}</div>
                <div class="body-5-regular">{{ $t('promotions.seconds') }}</div>
              </div>
            </div>
          </vue-countdown>

          <div v-if="!isGiveaway" class="pt-4 d-flex align-items-center">
            <img :src="require('~/assets/img/promotions/entries.svg')" alt="entries"/>
            <div class="body-2-bold entries-label px-3">{{ $t('promotions.your_entries') }}</div>
            <div class="body-1-bold entries-score">{{ entries }}</div>
          </div>
        </b-col>
        <b-col class="d-flex flex-column align-items-center" md="6">
          <div class="text-right heading-4-bold ">{{ promotion.learn_more_page_header }}</div>
          <div class="text-right body-1-regular">{{ $t('promotions.enter_fot_chance_to_win') }}</div>
          <div class="ml-5  deadline-countdown-timer-image ">
            <img v-if="promotion.promotion_image" :src="promotion.promotion_image" class="mt-5"/>
          </div>
        </b-col>
      </b-row>


    </div>
  </div>
</template>
<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
import {PROMOTION_TYPE_GIVEAWAY, PROMOTION_TYPE_SWEEPSTAKES, SWEEPSTAKES_TYPE_CASH} from '~/static/constants';

export default {
  name: 'PromotionBodyWithTimer',
  components: {
    VueCountdown
  },
  props: {
    category: {
      type: String,
      default: 'sweepstake',
    },
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
    },
    entries() {
      return this.promotion && this.$auth.user ? this.promotion.promotion_entries.filter(entry => entry.user_id === this.$auth.user.id).length : 0
    },
    isGiveaway() {
      return this.promotion.type === PROMOTION_TYPE_GIVEAWAY
    },
    isSweepStake() {
      return this.promotion.type === PROMOTION_TYPE_SWEEPSTAKES
    },
    isCash() {
      return this.isSweepStake && this.promotion.sweepstakes_type === SWEEPSTAKES_TYPE_CASH
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
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.deadline-countdown-timer
  width: 760px

  .heading-4-bold
    line-height: 50px

  &-image
    background-color: $color-white-5
    height: 340px
    width: 340px
    border-radius: 50%

    img
      object-fit: cover
      width: 100%
      max-width: 350px

  .deadline-title
    color: $color-gray-47
    letter-spacing: 0.215em
    font-size: 30px
    line-height: 37px
    font-weight: $normal

  .end-date
    font-size: 30px
    line-height: 37px
    font-weight: $normal

  .divider-line
    width: 92px
    height: 1px
    background: $black

  .timer-number
    font-size: 50px
    line-height: 61px
    font-weight: $bold

  .entries-score
    color: $color-ui-warning

  .counter-section
    width: 350px
</style>