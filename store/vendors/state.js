export default function () {
  return {
    overview: {},
    totalOrders: 0,
    totalSales: 0,
    totalCommissionPending: 0,
    totalCommissionPaid: 0,
    totalCommission: 0,
    inventoryCount: 0,
    totalOffers: 0,
    products: [],
    orders: {},
    currentPage: 0,
    perPage: 0,
    totalPage: 0,
    filters: {
      activeTypeFilters: [],
      activeStatusFilters: [],
      search: '',
      start_date: null,
      end_date: null,
      category_id: 0
    },
    sortBy: '',
    categories: [],
    isLoading: false
  }
}
