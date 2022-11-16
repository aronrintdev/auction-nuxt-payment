/**
 * Get All notifications of user
 * @param commit
 * @param {Object} payload
 * @param {Number[]} payload.years
 * @param {String} payload.search
 * @param {Number} payload.perPage
 * @param {String[]} payload.types
 * @return {Promise<AxiosResponse<any>>}
 */
import {NOTIFICATION_PER_PAGE} from '~/static/constants';

export function getNotifications({commit}, payload) {
    const allFilters = {
        from_year: payload && payload.years ? payload.years[0] : null,
        to_year: payload && payload.years ? payload.years[1] : null,
        search: payload && payload.search || null,
        categories: payload && payload.types || null,
        perPage: payload && payload.perPage || NOTIFICATION_PER_PAGE,
    }
    commit('setNotificationFilters', allFilters)
    return this.$axios.get('notifications/user', {
        params: payload
    }).then(res => {

        commit('setNotification', res.data.data.data)
        commit('setTotal', res.data.data.total)
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
 * @param dispatch
 * @param {Object} payload
 * @param {number} payload.notification_id
 * @return {Promise<AxiosResponse<any>>}
 */
export function readNotification({dispatch}, payload) {
    return this.$axios.post('notification-reads', payload).then(res => {
        dispatch('getUnreadCount')
        dispatch('getNotifications')
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}

/**
 * Unread notification
 * @param dispatch
 * @param {number} readId
 * @return {Promise<AxiosResponse<any>>}
 */
export function unreadNotification({dispatch}, readId) {
    return this.$axios.delete(`notification-reads/${readId}`).then(res => {
        dispatch('getUnreadCount')
        dispatch('getNotifications')
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}

/**
 * read all notification
 * @param dispatch
 * @return {Promise<AxiosResponse<any>>}
 */
export function readAllNotification({dispatch}) {
    return this.$axios.post('notification-reads/read-all').then(res => {
        dispatch('getUnreadCount')
        dispatch('getNotifications')
        Promise.resolve(res)
    }).catch(err => {
        Promise.reject(err)
    })
}


/**
 * change filters
 * @param dispatch
 * @param {Object} filters
 * @param {String} filters.from_year
 * @param {String} filters.to_year
 * @param {String} filters.search
 * @param {String[]} filters.categories
 */
export function filterChange({dispatch, commit}, filters) {
    commit('setNotificationFilters',filters)
    dispatch('getNotifications', filters)
}


