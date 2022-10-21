<template>
  <div class="filter-wrapper">
    <MobileBottomSheet
      id="popup-filter"
      ref="MobileBottomSheet"
      class="mobile-bottom-sheet"
      :hasHeaderDivider="false"
      :open="open"
      :title="``"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
    >
      <EditFilter
        :id="offerId"
        :highestOfferAmount="highestOfferAmount"
        :open="open"
        @closed="$emit('closed')"
        @deleteEditOffer="deleteEditOffer"
      />
    </MobileBottomSheet>
    <vue-bottom-sheet
      id="delete-confirmation"
      ref="deleteConfirmSheet"
      max-width="100vw"
      max-height="90vh"
      :rounded="true"
    >
      <!-- Delete confirmation bottom sheet mobile -->
      <Confirmation
        id="deleteConfirmation"
        class="w-100"
        @onCancelConfirm="onCancelConfirm"
        @onDeleteConfirm="onDeleteConfirm"
      />
      <!-- Delete confirmation bottom sheet mobile -->
    </vue-bottom-sheet>

    <!-- On delete changes offer -->
    <AlertModal
      id="delete-confirm"
      :message="$t('placed_offers.offer_delete_message')"
      icon="trash"
      auto-hide
      @hidden="onDeleteModalHidden"
    />
    <!-- On delete changes offer -->

    <!-- On save changes click -->
    <AlertModal
      id="edit-offer-success"
      :message="$t('placed_offers.offer_save_edit')"
      icon="success-tick"
      auto-hide
      @hidden="reload"
    />
  </div>
</template>

<script>
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import EditFilter from '~/components/profile/offers-placed/EditFilter.vue'
import Confirmation from '~/components/profile/offers-received/Confirmation.vue'
import { AlertModal } from '~/components/modal'

export default {
  name: 'EditOffer',
  components: { MobileBottomSheet, EditFilter, Confirmation, AlertModal },

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    highestOfferAmount: {
      type: Number,
      default: 0,
    },

    offerId: {
      type: Number,
      default: 0,
    },

  },

  computed: {
    highestAmount: (vm) => {
      if (vm.highestOfferAmount) {
        return vm.highestOfferAmount
      }
    },
  },

  methods: {
    // on clicking delete opening delete confirm
    deleteEditOffer() {
      this.$emit('closed')
      this.$refs.deleteConfirmSheet.open()
      this.$emit('closeEditFilter')
    },

    // By confirming delete
    onDeleteConfirm() {
      this.delete()
      this.$refs.deleteConfirmSheet.close()
      this.$bvModal.show('delete-confirm')
    },

    // delete the offer
    delete() {
      this.$axios
        .delete(`offers/${this.offerId}`)
        .then((res) => {
          this.offer = res.data.data
          this.$emit('reload')
        })
        .catch((err) => {
          this.$logger.logToServer('Edit Offer', err.response)
        })
    },

    // on cancelling confirmation
    onCancelConfirm() {
      this.$nuxt.refresh()
      this.$refs.deleteConfirmSheet.close()
    },

    // After deleting the offer move to the index
    onDeleteModalHidden() {
      this.$router.push('/profile/offers-placed')
    },

    // Relaod details page
    reload() {
      this.$emit('reload')
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.filter-content
  height: 87%
// TODO: Rearrange height without !important if possible.
#popup-filter::v-deep
  .bottom-sheet__card
    max-height: 36% !important


::v-deep.filter-button
  height: 40px
  width: 135px
  &.apply-filters.btn
    background-color: $color-blue-20
    border: none
    white-space: nowrap

#deleteConfirmSheet::v-deep
  .cancel-button
    color: $color-blue-20

#deleteConfirmation::v-deep
  .bottom-pop-confirmation
    display: flex
    width: 576px

#delete-confirmation::v-deep
  // TODO: Rearrange height without !important if possible.
  .bottom-sheet__content
    height: 150px !important
    overflow-y: hidden
</style>