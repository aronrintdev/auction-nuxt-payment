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
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/2fa-security/2fa-security-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/2fa-security/2fa-security-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/reduce-fraud.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/2fa-security/reduce-fraud-xs.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/strong-password.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/2fa-security/strong-password-xs.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/ease-of-use.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/2fa-security/ease-of-use-xs.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/2fa-security/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/2fa-security/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.2fa_security.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.2fa_security.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/faq',
        bottomBannerButtonText:
          'newest_features.2fa_security.bottom_banner.button_text',
        previousPage:
          'newest_features.2fa_security.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.2fa_security.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/damaged-packaging',
        nextPage: 'newest_features.2fa_security.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.2fa_security.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/deadstock-exchange',
      },
    }
  },
}
</script>
