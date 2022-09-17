<template>
  <b-col class="initial-listing">
    <b-row class="justify-content-center listing-heading pt-4">{{$t('trades.initial_listing')}}</b-row>
    <b-row class="justify-content-center mt-3">
      <offer-items v-if="initialWantsItems && initialWantsItems.length > 0" :offerItems="initialWantsItems" :heading="$t('trades.your_listed_items')"/>
    </b-row>
  </b-col>
</template>

<script>
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems';
export default {
  name: 'InitialListing',
  components: {
    OfferItems
  },
  props:{
    initialWantsItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.listing-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-2-bold
  color: $color-blue-1

.initial-listing
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  height: 323px

</style>
