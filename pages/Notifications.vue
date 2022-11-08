<template>
  <div class="wrapper">
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="padding-top: 110px">
      <div class="notifications">
        <h2>{{ $t('profile_menu.notifications') }}</h2>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
        >
          <div class="subject">{{ notification.subject }}</div>
          <div class="body">{{ notification.body }}</div>
          <div class="time-diff">
            {{ new Date(notification.created_at) | diffForHumans }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Notifications',
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      user_id: null,
      notifications: [],
      notificationReceived: null,
    }
  },
  mounted() {
    this.notificationReceived = (msg) => {
      this.notifications.unshift(msg)
      localStorage.setItem('notification_last_read', msg.created_at)
      this.$root.$emit('notification-all-read')
    }
    this.$root.$on('notification-received', this.notificationReceived)
    this.$axios
      .get('/notifications')
      .then((response) => {
        this.notifications = response.data
        if (this.notifications[0]) {
          localStorage.setItem(
            'notification_last_read',
            this.notifications[0].created_at
          )
          this.$root.$emit('notification-all-read')
        }
      })
      .catch(() => {})
  },
  beforeDestroy() {
    this.$root.$off('notification-received', this.notificationReceived)
  },
}
</script>
