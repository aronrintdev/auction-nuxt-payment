<template>
  <div v-if="options && options.length" class="accordion-filter-item">
    <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header">
      <button
        v-b-toggle="`collapse-${collapseKey}`"
        aria-controls="panelsStayOpen-collapseOne"
        aria-expanded="false"
        class="accordion-filter-button collapsed"
        data-bs-target="#panelsStayOpen-collapseOne"
        data-bs-toggle="collapse"
        type="button"
      >
        <div class="row w-100">
          <div class="col text-left">
            {{ title }}
          </div>
          <div class="col text-right">
            <span v-if="visibleDate" class="filters"
              >{{ startDate }}, {{ endDate }}</span
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
      <div class="accordion-filter-body d-flex justify-content-between">
        <b-form-group class="start-date h-100">
          <b-input-group @click="showStartDate">
            <b-form-input
              v-model="startDate"
              class="start-date-input bg-white rounded-circle"
            >
            </b-form-input>
            <b-input-group-append
              class="d-flex align-items-center append-icon p-2"
            >
              <img :src="require('~/assets/img/icons/calendar.svg')" />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group class="start-date h-100">
          <b-input-group @click="showEndDate">
            <b-form-input
              v-model="endDate"
              class="start-date-input bg-white rounded-circle"
            >
            </b-form-input>
            <b-input-group-append
              class="d-flex align-items-center append-icon p-2"
            >
              <img :src="require('~/assets/img/icons/calendar.svg')" />
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>

      <Scroller
        v-if="startDateVisible"
        v-model="startDate"
        :control-text="`common.next`"
        :control-label="`common.start_date`"
        :confirm-text="`common.done`"
        @updateAction="showEndDate"
      />
      <Scroller
        v-if="endDateVisible"
        v-model="endDate"
        :control-text="`common.prev`"
        :control-label="`common.end_date`"
        :confirm-text="`common.done`"
        @updateAction="showStartDate"
      />
    </b-collapse>
  </div>
</template>

<script>
import Scroller from './Scroller.vue'
export default {
  name: 'CollapseDate',

  components: {
    Scroller,
  },

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
    }
  },

  computed: {
    visibleDate: (vm) => {
      return (
        vm.startDate !== vm.$t('common.start_date') &&
        vm.endDate !== vm.$t('common.end_date') &&
        !vm.clearDate
      )
    },
  },

  methods: {
    hideFilter(value) {
        this.$emit('showFilters', {
          value,
          data: { start: this.startDate && this.startDate !== 'Start Date', end: this.endDate && this.endDate !== 'End Date' },
        })
    },

    showStartDate() {
      this.endDateVisible = false
      this.startDateVisible = !this.startDateVisible
    },

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
  background: none
  border: none
  width: 100%

  .accordion-filter-header
    margin-bottom: 0

  .accordion-filter-button
    position: relative
    display: flex
    align-items: center
    width: 100%
    padding: 0
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
    background: none
    border: none
    position: relative
    display: flex
    align-items: center
    width: 100%
    padding: 0
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease
    background: none
    border: none
    overflow-anchor: none
    font-family: 'SF Pro Display'
    font-style: normal
    font-weight: 700
    font-size: 16px
    line-height: 19px
    color: #667799

    .filters
      width: 93px
      height: 19px
      left: 209px
      top: 7px
      font-family: 'SF Pro Display'
      font-style: normal
      font-weight: 500
      font-size: 16px
      line-height: 19px
      color: #000000
      overflow: hidden
      display: inline-block
      text-overflow: ellipsis
      white-space: nowrap

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
    // overflow: auto
    scroll-behavior: smooth
    margin: 20px 0 0 0
    padding: 0

    .form-check
      margin-bottom: 7px

      & > *
        cursor: pointer !important

      .form-check-input
        border: none
        box-shadow: none

        &::after
          content: ' '
          background-color: $color-gray-3
          position: absolute
          left: 0
          top: 50%
          width: 16px
          height: 16px
          transform: translateY(-7px)
          border-radius: 2px

        &:checked
          &::after
            background-color: $color-blue-2
            border-color: $color-blue-2
            box-shadow: none

      label
        @include body-5-normal
        text-align: left
        color: $color-gray-41
        padding-left: 6px
        width: 100%

  ::-webkit-scrollbar
    width: 6px !important

  ::-webkit-scrollbar-thumb
    background-color: $color-blue-2
    border: none !important

  ::-webkit-scrollbar-track
    background-color: $color-gray-3

.add-amount-item
  background: #fff
  color: #fff
  border: 1px solid #6c757d
  border-radius: 6px
  color: #6c757d
  padding: 1rem
  text-align: center
  width: 99px
  height: 45px
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 14px
  line-height: 17px
  display: flex
  align-items: center
  text-align: center
  color: #A3A3A3
  justify-content: center
.start-date
  width: 154px
  height: 49px
  // left: 1px
  // top: 222px
  border: 1px solid #000000
  border-radius: 10px
  &.start-date-input
    margin: 1px
</style>
