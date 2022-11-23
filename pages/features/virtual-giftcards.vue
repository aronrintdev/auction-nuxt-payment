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
      <FeatureTitle>
        {{ $t('newest_features.virtual_giftcards.options') }}
      </FeatureTitle>
      <div
        class="d-flex justify-content-center cards-wrapper-virtual mb-3 mb-md-5"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/virtual-giftcards/Computer-Icon.svg')
          "
          :description="$t('newest_features.virtual_giftcards.cards.title1')"
          :title2="$t('newest_features.virtual_giftcards.online')"
          step="1. Online"
        />

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/virtual-giftcards/Store-Icon.svg')
          "
          :title2="$t('newest_features.virtual_giftcards.in_store')"
          :description="$t('newest_features.virtual_giftcards.cards.title2')"
          step="2. In Store"
        />
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import FeatureCardHoverable from '~/components/feature/CardHoverable'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureCardHoverable,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/virtual-giftcards/virtual-giftcards-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/virtual-giftcards/virtual-giftcards-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/no-expiration.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/virtual-giftcards/no-expiration-xs.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/never-lose-your-card.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/virtual-giftcards/never-lose-your-card-xs.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/pay-in-partial-increments.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/virtual-giftcards/pay-in-partial-increments-xs.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/virtual-giftcards/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/virtual-giftcards/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.virtual_giftcards.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.virtual_giftcards.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/purchase',
        bottomBannerButtonText:
          'newest_features.virtual_giftcards.bottom_banner.button_text',
        previousPage:
          'newest_features.virtual_giftcards.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.virtual_giftcards.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/rewards-program',
        nextPage:
          'newest_features.virtual_giftcards.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.virtual_giftcards.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/payments-plans',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container::v-deep
  .feature-content
    .cards-wrapper-virtual
      gap: 128px !important
      counter-reset: css-counter 0
      .feature-card-hoverable
        img
          width: 172px !important
          margin-top: 52px
        .feature-description
          margin: 0px !important
        &:nth-child(2) img
          width: 132px !important
      > div
        max-width: 361px
        min-height: 168px
        max-height: 320px


@media (max-width: 768px)
  .features-container::v-deep
    .feature-content
      .cards-wrapper-virtual
        gap: 26px !important
        padding: 0px 16px 26px
      > div
        min-width: 168px !important
        min-height: 164px !important
        .feature-item::v-deep
          flex-direction: column
          align-items: center
        .feature-card-hoverable
          img
            margin-top: 0px !important
</style>
