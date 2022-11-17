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
      <b-row class="justify-content-center h-card-main">
        <b-col
          v-for="(item, index) in tradingCard"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block h-card-column px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
            :resImageUrl="item.responsiveImage"
          />
        </b-col>
      </b-row>
      <FeatureTitle>{{ $t('features.trading.new_features') }}</FeatureTitle>

      <div
        class="d-flex justify-content-center cards-wrapper-selling mb-3 mb-md-5"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/trading/add.svg')
          "
          :title="$t('features.trading.new_feature.add_cash')"
          :description="$t('features.trading.new_feature.add_cash_desc')"
        />

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/trading/speak.svg')
          "
          :title="$t('features.trading.new_feature.counter_offers')"
          :description="$t('features.trading.new_feature.counter_offers_desc')"
        />
      </div>

      <div class="d-flex justify-content-center cards-wrapper-selling mb-5">
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/trading/shoes-shirt.svg')
          "
          :title="$t('features.trading.new_feature.multi_items')"
          :description="$t('features.trading.new_feature.multi_items_desc')"
        />

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/trading/list.svg')
          "
          :title="$t('features.trading.new_feature.want_list')"
          :description="$t('features.trading.new_feature.want_list_desc')"
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
          responsiveImage: require('~/assets/img/features/newest-feature/trading/mobile-tradingondeadstockfirstofitskind.png'),
        },
        {
          title: this.$t(
            'newest_features.trading.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.trading.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/fairtrademeter.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/trading/mobile-fairtrademeter.png'),
        },
        {
          title: this.$t(
            'newest_features.trading.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.trading.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/trading/heatcheck.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/trading/mobile-heatcheck.png'),
        },
      ],
      banner: {
        title: 'newest_features.trading.feature_banner_title',
        description: 'newest_features.trading.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/trading/tradebanner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/trading/tradebannermobile.svg'),
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
  .feature-content
    .process-box
      width: 360px !important
      height: 320px !important

    .feature-item
      margin-bottom: 115px

  .cards-wrapper-selling
    gap: 180px !important
    > div
      max-width: 361px
      min-height: 168px
      max-height: 320px


@media (max-width: 768px)
  .features-container
    .cards-wrapper-selling
      padding: 0px 16px
      gap: 16px !important
    > div
      min-width: 168px !important
      min-height: 164px !important
      .feature-item::v-deep
        flex-direction: column
        align-items: center
</style>
