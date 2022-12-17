export async function fetchFilters({ commit }) {
  return await this.$axios.get('/browse/filters').then((res) => {
    return commit('setFilters', res.data)
  })
}
export function resetFilters({ commit }) {
  commit('setSelectedPrices', [])
  commit('setSelectedYears', [])
  commit('setSelectedBrands', [])
  commit('setSelectedSizes', [])
  commit('setSelectedSizeType', null)
  commit('setSelectedOrdering', null)
  commit('setSelectedSort', null)
  commit('setSelectedSearch', null)
}
