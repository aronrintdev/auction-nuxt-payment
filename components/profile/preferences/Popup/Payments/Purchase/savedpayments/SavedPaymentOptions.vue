<template>
  <b-row class="mt-2">
    <b-col md="12">
      <b-card class="custom-card giftcard-payment-options">
        <b-row>
          <b-col md="12" class="d-flex align-items-center">
            <b-form-radio
              v-model="paymentOption"
              name="payment-option"
              :value="payment.id"
              @change="$emit('savedPayment', { type: savedPaymentType, id: payment })"
            >
              <img
                class="img-fluid"
                width="50"
                :src="
                  require(`~/assets/img/shopping-cart/${payment.card_brand}-logo.png`)
                "
                alt="card-img"
              />
            </b-form-radio>
            <div class="ending-in m-4">
              {{ $t('shopping_cart.ending_in') }} {{ payment.card_last_digits }}
            </div>
            <div class="exp-date m-4">
              {{ $t('shopping_cart.exp_date') }}&colon;
              {{ payment.card_expiry_date }}
            </div>

            <div v-if="showDefaultStatus && payment.is_default" class="default-status">
              {{ $t('preferences.common.default') }}
            </div>
            <button
              v-if="showEdit"
              class="btn btn-edit shadow-none"
              type="button"
              @click="
                $emit('savePaymentOnEdit', { type: savedPaymentType, id: payment.id })
              "
            >
              <img
                :src="require('~/assets/img/icons/Edit-icon.png')"
                alt="Edit"
              />
            </button>
            <button
              v-if="showDelete"
              class="btn btn-trash"
              type="button"
              @click="$emit('removePayment', { id: payment.id })"
            >
              <img
                :src="require('~/assets/img/icons/close-icon.svg')"
                alt="Trash"
              />
            </button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { SAVED, NEWPAYMENT } from '~/static/constants'
export default {
  name: 'SavedPaymentOptions',

  props: {
    payment: {
      type: Object,
      default: () => {},
    },

    showEdit: {
      type: Boolean,
      default: false
    },

    showDelete: {
      type: Boolean,
      default: false
    },

    showDefaultStatus: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      paymentOption: '',
      savedPaymentType: SAVED,
      newPaymentType: NEWPAYMENT
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.ending-in,
.exp-date
  font-style: normal
  @include body-5-normal
  color: $color-black-1
.btn-edit
  background-color: $color-white-6
  border-radius: 4px
  height: 30px
  padding: 0
  width: 30px
.btn-trash
  background-color: $color-red-17
  border: 0
  border-radius: 0.25rem
  max-height: 24px
  padding: 0 6px 0 6px
  position: absolute
  right: 2%
  top: 50%
  height: 30px
  width: 30px
div.custom-card.card > .card-body
  padding: 0 1.25rem 0
.payment-options-col
  .custom-card  
    background: $color-white-10
    border-radius: 4px
    margin-bottom: 0
.default-status
  font-style: normal
  @include body-8-medium
  display: flex
  align-items: center
  color: $color-green-2
</style>