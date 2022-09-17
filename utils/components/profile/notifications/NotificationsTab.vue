<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <h3 class="fs-18 fw-6 text-black mb-0">
        {{ $t('notifications.new') }}
        <span class="text-primary ml-2">{{ 3 }}</span>
      </h3>
      <ul class="formatted_ul d-inline-flex mt-2">
        <li v-for="item in notificationFilters" :key="item.value" :class="{ active: selectedStatus === item.value }"
            class="formatted_li" @click="onStatusSelect">
          <a class="nav-link"><span>{{ item.text }} ({{ notificationCounts[item.value] }})</span></a>
        </li>
      </ul>

      <Button
          class="mark-as-read btn-link"
          size="sm"
          variant="link"
      >
        <DoubleCheck class="mr-1"/>
        {{ $t('notifications.mark_all_read') }}
      </Button>
    </div>
    <div class="mt-4">
      <NotificationsSec></NotificationsSec>
    </div>
  </div>
</template>
<script>
import DoubleCheck from '~/assets/img/profile/notifications/notification-double-check.svg?inline'
import NotificationsSec from '~/components/profile/notifications/NotificationsSec'
import {Button} from '~/components/common';

export default {
  name: 'NotificationsTab',
  components: {DoubleCheck, NotificationsSec, Button},
  data() {
    return {
      selectedStatus: 'all',
      notificationCounts: {
        'all': 0,
        'unread': 0,
        'read': 0,
        'important': 0
      },
      notificationFilters: Object.keys(this.$t('notifications.filters')).map(key => {
        return {
          text: this.$t(`notifications.filters.${key}`),
          value: key,
        }
      }),
    }
  },
  methods: {
    onStatusSelect(status) {
      if (this.selectedStatus !== status)
        this.selectedStatus = status
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"

.formatted_ul
  list-style: none
  @include body-5

  li
    display: flex
    align-items: center


    a
      cursor: pointer
      color: $color-black-1
      padding: 0 0.5rem

    &::after
      content: ''
      display: block
      height: 10px
      width: 1px
      background-color: $light-gray-2

    &:last-child::after
      display: none

    &:first-child
      a
        padding-left: 0

::v-deep.mark-as-read.btn-link
  color: $color-blue-1

</style>