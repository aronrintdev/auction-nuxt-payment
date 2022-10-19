<template>
  <FeatureContentWrapper
    :title="$t('features.blockchain_authentication_ledger.title')"
    :description="$t('features.blockchain_authentication_ledger.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <FeatureTitle class="mb-6">{{ $t('footer.process') }}</FeatureTitle>

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
<FeatureTitle class="mb-6">{{ $t('features.streetwear.new_products') }}</FeatureTitle>
      <div
        class="d-flex align-items-center justify-content-between position-relative options-section mb-5"
      >
        <div class="card-wrapper ">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/cloth.svg')"
            :title="$t('common.apparel')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/hat.svg')"
            :title="$tc('common.hat', 2)"
            variant="round"
          />
        </div>

        <div class="card-wrapper ">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/watch.svg')"
            :title="$tc('common.accessory', 2)"
            variant="round"
          />
        </div>

        <div class="mid-line position-absolute"></div>
      </div>
     
    </div>
<div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :previousPageLink="'/features/selling'"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/auctions'"
      />
    </div>
  </FeatureContentWrapper>
</template>
<script>


import { FeatureBenefits, FeatureContentWrapper } from '~/components/feature'
import ShopNowBanner from '~/components/feature/ShopNowBanner'


export default {
  components: {
    FeatureContentWrapper,
    FeatureBenefits,
    ShopNowBanner
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
  .feature-content

    .feature-item
      margin-bottom: 115px

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
    .feature-content
      .options-section
        .mid-line
          width: 100%
          border-bottom: 1px solid $color-black-1
@media (max-width: 1000px)
  .features-container
    .feature-content

        .card-wrapper
          padding: 20px 0
          margin: 20px 0

@media (max-width: 768px)
  .features-container
    .feature-content
      .feature-item::v-deep
        flex-direction: column
        align-items: center
        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
      .options-section
        .card-wrapper
          padding: 0 10px
</style>
