<template>
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
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
        {{ $t('newest_features.live_customer_service.options') }}
      </FeatureTitle>
      <div
        class="d-flex align-items-center justify-content-between position-relative options-section mb-5"
      >
        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/message.svg')
            "
            :title="$t('newest_features.live_customer_service.chat')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/nfc-phone.svg')
            "
            :title="$tc('newest_features.live_customer_service.phone', 2)"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/live-customer-service/envelope.svg')
            "
            :title="$tc('newest_features.live_customer_service.email', 2)"
            variant="round"
          />
        </div>

        <div class="mid-line position-absolute"></div>
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import FeatureCardHoverableRound from '~/components/feature/CardHoverableRound'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureCardHoverableRound,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.live_customer_service.feature_banner_title',
        description:
          'newest_features.live_customer_service.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/24-hour-live.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/talk-to-a-real-person.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/immediate-problem-solving.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.live_customer_service.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.live_customer_service.shop_now_banner.button_text',
        previousPage: 'newest_features.heat_check.title',
        previousPageLink: '/features/heat-check',
        nextPage: 'newest_features.rewards_program.title',
        nextPageLink: '/features/rewards-program',
      },
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content

    .feature-item
      margin-bottom: 115px

    .options-section
      .mid-line
        width: 100%
        border-bottom: 1px solid $color-black-1

      .card-wrapper
        z-index: 1
        background-color: $color-white-1
        padding: 0 20px
        background-color: $color-gray-1

@media (max-width: 1200px)
  .features-container
    .feature-content
      .options-section
        .mid-line
          width: 100%
          border-bottom: 1px solid $color-black-1
@media (max-width: 1000px)
  .features-container
    .feature-content

        .card-wrapper
          padding: 20px 0
          margin: 20px 0

@media (max-width: 578px)
  .features-container
    .feature-content
      .feature-item::v-deep
        flex-direction: column
        align-items: center
        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
      .options-section
        .card-wrapper
          padding: 0 10px
          background-color: $color-white-1
</style>
