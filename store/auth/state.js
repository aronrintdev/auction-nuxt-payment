export default function () {
  return {
    busy: false,
    loggedIn: false,
    strategy: 'laravelJWT',
    user: false,
    userDetails: {
      billingAddress: null,
      shippingAddress: null,
      paymentMethod: null
    },

    // To save the vendors payoutmethod.
    vendorPayoutMethod: {},
  }
}
