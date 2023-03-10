/**
 * This mutation is used to add offer items in listing state
 * @param state
 * @param val
 */
export function setTradeItems(state, val) {
    if (typeof val.quantity === 'undefined') {
        val.quantity = 1
    }
    state.trade_items.push(val)
}

/**
 * This mutation is used to add want items in listing state
 * @param state
 * @param val
 */
export function setWantsItemsTrade(state, val) {
    if (typeof val.selected_quantity === 'undefined') {
        val.selected_quantity = 1
    }
    state.wants_items_trade.push(val)
}

/**
 * This function is used to empty offer item listing
 * @param state
 */
export function clearTradeItems(state) {
    state.trade_items = []
}

/**
 * This function is used to empty want item listing
 * @param state
 * @param val
 */
export function clearWantsItemsTrade(state, val) {
    state.wants_items_trade = []
}

/**
 * THis mutation is used to remove offer item from state by item index
 * @param state
 * @param index
 */
export function removeTradeItem(state, index) {
    if (index > -1) {
        state.trade_items.splice(index, 1)
    }
}

/**
 * This mutation is used to remove want item from state by item index
 * @param state
 * @param index
 */
export function removeWantsItemsTrade(state, index) {
    if (index > -1) {
        state.wants_items_trade.splice(index, 1)
    }
}

/**
 * This mutation is used to update want item data in state by using id
 * @param state
 * @param val
 */
export function updateWantsItemsTrade(state, val) {
    const index = state.wants_items_trade.findIndex(prod => prod.id === val.id)
    state.wants_items_trade[index] = val
}

/**
 * This mutation is used to update trade offer item data in state by using id
 * @param state
 * @param val
 */
export function updateTradeItems(state, val) {
    const index = state.trade_items.findIndex(prod => prod.id === val.id)
    state.trade_items[index] = val
}

/**
 * This mutation is used to increment offer item quantity in state
 * @param state
 * @param val
 */
export function incrementTradeItemQuantity(state, val) {
    const index = state.trade_items.findIndex(item => item.id === val.id)
    state.trade_items[index].quantity++
}

/**
 * This mutation is used to update want item data in state by using id
 * @param state
 * @param val
 */
export function updateOfferItemsTrade(state, val) {
    const index = state.trade_items.findIndex(prod => prod.id === val.id)
    state.trade_items[index] = val
}

/**
 * This mutation is used to decrement offer item quantity in state
 * @param state
 * @param id
 */
export function decrementTradeItemQuantity(state, id) {
    const index = state.trade_items.findIndex(item => item.id === id)
    if(index){
      state.trade_items[index].quantity--
    }else{
      state.trade_items[id].quantity--
    }
}

/**
 * This mutation is used to increment want item quantity in state
 * @param state
 * @param id
 */
export function incrementTradeWantItemQuantity(state, id) {
    const index = state.wants_items_trade.findIndex(item => item.id === id)
    state.wants_items_trade[index].selected_quantity++
}

/**
 * This mutation is used to decrement want item quantity in state
 * @param state
 * @param id
 */
export function decrementTradeWantItemQuantity(state, id) {
    const index = state.wants_items_trade.findIndex(item => item.id === id)
    state.wants_items_trade[index].selected_quantity--
}

/**
 * This mutation is used to set trade id for editing purpose
 * @param state
 * @param tradeId
 */
export function setTradeForEditing(state, tradeId) {
    state.trade_id = tradeId
}

/**
 * THis mutation is use to remove all offers item from state
 * @param state
 */
export function removeAllOfferItems(state) {
    state.trade_items = []
}

/**
 * This mutation is use to remove all wants item from state
 * @param state
 */
export function removeAllWantItems(state) {
    state.wants_items_trade = []
}

/**
 * This mutation is used to set trade draft count in state
 * @param state
 * @param val
 */
export function setTradeDraftCount(state,val) {
    state.trade_draft_count = val
}

/**
 * Set referer to move back to same page
 * @param state
 * @param referrer
 */
export function setEditTradePageReferrer(state, referrer) {
    state.editTradePageReferrer = referrer
}
export function setTradeFilters(state, data) {
  state.filterTrade = data
}
export function setTradeFiltersUpdated(state, data) {
  state.filterTrade.sizeType.push(data)
}
export function setTradeFiltersRemove(state, data) {
  state.filterTrade.sizeType.indexOf(data)
  state.filterTrade.sizeType.splice(data,1)
}
export function setTradeFiltersUpdatedSizes(state, data) {
  state.filterTrade.sizes.push(data)
}
export function setTradeFiltersRemoveSizes(state, data) {
  state.filterTrade.sizes.indexOf(data)
  state.filterTrade.sizes.splice(data,1)
}
