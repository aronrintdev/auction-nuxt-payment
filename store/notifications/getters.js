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
 * get unread count
 * @param state
 * @param {number} total
 */
export function getTotal(state, total) {
  return state.total
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


/**
 * Get notification filters
 * @param state
 * @return {number}
 */
export function getNotificationFilters(state) {
  return state.notificationFilters
}

/**
 * Get tab
 * @param state
 * @return {number}
 */
export function getTab(state) {
  return state.tab
}

/**
 * Get push notification activity
 * @param state
 * @return {number}
 */
export function getPushNotificationsActive(state) {
  return state.isPushNotificationsActive
}


/**
 * Get selected status
 * @param state
 * @return {number}
 */
export function getSelectedStatus(state) {
  return state.selectedStatus
}


/**
 * Get selected setting
 * @param state
 * @return {number}
 */
export function getSelectedSetting(state) {
  return state.selectedNotificationSetting
}
