<template>
  <b-card-text class="gift-card-purchase-order-summary">
    <b-row class="image-row m-0">
      <b-col md="12" sm="12" class="img-col">
        <div class="img-background bg-white my-2 m-auto justify-content-center d-flex">
          <div class="copped-heading mt-auto">
            <img
              class="gift-card-img"
              :src="
                require(`~/assets/img/preferences/giftcard/${giftCardImageName}`)
              "
              alt="gift-card-img"
            />
            <h5 class="text-uppercase">
              {{ $t('preferences.payments.copped') }}
            </h5>
            <span class="ds-logo bg-muted">
              <img
                class="ds-logo-img mt-3 mb-5"
                :src="require('~/assets/img/Deadstock_Black_2.png')"
                alt="deadstock-logo p-3"
              />
            </span>
          </div>
        </div>
      </b-col>

      <b-col md="12" sm="12" class="p-4">
        <div class="purchase-success-heading">
          <div class="heading">
            {{ $t('preferences.payments.gift_card_purchase_success') }}
          </div>
          <div class="row my-4">
            <div class="col-md-6">
              <div class="giftcard-order-details">
                {{ $t('preferences.payments.giftcard_order_details') }}
              </div>
              <div class="content ml-2">
                <div class="order-id d-flex justify-content-start w-100">
                  {{ $t('vendor_purchase.order_id') }}&colon; {{ getOrderID }}
                </div>
                <div class="gift-card-code d-flex justify-content-start w-100">
                  {{ $t('preferences.payments.gift_card_code') }}&colon;
                  {{ giftCardCode }}
                </div>
                <div class="order-date d-flex justify-content-start w-100">
                  {{ $t('shopping_cart.order_date') }}&colon;
                  {{ orderDate | formatDate }}
                </div>
                <div class="delivery-date d-flex justify-content-start w-100">
                  {{ $t('preferences.payments.delivery_date') }}&colon;
                  {{ deliveryDate | formatDate }}
                </div>
                <div class="via mt-3 d-flex justify-content-start w-100">
                  {{ $t('vendor_purchase.paymentvia') }} {{ paymentVia }}
                </div>
                <div class="giftcard-balance d-flex justify-content-start w-100">
                  {{ $t('preferences.payments.giftcard_balance') }}&colon; {{ giftCardBalance | toCurrency('USD', 'N/A') }}
                </div>
                <div class="total d-flex justify-content-start w-100">
                  {{ $t('common.total') }}&colon; {{ giftCardTotal | toCurrency('USD', 'N/A') }}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="giftcard-order-details">
                {{ $t('preferences.payments.delivery_information') }}
              </div>

              <div class="content ml-2">
                <div class="to-mail d-flex justify-content-start w-100">{{ $t('vendor_purchase.to') }}&colon; <span>{{ toDetails }}</span></div>
                <div class="from-name mt-2 d-flex justify-content-start w-100">
                  {{ $t('vendor_purchase.from') }}&colon; {{ fromDetails }}
                </div>
                <div class="message mt-2 d-flex justify-content-start w-100">
                  {{ $t('preferences.payments.message') }}&colon; {{ message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card-text>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import eventMixin from '~/plugins/mixins/emit-event.js'
export default {
  name: 'GiftCardPaymentOrderSuccess',

  mixins: [eventMixin],

  data() {
    return {
      nil: this.$t('common.nil'),
    }
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/giftCardSelected',
      success: 'preferences/getSuccess',
      getPaymentVia: 'preferences/getPaymentVia'
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImageName: (vm) => {
      return vm.getSelectedGiftCard.giftCard.image_name
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getOrderID: (vm) => {
      return vm.success.order ? vm.success.order.id : 0
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardCode: (vm) => {
      return vm.success.user_gift_card
        ? vm.success.user_gift_card.giftcard_number
        : vm.nil
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    orderDate: (vm) => {
      return vm.success.order.created_at
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    deliveryDate: (vm) => {
      return vm.success.user_gift_card.delivery_date
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    paymentVia: (vm) => {
      return vm.getPaymentVia ? vm.getPaymentVia : vm.nil
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardBalance: (vm) => {
      return vm.success.user_gift_card.remaining_amount
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardTotal: (vm) => {
      return vm.success.user_gift_card.giftcard_amount
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    toDetails: (vm) => {
      return vm.success.user_gift_card.to
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    fromDetails: (vm) => {
      return vm.success.user_gift_card.from
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    message: (vm) => {
      return vm.success.user_gift_card.message
    }
  },

  created() {
    // Update the modal title.
    this.updateModalHeader({
      title: '',
      showTabs: false,
      size: 'md',
    })
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
    }),
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.img-col
  background: $color-white-5
.copped-heading
  h5
    @include heading-9
    letter-spacing: -0.04em
    margin-top: 30px
  .ds-logo-img
    width: 40%
  .gift-card-img
    width: 212px
    height: 135px
.img-background
  width: 348px
  height: 435px
.purchase-success-heading
  .heading
    font-style: normal
    @include body-2-medium
    text-align: center
    color: $color-black-1
.giftcard-order-details
  font-style: normal
  @include body-3-medium
  color: $color-black-1
.content
  div
    font-style: normal
    @include body-10-normal
    padding: 1px 0 1px
  .order-id
    text-decoration-line: underline
    color: $color-blue-1
@media (max-width: 322px)
  .img-background
    width: 270px
    height: 435px
  .copped-heading
    h5
      @include heading-6
    .ds-logo-img
      width: 30%
@media (max-width: 767px)
  .img-background
    height: 350px
</style>
