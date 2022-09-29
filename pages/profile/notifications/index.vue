<template>
  <div :class="{
        'p-5': !isScreenXS,
      }"
       class="profile-notification mb-2">
    <MobileHeader v-if="isScreenXS" :title="tabTitle">
      <template #actions>
        <div class="d-flex align-items-center">
          <filter-svg v-if="!onSettings" class="mr-3" role="button"
                      @click="mobileFiltersOpen = !mobileFiltersOpen"></filter-svg>
          <setting-svg v-if="!onSettings" role="button" @click="handlePageChange('Settings')"></setting-svg>
          <close-svg v-if="onSettings" role="button" @click="handlePageChange('Notifications')"></close-svg>
        </div>
      </template>
      <template #expanded-content>
        <div class="d-flex flex-column">
          <MobileSearchInput @input="searchChanged"/>
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
    <NotificationMobileFilters v-if="currentTab === 'Notifications' && isScreenXS" :open="mobileFiltersOpen"
                               @closed="mobileFiltersOpen = false" @filter="filtersChanged"/>
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
import closeSvg from '~/assets/img/icons/close.svg?inline'
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import NotificationMobileFilters from '~/components/profile/notifications/NotificationMobileFilters';

export default {
  name: 'Notifications',
  components: {
    NotificationMobileFilters,
    MobileSearchInput,
    NotificationMarkAllAsRead,
    MobileHeader, NotificationSettings, NotificationsTab, NotificationFilters, NavGroup, settingSvg, filterSvg, closeSvg
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      mobileFiltersOpen: false,
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
    tabTitle() {
      return this.currentTab === 'Notifications' ? this.$t('notifications.title') : this.$t('notifications.notification_settings')
    },
    onSettings() {
      return this.currentTab === 'Settings'
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentTab = page
    },
    searchChanged(e) {
      this.filtersChanged({search: e})
    },
    filtersChanged(filters) {
      const allFilters = {
        from_year: filters.years ? filters.years[0] : null,
        to_year: filters.years ? filters.years[1] : null,
        search: filters.search || null,
        categories: filters.types || null
      }
      this.$store.commit('notifications/setSelectedStatus', filters.status || 'all')
      this.$store.dispatch('notifications/filterChange', allFilters)
      this.mobileFiltersOpen = false
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