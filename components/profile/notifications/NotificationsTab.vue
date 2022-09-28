<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <h3 class="fs-18 fw-6 text-black mb-0">
        {{ $t('notifications.new') }}
        <span class="text-primary ml-2">{{ newNotifications.length }}</span>
      </h3>
      <ul class="formatted_ul d-inline-flex mt-2">
        <li v-for="item in notificationFilters" :key="item.value"
            class="formatted_li mr-2" @click="onStatusSelect(item.value)">
          <a class="nav-link" :class="{ active: selectedStatus === item.value }"><span>{{ item.text }} ({{ notificationCounts[item.value] }})</span></a>
        </li>
      </ul>

      <NotificationMarkAllAsRead/>
    </div>
    <div class="mt-4">
      <div class="mt-3">
        <NotificationItem
            v-for="(notification, x) in newNotifications"
            :key="x"
            :notification="notification"
            action
            class="mt-2"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center mt-4">
        <h3 class="fs-18 fw-6 text-black mb-0">
          {{ $t('notifications.this_week') }}
          <span class="text-primary ml-2">{{ earlyNotifications.length }}</span>
        </h3>

      </div>
      <div class="mt-3">
        <NotificationItem
            v-for="(notification, x) in earlyNotifications"
            :key="x"
            :notification="notification"
            action
            class="mt-2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import dayjs from 'dayjs'
import NotificationItem from '~/components/header/NotificationItem';
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead';

export default {
  name: 'NotificationsTab',
  components: {NotificationMarkAllAsRead, NotificationItem},
  data() {
    return {
      readAllLoading: false,
      selectedStatus: 'all',
      notificationCounts: {
        'all': 0,
        'unread': 0,
        'read': 0,
        'important': 0
      },
      notificationFilters: Object.keys(this.$t('notifications.filters')).map(key => {
        return {
          text: this.$t(`notifications.filters.${key}`),
          value: key,
        }
      }),
    }
  },
  computed: {
    ...mapGetters({
      'notifications': 'notifications/getNotifications',
      'unread': 'notifications/getUnreadCount'
    }),
    newNotifications() {
      return this.filteredNotifications.filter((notification) => {
        return dayjs(Date.now()).diff(notification.created_at, 'day') <= 1
      })
    },
    earlyNotifications() {
      return this.filteredNotifications.filter((notification) => {
        const diff = dayjs(Date.now()).diff(notification.created_at, 'day')
        return diff <= 7 && diff > 1
      })
    },
    important() {
      return this.notifications.filter((notification) => {
        return notification.important === 1
      })
    },
    filteredNotifications() {
      switch (this.selectedStatus) {
        case 'unread':
          return this.readUnreadNotifications(false)
        case 'read':
          return this.readUnreadNotifications()
        case 'important':
          return this.important
        default:
          return this.notifications
      }
    }
  },
  watch:{
    notifications(val){
      this.updateCounts()
    }
  },
  mounted() {
    this.updateCounts()
  },
  methods: {
    ...mapActions({
      'readAll': 'notifications/readAllNotification'
    }),
    readUnreadNotifications(read = true) {
      return this.notifications.filter(notification => read ? notification.read : !notification.read)
    },
    updateCounts() {
      const currentUnread = this.readUnreadNotifications(false).length
      this.notificationCounts = {
        'all': this.notifications.length,
        'unread': currentUnread,
        'read': this.notifications.length - currentUnread,
        'important': this.important.length
      }
    },
    onStatusSelect(status) {
      if (this.selectedStatus !== status) {
        this.selectedStatus = status
      }
    },
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"

.formatted_ul
  list-style: none
  @include body-5

  li
    display: flex
    align-items: center

    a
      @include body-5
      font-family: $font-montserrat
      font-style: normal
      font-weight: $normal
      color: $color-gray-4
      cursor: pointer
      padding: 0 0.5rem

      &.active
        color: $color-black-1

    &::after
      content: ''
      display: block
      height: 10px
      width: 1px
      background-color: $light-gray-2

    &:last-child::after
      display: none

    &:first-child
      a
        padding-left: 0
</style>