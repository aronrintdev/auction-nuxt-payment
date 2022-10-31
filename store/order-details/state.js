export default function () {
  return {
    orderDetails: {
      products: null,
      redeemedReward: {},
      orderId: null,
      transactionId: null
    },
    giftCard: {
      number: '',
      amount: '',
      remainingAmount: '',
      pin: 0,
      image: '',
    },
    promoCode: {
      code: '',
      type: '',
      amount: 0,
    },
    paymentToken: '',
    installmentPlans: {
      selected: false,
      type: '',
      date: '',
    },
    crypto: {
      address: null,
      currency: null,
      estimatedAmount: null,
      amount: null,
      paymentId: null,
      purchaseId: null,
      paymentType: null,
    }
  }
}
