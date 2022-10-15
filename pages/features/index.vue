<template>
  <div>
    <b-container fluid class="px-0 mb-4 mb-sm-0 all-features-container">
      <FeatureBanner
        :title="$t('newest_features.title')"
        :description="$t('newest_features.desc')"
      />
      <b-container>
        <div class="m-auto my-wrapper-class">
          <h2
            class="text-center text-black text-uppercase fs-40 fw-6 mt-5 d-none d-sm-block deadstock-v2"
          >
            Deadstock V2.0
          </h2>
          <div class="mx-2 mx-sm-0 mt-5 mb-5 position-relative">
            <h2
              class="text-center text-black text-uppercase fs-40 fw-6 newest-features"
              v-html="$t('newest_features.title')"
            ></h2>
          </div>
          <div
            class="d-flex align-items-center justify-content-around justify-content-sm-between flex-wrap"
          >
            <FeatureCard
              v-for="(feature, index) in newestFeatures"
              :key="`feature-${index}`"
              :to="feature.to"
              :title="feature.title"
              :description="feature.description"
              :imageUrl="feature.imageUrl"
              :responsiveImage="feature.responsiveImage"
              class="feature-item"
            />
          </div>
        </div>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureCard from '~/components/feature/Card'

export default {
  components: { FeatureBanner, FeatureCard },

  layout: 'IndexLayout',

  data() {
    return {
      newestFeatures: [
        {
          to: '/features/buying',
          title: this.$t('newest_features.buy.title'),
          description: this.$t('newest_features.buy.desc'),
          imageUrl: require('@/assets/img/features/all-features/buy.png'),
          responsiveImage: require('@/assets/img/features/all-features/buy-sm.png'),
        },
        {
          to: '/features/selling',
          title: this.$t('newest_features.sell.title'),
          description: this.$t('newest_features.sell.desc'),
          imageUrl: require('@/assets/img/features/all-features/sell.png'),
          responsiveImage: require('@/assets/img/features/all-features/sell-sm.png'),
        },
        {
          to: '/features/trade',
          title: this.$t('newest_features.trade.title'),
          description: this.$t('newest_features.trade.desc'),
          imageUrl: require('@/assets/img/features/all-features/trade.png'),
          responsiveImage: require('@/assets/img/features/all-features/trade-sm.png'),
        },
        {
          to: '/features/auctions',
          title: this.$t('newest_features.auctions.title'),
          description: this.$t('newest_features.auctions.desc'),
          imageUrl: require('@/assets/img/features/all-features/auctions.png'),
          responsiveImage: require('@/assets/img/features/all-features/auctions-sm.png'),
        },
        {
          to: '/features/streetwear',
          title: this.$t('newest_features.streetwear.title'),
          description: this.$t('newest_features.streetwear.desc'),
          imageUrl: require('@/assets/img/features/all-features/streetwear.png'),
          responsiveImage: require('@/assets/img/features/all-features/streetwear-sm.png'),
        },
        {
          to: '/features/crypto-payments',
          title: this.$t('newest_features.crypto_payments.title'),
          description: this.$t('newest_features.crypto_payments.desc'),
          imageUrl: require('@/assets/img/features/all-features/crypto-payments.png'),
          responsiveImage: require('@/assets/img/features/all-features/crypto-payments-sm.png'),
        },
        {
          to: '/features/live-customer-service',
          title: this.$t('newest_features.live_customer_service.title'),
          description: this.$t('newest_features.live_customer_service.desc'),
          imageUrl: require('@/assets/img/features/all-features/live-customer-service.png'),
          responsiveImage: require('@/assets/img/features/all-features/live-customer-service-sm.png'),
        },
        {
          to: '/features/rewards-program',
          title: this.$t('newest_features.rewards_program.title'),
          description: this.$t('newest_features.rewards_program.desc'),
          imageUrl: require('@/assets/img/features/all-features/rewards-program.png'),
          responsiveImage: require('@/assets/img/features/all-features/rewards-program-sm.png'),
        },
        {
          to: '/features/virtual-giftcards',
          title: this.$t('newest_features.virtual_giftcards.title'),
          description: this.$t('newest_features.virtual_giftcards.desc'),
          imageUrl: require('@/assets/img/features/all-features/virtual-giftcards.png'),
          responsiveImage: require('@/assets/img/features/all-features/virtual-giftcards-sm.png'),
        },
        {
          to: '/features/int-buying-and-selling',
          title: this.$t('newest_features.int_buying_and_selling.title'),
          description: this.$t('newest_features.int_buying_and_selling.desc'),
          imageUrl: require('@/assets/img/features/all-features/int-buying-and-selling.png'),
          responsiveImage: require('@/assets/img/features/all-features/int-buying-and-selling-sm.png'),
        },
        {
          to: '/features/payments-plans',
          title: this.$t('newest_features.payments_plans.title'),
          description: this.$t('newest_features.payments_plans.desc'),
          imageUrl: require('@/assets/img/features/all-features/payments-plans.png'),
          responsiveImage: require('@/assets/img/features/all-features/payments-plans-sm.png'),
        },
        {
          to: '/features/int-languages',
          title: this.$t('newest_features.int_languages.title'),
          description: this.$t('newest_features.int_languages.desc'),
          imageUrl: require('@/assets/img/features/all-features/int-languages.png'),
          responsiveImage: require('@/assets/img/features/all-features/int-languages-sm.png'),
        },
        {
          to: '/features/csv-bulk-uploading',
          title: this.$t('newest_features.csv_bulk_uploading.title'),
          description: this.$t('newest_features.csv_bulk_uploading.desc'),
          imageUrl: require('@/assets/img/features/all-features/csv-bulk-uploading.png'),
          responsiveImage: require('@/assets/img/features/all-features/csv-bulk-uploading-sm.png'),
        },
        {
          to: '/features/promotions',
          title: this.$t('newest_features.promotions.title'),
          description: this.$t('newest_features.promotions.desc'),
          imageUrl: require('@/assets/img/features/all-features/promotions.png'),
          responsiveImage: require('@/assets/img/features/all-features/promotions-sm.png'),
        },
        {
          to: '/features/damaged-box-items',
          title: this.$t('newest_features.damaged_box_items.title'),
          description: this.$t('newest_features.damaged_box_items.desc'),
          imageUrl: require('@/assets/img/features/all-features/damaged-box-items.png'),
          responsiveImage: require('@/assets/img/features/all-features/damaged-box-items-sm.png'),
        },
        {
          to: '/features/twofa-security',
          title: this.$t('newest_features.twofa_security.title'),
          description: this.$t('newest_features.twofa_security.desc'),
          imageUrl: require('@/assets/img/features/all-features/2fa-security.png'),
          responsiveImage: require('@/assets/img/features/all-features/2fa-security-sm.png'),
        },
        {
          to: '/features/deadstock-exchange',
          title: this.$t('newest_features.deadstock_exchange.title'),
          description: this.$t('newest_features.deadstock_exchange.desc'),
          imageUrl: require('@/assets/img/features/all-features/deadstock-exchange.png'),
          responsiveImage: require('@/assets/img/features/all-features/deadstock-exchange-sm.png'),
        },
        {
          to: '/features/blockchain-authentication-ledger',
          title: this.$t(
            'newest_features.blockchain_authentication_ledger.title'
          ),
          description: this.$t(
            'newest_features.blockchain_authentication_ledger.desc'
          ),
          imageUrl: require('@/assets/img/features/all-features/blockchain-authentication-ledger.png'),
          responsiveImage: require('@/assets/img/features/all-features/blockchain-authentication-ledger-sm.png'),
        },
        {
          to: '/features/in-app-notifications',
          title: this.$t('newest_features.in_app_notifications.title'),
          description: this.$t('newest_features.in_app_notifications.desc'),
          imageUrl: require('@/assets/img/features/all-features/in-app-notifications.png'),
          responsiveImage: require('@/assets/img/features/all-features/in-app-notifications-sm.png'),
        },
        {
          to: '/features/social-signin',
          title: this.$t('newest_features.social_signin.title'),
          description: this.$t('newest_features.social_signin.desc'),
          imageUrl: require('@/assets/img/features/all-features/social-signin.png'),
          responsiveImage: require('@/assets/img/features/all-features/social-signin-sm.png'),
        },
        {
          to: '/features/instant-ship',
          title: this.$t('newest_features.instant_ship.title'),
          description: this.$t('newest_features.instant_ship.desc'),
          imageUrl: require('@/assets/img/features/all-features/instant-ship.png'),
          responsiveImage: require('@/assets/img/features/all-features/instant-ship-sm.png'),
        },
        {
          to: '/features/shareable-wishlists-and-watchlists',
          title: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.title'
          ),
          description: this.$t(
            'newest_features.shareable_wishlists_and_watchlists.desc'
          ),
          imageUrl: require('@/assets/img/features/all-features/shareable-wishlists-and-watchlists.png'),
          responsiveImage: require('@/assets/img/features/all-features/shareable-wishlists-and-watchlists-sm.png'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.all-features-container
  background-color: $color-gray-1
  .my-wrapper-class
    max-width: 968px
  h2.newest-features::before
    position: absolute
    left: 0px
    top: 50%
    content: ''
    width: 289px
    height: 1px
    background-color: $color-black-1
  h2.newest-features::after
    position: absolute
    right: 0px
    top: 50%
    content: ''
    width: 289px
    height: 1px
    background-color: $color-black-1
@media screen and (max-width: 770px)
  .all-features-container
    h2.deadstock-v2
      font-size: 30px
    h2.newest-features
      font-size: 30px
    h2.newest-features::before
      width: 145px
    h2.newest-features::after
      width: 145px
@media screen and (max-width: 426px)
  .all-features-container
    h2.newest-features
      font-size: 16px
    h2.newest-features::before
      width: 88px
    h2.newest-features::after
      width: 88px
</style>
