export function addInventoryToDraft({ commit }, payload) {
  commit('addInventoryToDraft', payload)
}

export function deleteInventoryFromDraft({ commit }, payload) {
  commit('deleteInventoryFromDraft', payload)
}

export function updateInventoryInDraft({ commit }, payload) {
  commit('updateInventoryInDraft', payload)
}

export function createInventories({ commit }, payload) {
  return this.$axios.post('/inventories/bulk', payload).then((res) => {
    commit('deleteAllDrafts')
    return res.data
  })
}

export function fetchInventories({ commit }, payload) {
  return this.$axios.get('/inventories', { params: payload }).then((res) => {
    return res.data
  })
}

export function deleteInventories({ commit }, { ids }) {
  return this.$axios.delete('/inventories', { data: { ids } }).then((res) => {
    return res.data
  })
}

export function fetchInventory({ commit }, { id }) {
  return this.$axios.get(`/inventories/${id}`).then((res) => {
    return res.data
  })
}

export function updateInventory({ commit }, { id, data }) {
  return this.$axios.put(`/inventories/${id}`, data).then((res) => res.data)
}

export function addInventoriesToCsvDraft({ commit }, payload) {
  commit('addInventoriesToCsvDraft', payload)
}

export function updateInventoryFieldInCsvDraft({ commit }, payload) {
  commit('updateInventoryFieldInCsvDraft', payload)
}

export function updateInventoryInCsvDraft({ commit }, payload) {
  commit('updateInventoryInCsvDraft', payload)
}

export function createInventoriesFromCsvDraft({ commit, state }, ids) {
  const payload = state.csvDraftInventories
    .filter((i, index) => ids.includes(index))
    .map((i) => {
      return {
        size_id: i.sizeId,
        packaging_condition_id: i.packagingConditionId,
        product_id: i.product.id,
        stock: i.quantity,
        sale_price: i.price,
      }
    })
  return this.$axios.post('/inventories/bulk', payload).then((res) => {
    commit('deleteCsvDrafts', ids)
    return res.data
  })
}

export function deleteInventoryFromCsvDraft({ commit }, id) {
  commit('deleteCsvDrafts', [id])
}

export function fetchPackagingConditions({ commit }, categoryName) {
  this.$axios.get('/packaging-conditions', {
    params: {
      category: categoryName,
    }
  })
    .then(res => {
      commit('setPackageConditions', res.data)
    })
}

export function fetchColors({ commit }) {
  this.$axios.get('/inventories/colors/all')
    .then(res => {
      commit('setColors', res.data)
    })
}

/**
 * To store the path to be redirect after creating inventory
 * @param commit
 * @param payload 
 */
export function addReferrer({ commit }, payload){
  commit('setReferrer', payload)
}