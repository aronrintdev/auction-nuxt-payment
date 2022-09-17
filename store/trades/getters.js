/**
 * This getter is used to get list of offer items for create a trade listing
 * @param state
 * @returns {[]|*}
 */
export function getTradeItems(state) {
    return state.trade_items
}

/**
 * This getter  is used to get list of want items for create a trade listing
 * @param state
 * @returns {[]|*}
 */
export function getTradeItemsWants(state) {
    return state.wants_items_trade
}

/**
 * This getter is used to get selected trade id for
 * editing or deleting purpose
 * @param state
 * @returns {*}
 */
export function getTradeId(state) {
    return state.trade_id
}

/**
 * This getter is used to get quantity of wants items in listing
 * @param state
 * @returns {number|default.methods.quantity|*}
 */
export function getTradeWantItemQuantity(state) {
    return state.wants_items_trade.map(i => i.selected_quantity).reduce((a, b) => a + b, 0)
}

/**
 * This getter  is used to get quantity of offer items in listing
 * @param state
 * @returns {number|*}
 */
export function getTradeOfferItemQuantity(state) {
    return state.trade_items.map(i => i.quantity).reduce((a, b) => a + b, 0)
}

/**
 * This getter is used to get total count of trade listing draft items
 * @param state
 * @returns {null|*}
 */
export function getTradeDraftCount(state) {
    return state.trade_draft_count
}

/**
 * This getter is used to get edit trade page referrer
 * @param state
 * @returns {null|*}
 */
export function getEditTradePageReferrer(state) {
    return state.editTradePageReferrer
}
