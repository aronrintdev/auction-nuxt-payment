/**
 * Retrieve Products with given filters
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function getDeadstockExchanges({commit}, payload) {
    return this.$axios.get('products', {
        params: {
            ...payload
        }
    }).then(res => {
        commit('setDeadstockExchanges', res.data.data.data)
        return Promise.resolve(res)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * Retrieve single product with id
 * @param {Object} context
 * @param {number} id
 * @return {Promise<AxiosResponse<any>>}
 */
export function getSingleProducts(context, id) {
    return this.$axios.get(`products/${id}`)
}


