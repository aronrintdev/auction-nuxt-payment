<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t(`shopping_cart.${cryptoDetails.currency}`)"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.PaymentOptionsMenu.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Loading Spinner -->
      <b-row v-if="isLoading" class="spinner-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <b-spinner variant="blue-20" />
        </b-col>
      </b-row>
      <!-- End of Loading Spinner -->

      <!-- Crypto Details Card -->
      <b-card v-if="!isLoading" class="crypto-details-card">
        <b-row>
          <b-col cols="12" sm="12">
            <div class="d-flex align-items-center justify-content-center">
              <span class="body-13-normal text-blue-2 text-uppercase">
                {{ cryptoDetails.estimatedAmount }}&nbsp;{{ cryptoDetails.currency }}
              </span>
              <CopyBlackSVG @click="copyToClipboard(cryptoDetails.address)" />
            </div>
            <div class="body-13-normal text-center">&dollar;{{ cryptoDetails.amount }}</div>
            <div class="body-5-regular text-gray-25 text-center mt-2 text-uppercase">
              &bull;&nbsp;1&nbsp;{{ cryptoDetails.currency }}&nbsp;&equals;&nbsp;{{ getCryptoPriceInDollars | formatPrice }}&nbsp;USD
            </div>
            <div class="qrcode-wrapper">
              <div>
                <VueQrcode
                  :value="cryptoDetails.address"
                  :options="qrCodeOptions"
                />
              </div>
            </div>
            <div class="body-5-regular">{{ $t('shopping_cart.wallet_address') }}&colon;</div>

            <b-input-group class="wallet-address-group">
              <b-input
                readonly
                :value="cryptoDetails.address"
              ></b-input>
              <b-input-group-append class="d-flex align-items-center">
                <CopyBlackSVG @click="copyToClipboard(cryptoDetails.address)" />
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-card>
      <!-- End of Crypto Details Card -->

      <!-- Terms And Conditions Text -->
      <b-row class="terms-wrapper">
        <b-col cols="12" sm="12">
          <i18n
            path="shopping_cart.terms_and_conditions_paragraph_mobile"
            tag="div"
            class="body-10-normal text-center text-gray-25"
          >
            <span class="text-blue-30 text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">{{ $t('shopping_cart.terms_and_conditions') }}</span>
          </i18n>
        </b-col>
      </b-row>
      <!-- End of Terms And Conditions Text -->

      <!-- Crypto Payment Continue Button -->
      <b-row class="continue-btn-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <Button :disabled="isLoading" type="button" variant="dark-blue" pill @click="selectPaymentOption">{{
              $t('shopping_cart.continue')}}
          </Button>
        </b-col>
      </b-row>
      <!-- End of Crypto Payment Continue Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import emitEventMixin from '~/plugins/mixins/emit-event'
import clipboardMixin from '~/plugins/mixins/clipboard'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import Button from '~/components/common/Button'
import CopyBlackSVG from '~/assets/img/shopping-cart/copy-black.svg?inline'
import { BAD_REQUEST } from '~/static/constants'

export default {
  name: 'PaymentCrypto',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, Button, CopyBlackSVG, VueQrcode },
  mixins: [ emitEventMixin, clipboardMixin ],
  data() {
    return {
      isLoading: false,
      qrCodeOptions: {
        width: 150,
        height: 150,
      },
      shippingFee: 1000, // TODO: Temporary dummy data
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      cryptoDetails: 'order-details/getCryptoDetails'
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCryptoPriceInDollars: (vm) => {
      // Returns the cryptocurrency logo.
      if (vm.cryptoDetails.currency) {
        return Math.floor(vm.getTotal / vm.cryptoDetails.estimatedAmount)
      }
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      // TODO: Handle coupons as well
      let total = vm.shippingFee + vm.processingFee + vm.tax + vm.getSubtotal

      if (vm.promoCode) {
        total -= vm.promoCode.amount
      }

      if (vm.giftCard) {
        total -= vm.giftCard.amount
      }

      return total
    },
  },
  beforeMount() {
    this.isLoading = true
    this.getEstimatedCryptoPrice({
      cryptoCurrency: this.cryptoDetails.currency,
      total: this.getTotal
    }).then(() => {
      this.createCryptoPayment({
        paymentMethod: this.cryptoDetails,
        total: this.getTotal
      }).catch(error => {
        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())
          this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOptionsMenu.name)

          return false
        }

        this.$toasted.error(error.response.statusText)
        this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOptionsMenu.name)
      }).finally(() => {
        this.isLoading = false
      })
    }).catch((error) => {
      this.$toasted.error(error.response.statusText)
      this.isLoading = false
      this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOptionsMenu.name)
    })
  },
  methods: {
    ...mapActions({
      getEstimatedCryptoPrice: 'order-details/getEstimatedCryptoPrice',
      removePaymentMethod: 'auth/removePaymentMethod',
      createCryptoPayment: 'order-details/createCryptoPayment',
      removeCryptoDetails: 'order-details/removeCryptoDetails'
    }),
    selectPaymentOption() {
      this.removePaymentMethod().then(() => {
        this.emitRenderComponentEvent(this.$parent.$options.components.OrderSummary.name)
      })
    },
    handleClick() {
      this.removeCryptoDetails().then(() => {
        this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOption.name)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.spinner-wrapper
  margin-top: 26px

  .spinner-border
    width: 3rem
    height: 3rem

.crypto-details-card
  min-height: 350px
  border-radius: 0
  margin: 26px 18px 0

  .card-body
    padding-top: 12px
    padding-bottom: 24px

  svg
    margin-left: 15px

  .qrcode-wrapper div
    margin: 18px auto
    width: 152px
    height: 152px
    border: 1px solid $color-white-5

  .wallet-address-group
    margin-top: 9px

    input
      border-radius: 0.5rem
      background: $color-white-5
      color: $black-1
      @include body-5-medium

    div
      background: $color-white-5
      padding-right: 11px
      border-top-right-radius: 0.5rem
      border-bottom-right-radius: 0.5rem

.terms-wrapper
  margin-top: 24px

.continue-btn-wrapper
  margin: 41px 0

  .btn
    min-width: 216px
    min-height: 40px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
