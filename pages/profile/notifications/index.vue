<template>
  <client-only>
    <div
      :class="{
        'p-5': !isScreenXS,
        mobile: isScreenXS,
      }"
      class="profile-notification mb-2"
    >
      <MobileHeader v-if="isScreenXS && !onSettingsItemTab" :title="tabTitle">
        <template #actions>
          <div class="d-flex align-items-center">
            <filter-svg
              v-if="onNotifications"
              class="mr-3"
              role="button"
              @click="mobileFiltersOpen = !mobileFiltersOpen"
            ></filter-svg>
            <setting-svg
              v-if="onNotifications"
              role="button"
              @click="handlePageChange('Settings')"
            ></setting-svg>
            <close-svg
              v-if="onSettings"
              role="button"
              @click="handlePageChange('Notifications')"
            ></close-svg>
          </div>
        </template>
        <template #expanded-content>
          <div v-if="onNotifications" class="d-flex flex-column">
            <MobileSearchInput @input="searchChanged" />
            <div class="d-flex align-items-center justify-content-end">
              <NotificationMarkAllAsRead />
            </div>
          </div>
        </template>
      </MobileHeader>
      <div v-if="onSettings && !isScreenXS" class="title">
        {{ tabTitle }}
      </div>
      <NotificationFilters
        v-if="onNotifications && !isScreenXS"
        @filter="filtersChanged"
      />
      <NotificationMobileFilters
        v-if="onNotifications && isScreenXS"
        :open="mobileFiltersOpen"
        @closed="mobileFiltersOpen = false"
        @filter="filtersChanged"
      />
      <div v-if="!isScreenXS && !onSettingsItemTab" class="text-center mt-4">
        <NavGroup
          :data="tabs"
          :value="currentTab"
          nav-key="notification-tabs"
          class="notification-nav"
          @change="handlePageChange"
        />
      </div>
      <NotificationsTab v-if="onNotifications" @infinite="infiniteScroll" />
      <NotificationSettings v-if="onSettings" />
      <MobileNotificationSettingsTab v-if="onSettingsItemTab" />
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import { NavGroup } from '~/components/common'
import NotificationFilters from '~/components/profile/notifications/NotificationFilters'
import NotificationsTab from '~/components/profile/notifications/NotificationsTab'
import NotificationSettings from '~/components/profile/notifications/NotificationSettings'
import screenSize from '~/plugins/mixins/screenSize'
import MobileHeader from '~/components/mobile/MobileHeader'
import settingSvg from '~/assets/img/profile/notifications/settings.svg?inline'
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import closeSvg from '~/assets/img/icons/close.svg?inline'
import NotificationMarkAllAsRead from '~/components/profile/notifications/NotificationMarkAllAsRead'
import MobileSearchInput from '~/components/mobile/MobileSearchInput'
import NotificationMobileFilters from '~/components/profile/notifications/NotificationMobileFilters'
import MobileNotificationSettingsTab from '~/components/profile/notifications/MobileNotificationSettingsTab'
import { NOTIFICATION_PER_PAGE } from '~/static/constants'

export default {
  name: 'Notifications',
  components: {
    MobileNotificationSettingsTab,
    NotificationMobileFilters,
    MobileSearchInput,
    NotificationMarkAllAsRead,
    MobileHeader,
    NotificationSettings,
    NotificationsTab,
    NotificationFilters,
    NavGroup,
    settingSvg,
    filterSvg,
    closeSvg,
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      mobileFiltersOpen: false,
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
      NotificationTab: null,
      perPage: NOTIFICATION_PER_PAGE,
    }
  },
  computed: {
    ...mapGetters({
      currentTab: 'notifications/getTab',
      total: 'notifications/getTotal',
    }),
    tabTitle() {
      return this.onNotifications
        ? this.$t('notifications.title')
        : this.isScreenXS
        ? this.$t('notifications.push_notifications')
        : this.$t('notifications.notification_settings')
    },
    onSettings() {
      return this.currentTab === 'Settings'
    },
    onNotifications() {
      return this.currentTab === 'Notifications'
    },
    onSettingsItemTab() {
      return this.currentTab === 'SettingItemTab'
    },
  },
  methods: {
    handlePageChange(page) {
      this.$store.commit('notifications/setTab', page)
    },
    searchChanged(e) {
      this.filtersChanged({ search: e })
    },
    infiniteScroll(perPage) {
      this.perPage = perPage
      this.filtersChanged({})
    },
    filtersChanged(filters) {
      const allFilters = {
        from_year: filters.years ? filters.years[0] : null,
        to_year: filters.years ? filters.years[1] : null,
        search: filters.search || null,
        categories: filters.types || null,
        perPage: this.perPage,
      }
      this.$store.commit(
        'notifications/setSelectedStatus',
        filters.status || 'all'
      )
      this.$store.dispatch('notifications/filterChange', allFilters)
      this.mobileFiltersOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.profile-notification::v-deep
  &.mobile
    background-color: $color-white-1

  .notification-tabs
    max-width: 236px
    margin-bottom: 26px

  .title
    @include body-8
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium
  .notification-nav
    margin: 20px 0 18px 0
</style>
