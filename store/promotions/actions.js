/**
 * Retrieve promotions with given filters
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function getPromotions({commit}, payload) {
    return this.$axios.get('promotions', {
        params: {
            ...payload
        }
    }).then(res => {
        commit('setPromotions', res.data.data.data)
        return Promise.resolve(res)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * Retrieve single promotion with id
 * @param {Object} context
 * @param {number} id
 * @return {Promise<AxiosResponse<any>>}
 */
export function getSinglePromotion(context, id) {
    return this.$axios.get(`promotions/${id}`)
}

/**
 * Invite friends
 * @param {Object} context
 * @param {string} email
 * @return {Promise<AxiosResponse<any>>}
 */
export function inviteFriend(context, email) {
    return this.$axios.post('users/invite', {
        email
    }, {handleError: false})
}