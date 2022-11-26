<template>
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
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle class="feature-title-my">
        {{ $t('newest_features.shop_by_style.new_products') }}
      </FeatureTitle>
      <div class="cards-wrapper-in-app d-flex flex-column align-items-center">
        <div class="in-app-cards">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/shop-by-style/shirt.svg')
            "
            :title="$t('features.streetwear.cards.title1')"
          />
          <span class="before d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/shop-by-style/hat-icon.svg')
            "
            :title="$t('features.streetwear.cards.title2')"
          />
          <span class="after d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/shop-by-style/emojione-v1_watch.svg')
            "
            :title="$t('features.streetwear.cards.title3')"
          />
        </div>
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/shop-by-style/shop-by-style-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/shop-by-style/shop-by-style-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/shop-by-style/convenience.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shop-by-style/convenience-xs.png'),
          benefitTitle:
            'newest_features.shop_by_style.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.shop_by_style.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shop-by-style/virtual-style.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shop-by-style/virtual-style-xs.png'),
          benefitTitle:
            'newest_features.shop_by_style.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.shop_by_style.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shop-by-style/save-time.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/shop-by-style/save-time-xs.png'),
          benefitTitle:
            'newest_features.shop_by_style.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.shop_by_style.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/shop-by-style/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/shop-by-style/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.shop_by_style.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.shop_by_style.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.shop_by_style.bottom_banner.button_text',
        previousPage:
          'newest_features.shop_by_style.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.shop_by_style.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/auctions',
        nextPage: 'newest_features.shop_by_style.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.shop_by_style.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/crypto-payments',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@media screen and (max-width: 577px)
  .feature-title-my
    width: 100%
    margin-top: 48px !important
    margin-bottom: 24px !important
</style>
