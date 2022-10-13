<template>
  <div class="d-flex flex-column mobile-rewards">
    <div class="title">
      {{ $t('rewards.hi_name', {0: user.first_name}) }}
    </div>
    <div class="point-gauge">
      <MobileRewardGauge :current-points="rewardPoints"/>
    </div>
    <NavGroup
        :data="navs"
        :value="currentPage"
        class="nav-grp"
        @change="handlePageChange"
    />
    <div class="page-title d-flex align-items-center justify-content-center text-uppercase">
      {{ tabTitle() }}&nbsp;<span class="highlight">{{ tabTitle(2) }}</span>
    </div>
    <div v-if="currentPage !== 'history'" class="sub-title d-flex flex-column">
      <div class="text-center d-flex align-items-center justify-content-between">
        <div class="line flex-grow-1"></div>
        <div class="title flex-grow-0 mx-3" v-html="tabSub()"></div>
        <div class="line flex-grow-1"></div>
      </div>
      <div class="desc text-center">
        {{ tabDescription() }}
      </div>
    </div>

    <TierTabs v-if="isRedeemTab" :current="currentTier" :tiers="tiers" class="tabs" @change="handleTierChange"/>

    <div class="rewards d-flex flex-column">
      <div v-if="isRedeemTab">
        <div v-for="reward in filteredRewards" :key="reward.id" class="single-reward">
          <MobileReward :reward="reward"/>
        </div>
      </div>

      <MobileEarnTab v-if="isEarnTab" class=""/>
      <HistoryList v-if="!isEarnTab && !isRedeemTab"/>
    </div>

  </div>

</template>

<script>
import {mapGetters} from 'vuex';
import NavGroup from '~/components/common/NavGroup';
import TierTabs from '~/components/profile/rewards/TierTabs';
import MobileReward from '~/components/profile/rewards/MobileReward';
import MobileRewardGauge from '~/components/profile/rewards/MobileRewardGauge';
import MobileEarnTab from '~/components/profile/rewards/MobileEarnTab';
import HistoryList from '~/components/profile/rewards/HistoryList';

export default {
  name: 'MobileUserReward',
  components: {HistoryList, MobileEarnTab, MobileRewardGauge, MobileReward, TierTabs, NavGroup},
  data() {
    return {
      currentTier: 1,
      currentPage: 'redeem',
      navs: Object.keys(this.$t('rewards.navs')).map(key => {
        return {
          label: this.$t(`rewards.navs.${key}.label`),
          value: key
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      rewardPoints: 'auth/getRewardPoints',
      user: 'auth/user',
      tiers: 'rewards/getRedeemableRewardsStages',
      thresholds: 'rewards/getRewardThresholds',
    }),
    selectedTier() {
      return this.tiers.filter(tier => tier.stage === this.currentTier)[0]
    },
    filteredRewards() {
      return this.thresholds.filter(threshold => threshold.redemption_points > this.selectedTier.lowestValue && threshold.redemption_points <= this.selectedTier.highestValue)
          .sort((a, b) => a.redemption_points - b.redemption_points)
    },
    isRedeemTab() {
      return this.currentPage === 'redeem'
    },
    isEarnTab() {
      return this.currentPage === 'earn'
    }
  },
  methods: {
    handleTierChange(tier) {
      this.currentTier = tier
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    tabTitle(place = 1) {
      return this.$tc(`rewards.navs.${this.currentPage}.title`, place)
    },
    tabDescription() {
      return this.$t(`rewards.navs.${this.currentPage}.desc`)
    },
    tabSub() {
      return this.$t(`rewards.navs.${this.currentPage}.subtitle`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.mobile-rewards
  padding: 20px
  background-color: $color-white-1

  .nav-grp
    margin-top: 54px

  .point-gauge
    margin-top: 54px

  .tabs
    margin-top: 64px

  .rewards
    margin-top: 51px

  .single-reward:not(:first-child)
    margin-top: 42px

  .title
    @include body-7
    font-family: $font-montserrat
    font-style: normal
    font-weight: $bold
    color: $color-gray-14f

  .page-title
    @include body-3543
    margin-top: 32px
    font-family: $font-montserrat
    font-style: normal
    font-weight: $bold
    color: $color-black-1

    .highlight
      color: $color-blue-19

.sub-title
  margin-top: 42px

  .title
    @include body-17
    font-family: $font-montserrat
    font-style: normal
    font-weight: $bold
    color: $color-black-1

  .desc
    margin-top: 19px
    @include body-5
    font-family: $font-montserrat
    font-style: normal
    font-weight: $regular
    color: $color-black-1

  .line
    height: 1px
    background-color: $color-black-1


</style>
