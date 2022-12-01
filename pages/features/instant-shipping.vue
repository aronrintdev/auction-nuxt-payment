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
      <FeatureTitle v-if="isScreenXS" class="feature-title-my">
        {{ $t('newest_features.social_signin.refer_a_friend') }}
      </FeatureTitle>
      <InviteFriend v-if="isScreenXS" />
    </FeatureContentWrapper>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize'
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import InviteFriend from '~/components/feature/InviteFriend'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    InviteFriend,
  },
  mixins: [screenSize],
  layout: 'IndexLayout',
  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/instant-shipping/instant-shipping-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/instant-shipping/instant-shipping-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/ships-quickly.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/instant-shipping/ships-quickly-xs.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/pre-authenticated.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/instant-shipping/pre-authenticated-xs.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/wide-assortment.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/instant-shipping/wide-assortment-xs.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/instant-shipping/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/instant-shipping/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.instant_shipping.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.instant_shipping.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/notifications',
        bottomBannerButtonText:
          'newest_features.instant_shipping.bottom_banner.button_text',
        previousPage:
          'newest_features.instant_shipping.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.instant_shipping.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/social-signin',
        nextPage:
          'newest_features.instant_shipping.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.instant_shipping.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/shareable-wishlists-and-watchlists',
      },
    }
  },
}
</script>
<style lang="sass" scoped>

@media screen and (max-width: 577px)
  .feature-title-my
    width: 80%
    margin-top: 48px !important
    margin-bottom: 24px !important
</style>
