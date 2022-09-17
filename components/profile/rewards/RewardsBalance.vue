<template>
  <b-row>
    <b-col md="12">
      <b-row>
        <b-col md="12">
          <span class="body-1-bold">{{ $t('rewards.point_rewards') }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md="4">
          <b-card class="shadow-none px-3 h-100">
            <b-row>
              <b-col md="12" class="text-center">
                <EllipticProgressBarSVG />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mt-2 text-center">
                <span class="body-9-bold">{{ $t('rewards.your_next_reward', { remaining_points: remainingPoints }) }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" class="mt-1 text-center">
                <div class="body-9-regular">
                  {{ $t('rewards.get_more_kickback_points', { kickback_points: kickbackPoints }) }}
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col md="10" offset-md="1" class="mt-1 text-center">
                <Button block pill variant="earn-more">{{ $t('rewards.earn_more') }}</Button>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="12" class="mt-1 text-center">
                <span class="body-9-regular">&ast;{{ $t('rewards.points_will_expire_on', { points: expiringPoints, expiry_date: expiryDate }) }}</span>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="4">
          <b-card class="shadow-none px-3 mx-3 h-100">
            <b-row>
              <b-col md="12">
                <div class="body-4-bold">{{ $t('rewards.your_ds_rewards_benefits') }}</div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="12">
                <div>
                  <BagSmallSVG />
                  <span class="body-9-regular ml-2">{{ $t('rewards.free_shipping_for_your_next_purchases') }}</span>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <div>
                  <BagSmallSVG />
                  <span class="body-9-regular ml-2">{{ $t('rewards.free_deadstock_hat') }}</span>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <div>
                  <BagSmallSVG />
                  <span class="body-9-regular ml-2">
                    {{ $t('rewards.off_your_next_purchase', { discount: nextDiscount }) }}
                  </span>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <div>
                  <BagSmallSVG />
                  <span class="body-9-regular ml-2">
                    {{ $t('rewards.entry_tickets_into_raffle', { entry_tickets: entryTickets }) }}
                  </span>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-5">
              <b-col md="10" offset-md="1" class="text-center">
                <span class="body-9-regular ml-2">
                  {{ $t('rewards.spend_to_unlock_more', { spend: remainingToSpend }) }}
                </span>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="10" offset-md="1" class="text-center">
                <b-progress class="radius-3" variant="dark" :value="rewardPoints" :max="redeemableRewardsClosestStage.highestValue" />
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="6">
                <span class="body-9-medium">{{ $tc('rewards.points', Math.abs(redeemableRewardsClosestStage.lowestValue - 1) ,{ points: Math.abs(redeemableRewardsClosestStage.lowestValue - 1) }) }}</span>
              </b-col>
              <b-col md="6" class="text-right">
                <span class="body-9-medium">{{ $tc('rewards.points', redeemableRewardsClosestStage.highestValue, { points: redeemableRewardsClosestStage.highestValue }) }}</span>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="4">
          <b-card class="shadow-none px-3 h-100">
            <div class="text-center">
              <ShareCircleSVG />
            </div>
            <div class="body-9-bold mt-2 text-center">{{ $t('rewards.share') }}</div>
            <div class="body-9-regular mt-2 text-center">{{ $t('rewards.invite_friends_to_earn_points') }}</div>
            <b-row class="mt-4">
              <b-col md="10" offset-md="1">
                <Button block pill variant="confirm">{{ $t('rewards.share') }}</Button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <InviteFriendsCard class="mt-5" />

      <b-row class="mt-4">
        <b-col md="12">
          <b-card no-body class="shadow-none">
            <b-card-header header-tag="header" class="py-4 border-0" role="tab">
              <div v-b-toggle.ds-rewards-accordion class="d-flex align-items-center" role="button">
                <span class="body-3-bold">{{ $t('rewards.deadstock_rewards_program') }}</span>
                <ArrowUpSVG v-if="rewardsProgramExpanded" class="ml-auto pull-right" />
                <ArrowDownSVG v-else class="ml-auto pull-right" />
              </div>
            </b-card-header>
            <b-collapse id="ds-rewards-accordion" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-row>
                  <b-col md="12">
                    <b-table
                      :items="rewardThresholds"
                      :fields="rewardsTableFields"
                      borderless
                      tbody-tr-class="border-top"
                    >
                    </b-table>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="my-4">
        <b-col md="12">
          <b-card no-body class="shadow-none">
            <b-card-header header-tag="header" class="py-4 border-0" role="tab">
              <b-row v-b-toggle.my-rewards-accordion role="button">
                <b-col md="4" class="d-flex align-items-center">
                  <span class="body-3-bold">{{ $t('rewards.my_rewards') }}</span>
                </b-col>
                <b-col md="4">
                  <b-row v-if="! myRewardsExpanded">
                    <b-col md="9" class="d-block align-self-center">
                      <b-progress class="h-2 radius-3" :max="redeemableRewardsClosestStage.highestValue">
                        <b-progress-bar class="bg-color-2-blue" :value="rewardPoints" />
                      </b-progress>
                    </b-col>
                    <b-col md="3" class="d-flex align-items-center">
                      <span :class="{ 'text-color-gray-2': rewardPoints < redeemableRewardsClosestStage.highestValue }" class="ml-1 body-9-bold">{{ redeemableRewardsClosestStage.highestValue }}</span>
                      <TrophySmallDisabledSVG v-if="rewardPoints < redeemableRewardsClosestStage.highestValue" class="ml-2" />
                      <TrophySmallBlackSVG v-else class="ml-2" />
                    </b-col>
                  </b-row>
                </b-col>
                <b-col md="4" class="d-flex align-items-center" >
                  <ArrowUpSVG v-if="myRewardsExpanded" class="ml-auto" />
                  <ArrowDownSVG v-else class="ml-auto" />
                </b-col>
              </b-row>
            </b-card-header>
            <b-collapse id="my-rewards-accordion" accordion="my-accordion" role="tabpanel">
              <b-card-body class="pt-0">
                <RedeemableRewardsCard
                  v-for="(redeemableRewardsStage, index) in filteredRedeemableRewardsStages"
                  :key="index"
                  :lowest-value="redeemableRewardsStage.lowestValue"
                  :highest-value="redeemableRewardsStage.highestValue"
                  :user-range="redeemableRewardsStage.userRange"
                  :stage="redeemableRewardsStage.stage"
                  :class="{ 'mt-5': index }"
                />
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Modal
            id="redeem-reward-modal"
            centered
            header-class="bg-white"
            footer-class="border-0"
            body-class="pt-0 px-5"
          >
            <template #default>
              <b-row>
                <b-col md="12" class="text-center">
                  <i18n
                    path="rewards.are_you_sure_you_would_like_to"
                    tag="span"
                    class="body-3-regular"
                  >
                    <span class="body-3-bold">{{ selectedReward.name }}&quest;</span>
                  </i18n>
                </b-col>
              </b-row>
            </template>
            <template #footer>
              <b-row class="w-100">
                <b-col md="12" class="text-center">
                  <Button pill variant="confirm" class="px-5 mr-3" @click="redeemReward">{{ $t('rewards.redeem') }}</Button>
                  <Button pill variant="outline-dark" class="px-5 ml-3" @click="$bvModal.hide('redeem-reward-modal')">{{ $t('common.cancel') }}</Button>
                </b-col>
              </b-row>
            </template>
          </Modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Modal
            id="redeem-reward-success-modal"
            centered
            header-class="bg-white pb-0"
            hide-header
            footer-class="border-0 pt-0"
            body-class="pt-0 px-5"
          >
            <template #default>
              <b-row>
                <b-col md="12">
                  <b-img class="trophy-icon-position" :src="require('~/assets/img/rewards/trophy_blue.svg')" width="38" height="38" />
                  <b-img :src="require('~/assets/img/rewards/x_mark_black.svg')" class="pull-right" role="button" @click="$bvModal.hide('redeem-reward-success-modal')" />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="12" class="text-center">
                  <b-row>
                    <b-col md="12">
                      <span class="body-3-bold">{{ $t('rewards.congratulations') }}&excl;</span>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col md="12">
                      <span class="body-3-regular">{{ $t('rewards.pts_redeemed', { points: selectedReward.points}) }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4">
                    <b-col md="12">
                      <span class="body-3-medium">{{ selectedReward.name }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col md="12">
                      <span class="body-3-regular">{{ $t('rewards.added_to_checkout') }}</span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </template>
            <template #footer>
              <b-row class="w-100">
                <b-col md="12" class="text-center">
                  <Button variant="confirm" class="rounded-circle" :icon-only="true" :icon="require('~/assets/img/rewards/check_mark_white.svg')" @click="$bvModal.hide('redeem-reward-success-modal')" />
                </b-col>
              </b-row>
            </template>
          </Modal>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import InviteFriendsCard from '~/components/profile/rewards/common/InviteFriendsCard'
import EllipticProgressBarSVG from '~/assets/img/rewards/elliptic_progress_bar.svg?inline'
import BagSmallSVG from '~/assets/img/rewards/bag_small.svg?inline'
import ShareCircleSVG from '~/assets/img/rewards/share_circle.svg?inline'
import ArrowDownSVG from '~/assets/img/rewards/arrow_down.svg?inline'
import ArrowUpSVG from '~/assets/img/rewards/arrow_up.svg?inline'
import RedeemableRewardsCard from '~/components/profile/rewards/RedeemableRewardsCard'
import TrophySmallDisabledSVG from '~/assets/img/rewards/trophy_small_disabled.svg?inline'
import TrophySmallBlackSVG from '~/assets/img/rewards/trophy_small_black.svg?inline'
import Button from '~/components/common/Button'
import Modal from '~/components/common/Modal'

export default {
  name: 'RewardsBalance',
  components: { RedeemableRewardsCard, InviteFriendsCard, EllipticProgressBarSVG, BagSmallSVG, ShareCircleSVG, ArrowDownSVG, ArrowUpSVG, TrophySmallDisabledSVG, TrophySmallBlackSVG, Button, Modal },
  data() {
    return {
      rewardsProgramExpanded: false,
      myRewardsExpanded: false,
      selectedReward: {},
      rewardsTableFields: [
        {
          key: 'name',
          label: this.$t('rewards.earn_points_per'),
          class: 'pl-0',
        },
        {
          key: 'redemption_points',
          label: this.$tc('rewards.points', 100),
          class: 'pr-0 float-right',
        }
      ],
      // TODO: Temporary dummy data
      remainingPoints: 50,
      kickbackPoints: 1300,
      expiringPoints: 250,
      expiryDate: '10/20/2022',
      nextDiscount: 10,
      entryTickets: 10,
      remainingToSpend: 250,
    }
  },
  async fetch() {
    await this.$axios.get('reward-thresholds/stages', {}
    ).then(response => {
      this.$store.commit('rewards/addRedeemableRewardsStages', response.data.data)
    })
  },
  computed: {
    ...mapGetters({
      rewardThresholds: 'rewards/getRewardThresholds',
      redeemableRewardsStages: 'rewards/getRedeemableRewardsStages',
      rewardPoints: 'auth/getRewardPoints',
    }),
    filteredRedeemableRewardsStages(vm) {
      const redeemableRewardsStages = _.cloneDeep(vm.redeemableRewardsStages)
      redeemableRewardsStages.every(range => {
        if (vm.rewardPoints < range.highestValue) {
          range.userRange = true

          return false
        }

        return true
      })

      return redeemableRewardsStages
    },
    redeemableRewardsClosestStage(vm) {
      const range = vm.redeemableRewardsStages.find((range) => {
        return vm.rewardPoints < range.highestValue
      })

      return range || vm.redeemableRewardsStages[vm.redeemableRewardsStages.length - 1]
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (id, state) => {
      if (id === 'my-rewards-accordion') {
        this.myRewardsExpanded = state
      } else {
        this.rewardsProgramExpanded = state
      }
    })
    this.$root.$on('redeem-reward', (reward) => {
      this.selectedReward = reward
      this.$bvModal.show('redeem-reward-modal')
    })
    this.$root.$on('bv::modal::hide', (bvModalEvent) => {
      if (bvModalEvent.componentId === 'redeem-reward-success-modal') {
        this.$router.push('/checkout/selling')
      }
    })
  },
  methods: {
    ...mapActions({
      redeemUserReward: 'redeemed-reward/redeemUserReward',
    }),
    redeemReward() {
      this.redeemUserReward({
        selectedRewardId: this.selectedReward.id
      }).then(() => {
        this.$bvModal.hide('redeem-reward-modal')
        this.$bvModal.show('redeem-reward-success-modal')
      }).catch((error) => {
        this.$toasted.error(error)
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-gray-2
  color: $light-gray-2

.bg-color-2-blue
  background: $color-blue-2

.radius-3
  border-radius: 1rem

.h-2
  height: 0.5rem

.trophy-icon-position
  position: absolute
  bottom: 80%
  left: 46%

div
  .btn
    &.btn-earn-more
      background: $color-blue-20
      color: $color-white-1
      font-weight: $medium
      padding: 8px 8px
      &.disabled
        background: $color-gray-4
        &:hover
          box-shadow: 0 0.5rem 1rem $color-black-12
      &:hover
        box-shadow: 0 0.5rem 1rem $color-black-13
        color: $color-white-1
</style>
