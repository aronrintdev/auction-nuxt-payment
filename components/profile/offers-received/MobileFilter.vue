<template>
  <div
    v-show="mobileClass"
    :class="`sidebar-wrapper ${mobileClass} d-flex w-100 flex-column align-items-start`"
  >
    <div :class="`header ${mobileClass} w-100 px-5 border-bottom`">
      <div
        :class="`filter-by w-100 ${mobileClass} d-flex aling-items-center justify-content-center`"
      >
        <span>{{ $t('common.filter_by') }}</span>
      </div>
    </div>
    <div :class="`filter-body ${mobileClass} p-4 w-100 h-100`">
      <!-- Sort By -->
      <div v-show="filterVisibility" class="sort-by">
        <div :class="`offer-received sort-by-filter ${mobileClass}`">
          <div class="header-filter">
            {{ $t('offers_received.sort') }}
          </div>
          <div :class="`body-filter mt-2 ${mobileClass} f-w-normal`">
            <b-form-radio
              v-model="filter.sortby"
              class="recent-to-old text-normal"
              name="sortby"
              value="recent_to_old"
              >
              {{ $t('offers_received.offers_recent_old') }}
            </b-form-radio
            >
            <b-form-radio
              v-model="filter.sortby"
              class="old-to-recent text-normal"
              name="sortby"
              value="old_to_recent"
              >{{ $t('offers_received.offers_old_recent') }}</b-form-radio
            >
          </div>
        </div>
        <hr />
      </div>
      <!-- Sort By ends -->
      <div v-show="filterVisibility" class="collapses flex-column">
        <CollapseSelector
          v-model="filter.status"
          collapseKey="status"
          :title="$t('placed_offers.status')"
          :options="status"
        />
      </div>
      <hr v-show="filterVisibility" />
      <div class="collapses flex-column">
        <CollapseDate
          id="date-filter"
          collapseKey="offer-date"
          :title="$t('offers_received.offer_date')"
          :options="status"
          :clearDate="!filter.date"
          @showFilters="dateSelected"
        />
      </div>
    </div>
    <div
      v-show="filterVisibility"
      :class="`section-actions ${mobileClass} d-flex align-items-center w-100 justify-content-between p-4 bg-white`"
    >
      <Button
        v-if="filterVisibility"
        pill
        class="btn-reset btn-light"
        @click="resetFilter"
      >{{ $t('offers_received.reset') }}</Button
      >

      <Button
        v-if="filterVisibility"
        pill
        class="btn-apply border-0 p-0"
        @click="$emit('filter', { ...filter })"
      ><span
      >{{ $t('offers_received.apply_filters') }}
            <span v-if="count">&#40;{{ count }}&#41;</span></span
      ></Button
      >
    </div>
  </div>
</template>

<script>
import CollapseDate from './filter/CollapseDate.vue'
import screenSize from '~/plugins/mixins/screenSize'
import CollapseSelector from '~/components/common/mobileFilters/CollapseSelector'
import { Button } from '~/components/common'
export default {
  name: 'MobileFilter',

  components: {
    Button,
    CollapseDate,
    CollapseSelector,
  },

  mixins: [screenSize],

  props: {
    showStatusOfferPlaced: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      status: [
        {
          text: this.$t('offers_received.accepted'),
          value: 'accepted',
        },
        {
          text: this.$t('offers_received.awaiting_response'),
          value: 'pending',
        },
        {
          text: this.$t('offers_received.declined'),
          value: 'declined',
        },
      ],
      showFilter: true,
      filter: {
        date: null,
        status: [],
        sortby: null,
      },
    }
  },

  computed: {
    filterVisibility: (vm) => {
      return vm.showFilter
    },

    sortbyStatus: (vm) => {
      return vm.filter.sortby
    },

    count() {
      let total = 0
      if (this.filter.sortby) total += 1
      if (this.filter.date) total += 1
      if (this.filter.status.length) total += 1
      return total
    }
  },

  methods: {
    resetFilter() {
      this.filter.date = null
      this.filter.status = []
      this.filter.sortby = null
    },

    dateSelected({ value, data }) {
      if (value === true) {
        this.filter.date = data
      }
      this.showFilter = value
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.sidebar-wrapper
  font-family: $font-sp-pro
  &.mobile
    height: 450px
    .header
      padding-bottom: 17.04px

  .sliders, .collapses
    flex-direction: column
    width: 100%

  .btn-apply
    height: 40px
    left: 211px
    top: 746px
    background: $color-blue-20
    border-radius: 20px
    width: 135px
    height: 40px
    left: 27px
    top: 746px
    border: 1px solid $color-black-1

  .btn-reset
    width: 135px
    height: 40px
    left: 28px
    top: 746px
    border: 1px solid $color-black-1
    border-radius: 20px
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-black-1

  .section-actions
    &.mobile
      position: absolute
      bottom: 0

@media (max-width: 576px)
  .sidebar-wrapper
    .sliders, .collapses
      >div
        max-width: 100%

        &:not(:last-child)
          margin-right: 0px
/** Filter css */
.filter-by
  &.mobile
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-bold
    letter-spacing: -0.02em
    color: $color-black-1
.collapses::v-deep
  #status-filter,
  #date-filter
    h2
      button
        &:after
          flex-shrink: 0
          width: 20px
          height: 20px
          margin-left: auto
          content: ""
          background-image: url('~/assets/img/icons/arrow-down-black.svg')
          background-repeat: no-repeat
          background-size: 20px
          transition: transform 0.2s ease-in-out

.sort-by-filter::v-deep
  &.mobile
    .recent-to-old,
    .old-to-recent
      label
        font-family: $font-sp-pro
        font-style: normal
        @include body-5-normal
        color: $color-black-9
        line-height: 24px
    .header-filter
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-bold
      color: $color-blue-20
/** Filter css ends */

@media (max-width: 407px)
  .btn-apply
    span
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-medium
      color: $color-white-1
@media(max-width: 332px)
  .btn-apply
    span
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-white-1

</style>

<style lang="sass">
@import '~/assets/css/_variables'
.offer-received
  .custom-control-label
    &:before
      border: solid 1px $color-black-1
      background-color: $color-white
      box-shadow: inset 0 0 0 rgba(1,1,1, 0)
    &:after
      background: 80%/80% 80% no-repeat
      top: 0.25rem
      left: -1.5765rem

  .custom-radio .custom-control-input:checked ~ .custom-control-label::before
    border: solid 1px $color-black-1
    background-color: $color-white

  .custom-radio .custom-control-input:checked~.custom-control-label::after
    filter: invert(100%)
</style>
