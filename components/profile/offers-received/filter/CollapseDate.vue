<template>
  <div
    v-if="options && options.length"
    class="accordion-filter-item bg-transparent border-0 w-100"
  >
    <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0">
      <button
        v-b-toggle="`collapse-${collapseKey}`"
        aria-controls="panelsStayOpen-collapseOne"
        aria-expanded="false"
        class="
          accordion-filter-button
          collapsed
          position-relative
          d-flex
          align-items-center
          border-0
          bg-none
          w-100
          p-0
        "
        data-bs-target="#panelsStayOpen-collapseOne"
        data-bs-toggle="collapse"
        type="button"
      >
        <div class="row w-100">
          <div class="col text-left">
            {{ title }}
          </div>
          <div class="col text-right">
            <span
              v-if="visibleDate"
              class="filters overflow-hidden d-inline-block text-nowrap"
            >
              <span v-if="startDate !== startDateText">{{ startDate }}</span>
              <span v-if="endDate !== endDateText">{{ endDate }}</span></span
            >
          </div>
        </div>
      </button>
    </h2>

    <b-collapse
      :id="`collapse-${collapseKey}`"
      :accordion="`accordion-${title}`"
      role="tabpanel"
      class="accordion-filter-collapse"
      aria-labelledby="panelsStayOpen-headingOne"
      @show="hideFilter(false)"
      @hide="hideFilter(true)"
    >
      <div class="accordion-filter-body d-flex justify-content-between p-0">
        <b-form-group class="start-date h-100">
          <b-input-group @click="showStartDate">
            <b-form-input
              v-model="startDate"
              type="date"
              class="start-date-input bg-white rounded-circle"
            >
            </b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="start-date h-100">
          <b-input-group @click="showEndDate">
            <b-form-input
              v-model="endDate"
              type="date"
              class="start-date-input bg-white rounded-circle"
            >
            </b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { START_DATE, END_DATE } from '~/static/constants'
export default {
  name: 'CollapseDate',

  props: {
    collapseKey: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
    multiSelect: {
      type: Boolean,
      default: true,
    },
    clearDate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showDate: false,
      startDate: this.$t('common.start_date'),
      endDate: this.$t('common.end_date'),
      dateValue: '',
      startDateVisible: false,
      endDateVisible: false,
      startDateText: START_DATE,
      endDateText: END_DATE,
    }
  },

  computed: {
    visibleDate: (vm) => {
      return (
        vm.startDate !== vm.$t('common.start_date') ||
        vm.endDate !== vm.$t('common.end_date') ||
        !vm.clearDate
      )
    },
  },

  watch: {
    startDate() {
      this.showStartDate()
    },

    endDate() {
      this.showEndDate()
    },

    clearDate() {
      if (this.clearDate) {
        this.startDate = ''
        this.endDate = ''
      }
    },
  },

  methods: {
    hideFilter(value) {
      this.$emit('showFilters', {
        value,
        data: {
          start:
            this.startDate && this.startDate !== this.startDateText
              ? this.startDate
              : '',
          end:
            this.endDate && this.endDate !== this.endDateText
              ? this.endDate
              : '',
        },
      })
    },

    // Update the start date show flag
    showStartDate() {
      this.endDateVisible = false
      this.startDateVisible = !this.startDateVisible
    },

    // Update end date show flag
    showEndDate() {
      this.startDateVisible = false
      this.endDateVisible = !this.endDateVisible
    },
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.accordion-filter-item
  .accordion-filter-button
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-bold
    color: $color-blue-20

    .filters
      width: 93px
      height: 19px
      left: 209px
      top: 7px
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-normal
      color: $color-black-1
      text-overflow: ellipsis

    @media (prefers-reduced-motion: reduce)
      transition: none

    &::after
      flex-shrink: 0
      width: 20px
      height: 20px
      margin-left: auto
      content: ''
      background-image: url('~/assets/img/icons/arrow-down-gray2.svg')
      background-repeat: no-repeat
      background-size: 20px
      transition: transform 0.2s ease-in-out

    @media (prefers-reduced-motion: reduce)
      &::after
        transition: none

    &:hover
      z-index: 2

    &:focus
      z-index: 3
      border-color: $color-blue-14
      outline: 0
      box-shadow: 0 0 0 0.25rem $color-blue-15

    &:focus
      box-shadow: none

    &:not(.collapsed)
      &::after
        transform: rotate(-180deg)

  .accordion-filter-body
    max-height: 150px
    scroll-behavior: smooth
    margin: 20px 0 0 0

  ::-webkit-scrollbar
    width: 6px !important

  ::-webkit-scrollbar-thumb
    background-color: $color-blue-2
    border: none !important

  ::-webkit-scrollbar-track
    background-color: $color-gray-3

.start-date
  width: 154px
  height: 49px
  border: 1px solid $color-black-1
  border-radius: 10px
  &.start-date-input
    margin: 1px
</style>
