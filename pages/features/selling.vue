<template>
  <FeatureContentWrapper
    :title="banner.title"
    :description="banner.description"
    :backgroundImage="banner.backgroundImage"
  >
    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('common.benefit', 2)
    }}</FeatureTitle>

    <b-row class="justify-content-between h-card-main mb-md-5">
      <b-col
        v-for="(item, index) in sellingCard"
        :key="index"
        lg="3"
        class="d-flex justify-content-center d-lg-block"
      >
        <FeatureCard
          :title="item.title"
          :description="item.description"
          :imageUrl="item.image"
        />
      </b-col>
    </b-row>

    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('footer.process', 2)
    }}</FeatureTitle>

    <div class="d-flex justify-content-center cards-wrapper mb-3 mb-md-5">
      <FeatureCardHoverable
        :icon="require('~/assets/img/features/selling/create-listing.svg')"
        :title="$t('features.selling.create_listing')"
        :description="$t('features.selling.create_listing_desc')"
      />

      <FeatureCardHoverable
        :icon="require('~/assets/img/features/selling/sell-items.svg')"
        :title="$t('features.selling.sell_items')"
        :description="$t('features.selling.sell_items_desc')"
      />
    </div>

    <div class="d-flex justify-content-center cards-wrapper mb-5">
      <FeatureCardHoverable
        :icon="require('~/assets/img/features/selling/ship-items.svg')"
        :title="$t('features.selling.ship_items')"
        :description="$t('features.selling.ship_items_desc')"
      />

      <FeatureCardHoverable
        :icon="require('~/assets/img/features/selling/earn-commission.svg')"
        :title="$t('features.selling.earn_commission')"
        :description="$t('features.selling.earn_commission_desc')"
      />
    </div>
    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/selling'"
        :previousPageLink="'/features/buying'"
      />
    </div>
  </FeatureContentWrapper>
</template>
<script>
import FeatureCardHoverable from '~/components/feature/CardHoverable'
import FeatureCard from '~/components/feature/Card'
import ShopNowBanner from '~/components/feature/ShopNowBanner'
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureCard,
    ShopNowBanner,
    FeatureCardHoverable,
    FeatureContentWrapper,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      options: [
        {
          id: 'affirm',
          icon: require('~/assets/img/icons/affirm-black.svg'),
        },
        {
          id: 'afterpay',
          icon: require('~/assets/img/icons/afterpay.svg'),
        },
      ],
      sellingCard: [
        {
          title: this.$t('features.trading.authenticity_guaranteed_products'),
          description: this.$t(
            'features.trading.authenticity_guaranteed_products'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/newest-money.png'),
        },
        {
          title: this.$t('features.trading.authenticity_guaranteed_products'),
          description: this.$t(
            'features.trading.authenticity_guaranteed_products'
          ),
          image: require('~/assets/img/features/newest-feature/selling/low-fee.png'),
        },
        {
          title: this.$t('features.trading.authenticity_guaranteed_products'),
          description: this.$t(
            'features.trading.authenticity_guaranteed_products'
          ),
          image: require('~/assets/img/features/newest-feature/selling/free-shipping.png'),
        },
      ],
      banner: {
        title: 'features.selling.title',
        description: 'features.selling.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/selling/sellingbanner.png'),
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .content
    .process-box
      width: 360px !important
      height: 320px !important

    .feature-item
      margin-bottom: 115px

  .cards-wrapper
    gap: 180px !important
    > div
      max-width: 361px
      min-height: 168px
      max-height: 320px

@media (max-width: 768px)
  .features-container
    .cards-wrapper
      gap: 16px !important
    > div
      min-width: 168px !important
      min-height: 164px !important
      .feature-item::v-deep
        flex-direction: column
        align-items: center
</style>
