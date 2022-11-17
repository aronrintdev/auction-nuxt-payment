<template>
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
      :shopNowDescription="shopNowBanner.shopNowDescription"
      :shopNowButtonText="shopNowBanner.shopNowButtonText"
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
        {{ $t('features.buying.purchase_methods') }}
      </FeatureTitle>
      <b-row class="cards-wrapper">
        <b-col
          md="4"
          class="d-flex justify-content-md-start col-6 offset-3 offset-md-0"
          ><FeatureCardHoverable
            :icon="
              require('~/assets/img/features/newest-feature/buying/money-going.svg')
            "
            :title="$t('products.buy_now')"
            :description="$t('features.buying.buy_now_desc')"
            class="pt-5 first-img"
        /></b-col>
        <b-col md="4" cols="6" class="d-flex justify-content-md-center"
          ><FeatureCardHoverable
            :icon="
              require('~/assets/img/features/newest-feature/buying/shopping-cart-icon.svg')
            "
            :title="$t('features.buying.add_to_bag')"
            :description="$t('features.buying.add_to_bag_desc')"
        /></b-col>
        <b-col md="4" cols="6" class="d-flex justify-content-md-end"
          ><FeatureCardHoverable
            :icon="
              require('~/assets/img/features/newest-feature/buying/bxs_offer.svg')
            "
            :title="$t('features.buying.make_an_offer')"
            :description="$t('features.buying.make_an_offer_desc')"
        /></b-col>
      </b-row>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureCardHoverable from '~/components/feature/CardHoverable'
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import FeatureTitle from '~/components/feature/Title'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'

export default {
  components: {
    FeatureCardHoverable,
    FeatureContentWrapper,
    FeatureTitle,
    HorizontalBenefitBox,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.buying.feature_banner_title',
        description: 'newest_features.buying.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/buying/feature-banner-updated.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/buying/feature-banner-updated-sm.svg'),
      },
      shopNowBanner: {
        shopNowDescription: 'newest_features.buying.shop_now_banner.desc',
        shopNowButtonText: 'newest_features.buying.shop_now_banner.button_text',
        nextPage: 'newest_features.selling_on_deadstock.title',
        nextPageLink: '/features/selling-on-deadstock',
      },
      options: [
        {
          id: 'affirm',
          icon: require('~/assets/img/icons/affirm-black.svg'),
        },
        {
          id: 'afterpay',
          icon: require('~/assets/img/icons/afterpay.svg'),
        },
      ],
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/buying/auth.png'),
          benefitTitle: 'newest_features.buying.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/buying/blockchainauth.png'),
          benefitTitle: 'newest_features.buying.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/buying/customerser.png'),
          benefitTitle: 'newest_features.buying.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.third_benefit_desc',
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .feature-content
    padding: 46px 111px
    max-width: 1440px
    .cards-wrapper
      margin-bottom: 100px !important

    h3.title, .benefit-title
      @include heading-7
      color: $color-black-5
      text-transform: uppercase
      margin: 68px 0px
    .benefit-title
      margin: 9px 0px 38px 0px !important

      &.title-shop
        margin: 137px 0 49px 0
    .vertical-cards
      gap: 48px


@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 768px)
  .features-container
    .feature-content
      .cards-wrapper::v-deep
        margin-bottom: 50px !important
        padding: 0px 16px
        .feature-card-hoverable
          margin-bottom: 24px
          .first-img
            img
              width: 88px !important
              height: 33px
      .benefit-title, .title
        font-size: 16px !important
        font-weight: 600 !important
        font-size: 16px !important
        margin: 0px 0px 20px 0px !important
      .title
        margin: 40px 0px 24px 0px !important

      .feature-item::v-deep
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
      .vertical-cards
        gap: 40px
</style>
