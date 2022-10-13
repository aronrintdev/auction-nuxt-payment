<template>
  <div class="d-flex flex-column">
    <div class="card desc d-flex flex-column align-items-center">
      <CashSVG/>
      <div class="mt-4 text-center">
        <span class="header">{{ $t('rewards.earn_points') }}</span>
      </div>
      <div class="mt-4 text-center">
        <span class="desc">{{ $t('rewards.participate_in_buying') }}</span>
      </div>

      <TrophySVG class="trophy"/>
      <div class="mt-4 text-center">
        <span class="header">{{ $t('rewards.get_rewards') }}</span>
      </div>
      <div class="mt-4 text-center">
        <span class="desc">{{ $t('rewards.redeem_points_for_exclusive') }}</span>
      </div>
    </div>

    <div class="m-t-30 d-flex align-items-center justify-content-center">
      <Button
          :to="$auth.user? '/shop' : '/signup'"
          pill
          variant="dark"
      >
        {{ $auth.user ? $t('rewards.start_earning_points') : $t('rewards.sign_up_to_earn') }}
      </Button>
    </div>

    <span class="body-3-medium rewards-title">{{ $t('rewards.rewards') }}</span>
    <b-table
        :fields="rewardsTableFields"
        :items="rewardThresholds"
        borderless
        class="table-rewards"
        tbody-tr-class="border-top"
    >
      <template #head(redemption_points)="">
        <span></span>
      </template>

      <template #cell(redemption_points)="data">
        <span class="body-21-bold">{{
            $tc('rewards.points', data.item.redemption_points, {points: data.item.redemption_points})
          }}</span>
      </template>
    </b-table>

    <InviteFriendsCard class="m-t-30"/>

    <div class="text-center m-t-50">
      <div class="text-line-middle body-5-normal">
        <span class="mx-1">{{ $tc('rewards.want_to_know_more', $t('rewards.terms_and_conditions')) }}</span>
        <span class="text-bold" role="button"
              @click="$router.push('/terms-and-conditions')">{{ $t('rewards.terms_and_conditions') }}</span>
      </div>
    </div>

    <FaqReward class="m-t-50"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import CashSVG from '~/assets/img/rewards/cash-blue.svg?inline'
import TrophySVG from '~/assets/img/rewards/trophy-gray.svg?inline'
import Button from '~/components/common/Button';
import FaqReward from '~/components/profile/rewards/FaqReward';
import InviteFriendsCard from '~/components/profile/rewards/common/InviteFriendsCard';

export default {
  name: 'MobileEarnTab',
  components: {InviteFriendsCard, FaqReward, Button, CashSVG, TrophySVG},
  data() {
    return {
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      rewardThresholds: 'rewards/getRewardThresholds'
    })
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"
.card
  padding: 25px
  background: $color-white-1
  box-shadow: 0px -1px 2px rgba($color-black-1, 0.12), 0px 1px 2px rgba($color-black-1, 0.12)
  border-radius: 8px

  .header
    @include body-2
    font-family: $font-montserrat
    font-style: normal
    font-weight: $bold
    color: $color-black-1
    margin-top: 16px

  .desc
    @include body-5
    font-family: $font-montserrat
    font-style: normal
    font-weight: $normal
    color: $color-gray-55
    margin-top: 8px

  .trophy
    margin-top: 26px

.m-t-30
  margin-top: 30px

.rewards-title
  margin-top: 38px

.table-rewards
  margin-top: 23px

.m-t-50
  margin-top: 50px
</style>
