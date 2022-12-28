<template>
  <div
    :class="{
      'mt-4': !isScreenXS,
      'm-2': isScreenXS,
    }"
    class="notification-setting-main"
  >
    <div
      v-if="loading && getSettings.length === 0"
      class="d-flex align-items-center justify-content-center"
    >
      <Loader :loading="loading"></Loader>
    </div>
    <div v-else>
      <NotificationSettingsSection
        :items="settings()"
        :path="'all'"
        :preference="false"
        :title="$t('notifications.settings.all_communication')"
      >
        <template #extra>
          <div v-if="isScreenXS">
            <ItemDivider />
            <div class="d-flex align-items-center">
              <div>
                <div
                  :class="{ 'justify-content-between': isScreenXS }"
                  class="push-title d-flex align-items-center"
                >
                  {{ $t('notifications.push.title') }}
                </div>
                <div class="push-sub-title mt-2 mr-2">
                  {{ $t('notifications.push.desc') }}
                </div>
              </div>
              <NotificationSwitch
                :value="pushActive"
                class="mr-3"
                @change="activeChange"
              />
            </div>
          </div>
        </template>
      </NotificationSettingsSection>

      <div class="d-flex justify-content-center my-4">
        <NavGroup
          v-if="isVendor"
          :data="tabs"
          :value="currentTab"
          nav-key="notification-tabs"
          class="notification-setting-nav"
          @change="handlePageChange"
        />
      </div>

      <div>
        <NotificationSettingsTab :tab="currentTab" />
      </div>

      <div v-if="!isScreenXS" class="mt-5 buttons-sec">
        <Button
          :disabled="loading || changedSettings.length === 0"
          class="mr-2 btn-font"
          pill
          variant="dark-blue"
          @click="saveChanges"
          >{{ $t('common.save_changes') }}
        </Button>
        <Button
          :disabled="loading"
          class="btn-font"
          pill
          variant="outline-dark"
          @click="updateSettings"
          >{{ $t('common.discard_changes') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationSettingsSection from '~/components/profile/notifications/NotificationSettingsSection'
import NavGroup from '~/components/common/NavGroup'
import NotificationSettingsTab from '~/components/profile/notifications/NotificationSettingsTab'
import { ALL_SETTINGS } from '~/static/constants/notifications'
import { Button } from '~/components/common'
import Loader from '~/components/common/Loader'
import screenSize from '~/plugins/mixins/screenSize'
import ItemDivider from '~/components/profile/notifications/ItemDivider'
import NotificationSwitch from '~/components/profile/notifications/Switch'

export default {
  name: 'NotificationSettings',
  components: {
    NotificationSwitch,
    ItemDivider,
    Loader,
    NotificationSettingsTab,
    Button,
    NavGroup,
    NotificationSettingsSection,
  },
  mixins: [screenSize],
  data() {
    return {
      loading: false,
      currentTab: 'buying',
      oldSettings: [],
      tabs: [
        {
          label: this.$t('notifications.settings.tabs.buying'),
          value: 'buying',
        },
        {
          label: this.$t('notifications.settings.tabs.selling'),
          value: 'selling',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      changedSettings: 'notifications/getChangedSettings',
      getSettings: 'notifications/getSettings',
      pushActive: 'notifications/getPushNotificationsActive',
      isVendor: 'auth/isVendor',
    }),
  },
  methods: {
    ...mapActions({
      fetchSettings: 'notifications/getUserSettings',
      bulkEditNotificationSettings:
        'notifications/bulkEditNotificationSettings',
    }),
    handlePageChange(page) {
      this.currentTab = page
    },
    settings() {
      return Object.keys(ALL_SETTINGS.communication).map(
        (key) => ALL_SETTINGS.communication[key]
      )
    },
    updateSettings() {
      this.loading = true
      this.fetchSettings().finally(() => {
        this.$store.commit('notifications/setChangedSettings', [])
        this.$forceUpdate()
        this.loading = false
      })
    },
    activeChange(e) {
      this.$store.commit('notifications/setPushNotificationsActive', e)
    },
    saveChanges() {
      this.loading = true
      this.bulkEditNotificationSettings({ settings: this.changedSettings })
        .then((res) => {
          this.updateSettings()
          this.$toasted.success(res.data.message)
        })
        .catch((err) => {
          this.$toasted.error(err.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.notification-setting-main::v-deep
  .notification-setting-nav
    margin: 20px auto 18px auto
    width: 236px
    &.mobile
      width: 100%
    .btn-group
      height: 32px
      background-color: $color-gray-3
      button.btn
        @include body-6-regular
        font-family: $font-montserrat
        width: 103px
        padding-block: 1px
        &:not(.active)
          background-color: $color-gray-3
        &.active
          font-weight: $medium
  .buttons-sec
    button
      width: 217px

.push-title
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-black-1
  font-size: 16px

.push-sub-title
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-gray-5
  font-size: 13px
.btn-font
  font-family: $font-sp-pro
</style>
