<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.heat_check.title')"
      :description="$t('features.heat_check.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/heat-check/take-photos.svg`)"
        :heading="$t('features.heat_check.upload_photos')"
        :description="$t('features.heat_check.upload_photos_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/heat-check/confidence-authentic.svg`)
        "
        :heading="$t('features.heat_check.have_confidence')"
        :description="$t('features.heat_check.have_confidence_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/heat-check/certification.svg`)"
        :heading="$t('features.heat_check.access_to_certification')"
        :description="$t('features.heat_check.access_to_certification_desc')"
        class="feature-item"
      />

      <h3 class="title">{{ $t('footer.process') }}</h3>

      <div class="d-flex cards-wrapper">
        <FeatureStepCard
          :icon="require('~/assets/img/features/heat-check/search.svg')"
          :title="$t('features.heat_check.enter_sku')"
          :description="$t('features.heat_check.enter_sku_desc')"
          step="1"
        />

        <FeatureStepCard
          :icon="require('~/assets/img/features/heat-check/upload.svg')"
          :title="$t('features.heat_check.take_photos')"
          :description="$t('features.heat_check.take_photos_desc')"
          step="2"
        />
      </div>

      <div class="d-flex cards-wrapper">
        <FeatureStepCard
          :icon="require('~/assets/img/features/heat-check/quick-results.svg')"
          :title="$t('features.heat_check.quick_results')"
          :description="$t('features.heat_check.quick_results_desc')"
          step="3"
        />
        <FeatureStepCard
          :icon="require('~/assets/img/features/heat-check/computer-lines.svg')"
          :title="$t('features.heat_check.share_results')"
          :description="$t('features.heat_check.share_results_desc')"
          step="4"
        />
      </div>

      <h3 class="title title-shop">{{ $t('features.heat_check.title') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1 align-items-center">
          <img
            :src="require('~/assets/img/features/heat-check/heat-check.svg')"
            class="cart-img"
          />

          <div class="flex-grow-1">
            {{ $t('features.heat_check.heatcheck_desc') }}
          </div>
        </div>

        <!-- todo: add heat check url -->
        <Button to="#" variant="info" pill class="flex-shrink-0">{{
          $t('features.heat_check.title')
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
import FeatureStepCard from '~/components/feature/StepCard'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    Button,
    FeatureBackButton,
    FeatureStepCard,
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

    .feature-item::v-deep
      margin-bottom: 115px

      .img-wrapper
        min-width: 217px

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

    .cards-wrapper
      > div
        margin: 18px 9px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 900px)
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

      .cards-wrapper::v-deep
        > div
          flex: none
          width: 100%
          flex-direction: column

          div
            text-align: center
</style>
