<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.buying.title')"
      :description="$t('features.buying.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/buying/certified-authentic.svg`)"
        :heading="$t('features.buying.certified_authentic_products')"
        :description="$t('features.buying.certified_authentic_products_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/buying/live-service.svg`)"
        :heading="$t('features.buying.live_customer_service')"
        :description="$t('features.buying.live_customer_service_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/buying/blockchain-backed.svg`)"
        :heading="$t('features.buying.blockchain_backed_photo')"
        :description="$t('features.buying.blockchain_backed_photo_desc')"
        class="feature-item"
      />

      <h3 class="title">{{ $t('features.buying.purchase_methods') }}</h3>

      <div class="d-flex cards-wrapper">
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/buying/buy-now.svg')"
          :title="$t('products.buy_now')"
          :description="$t('features.buying.buy_now_desc')"
          class="pt-5"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/buying/bag.svg')"
          :title="$t('features.buying.add_to_bag')"
          :description="$t('features.buying.add_to_bag_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/buying/offer.svg')"
          :title="$t('features.buying.make_an_offer')"
          :description="$t('features.buying.make_an_offer_desc')"
        />
      </div>

      <h3 class="title title-shop">{{ $t('common.shop') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1">
          <img
            :src="require('~/assets/img/icons/shopping-cart.svg')"
            class="cart-img"
          />
          <div class="flex-grow-1">
            {{ $t('features.buying.shop_desc') }}
            <nuxt-link to="/features/payment-plans">{{
              $t('home.payment_plans').toLowerCase()
            }}</nuxt-link>
            {{ $t('common.and') }}
            <!-- todo: add link to crypto payments feature page after its done -->
            <nuxt-link to="#">{{
              $t('success.crypto').toLowerCase()
            }}</nuxt-link>
          </div>
        </div>
        <Button to="/shop" variant="info" pill class="flex-shrink-0">{{
          $t('vendor_purchase.browse')
        }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from '~/components/common'
import FeatureBanner from '~/components/feature/Banner'
import FeatureBenefitItem from '~/components/feature/BenefitItem'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureCardHoverable from '~/components/feature/CardHoverable'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    Button,
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
    padding: 80px 200px
    max-width: 1440px

    h3.title
      @include heading-7
      color: $color-black-5
      text-transform: uppercase
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px

    .shop-section
      > div
        @include body-3-regular
        line-height: 29px
        padding: 0 80px 0 0
        color: $color-black-1

        > div
          min-width: 200px

          a
            color: $color-black-1
            text-decoration: underline

        img.cart-img
          margin-right: 86px

      button
        width: 190px

@media (max-width: 1200px)
  .features-container
    .content
      .shop-section
        flex-direction: column
        align-items: center

        > div
          align-items: center
          padding: 0

        button
          margin-top: 20px

      .cards-wrapper
        flex-direction: column
        align-items: center

        > div:not(:last-child)
          margin: 0 0 40px 0

@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 576px)
  .features-container
    .content
      padding: 40px 30px

      .feature-item::v-deep
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center

      .shop-section
        > div
          flex-direction: column
          align-items: center
          padding: 0

          img.cart-img
            margin: 0 0 20px 0

          > div
            text-align: center
</style>
