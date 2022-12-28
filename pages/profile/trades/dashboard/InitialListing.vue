<template>
  <div v-if="isScreenXS">
    <div class="initial-listing">
      <div class="justify-content-center listing-heading pt-4">
        {{ $t('trades.initial_listing') }}
      </div>
      <div class="d-flex justify-content-center mt-3">
        <offer-items
          v-if="initialWantsItems && initialWantsItems.length > 0"
          :offerItems="initialWantsItems"
          :heading="$t('trades.your_listed_items')"
          class="w-100"
          :mobileItem="OFFER_SUMMARY_INITIAL_LISTING"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="initial-listing mx-auto col-12 col-lg-10 col-xl-7">
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
          :isOfferSummary="true"
          class="w-100"
        />
      </div>
    </div>
  </div>

</template>

<script>
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems';
import ScreenSize from '~/plugins/mixins/screenSize'
import { OFFER_SUMMARY_INITIAL_LISTING } from '~/static/constants/trades'
export default {
  name: 'InitialListing',
  components: {
    OfferItems
  },
  mixins: [ScreenSize],
  props:{
    initialWantsItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      width: '',
      OFFER_SUMMARY_INITIAL_LISTING,
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
  padding: 0 25px 15px 25px
  @media (min-width: 576px)
    padding: 30px 49px

</style>
