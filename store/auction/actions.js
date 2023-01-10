// Get the selected auctions details and info from backend.
// Params passed category and sku
export function getAuctionDetails({ commit }, auctionId) {
  this.$axios
    .get(`/auctions/${auctionId}`)
    .then((res) => {
      commit('setActiveAuction', res.data)
      const auctionsStr = localStorage.getItem('auctions')
      if (auctionsStr) {
        const auctionsInLocal = JSON.parse(auctionsStr)
        const idx = auctionsInLocal.findIndex(auction => auction === auctionId)
        if (idx > -1) {
          auctionsInLocal.splice(idx, 1)
        }
        auctionsInLocal.push(auctionId)
        localStorage.setItem('auctions', JSON.stringify(auctionsInLocal))
      } else {
        const auctionsInLocal = [auctionId]
        localStorage.setItem('auctions', JSON.stringify(auctionsInLocal))
      }
    })
    .catch((error) => {
      this.$logger.logToServer('Auction Details error:', error)
      this.$toasted.error(this.$t('server.error'))
    })
}

export function setProductFilter({ commit }, productId) {
  commit('setProductFilter', productId)
}

export function setActiveAuction({ commit }, payload) {
  commit('setActiveAuction', payload)
}

export function changeStatus({ commit }, payload) {
  commit('updateCheckoutStatus', payload)
}