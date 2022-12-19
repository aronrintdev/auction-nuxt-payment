<template>
  <div class="in-app-notification-main">
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
        {{ $t('newest_features.in_app_notifications.methods') }}
      </FeatureTitle>
      <div class="cards-wrapper-in-app d-flex flex-column align-items-center">
        <div class="in-app-cards">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notification/envelope.svg')
            "
            :title="$t('newest_features.in_app_notifications.email')"
          />
          <span class="before d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notifications/mobile-ring.svg')
            "
            :title="$t('newest_features.in_app_notifications.in_app')"
            class="feature-four-cards-center"
          />
          <span class="after d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notification/sms.svg')
            "
            :title="$t('newest_features.in_app_notifications.text')"
          />
        </div>
        <div class="prefrence-card d-flex flex-column align-items-baseline">
          <div class="title-icon d-flex gap-2 align-items-center">
            <div class="title feature-title">
              {{ $t('newest_features.in_app_notifications.prefrences') }}
            </div>
            <img
              src="~/assets/img/features/newest-feature/in-app-notifications/setting-icon.svg"
              alt=""
            />
          </div>
          <div class="desc">
            {{ $t('newest_features.in_app_notifications.prefrences_desc') }}
          </div>
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
        backgroundImage: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/get-notified.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/in-app-notifications/get-notified-xs.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-updates.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/in-app-notifications/live-updates-xs.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-notifications.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/in-app-notifications/live-notifications-xs.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/in-app-notifications/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/in-app-notifications/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.in_app_notifications.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.in_app_notifications.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/notifications',
        bottomBannerButtonText:
          'newest_features.in_app_notifications.bottom_banner.button_text',
        previousPage:
          'newest_features.in_app_notifications.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.in_app_notifications.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/blockchain-authentication-ledger',
        nextPage:
          'newest_features.in_app_notifications.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.in_app_notifications.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/social-signin',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container::v-deep
  .feature-content
    .cards-wrapper-in-app
      gap: 56px
      .in-app-cards
        margin-bottom: 0px
      .feature-four-cards-center
        img
          width: 54px !important
      .prefrence-card
        max-width: 1060px
        width: 100%
        border-radius: 24px
        box-shadow: 0 1px 4px 0 rgb(0 0 0 / 25%)
        height: 146px
        align-items: center
        padding: 30px 50px
        gap: 20px
        background-color: $color-white-1
        .feature-title
          font-size: 24px !important
          font-weight: 700
          letter-spacing: -0.02em
          line-height: 29px
          font-weight: 600
          color: $color-black-5
        .desc
          font-size: 18px !important


@media (max-width: 768px)
  .features-container::v-deep
    .feature-content
      .cards-wrapper-in-app
        gap: 27px
        padding: 0px 16px 34px 16px
        .prefrence-card
          border-radius: 8px !important
          padding: 20px 25px
          gap: 16px
          .feature-title
            font-size: 16px !important
          .desc
            font-size: 12px !important
            font-weight: 400
            line-height: 22px
@media screen and (max-width: 577px)
  .features-container
    .feature-title-my
      margin-top: 48px !important
      margin-bottom: 24px !important
</style>
