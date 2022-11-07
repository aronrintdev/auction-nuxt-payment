<template>
    <b-input-group class="date-input-group" :class="groupClass">
      <b-form-input class="date-input" :class="inputClass" :placeholder="placeholder ||  $t('common.date')" :value="value" :disabled="inputDisabled"></b-form-input>
      <b-input-group-append class="date-input-icon">
        <b-form-datepicker
            v-model="date"
            button-only
            :class="dateClass"
            :hide-header="hideHeader"
            :disabled="dateDisabled"
            hide-footer
            class="date-dp"
            right
            :locale="locale"
            :readonly="readonly"
            :min="minDate"
            :max="maxDate"
            :reset-button="dateResetButton"
            @context="onDateChange"
        >
          <template #button-content>
            <img :src="CalendarImg" :alt="$t('common.calendar')">
          </template>
        </b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
</template>

<script>
import CalendarImg from '~/assets/img/icons/calendar-gray.svg';
/**
 * @typedef {Object} Context
 * @property {string} selectedYMD - Selected date in YMD format ex: "2022-06-24"
 * @property {string|null} selectedDate - Selected date
 * @property {string} selectedFormatted - Selected date in chosen format default: "No date selected"
 * @property {string} activeYMD - Active date in YMD format
 * @property {string} activeDate - Active Date
 * @property {string} activeFormatted - Active Date in chosen format
 * @property {boolean} disabled - Disabled property
 * @property {string} locale - locale "en-US"
 * @property {string} calendarLocale - Chosen or default locale  "en-US"
 * @property {boolean} rtl - Right to Left property default: false
 */


export default {
  name: 'CalendarInput',
  props:{
    placeholder: {
      type: String,
      default: null
    },
    value: {
      validator: prop => typeof prop === 'string' || prop === null,
      required: true
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    inputClass: {
      type: String,
      default: ''
    },
    dateClass: {
      type: String,
      default: ''
    },
    groupClass: {
      type: String,
      default: 'mr-4'
    },
    minDate: {
      type: [String, Date],
      default: null
    },
    maxDate: {
      type: [String, Date],
      default: null
    },
    inputDisabled: {
      type: Boolean,
      default: false
    },
    dateDisabled:{
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dateResetButton: {
      type: Boolean,
      default: false
    }

  },
  data(){
    return {
      CalendarImg,
      date: null
    }
  },
  methods:{
    /**
     * Emits context when user selects date from date-picker
     * @param {Context} context
     */
    onDateChange(context){
      this.$emit('context', context)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.date-input
  @include body-5
  font-weight: $regular
  color: $color-gray-5
  background-color: $color-white-1
  border: 1px solid $color-gray-60
  border-right: none
  letter-spacing: 0.06em


::v-deep.date-dp
  .btn-secondary
    background-color: $color-white-1
    border: 1px solid $color-gray-60
    border-left: none
    border-radius: 0 6px 6px 0

    &:hover
      background-color: $white-2

</style>
