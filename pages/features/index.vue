<template>
  <div>
    <b-container fluid class="px-0 mb-4 mb-sm-0 all-features-container">
      <b-container>
        <div class="m-auto my-wrapper-class">
          <div class="mx-2 mx-sm-0 mb-76 position-relative">
            <h2
              class="text-center text-black fs-48 fw-7 newest-features font-adobe-garamond mb-0"
            >
              <span class="pre_line_sm">{{ $t('newest_features.title') }}</span>
            </h2>
          </div>
          <div
            class="d-flex align-items-center justify-content-around justify-content-sm-between flex-wrap cards_wrapper"
          >
            <NewestFeatureCard
              v-for="(feature, index) in newestFeatures"
              :key="`feature-${index}`"
              :to="feature.to"
              :title="feature.title"
              :description="feature.description"
              :imageUrl="feature.imageUrl"
              :imgSmUrl="feature.imgSmUrl"
              class="feature-item"
            />
          </div>
        </div>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import NewestFeatureCard from '~/components/feature/NewestFeatureCard'

export default {
  components: { NewestFeatureCard },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.title',
        description: 'newest_features.desc',
        backgroundImage: require('@/assets/img/features/feature-banner.png'),
        backgroundImageSm: require('@/assets/img/features/feature-banner-sm.png'),
      },
      newestFeatures: [
        {
          to: '/features/buying',
          title: 'newest_features.buying.title',
          description: 'newest_features.buying.desc',
          imageUrl: require('@/assets/img/features/all-features/buy.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/buy-sm.svg'),
        },
        {
          to: '/features/selling-on-deadstock',
          title: 'newest_features.selling_on_deadstock.title',
          description: 'newest_features.selling_on_deadstock.desc',
          imageUrl: require('@/assets/img/features/all-features/sell.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/sell-sm.svg'),
        },
        {
          to: '/features/trading',
          title: 'newest_features.trading.title',
          description: 'newest_features.trading.desc',
          imageUrl: require('@/assets/img/features/all-features/trade.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/trade-sm.svg'),
        },
        {
          to: '/features/auctions',
          title: 'newest_features.auctions.title',
          description: 'newest_features.auctions.desc',
          imageUrl: require('@/assets/img/features/all-features/auctions.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/auctions-sm.svg'),
        },
        {
          to: '/features/streetwear',
          title: 'newest_features.streetwear.title',
          description: 'newest_features.streetwear.desc',
          imageUrl: require('@/assets/img/features/all-features/streetwear.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/streetwear-sm.svg'),
        },
        {
          to: '/features/crypto-payments',
          title: 'newest_features.crypto_payments.title',
          description: 'newest_features.crypto_payments.desc',
          imageUrl: require('@/assets/img/features/all-features/crypto-payments.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/crypto-payments-sm.svg'),
        },
        {
          to: '/features/live-customer-service',
          title: 'newest_features.live_customer_service.title',
          description: 'newest_features.live_customer_service.desc',
          imageUrl: require('@/assets/img/features/all-features/live-customer-service.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/live-customer-service-sm.svg'),
        },
        {
          to: '/features/rewards-program',
          title: 'newest_features.rewards_program.title',
          description: 'newest_features.rewards_program.desc',
          imageUrl: require('@/assets/img/features/all-features/rewards-program.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/rewards-program-sm.svg'),
        },
        {
          to: '/features/virtual-giftcards',
          title: 'newest_features.virtual_giftcards.title',
          description: 'newest_features.virtual_giftcards.desc',
          imageUrl: require('@/assets/img/features/all-features/virtual-giftcards.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/virtual-giftcards-sm.svg'),
        },
        // Todo will add this feature later
        // {
        //   to: '/features/international-buying-and-selling',
        //   title: 'newest_features.international_buying_and_selling.title',
        //   description: 'newest_features.international_buying_and_selling.desc',
        //   imageUrl: require('@/assets/img/features/all-features/int-buying-and-selling.png'),
        //   imgSmUrl: require('@/assets/img/features/all-features/int-buying-and-selling-sm.png'),
        // },
        {
          to: '/features/payments-plans',
          title: 'newest_features.payments_plans.title',
          description: 'newest_features.payments_plans.desc',
          imageUrl: require('@/assets/img/features/all-features/payments-plans.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/payments-plans-sm.svg'),
        },
        {
          to: '/features/international-languages',
          title: 'newest_features.international_languages.title',
          description: 'newest_features.international_languages.desc',
          imageUrl: require('@/assets/img/features/all-features/int-languages.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/int-languages-sm.svg'),
        },
        {
          to: '/features/csv-bulk-uploading',
          title: 'newest_features.csv_bulk_uploading.title',
          description: 'newest_features.csv_bulk_uploading.desc',
          imageUrl: require('@/assets/img/features/all-features/csv-bulk-uploading.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/csv-bulk-uploading-sm.svg'),
        },
        {
          to: '/features/promotions',
          title: 'newest_features.promotions.title',
          description: 'newest_features.promotions.desc',
          imageUrl: require('@/assets/img/features/all-features/promotions.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/promotions-sm.svg'),
        },
        {
          to: '/features/damaged-box-items',
          title: 'newest_features.damaged_box_items.title',
          description: 'newest_features.damaged_box_items.desc',
          imageUrl: require('@/assets/img/features/all-features/damaged-box-items.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/damaged-box-items-sm.svg'),
        },
        {
          to: '/features/2fa-security',
          title: 'newest_features.2fa_security.title',
          description: 'newest_features.2fa_security.desc',
          imageUrl: require('@/assets/img/features/all-features/2fa-security.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/2fa-security-sm.svg'),
        },
        {
          to: '/features/deadstock-exchange',
          title: 'newest_features.deadstock_exchange.title',
          description: 'newest_features.deadstock_exchange.desc',
          imageUrl: require('@/assets/img/features/all-features/deadstock-exchange.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/deadstock-exchange-sm.svg'),
        },
        {
          to: '/features/blockchain-authentication-ledger',
          title: 'newest_features.blockchain_authentication_ledger.title',
          description: 'newest_features.blockchain_authentication_ledger.desc',
          imageUrl: require('@/assets/img/features/all-features/blockchain-authentication-ledger.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/blockchain-authentication-ledger-sm.svg'),
        },
        {
          to: '/features/in-app-notifications',
          title: 'newest_features.in_app_notifications.title',
          description: 'newest_features.in_app_notifications.desc',
          imageUrl: require('@/assets/img/features/all-features/in-app-notifications.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/in-app-notifications-sm.svg'),
        },
        {
          to: '/features/social-signin',
          title: 'newest_features.social_signin.title',
          description: 'newest_features.social_signin.desc',
          imageUrl: require('@/assets/img/features/all-features/social-signin.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/social-signin-sm.svg'),
        },
        {
          to: '/features/instant-shipping',
          title: 'newest_features.instant_shipping.title',
          description: 'newest_features.instant_shipping.desc',
          imageUrl: require('@/assets/img/features/all-features/instant-ship.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/instant-ship-sm.svg'),
        },
        {
          to: '/features/shareable-wishlists-and-watchlists',
          title: 'newest_features.shareable_wishlists_and_watchlists.title',
          description:
            'newest_features.shareable_wishlists_and_watchlists.desc',
          imageUrl: require('@/assets/img/features/all-features/shareable-wishlists-and-watchlists.svg'),
          imgSmUrl: require('@/assets/img/features/all-features/shareable-wishlists-and-watchlists-sm.svg'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.mb-76
  margin-bottom: 30px
  @media (min-width: 576px)
    margin-bottom: 76px
.cards_wrapper
  @media (min-width: 576px)
    row-gap: 50px
.font-adobe-garamond
  @media (max-width: 576px)
    .pre_line_sm
      white-space: pre-line
      text-transform: uppercase
.all-features-container
  background-color: $color-gray-1
  .my-wrapper-class
    max-width: 968px
    padding-top: 30px
    @media (min-width: 576px)
      padding-top: 117px
  h2.newest-features
    text-transform: capitalize
  h2.newest-features::before
    position: absolute
    left: 0px
    top: 50%
    transform: translate(0, 50%)
    content: ''
    width: 289px
    height: 1px
    background-color: $color-black-1
  h2.newest-features::after
    position: absolute
    right: 0px
    top: 50%
    transform: translate(0, 50%)
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
@media screen and (max-width: 577px)
  .all-features-container
    h2.newest-features
      font-size: 16px
@media screen and (max-width: 426px)
  .all-features-container
    h2.newest-features::before
      text-transform: uppercase
      width: 88px
    h2.newest-features::after
      width: 88px
</style>
