<template>
  <Button
      v-if="!fromDown && !notification.read"
      class="text-decoration-underline mr-md-5 p-0 mr-2 read-button"
      size="sm"
      style="white-space: nowrap"
      variant="link"
      :disabled="readLoading"
      @click="read"
  >
    {{ $t('notifications.mark_as_read') }}
  </Button>
</template>

<script>
import {mapActions} from 'vuex';
import {Button} from '~/components/common';
export default {
  name: 'NotificationMarkAsRead',
  components:{Button},
  props: {
    notification: {
      type: Object,
      required: true
    },
    fromDown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      readLoading: false
    }
  },
  methods: {
    ...mapActions({
      'readOne': 'notifications/readNotification'
    }),
    read() {
      this.readLoading = true
      this.readOne({notification_id: this.notification.id}).finally(() => {
        this.readLoading = false
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"

::v-deep.read-button.btn-link
  color: $color-blue-1
</style>