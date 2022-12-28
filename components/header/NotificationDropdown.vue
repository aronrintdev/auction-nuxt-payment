<template>
  <b-dropdown
      id="notificationDropdown"
      ref="notificationDropdown"
      class="multi-select-dropdown"
      menu-class=""
      no-caret
      right
      @hidden="shown = false"
      @shown="shown = true"
  >
    <template #button-content>
      <NotificationIcon/>
    </template>

    <div class="content-top mx-3 d-flex align-items-center justify-content-between my-3">
      <span class="header">{{ $t('notifications.title') }}</span>
     <NotificationMarkAllAsRead/>
    </div>
    <div class="">
      <NotificationItem
          v-for="(notification, x) in notifications.slice(0,3)"
          :key="x"
          :notification="notification"
          action
          from-down
      />
    </div>
    <div>
      <Button
          block
          class="view-all-btn"
          variant="blue"
          @click="viewAll"
      >
        {{ $t('notifications.view_all') }}
      </Button>
    </div>
  </b-dropdown>
</template>

<script>
import {mapGetters} from 'vuex';
import NotificationIcon from '~/components/header/NotificationIcon';
import Button from '~/components/common/Button';
import NotificationItem from '~/components/header/NotificationItem';
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead';

export default {
  name: 'NotificationDropdown',
  components: {NotificationMarkAllAsRead, NotificationItem, Button, NotificationIcon},
  data() {
    return {
      shown: false,
    }
  },
  computed: {
    ...mapGetters({
      'notifications': 'notifications/getNotifications'
    }),
  },
  methods: {
    viewAll() {
      this.$refs.notificationDropdown.hide()
      this.$router.push({path: '/profile/notifications'})
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
#notificationDropdown::v-deep
  button
    background-color: transparent
    border: none
    padding: 0

  .dropdown-menu
    padding: 0
    border-radius: 20px
    border: 0.5px solid $color-gray-23
    box-shadow: 0 4px 4px rgba($color-black-1, 0.25)
    width: 350px
    margin-top: 10px

  .mark-as-read
    @include body-5
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $normal
    color: $color-blue-1

  .header
    @include body-4
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $medium

  .view-all-btn
    height: 62px
    background-color: $color-blue-20
    border-radius: 0 0 20px 20px
</style>
