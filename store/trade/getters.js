export function getExploreTrade(state) {
    return state.exploreTrade
}

/**
 * This getter is used to get size options for trades filtering
 * @param state
 * @returns {array}
 */
export function sizeOptions(state) {
    return state.sizeOptions
}

/**
 * This getter is used to get size type options for trades filtering
 * @param state
 * @returns {array}
 */
export function sizeTypeOptions(state) {
    return state.sizeTypeOptions
}

/**
 * This getter is used to get price range options for trades filtering
 * @param state
 * @returns {object}
 */
export function priceRangeOptions(state) {
    return state.priceRangeOptions
}

/**
 * This getter is used to get categories for trades filtering
 * @param state
 * @returns {array}
 */
export function getCategoryFilterSelection(state) {
    return state.selectedFilters.categories
}

/**
 * This getter is used to get size types for trades filtering
 * @param state
 * @returns {array}
 */
export function getSizeTypeFilterSelection(state) {
    return state.selectedFilters.sizeTypes
}

/**
 * This getter is used to get sizes for trades filtering
 * @param state
 * @returns {array}
 */
export function getSizeFilterSelection(state) {
    return state.selectedFilters.sizes
}

/**
 * This getter is used to get price range for trades filtering
 * @param state
 * @returns {object}
 */
export function getPriceRangeFilterSelection(state) {
    return state.selectedFilters.priceRange
}

/**
 * This getter is used to get searched text for trades filtering
 * @param state
 * @returns {string}
 */
export function getSearchedText(state) {
    return state.selectedFilters.searchedText
}

/**
 * This getter is used to get sort order for trades filtering
 * @param state
 * @returns {string}
 */
export function getSortOrder(state) {
    return state.selectedFilters.sortOrder
}

/**
 * This getter is used to get total trade items for filtering (one/two/three items)
 * @param state
 * @returns {string}
 */
export function getTotalItemTrades(state) {
    return state.selectedFilters.totalTradeItems
}

/**
 * This getter is used to get trade type (single item, recently viewed, ending soon etc)
 * @param state
 * @returns {string}
 */
export function getTradeType(state) {
    return state.selectedFilters.tradeType
}

/**
 * This getter is used to get list of offer items for create a trade listing
 * @param state
 * @returns {[]|*}
 */
export function getYourTradeItems(state) {
    return state.yourTradeItems
}

/**
 * This getter  is used to get quantity of your trade items
 * @param state
 * @returns {number|*}
 */
export function getYourOfferItemQuantity(state) {
    return state.yourTradeItems.map(i => i.quantity).reduce((a, b) => a + b, 0)
}

/**
 * This getter is used to get best matches for vendor
 * @param state
 */
export function getBestMatches(state) {
    return state.bestMatches
}

/**
 * This getter is used to get interested listings for vendor
 * @param state
 */
export function getInterestedListings(state) {
    return state.interestedListings
}

/**
 * This getter is used to get active trade for
 * checkout purpose
 * @param state
 * @returns {*}
 */
export function getActiveTrade(state) {
  return state.activeTrade
}

/**
 * This mutation is used to get submitted offer in state
 * @param state
 * @returns {*}
 */
export function getSubmittedOffer(state) {
  return state.submittedOffer
}
export function getCombinationsId(state) {
  return state.combinations
}
export function getUpdateCombinations(state) {
    return state.updateCombinations
}

/**
 * This mutation is used to get vendor trade summary (trading percentage and total trades)
 * @param state
 * @returns {*}
 */
export function getVendorTradeSummary(state){
    return state.vendorSummary
}

