import { mapGetters, mapActions } from 'vuex'
import { AMOUNT_OFFSET, FIXED_PRODUCT, PERCENT, PERCENT_OFFSET } from '~/static/constants'

export default {
  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
      offerDetails: 'offer/getOfferDetails',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
      promoCode: 'order-details/getPromoCode',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubTotal: (vm) => {
      return vm.offerDetails.bid_price
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({ key: 'sub_total', label: vm.$t('place_offer.offer_amount'), value: vm.getSubTotal > 0 ? vm.getSubTotal : 0 })
      items.push({ key: 'sub_total_after_discount', label: '', value: vm.getSubtotalAfterDiscount > 0 ? vm.getSubtotalAfterDiscount : 0 })
      items.push({ key: 'shipping_fee', label: vm.$t('shopping_cart.shipping_fee'), value: vm.shippingFee > 0 ? vm.shippingFee : 0 })
      items.push({ key: 'processing_fee', label: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee > 0 ? vm.getProcessingFee : 0 })
      items.push({ key: 'tax', label: vm.$t('shopping_cart.tax'), value: vm.getTax > 0 ? vm.getTax : 0 })

      return items
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubTotal - vm.getPromoDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return Math.trunc(vm.processingFee * vm.getSubTotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getSubTotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      return vm.getSubtotalAfterDiscount + vm.shippingFee + vm.getProcessingFee + vm.getTax
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {

            if (vm.offerDetails.product.sku === vm.promoCode.sku) {
              discount += vm.promoCode.amount * AMOUNT_OFFSET
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubTotal * (vm.promoCode.amount / PERCENT_OFFSET)

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
  },
  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
  },
  methods: {
    ...mapActions({
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
    }),
  }
}
