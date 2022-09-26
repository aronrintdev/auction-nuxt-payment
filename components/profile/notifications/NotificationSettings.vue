<template>
  <div class="mt-4">
    <NotificationSettingsSection :items="settings()" :preference="false"
                                 :title="$t('notifications.settings.all_communication')"/>

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

    <div class="mt-5">
      <Button
          :disabled="loading"
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
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import NotificationSettingsSection from '~/components/profile/notifications/NotificationSettingsSection';
import NavGroup from '~/components/common/NavGroup';
import NotificationSettingsTab from '~/components/profile/notifications/NotificationSettingsTab';
import {ALL_SETTINGS} from '~/static/constants/notifications';
import {Button} from '~/components/common';

export default {
  name: 'NotificationSettings',
  components: {NotificationSettingsTab, Button, NavGroup, NotificationSettingsSection},
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
      'changedSettings': 'notifications/getChangedSettings'
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
    saveChanges() {
      console.log(this.changedSettings);
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

<style scoped>

</style>