<template>
  <div>
    <div :class="{'mt-4': !isScreenXS}" class="d-flex justify-content-between align-items-center">
      <h3 v-if="newNotifications.length" :class="{'px-4': isScreenXS}"
          class="fs-16 fw-6 text-black mb-0"
      >
        {{ $t('notifications.new') }}
        <span v-if="!isScreenXS" class="text-primary ml-2">{{ newNotifications.length }}</span>
      </h3>
      <ul v-if="!isScreenXS" class="formatted_ul d-inline-flex mt-2">
        <li v-for="item in notificationFilters" :key="item.value"
            class="formatted_li mr-2" @click="onStatusSelect(item.value)">
          <a :class="{ active: selectedStatus === item.value }" class="nav-link"><span>{{
              item.text
            }} ({{ notificationCounts[item.value] }})</span></a>
        </li>
      </ul>

      <NotificationMarkAllAsRead v-if="!isScreenXS"/>
    </div>
    <div :class="{'mt-4': !isScreenXS}">
      <div :class="{'mt-3': !isScreenXS}">
        <NotificationItem
            v-for="(notification, x) in newNotifications"
            :key="x"
            :class="{'mt-2': !isScreenXS}"
            :notification="notification"
            action
        />
      </div>
      <div :class="{'px-4': isScreenXS, 'mt-4': !isScreenXS}"
           class="d-flex justify-content-between align-items-center">
        <h3 v-if="earlyNotifications.length" class="fs-16 fw-6 text-black mb-0">
          {{ $t('notifications.this_week') }}
          <span v-if="!isScreenXS" class="text-primary ml-2">{{ earlyNotifications.length }}</span>
        </h3>

      </div>
      <div :class="{'mt-3': !isScreenXS}">
        <NotificationItem
            v-for="(notification, x) in earlyNotifications"
            :key="x"
            :class="{'mt-2': !isScreenXS}"
            :notification="notification"
            action
        />
      </div>

      <div :class="{'px-4': isScreenXS, 'mt-4': !isScreenXS}"
           class="d-flex justify-content-between align-items-center">
        <h3 v-if="olderNotifications.length" class="fs-16 fw-6 text-black mb-0">
          {{ $t('notifications.older') }}
          <span v-if="!isScreenXS" class="text-primary ml-2">{{ olderNotifications.length }}</span>
        </h3>

      </div>
      <div :class="{'mt-3': !isScreenXS}">
        <NotificationItem
            v-for="(notification, x) in olderNotifications"
            :key="x"
            :class="{'mt-2': !isScreenXS}"
            :notification="notification"
            action
        />
      </div>
    </div>
    <infinite-loading ref="loader" :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="no-more"></div>
    </infinite-loading>

  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import {mapActions, mapGetters} from 'vuex';
import dayjs from 'dayjs'
import NotificationItem from '~/components/header/NotificationItem';
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead';
import screenSize from '~/plugins/mixins/screenSize';
import {NOTIFICATION_PER_PAGE} from '~/static/constants';

export default {
  name: 'NotificationsTab',
  components: {NotificationMarkAllAsRead, NotificationItem, InfiniteLoading},
  mixins: [screenSize],
  data() {
    return {
      loaderState: null,
      perPage: NOTIFICATION_PER_PAGE,
      infiniteId: +new Date(),
      readAllLoading: false,
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
      'filters': 'notifications/getNotificationFilters',
      'unread': 'notifications/getUnreadCount',
      'total': 'notifications/getTotal',
      'selectedStatus': 'notifications/getSelectedStatus'
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
    olderNotifications() {
      return this.filteredNotifications.filter((notification) => {
        const diff = dayjs(Date.now()).diff(notification.created_at, 'day')
        return diff > 8
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
  watch: {
    notifications(val) {
      this.updateCounts()
      if (this.loaderState) {
        this.loaderState.loaded()
      }
    },
    filters: {
      deep: true,
      handler(val) {
        this.perPage = val.perPage
        if (NOTIFICATION_PER_PAGE === this.perPage) {
          this.infiniteId += 1
        }
      }
    }
  },
  mounted() {
    this.updateCounts()
  },
  methods: {
    ...mapActions({
      'readAll': 'notifications/readAllNotification'
    }),
    infiniteHandler($state) {
      this.loaderState = $state
      if (this.total > this.perPage) {
        this.perPage += NOTIFICATION_PER_PAGE
        this.$emit('infinite', this.perPage)
      } else {
        $state.complete()
      }
    },
    readUnreadNotifications(read = true) {
      return this.notifications.filter(notification => read ? notification.read : !notification.read)
    },
    updateCounts() {
      const currentUnread = this.readUnreadNotifications(false).length
      this.notificationCounts = {
        'all': this.total,
        'unread': currentUnread,
        'read': this.total - currentUnread,
        'important': this.important.length
      }
    },
    onStatusSelect(status) {
      if (this.selectedStatus !== status) {
        this.$store.commit('notifications/setSelectedStatus', status)
      }
    },
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"

.last-elem
  height: 10px

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
