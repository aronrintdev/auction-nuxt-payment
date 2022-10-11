<template>
  <Button
      v-if="!fromDown"
      :class="{
        'read-button': !notification.read,
        'unread-button': notification.read,
        'text-decoration-underline': !isScreenXS,
        'mobile': isScreenXS
      }"
      class="mr-md-5 p-0 mr-2"
      size="sm"
      style="white-space: nowrap"
      variant="link"
      :disabled="readLoading"
      @click="read"
  >
    {{ !notification.read ? $t('notifications.mark_as_read') : $t('notifications.mark_as_unread') }}
  </Button>
</template>

<script>
import {mapActions} from 'vuex';
import {Button} from '~/components/common';
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'NotificationMarkAsRead',
  components: {Button},
  mixins: [screenSize],
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
      'readOne': 'notifications/readNotification',
      'unreadOne': 'notifications/unreadNotification'
    }),
    read() {
      this.readLoading = true
      const request = !this.notification.read ? this.readOne({notification_id: this.notification.id}) : this.unreadOne(this.notification.read.id)
      request.finally(() => {
        this.readLoading = false
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"

::v-deep.btn-link
  &.read-button
    color: $color-blue-1

  &.unread-button
    color: $color-gray-6

  &.mobile
    @include body-9
    font-family: $font-montserrat
    font-style: normal
    font-weight: $normal
    height: 15px
    margin-bottom: 3px

</style>