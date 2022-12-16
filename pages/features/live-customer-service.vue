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
        {{ $t('newest_features.live_customer_service.options') }}
      </FeatureTitle>
      <div class="cards-wrapper-in-app d-flex flex-column align-items-center">
        <div class="in-app-cards">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/chat.svg')
            "
            :title="$t('features.live_customer_service.cards.title1')"
          />
          <span class="before d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/nfc.png')
            "
            :title="$t('features.live_customer_service.cards.title2')"
          />
          <span class="after d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/envelop.svg')
            "
            :title="$t('features.live_customer_service.cards.title3')"
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
        backgroundImage: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/24-hour-live.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/live-customer-service/24-hour-live-xs.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/talk-to-a-real-person.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/live-customer-service/talk-to-a-real-person-xs.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/immediate-problem-solving.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/live-customer-service/immediate-problem-solving-xs.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/live-customer-service/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/live-customer-service/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.live_customer_service.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.live_customer_service.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/faq',
        bottomBannerButtonText:
          'newest_features.live_customer_service.bottom_banner.button_text',
        previousPage:
          'newest_features.live_customer_service.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.live_customer_service.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/crypto-payments',
        nextPage:
          'newest_features.live_customer_service.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.live_customer_service.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/rewards-program',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@media screen and (max-width: 577px)
  .feature-title-my
    margin-top: 48px !important
    margin-bottom: 24px !important
</style>
