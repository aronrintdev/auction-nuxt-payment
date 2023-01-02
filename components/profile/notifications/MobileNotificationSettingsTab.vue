<template>
  <div v-if="selectedSetting">
    <MobileHeader :has-header="false" :title="tabTitle" @back="handlePageChange">
      <template #actions>
        <div class="d-flex align-items-center">
          <close-svg role="button" @click="handlePageChange"></close-svg>
        </div>
      </template>
    </MobileHeader>
    <div
        class="mx-2 my-3">
      <MobileSettingsItemCard
          :description="selectedSetting.setting.desc"
          :title="selectedSetting.setting.label"
      >
        <template #body>
          <div v-for="channel in channels" :key="channel.value" class="my-4 ">
            <hr class="divider">
            <div class="d-flex align-items-center justify-content-between ">
              <span class="label switch">{{ channel.text }}</span>
              <NotificationSwitch
                  :value="channelSettings[channel.value]"
                  class="mr-3"
                  @change="(e) => setChannelSetting(e, channel.value)"/>
            </div>

          </div>
        </template>
      </MobileSettingsItemCard>
    </div>

    <div
        v-if="fieldExist(selectedSetting.setting.data, 'until')"
        class="mx-2 my-3">
      <MobileSettingsItemCard
          :title="$t(`notifications.settings.texts.${selectedSetting.setting.key}.until_title`)"
      >
        <template #body>
          <vue-slider
              v-if="selectedSetting.setting.data.until.type === 'slider'"
              :dotStyle="{
                'height': '19px',
                'width': '19px',
                'top': '-28%'
              }"
              :max="100"
              :min="0"
              :min-range="0"
              :tooltip-formatter="val => val + '%'"
              :tooltipStyle="{
              'background-color': 'transparent'
              }"
              :value="formData.extra.until.value"
              class="vue-slider-ltr-shop mt-3"
              height="9px"
              tooltip="always"
              @change="percentageChange"
          >
          </vue-slider>
          <div class="until-desc mt-2">
            <i18n
                :path="`notifications.settings.texts.${selectedSetting.setting.key}.until_desc`"
                tag="div"
            >
              <span class="body-21-regular text-decoration-underline text-black">{{ formData.extra.until.value }}</span>
            </i18n>
          </div>
        </template>
      </MobileSettingsItemCard>
    </div>

    <div
        v-if="fieldExist(selectedSetting.setting.data, 'every') || fieldExist(selectedSetting.setting.data, 'when')"
        class="mx-2 my-3">
      <MobileSettingsItemCard
          :description="$t('notifications.how_often')"
          :title="$t('notifications.notification_preferences')"
      >
        <template #body>
          <b-form-checkbox-group
              v-if="fieldExist(selectedSetting.setting.data, 'when')"
              :checked="formData.extra.when.value"
              :value="formData.extra.when.value"
              class="type-checkboxes"
              @change="whenChanged"
          >
            <div v-for="status in whenOptions(selectedSetting.setting.data)" :key="status.value" class="my-4 ">
              <hr class="divider">
              <div class="d-flex align-items-center justify-content-between ">
                <span class="label pt-3">{{ status.text }}</span>
                <b-form-checkbox
                  class="pt-1"
                  :value="status.value"
                >
                </b-form-checkbox>
              </div>

            </div>
          </b-form-checkbox-group>

          <b-form-radio-group
              v-if="fieldExist(selectedSetting.setting.data, 'every')"
              :checked="formData.extra.every.value"
              :value="formData.extra.every.value"
              class="type-radios"
              @change="everyChanged"
          >
            <div v-for="status in getEveryOptions" :key="status.value" class="my-4 ">
              <hr class="divider">
              <div class="d-flex align-items-center justify-content-between pt-3">
                <span class="label">{{ status.text }}</span>
                <b-form-radio
                    :value="status.value"
                    :checked="status.value"
                >
                </b-form-radio>
              </div>

            </div>
            <div class="my-4">
              <hr class="divider">
              <div class="d-flex align-items-center justify-content-between ">
                <div class="d-flex align-items-center">
                  <span class="label input">{{ $t('notifications.settings.custom') }}:</span>
                  <b-input
                      v-model="everyValue"
                      :placeholder="$t('notifications.enter_custom_amount')"
                      class="ml-2 custom-radio-input mt-3"
                      type="number"
                      @input="updateChanges"
                  >
                  </b-input>
                </div>
                <b-form-radio
                    :checked="everyValue"
                    :value="everyValue"
                    class=" pt-1"
                >
                </b-form-radio>
              </div>

            </div>
          </b-form-radio-group>
        </template>
      </MobileSettingsItemCard>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex';
import MobileHeader from '~/components/mobile/MobileHeader';
import closeSvg from '~/assets/img/icons/close.svg?inline'
import MobileSettingsItemCard from '~/components/profile/notifications/MobileSettingsItemCard';
import NotificationSwitch from '~/components/profile/notifications/Switch';
import {NOTIFICATION_CHANNEL_APP, NOTIFICATION_CHANNEL_EMAIL, NOTIFICATION_CHANNEL_TEXT} from '~/static/constants';
import settingsItem from '~/plugins/mixins/settings-item';

export default {
  name: 'MobileNotificationSettingsTab',
  components: {NotificationSwitch, MobileSettingsItemCard, MobileHeader, closeSvg},
  mixins: [settingsItem],
  data() {
    return {
      everyValue: null,
      NOTIFICATION_CHANNEL_APP,
      channelSettings: {
        [NOTIFICATION_CHANNEL_APP]: false,
        [NOTIFICATION_CHANNEL_TEXT]: false,
        [NOTIFICATION_CHANNEL_EMAIL]: false
      },
      formData: {
        extra: {
          until: {
            value: 0
          },
          every: {
            value: 1
          },
          when: {
            value: []
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      selectedSetting: 'notifications/getSelectedSetting',
      getSettings: 'notifications/getSettings'
    }),
    tabTitle() {
      return this.$t('notifications.settings_titles.' + this.selectedSetting.path)
    },
    getEveryOptions() {
      return Object.keys(this.$t(`notifications.settings.${this.selectedSetting.setting.data.every.type}_statuses`)).filter(key => key !== 'null').map(key => {
        return {
          text: this.$t(`notifications.settings.${this.selectedSetting.setting.data.every.type}_statuses.${key}`),
          value: key,
        }
      })
    },
  },
  mounted() {
    this.initChannelSettings()
    this.initFormData()
  },
  methods: {
    ...mapActions({
      'fetchSettings': 'notifications/getUserSettings',
      'bulkEditNotificationSettings': 'notifications/bulkEditNotificationSettings',
    }),
    percentageChange(e) {
      this.formData.extra.until.value = e
      this.updateChanges()
    },
    initChannelSettings() {
      this.channelSettings = {
        [NOTIFICATION_CHANNEL_APP]: this.selectedSetting.channelSettings[NOTIFICATION_CHANNEL_APP],
        [NOTIFICATION_CHANNEL_TEXT]: this.selectedSetting.channelSettings[NOTIFICATION_CHANNEL_TEXT],
        [NOTIFICATION_CHANNEL_EMAIL]: this.selectedSetting.channelSettings[NOTIFICATION_CHANNEL_EMAIL]
      }
    },
    /**
     * Initializing the formData object.
     */
    initFormData() {
      if (this.fieldExist(this.selectedSetting.setting.data, 'when')) {
        const data = this.selectedSetting.setting.data.when
        this.formData.extra.when = Object.assign({}, this.formData.extra.when, {value: data.value, type: data.type})
        this.$forceUpdate()
      }
      if (this.fieldExist(this.selectedSetting.setting.data, 'until')) {
        const data = this.selectedSetting.setting.data.until
        this.formData.extra.until = Object.assign({}, this.formData.extra.until, {value: data.value, type: data.type})
      }
      if (this.fieldExist(this.selectedSetting.setting.data, 'every')) {
        const data = this.selectedSetting.setting.data.every
        this.formData.extra.every = Object.assign({}, this.formData.extra.every, {value: data.value, type: data.type})
        this.everyValue = this.everyValueSorted() === 'null' ? this.formData.extra.every.value : null
      }
    },
    everyValueSorted() {
      return this.getEveryOptions.filter(option => option.value === this.formData.extra.every.value + '').length > 0 ? this.formData.extra.every.value : 'null'
    },
    setChannelSetting(e, channel) {
      this.channelSettings[channel] = e
      this.updateChanges()
    },
    handlePageChange() {
      this.$store.commit('notifications/setSelectedSetting', null)
    },
    whenChanged(all) {
      this.formData.extra.when.value = all
      this.$forceUpdate()
      this.updateChanges()
    },
    everyChanged(value) {
      this.everyValue = value !== null ? null : this.everyValue
      this.updateChanges()
    },
    updateFormConstructor(channel) {
      const id = this.getSettings.filter(
          (sett) => sett.key === this.selectedSetting.setting.key && sett.channel === channel
      )[0].id
      const data = {
        id,
        data: JSON.stringify(Object.keys(this.selectedSetting.setting.data).reduce((obj, key) => {
          obj[key] = this.formData.extra[key]
          if (this.everyValue !== null && key === 'every') {
            obj[key].value = parseInt(this.everyValue)
          }
          return obj
        }, {})),
        value: this.channelSettings[channel] ? 1 : 0
      }
      return data
    },
    updateChanges: _.debounce(function () {
      const data = Object.keys(this.channelSettings).map(sett => {
        return this.updateFormConstructor(sett)
      })
      this.bulkEditNotificationSettings({settings: data}).then(res => {
        this.fetchSettings()
        this.$toasted.success(res.data.message)
      }).catch(err => {
        this.$toasted.error(err.response.data.message)
      })
    }, 500)
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.custom-radio-input
  @include body-8
  height: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  color: $color-gray-24
  opacity: 0.66


.label
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  color: $color-black-1
  &:not(.input)
    margin-top: 5px
  &.switch
    margin-top: 14px

.until-desc
  @include body-10
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-gray-5

.divider
  border-top: 1px solid rgba($color-gray-23, 0.17)
  margin-top: 8px
  margin-bottom: 8px

.type-checkboxes::v-deep
  .custom-checkbox
    input[type="checkbox"]:checked + label::after
      background-color: $color-green-16
      height: 21px
      width: 21px
      background-image: none
      border-radius: 4px

    label
      @include body-13
      font-family: $font-family-sf-pro-display
      font-style: normal
      font-weight: $normal
      color: $color-gray-5
      white-space: nowrap
      padding-top: 2px

      &:before
        height: 21px
        width: 21px
        background-image: none
        border-radius: 4px
        background-color: $color-gray-17
        border: none
        box-shadow: none

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
      background-color: transparent
      border: 2.5px solid $color-gray-4
      box-shadow: none
      height: 21px
      width: 21px
      background-image: none

    .custom-control-label::after
      background-color: transparent
      background-image: none

    .custom-control-input:checked ~ .custom-control-label
      &:before
        background-color: transparent
        border: 2.5px solid $color-green-16b
        height: 21px
        width: 21px
        background-image: none

      &:after
        background-color: $color-green-16
        border-radius: 50%
        height: 11px
        width: 11px
        background-image: none
        top: 0.57rem
        left: -1.2rem

::v-deep.vue-slider-ltr-shop
  .vue-slider-dot-tooltip-text
    @include body-10
    background-color: transparent
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium
    color: $color-black-9
    margin-bottom: 2px

  .vue-slider-dot-tooltip-top
    top: 6px

  .vue-slider-dot
    .vue-slider-dot-handle
      background-color: $color-blue-20
      border: 0.5px solid $color-white-1

  .vue-slider-process
    background-color: $color-blue-20
    border-radius: 2px

  .vue-slider-rail
    border-radius: 2px

</style>
