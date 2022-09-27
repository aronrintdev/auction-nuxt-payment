<template>
  <Button
      class="mark-as-read btn-link"
      size="sm"
      variant="link"
      :disabled="readAllLoading"
      @click="markAllAsRead"
  >
    <DoubleCheck class="mr-1"/>
    {{ $t('notifications.mark_all_read') }}
  </Button>
</template>

<script>
import {mapActions} from 'vuex';
import DoubleCheck from '~/assets/img/profile/notifications/notification-double-check.svg?inline'
import {Button} from '~/components/common';
export default {
  name: 'NotificationMarkAllAsRead',
  components:{DoubleCheck, Button},
  data() {
    return {
      readAllLoading: false
    }
  },
  methods: {
    ...mapActions({
      'readAll': 'notifications/readAllNotification'
    }),
    markAllAsRead() {
      this.readAllLoading = true
      this.readAll().finally(() => {
        this.readAllLoading = false
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"

::v-deep.mark-as-read.btn-link
  color: $color-blue-1
</style>