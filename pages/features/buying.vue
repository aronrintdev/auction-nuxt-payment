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
        {{ $t('features.buying.purchase_methods') }}
      </FeatureTitle>
      <b-row class="cards-wrapper buying-bottom-cards">
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
            class="add-to-bag"
        /></b-col>
        <b-col md="4" cols="6" class="d-flex justify-content-md-end"
          ><FeatureCardHoverable
            :icon="
              require('~/assets/img/features/newest-feature/buying/bxs_offer.png')
            "
            :title="$t('features.buying.make_an_offer')"
            :description="$t('features.buying.make_an_offer_desc')"
            class="make-an-offer"
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
        backgroundImage: require('@/assets/img/features/newest-feature/buying/buying-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/buying/buying-banner-xs.png'),
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
          benefitImageXS: require('@/assets/img/features/newest-feature/buying/auth-xs.png'),
          benefitTitle: 'newest_features.buying.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/buying/customerser.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/buying/customerser-xs.png'),
          benefitTitle: 'newest_features.buying.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.third_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/buying/blockchainauth.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/buying/blockchainauth-xs.png'),
          benefitTitle: 'newest_features.buying.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.buying.benefits.second_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/buying/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/buying/bottom-banner-xs.png'),
        bottomBannerDescription: 'newest_features.buying.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.buying.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/shop',
        bottomBannerButtonText:
          'newest_features.buying.bottom_banner.button_text',
        previousPage:
          'newest_features.buying.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.buying.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/shareable-wishlists-and-watchlists',
        nextPage: 'newest_features.buying.bottom_banner.next_page_title',
        nextPageXS: 'newest_features.buying.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/selling-on-deadstock',
      },
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
      margin: 80px 0px 75px 0
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
          margin-bottom: 24px !important
        .first-img
          img
            width: 88px !important
            height: 33px
            margin-right: 25px
        .make-an-offer
          img
            width: 50px !important
            height: 50px
      .benefit-title, .title
        font-size: 16px !important
        font-weight: 600 !important
        font-size: 16px !important
      // .title
      //   margin: 40px 0px 24px 0px !important

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

@media screen and (max-width: 577px)
  .features-container
    .feature-content
      .feature-title-my
        width: 100%
</style>
