<template>
  <div class="profile-notification p-5">
    <div class="title">
      {{ $t('notifications.title') }}
    </div>
    <NotificationFilters @filter="filtersChanged"/>

    <div class="text-center">
      <NavGroup
          :data="tabs"
          :value="currentTab"
          nav-key="notification-tabs"
          @change="handlePageChange"
      />
    </div>
    <NotificationsTab v-if="currentTab === 'Notifications'"/>
  </div>
</template>

<script>
import {NavGroup} from '~/components/common';
import NotificationFilters from '~/components/profile/notifications/NotificationFilters';
import NotificationsTab from '~/components/profile/notifications/NotificationsTab';

export default {
  name: 'Notifications',
  components: {NotificationsTab, NotificationFilters, NavGroup},
  layout: 'Profile',
  data() {
    return {
      currentTab: 'Notifications',
      tabs: [
        {
          label: this.$t('notifications.title'),
          value: 'Notifications',
        },
        {
          label: this.$t('notifications.title_settings'),
          value: 'Settings',
        },
      ],
      NotificationTab: null
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentTab = page
    },
    filtersChanged(filters) {

    }
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.profile-notification
  .title
    @include body-16
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium

</style>