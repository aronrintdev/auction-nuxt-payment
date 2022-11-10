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
    <div class="initial-listing mx-auto col-12 col-md-8 col-xl-6">
      <div class="d-flex justify-content-between">
        <div class="listing-heading">{{ $t('trades.initial_listing') }}</div>
        <div class="created-at">
          {{ initialWantsItems[0] && initialWantsItems[0].created_at | formatDateTimeString }}
        </div>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <offer-items 
          v-if="initialWantsItems && initialWantsItems.length > 0" 
          :offerItems="initialWantsItems" 
          :heading="$t('trades.your_listed_items')"
          marginItems="mr-0"
        />
      </div>
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
      width: '',
    }
  },
  mounted() {
    this.width = window.innerWidth
  },

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.created-at
  @include body-4-normal
  color: $color-black-1
  font-family: $font-family-sf-pro-display

.listing-heading
  @include body-13-bold
  color: $color-blue-20
  font-family: $font-family-sf-pro-display
  font-style: normal
  @media (min-width: 576px)
    @include body-2-bold

.initial-listing
  background: $color-white-1
  border-radius: 10px
  @media (min-width: 576px)
    padding: 30px 49px

</style>
