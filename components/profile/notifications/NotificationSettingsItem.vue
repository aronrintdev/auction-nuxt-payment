<template>
  <b-row v-if="settings" :class="{ mobile: isScreenXS }" class="mb-3">
    <b-col md="5" sm="12">
      <div
        :class="{ 'justify-content-between': isScreenXS }"
        class="sub-heading-title d-flex align-items-center"
      >
        {{ settings.label }}
        <arrow-right v-if="isScreenXS" @click="notificationSelect" />
      </div>
      <div :class="{ 'w-75': isScreenXS }" class="sub-title mt-2 mr-2">
        {{ settings.desc }}
        <div v-if="settings.desc_next && !isScreenXS" class="mt-4">
          {{ settings.desc_next }}
        </div>
      </div>
    </b-col>
    <b-col v-if="!isScreenXS" class="title-labels w-50 pt-20" md="4">
      <div
        v-if="
          fieldExist(settings.data, 'when') ||
          fieldExist(settings.data, 'every')
        "
        class="d-flex align-items-center"
      >
        <span v-if="fieldExist(settings.data, 'when')" class="label mr-2">{{
          $t('notifications.settings.notify_when')
        }}</span>
        <span v-if="fieldExist(settings.data, 'every')" class="label mr-2">{{
          $t('notifications.settings.notify_every')
        }}</span>
        <WhiteDropDown
          :id="'multiSelect'"
          :dropdown-class="'outlined'"
          :label="settingsLabel"
          :toggle-class="'h-32'"
          class="mr-4 dropdown-actions"
        >
          <div class="pl-3 pr-4 text-truncate overflow-hidden">
            <div class="type-checkboxes">
              <b-form-checkbox
                v-if="isWhenOptionsActive(settings)"
                :checked="isAllWhenOptionsChecked"
                class="d-flex flex-column"
                @change="selectAllWhenOptions"
              >
                {{ $t('notifications.settings.all_statuses') }}
              </b-form-checkbox>
            </div>

            <b-form-checkbox-group
              v-if="isWhenOptionsActive(settings)"
              v-model="formData.extra.when.value"
              :checked="formData.extra.when.value"
              :options="whenOptions(settings.data)"
              class="type-checkboxes d-flex flex-column"
              @change="whenChanged"
            ></b-form-checkbox-group>

            <b-form-radio-group
              v-if="fieldExist(settings.data, 'every')"
              v-model="formData.extra.every.value"
              :checked="formData.extra.every.value"
              :options="getEveryOptions"
              class="type-radios d-flex flex-column"
              @change="everyChanged"
            >
              <b-form-radio
                :checked="everyValue"
                :value="everyValue"
                class="d-flex flex-column"
              >
                <div class="d-flex align-items-center">
                  <span>{{ $t('notifications.settings.custom') }}:</span>
                  <b-input
                    v-model="everyValue"
                    :min="everyOptionMin"
                    :placeholder="$t('notifications.settings.custom_value')"
                    class="ml-2 h-26px"
                    type="number"
                    @input="updateChanges"
                  >
                  </b-input>
                </div>
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </WhiteDropDown>
      </div>
      <div
        v-if="fieldExist(settings.data, 'until') && !isScreenXS"
        class="mt-36"
        :class="{
          'mt-50':
            !fieldExist(settings.data, 'when') &&
            !fieldExist(settings.data, 'every'),
        }"
      >
        <vue-slider
          v-if="settings.data.until.type === 'slider'"
          :max="100"
          :min="0"
          :min-range="0"
          :tooltip-formatter="(val) => val + '%'"
          :tooltipStyle="{
            'background-color': 'transparent',
          }"
          :value="formData.extra.until.value"
          class="vue-slider-ltr-shop w-50"
          tooltip="always"
          @change="percentageChange"
        ></vue-slider>
      </div>
    </b-col>
    <b-col v-if="!isScreenXS" md="3">
      <b-row
        class="title-labels text-center"
        :class="{
          'pt-19': preference,
        }"
      >
        <b-col>
          <NotificationSwitch
            :value="channelSettings[NOTIFICATION_CHANNEL_APP]"
            @change="(e) => setChannelSetting(e, NOTIFICATION_CHANNEL_APP)"
          />
        </b-col>
        <b-col>
          <NotificationSwitch
            :value="channelSettings[NOTIFICATION_CHANNEL_EMAIL]"
            @change="(e) => setChannelSetting(e, NOTIFICATION_CHANNEL_EMAIL)"
          />
        </b-col>
        <b-col>
          <NotificationSwitch
            :value="channelSettings[NOTIFICATION_CHANNEL_TEXT]"
            @change="(e) => setChannelSetting(e, NOTIFICATION_CHANNEL_TEXT)"
          />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import NotificationSwitch from '~/components/profile/notifications/Switch'
import WhiteDropDown from '~/components/profile/notifications/WhiteDropDown'
import {
  NOTIFICATION_CHANNEL_APP,
  NOTIFICATION_CHANNEL_EMAIL,
  NOTIFICATION_CHANNEL_TEXT,
} from '~/static/constants/notifications'
import screenSize from '~/plugins/mixins/screenSize'
import arrowRight from '~/assets/img/home/arrow-right-small-black.svg?inline'
import settingsItem from '~/plugins/mixins/settings-item'

export default {
  name: 'NotificationSettingsItem',
  components: { WhiteDropDown, NotificationSwitch, arrowRight },
  mixins: [screenSize, settingsItem],
  props: {
    settings: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      default: '',
    },
    preference: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      NOTIFICATION_CHANNEL_APP,
      NOTIFICATION_CHANNEL_TEXT,
      NOTIFICATION_CHANNEL_EMAIL,
      channelSettings: {
        [NOTIFICATION_CHANNEL_APP]: false,
        [NOTIFICATION_CHANNEL_TEXT]: false,
        [NOTIFICATION_CHANNEL_EMAIL]: false,
      },
      everyValue: null,
      isAllWhenOptionsChecked: false,
      isEveryCustom: false,
      formData: {
        extra: {
          until: {
            value: 0,
          },
          every: {
            value: 1,
          },
          when: {
            value: [],
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      getSettings: 'notifications/getSettings',
    }),
    getEveryOptions() {
      return Object.keys(
        this.$t(
          `notifications.settings.${this.settings.data.every.type}_statuses`
        )
      )
        .filter((key) => key !== 'null')
        .map((key) => {
          return {
            text: this.$t(
              `notifications.settings.${this.settings.data.every.type}_statuses.${key}`
            ),
            value: key,
          }
        })
    },
    everyOptionMin() {
      return (
        this.getEveryOptions[this.getEveryOptions.length - 1].value /
        (this.formData.extra.every.type === 'hour' ? 24 : 1)
      )
    },
    /**
     * A computed function that returns a settings label based on the value of the formData.extra.
     * @return string
     */
    settingsLabel: {
      cache: false,
      get() {
        const key = this.fieldExist(this.settings.data, 'every')
          ? 'every'
          : 'when'
        if (key === 'when' && _.isArray(this.formData.extra[key].value)) {
          return this.formData.extra.when.value.length ===
            this.whenOptions(this.formData.extra).length
            ? this.$t('notifications.settings.all_statuses')
            : this.formData.extra.when.value.length === 0
            ? this.$t('notifications.settings.no_statuses')
            : this.whenOptions(this.formData.extra).filter((item) =>
                this.formData.extra.when.value.includes(item.value)
              )[0].text + ' ...'
        }
        const option = this.everyValueSorted()
        return this.$t(
          `notifications.settings.${this.formData.extra[key].type}_statuses.${option}`,
          { n: this.everyValue }
        )
      },
    },
  },
  watch: {
    getSettings(va) {
      this.initChannelSettings()
      this.initFormData()
    },
  },
  mounted() {
    this.initChannelSettings()
  },
  created() {
    this.initFormData()
  },
  methods: {
    notificationSelect() {
      const selected = {
        setting: this.settings,
        formData: this.formData,
        channelSettings: this.channelSettings,
        path: this.path,
        id: this.getSettings.filter((sett) => sett.key === this.settings.key)[0]
          .id,
      }
      this.$store.commit('notifications/setSelectedSetting', selected)
    },
    everyValueSorted() {
      return this.getEveryOptions.filter(
        (option) => option.value === this.formData.extra.every.value + ''
      ).length > 0
        ? this.formData.extra.every.value
        : 'null'
    },
    /**
     * Initializing the formData object.
     */
    initFormData() {
      if (this.fieldExist(this.settings.data, 'when')) {
        const data = this.settings.data.when
        this.formData.extra.when = Object.assign({}, this.formData.extra.when, {
          value: data.value,
          type: data.type,
        })
        this.isAllWhenOptionsChecked =
          data.value.length === this.whenOptions(this.settings.data).length
        this.$forceUpdate()
      }
      if (this.fieldExist(this.settings.data, 'until')) {
        const data = this.settings.data.until
        this.formData.extra.until = Object.assign(
          {},
          this.formData.extra.until,
          { value: data.value, type: data.type }
        )
      }
      if (this.fieldExist(this.settings.data, 'every')) {
        const data = this.settings.data.every
        this.formData.extra.every = Object.assign(
          {},
          this.formData.extra.every,
          { value: data.value, type: data.type }
        )
        this.everyValue =
          this.everyValueSorted() === 'null'
            ? this.formData.extra.every.value
            : null
      }
    },
    percentageChange(e) {
      this.formData.extra.until.value = e
      this.updateChanges()
    },
    setChannelSetting(e, channel) {
      this.channelSettings[channel] = e
      this.updateChanges()
    },
    initChannelSettings() {
      this.channelSettings = {
        [NOTIFICATION_CHANNEL_APP]: this.getChannelValue(
          NOTIFICATION_CHANNEL_APP
        ),
        [NOTIFICATION_CHANNEL_TEXT]: this.getChannelValue(
          NOTIFICATION_CHANNEL_TEXT
        ),
        [NOTIFICATION_CHANNEL_EMAIL]: this.getChannelValue(
          NOTIFICATION_CHANNEL_EMAIL
        ),
      }
    },
    getChannelValue(channel) {
      return (
        this.getSettings.filter(
          (sett) => sett.key === this.settings.key && sett.channel === channel
        )[0]?.is_active === 1
      )
    },
    selectAllWhenOptions(check) {
      this.isAllWhenOptionsChecked = check
      this.formData.extra.when.value = check
        ? this.whenOptions(this.settings.data).map((item) => item.value)
        : []
      this.updateChanges()
    },
    whenChanged(all) {
      this.formData.extra.when.value = all
      this.isAllWhenOptionsChecked =
        all.length === this.whenOptions(this.settings.data).length
      this.$forceUpdate()
      this.updateChanges()
    },
    everyChanged(value) {
      this.everyValue = value !== null ? null : this.everyValue
      this.updateChanges()
    },
    /**
     * Creating a edit item object with the id, data, and value properties.
     * @param channel
     * @return {{data: {Object}, id: {number}, value: (number)}}
     */
    editItemConstructor(channel) {
      const id = this.getSettings.filter(
        (sett) => sett.key === this.settings.key && sett.channel === channel
      )[0].id
      const data = {
        id,
        data: JSON.stringify(
          Object.keys(this.settings.data).reduce((obj, key) => {
            obj[key] = this.formData.extra[key]
            if (this.everyValue !== null && key === 'every') {
              obj[key].value = parseInt(this.everyValue)
            }
            return obj
          }, {})
        ),
        value: this.channelSettings[channel] ? 1 : 0,
      }
      return data
    },
    updateChanges: _.debounce(function () {
      Object.keys(this.channelSettings).map((sett) => {
        this.addChangedItem(this.editItemConstructor(sett))
        return sett
      })
    }, 500),
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.dropdown-actions::v-deep
  button.btn
    font-family: $font-family-sf-pro-display
    @include body-5-medium
    width: 213px
    min-width: 213px
    &.h-32
      height: 32px

.mobile
  .sub-title
    @include body-10
.mt-36
  margin-top: 36px

.mt-50
  margin-top: 50px

.mt-26
  margin-top: 36px

.pt-19
  padding-top: 19px
.pt-20
  padding-top: 20px
.h-26px
  @include body-8
  height: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  color: $color-gray-24
  opacity: 0.66

.label
  @include body-8-regular
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-gray-5
  white-space: nowrap


.sub-heading-title
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  color: $color-black-1

.sub-title
  @include body-8
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-gray-5

::v-deep.vue-slider-ltr-shop
  .vue-slider-process
    background-color: $color-blue-20
  .vue-slider-dot
    .vue-slider-dot-handle
      background-color: $color-blue-20

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
        background-color: $color-grey-101
        border-color: $color-grey-101

.type-checkboxes::v-deep
  .custom-checkbox
    input[type="checkbox"]:checked + label::after
      background-color: $color-green-16

    label
      text-overflow: ellipsis
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
