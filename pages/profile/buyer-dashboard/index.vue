<template>
  <client-only>
    <div class="buyer-dashboard" :class="mobileClass">
      <div class="d-sm-flex d-none">
        <h1 class="fs-24 fw-7 mb-0 font-primary">
          {{ $t('buyer_dashboard.dashobard_buyer.dashboard') }}
        </h1>
      </div>
      <!-- stats cards -->
      <section :class="mobileClass" class="row my-3 my-sm-5">
        <div class="col-3 col-md-3">
          <StatsCard
            :coloredText="false"
            :icon="require('~/assets/img/icons/profile/total-sales.svg')"
            :title="$t('vendor_purchase.purchases')"
            :value="totalPurchases"
            color="#667799"
          />
        </div>
        <div class="col-3 col-md-3">
          <StatsCard
            :coloredText="false"
            :icon="require('~/assets/img/icons/profile/trophy-green.svg')"
            :title="
              $t(
                `buyer_dashboard.dashobard_buyer.rewards_points${
                  isScreenXS ? '_mobile' : ''
                }`
              )
            "
            :value="
              '' + analytics.reward_points !== 'undefined'
                ? analytics.reward_points + ''
                : '...'
            "
            color="#CE745F"
          />
        </div>
        <div class="col-3 col-md-3">
          <StatsCard
            :coloredText="false"
            :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
            :title="
              $t(
                `buyer_dashboard.dashobard_buyer.items_bought${
                  isScreenXS ? '_mobile' : ''
                }`
              )
            "
            :value="
              '' + analytics.items_bought !== 'undefined'
                ? analytics.items_bought + ''
                : '...'
            "
            color="#7196B1"
          />
        </div>
        <div class="col-3 col-md-3">
          <StatsCard
            :coloredText="false"
            :icon="require('~/assets/img/icons/profile/item-sold.svg')"
            :title="
              $t(
                `buyer_dashboard.dashobard_buyer.offers_placed${
                  isScreenXS ? '_mobile' : ''
                }`
              )
            "
            :value="
              '' + analytics.offers_placed !== 'undefined'
                ? analytics.offers_placed + ''
                : '...'
            "
            color="#909090"
          />
        </div>
      </section>
      <section>
        <BuyerDashboardCharts />
      </section>
      <section class="my-sm-5">
        <Promotions />
      </section>
      <section
        :class="{
          'mt-20': isScreenXS,
          'mb-104 px-27': !isScreenXS,
        }"
      >
        <Purchases />
      </section>
      <Portal to="page-title"> {{ $t('profile_menu.dashboard') }}</Portal>
    </div>
  </client-only>
</template>
<script>
import StatsCard from '~/components/common/DashbaordStatsCard'
import Purchases from '~/components/profile/buyer-dashboard/Purchases'
import BuyerDashboardCharts from '~/components/profile/buyer-dashboard/BuyerDashboardCharts'
import Promotions from '~/components/profile/buyer-dashboard/Promotions'
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'BuyerDashboard',
  components: {
    Promotions,
    Purchases,
    StatsCard,
    BuyerDashboardCharts,
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: 'all',
      analytics: {
        total_purchases: 0,
        pending_commission: 0,
        inventory_amount: '2116448',
        items_sold: 0,
      },
      rewards: [],
      // Menus for tabs
      menus: [
        { label: this.$t('vendor_dashboard.all'), value: 'all' },
        { label: this.$t('vendor_dashboard.footwear'), value: 'footwear' },
        { label: this.$t('vendor_dashboard.apparel'), value: 'apparel' },
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: 'accessories',
        },
      ],
    }
  },
  computed: {
    totalPurchases() {
      return this.$options.filters.toCurrency(
        parseInt(this.analytics.total_purchases || 0)
      )
    },
  },
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.$axios
        .get('/dashboard/buyer/analytics')
        .then((res) => {
          this.analytics = res.data.data
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
.buyer-dashboard
  padding: 97px 30px 0 30px
  &.mobile
    padding: 16px
.mt-20
  margin-top: 20px

.mb-104
  margin-bottom: 104px

.px-27
  padding-inline: 27px 33px

.row
  &.mobile
    .col-3
      padding-inline: 4px

@media (max-width: 576px)
  .purchases
    font-size: 14px
    font-weight: $bold
    color: $color-gray-69
    width: 100%
</style>
