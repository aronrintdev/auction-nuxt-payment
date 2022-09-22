<template>
  <div class="mt-4">
    <NotificationSettingsSection :items="settings()" :title="$t('notifications.settings.all_communication')" :preference="false"/>

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
          variant="blue"
          class="mr-2"
          pill
          :disabled="loading"
      >{{$t('common.save_changes')  }}
      </Button>
      <Button
          variant="outline-dark"
          pill
          :disabled="loading"
      >{{ $t('common.discard_changes')  }}
      </Button>
    </div>
  </div>
</template>

<script>
import NotificationSettingsSection from '~/components/profile/notifications/NotificationSettingsSection';
import NavGroup from '~/components/common/NavGroup';
import NotificationSettingsTab from '~/components/profile/notifications/NotificationSettingsTab';
import {ALL_SETTINGS} from '~/static/constants/notifications';
import {Button} from '~/components/common';
export default {
  name: 'NotificationSettings',
  components: {NotificationSettingsTab,Button, NavGroup, NotificationSettingsSection},
  data() {
    return {
      loading: false,
      currentTab: 'buying',
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
  methods: {
    handlePageChange(page) {
      this.currentTab = page
    },
    settings(){
      return Object.keys(ALL_SETTINGS.communication).map(key => ALL_SETTINGS.communication[key])
    }
  }
}
</script>

<style scoped>

</style>