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
        {{ $t('newest_features.in_app_notifications.methods') }}
      </FeatureTitle>
      <div class="cards-wrapper-in-app d-flex flex-column align-items-center">
        <div class="in-app-cards">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notification/envelope.svg')
            "
            :title="$t('features.rewards_program.buying')"
          />
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notification/mobile.svg')
            "
            :title="$t('features.rewards_program.buying')"
          />
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/in-app-notification/sms.svg')
            "
            :title="$t('features.rewards_program.buying')"
          />
        </div>
        <div class="prefrence-card d-flex flex-column align-items-baseline">
          <div class="title-icon d-flex gap-2 align-items-center">
            <div class="title feature-title">Prefrences</div>
            <img
              src="~/assets/img/features/newest-feature/in-app-notification/prefrences.svg"
              alt=""
            />
          </div>
          <div class="desc">
            Change your preferences for all types of notifications within the
            Deadstock App to suit you.
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
        title: 'newest_features.in_app_notifications.feature_banner_title',
        description: 'newest_features.in_app_notifications.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/get-notified.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-updates.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-notifications.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.in_app_notifications.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.in_app_notifications.shop_now_banner.button_text',
        previousPage: 'newest_features.blockchain_authentication_ledger.title',
        previousPageLink: '/features/blockchain-authentication-ledger',
        nextPage: 'newest_features.social_signin.title',
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
      padding-bottom: 70px
      .in-app-cards
        gap: 70px
        display: grid
        grid-template-columns: repeat(3,minmax(100px, 306px))
        justify-content: center
        margin-bottom: 70px
        .feature-four-cards
          max-width: 306px
          width: 100% !important
          max-height: 265px !important
          min-width: 100px !important
          min-height: 86px !important
          height: auto !important
          img
            width: 94px
          &:nth-child(2) img
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
        background-color: white

        .feature-title
          font-size: 24px !important
          font-weight: 700
          letter-spacing: -0.02em
          line-height: 29px
          font-weight: 600
          color: #1d1c1d
        .desc
          font-size: 18px !important


@media (max-width: 768px)
  .features-container::v-deep
    .feature-content
      .cards-wrapper-in-app
        padding: 40px 16px
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
        .in-app-cards
          gap: 22px
          margin-bottom: 22px
        .feature-four-cards
          border-radius: 8px !important
          img
            width: 30px !important
          &:nth-child(2) img
            width: 18px !important
</style>
