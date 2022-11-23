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
        {{ $t('newest_features.damaged_packaging.conditions') }}
      </FeatureTitle>
      <div
        class="d-flex justify-content-center cards-wrapper-damaged mb-3 mb-md-5 flex-column flex-md-row"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/damaged-packaging/bi_bag.svg')
          "
          :title="$t('newest_features.damaged_packaging.cards.title1')"
          :description="$t('newest_features.damaged_packaging.cards.desc1')"
        >
        </FeatureCardHoverable>

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/damaged-packaging/box.svg')
          "
          :title="$t('newest_features.damaged_packaging.cards.title2')"
          :description="$t('newest_features.damaged_packaging.cards.desc2')"
        >
        </FeatureCardHoverable>
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
        backgroundImage: require('@/assets/img/features/newest-feature/damaged-packaging/damaged-packaging-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/damaged-packaging/damaged-packaging-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-packaging/insights.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/damaged-packaging/insights-xs.png'),
          benefitTitle:
            'newest_features.damaged_packaging.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.damaged_packaging.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-packaging/access-to-more.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/damaged-packaging/access-to-more-xs.png'),
          benefitTitle:
            'newest_features.damaged_packaging.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.damaged_packaging.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-packaging/info-on-apparel.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/damaged-packaging/info-on-apparel-xs.png'),
          benefitTitle:
            'newest_features.damaged_packaging.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.damaged_packaging.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/damaged-packaging/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/damaged-packaging/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.damaged_packaging.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.damaged_packaging.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.damaged_packaging.bottom_banner.button_text',
        // previousPage:
        //   'newest_features.damaged_packaging.bottom_banner.previous_page_title',
        // previousPageXS:
        //   'newest_features.damaged_packaging.bottom_banner.previous_page_xs_title',
        // previousPageLink: '/features/international-languages',
        nextPage:
          'newest_features.damaged_packaging.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.damaged_packaging.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/2fa-security',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container::v-deep
    .feature-content
        .cards-wrapper-damaged
            gap: 128px !important
            margin-bottom: 100px!important
            counter-reset: css-counter 0
            .feature-card-hoverable
                width: 450px !important
                justify-content: center !important
                align-items: center !important
                padding: 40px 64px !important
                gap: 35px
                .packaging-damaged
                    gap: 24px !important
                .feature-description
                    margin: 0px
                    font-size: 22px
                    font-weight: 400
            > div

                min-height: 168px
                height: auto !important
                .feature-title
                    margin: 0px

                ul
                    list-style-image: url('~/assets/img/features/newest-feature/damaged-packaging/arrowsmall.svg')
                    padding-inline-start: 25px
                    gap: 24px


@media (max-width: 768px)
    .features-container::v-deep
        .feature-content
            .cards-wrapper-damaged
                gap: 26px !important
                margin-bottom: 50px !important
                padding: 40px 16px 0px 16px
                .feature-card-hoverable
                  width: 100% !important
                  padding: 27px 36px !important
                  .packaging-damaged
                    gap: 16px !important
                  .feature-description
                    font-size: 16px
                  .feature-title
                    font-size: 18px
                    img
                      width: 73px !important
                      height: 73px
                .feature-item::v-deep
                    flex-direction: column
                    align-items: center

@media screen and (max-width: 577px)
  .features-container::v-deep
    .feature-content
      .feature-title-my
        margin-top: 48px !important
        margin-bottom: 24px !important
</style>
