/**
 * Get notifications
 * @param state
 * @return {number}
 */
export function getNotifications(state) {
    return state.notifications
}

/**
 * Get unreadCount
 * @param state
 * @return {number}
 */
export function getUnreadCount(state) {
    return state.unreadCount
}

/**
 * Get settings
 * @param state
 * @return {number}
 */
export function getSettings(state) {
    return state.settings
}

/**
 * Get Changed Settings
 * @param state
 * @return {number}
 */
export function getChangedSettings(state) {
    return state.changedSettings
}
