export async function fetchWatchlists({ commit }, { type }) {
  await this.$axios.get('/watchlists', { params: { type }}).then((res) => {
    commit('setWatchlists', res.data)
  })
}

export async function findWatchlist({ commit }, { id }) {
  return await this.$axios.get(`/watchlists/${id}`).then((res) => {
    return res.data
  })
}

export async function addItemsToWatchlist({ commit }, { watchlist, ids, type }) {
  return await this.$axios
    .post(`/watchlists/${watchlist.id}/items`, {
      ids,
      type,
    })
    .then((res) => {
      commit('updateWatchlist', res.data)
      return res.data
    })
}

export async function createWatchlist({ commit }, { name, privacy, type }) {
  return await this.$axios
    .post('/watchlists', {
      name,
      type,
      privacy,
    })
    .then((res) => {
      commit('addWatchlist', res.data)
      return res.data
    })
}

export async function removeItemsFromWatchlist(
  { commit },
  { watchlist, ids }
) {
  await this.$axios
    .delete(`/watchlists/${watchlist.id}/items`, {
      data: { ids },
    })
    .then((res) => {
      commit('updateWatchlist', res.data)
      return res.data
    })
}

export async function updateWatchlistPrivacy({ commit }, { watchlist, privacy }) {
  await this.$axios
    .put(`/watchlists/${watchlist.id}`, {
      privacy,
    })
    .then((res) => {
      commit('updatePrivacy', { watchlist, privacy })
    })
}

export async function fetchWatchlistItems(
  { commit },
  { watchlist, page, perPage, type, auctionType, status }
) {
  return await this.$axios
    .get(`/watchlists/${watchlist.id}/items`, {
      params: {
        type,
        page,
        auction_type: auctionType,
        per_page: perPage,
        status,
      },
    })
    .then((res) => {
      if (type === 'auction') {
        if (auctionType === 'single') {
          commit('setSingleAuctionItems', res.data.data)
        } else {
          commit('setCollectionAuctionItems', res.data.data)
        }
      }
      return res.data
    })
}

export async function moveWatchlistItems(
  { commit },
  { watchlist, ids, targetId }
) {
  return await this.$axios.put(`/watchlists/${watchlist.id}/items`, {
    ids,
    watchlist_id: targetId,
  })
}
export function clearWatchlistItems({ commit }){
  commit('setWatchlists', [])
}

export function changeWatchlistsType({ commit }, payload){
  commit('setWatchlistsType', payload)
}
