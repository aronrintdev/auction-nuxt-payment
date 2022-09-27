<template>
  <client-only>
    <div :class="{
    read: !!notification.read,
    'from-down': fromDown
    }"
         class="notification-item d-flex align-items-center px-2">
      <div :class="{'image-prefix': !fromDown}" class="image d-flex justify-content-center align-items-center">
        <favoriteOutline v-if="!notification.important && !fromDown" class="mr-1"></favoriteOutline>
        <favorite-filled v-if="notification.important && !fromDown" class="mr-1"></favorite-filled>
        <img :src="'https://images.deadstock.co/products/sneakers/DD1399-102/800xAUTO/IMG01.jpg'" class="m-2"
             width="50">
      </div>
      <div class="body d-flex flex-column flex-grow-1 py-3">
        <div :class="{'body-lighter': fromDown}" class="body-text d-flex align-items-center">
          <img v-if="!fromDown && notificationTitleImage()"
               :src="require(`~/assets/img/profile/notifications/${notificationTitleImage()}`)" class="mr-1">
          {{ notification.subject }}
          <b-link
              v-if="notification.link && !fromDown"
              :href="notification.link"
              class="underline ml-2"
          >- {{ notificationCategory(notification.type) }}
          </b-link>
        </div>
        <div class="body-secondary mt-1">
          {{ notificationDate }}
        </div>
      </div>
      <div class="dot d-flex justify-content-center align-items-center m-2">
        <b-btn
            v-if="!fromDown && !notification.read"
            class="text-decoration-underline mr-md-5 p-0 mr-2"
            size="sm"
            style="white-space: nowrap"
            variant="link"
        >
          {{ $t('notifications.mark_as_read') }}
        </b-btn>
        <notification-unread v-if="!notification.read"/>
      </div>
    </div>
  </client-only>

</template>

<script>
import _ from 'lodash';
import notificationUnread from '~/assets/img/profile/notifications/notification-unread-dot.svg?inline'
import favoriteOutline from '~/assets/img/profile/notifications/notification-star-outline.svg?inline'
import favoriteFilled from '~/assets/img/profile/notifications/notification-star-filled.svg?inline'
import {NOTIFICATION_TYPES} from '~/static/constants/notifications';

export default {
  name: 'NotificationItem',
  components: {notificationUnread, favoriteOutline, favoriteFilled},
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
      NOTIFICATION_TYPES,
    }
  },
  computed: {
    notificationDate(){
      return `${new Date(this.notification.created_at).toDateString()} ${this.$t('notifications.at')} ${new Date(this.notification.created_at).toLocaleTimeString()}`
    }
  },
  methods: {
    notificationTitleImage() {
      const image = _.get(this.NOTIFICATION_TYPES, `${this.notification.category}.${this.notification.status}`)
      return image ? image.icon : false
    },
    notificationCategory(category) {
      // TODO change it when new notification structure introduced
      return category === 'trade' ? 'Go to Trade Page' : (category === 'order' ? 'View Order' : 'Check out more options in your Wishlist')
    },
  }

}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.notification-item::v-deep
  background: $color-white-1
  box-shadow: 0 1px 5px rgba($color-black-1, 0.15)
  padding-block: 10px


  &.from-down
    border-top: 0.5px solid $light-gray-2
    background: none
    box-shadow: none
    padding-block: 0


  .image-prefix
    padding-inline: 5px 20px

  &.read
    background-color: $color-white-7

  .body-text
    @include body-5
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $medium
    color: $color-black-1

    &.body-lighter
      font-weight: $normal

  .body-secondary
    @include body-9
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $normal
    color: $color-gray-4
</style>