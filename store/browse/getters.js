// Update filters
export function filters(state) {
  return state.filters
}
export function selectedCategory(state) {
  return state.selectedCategory
}
export function selectedPrices(state) {
  return state.selectedPrices
}
export function selectedYears(state) {
  return state.selectedYears
}
export function selectedBrands(state) {
  return state.selectedBrands
}
export function selectedSizes(state) {
  return state.selectedSizes
}
export function selectedSizeType(state) {
  return state.selectedSizeType
}
export function selectedSort(state) {
  return state.selectedSort
}
export function selectedSearch(state) {
  return state.search
}
export function selectedOrdering(state){
  return state.selectedOrdering
}
export function selectedProductType(state){
  return state.selectedProductType
}
export function selectedGender(state){
  return state.selectedGender
}
export function getSizesByType(state){
  return state.sizes
}