export async function searchProducts({ commit }, { search, take = 5 }) {
  return await this.$axios
    .get('/products', {
      params: {
        search,
        take,
      },
    })
    .then((res) => {
      return res.data?.data
    })
}

export function bulkMatch({ commit }, payload) {
  return this.$axios
    .post('/products/bulk-match', payload)
    .then((res) => res.data)
}

export function fetchProductBySku({ commit }, sku) {
  return this.$axios.get(`/products/${sku}`).then((res) => res.data)
}

export function suggestProduct({ commit }, payload) {
  return this.$axios.post('/products/suggest', payload).then((res) => res.data)
}