<template>
  <div v-if="rewards" class="progressbar position-relative">
    <svg class="progress-svg">
      <circle cx="75" cy="75" r="66"></circle>
      <circle
          cx="75"
          cy="75"
          r="66"
          :style="{ '--progress': progress }"
      ></circle>
    </svg>
    <div class="progress_stats">
      <h3 class="fs-30 fw-7 mb-0 font-primary">{{ rewards.current_points }}</h3>
      <h6 class="fs-12 fw-7 mb-0 font-primary text-black-50">{{ title }}</h6>
    </div>
    <div
      class="progress_value d-flex align-items-center justify-content-center"
    >
      <h6 v-if='rewards.next_reward' class="fs-12 fw-7 font-primary mb-0 text-black-50">
        {{ rewards.next_reward.redemption_points }}
      </h6>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadialChart',
  props: {
    rewards: {
      type: Object,
      default: null
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      title: this.$t('buyer_dashboard.dashobard_buyer.ds_points'),
      totalPoints: 0,
      points: 0
    }
  },
  methods: {
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.progress-svg
  position: relative
  width: 150px
  height: 150px
  transform: rotate(120deg)
  circle
    width: 100%
    height: 100%
    fill: none
    stroke: $light-gray-2
    stroke-width: 10
    &:last-of-type
      stroke-dasharray: 468px
      stroke-dashoffset: calc(625px - (625px * var(--progress)) / 100)
      stroke: $color-black-1
.progress_stats
  position: absolute
  top: 50%
  left: 50%
  translate: -50% -50%
.progress_value
  position: absolute
  left: 50%
  bottom: 0
  translate: -50%
  background: $color-white-1
  width: 90px
  clip-path: polygon(87% 0, 100% 100%, 0 100%, 13% 0)
  height: 30px
</style>
