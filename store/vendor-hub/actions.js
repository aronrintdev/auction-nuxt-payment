/**
 * send Verification code to given number
 * @param commit
 * @param {Object} payload
 * @param {string} payload.phone
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export function sendVerificationCode({ commit }, payload){
  return this.$axios.post('/create-verification-code', payload)
}

/**
 * fetch vendor data
 * @param commit
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchVendorData({ commit }){
  return this.$axios.get('/vendors')
}

/**
 * verify code with number
 * @param commit
 * @param {Object} payload
 * @param {string} payload.phone
 * @param {string} payload.code
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export function verifyCode({ commit }, payload){
  return this.$axios.post('/verify-code', payload)
}

/**
 * send vendor application request
 * @param commit
 * @param {Object} payload
 * @param {string} payload.phone
 * @param {string} payload.code
 * @param {string} payload.store_name
 * @param {string} payload.store_address
 * @param {string} payload.city
 * @param {string} payload.state
 * @param {string} payload.apt_number
 * @param {string} payload.zip_code
 * @param {string} payload.country
 * @param {boolean} payload.certified_reseller
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export function applyVendor({ commit }, payload){
  return this.$axios.post('/vendors', payload)
}

/**
 * update vendor
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @param {string} payload.phone
 * @param {string} payload.code
 * @param {string} payload.store_name
 * @param {string} payload.store_address
 * @param {string} payload.city
 * @param {string} payload.state
 * @param {string} payload.apt_number
 * @param {string} payload.zip_code
 * @param {string} payload.country
 * @param {boolean} payload.certified_reseller
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export function updateVendor({ commit }, payload){
  return this.$axios.put('/vendors/update', payload)
}

/**
 * create vendor document
 * @param commit
 * @param {FormData} payload
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export function createVendorDocument({ commit }, payload){
  return this.$axios.post('/vendors/documents', payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


/**
 * get vendor documents
 * @param commit
 * @return {Promise<AxiosResponse<any>>}
 */
export function getVendorDocuments({ commit }){
  return this.$axios.get('/vendors/documents')
}

/**
 * get vendor document's requirements
 * @param commit
 * @return {Promise<AxiosResponse<any>>}
 */
export function getVendorDocRequirements({ commit }){
  return this.$axios.get('/vendors/doc-requirements').then(res => {
    commit('setVendorDocRequirements', res.data.data)
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err)
  })
}


/**
 * fetch vendor payout Methods
 * @param commit
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchPayoutMethods({ commit }){
  return this.$axios.get('/vendors/payout-methods')
}

/**
 * create vendor payout Methods
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function createPayoutMethods({ commit }, payload){
  return this.$axios.post('/vendors/payout-methods', payload)
}

/**
 * update vendor payout Methods
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function updatePayoutMethods({ commit }, payload){
  return this.$axios.put('/vendors/payout-methods/'+ payload.id, payload)
}

/**
 * set vendor payout Methods as default
 * @param commit
 * @param {number} id
 * @return {Promise<AxiosResponse<any>>}
 */
export function defaultPayoutMethods({ commit }, id){
  return this.$axios.post('/vendors/payout-methods/'+ id)
}


/**
 * update vendor payout Methods
 * @param commit
 * @param {number} id
 * @return {Promise<AxiosResponse<any>>}
 */
export function deletePayoutMethods({ commit }, id){
  return this.$axios.delete('/vendors/payout-methods/'+ id)
}


/**
 * Get Faqs
 * @param commit
 * @param {Object} params
 * @param {enum} params.faq_for  // vendor or customer
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchFaqs({ commit }, params){
  return this.$axios.get('/faqs', {
    params
  })
}

/**
 * Get comissions
 * @param commit
 * @param {Object} params
 * @param {String} params.sortBy
 * @param {Date} params.startDate
 * @param {Date} params.endDate
 * @param {Array} params.status
 * @param {Number} params.perPage
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchCommissions({ commit }, params){
  return this.$axios.get('/vendors/commissions', {
    params
  })
}


/**
 * Get commissions statistics
 * @param commit
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchCommissionsStatistics({ commit }, params){
  return this.$axios.get('/vendors/commission-statistics', {
    params
  })
}
