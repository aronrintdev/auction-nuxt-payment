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
    getSingleSetting() {
      return key => {
        const setting = this.getSettings.filter(sett => sett.key === key)
        return setting.length ? JSON.parse(setting[0].extra) || {} : {}
      }
    },
    ...mapGetters({
      'getSettings': 'notifications/getSettings'
    }),
    settings() {
      return category => {
        return Object.keys(ALL_SETTINGS[this.tab][category])
            .map(key => {
              return {
                ...ALL_SETTINGS[this.tab][category][key],
                ...{data: {...ALL_SETTINGS[this.tab][category][key].data, ...this.getSingleSetting(ALL_SETTINGS[this.tab][category][key].key)}}
              }
            })
      }
    }
  },
  mounted() {
    this.fetchSettings()
  },
  methods: {
    ...mapActions({
      'fetchSettings': 'notifications/getUserSettings'
    })
  }
}
</script>