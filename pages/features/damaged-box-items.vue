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
        {{ $t('newest_features.damaged_box_items.conditions') }}
      </FeatureTitle>
      <div
        class="d-flex justify-content-center cards-wrapper-damaged mb-3 mb-md-5 flex-column flex-md-row"
      >
        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/damaged-box-items/bi_bag.svg')
          "
          :title="$t('newest_features.damaged_box_items.cards.title1')"
          :description="$t('newest_features.damaged_box_items.cards.desc1')"
        >
        </FeatureCardHoverable>

        <FeatureCardHoverable
          :icon="
            require('~/assets/img/features/newest-feature/damaged-box-items/box.svg')
          "
          :title="$t('newest_features.damaged_box_items.cards.title2')"
          :description="$t('newest_features.damaged_box_items.cards.desc2')"
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
        title: 'newest_features.damaged_box_items.feature_banner_title',
        description: 'newest_features.damaged_box_items.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/damaged-box-items/damaged-box-items-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/damaged-box-items/damaged-box-items-banner-sm.svg'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/insights.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/access-to-more.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/info-on-apparel.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.damaged_box_items.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.damaged_box_items.shop_now_banner.button_text',
        previousPage: 'newest_features.promotions.title',
        previousPageLink: '/features/promotions',
        nextPage: 'newest_features.2fa_security.title',
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
                    list-style-image: url('~/assets/img/features/newest-feature/damaged-box-items/arrowsmall.svg')
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
</style>
