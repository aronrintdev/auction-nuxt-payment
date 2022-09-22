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
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex';
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
  computed: {
    ...mapGetters({
      'getSettings': 'notifications/getSettings'
    })
  },
  mounted() {
    this.fetchSettings()
  },
  methods: {
    ...mapActions({
      'fetchSettings': 'notifications/getUserSettings'
    }),
    getSingleSetting(key) {
      const setting = this.getSettings.filter(sett => sett.key === key)
      return setting.length ? JSON.parse(setting[0].extra) || {} : {}
    },
    settings(category) {
      return Object.keys(ALL_SETTINGS[this.tab][category])
          .map(key => _.merge(ALL_SETTINGS[this.tab][category][key], {data: this.getSingleSetting(ALL_SETTINGS[this.tab][category][key].key)}))
    }
  }
}
</script>