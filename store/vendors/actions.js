let isPerPageSet = false

export function getVendorOrders({commit, state}, page = 1) {
  let query = getQueryStringFrom(state.filters)
  let sortParam = getSortParam(state.sortBy)

  query = query ? '&' + query : ''
  sortParam = sortParam ? '&' + sortParam : ''
  commit('setQueryString', query+sortParam)

  const url = `/vendors/orders?page=${page}${query}${sortParam}`;

  commit('setIsLoading', true)

  this.$axios.get(url)
    .then((res) => {
      const data = res.data?.data

      commit('setTotalOrders', data.orders.data.length)
      commit('setTotalSales', data.total_sales)
      commit('setTotalCommission', data.total_commission)
      commit('setTotalCommissionPending', data.pending_commission)
      commit('setTotalCommissionPaid', data.paid_commission)
      commit('setInventoryCount', data.total_inventory)
      commit('setTotalOffers', data.total_offers)
      commit('setProducts', data.products)
      commit('setOrders', data.orders.data)
      commit('setCurrentPage', data.orders.current_page)
      commit('setTotalPage', data.orders.total)

      if (!isPerPageSet) {
        commit('setPerPage', data.orders.per_page)
        isPerPageSet = true
      }

      commit('setIsLoading', false)
    })
}

export function updateQueryString({commit, state}){
  let query = getQueryStringFrom(state.filters)
  let sortParam = getSortParam(state.sortBy)

  query = query ? '&' + query : ''
  sortParam = sortParam ? '&' + sortParam : ''
  commit('setQueryString', query+sortParam)
}

export async function fetchCategories({commit}) {
  const resp = await this.$axios.get('/categories')
  if (resp.status === 200) {
    commit('setCategories', resp.data)
  }
}

function getSortParam(sortBy) {
  return sortBy ? `order_by_column=${sortBy}&order_by_direction=desc` : '';
}

function getQueryStringFrom(filters) {
  const qr = [];

  const addFilter = function (name, value) {
    if (value) {
      qr.push(name + '=' + value)
    }
  }

  const objectToString = function (obj) {
    if (obj && typeof obj === 'object') {
      return obj.map(v => v.value).join(',')
    }
    return ''
  }

  addFilter('search', filters.search)
  addFilter('start_date', filters.start_date)
  addFilter('end_date', filters.end_date)
  addFilter('status', objectToString(filters.activeStatusFilters))
  addFilter('type', objectToString(filters.activeTypeFilters))

  if (filters.category_id > 0 && filters.category_id !== '') {
    addFilter('category_id', filters.category_id)
  }

  return qr.join('&')
}
