<template>
  <div class="profile-notification p-5">
    <div class="title">
      {{ tabTitle }}
    </div>
    <NotificationFilters v-if="currentTab === 'Notifications'" @filter="filtersChanged"/>

    <div class="text-center mt-4">
      <NavGroup
          :data="tabs"
          :value="currentTab"
          nav-key="notification-tabs"
          @change="handlePageChange"
      />
    </div>
    <NotificationsTab v-if="currentTab === 'Notifications'"/>
    <NotificationSettings v-if="currentTab === 'Settings'"/>
  </div>
</template>

<script>
import {NavGroup} from '~/components/common';
import NotificationFilters from '~/components/profile/notifications/NotificationFilters';
import NotificationsTab from '~/components/profile/notifications/NotificationsTab';
import NotificationSettings from '~/components/profile/notifications/NotificationSettings';

export default {
  name: 'Notifications',
  components: {NotificationSettings, NotificationsTab, NotificationFilters, NavGroup},
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
  computed: {
    tabTitle(){
      return this.currentTab === 'Notifications'? this.$t('notifications.title'):  this.$t('notifications.notification_settings')
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