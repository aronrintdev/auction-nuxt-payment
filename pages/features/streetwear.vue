<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.streetwear.title')"
      :description="$t('features.streetwear.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/streetwear/streetwear-drops.svg`)"
        :heading="$t('features.streetwear.exclusive_streetwear_drops')"
        :description="$t('features.streetwear.exclusive_streetwear_drops_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/streetwear/globe-cart.svg`)"
        :heading="$t('features.streetwear.access_to_streetwear')"
        :description="$t('features.streetwear.access_to_streetwear_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/streetwear/unavailable-items.svg`)
        "
        :heading="$t('features.streetwear.streetwear_not_available')"
        :description="$t('features.streetwear.streetwear_not_available_desc')"
        class="feature-item"
      />

      <h3 class="title text-uppercase">
        {{ $t('features.streetwear.new_products') }}
      </h3>

      <div
        class="d-flex align-items-center justify-content-between position-relative options-section"
      >
        <div class="card-wrapper mt-0 pt-0">
          <FeatureCardHoverable
            :icon="require('~/assets/img/features/streetwear/cloth.svg')"
            :title="$t('common.apparel')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverable
            :icon="require('~/assets/img/features/streetwear/hat.svg')"
            :title="$tc('common.hat', 2)"
            variant="round"
          />
        </div>

        <div class="card-wrapper mb-0 pb-0">
          <FeatureCardHoverable
            :icon="require('~/assets/img/features/streetwear/watch.svg')"
            :title="$tc('common.accessory', 2)"
            variant="round"
          />
        </div>

        <div class="mid-line position-absolute"></div>
      </div>

      <h3 class="title title-shop text-uppercase">
        {{ $t('common.shop') }}
      </h3>

      <div class="d-flex align-items-center shop-section">
        <img
          :src="require('~/assets/img/icons/shopping-cart.svg')"
          class="cart-img"
        />

        <div class="flex-grow-1">
          <!-- todo: add text below -->
          <div>
            {{ $t('features.streetwear.shop_desc') }}
          </div>

          <Button to="/shop" variant="info" pill class="flex-shrink-0">{{
            $t('vendor_purchase.browse')
          }}</Button>
        </div>
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

    .feature-item
      margin-bottom: 115px

    .shop-section
      img.cart-img
        margin-right: 86px

      > div
        @include body-3-regular
        line-height: 29px
        padding: 0 80px 0 0
        color: $color-black-1

      button
        width: 190px
        margin-top: 20px

    .options-section
      .mid-line
        width: 100%
        border-bottom: 1px solid $color-black-1

      .card-wrapper
        z-index: 1
        background-color: $color-white-1
        padding: 0 20px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 80px 40px

      .shop-section
        > div
          padding: 0

@media (max-width: 1000px)
  .features-container
    .content
      .options-section
        flex-direction: column

        .mid-line
          height: 100%
          border-bottom: none
          border-left: 1px solid $color-black-1
          width: auto

        .card-wrapper
          padding: 20px 0
          margin: 20px 0

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
        flex-direction: column
        align-items: center

        img.cart-img
          margin: 0 0 20px 0

        > div
          margin-top: 20px
          text-align: center

        button
          margin-top: 20px
</style>
