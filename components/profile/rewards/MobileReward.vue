<template>
  <div class="mobile-reward d-flex flex-column align-items-center">
    <div class="image position-relative">

      <TrophySmallBlackSVG v-if="!isRedeemDisabled" class="position-absolute active-image"/>
      <LockSVG v-if="isRedeemDisabled" class="position-absolute active-image"/>
    </div>
    <div class="action d-flex align-items-center justify-content-between w-100">
      <div class="action-text">
        <div class="points">{{
            $tc('rewards.points', reward.redemption_points, {points: reward.redemption_points})
          }}
        </div>
        {{ reward.reward_type }}
      </div>
      <Button
          :disabled="isRedeemDisabled"
          pill
          variant="dark-blue"
      >
        {{ $t('rewards.redeem') }}
      </Button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Button from '~/components/common/Button';
import TrophySmallBlackSVG from '~/assets/img/rewards/trophy_small_black.svg?inline'
import LockSVG from '~/assets/img/rewards/lock-gray.svg?inline'

export default {
  name: 'MobileReward',
  components: {Button, TrophySmallBlackSVG, LockSVG},
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints'
    }),
    isRedeemDisabled() {
      return this.rewardPoints < this.reward.redemption_points
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.mobile-reward

  .image
    width: 100%
    height: 267px
    background: $color-white-20

    .active-image
      height: 25px
      width: 25px
      top: 9px
      left: 9px

  .action
    margin-top: 30px

  .action-text
    @include body-3
    font-family: $font-montserrat
    font-style: normal
    font-weight: $normal
    color: $color-black-1

    .points
      margin-bottom: 6px

</style>
