<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
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
        v-for="(item, index) in tradingCard"
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
      $t('features.trading.new_features')
    }}</FeatureTitle>

    <div class="text-center new-features mb-5">
      <img
        :src="require('~/assets/img/features/trading/new-features.svg')"
        class="img-fluid"
      />
    </div>

    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :previousPageLink="'/features/selling'"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/auctions'"
      />
    </div>
  </FeatureContentWrapper>
</template>
<script>
import FeatureCard from '~/components/feature/Card'
import ShopNowBanner from '~/components/feature/ShopNowBanner'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    ShopNowBanner,
    FeatureCard,
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
      tradingCard: [
        {
          title: this.$t('features.trading.first_of_its_kind'),
          description: this.$t('features.trading.first_of_its_kind_desc'),
          image: require('~/assets/img/features/newest-feature/trading/tradingondead.png'),
        },
        {
          title: this.$t('features.trading.value_meter'),
          description: this.$t('features.trading.value_meter_desc'),
          image: require('~/assets/img/features/newest-feature/trading/fairtrademeter.png'),
        },
        {
          title: this.$t('features.trading.authenticity_guaranteed_products'),
          description: this.$t(
            'features.trading.authenticity_guaranteed_products_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/heatcheck.png'),
        },
      ],
      banner: {
        title: 'features.trading.title',
        description: 'features.trading.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/trading/tradebanner.png'),
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
    .cards-wrapper
      gap: 180px
      > div
        max-width: 361px
        min-height: 168px
        max-height: 320px

@media (max-width: 768px)
  .features-container
    .content
      .cards-wrapper
        gap: 16px
      > div
        min-width: 168px !important
        min-height: 164px !important

      .feature-item::v-deep
        flex-direction: column
        align-items: center
</style>
