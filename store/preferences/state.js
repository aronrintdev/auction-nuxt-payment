export default function () {
  return {
    // Status to check edit or not
    editCardsStatus: false,
    // ID of the card which is to be edited
    editCardID: '',
    // Modal title and status
    modal: {
      title: '',
      showTabs: true,
      // verifiedIcon: false,
      size: '',
    
    },
    
    // To store the available gift cards
    giftCardsAvailable: {
      seasonal: [],
      featured: []
    },

    // Selected Gift card details stored from view all gift card section
    selectedGiftCard: [],

    // On view all click
    giftCardTypeSelected: {
      type: '',
      totalCount: ''
    },

    giftCards: {
      cardDetails: {},
      billingInfo: {},
    },

    successResponse: {},
    userGiftCards: null,

    redeemedResponse: {},

    paymentMethods: null,

    paymentVia: null,

    // View GiftCard
    giftCardSelected: {},

    contentVisibility: {
      showTransactionHistory: false,
      showHowToUse: false,
      backTo: ''
    },
    
    pageTitle: '',

    selectedAmount: 0,

    paymentDetails: {},

    selectedAddress: '',

    actionType: '',

    editID: '',
    updateDefaultConfirmed: false,
    showHeader: true,
    hasDefaultCard: false,
    cardExpStatus: false,
    giftCardRedeemed: false,
    giftCardSuccessAlert: false,

    giftCardCount:1
  }
}
