<template>
  <b-row v-if="settings" class="mt-2 mb-3 align-items-center">
    <b-col md="5">
      <div class="title">{{settings.label}}</div>
      <div class="sub-title mt-2 mr-2 ">{{settings.desc}}</div>
    </b-col>
    <b-col md="4" class="title-labels w-50">
      <div v-if="fieldExist(settings.data, 'when') || fieldExist(settings.data, 'every')" class="d-flex align-items-center">
        <span v-if="fieldExist(settings.data, 'when')" class="label mr-2">{{ $t('notifications.settings.notify_when')}}</span>
        <span v-if="fieldExist(settings.data, 'every')" class="label mr-2">{{ $t('notifications.settings.notify_every')}}</span>
        <WhiteDropDown
            :id="'multiSelect'"
            :label="settingsLabel(settings)"
            :dropdown-class="'outlined'"
            :toggle-class="'h-32'"
            class="mr-4"
        >
          <div class="px-3">
            <div class="type-checkboxes">
              <b-form-checkbox
                  v-if="isWhenOptionsActive(settings)"
                  :checked="settings.data.when.value.length === 0"
                  class="d-flex flex-column"
              >
                {{ settingsLabel(settings) }}
              </b-form-checkbox>
            </div>

            <b-form-checkbox-group
                v-if="isWhenOptionsActive(settings)"
                :options="whenOptions(settings.data)"
                class="type-checkboxes d-flex flex-column"
            ></b-form-checkbox-group>

            <b-form-radio-group
                v-if="fieldExist(settings.data, 'every')"
                :options="getEveryOptions"
                class="type-radios d-flex flex-column"
            ></b-form-radio-group>

          </div>
        </WhiteDropDown>
      </div>
      <div v-if="fieldExist(settings.data, 'until')" class="mt-3">
        <vue-slider
            v-if="settings.data.until.type === 'slider' "
            :value="settings.data.until.value"
            :max="100"
            :min="0"
            tooltip="always"
            :min-range="0"
            :tooltipStyle="{
              'background-color': 'transparent'
            }"
            :tooltip-formatter="val => val + '%'"
            class="vue-slider-ltr-shop w-50"
        ></vue-slider>
      </div>
    </b-col>
    <b-col md="3">
      <b-row class="title-labels text-center">
        <b-col>
          <NotificationSwitch :value="getChannelValue(NOTIFICATION_CHANNEL_APP)"/>
        </b-col>
        <b-col>
          <NotificationSwitch :value="getChannelValue(NOTIFICATION_CHANNEL_EMAIL)"/>
        </b-col>
        <b-col>
          <NotificationSwitch :value="getChannelValue(NOTIFICATION_CHANNEL_TEXT)"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import NotificationSwitch from '~/components/profile/notifications/Switch';
import WhiteDropDown from '~/components/profile/notifications/WhiteDropDown';
import {
  NOTIFICATION_CHANNEL_APP,
  NOTIFICATION_CHANNEL_EMAIL,
  NOTIFICATION_CHANNEL_TEXT
} from '~/static/constants/notifications';
export default {
  name: 'NotificationSettingsItem',
  components: {WhiteDropDown, NotificationSwitch},
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      NOTIFICATION_CHANNEL_APP,
      NOTIFICATION_CHANNEL_TEXT,
      NOTIFICATION_CHANNEL_EMAIL,
      types: Object.keys(this.$t('notifications.types')).map(key => {
        return {
          text: this.$t(`notifications.types.${key}`),
          value: key,
        }
      }),
      order_statuses: Object.keys(this.$t('notifications.settings.order_statuses')).map(key => {
        return {
          text: this.$t(`notifications.settings.order_statuses.${key}`),
          value: key,
        }
      }),
      wishlist_statuses: Object.keys(this.$t('notifications.settings.wishlist_statuses')).map(key => {
        return {
          text: this.$t(`notifications.settings.wishlist_statuses.${key}`),
          value: key,
        }
      }),
      itemData: {
      }
    }
  },
  computed: {
    ...mapGetters({
      'getSettings': 'notifications/getSettings'
    }),
    getChannelValue(){
      return (channel) => {
        return this.getSettings.filter(sett => sett.key === this.settings.key && sett.channel === channel)[0].is_active === 1
      }
    },
    getEveryOptions(){
      return Object.keys(this.$t(`notifications.settings.${this.settings.data.every.type}_statuses`)).map(key => {
        return {
          text: this.$t(`notifications.settings.${this.settings.data.every.type}_statuses.${key}`),
          value: key,
        }
      })
    }
  },
  methods: {
    isWhenOptionsActive(settings) {
      return  this.fieldExist(settings.data, 'when') && ['order', 'wishlist'].includes(settings.data.when.type)
    },
    whenOptions(settings){
      return settings.when.type === 'order' ? this.order_statuses : this.wishlist_statuses
    },
    fieldExist(item, field) {
      return !!_.get(item, field, false);
    },
    settingsLabel(settings){
      const key = this.fieldExist(settings.data, 'every')? 'every' : 'when'
      if (_.isArray(settings.data[key].value)){
        return this.$t('notifications.settings.all_statuses')
      }
      return this.$t(`notifications.settings.${settings.data[key].type}_statuses.${settings.data[key].value}`)
    }
  }
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"

.label
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-gray-5


.title
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  color: $color-black-1

.sub-title
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-gray-5

::v-deep.vue-slider-ltr-shop
  .vue-slider-dot-tooltip-text
    @include body-10
    background-color: transparent
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium
    color: $color-black-9
    margin-top: 3px

  .vue-slider-dot-tooltip-top
    top: 6px

.type-radios::v-deep
  .custom-radio

    label
      @include body-13
      font-family: $font-family-sf-pro-display
      font-style: normal
      font-weight: $normal
      color: $color-gray-5
      white-space: nowrap
      padding-top: 2px

    .custom-control-label::before
      background-color: $color-white-5
      border: none
      box-shadow: none
    .custom-control-input:checked ~ .custom-control-label
        &:before
          background-color: $color-blue-2
          border-color: $color-blue-2

.type-checkboxes::v-deep
  .custom-checkbox
    input[type="checkbox"]:checked + label::after
      background-color: $color-blue-2

    label
      @include body-13
      font-family: $font-family-sf-pro-display
      font-style: normal
      font-weight: $normal
      color: $color-gray-5
      white-space: nowrap
      padding-top: 2px

      &:before
        background-color: $color-white-5
        border: none
        box-shadow: none
        border-radius: 0

</style>