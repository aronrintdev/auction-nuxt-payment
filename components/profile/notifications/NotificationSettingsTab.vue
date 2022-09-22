<template>
  <div>
    <div class="mt-3">
      <NotificationSettingsSection :items="settings('shop')" :title="$t('notifications.settings.shop')"/>
    </div>
    <div class="mt-3">
      <NotificationSettingsSection :items="settings('trade')" :title="$t('notifications.settings.trade')"/>
    </div>
    <div class="mt-3">
      <NotificationSettingsSection :items="settings('auction')" :title="$t('notifications.settings.auction')"/>
    </div>
  </div>
</template>

<script>
import NotificationSettingsSection from '~/components/profile/notifications/NotificationSettingsSection';
import {ALL_SETTINGS} from '~/static/constants/notifications';
export default {
  name: 'NotificationSettingsTab',
  components: {NotificationSettingsSection},
  props: {
    tab: {
      type: String,
      default: 'buying'
    }
  },
  methods: {
    settings(category){
      return Object.keys(ALL_SETTINGS[this.tab][category]).map(key => ALL_SETTINGS[this.tab][category][key])
    }
  }
}
</script>