<template>
  <div v-show="mobileClass" :class="`sidebar-wrapper ${mobileClass} w-100`">
    <div :class="`header ${mobileClass} w-100 px-5 py-3 border-bottom`">
      <div :class="`filter-by w-100 ${mobileClass} justify-content-center`">
        <span>{{ $t('common.filter_by') }}</span>
      </div>
    </div>
    <div :class="`filter-body ${mobileClass} p-4 w-100 h-100`">
      <!-- Sort By -->
      <div v-show="filterVisibility" class="sort-by">
        <div :class="`sort-by-filter ${mobileClass}`">
          <div class="header-filter">
            {{ $t('offers_received.sort') }}
          </div>
          <div :class="`body-filter mt-2 ${mobileClass} f-w-normal`">
            <b-form-radio
              v-model="filter.sortby"
              class="recent-to-old text-normal"
              name="sortby"
              value="recent_to_old"
              @change="sortBy($event, filter.sortBy)"
              >{{ $t('offers_received.offers_recent_old') }}</b-form-radio
            >
            <b-form-radio
              v-model="filter.sortby"
              class="old-to-recent text-normal"
              name="sortby"
              value="old_to_recent"
              @change="sortBy"
              >{{ $t('offers_received.offers_old_recent') }}</b-form-radio
            >
          </div>
        </div>
        <hr />
      </div>
      <!-- Sort By ends -->
      <div v-show="filterVisibility" class="collapses">
        <CollapseStatus
          :value="filter.status || {}"
          collapseKey="status"
          :title="$t('filter_sidebar.brands')"
          :options="status"
          @selected="statusSelected"
        />
      </div>
      <hr v-show="filterVisibility" />
      <div class="collapses">
        <CollapseDate
          collapseKey="offer-date"
          :title="$t('offers_received.offer_date')"
          :options="status"
          :clearDate="!filter.date"
          @showFilters="dateSelected"
        />
      </div>

      <div v-show="filterVisibility" :class="`section-actions ${mobileClass}`">
        <Button pill class="btn-reset btn-light" @click="resetFilter">{{
          $t('offers_received.reset')
        }}</Button>

        <Button
          pill
          class="btn-apply border-0"
          @click="$emit('filter', { ...filter })"
          ><span
            >{{ $t('offers_received.apply_filters') }}
            <span v-if="count">&#40;{{ count }}&#41;</span></span
          ></Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CollapseStatus from './filter/CollapseStatus.vue'
import CollapseDate from './filter/CollapseDate.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { Button } from '~/components/common'
export default {
  name: 'MobileFilter',

  components: {
    CollapseStatus,
    Button,
    CollapseDate,
  },

  mixins: [screenSize],

  data() {
    return {
      status: [
        {
          label: 'Accepted',
          value: 'accepted',
        },
        {
          label: 'Awaiting Response',
          value: 'awaiting_response',
        },
        {
          label: 'Declined',
          value: 'declined',
        },
      ],
      showFilter: true,
      filter: {
        date: null,
        status: null,
        sortby: null,
      },
      count: 0,
    }
  },

  computed: {
    filterVisibility: (vm) => {
      return vm.showFilter
    },

    sortbyStatus: (vm) => {
      return vm.filter.sortby
    },
  },

  watch: {
    sortbyStatus: {
      deep: true,
      handler(newValue, oldValue) {
        if(!oldValue){
          this.count = this.count + 1
        }
      }
    },
  },

  methods: {
    resetFilter() {
      this.count = 0
      this.filter.date = null
      this.filter.status = null
      this.filter.sortby = null
    },

    statusSelected({ value }) {
      if (!this.filter.status) {
        this.count = this.count + 1
      }
      if (this.filter.status && this.filter.status.value === value.value) {
        this.filter.status = null
        this.count = this.count - 1
        return
      }
      this.filter.status = value
    },

    sortBy(event) {
      if (!this.filter.sortby) {
        this.count = this.count + 1
      }
      this.filter.sortby = event
    },

    dateSelected({ value, data }) {
      if (value === true) {
        if ((data.start !== '' || data.end !== '') && !this.filter.date) {
          this.count = this.count + 1
        }
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
  display: flex
  flex-direction: column
  align-items: flex-start
  &.mobile
    height: 450px

  .sliders, .collapses
    display: flex
    flex-direction: column
    width: 100%

  .btn-apply
    height: 40px
    left: 211px
    top: 746px
    background: $color-blue-20
    border-radius: 20px

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
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between

    &.mobile
      justify-content: center
      margin: auto
      display: flex
      margin-top: 20%

@media (max-width: 992px)
  .sidebar-wrapper
    .sliders, .collapses
      flex-direction: row

      >div
        max-width: 206px

        &:not(:last-child)
          margin-right: 30px

    .section-actions
      justify-content: flex-start

      >*
        margin-right: 20px

@media (max-width: 576px)
  .sidebar-wrapper
    .sliders, .collapses
      flex-direction: column

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
    display: flex
    align-items: center
    letter-spacing: -0.02em
    color: $color-black-1

.sort-by-filter
  &.mobile
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
