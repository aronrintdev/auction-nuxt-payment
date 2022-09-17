<template>
  <b-row>
    <b-col md="10" offset-md="1">
      <!-- Earn Points Title -->
      <b-row class="mt-5">
        <b-col md="12" class="text-center">
          <span class="heading-5-medium text-uppercase">{{ $t('rewards.earn_points') }}</span>
        </b-col>
      </b-row><!-- End of Earn Points Title -->

      <!-- Sign Up, Earn Points & Rewards Cards -->
      <b-row class="mt-5">
        <b-col sm="12" md="4">
          <b-card class="border bg-white-4 radius-3 shadow-none text-center h-100">
            <b-card-body>
              <UserSVG />
              <div class="mt-4 text-center"><span class="body-2-bold">{{ $t('rewards.sign_up') }}</span></div>
              <div class="mt-4 text-center"><span class="body-8-regular">{{ $t('rewards.earn_200_points') }}</span></div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="4" class="my-xs-5 my-sm-5 my-md-0">
          <b-card class="border bg-white-4 radius-3 shadow-none text-center h-100">
            <b-card-body>
              <CashSVG />
              <div class="mt-4 text-center"><span class="body-2-bold">{{ $t('rewards.earn_points') }}</span></div>
              <div class="mt-4 text-center"><span class="body-8-regular">{{ $t('rewards.participate_in_buying') }}</span></div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12" md="4">
          <b-card class="border bg-white-4 radius-3 shadow-none text-center h-100">
            <b-card-body>
              <TrophySVG />
              <div class="mt-4 text-center"><span class="body-2-bold">{{ $t('rewards.get_rewards') }}</span></div>
              <div class="mt-4 text-center"><span class="body-8-regular">{{ $t('rewards.redeem_points_for_exclusive') }}</span></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row><!-- End of Sign Up, Earn Points & Rewards Cards -->

      <!-- Start Earning Points Button -->
      <b-row class="mt-5">
        <b-col md="12" class="text-center">
          <Button pill variant="dark" white-text to="/shop">{{ $t('rewards.start_earning_points') }}</Button>
        </b-col>
      </b-row><!-- End of Start Earning Points Button -->

      <InviteFriendsCard class="mt-5" />

      <!-- Deadstock Rewards Program Title -->
      <b-row class="mt-5">
        <b-col md="12" class="text-center">
          <div class="heading-5-medium text-uppercase text-line-bottom">{{ appName }}</div>
          <div class="heading-5-medium text-uppercase mt-1">{{ $t('rewards.rewards_program') }}</div>
        </b-col>
      </b-row>
      <!-- End of Deadstock Rewards Program Title -->

      <!-- Join Out Rewards Program Add Line -->
      <b-row class="mt-5">
        <b-col md="12" class="text-center">
          <p>{{ $t('rewards.join_our_rewards_program') }}</p>
        </b-col>
      </b-row><!-- End of Join Out Rewards Program Add Line -->

      <!-- Action Rewards Table & Points -->
      <b-row class="mt-3">
        <b-col md="12">
          <span class="body-3-medium">{{ $t('rewards.rewards') }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="12">
          <b-table
            :items="rewardThresholds"
            :fields="rewardsTableFields"
            borderless
            tbody-tr-class="border-top"
          >
          </b-table>
        </b-col>
      </b-row><!-- End of Action Rewards Table & Points -->

      <!-- Terms And Conditions Line & Link -->
      <b-row class="mt-5">
        <b-col md="12">
          <b-row>
            <b-col class="text-center">
              <div class="text-line-middle">
                <i18n
                  path="rewards.want_to_know_more"
                  tag="span"
                  class="body-5-normal mx-2"
                >
                  <span class="text-bold">{{ $t('rewards.terms_and_conditions') }}</span>
                </i18n>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row><!-- End of Terms And Conditions Line & Link -->

      <!-- Frequently Asked Questions Card & Link -->
      <b-row class="my-5">
        <b-col md="10" offset-md="1">
          <b-card class="border bg-white-4 radius-3 shadow-none">
            <b-card-body>
              <b-row>
                <b-col md="12" class="d-flex align-items-center">
                  <span class="body-7-medium text-color-blue-2">{{ $t('rewards.frequently_asked_questions') }}</span>
                  <ArrowCircleSVG role="button" class="ml-auto" @click="handleFaqClick" />
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row><!-- End of Frequently Asked Questions Card & Link -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import InviteFriendsCard from '~/components/profile/rewards/common/InviteFriendsCard'
import Button from '~/components/common/Button'
import UserSVG from '~/assets/img/rewards/user.svg?inline'
import CashSVG from '~/assets/img/rewards/cash.svg?inline'
import TrophySVG from '~/assets/img/rewards/trophy.svg?inline'
import ArrowCircleSVG from '~/assets/img/rewards/arrow_circle.svg?inline'

export default {
  name: 'EarnPoints',
  components: { InviteFriendsCard, Button, UserSVG, CashSVG, TrophySVG, ArrowCircleSVG },
  layout: 'Profile',
  data() {
    return {
      appName: process.env.APP_NAME,
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
    }
  },
  computed: {
    ...mapGetters({
      rewardThresholds: 'rewards/getRewardThresholds'
    })
  },
  methods: {
    handleFaqClick() {
      this.$router.push('/profile/rewards/faq')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-white-4
  background: $color-white-4

.text-line-bottom
  display: grid
  grid-template-columns: 1fr auto 1fr
  grid-gap: 4rem

.text-line-bottom
  &::before, &::after
    display: block
    border-bottom: 1px solid $black
    content: ''

.text-line-middle
  display: flex
  align-items: center
  justify-content: center

.text-line-middle
  &::before, &::after
    background: black
    height: 1px
    flex: 1
    content: ''

.text-color-blue-2
  color: $color-blue-2

div, p
  color: $color-black-1

.radius-3
  border-radius: 1rem

@media (max-width: 576px)
  .my-xs-5
    margin-top: 3rem
    margin-bottom: 3rem
</style>
