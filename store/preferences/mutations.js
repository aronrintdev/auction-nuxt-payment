/**
 * 
 * Update the card status
 * @param state
 * @param val
 */
export function editCardsStatus(state, val) {
  state.editCardsStatus = val
}

/**
 * Update the card ID
 * @param state
 * @param val
 */
export function editCardID(state, val) {
  state.editCardID = val
}

/**
 * Update the modal header and title and icons on change
 * @param state
 * @param val
 */
export function updateModalHeader(state, val) {
  state.modal = {...val}
}


/**
 * Update the selected GiftCard type and and details
 * @param state
 * @param val
 */
export function updatedGiftCardTypeSelected(state, val) {
  state.giftCardTypeSelected = { ...val }
}

/**
 * Update the selected GiftCard
 * @param state
 * @param val
 */
export function updatedSelectedGiftCard(state, val) {
  state.selectedGiftCard = val
}

/**
 * Save the available gift cards
 * @param state 
 * @param val 
 */
export function addAvailableGiftCards(state, val){
  state.giftCardsAvailable.seasonal = val.seasonal
  state.giftCardsAvailable.featured = val.featured
}

/**
 * Save the purchase details for giftcard and payment methods.
 * @param state
 * @param payload 
 */
export function updateGiftCards(state, payload){
  if(payload.TYPE === 'cardDetails') {
    state.giftCards.cardDetails = payload.DETAILS
  }
  if(payload.TYPE === 'billingInfo'){
    state.giftCards.billingInfo = payload.DETAILS
  }
}

/**
 * Store the purchase success response.
 * @param state 
 * @param payload 
 */
export function storePurchaseResponse(state, payload){
  state.successResponse = payload.response
}

/**
 * Remove the giftcard details stored.
 * @param state 
 */
export function removeGiftCardDetails(state){
  state.successResponse = {}
  state.giftCards.cardDetails = {}
  state.giftCards.billingInfo = {}
  state.redeemedResponse = {}
  state.selectedGiftCard = []
  state.paymentVia = null
}

/**
 * Save the users giftcards.
 * @param state 
 * @param payload 
 */
export function userGiftCards(state, payload){
  state.userGiftCards = payload
}

/**
 * Store the redeem success response.
 * @param state
 * @param payload 
 */
export function storeRedeemedResponse(state, payload){
  state.redeemedResponse = payload.response
}

/**
 * Store the users payment methods
 * @param state 
 * @param payload 
 */
export function storePaymentMethods(state, payload){
  state.paymentMethods = payload.data
}

/**
 * Save payment via.
 * @param state
 * @param payload
 */
export function savePaymentVia(state, payload){
  state.paymentVia = payload.via
}

/**
 * Save the giftcard details 
 */
export function saveGiftCardDetails(state, payload) {
  state.giftCardSelected = payload
}

/**
 * Clear the selected value
 * @param state 
 */
export function clearSelectedGiftCard(state){
  state.giftCardSelected = null
}

/**
 * Toggle the content in view details page
 * @param state 
 * @param payload 
 */
export function toggleContentVisibility(state, payload){
  state.contentVisibility.showTransactionHistory = payload.transactionHistory
  state.contentVisibility.showHowToUse = payload.howToUse
  state.contentVisibility.backTo = payload.backTo
}

/**
 * Set the selected amount to be added
 * @param state 
 * @param payload 
 */
export function addAmount(state, payload) {
  state.selectedAmount = payload
}

/**
 * Store the user given address in add-funds
 * @param state 
 * @param payload 
 */
export function storeCardPaymentDetails(state, payload){
  state.paymentDetails = payload.payment
}

/**
 * Update the page title on component change.
 * @param state 
 * @param payload 
 */
export function updatePageTitle(state, payload){
  state.pageTitle = payload
}

export function storeSelectedAddressType(state, payload){
  state.selectedAddress = payload
}

export function updateActionType(state, payload){
  state.actionType = payload
}

export function editAddressID(state, payload){
  state.editID = payload
}

export function storeDefaultConfirmed(state, payload){
  state.updateDefaultConfirmed = payload
}

export function updateHeader(state, payload) {
  state.showHeader = payload
}

export function cardStatus(state, payload) {
  state.hasDefaultCard = payload
}

export function cardRedeemStatus(state, payload) {
  state.giftCardRedeemed = payload
}

export function successAlert(state, payload) {
  state.giftCardSuccessAlert = payload
}

export function updateGiftCardCount(state, payload) {
  state.updateGiftCardCount = payload
}