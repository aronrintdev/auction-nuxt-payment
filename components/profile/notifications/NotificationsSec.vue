<template>
  <div>
    <section class="mt-3">
      <NotificationItem
        v-for="(notification, x) in newNotifications"
        :key="x"
        :notification="notification"
        action
        class="mt-2"
      />
    </section>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <h3 class="fs-18 fw-6 text-black mb-0">
        {{ $t('notifications.this_week') }}
        <span class="text-primary ml-2">{{ earlyNotifications.length }}</span>
      </h3>
    </div>
    <section class="mt-3">
      <NotificationItem
        v-for="(notification, x) in earlyNotifications"
        :key="x"
        :notification="notification"
        action
        class="mt-2"
      />
    </section>
  </div>
</template>

<script>
import NotificationItem from '~/components/header/NotificationItem'

export default {
  name: 'NotificationsSec',
  components: { NotificationItem },
  data() {
    return {
      // TODO
      notifications: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, deleniti!',
          read: false,
          favorite: false,
          category: 'order',
          status: 'DELIVERED',
          type: 'new',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, deleniti!',
          read: false,
          favorite: true,
          category: 'order',
          status: 'FAILED',
          type: 'new',
        },
        {
          text: 'There is only one day left to approve your Jordan 4 Retro (2021) trade',
          read: true,
          favorite: false,
          url: '/profile/wish-lists',
          category: 'trade',
          type: 'new',
        },
        {
          text: 'Trade offer accepted',
          category: 'order',
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
        {
          text: 'Order has been delivered',
          category: 'order',
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, deleniti!',
          category: 'order',
          favorite: false,
          url: '#',
          type: 'earlier',
        },
        {
          text: 'An item you have saved in your Wishlist is out of stock',
          category: 'wishlist',
          read: true,
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
        {
          text: 'There is only one day left to approve your Jordan 4 Retro (2021) trade',
          url: '/profile/wish-lists',
          category: 'trade',
          favorite: false,
          type: 'earlier',
        },
        {
          text: 'Order has been delivered',
          category: 'order',
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
        {
          text: 'Order has been delivered',
          category: 'order',
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
        {
          text: 'Order has been delivered',
          category: 'order',
          favorite: false,
          url: '/profile/wish-lists',
          type: 'earlier',
        },
      ],
    }
  },
  computed: {
    newNotifications() {
      return this.notifications.filter((notification) => {
        return notification.type === 'new'
      })
    },
    earlyNotifications() {
      return this.notifications.filter((notification) => {
        return notification.type === 'earlier'
      })
    },
  },
  methods: {
    markAsRead(index) {
      this.newNotifications[index].read = true
    },
    markAllAsRead() {
      this.newNotifications.forEach((notification) => {
        notification.read = true
      })
    },
  },
}
</script>
