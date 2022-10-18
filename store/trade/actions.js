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
 * Get Submitted Offer by User
 * @param commit
 */
export function fetchSubmittedOffer({ commit }, $payload) {
  return new Promise((resolve, reject) => {
    this.$axios.get('/trades/submitted-offers', {
      params: $payload
    })
    .then(res => {
      commit('setSubmittedOffer', res.data.data.data[0])
      resolve(res)
    }).catch((error) => {
      commit('setSubmittedOffer', null)
      reject(error)
    })
  })
}

/**
 * Dismiss Trade for not being shown in future
 * @param payload
 * @returns {Promise<void>}
 */
 export function dismissTrade({ commit }, payload){
  return new Promise((resolve, reject) => {
    this.$axios
          .post('/trades/dismiss', payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
