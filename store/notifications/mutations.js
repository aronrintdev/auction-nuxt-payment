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
