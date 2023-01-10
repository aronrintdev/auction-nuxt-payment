import { mapGetters } from 'vuex'
import { FIXED_PRODUCT, PERCENT } from '~/static/constants'

export default {
  computed: {
    ...mapGetters({
      auction: 'auction/activeAuction',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      paymentToken: 'order-details/getPaymentToken',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
    shoppingCart: (vm) => {
      return vm.auction ? [vm.auction] : []
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingFullName: (vm) => {
      return `${vm.billingAddress.firstName} ${vm.billingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingAddress: (vm) => {
      return `${vm.billingAddress.addressLine}, ${vm.billingAddress.city}, ${vm.billingAddress.country}, ${vm.billingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFullName: (vm) => {
      return `${vm.shippingAddress.firstName} ${vm.shippingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingAddress: (vm) => {
      return `${vm.shippingAddress.addressLine}, ${vm.shippingAddress.city}, ${vm.shippingAddress.country}, ${vm.shippingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart[0].bid_price || 0
    },
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.auction.auction_items.filter((item) => {
              return item.inventory.product.sku === vm.promoCode.sku
            })

            if (items) {
              const totalQuantity = items.length

              discount += totalQuantity * vm.promoCode.amount * 100
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubtotal * (vm.promoCode.amount / 100)

            break;
          }
          default:
            discount += vm.promoCode.amount * 100
        }
      }

      return discount
    },
    getTotalQuantity: (vm) => {
      return vm.auction.auction_items ? vm.auction.auction_items.length : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      return vm.shippingFee * vm.getTotalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return Math.trunc(vm.processingFee * vm.getSubtotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * (vm.getSubtotal - vm.getDiscount))
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotal - vm.getDiscount
      return total
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return vm.getPromoDiscount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []

      items.push({ label: vm.$t('auction.bid_amount'), value: vm.getSubtotal })
      items.push({ label: vm.$t('shopping_cart.shipping_fee'), value: vm.getShippingFee })
      items.push({ label: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee })
      items.push({ label: vm.$t('shopping_cart.tax'), value: vm.getTax })

      return items
    }
  },
}
