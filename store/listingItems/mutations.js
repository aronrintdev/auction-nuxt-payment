/**
 * On post listing on click, add the listings to temporary draft before moving to confirm screen.
 * @param state 
 * @param {object} payload 
 */
export function addListingToDraft(state, payload) {
    state.draftListing.push(payload)
}

/**
 * Remove a listing from temporary draft.
 * @param state 
 * @param {object} payload 
 */
export function deleteListingFromDraft(state, payload) {
    state.draftListing.splice(state.draftListing.indexOf(payload), 1)
}

/**
 * Save the data from temporary to listing draft.
 * @param state 
 * @param payload 
 */
export function saveListingAsDraft(state, payload) {
    state.listingSavedAsDraft.push(...payload.data)
}

/**
 * Clear the temporary draft storage.
 * @param state
 */
export function removeDraftListing(state) {
    state.draftListing = []
}

/**
 * Update the data in temporary draft storage
 * @param state 
 * @param {object} payload - Contains index, data
 */
export function updateDraftListing(state, payload) {
    state.draftListing[payload.index] = payload.data
}


/**
 * Update the quantity/ MinOfferamount.
 * @param state 
 * @param {object} payload - Include colname, index, value(quantity/ minOfferAmount). 
 */
export function updateQuantityOrOffer(state, payload) {
    if (payload.colname === 'quantity') {
        state.draftListing[payload.index].quantity = payload.quantity
    }
    if (payload.colname === 'minOfferAmount') {
        state.draftListing[payload.index].minOfferAmount = payload.minOfferAmount
    }
}

/**
 * Remove the items from drafts.
 * @param state 
 * @param payload 
 */
export function removeFromDrafts(state, payload) {
    state.listingSavedAsDraft.splice(state.listingSavedAsDraft.indexOf(payload), 1)
}