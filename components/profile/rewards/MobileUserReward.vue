<template>
  <div class="d-flex flex-column mobile-rewards">
    <div class="title">
      {{ $t('rewards.hi_name', {0: user ? user.first_name : ''}) }}
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
          <MobileReward :reward="reward" @redeem="redeemReward"/>
        </div>
      </div>

      <MobileEarnTab v-if="isEarnTab" class=""/>
      <HistoryList v-if="!isEarnTab && !isRedeemTab"/>
    </div>

    <MobileBottomSheet
        :has-header-divider="false"
        :height="'27%'"
        :open="modalOpen"
        :title="''"
        @closed="modalOpen = false"
        @opened="modalOpen = true"
    >
      <template #default>
        <div v-if="selectedReward" class="d-flex flex-column align-items-center h-88 w-100 px-5 ">
          <i18n class="redeem-title text-center mb-22" path="rewards.confirm_redeem_body" tag="div">
            <template #reward>
              <span class="font-weight-bold">{{ selectedReward.reward_type }}</span>
            </template>
            <template #points>
              {{ selectedReward.redemption_points }}
            </template>
          </i18n>
          <Button
              class="mb-22"
              pill
              variant="dark-blue"
              @click="redeemOk"
          >
            {{ $t('rewards.redeem') }}
          </Button>

          <Button
              variant="link-blue"
              @click="modalOpen = false"
          >
            {{ $t('common.cancel') }}
          </Button>
        </div>
      </template>
    </MobileBottomSheet>
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
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import Button from '~/components/common/Button';

export default {
  name: 'MobileUserReward',
  components: {
    Button,
    MobileBottomSheet, HistoryList, MobileEarnTab, MobileRewardGauge, MobileReward, TierTabs, NavGroup
  },
  data() {
    return {
      modalOpen: false,
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
      selectedReward: 'rewards/getRedeemed',
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
    redeemOk() {
      this.$router.push('/profile/rewards/redeemed')
    },
    redeemReward(reward) {
      this.$store.commit('rewards/setRedeemed', reward)
      this.$nextTick(() => {
        if (this.selectedReward.reward_type === 'Free Shipping') {
          this.modalOpen = true
        } else if (this.selectedReward.reward_type === 'Free Sneakers') {
          // TODO
        }
      })
    },
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

.h-88
  height: 88%

.redeem-title
  @include body-17
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-black-1

.mb-22
  margin-bottom: 22px
</style>
