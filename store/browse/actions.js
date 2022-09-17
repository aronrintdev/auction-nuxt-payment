export async function fetchFilters({ commit }) {
  return await this.$axios.get('/browse/filters').then((res) => {
    return commit('setFilters', res.data)
  })
}

export function resetFilters({ commit }) {
  commit('setSelectedPrices', null)
  commit('setSelectedYears', null)
  commit('setSelectedBrands', null)
  commit('setSelectedSizes', null)
  commit('setSelectedSizeTypes', null)
}
