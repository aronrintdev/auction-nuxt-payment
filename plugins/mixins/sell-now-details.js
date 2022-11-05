import { mapGetters } from 'vuex'
import {
  AMOUNT_OFFSET,
  FIXED_AMOUNT,
  GLOBAL_COMMISSION,
  PERCENT,
  PERCENT_OFFSET,
  PERCENTAGE,
  SALE_SELLER_FEE,
  SALE_TRANSACTION_FEE,
  FIXED_AND_PERCENTAGE,
  FIXED_PRODUCT,
  VENDOR_SPECIFIC_COMMISSION
} from '~/static/constants'

export default {
  computed: {
    ...mapGetters({
      sellItem: 'sell-now/getSellingItem',
      promoCode: 'order-details/getPromoCode',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      getCommission: 'commission/getCommission',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      return vm.sellItem.quantity
    },
    calculateCommission: (vm) => {
      // TODO This will be handled by the new calculate_commission function which will be written
      // If the type is vendor_specific
      if (vm.getCommission.vendorCommission && vm.getCommission.vendorCommission.type === VENDOR_SPECIFIC_COMMISSION) {
        // If the commission type is fixed and percentage.
        if (vm.getCommission.vendorCommission.commission_type === FIXED_AND_PERCENTAGE) {
          const percentage = vm.getCommission.vendorCommission.percentage / 100

          return (vm.getSubTotal * percentage) + (vm.getCommission.vendorCommission.fixed_amount * 100)
        }
        // If the commission type is percentage.
        if (vm.getCommission.vendorCommission.commission_type === PERCENTAGE) {
          const percentage = vm.getCommission.vendorCommission.percentage / 100

          return vm.getSubTotal * percentage
        }

        if (vm.getCommission.vendorCommission.commission_type === FIXED_AMOUNT) {
          return vm.getSubTotal - (vm.getCommission.vendorCommission.fixed_amount * 100)
        }
      }
      // If the type is global_commission
      if (vm.getCommission.vendorCommission && vm.getCommission.vendorCommission.type === GLOBAL_COMMISSION) {
        if(vm.getCommission.globalCommission.commission_type === FIXED_AND_PERCENTAGE){
          const percentage = vm.getCommission.globalCommission.percentage / 100

          return (vm.getSubTotal * percentage) + (vm.getCommission.globalCommission.fixed_amount * 100)
        }

        if (vm.getCommission.globalCommission.commission_type === PERCENTAGE) {
          const percentage = vm.getCommission.globalCommission.percentage / 100

          return vm.getSubTotal * percentage
        }

        if (vm.getCommission.globalCommission.commission_type === FIXED_AMOUNT) {
          return vm.getSubTotal - (vm.getCommission.globalCommission.fixed_amount * 100)
        }
      }
      // Fallback fee
      return vm.getSubTotal * (SALE_SELLER_FEE / PERCENT_OFFSET)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {

            if (vm.sellItem.sku === vm.promoCode.sku) {
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
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSellerPercentage: (vm) => {
      return ((vm.calculateCommission / vm.getSubTotal) * 100).toFixed(2)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubTotal: (vm) => {
      // Processing fee and shipping fee will be added to it.
      return (
        vm.sellItem.highestOffer * vm.getTotalQuantity
      )
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubTotal - vm.getPromoDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSellerFee: (vm) => {
      return vm.calculateCommission
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTransactionFee: (vm) => {
      return vm.getSubTotal * (SALE_TRANSACTION_FEE / PERCENT_OFFSET)
    },
    // // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      return vm.getSubtotalAfterDiscount - vm.getSellerFee - vm.getTransactionFee || 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({
        key: 'sub_total',
        label: vm.$t('sell_now.ask_price'),
        value: vm.getSubTotal || 0,
      })
      items.push({
        key: 'sub_total_after_discount',
        label: '',
        value: vm.getSubtotalAfterDiscount || 0
      })
      items.push({
        key: 'seller_fee',
        label: vm.$t('sell_now.seller_fee', {
          percentage: vm.getSellerPercentage
        }),
        value: - vm.getSellerFee || 0,
      })
      items.push({
        key: 'transaction_fee',
        label: vm.$t('sell_now.transaction_fee', {
          percentage: SALE_TRANSACTION_FEE,
        }),
        value: - vm.getTransactionFee || 0,
      })
      return items
    },
  }
}
