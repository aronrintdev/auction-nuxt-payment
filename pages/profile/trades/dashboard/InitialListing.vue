<template>
  <div v-if="width <=500">
    <div class="initial-listing">
      <div class="justify-content-center listing-heading pt-4 ml-3">{{$t('trades.initial_listing')}}</div>
      <b-row class="justify-content-center mt-3">
        <offer-items v-if="initialWantsItems && initialWantsItems.length > 0" :offerItems="initialWantsItems" :heading="$t('trades.your_listed_items')"/>
      </b-row>
    </div>
  </div>
  <div v-else>
    <div class="initial-listing-web">
      <b-row class="justify-content-center listing-heading pt-4">{{$t('trades.initial_listing')}}</b-row>
      <b-row class="justify-content-center mt-3">
        <offer-items v-if="initialWantsItems && initialWantsItems.length > 0" :offerItems="initialWantsItems" :heading="$t('trades.your_listed_items')"/>
      </b-row>
    </div>
  </div>

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
  },
  data() {
    return {
      width:'',
    }
  },
  mounted() {
    this.width = window.innerWidth
  },

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

.initial-listing
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  height: 323px
  width: 350px
.initial-listing-web
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  height: 356px
  width: 685px
.listing-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-bold
  color: $color-blue-20
</style>
