<template>
  <div :class="{
    'mt-4': !isScreenXS,
    'm-2': isScreenXS
  }">
    <div v-if="loading && getSettings.length === 0" class="d-flex align-items-center justify-content-center">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-else>
      <NotificationSettingsSection
          :items="settings()"
          :path="'all'"
          :preference="false"
          :title="$t('notifications.settings.all_communication')">
        <template #extra>
          <div v-if="isScreenXS">
            <ItemDivider/>
            <div class="d-flex align-items-center ">
              <div>
                <div :class="{'justify-content-between': isScreenXS}" class="push-title d-flex align-items-center ">
                  {{ $t('notifications.push.title') }}
                </div>
                <div class="push-sub-title mt-2 mr-2">{{ $t('notifications.push.desc') }}</div>
              </div>
              <NotificationSwitch :value="pushActive"
                                  class="mr-3"
                                  @change="activeChange"/>
            </div>
          </div>
        </template>
      </NotificationSettingsSection>

      <div class="text-center my-4">
        <NavGroup
            :data="tabs"
            :value="currentTab"
            nav-key="notification-tabs"
            @change="handlePageChange"
        />
      </div>

      <div>
        <NotificationSettingsTab :tab="currentTab"/>
      </div>

      <div v-if="!isScreenXS" class="mt-5">
        <Button
            :disabled="loading || changedSettings.length === 0"
            class="mr-2"
            pill
            variant="blue"
            @click="saveChanges"
        >{{ $t('common.save_changes') }}
        </Button>
        <Button
            :disabled="loading"
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
import {mapActions, mapGetters} from 'vuex';
import NotificationSettingsSection from '~/components/profile/notifications/NotificationSettingsSection';
import NavGroup from '~/components/common/NavGroup';
import NotificationSettingsTab from '~/components/profile/notifications/NotificationSettingsTab';
import {ALL_SETTINGS} from '~/static/constants/notifications';
import {Button} from '~/components/common';
import Loader from '~/components/common/Loader';
import screenSize from '~/plugins/mixins/screenSize';
import ItemDivider from '~/components/profile/notifications/ItemDivider';
import NotificationSwitch from '~/components/profile/notifications/Switch';

export default {
  name: 'NotificationSettings',
  components: {
    NotificationSwitch,
    ItemDivider, Loader, NotificationSettingsTab, Button, NavGroup, NotificationSettingsSection
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      'changedSettings': 'notifications/getChangedSettings',
      'getSettings': 'notifications/getSettings',
      'pushActive': 'notifications/getPushNotificationsActive'
    })
  },
  methods: {
    ...mapActions({
      'fetchSettings': 'notifications/getUserSettings',
      'bulkEditNotificationSettings': 'notifications/bulkEditNotificationSettings',
    }),
    handlePageChange(page) {
      this.currentTab = page
    },
    settings() {
      return Object.keys(ALL_SETTINGS.communication).map(key => ALL_SETTINGS.communication[key])
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
      this.bulkEditNotificationSettings({settings: this.changedSettings}).then(res => {
        this.updateSettings()
        this.$toasted.success(res.data.message)
      }).catch(err => {
        this.$toasted.error(err.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.push-title
  @include body-13
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  color: $color-black-1

.push-sub-title
  @include body-20
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-gray-5
</style>
