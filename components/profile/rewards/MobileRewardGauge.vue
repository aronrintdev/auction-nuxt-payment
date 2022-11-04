<template>
  <div class="reward-gauge text-center position-relative">
    <canvas ref="gauge" class="gauge position-absolute" height="300px" width="340px"></canvas>
    <div class="title-points">{{ currentPoints.toLocaleString() }}</div>
    <div class="ds-points">{{ $t('rewards.ds_points') }}</div>
    <div class="next-reward">{{ $t('rewards.till_next_reward', [tillNext.toLocaleString()]) }}</div>
    <div v-if="last.length && showNextExpire" class="expire-on text-decoration-underline">{{
        $t('rewards.expire_on', {
          points: last[0].points.toLocaleString(),
          date: new Date(last[0].expires_on).toLocaleDateString()
        })
      }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MobileRewardGauge',
  props: {
    currentPoints: {
      type: Number,
      required: true
    },
    showNextExpire: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    ...mapGetters({
      last: 'rewards/getLastCreditHistoryItem',
      tiers: 'rewards/getRedeemableRewardsStages',
    }),
    tillNext() {
      return this.nextTier ? this.nextTier.highestValue - this.currentPoints : 0
    },
    nextTier() {
      let next = null
      for (const tier of this.tiers) {
        if (tier.highestValue > this.currentPoints) {
          next = tier
          break
        }
      }
      return next
    }

  },
  mounted() {
    this.drawArc()
  },
  methods: {
    drawArc() {
      const canvas = this.$refs.gauge
      const context = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 35;
      const radius = 150;
      context.beginPath();
      context.arc(centerX, centerY, radius - 6, Math.PI, 2 * Math.PI);
      context.lineWidth = 10;
      context.strokeStyle = '#E9F2FF';
      context.stroke();

      context.beginPath();
      context.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
      context.strokeStyle = '#C4C4C4';
      context.stroke();

      context.beginPath();
      context.arc(centerX, centerY, radius, Math.PI, (1 + this.tillNext / 1000) * Math.PI);
      context.strokeStyle = '#66779A';
      context.stroke();
      context.fillStyle = '#667799';
      context.textAlign = 'center';
      context.font = 'bold 19px Montserrat';
      const nextHigh = this.nextTier ? this.nextTier.highestValue.toLocaleString() : 0
      context.fillText('0', 20, 205);
      context.fillText(nextHigh, 310, 205);

    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.reward-gauge
  font-family: $font-montserrat
  font-style: normal

  .gauge
    top: 50%
    left: 50%
    transform: translate(-50%, -40%)

  .title-points
    @include body-3543
    font-weight: $bold
    color: $color-black-1

  .ds-points
    @include body-2530
    font-weight: $medium
    color: $color-orange-11

  .next-reward
    @include body-4
    font-weight: $normal
    color: $color-gray-5
    margin-top: 3px

  .expire-on
    @include body-9
    font-weight: $normal
    color: $color-black-1
    margin-top: 9px

</style>
