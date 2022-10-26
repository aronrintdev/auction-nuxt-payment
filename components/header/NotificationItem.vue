<template>
  <client-only>
    <div :class="{
    read: !!notification.read,
    'from-down': fromDown,
    'border-bottom p-0 px-3': isScreenXS,
    }" class="notification-item">
      <div
          class=" d-flex align-items-center px-2">
        <div :class="{'image-prefix': !fromDown}" class="image d-flex justify-content-center align-items-center">
          <favoriteOutline v-if="!notification.important && !fromDown" class="mr-1" role="button"></favoriteOutline>
          <favorite-filled v-if="notification.important && !fromDown" class="mr-1" role="button"></favorite-filled>
          <div class="image-box d-flex align-items-center justify-content-center">
            <img v-if="notification.image" :src="notification.image" class="m-2"
                 height="50px" width="50">
          </div>
        </div>
        <div class="body d-flex flex-column flex-grow-1 py-3">
          <div :class="{'body-lighter': fromDown}" class="body-text d-flex align-items-center">
            <img v-if="!fromDown && notification.icon_link"
                 :src="notification.icon_link" class="mr-2 icon-image">
            <p class="mb-0">
              <span :class="{'mobile-subject': isScreenXS}">{{ notification.body }}</span>
              <span v-if="isScreenXS" class="ml-1 remaining-time">
                {{ notificationDate }}
              </span>
            </p>

            <b-link
                v-if="notification.link && notification.link_text && !fromDown && !isScreenXS"
                :href="notification.link"
                class="underline ml-2"
            >- {{ notification.link_text }}
            </b-link>

          </div>
          <div v-if="!isScreenXS" class="body-secondary mt-1">
            {{ notificationDate }}
          </div>
        </div>
        <div v-if="!isScreenXS" class="dot d-flex justify-content-center align-items-center m-2">
          <NotificationMarkAsRead :from-down="fromDown" :notification="notification"/>
          <notification-unread v-if="!notification.read"/>
        </div>
      </div>
      <div v-if="isScreenXS" class="d-flex align-items-center justify-content-end">
        <NotificationMarkAsRead :from-down="fromDown" :notification="notification"/>
      </div>
    </div>
  </client-only>
</template>

<script>
import notificationUnread from '~/assets/img/profile/notifications/notification-unread-dot.svg?inline'
import favoriteOutline from '~/assets/img/profile/notifications/notification-star-outline.svg?inline'
import favoriteFilled from '~/assets/img/profile/notifications/notification-star-filled.svg?inline'
import NotificationMarkAsRead from '~/components/profile/notifications/NotificationMarkAsRead';
import screenSize from '~/plugins/mixins/screenSize';
import {fromNow} from '~/utils/string'

export default {
  name: 'NotificationItem',
  components: {NotificationMarkAsRead, notificationUnread, favoriteOutline, favoriteFilled},
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
  computed: {
    notificationDate() {
      return !this.isScreenXS ?
          `${new Date(this.notification.created_at).toDateString()} ${this.$t('notifications.at')} ${new Date(this.notification.created_at).toLocaleTimeString()}`
          : fromNow(this.notification.created_at)
    }
  },

}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.notification-item::v-deep
  background: $color-white-1
  box-shadow: 0 1px 5px rgba($color-black-1, 0.15)
  padding-block: 10px

  &.border-bottom
    box-shadow: none
    border-bottom: 0.5px solid $light-gray-2

  .remaining-time
    @include body-18
    font-family: $font-montserrat
    font-style: normal
    font-weight: $regular
    color: $color-gray-5

  .mobile-subject
    @include body-9
    font-family: $font-montserrat
    font-style: normal
    font-weight: $regular
    color: $color-black-1

  .image-box
    width: 66px
    height: 66px

  .icon-image
    max-width: 35px
    max-height: 25px

  &.from-down
    border-top: 0.5px solid $light-gray-2
    background: none
    box-shadow: none
    padding-block: 0


  .image-prefix
    padding-inline: 5px 10px

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
