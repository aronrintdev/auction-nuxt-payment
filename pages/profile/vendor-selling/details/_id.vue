<template>
  <b-container fluid class="container-profile-selling h-100">
    <div class="selling-listing">
      <b-row class="mt-md-4 mt-2 vd-selling">
        <b-col cols="12" class="vd-selling-details-heading">
          {{ $t('selling_page.selling_page_heading') }}
          <Button
            to="/profile/vendor-selling"
            variant="link"
            class="btn-back float-right"
          >
            <img
              :src="require('~/assets/img/icons/arrow-back.svg')"
              :alt="$t('common.back')"
              class="mr-2"
            />
            {{ $t('vendor_purchase.back_to_selling') }}
          </Button>
        </b-col>
      </b-row>
      <!-- Purchase Summary Section -->
      <template v-if="loaded">
        <SellingDetailsPurchaseSummary
          :details="details"
          class="purchase-summary"
          :listingId="listingId"
          @reloadData="reloadData"
        />
      </template>
      <!-- ./Purchase Summary Section -->

      <!-- Offers Section -->
      <template v-if="loaded">
        <SellingOffers
          :offers="getOffers"
          class="offer-details"
          :status="details.status"
          :highestOffer="highestOffer"
          @reloadData="reloadData"
        />
      </template>
      <!-- Offers Section -->
    </div>
    <!-- Mobile Screen -->

    <SellingDetails
      class="offer-responsive"
      :details="details"
      @reloadData="loadData"
    />
    <!-- ./Mobile Screen -->
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import SellingDetailsPurchaseSummary from '~/components/profile/vendor-selling/details/PurchaseSummary.vue'
import SellingOffers from '~/components/profile/vendor-selling/details/Offers.vue'
import { Button } from '~/components/common'
import SellingDetails from '~/components/profile/vendor-selling/SellingDetails.vue'
export default {
  name: 'VendorSellingDetails',

  components: {
    SellingDetailsPurchaseSummary,
    SellingOffers,
    Button,
    SellingDetails,
  },

  layout: 'Profile',

  data() {
    return {
      details: {},
      loaded: false,
      listingId: null,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getOffers: (vm) => {
      if (vm.details) {
        return vm.details.offers
      }
    },

    highestOffer: (vm) => {
      if (vm.details && vm.details.highest_offer) {
        return vm.details.highest_offer
      }
    },
  },

  created() {
    this.listingId = Number(this.$route.params.id)
    this.loadData()
  },

  methods: {
    ...mapActions({
      addListingData: 'sell-listing/addListingData',
    }),
    // Load the data
    loadData() {
      this.$axios
        .get(`/selling-items/details/${this.$route.params.id}`)
        .then((res) => {
          this.details = res.data.data
          this.loaded = true
          // Save the selected data.
          this.addListingData({ data: this.details })
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.message))
          this.$logger.logToServer('Vendor selling', err.response.data)
          this.$router.push('/profile/vendor-selling')
        })
    },

    // Reload data
    reloadData() {
      this.loadData()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

@media (min-width: 576px)
  .selling-listing
    display: block
  .container-fluid-selling
    padding: 3rem
  .offer-responsive
    display: none
  .container-profile-selling
    padding: 3rem
@media (max-width: 576px)
  .selling-listing
    display: none
  .container-profile-selling
    background: $color-white-1
</style>
