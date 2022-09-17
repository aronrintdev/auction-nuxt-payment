<template>
  <!-- Already Listed Modal -->
  <b-modal id="alreadyListed" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>

      <div class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="$bvModal.hide('alreadyListed')">X</span>
        </b-row>
        <div class="width-300  ml-auto mr-auto mt-1">
          <b-row class="justify-content-center">
            {{ $t('trades.create_listing.vendor.wants.this_product') }}
          </b-row>
          <b-row class="justify-content-center listing-id">
            {{ $t('trades.create_listing.vendor.wants.listing_id') }}: #{{listingId}}
          </b-row>
          <b-row class="justify-content-center">
            {{ $t('trades.create_listing.vendor.wants.is_already_listed') }}
          </b-row>
        </div>

        <div class="mb-4 mt-3">
          {{ $t('trades.create_listing.vendor.wants.by_adding_listing_will_be_down') }}
        </div>

        <div>{{ $t('trades.create_listing.vendor.wants.would_you_add_to_trade') }}</div>
        <b-row class="justify-content-center mb-4 mt-4">
          <b-btn class="continue-btn mr-4" @click="addToTradeConfirmation">{{ $t('trades.create_listing.vendor.wants.continue') }}</b-btn>
          <b-btn class="cancel-btn" @click="$bvModal.hide('alreadyListed')">{{ $t('trades.create_listing.vendor.wants.cancel') }}</b-btn>
        </b-row>
      </div>
    </b-modal><!-- End of Already Listed Modal -->
</template>

<script>
export default {
  name: 'AlreadyListedModal',
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true
    },
    listingId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    /**
     * This function is used to add item
     * into new listing from previous listing
     * and hide the modal
     */
    addToTradeConfirmation() {
      this.$emit('confirm', this.item)
      this.$bvModal.hide('alreadyListed')
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.continue-btn
  background: $color-blue-2
  border: 1px solid $color-blue-2
  box-shadow: 0px 4px 4px $color-black-rgb2
  border-radius: 21px
  font-family: $font-sf-pro-text
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 19px
  align-items: center
  color: $color-white-1
  width: 147px

.cancel-btn
  background: $color-white-1
  border: 1px solid $color-black-1
  filter: drop-shadow(0px 4px 4px $color-black-rgb2)
  border-radius: 21px
  font-family: $font-sf-pro-text
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 19px
  text-align: center
  color: $color-black-1
  width: 147px

.listing-id
  font-family: $font-sf-pro-text
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 150%
  text-align: center
  color: $color-blue-15
  text-decoration: underline
</style>
