export default {
  methods: {
    notificationSubscriptions() {
      if (window.Echo.connector.pusher.connection.state !== 'connected') {
        window.Echo.connector.pusher.connect()
      }
      this.leaveChannels()
      // single user subscriptions
      window.Echo.private(`notifications.single.${this.$auth.user.id}`).listen('NotificationAdded', (not) => {
        this.toastNotification(not[0])
      })
      // global notification subscriptions
      window.Echo.channel('notifications.global').listen('NotificationAdded', (not) => {
        this.toastNotification(not[0])
      })
      // Role Based subscriptions
      this.$auth.user.roles.forEach(role => {
        console.log(role.name.replace(/\s/g, ''));
        window.Echo.private(`notifications.role.${role.name.replace(/\s/g, '')}`).listen('NotificationAdded', (not) => {
          this.toastNotification(not[0])
        })
      })
    },
    leaveChannels() {
      window.Echo.leave(`notifications.single.${this.$auth.user.id}`)
      window.Echo.leave('notifications.global')
      this.$auth.user.roles.forEach(role => {
        window.Echo.leave(`notifications.role.${role.name.replace(/\s/g, '')}`)
      })
    },
    toastNotification(notification) {
      if (this.isScreenXS) {
        if (this.pushActive) {
          this.$toasted.success(`New Notification: ${notification.subject}`)
        }
      } else {
        this.$toasted.success(`New Notification: ${notification.subject}`)
      }
      // update notifications
      this.$store.dispatch('notifications/getNotifications')
      this.$store.dispatch('notifications/getUnreadCount')
    },
    disconnectSocket() {
      window.Echo.disconnect() // disconnect realtime notification channels
    },
  }
}
