<template>
  <div class="notification-settings-section w-100 p-4">
    <b-row>
      <b-col md="5">
        <span class="title">{{title}}</span>
      </b-col>
      <b-col md="4" class="title-labels">
        <span v-if="preference"><span>{{$t('notifications.settings.notification_preferences')}}</span></span>
      </b-col>
      <b-col md="3">
        <b-row class="title-labels text-center pl-3">
          <b-col>{{$t('notifications.settings.in_app')}}</b-col>
          <b-col>{{$t('notifications.settings.email')}}</b-col>
          <b-col>{{$t('notifications.settings.text')}}</b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="mt-3">
      <NotificationSettingsItem v-for="item in items" :key="item.key" :settings="item"></NotificationSettingsItem>
    </div>
  </div>
</template>

<script>
import NotificationSettingsItem from '~/components/profile/notifications/NotificationSettingsItem';
export default {
  name: 'NotificationSettingsSection',
  components: {NotificationSettingsItem},
  props: {
    preference: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.notification-settings-section
  background: $color-white-1
  border: 1px solid $color-gray-29
  border-radius: 8px

.title
  @include body-3
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold
  color: $color-blue-2

.title-labels
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  color: $color-black-7

</style>