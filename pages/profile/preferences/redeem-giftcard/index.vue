<template>
  <b-col class="vendor-preferences-body"
    :class="[isScreenXS && 'custom-padding d-flex justify-content-center']"
  >
    <!-- Heading -->
    <div v-if="!isScreenXS" class="vd-preferences-slider">
      <h1 id="redeem-heading" class="vd-preferences-slider-heading">
        {{ $t('redeem_giftcard.title') }}
      </h1>
    </div>
    <!-- ./Heading -->
    
    <!-- Content -->
    <b-container v-if="!isScreenXS" fluid class="card-details">
      <RedeemGiftCard />
    </b-container>

    <responsive-redeem-gift-card />
    <!-- ./Content -->
  </b-col>
</template>


<script>
import RedeemGiftCard from '~/components/profile/preferences/Redeem/RedeemGiftCardComponent.vue'
import screenSize from '~/plugins/mixins/screenSize'
import ResponsiveRedeemGiftCard from '~/components/profile/preferences/GiftCard/ResponsiveRedeemGiftCardEmail.vue'
export default {
  name: 'RedeemGiftCardPage',

  components: {
    RedeemGiftCard,
    ResponsiveRedeemGiftCard
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth'
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.vendor-preferences-body
  &.custom-padding
    padding-top: 2%
  .vd-preferences-slider-heading
    font-style: normal
    @include heading-11
    color: $color-black-1
  .card-details
    background: $color-white-1
  @media (max-width: 320px)
    :deep(#redeem-heading)
      left: 1rem
</style>