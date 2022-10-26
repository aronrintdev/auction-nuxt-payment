<template>
  <div class="payment-method p-4">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <div class="title" :class="mobileClass.length ? 'body-13-bold font-weight-bold' : 'heading-3-normal'">
        {{ $t('vendor_hub.payout_method.title') }}
      </div>

      <Button
        pill
        variant="outline-primary mt-3 mt-md-0"
        class="add-payout"
        :hidden="isPaymentAddition || isPaymentEditActive"
        @click="isPaymentAddition = true"
      >
        {{ $t('vendor_hub.payout_method.add_payment_method') }}
      </Button>
    </div>
    <div v-if="!hasPayoutMethod && !isPaymentAddition && !isPaymentEditActive && !loading"
         :class="mobileClass ? 'body-5-normal' : 'body-3-normal'"
         class="no-payout mt-3 mt-sm-5">
      {{ $t('vendor_hub.payout_method.no_method') }}
    </div>
    <div v-if="loading" class="mt-4 d-flex align-items-center justify-content-center">
      <Loader :loading="loading"></Loader>
    </div>

    <div v-if="!isPaymentAddition && !isPaymentEditActive">
      <div v-for="(method, index) in payoutMethods" :key="index">
        <VendorPayoutItem :method="method" @edit="editItem" @delete="deleteItemModalTrigger"/>
        <hr v-if="index!==payoutMethods.length-1" class="mt-4 mb-2"/>
      </div>
    </div>

    <VendorPayoutForm
      v-if="isPaymentAddition || isPaymentEditActive"
      :editMode="isPaymentEditActive"
      @discard="isPaymentEditActive= false; isPaymentAddition = false"
      @update="updateMethods"/>

    <ConfirmModal
      :modal-action-loading="modalActionLoading"
      :confirm-text="$t('common.delete')"
      :save-modal-body="$t('vendor_hub.payout_method.delete_body')"
      :show-confirm="confirmModal"
      @confirm-hidden="confirmModal = false"
      @confirm-accept="deleteItem"
    />
    <SuccessModal
      :success-modal-body="$t('vendor_hub.payout_method.delete_success')"
      :show-success="finishedModal"
      @success-hidden="finishedModal = false"
    />
  </div>


</template>

<script>
import {mapActions} from 'vuex';
import {Button, Loader} from '~/components/common';
import VendorPayoutForm from '~/components/profile/vendor-hub/VendorPayoutForm';
import VendorPayoutItem from '~/components/profile/vendor-hub/VendorPayoutItem';
import SuccessModal from '~/components/profile/vendor-hub/SuccessModal';
import ConfirmModal from '~/components/profile/vendor-hub/ConfirmModal';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'VendorPaymentMethod',
  components: { VendorPayoutItem, VendorPayoutForm, Button, SuccessModal, ConfirmModal, Loader},
  mixins: [screenSize],
  data() {
    return {
      payoutMethods: [],
      isPaymentAddition: false,
      isPaymentEditActive: false,
      confirmModal: false,
      finishedModal: false,
      modalActionLoading: false,
      selectedItem: null,
      loading: false
    }
  },
  computed: {
    hasPayoutMethod() {
      return this.payoutMethods.length > 0
    }
  },
  mounted() {
    this.updateMethods()
  },
  methods: {
    ...mapActions({
      fetchPayoutMethods: 'vendor-hub/fetchPayoutMethods',
      deletePayoutMethods: 'vendor-hub/deletePayoutMethods',
    }),
    updateMethods(){
      this.loading = true
      this.fetchPayoutMethods().then(res => {
        this.payoutMethods = res.data.data
      }).catch(err => {
          this.$toasted.error(err)
        }
      ).finally(() => {
        this.loading = false
      })
    },
    deleteItemModalTrigger(item){
      this.selectedItem = item
      this.confirmModal = true

    },
    deleteItem(){
      this.modalActionLoading = true
      this.deletePayoutMethods(this.selectedItem.id).then(res => {
        this.finishedModal = true
        this.updateMethods()
      }).catch(err => {
        this.$toasted.error(err.message)
      }).finally(() => {
        this.modalActionLoading = false
      })
    },
    editItem(item) {
      this.isPaymentEditActive = true
      this.$nextTick(() => {
        this.$store.commit('vendor-hub/setEditedPayout', item)
      })
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.add-payout.btn
  color: $color-blue-2
  border: 1px solid $color-blue-2


.no-payout
  font-family: $font-family-montserrat

.title
  font-family: $font-family-montserrat

.payment-method
  border: 1px solid $color-gray-29
  border-radius: 4px
  height: max-content
</style>
