<template>
  <div class="feature-browse-section">
    <FeatureTitle class="mt-6 mb-8">
      {{ title }}
    </FeatureTitle>

    <div
      v-if="variant === 'primary'"
      class="d-flex align-items-center primary-section"
    >
      <div class="d-flex flex-grow-1 align-items-center">
        <img
          :src="icon || require('~/assets/img/icons/shopping-cart.svg')"
          class="cart-img"
        />

        <div class="flex-grow-1">
          <slot />
        </div>
      </div>

      <Button :to="to" variant="info" pill class="flex-shrink-0">
        {{ buttonLabel || $t('vendor_purchase.browse') }}
      </Button>
    </div>

    <div
      v-if="variant === 'secondary'"
      class="d-flex align-items-center secondary-section"
    >
      <img
        :src="icon || require('~/assets/img/icons/shopping-cart.svg')"
        class="cart-img"
      />

      <div class="flex-grow-1">
        <div>
          <slot />
        </div>

        <Button :to="to" variant="info" pill class="flex-shrink-0">
          {{ buttonLabel || $t('vendor_purchase.browse') }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from '~/components/common'
import { FeatureTitle } from '~/components/feature'

export default {
  name: 'FeatureBrowseSection',

  components: { FeatureTitle, Button },

  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: '#',
    },
    buttonLabel: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary', // 'primary', 'secondary'
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-browse-section
  .primary-section
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
      padding: 0

  .secondary-section
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
      padding: 0

@media (max-width: 1200px)
  .feature-browse-section
    .secondary-section
      > div
        padding: 0

@media (max-width: 900px)
  .feature-browse-section
    .primary-section
      flex-direction: column
      align-items: center

      > div
        align-items: center
        padding: 0

      button
        margin-top: 20px

@media (max-width: 576px)
  .feature-browse-section
    .primary-section
      > div
        flex-direction: column
        align-items: center
        padding: 0

        img.cart-img
          margin: 0 0 20px 0

        > div
          text-align: center

    .secondary-section
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
