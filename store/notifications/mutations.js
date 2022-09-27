/**
 * Set notifications
 * @param state
 * @param {Object[]} notifications
 */
export function setNotification(state, notifications) {
    state.notifications = notifications
}

/**
 * Set unread count
 * @param state
 * @param {number} count
 */
export function setUnread(state, count) {
    state.unreadCount = count
}

/**
 * Set user settings
 * @param state
 * @param {Object[]} settings
 */
export function setSettings(state, settings) {
    state.settings = settings
}

/**
 * Set user settings
 * @param state
 * @param {Object[]} settings
 * @param {number} settings.id
 * @param {Object} settings.data
 * @param {boolean} settings.value
 */
export function setChangedSettings(state, settings) {
    state.changedSettings = settings
}

/**
 * Add or change single setting in changedSettings
 * @param state
 * @param {Object} setting
 * @param {number} setting.id
 * @param {Object} setting.data
 * @param {boolean} setting.value
 */
export function addOrChangeChangedSetting(state, setting) {
    const ind = state.changedSettings.findIndex(el => el.id === setting.id)
    if (ind !== -1) {
        state.changedSettings = state.changedSettings.splice(ind, 1)
    }
    state.changedSettings.push(setting)

}
