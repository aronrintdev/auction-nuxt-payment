<template>
  <b-col class="vendor-preferences-body">
    <!-- Heading -->
    <div class="vd-preferences-slider">
      <h1 id="redeem-heading" class="vd-preferences-slider-heading">
        {{ $t('redeem_giftcard.title') }}
      </h1>
    </div>
    <!-- ./Heading -->
    
    <!-- Content -->
    <b-container fluid class="card-details">
      <RedeemGiftCard />
    </b-container>
    <!-- ./Content -->
  </b-col>
</template>


<script>
import RedeemGiftCard from '~/components/profile/preferences/Redeem/RedeemGiftCardComponent.vue'
export default {
  name: 'RedeemGiftCardPage',

  components: {
    RedeemGiftCard
  },

  layout: 'Profile',

  middleware: 'auth'
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
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