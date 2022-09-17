/**
 * Save the selected item details for sell now.
 * @param param 
 * @param payload 
 */
export function addItem({commit}, payload) {
  commit('addItem', payload)
}
/**
 * Do the sell now procedure.
 * @param commit 
 * @param payload 
 * @returns 
 */
export function doSellNow({ commit }, payload){
  return new Promise((resolve, reject) => {
    this.$axios.post('/sell-now', {
      ...payload
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * Check if the item exist for vendor.
 * @param commit
 * @param payload 
 * @returns 
 */
export function checkItemExistforVendor({ commit }, payload){
  return new Promise((resolve, reject) => {
    this.$axios.get('sell-now/check-inventory-listing', {
      params: payload
    }).then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Save the selected item
 * @param commit 
 * @param payload 
 */
export function selectedItem({commit}, payload){
  commit('storeSelectedItem', payload)
}