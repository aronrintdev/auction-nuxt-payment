/**
 * Store the data to be sell.
 * @param {*} state 
 * @param {*} payload 
 */
export function addItem(state, payload){
    state.sellNowItem = payload
}

/**
 * Set the inventory/listing data.
 * @param {} state 
 * @param {*} payload 
 */
export function storeSelectedItem(state, payload) {
    state.selectedItem = payload
}