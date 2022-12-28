export async function fetchFilters({ commit },category) {
  return await this.$axios.get('/browse/shop/filters/'+category).then((res) => {
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
  commit('setSelectedCategory', 'all')
  commit('setGender', null)
  commit('setProductType', null)
  commit('setIsFilter', false)
}
