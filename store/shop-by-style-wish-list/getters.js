export function getWishLists(state) {
  console.log(state.shopByStyleWishLists);
  return state.shopByStyleWishLists
}

export function products(state) {
  return state.products
}

export function currentPage(state) {
  return state.currentPage
}

export function perPage(state) {
  return state.perPage
}

export function totalPage(state) {
  return state.totalPage
}

export function filters(state) {
  return state.filters
}

export function queryString(state) {
  return state.queryString
}
