export function setTotalOrders(state, val) {
  state.totalOrders = val
}

export function setTotalSales(state, val) {
  state.totalSales = val
}

export function setTotalCommissionPending(state, val) {
  state.totalCommissionPending = val
}

export function setInventoryCount(state, val) {
  state.inventoryCount = val
}

export function setTotalOffers(state, val) {
  state.totalOffers = val
}

export function setProducts(state, val) {
  state.products = val
}

export function setOrders(state, val) {
  state.orders = val
}

export function setCurrentPage(state, val) {
  state.currentPage = val
}

export function setPerPage(state, val) {
  state.perPage = val
}

export function setTotalPage(state, val) {
  state.totalPage = val
}

export function setFilters(state, val) {
  state.filters.activeTypeFilters = [...val.activeTypeFilters]
  state.filters.activeStatusFilters = [...val.activeStatusFilters]
  state.filters.start_date = val.start_date
  state.filters.end_date = val.end_date
  state.filters.search = val.search
}

export function setCategoryId(state, val){
  state.filters.category_id = val.category_id
}

export function setOrderBy(state, val) {
  state.sortBy = val
}

export function setCategories(state, val) {
  const categories = [{id: 0, label: 'All', value: 'all'}]
  val.forEach(x => categories.push({id: x.id, label: x.name, value: x.name}))
  state.categories = categories
}

export function setIsLoading(state, val) {
  state.isLoading = val
}
