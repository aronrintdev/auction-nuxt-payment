<template>
  <b-row class="mt-2 mb-3 align-items-center">
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
          <div class="px-4">
            <b-form-checkbox-group
                :options="types"
                class="type-checkboxes d-flex flex-column"
            ></b-form-checkbox-group>

            <b-form-radio-group
                :options="types"
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
          <NotificationSwitch :value="false"/>
        </b-col>
        <b-col>
          <NotificationSwitch :value="false"/>
        </b-col>
        <b-col>
          <NotificationSwitch :value="false"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash';
import NotificationSwitch from '~/components/profile/notifications/Switch';
import WhiteDropDown from '~/components/profile/notifications/WhiteDropDown';
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
      types: Object.keys(this.$t('notifications.types')).map(key => {
        return {
          text: this.$t(`notifications.types.${key}`),
          value: key,
        }
      })

    }
  },
  methods: {
    fieldExist(item, field) {
      return _.get(item, field, false);
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