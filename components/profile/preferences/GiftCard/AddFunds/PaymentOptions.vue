<template>
  <div class="saved-card-payment">
    <div class="saved-payment-header">
      {{ $t('giftcard_section.saved_card_payment') }}
    </div>

    <b-col cols class="payment-options-col">
      <SavedPaymentOptions
        v-for="(payment, index) in paymentMethods"
        :key="index"
        :payment="payment"
        showDefaultStatus
        showDelete
        showEdit
        @savedPayment="savedPayment"
        @savePaymentOnEdit="onEdit"
        @removePayment="onRemove"
      />

      <b-row class="mt-2">
        <b-col md="12">
          <b-card class="custom-card giftcard-payment-options">
            <b-row>
              <b-col md="12" class="d-flex align-items-center">
                <b-form-radio
                  v-model="paymentOption"
                  name="payment-option"
                  value="new-payment"
                  >{{
                    $t('preferences.payments.continue_new_payment')
                  }}</b-form-radio
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col cols md="12">
          <span class="total float-right">
            {{ $t('common.total') }}&colon; &dollar;{{ getAmount }}
          </span>
        </b-col>
        <b-col cols class="mt-4">
          <b-button
            id="add-button"
            class="float-right px-3 text-white"
            :disabled="disabled"
            :variant="disabled ? 'disabled' : 'active'"
            pill
            @click="addPayment"
            >{{ $t('giftcard_section.add', { amount: getAmount }) }}</b-button
          >
        </b-col>
      </b-row>
    </b-col>
    <!-- Payment delete -->
    <ConfirmModal
      id="confirm-remove-payment"
      :message="
        $t('giftcard_section.confirm_remove_text', {
          cardNumber: cardLastDigit,
        })
      "
      :confirmLabel="$t('common.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- Payment delete -->
    <!-- Confirm delete -->
    <AlertModal
      id="delete-payment-success"
      :message="isDefault === 1 ? $t('giftcard_section.new_default_card_added') : $t('giftcard_section.card_payment_deleted')"
      icon="tick"
      auto-hide
      @hidden="moveToPayments"
    />
    <!-- ./Confirm delete -->
    <!-- Add default -->
    <ConfirmModal
      id="confirm-add-default"
      :message="$t('giftcard_section.default_remove')"
      :confirmLabel="$t('giftcard_section.add_new_default')"
      @confirm="onConfirmDefaultAdd"
      @cancel="onConfirmDiscard"
    />
    <!-- ./Add default -->
    <!-- Cards default add -->
    <Modal :id="`default-add-card`" hideFooter>
      <div class="add-default-header">{{ $t('giftcard_section.add_new_default_card') }}</div>
      <Cards  :cta-label="`${$t('giftcard_section.save_card_as_default')}`" class="mt-4" @complete="onConfirm"/>
    </Modal>
    <!-- ./Cards default add -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SavedPaymentOptions from '../../Popup/Payments/Purchase/savedpayments/SavedPaymentOptions.vue'
import Cards from '../../Popup/Payments/Cards.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import { ConfirmModal, AlertModal } from '~/components/modal'
import { Modal } from '~/components/common'
import { SAVED, NEWPAYMENT } from '~/static/constants'
export default {
  name: 'PaymentOptions',

  components: {
    SavedPaymentOptions,
    ConfirmModal,
    AlertModal,
    Cards,
    Modal
  },

  mixins: [emitEvent],

  data() {
    return {
      disabled: true,
      selectedOption: '',
      paymentOption: '',
      cardLastDigit: '',
      selectedCard: '',
      isDefault: 0,
      savedPaymentType: SAVED,
      newPaymentType: NEWPAYMENT
    }
  },

  computed: {
    ...mapGetters({
      paymentMethods: 'preferences/getUserPaymentMethods',
      savePaymentMethods: 'preferences/savePaymentMethods',
    }),
    // Get the amount selected
    getAmount: (vm) => {
      return vm.$options.filters.formatPrice(
        vm.$store.state.preferences.selectedAmount
      )
    },
  },

  watch: {
    // Payment method variable on update.
    paymentOption(option) {
      if (option) {
        this.disabled = false
        this.selectedOption = option
      }
    },
  },

  methods: {
    ...mapActions({
      userPaymentMethods: 'preferences/savePaymentMethods'
    }),
    // Update the selected payment option
    savedPayment(val) {
      this.disabled = false
      this.selectedOption = val.type
      this.selectedId = val.id.id
    },

    // On payment radio click
    addPayment() {
      if (
        typeof this.selectedOption === 'string' &&
        this.selectedOption === this.newPaymentType
      ) {
        this.emitRenderComponentEvent(
          this.$parent.$parent.$options.components.NewPaymentInfo.name
        )
      }

      if (
        typeof this.selectedOption === 'string' &&
        this.selectedOption === this.savedPaymentType
      ) {
        this.$emit('savedPayments', { selectedId: this.selectedId })
      }
    },

    onEdit(value) {
      this.$auth.$storage.setLocalStorage('edit-payment-id', value.id)
      this.emitRenderComponentEvent(this.$parent.$parent.$options.components.EditCardPayment.name)
    },
    // Get the selected card number from array
    getCardNumber(value) {
      // eslint-disable-next-line array-callback-return
      this.paymentMethods.filter((val) => {
        if (val.id === value.id) {
          this.cardLastDigit = val.card_last_digits
        }
      })
    },

    // Set default true if the selected id is default
    getIsDefault(value){
      // eslint-disable-next-line array-callback-return
      this.paymentMethods.filter((val) => {
        if (val.id === value.id && val.is_default === 1) {
          this.isDefault = val.is_default
        }
      })
    },

    // On remove button click
    onRemove(value) {
      this.getIsDefault(value)
      this.getCardNumber(value)
      this.selectedCard = value.id
      if(this.isDefault === 1){
        this.$bvModal.show('confirm-add-default')
      }else{
        this.isDefault = 0
        this.$bvModal.show('confirm-remove-payment')
      }
    },

    // On confirm remove click,
    onConfirm() {
      this.$axios
        .delete('payment-method', {
          params: { id: this.selectedCard },
        })
        .then((res) => {
          if (res.data.success) {
            this.getUserPaymentMethods()
            this.$bvModal.show('delete-payment-success')
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Payment:', err.response)
          this.$toasted.error(this.$t(err.response.data.response_text))
        })
    },

    moveToPayments() {
      this.emitRenderComponentEvent(this.$parent.$parent.$options.components.SavedUserPayments.name)
    },

    // On cancel click, discard modal
    onConfirmDiscard() {
      this.selectedCard = ''
      this.$bvModal.hide('confirm-remove-payment')
    },
    // Get the user payment
    getUserPaymentMethods() {
      this.$axios
        .get('/preferences/payments/user-payment-methods')
        .then((res) => {
          this.userPaymentMethods({
            data: res.data,
          })
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },

    onConfirmDefaultAdd(){
      this.$bvModal.show('default-add-card')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.saved-payment-header
  font-style: normal
  @include body-3-medium
  color: $color-black-1
.saved-card-payment
  margin-top: 4rem
.payment-options-col
  flex: 0 0 67%
  max-width: 67%

  @media (min-width:1154px) and (max-width: 1674px)
    flex: 0 0 100%
    max-width: 100%
  @media (max-width: 1104px)
    flex: 0 0 100%
    max-width: 100%
.giftcard-payment-options
  &.custom-card
    background: $color-white-10
    border-radius: 4px
    margin-bottom: 0
.btn-disabled
  background: $color-gray-47
  border: 1px solid $color-gray-47
  border-radius: 20px
.btn-active
  background: $color-blue-20
  border: 1px solid $color-blue-20
  border-radius: 20px
.total
  font-style: normal
  @include body-1-medium
  color: $color-black-1
#add-button
  width: 203px
  height: 42px
.add-default-header
  font-style: normal
  @include body-2-medium
  text-align: left
  color: $color-black-1
</style>