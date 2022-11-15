export async function fetchFilters({ commit }) {
  return await this.$axios.get('/browse/filters').then((res) => {
    return commit('setFilters', res.data)
  })
}
export async function fetchSizesByType({ commit },type) {
  return await this.$axios.get('/sizes-by-type/'+type).then((res) => {
    return commit('setSizesByType', res.data.data)
  })
}
export function resetFilters({ commit }) {
  commit('setSelectedPrices', [])
  commit('setSelectedYears', [])
  commit('setSelectedBrands', [])
  commit('setSelectedSizes', [])
  commit('setSelectedSizeTypes', null)
  commit('setSizesByType', null)
}
