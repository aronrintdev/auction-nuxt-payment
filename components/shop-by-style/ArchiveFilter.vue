<template>
  <div class="filter-wrapper d-flex align-items-center flex-column">
    <div class="header mb-2">{{ $tc('common.filter', 1) }}</div>
    <div class="main w-100">
      <div class="filters-wrapper d-flex align-items-center">
        <div class="size-type-filter">
          <FormDropdown
            id="size-type"
            :value="null"
            :placeholder="$t('trades.trade_arena.size_type')"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- Sizes Type -->
              <div class="filter-body">
                <div
                  v-for="(item, index) in sizeTypeOptions"
                  :key="index"
                  class="form-check"
                >
                  <input
                    :id="`sizeType-flexCheckDefault-${index}`"
                    v-model="sizeTypeSelected"
                    class="form-check-input"
                    :value="item.value"
                    type="checkbox"
                  />
                  <label
                    :for="`sizeType-flexCheckDefault-${index}`"
                    class="form-check-label text-capitalize"
                  >
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </template>
          </FormDropdown>
        </div>
        <div class="brand-type-filter mr-2">
          <FormDropdown
            id="brands"
            :value="null"
            :placeholder="$t('filter_sidebar.brands')"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- brands -->
              <div class="filter-body">
                <div class="search-bar position-relative mb-2">
                  <input
                    v-model="brandName"
                    type="search"
                    placeholder="Search for Brands"
                  />
                  <img
                    class="searchbarIcon"
                    width="11px"
                    :src="require('~/assets/img/icons/search.svg')"
                  />
                </div>
                <div
                  v-for="(item, index) in filterBrands"
                  :key="index"
                  class="form-check"
                >
                  <input
                    :id="`sizeType-flexCheckDefault-${index}`"
                    v-model="brandsSelected"
                    class="form-check-input"
                    :value="item.value"
                    type="checkbox"
                  />
                  <label
                    :for="`sizeType-flexCheckDefault-${index}`"
                    class="form-check-label text-capitalize"
                  >
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </template>
          </FormDropdown>
        </div>

        <div class="date-filter borderDark rounded mr-2">
          <b-form-datepicker
            v-model="year.start"
            size="sm"
            locale="en"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mr-2 bg-white"
            :placeholder="$t('shop_by_style.filter.start_date')"
          ></b-form-datepicker>
        </div>
        <div class="date-filter borderDark rounded">
          <b-form-datepicker
            v-model="year.end"
            size="sm"
            locale="en"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mr-2 bg-white"
            :placeholder="$t('shop_by_style.filter.end_date')"
          ></b-form-datepicker>
        </div>
      </div>

      <div class="d-flex">
        <div class="d-flex w-fit-content mt-2">
          <div
            v-for="(option, index) in sizeTypeSelected"
            :key="index"
            class="p-1 br-5 d-flex align-items-center borderDark rounded mr-1 mt-1 rounded"
            @click.prevent
          >
            <span class="text-capitalize">{{ option }}</span>
            <span class="ml-3" @click.prevent="removeOption(index)">
              <Icon src="close.svg" width="10" height="10" class="btn-close" />
            </span>
          </div>
          <div
            v-for="(option, index) in brandsSelected"
            :key="index"
            class="p-1 px-2 d-flex align-items-center borderDark mr-1 mt-1 rounded"
            @click.prevent
          >
            <span class="text-capitalize">{{ option }}</span>
            <span class="ml-3" @click.prevent="removeBrand(index)">
              <Icon src="close.svg" width="10" height="10" class="btn-close" />
            </span>
          </div>
        </div>
        <div
          class="ml-auto d-flex align-items-baseline justify-content-end section-actions align-items-center flex-column"
        >
          <Button
            v-if="filtersSelected"
            variant="link"
            class="btn-clear mx-5 flex-shrink-0"
            @click="resetFilter"
            >{{ $t('vendor_purchase.clear_all_filters') }}</Button
          >
          <Button
            variant="info"
            class="btn-apply flex-shrink-0"
            :disabled="!filtersUpdated"
            @click="handleApply"
            >{{ $t('filter_sidebar.apply_filters') }}</Button
          >
        </div>
      </div>
    </div>

    <div class="text-center">
      <Icon
        src="arrow-up-gray3.svg"
        width="20"
        height="20"
        class="mt-2 btn-close"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import { Button, Icon, FormDropdown } from '~/components/common'

export default {
  name: 'ShopByStyleFilter',
  components: {
    Button,
    Icon,

    FormDropdown,
  },
  data() {
    return {
      sizeTypeSelected: [],
      brandName: '',
      filtersApplied: {
        brandsSelected: [],
        sizeTypeSelected: [],
        year: {
          start: '',
          end: '',
        },
      },
      brandsSelected: [],
      brands: null,
      year: {
        start: '',
        end: '',
      },
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },
    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: capitalizeFirstLetter(type), value: type }
      })
    },
    filtersSelected() {
      return this.sizeTypeSelected.length + this.brandsSelected.length
    },
    filtersUpdated() {
      return (
        _.xor(
          this.sizeTypeSelected,
          this.filtersApplied.sizeTypeSelected,
          this.brandsSelected,
          this.filtersApplied.brandsSelected
        ).length > 0
      )
    },
    filterBrands() {
      if (this.brandName.trim() === '') {
        return this.brandOptions
      }
      return this.brandOptions.filter(
        (brand) =>
          brand.label?.toLowerCase().indexOf(this.brandName.toLowerCase()) > -1
      )
    },
  },
  methods: {
    resetFilter() {
      this.sizeTypeSelected.splice(0, this.sizeTypeSelected.length)
      this.brandsSelected.splice(0, this.brandsSelected.length)
      this.year.start = ''
      this.year.end = ''
      this.handleApply()
    },
    handleApply() {
      const filters = {}
      if (
        (this.sizeTypeSelected && this.sizeTypeSelected.length > 0) ||
        (this.brandsSelected && this.brandsSelected.length > 0)
      ) {
        filters.sizeTypes = this.sizeTypeSelected
        filters.brandsSelected = this.brandsSelected
        filters.year = this.year
      }
      this.$emit('apply', filters)
      this.filtersApplied = _.cloneDeep({
        sizeTypeSelected: this.sizeTypeSelected,
        brandsSelected: this.brandsSelected,
        year: this.year,
      })
    },
    removeOption(index) {
      this.sizeTypeSelected.splice(index, 1)
    },
    removeBrand(index) {
      this.brandsSelected.splice(index, 1)
    },
    handleSearchChange(value) {
      if (value) {
        this.brands = this.brandOptions
        const result = []
        this.brands.forEach((element, index) => {
          if (element.label.toLowerCase().includes(value.toLowerCase())) {
            result.push(element)
          }
        })
        this.brands = result.length ? result : this.brandOptions
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.borderDark
  border: 1px solid $color-gray-23

.w-fit-content
  width: fit-content
.filter-wrapper
  .header
    @include body-2-medium
    color: $color-black-1

  .main
    font-family: $font-family-sf-pro-display
    background-color: $color-white-5
    padding: 20px 18px 11px 40px

    .btn-apply::v-deep
      @include body-4-normal

    .btn-clear::v-deep
      @include body-4-normal
      text-decoration: underline

  .btn-close
    cursor: pointer

@media (max-width: 576px)
  .filter-wrapper
    .main
      .section-actions
        > button
          margin: 10px 0

// filter checkboxes
.dropdown-sort::v-deep
  .btn-dropdown
    color: $color-black-1
    border-width: 0
    background-color: $color-white-4
    border-radius: 8px
    height: 44px
    width: 100%
    padding: 0 23px
    border: 1px solid $color-gray-23
    &.opened
      border-bottom: 0
    .icon-main
      margin-right: 20px
    .icon-clear
      right: 23px
    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
  .search-results
    .popover-body
      .dropdownItem
        background-color: $color-white-4
        height: 46px
        padding: 0 23px
        &:hover
          color: $color-gray-5
        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
.filter-body
  max-height: 252px
  padding-bottom: 10px
  margin-bottom: 20px
  overflow-x: hidden
  overflow-y: auto
  scroll-behavior: smooth
  .search-bar
    input[type="search"]
      border: 0
      width: calc(100% - 10px)
      height: 26px
      padding-left: 26px
      padding-right: 10px
    img
      position: absolute
      left: 10px
      top: 50%
      transform: translate(0 , -50%)

  .slider-input::v-deep
    margin-top: 0
  .form-check
    margin-bottom: 7px
    & > *
      cursor: pointer
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
.size-type-filter::v-deep
  width: 200px
  margin-right: 54px
  .popover-body
    .dropdown_wrapper
      border: 1px solid $color-gray-23
      border-radius: 0 0 8px 8px
      border-top: 0
.brand-type-filter::v-deep
  width: 330px
  .popover-body
    .dropdown_wrapper
      border: 1px solid $color-gray-23
      border-radius: 0 0 8px 8px
      border-top: 0
::-webkit-scrollbar
  width: 6px
::-webkit-scrollbar-thumb
  background-color: $color-blue-2
  border: none
::-webkit-scrollbar-track
  background-color: $color-gray-3
</style>
