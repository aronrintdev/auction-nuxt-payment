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
          title: this.$t(
            'newest_features.trading.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.trading.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/tradingondead.png'),
        },
        {
          title: this.$t(
            'newest_features.trading.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.trading.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/fairtrademeter.png'),
        },
        {
          title: this.$t(
            'newest_features.trading.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.trading.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/heatcheck.png'),
        },
      ],
      banner: {
        title: 'newest_features.trading.feature_banner_title',
        description: 'newest_features.trading.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/trading/tradebanner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/trading/tradebannermobile.png'),
      },
      shopNowBanner: {
        shopNowDescription: 'newest_features.trading.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.trading.shop_now_banner.button_text',
        previousPage: 'newest_features.selling_on_deadstock.title',
        previousPageLink: '/features/selling-on-deadstock',
        nextPage: 'newest_features.auctions.title',
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
