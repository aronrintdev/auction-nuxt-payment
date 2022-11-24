<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :bottomBannerImage="bottomBanner.bottomBannerImage"
      :bottomBannerImageXS="bottomBanner.bottomBannerImageXS"
      :bottomBannerDescription="bottomBanner.bottomBannerDescription"
      :bottomBannerDescriptionXS="bottomBanner.bottomBannerDescriptionXS"
      :bottomBannerButtonLink="bottomBanner.bottomBannerButtonLink"
      :bottomBannerButtonText="bottomBanner.bottomBannerButtonText"
      :previousPage="bottomBanner.previousPage"
      :previousPageXS="bottomBanner.previousPageXS"
      :previousPageLink="bottomBanner.previousPageLink"
      :nextPage="bottomBanner.nextPage"
      :nextPageXS="bottomBanner.nextPageXS"
      :nextPageLink="bottomBanner.nextPageLink"
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
      <FeatureTitle class="feature-title-my">{{
        $t('features.trading.new_features')
      }}</FeatureTitle>

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
            require('~/assets/img/features/newest-feature/trading/speak.png')
          "
          :title="$t('features.trading.new_feature.counter_offers')"
          :description="$t('features.trading.new_feature.counter_offers_desc')"
        />
      </div>

      <div class="d-flex justify-content-center cards-wrapper-selling mb-5">
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/trading/shoes-shirt.png')
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
        backgroundImage: require('@/assets/img/features/newest-feature/trading/trading-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/trading/trading-banner-xs.png'),
      },
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/trading/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/trading/bottom-banner-xs.png'),
        bottomBannerDescription: 'newest_features.trading.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.trading.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.trading.bottom_banner.button_text',
        previousPage:
          'newest_features.trading.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.trading.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/selling-on-deadstock',
        nextPage: 'newest_features.trading.bottom_banner.next_page_title',
        nextPageXS: 'newest_features.trading.bottom_banner.next_page_xs_title',
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
@media screen and (max-width: 577px)
  .feature-title-my
    width: 100%
    margin-top: 0px !important
    margin-bottom: 24px !important
</style>
