<template>
  <div :class="{
        'p-5': !isScreenXS,
      }"
       class="profile-notification mb-2">
    <MobileHeader v-if="isScreenXS" :title="tabTitle">
      <template #actions>
        <div class="d-flex align-items-center">
          <filter-svg class="mr-3" role="button"></filter-svg>
          <setting-svg role="button"></setting-svg>
        </div>
      </template>
      <template #expanded-content>
        <div class="d-flex flex-column">
          <MobileSearchInput/>
          <div class="d-flex align-items-center justify-content-end">
            <NotificationMarkAllAsRead/>
          </div>
        </div>
      </template>
    </MobileHeader>
    <div v-else class="title">
      {{ tabTitle }}
    </div>
    <NotificationFilters v-if="currentTab === 'Notifications' && !isScreenXS" @filter="filtersChanged"/>

    <div v-if="!isScreenXS" class="text-center mt-4">
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
import screenSize from '~/plugins/mixins/screenSize';
import MobileHeader from '~/components/mobile/MobileHeader';
import settingSvg from '~/assets/img/profile/notifications/settings.svg?inline'
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';

export default {
  name: 'Notifications',
  components: {
    MobileSearchInput,
    NotificationMarkAllAsRead,
    MobileHeader, NotificationSettings, NotificationsTab, NotificationFilters, NavGroup, settingSvg, filterSvg
  },
  mixins: [screenSize],
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
      const allFilters = {
        from_year: filters.years? filters.years[0]: null,
        to_year: filters.years? filters.years[1]: null,
        search: filters.search,
        categories: filters.types
      }


      this.$store.dispatch('notifications/filterChange', allFilters)
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