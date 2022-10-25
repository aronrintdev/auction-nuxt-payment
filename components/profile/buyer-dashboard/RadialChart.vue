<template>
  <div class="progressbar position-relative">
    <svg class="progress-svg">
      <circle cx="105" cy="105" r="90"></circle>
      <circle
        cx="105"
        cy="105"
        r="90"
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
  data() {
    return {
      progress: 0,
      title: this.$t('buyer_dashboard.dashobard_buyer.ds_points'),
      totalPoints: 0,
      points: 0,
      rewards: {'next_reward':''}
    }
  },
  mounted(){
    this.getRewards()
  },
  methods: {
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
    },
    getRewards() {
      this.$axios
        .get('/dashboard/buyer/rewards')
        .then((res) => {
          this.rewards = res.data.data;
          if(res.data.data.current_points > 0){
            this.progress = parseInt((res.data.data.current_points/res.data.data.next_reward.redemption_points) * 100) + 25; // +25 is to set the graph to 0 as graph without it having issues
          }
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.progress-svg
  position: relative
  width: 210px
  height: 210px
  transform: rotate(120deg)
  circle
    width: 100%
    height: 100%
    fill: none
    stroke: $color-gray-29
    stroke-width: 16
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
  bottom: 7px
  translate: -50%
  background: $color-white-1
  width: 120px
  clip-path: polygon(87% 0, 100% 100%, 0 100%, 13% 0)
  height: 30px
</style>