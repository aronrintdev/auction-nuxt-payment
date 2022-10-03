export default function () {
    return {
        notifications: [],
        notificationFilters: {
          from_year: null,
          to_year: null,
          search: null,
          categories: []
        },
      settings: [],
      oldSettings: [],
      changedSettings: [],
      unreadCount: 0,
      selectedStatus: 'all',
      tab: 'Notifications',
      selectedNotificationSetting: null,
      isPushNotificationsActive: false,
    }
}
