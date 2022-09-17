/**
 * On post listing on click, add the listings to temporary draft before moving to confirm screen.
 * @param commit 
 * @param {object} payload
 */
export function addListingToDraft({ commit }, payload) {
    commit('addListingToDraft', payload)
}

/**
 * Remove a listing from temporary draft.
 * @param commit
 * @param {object} payload 
 */
export function deleteListingFromDraft({ commit }, payload) {
    commit('deleteListingFromDraft', payload)
}

/**
 * Save the data from temporary to listing draft.
 * @param commit
 * @param payload 
 */
export function saveAsDraft({ commit }, payload) {
    commit('saveListingAsDraft', payload)
}

/**
 * Clear the temporary draft storage.
 * @param commit
 */
export function removeDraftListing({ commit }) {
    commit('removeDraftListing')
}

/**
 * Update the data in temporary draft storage
 * @param commit 
 * @param {object} payload - Contains index, data
 */
export function updateDraftListing({ commit }, payload) {
    commit('updateDraftListing', payload)
}

/**
 * Update the quantity/ MinOfferamount.
 * @param commit
 * @param {object} payload
 */
export function updateQuantityOrOffer({ commit }, payload) {
    commit('updateQuantityOrOffer', payload)
}

/**
 * Create the listing_items wrt. inventories.
 * @param payload 
 * @returns
 */
export function createInventoryWithListings({commit}, payload) {
    return this.$axios.post('/listing-items/inventory-with-listing', {
        data: payload
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        this.$logger.logToServer('create listing error:', err.response)
        return err.response.data
    })
}

/**
 * Create bulk listing_items. 
 * @param payload 
 * @returns 
 */
export function createBulkListingItems({ commit }, payload) {
    return this.$axios.post('/listing-items/bulk', {
        data: payload
    }).then((res) => {
        return res.data
    }).catch((err) => {
        this.$logger.logToServer('create listing error:', err.response)
        return err.response.data;
    })
}

/**
 * Remove the items from drafts.
 * @param commit
 * @param {object} payload 
 */
export function removeFromDrafts({ commit}, payload){
    commit('removeFromDrafts', payload)
}