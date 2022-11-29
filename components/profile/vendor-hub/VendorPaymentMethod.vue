<template>
  <div>
    <div :class="mobileClass ? 'mobile-form-box p-3' : 'payment-method mb-2'">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="title" :class="mobileClass ? 'body-13-medium text-blue-20 font-sf-pro' : 'heading-3-normal'">
          {{ $t('vendor_hub.payout_method.title') }}
        </div>

        <Button
          v-if="!mobileClass"
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
           class="no-payout m-5 m-sm-0 p-3 p-sm-0 text-center text-sm-left mt-sm-5">
        {{ $t('vendor_hub.payout_method.no_method') }}
      </div>
      <div v-if="loading" class="mt-4 d-flex align-items-center justify-content-center">
        <Loader :loading="loading"></Loader>
      </div>

      <div v-if="!isPaymentAddition && !isPaymentEditActive" class="mt-2">
        <div v-for="(method, index) in payoutMethods" :key="index">
          <template v-if="mobileClass">
            <VendorPayoutItemMobile
              v-if="showingId == null || showingId == method.id"
              :method="method"
              :isDetailView="showingId === method.id"
              @edit="editItem"
              @delete="deleteItemModalTrigger"
              @showDetail="(id) => showingId = id"
            />
          </template>
          <template v-else>
            <VendorPayoutItem :method="method" @edit="editItem" @delete="deleteItemModalTrigger"/>
            <hr v-if="index!==payoutMethods.length-1" class="mt-4 mb-2"/>
          </template>
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

    <div v-if="mobileClass" class="mobile-add-payout">
      <Button
        pill
        variant="primary circle-button p-3"
        class="add-payout"
        :hidden="isPaymentAddition || isPaymentEditActive"
        @click="isPaymentAddition = true"
      >
        <img src="~/assets/img/vendorhub/plus.svg" />
      </Button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {Button, Loader} from '~/components/common';
import VendorPayoutForm from '~/components/profile/vendor-hub/VendorPayoutForm';
import VendorPayoutItem from '~/components/profile/vendor-hub/VendorPayoutItem';
import VendorPayoutItemMobile from '~/components/profile/vendor-hub/VendorPayoutItemMobile';
import SuccessModal from '~/components/profile/vendor-hub/SuccessModal';
import ConfirmModal from '~/components/profile/vendor-hub/ConfirmModal';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'VendorPaymentMethod',
  components: { VendorPayoutItem, VendorPayoutForm, Button, SuccessModal, ConfirmModal, Loader, VendorPayoutItemMobile},
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
      loading: false,
      showingId: null,
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
        this.confirmModal = false
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
  color: $color-blue-20
  border: 1px solid $color-blue-20


.no-payout
  font-family: $font-family-montserrat

.title
  font-family: $font-family-montserrat

.payment-method
  border: 1px solid $color-gray-29
  border-radius: 4px
  height: max-content
  padding: 30px

.mobile-form-box
  box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
  border-radius: 10px
  padding-bottom: 3px

.text-blue-20
  color: $color-blue-20

.circle-button
  width: 42px
  height: 42px
  background-color: $color-blue-20!important
  border-color: $color-blue-20!important

.font-sf-pro
  font-family: $font-family-sf-pro-display

.mobile-add-payout
  position: absolute
  right: 16px
  bottom: 110px
</style>
