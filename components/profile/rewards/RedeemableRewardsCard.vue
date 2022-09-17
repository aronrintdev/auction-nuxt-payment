<template>
  <b-row>
    <b-col md="12">
      <b-row v-if="userRange" class="mb-5">
        <b-col md="6" offset-md="3">
          <b-row>
            <b-col md="12">
              <div class="body-5-bold text-center">{{ $t('rewards.almost_there') }}</div>
              <div class="mt-4 body-5-normal text-center">{{ $t('rewards.pts_remains_to_unlock_the_next_stage', { points: highestValue - rewardPoints, stage: stage }) }}</div>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col md="10" class="d-block align-self-center">
              <b-progress class="h-2 radius-3" :max="highestValue">
                <b-progress-bar class="bg-color-2-blue" :value="rewardPoints" />
              </b-progress>
            </b-col>
            <b-col md="2" class="d-flex align-items-center">
              <span class="ml-1 body-9-bold text-color-gray-2">{{ highestValue }}</span>
              <TrophySmallDisabledSVG class="ml-2" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-card no-body class="shadow-none border-gray-3">
            <b-card-header class="bg-color-gray-3 border-0">
              <div class="d-flex align-items-center">
                <TrophySmallBlackSVG v-if="rewardPoints >= highestValue" class="text-left" />
                <LockSVG v-else class="text-left" />
                <span class="mx-auto body-5-bold">{{ $t('rewards.redeem_for') }}&nbsp;{{ highestValue ? highestValue : lowestValue }}&nbsp;{{ $t('rewards.pts') }}</span>
              </div>
            </b-card-header>
            <b-card-body class="bg-color-white-4">
              <b-row>
                <b-col
                  v-for="redeemableReward in redeemableRewards"
                  :key="redeemableReward.id"
                  md="4"
                  class="mx-auto"
                >
                  <b-card no-body class="w-75 mt-3 mx-auto border-radius-1 shadow-none">
                    <b-card-body :class="{ 'disabled-reward': rewardPoints < highestValue || Object.keys(redeemedReward).length }">
                      <b-table-simple table-class="mh-230" borderless>
                        <b-tbody>
                          <b-tr>
                            <b-td class="heading-4-normal text-center">{{ redeemableReward.name }}</b-td>
                          </b-tr>
                          <b-tr>
                            <b-td class="body-4-bold text-center align-bottom pb-0">
                              {{ redeemableReward.redemption_points }}&nbsp;<span class="text-uppercase">{{ $t('rewards.pts') }}</span>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                    </b-card-body>
                    <b-card-footer class="d-flex align-items-center justify-content-center bg-color-2-blue border-bottom-radius-1 mh-60" :class="{ 'disabled-btn': rewardPoints < highestValue || Object.keys(redeemedReward).length }" role="button" @click="redeemReward(redeemableReward)">
                      <div class="body-4-normal text-white text-center text-uppercase">{{ $t('rewards.redeem') }}</div>
                    </b-card-footer>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TrophySmallBlackSVG from '~/assets/img/rewards/trophy_small_black.svg?inline'
import TrophySmallDisabledSVG from '~/assets/img/rewards/trophy_small_disabled.svg?inline'
import LockSVG from '~/assets/img/rewards/lock.svg?inline'
import { LIMIT_RESULTS } from '~/static/constants'

export default {
  name: 'RedeemableRewardsCard',
  components: { TrophySmallBlackSVG, TrophySmallDisabledSVG, LockSVG },
  props: {
    lowestValue: {
      type: Number,
      default: 0,
    },
    highestValue: {
      type: Number,
      default: Number.MAX_VALUE,
    },
    userRange: {
      type: Boolean,
      default: false,
    },
    stage: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      redeemableRewards: {}
    }
  },
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints',
      redeemedReward: 'redeemed-reward/getRedeemedReward'
    }),
  },
  mounted() {
    this.getRedeemableRewards()
  },
  methods: {
    getRedeemableRewards() {
      this.$axios.get(`reward-thresholds?point_range=${this.lowestValue},${this.highestValue}&limit=${LIMIT_RESULTS}}`, {}
      ).then((response) => {
        this.redeemableRewards = response.data.data
      })
    },
    redeemReward(redeemableReward) {
      if (this.rewardPoints >= this.highestValue && ! Object.keys(this.redeemedReward).length) {
        this.$root.$emit('redeem-reward', redeemableReward)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-color-2-blue
  background: $color-blue-2

.bg-color-white-4
  background: $color-white-4

.bg-color-gray-3
  background: $color-gray-3

.mh-60
  min-height: 60px

.mh-230
  min-height: 230px

.disabled-reward::v-deep
  opacity: 25%

.disabled-btn
  background: $white-5

.border-radius-1
  border-radius: 1rem

.border-bottom-radius-1
  border-bottom-left-radius: 1rem
  border-bottom-right-radius: 1rem

.border-gray-3
  border: 1px solid $color-gray-3 !important

.radius-3
  border-radius: 1rem

.h-2
  height: 0.5rem
</style>
