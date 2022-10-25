<template>
  <b-container
    fluid
    class="container-profile-create-listing h-100"
    :class="isScreenXS ? 'p-4' : 'p-5'"
  >
    <div v-if="modifyData">
      <ModifyListing
        v-model="form"
        :action="`edit`"
        :listingId="modifyData.id"
        :product="modifyData.inventory.product"
        @success="editListing"
      />
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ModifyListing from '~/components/profile/vendor-selling/ModifyListing.vue'
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'Modify',

  components: {
    ModifyListing,
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      form: {
        currentSize: this.getCurrentSize,
        quantity: 1, // by default
        price: null,
        boxCondition: null,
        minOfferAmount: null,
      },
    }
  },

  computed: {
    ...mapGetters({
      modifyData: 'sell-listing/getListingData',
    }),
    // Get the selected size
    getCurrentSize: (vm) => {
      return vm.modifyData?.inventory?.size_id
    },
    // Get the selected quantity
    getQuantity: (vm) => {
      return vm.modifyData?.quantity
    },
    // Get the selected price
    getPrice: (vm) => {
      return vm.modifyData?.inventory?.sale_price
    },
    // Get the selected boxcondition
    getBoxCondition: (vm) => {
      return vm.modifyData?.inventory?.packaging_condition?.id
    },
    // Get the selected minimum offer amount
    getMinimumOfferAmount: (vm) => {
      return vm.modifyData?.min_bid_price
    },
  },

  created() {
    // Set the datas on load
    this.form.currentSize = this.getCurrentSize
    this.form.quantity = this.getQuantity
    this.form.price = this.$options.filters.formatPrice(this.getPrice)
    this.form.boxCondition = this.getBoxCondition
    this.form.minOfferAmount = this.$options.filters.formatPrice(
      this.getMinimumOfferAmount
    )
  },

  methods: {
    // Do the edit listing.
    editListing() {
      const item = {
        sizeId: Number(this.form.currentSize),
        quantity: Number(this.form.quantity),
        price: Number(this.form.price) * 100,
        packagingConditionId: Number(this.form.boxCondition),
        minOfferAmount: Number(this.form.minOfferAmount) * 100,
      }
      this.$axios
        .put(`selling-items/details/${this.$route.query.id}`, item)
        .then((res) => {
          if (res.data.success) {
            this.$bvModal.hide('modify-listing-confirm')
            this.$router.push(
              `/profile/vendor-selling/details/${this.$route.query.id}`
            )
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Modify Listing error', err.response)
        })
    },
  },
}
</script>