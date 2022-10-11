<template>
  <b-row class="mt-2">
    <b-col md="12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="2" class="d-flex align-items-center">
            <b-form-radio
              v-model="paymentOption"
              name="payment-option"
              :value="payment.id"
              @change="
                $emit('savedPayment', { type: savedPaymentType, id: payment })
              "
            ></b-form-radio>
            <img
              class="img-fluid"
              width="50"
              :src="getCardBrandLogo"
              alt="card-img"
            />
          </b-col>
          <b-col
            :md="showDefaultStatus && payment.is_default ? '3' : '5'"
            class="d-flex align-items-center"
          >
            <div class="body-5-normal">
              {{ $t('shopping_cart.ending_in') }} {{ payment.card_last_digits }}
            </div>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.exp_date') }}&colon;
              {{ payment.card_expiry_date }}
            </div>
          </b-col>
          <b-col
            v-if="showDefaultStatus && payment.is_default"
            md="2"
            class="d-flex align-items-center"
          >
            <div class="default-status">
              {{ $t('preferences.common.default') }}
            </div>
          </b-col>
          <b-col md="1" class="d-flex flex-column">
            <PencilSquaredBlueSvg
              v-if="showEdit"
              class="btn-action"
              role="button"
              @click="
                $emit('savePaymentOnEdit', {
                  type: savedPaymentType,
                  id: payment.id,
                })
              "
            />
            <CloseSquaredRed
              v-if="showDelete"
              class="btn-action mt-1"
              role="button"
              @click="$emit('removePayment', { id: payment.id })"
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { SAVED, NEWPAYMENT } from '~/static/constants'
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import CloseSquaredRed from '~/assets/img/icons/close_squared_red.svg?inline'

export default {
  name: 'SavedPaymentOptions',

  components: { PencilSquaredBlueSvg, CloseSquaredRed },

  props: {
    payment: {
      type: Object,
      default: () => {},
    },

    showEdit: {
      type: Boolean,
      default: false,
    },

    showDelete: {
      type: Boolean,
      default: false,
    },

    showDefaultStatus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      paymentOption: '',
      savedPaymentType: SAVED,
      newPaymentType: NEWPAYMENT,
    }
  },

  computed: {
    getCardBrandLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.payment.card_brand}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
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
  background: $color-white-10
  border-radius: 4px
  margin-bottom: 0
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
div.custom-card.card > .card-body
  flex: 1 1 auto
  min-height: 1px
  padding: 0.5rem 1.25rem 0.5rem 1.25rem
.custom-card
  background: $color-white-10
  border-radius: 4px
  margin-bottom: 0
</style>