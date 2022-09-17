<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.crypto_payments.title')"
      :description="$t('features.crypto_payments.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/crypto-payments/secure-transaction.svg`)
        "
        :heading="$t('features.crypto_payments.secure_transactions')"
        :description="$t('features.crypto_payments.secure_transactions_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/crypto-payments/international-buying.svg`)
        "
        :heading="$t('features.crypto_payments.international_buying')"
        :description="$t('features.crypto_payments.international_buying_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/crypto-payments/transactional-freedom.svg`)
        "
        :heading="$t('features.crypto_payments.transactional_freedom')"
        :description="$t('features.crypto_payments.transactional_freedom_desc')"
        class="feature-item"
      />

      <h3 class="title text-uppercase">{{ $t('products.we_accept') }}</h3>

      <div
        class="d-flex align-items-baseline justify-content-around flex-wrap payment-options"
      >
        <div class="d-flex flex-column align-items-center">
          <img
            :src="require('~/assets/img/features/crypto-payments/bitcoin.svg')"
          />
          <div>{{ $t('shopping_cart.bitcoin') }}</div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img
            :src="require('~/assets/img/features/crypto-payments/etherium.svg')"
          />
          <div>{{ $t('shopping_cart.ethereum') }}</div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img
            :src="require('~/assets/img/features/crypto-payments/binance.svg')"
          />
          <div>{{ $t('features.crypto_payments.binance') }}</div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <img
            :src="require('~/assets/img/features/crypto-payments/vechain.svg')"
          />
          <div>{{ $t('shopping_cart.vechain') }}</div>
        </div>
      </div>

      <h3 class="title title-shop text-uppercase">{{ $t('common.shop') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1">
          <img
            :src="require('~/assets/img/icons/shopping-cart.svg')"
            class="cart-img"
          />

          <div class="flex-grow-1">
            {{ $t('features.crypto_payments.shop_desc') }}
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

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    Button,
    FeatureBackButton,
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
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item::v-deep
      margin-bottom: 115px

      .img-wrapper
        min-width: 190px

    .payment-options
      @include heading-2
      font-weight: $regular
      text-transform: none

      img
        margin-bottom: 25px

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
      padding: 80px 40px

@media (max-width: 900px)
  .features-container
    .content
      .payment-options
        > div
          width: 50%
          margin-bottom: 20px

      .shop-section
        flex-direction: column
        align-items: center

        > div
          align-items: center
          padding: 0

        button
          margin-top: 20px

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

      .payment-options
        flex-direction: column


        > div
          width: 100%
          margin: 0

          &:not(:last-child)
            margin-bottom: 40px
</style>
