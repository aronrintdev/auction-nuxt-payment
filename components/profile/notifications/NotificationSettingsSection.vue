<template>
  <div :class="{
    'mobile p-3': isScreenXS,
    'p-4': !isScreenXS
  }"
       class="notification-settings-section w-100">
    <b-row>
      <b-col md="5" sm="12">
        <span class="title">{{ title }}</span>
      </b-col>
      <b-col v-if="!isScreenXS" class="title-labels" md="4">
        <span v-if="preference"><span>{{ $t('notifications.settings.notification_preferences') }}</span></span>
      </b-col>
      <b-col v-if="!isScreenXS" md="3">
        <b-row class="title-labels text-center pl-3">
          <b-col>{{ $t('notifications.settings.in_app') }}</b-col>
          <b-col>{{ $t('notifications.settings.email') }}</b-col>
          <b-col>{{ $t('notifications.settings.text') }}</b-col>
        </b-row>
      </b-col>
    </b-row>
    <slot name="extra"></slot>
    <div :class="{'mt-3': !isScreenXS}">
      <div v-for="item in items" :key="item.key">
        <hr v-if="isScreenXS" class="divider">
        <NotificationSettingsItem :path="path" :settings="item"></NotificationSettingsItem>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationSettingsItem from '~/components/profile/notifications/NotificationSettingsItem';
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'NotificationSettingsSection',
  components: {NotificationSettingsItem},
  mixins: [screenSize],
  props: {
    preference: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    path: {
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

  &.mobile
    border-radius: 10px
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)

    .title
      color: $color-blue-20
      font-weight: $normal


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

.divider
  border-top: 1px solid rgba($color-gray-23, 0.17)
  margin-top: 8px
  margin-bottom: 8px

</style>
