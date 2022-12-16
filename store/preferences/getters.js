/**
 * Get the card status on show
 * @param state
 * @returns {[editCardsStatus: Boolean]}
 */
export function getCardEditStatus(state) {
  return state.editCardsStatus
}

/**
 * Get the card ID if status is edit
 * @param state
 * @returns {[editCardID: Number]}
 */
export function getCardEditID(state) {
  return state.editCardID
}

/**
 * Returns the modal header details
 * @param state
 * @returns {[{title: String, showTabs: Boolean}]}
 */
export function getModalHeader(state) {
  return state.modal
}


/**
 * Get the selected GiftCard Details
 * @param state
 * @returns {[{totalCount: Number, type: String}]}
 */
export function selectedGiftCardDetails(state) {
  return state.giftCardTypeSelected
}

/**
 * Get the selected GiftCard Details
 * @param state
 * @returns {[{giftCard: {id: Number, title: String, image: String, amount: Number} }]}
 */
export function giftCardSelected(state) {
  return state.selectedGiftCard
}

/**
 * Get the available giftcards.
 * @param state 
 * @returns 
 */
export function getAvailableGiftCards(state){
  return state.giftCardsAvailable
}

/**
 * Get the giftcard details selected for purchase.
 * @param state 
 * @returns 
 */
export function getGiftCardDetails(state){
  return state.giftCards
}

/**
 * Get the success response on purchase.
 * @param state
 * @returns 
 */
export function getSuccess(state){
  return state.successResponse
}

/**
 * Get the user giftcards.
 * @param state
 * @returns 
 */
export function userGiftCardList(state){
  return state.userGiftCards
}

/**
 * Get the redeem success response.
 * @param state 
 * @returns 
 */
export function getRedeemSuccess(state){
  return state.redeemedResponse
}

/**
 * Get the users payment methods.
 * @param state 
 * @returns 
 */
export function getUserPaymentMethods(state){
  return state.paymentMethods
}
/**
 * Store the paid card last digit.
 * @param state 
 * @returns 
 */
export function getPaymentVia(state){
  return state.paymentVia
}

/**
 * Get the giftcard details
 * @param state 
 * @returns 
 */
export function getSelectedGiftCard(state) {
  return state.giftCardSelected
}

/**
 * Get the content visibility on view details page.
 * @param state 
 * @returns
 */
export function getContentVisibility(state){
  return state.contentVisibility
}

/**
 * Get the choosen amount from denomination.
 * @param state 
 */
export function getSelectedAmount(state) {
  return state.selectedAmount
}

/**
 * Get the given user address.
 * @param state 
 * @returns
 */
export function billingDetails(state) {
  return state.paymentDetails
}

/**
 * Get the page title on change
 * @param state
 * @returns
 */
export function getPageTitle(state){
  return state.pageTitle
}

export function getSelectedAddressType(state){
  return state.selectedAddress
}

export function getActionType(state){
  return state.actionType
}

export function editAddressID(state){
  return state.editID
}

export function getDefaultConfirmedStatus(state){
  return state.updateDefaultConfirmed
}

export function showHeader(state){
  return state.showHeader
}

export function isCardDefault(state){
  return state.hasDefaultCard
}

export function getcardExpStatus(state) {
  return state.cardExpStatus
}

export function giftCardRedeemed(state){
  return state.giftCardRedeemed
}

export function giftCardSuccessAlert(state){
  return state.giftCardSuccessAlert
}


export function getUpdateGiftCardCount(state){
  return state.updateGiftCardCount 
}