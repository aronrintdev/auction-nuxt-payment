<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
      :shopNowDescription="shopNowBanner.shopNowDescription"
      :shopNowButtonText="shopNowBanner.shopNowButtonText"
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    >
      <b-row
        class="justify-content-md-between justify-content-center h-card-main mb-md-5 w-100 mx-0"
      >
        <b-col
          v-for="(item, index) in tradingCard"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
          />
        </b-col>
      </b-row>
      <FeatureTitle>{{ $t('features.trading.new_features') }}</FeatureTitle>

      <div class="text-center new-features mb-5">
        <img
          :src="require('~/assets/img/features/trading/new-features.svg')"
          class="img-fluid"
        />
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureCard from '~/components/feature/Card'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureCard,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
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
        title: 'newest_features.trading.title',
        description: 'newest_features.trading.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/trading/tradebanner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/trading/tradebannermobile.png'),
      },
      shopNowBanner: {
        shopNowDescription: 'newest_features.trading.shop_now_desc',
        shopNowButtonText: 'newest_features.trading.shop_now_btn',
        previousPage: 'newest_features.trading.previous_page_name',
        previousPageLink: '/features/selling-on-deadstock',
        nextPage: 'newest_features.trading.next_page_name',
        nextPageLink: '/features/auctions',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .new-features img
    max-width: 837px !important
    width: 100% !important
@media (max-width: 768px)
  .features-container
    .new-features img
      padding: 0px 16px
</style>
