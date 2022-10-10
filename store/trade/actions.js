/**
 * Get the Trade Browse Filters
 * @param commit, state
 */
export function fetchTradeBrowseFilters({ commit, state }) {
    this.$axios.get('/trades/filters', {
            params: {
                categories: state.selectedFilters.categories.join(','),
                size_types: state.selectedFilters.sizeTypes.join(',')
            }
        })
        .then(res => {
            commit('setSizeTypeFilters', res.data.data.size_types)
            commit('setSizeFilters', res.data.data.sizes)
            commit('setPriceRangeFilters', res.data.data.priceRange)
        })
}

/**
 * Get Trade Hub Listings
 * @param commit
 */
export async function fetchTradeHubListings({ commit }) {
    await this.$axios.get('/trades/matching')
        .then(res => {
            commit('setBestMatches', res.data.data.best_matches)
            commit('setInterestedListings', res.data.data.interested_in_your_listing)
        })
}

/**
 * Get Vendor Trade Summary
 * @param commit
 */
export async function fetchVendorTradeSummary({ commit }) {
    await this.$axios.get('/trades/vendor-summary')
        .then(res => {
            commit('setVendorTradeSummary', res.data.data)
        })
}

/**
 * Get Submitted Offer
 * @param commit
 */
export async function fetchSubmittedOffer({ commit }, $payload) {
    await this.$axios.get('/trades/vendor-summary')
        .then(res => {
            commit('setSubmittedOffer', res.data.data)
        })
}
