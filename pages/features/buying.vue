<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.buying.title')"
      :description="$t('features.buying.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2 d-md-inline-flex d-none" />

      <h3 class="benefit-title text-center text-md-left font-primary">
        {{ $tc('common.benefit', 2) }}
      </h3>
      <div class="vertical-cards d-flex flex-column">
        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/buying/auth.png`)
          "
          :heading="$t('features.buying.certified_authentic_products')"
          :description="$t('features.buying.certified_authentic_products_desc')"
          class="feature-item"
        />

        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/buying/blockchainauth.png`)
          "
          :heading="$t('features.buying.live_customer_service')"
          :description="$t('features.buying.live_customer_service_desc')"
          class="feature-item"
        />

        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/buying/customerser.png`)
          "
          :heading="$t('features.buying.blockchain_backed_photo')"
          :description="$t('features.buying.blockchain_backed_photo_desc')"
          class="feature-item"
        />
      </div>
      <h3 class="title text-center text-lg-left font-primary">
        {{ $t('features.buying.purchase_methods') }}
      </h3>
      <b-row class="cards-wrapper">
        <b-col
          md="4"
          class="d-flex justify-content-md-start col-6 offset-3 offset-md-0"
          ><FeatureCardHoverable
            :icon="require('~/assets/img/features/buying/buy-now.svg')"
            :title="$t('products.buy_now')"
            :description="$t('features.buying.buy_now_desc')"
            class="pt-5 first-img"
        /></b-col>
        <b-col md="4" cols="6" class="d-flex justify-content-md-center"
          ><FeatureCardHoverable
            :icon="
              require('~/assets/img/features/buying/shopping-cart-icon.svg')
            "
            :title="$t('features.buying.add_to_bag')"
            :description="$t('features.buying.add_to_bag_desc')"
        /></b-col>
        <b-col md="4" cols="6" class="d-flex justify-content-md-end"
          ><FeatureCardHoverable
            :icon="require('~/assets/img/features/buying/offer.svg')"
            :title="$t('features.buying.make_an_offer')"
            :description="$t('features.buying.make_an_offer_desc')"
        /></b-col>
      </b-row>
    </div>
    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :previousPageLink="'/features/selling'"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/buying'"
      />
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBenefitItem from '~/components/feature/BenefitItem'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureCardHoverable from '~/components/feature/CardHoverable'
import ShopNowBanner from '~/components/feature/ShopNowBanner'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    ShopNowBanner,
    FeatureBackButton,
    FeatureCardHoverable,
  },

  layout: 'IndexLayout',

  data() {
    return {
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
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .content
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
    .content
      padding: 37px 15px

      .cards-wrapper::v-deep
        margin-bottom: 50px !important
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
