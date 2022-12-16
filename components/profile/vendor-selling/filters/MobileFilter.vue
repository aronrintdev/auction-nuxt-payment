<template>
  <div
    v-show="mobileClass"
    :class="`sidebar-wrapper ${mobileClass} d-flex w-100 flex-column align-items-start`"
  >
    <div :class="`header ${mobileClass} w-100 px-5 py-3 border-bottom`">
      <div
        :class="`filter-by w-100 ${mobileClass} d-flex aling-items-center justify-content-center`"
      >
        <span>{{ $t('common.filter_by') }}</span>
      </div>
    </div>
    <div :class="`filter-body ${mobileClass} p-4 w-100`">
      <FilterAccordion
        :open="true"
        :title="$t('offers_received.sort').toString()"
      >
        <b-form-radio
          v-model="filter.sortby"
          class="recent-to-old text-normal radios"
          name="sortby"
          value="date-new-old"
          >{{ $t('offers_received.offers_recent_old') }}</b-form-radio
        >
        <b-form-radio
          v-model="filter.sortby"
          class="old-to-recent text-normal radios"
          name="sortby"
          value="date-old-new"
          >{{ $t('offers_received.offers_old_recent') }}</b-form-radio
        >
      </FilterAccordion>
      <ItemDivider />
      <FilterAccordion
        :title="$t('purchases.purchase_type').toString()"
        :data="filterStatusText"
      >
        <ButtonSelector
          :options="status"
          :values="filter.status"
          @change="statusFilterChange"
        />
      </FilterAccordion>
      <ItemDivider />
      <FilterAccordion :title="$t('orders.date_ordered').toString()">
        <div
          class="mt-2 d-flex align-items-center justify-content-between sort-filters"
        >
          <input
            v-model="filter.date.start"
            :placeholder="$t('notifications.start_date')"
            class="date-input"
            type="date"
          />
          <input
            v-model="filter.date.end"
            :placeholder="$t('notifications.end_date')"
            class="date-input"
            type="date"
          />
        </div>
      </FilterAccordion>

      <div
        :class="`section-actions ${mobileClass} d-flex align-items-center w-100 justify-content-between`"
      >
        <Button pill class="btn-reset btn-light" @click="resetFilter">{{
          $t('offers_received.reset')
        }}</Button>

        <Button pill class="btn-apply border-0" @click="applyFilter()"
          ><span
            >{{ $t('offers_received.apply_filters') }}
            <span v-if="filterCount">&#40;{{ filterCount }}&#41;</span></span
          ></Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
import { Button } from '~/components/common'
import FilterAccordion from '~/components/mobile/FilterAccordion'
import ItemDivider from '~/components/profile/notifications/ItemDivider'
import ButtonSelector from '~/components/mobile/ButtonSelector'
export default {
  name: 'MobileFilter',
  components: {
    ButtonSelector,
    ItemDivider,
    FilterAccordion,
    Button,
  },
  mixins: [screenSize],
  data() {
    return {
      status: [
        {
          text: this.$t('selling_page.listed'),
          value: 'listed',
        },
        {
          text: this.$t('selling_page.delisted'),
          value: 'delisted',
        },
      ],
      showFilter: true,
      filter: {
        date: {
          start: null,
          end: null,
        },
        status: [],
        sortby: null,
      },
    }
  },
  computed: {
    filterStatusText() {
      return this.$options.filters.joinAndCapitalizeFirstLetters(
        this.filter.status,
        2
      )
    },
    filterCount() {
      return (
        this.filter.status.length +
        (!!this.filter.sortby | 0) +
        (!!this.filter.date.start | 0) +
        (!!this.filter.date.end | 0)
      )
    },
  },
  methods: {
    resetFilter() {
      this.filter.date = {
        start: null,
        end: null,
      }
      this.filter.status = []
      this.filter.sortby = null
      this.applyFilter()
    },
    statusFilterChange(types) {
      this.filter.status = types
    },
    applyFilter() {
      this.$emit('filter', { ...this.filter })
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
::v-deep.custom-radio
  &.custom-control
    display: flex
    align-items: center

    label
      @include body-5-normal
      padding-top: 3px
      font-family: $font-family-sf-pro-display
      font-style: normal
      color: $color-black-9

      &:before
        color: $color-black-1
        border-color: $color-black-1
        background-color: $color-white-1
        box-shadow: none

::v-deep.custom-radio
  .custom-control-input
    &:checked ~ .custom-control-label::after
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='4' fill='%23000'/%3E%3C/svg%3E")
input.date-input
  @include body-9
  height: 49px
  width: 154px
  border-radius: 10px
  border: 1px solid $color-black-1
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-4
  padding: 15px 17px

::v-deep.divider
  border-top: 1px solid $color-gray-62
  margin-inline: 0
  margin-block: 20px

.sidebar-wrapper
  font-family: $font-sp-pro
  &.mobile
    height: 450px

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
    &.mobile
      margin-top: 6rem

@media (max-width: 576px)
  .sidebar-wrapper
    .collapses
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
