/**
 * Get All notifications of user
 * @param commit
 * @param {Object} payload
 * @param {String} payload.from_year
 * @param {String} payload.to_year
 * @param {String} payload.search
 * @param {String[]} payload.categories
 * @return {Promise<AxiosResponse<any>>}
 */
export function getNotifications({commit}, payload) {
    return this.$axios.get('notifications/user', {
        params: payload
    }).then(res => {
        commit('setNotification', res.data.data)
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}

/**
 * Get All unread notifications of user
 * @param commit
 * @param {Object} payload
 * @param {String} payload.from_year
 * @param {String} payload.to_year
 * @param {String} payload.search
 * @param {String[]} payload.categories
 * @return {Promise<AxiosResponse<any>>}
 */
export function getUnreadNotifications({commit}, payload) {
    return this.$axios.get('notifications/unread', {
        params: payload
    })
}

/**
 * Get unread count of users notifications
 * @param commit
 * @param {Object} payload
 * @param {String} payload.from_year
 * @param {String} payload.to_year
 * @param {String} payload.search
 * @param {String[]} payload.categories
 * @return {Promise<AxiosResponse<any>>}
 */
export function getUnreadCount({commit}, payload) {
    return this.$axios.get('notifications/unread-count', {
        params: payload
    }).then(res => {
        commit('setUnread', res.data.data)
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}


/**
 * Get user notification Settings
 * @param commit
 * @return {Promise<AxiosResponse<any>>}
 */
export function getUserSettings({commit}) {
    return this.$axios.get('notification-settings').then(res => {
        commit('setSettings', res.data.data)
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}

/**
 * Create user notification Settings
 * @param {Object} context
 * @param {Object} payload
 * @param {number} payload.user_id
 * @param {String} payload.key
 * @param {String} payload.channel
 * @param {boolean} payload.value
 * @param {Object} payload.data
 * @return {Promise<AxiosResponse<any>>}
 */
export function createNotificationSettings(context, payload) {
    return this.$axios.post('notification-settings', {payload})
}

/**
 * Edit user notification Settings
 * @param {Object} context
 * @param {Object} payload
 * @param {number} payload.id
 * @param {boolean} payload.value
 * @param {Object} payload.data
 * @return {Promise<AxiosResponse<any>>}
 */
export function editNotificationSettings(context, payload) {
    return this.$axios.put(`notification-settings/${payload.id}`, {payload})
}

/**
 * Edit user notification Settings
 * @param {Object} context
 * @param {Object} payload
 * @param {Object[]} payload.settings
 * @param {number} payload.settings.payload.id
 * @param {boolean} payload.settings.payload.value
 * @param {Object} payload.settings.payload.data
 * @return {Promise<AxiosResponse<any>>}
 */
export function bulkEditNotificationSettings(context, payload) {
    return this.$axios.put('notification-settings/bulk-update', payload)
}

/**
 * read notification
 * @param {Object} context
 * @param {Object} payload
 * @param {number} payload.notification_id
 * @return {Promise<AxiosResponse<any>>}
 */
export function readNotification(context, payload) {
    return this.$axios.post('notification-reads', {payload})
}

/**
 * read all notification
 * @param {Object} context
 * @return {Promise<AxiosResponse<any>>}
 */
export function readAllNotification(context) {
    return this.$axios.post('notification-reads/read-all')
}

