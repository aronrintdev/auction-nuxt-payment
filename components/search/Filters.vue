<template>
  <div class="search-filters-container">
    <div class="header">{{ $tc('common.filter', 2) }}</div>

    <div class="main">
      <div class="section-filters">
        <FormCheckboxGroup
          v-model="typeSelected"
          :options="typeOptions"
          :label="$tc('common.type', 1)"
          class="mx-5 form-checkbox-group"
          stacked
        />

        <FormCheckboxGroup
          v-model="sizeTypeSelected"
          :options="sizeTypeOptions"
          :label="$tc('common.size_type', 1)"
          class="mx-5 form-checkbox-group"
          stacked
        />

        <FormCheckboxGroup
          v-model="categorySelected"
          :options="categoryOptions"
          :label="$tc('common.category', 1)"
          class="mx-5 form-checkbox-group"
          stacked
        />

        <SliderInput
          v-model="yearsSelected"
          :title="$t('filter_sidebar.year')"
          :minLabel="$t('filter_sidebar.year_items.start')"
          :maxLabel="$t('filter_sidebar.year_items.end')"
          :fromLabel="$t('filter_sidebar.year_items.from')"
          :toLabel="$t('filter_sidebar.year_items.to')"
          :minValue="minYear"
          :maxValue="maxYear"
          :minRange="MIN_YEAR_RANGE_WINDOW"
          class="mx-5 slider-input-year"
        />

        <FormCheckboxGroup
          v-if="sizeTypeSelected.length"
          v-model="sizeSelected"
          :options="sizeOptions"
          :label="$tc('common.size', 2)"
          class="form-checkbox-group with-border w-100 mx-5"
        />
      </div>

      <div
        class="d-flex align-items-baseline justify-content-end section-actions"
      >
        <Button
          v-if="filtersSelected"
          variant="link"
          class="mx-5 btn-clear flex-shrink-0"
          @click="resetFilter"
          >{{ $t('vendor_purchase.clear_all_filters') }}</Button
        >

        <div v-if="filtersSelected" class="flex-grow-1">
          <b-badge v-for="type in typeSelected" :key="`type-${type}`">
            {{ filterLabel('type', type) }}
            <Icon
              src="close3.svg"
              width="9"
              height="9"
              @click="removeFilter('type', type)"
            />
          </b-badge>
          <b-badge
            v-for="sizeType in sizeTypeSelected"
            :key="`type-${sizeType}`"
          >
            {{ filterLabel('sizeType', sizeType) }}
            <Icon
              src="close3.svg"
              width="9"
              height="9"
              @click="removeFilter('sizeType', sizeType)"
            />
          </b-badge>
          <b-badge
            v-for="category in categorySelected"
            :key="`type-${category}`"
          >
            {{ filterLabel('category', category) }}
            <Icon
              src="close3.svg"
              width="9"
              height="9"
              @click="removeFilter('category', category)"
            />
          </b-badge>
          <b-badge v-if="yearsSelected[0] != null && yearsSelected[1] != null">
            {{
              `${$t('common.year')}: ${yearsSelected[0]}-${yearsSelected[1]}`
            }}
            <Icon src="close3.svg" width="9" height="9" @click="resetYear()" />
          </b-badge>
          <b-badge v-for="size in sizeSelected" :key="`type-${size}`">
            {{ filterLabel('size', size) }}
            <Icon
              src="close3.svg"
              width="9"
              height="9"
              @click="removeFilter('size', size)"
            />
          </b-badge>
        </div>

        <Button
          variant="info"
          class="btn-apply mx-5 flex-shrink-0"
          :disabled="!filtersUpdated"
          @click="handleApply"
          >{{ $t('filter_sidebar.apply_filters') }}</Button
        >
      </div>
    </div>

    <div class="text-center">
      <Icon
        src="arrow-up-gray3.svg"
        width="20"
        height="20"
        class="mt-3 btn-close"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import {
  SliderInput,
  Button,
  FormCheckboxGroup,
  Icon,
} from '~/components/common'
import { MIN_YEAR_RANGE_WINDOW, MIN_YEAR, MAX_YEAR } from '~/static/constants'

export default {
  name: 'SearchFilters',

  components: {
    SliderInput,
    Button,
    FormCheckboxGroup,
    Icon,
  },

  data() {
    return {
      typeSelected: [],
      typeOptions: [
        { text: 'Shop', value: 'shop' },
        { text: 'Trade', value: 'trade' },
        { text: 'Auction', value: 'auction' },
      ],
      sizeTypeSelected: [],
      categorySelected: [],
      categoryOptions: [
        { text: 'Footwear', value: 'sneakers' },
        { text: 'Apparel', value: 'apparel' },
        { text: 'Accessories', value: 'accessories' },
      ],
      yearsSelected: [],
      MIN_YEAR_RANGE_WINDOW,
      sizeSelected: [],
      filtersApplied: {
        typeSelected: [],
        sizeTypeSelected: [],
        categorySelected: [],
        yearsSelected: [],
        sizeSelected: [],
      },
    }
  },

  computed: {
    ...mapGetters('browse', ['filters']),

    minYear() {
      if (this.filters?.year_range?.min == null) {
        return MIN_YEAR
      } else {
        return Number(this.filters?.year_range?.min)
      }
    },

    maxYear() {
      if (this.filters?.year_range?.max == null) {
        return MAX_YEAR
      } else {
        return Number(this.filters?.year_range?.max)
      }
    },

    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { text: capitalizeFirstLetter(type), value: type }
      })
    },

    sizeOptions() {
      return this.filters?.sizes
        ?.filter(({ type }) => this.sizeTypeSelected.includes(type))
        .map(({ size, type, id }) => {
          return {
            text: `${capitalizeFirstLetter(type)} - ${size}`,
            value: id,
          }
        })
    },

    filtersSelected() {
      return (
        this.typeSelected.length ||
        this.sizeTypeSelected.length ||
        this.categorySelected.length ||
        this.yearsSelected.length ||
        this.sizeSelected.length
      )
    },

    filtersUpdated() {
      return (
        _.xor(this.typeSelected, this.filtersApplied.typeSelected).length > 0 ||
        _.xor(this.sizeTypeSelected, this.filtersApplied.sizeTypeSelected)
          .length > 0 ||
        _.xor(this.categorySelected, this.filtersApplied.categorySelected)
          .length > 0 ||
        _.xor(this.yearsSelected, this.filtersApplied.yearsSelected).length >
          0 ||
        _.xor(this.sizeSelected, this.filtersApplied.sizeSelected).length > 0
      )
    },
  },

  watch: {
    sizeTypeSelected: {
      handler(newVal) {
        const sizeSelected = _.cloneDeep(this.sizeSelected)
        sizeSelected?.forEach((size) => {
          const { type } = this.filters?.sizes?.find(({ id }) => id === size)
          if (!newVal.includes(type)) {
            this.removeFilter('size', size)
          }
        })
      },
    },
  },

  methods: {
    filterLabel(type, value) {
      const key = type + 'Options'
      return this[key].find((i) => i.value === value)?.text
    },

    removeFilter(type, value) {
      const key = type + 'Selected'
      this[key].splice(this[key].indexOf(value), 1)
    },

    resetYear() {
      this.yearsSelected = []
    },

    resetFilter() {
      this.typeSelected.splice(0, this.typeSelected.length)
      this.sizeTypeSelected.splice(0, this.sizeTypeSelected.length)
      this.categorySelected.splice(0, this.categorySelected.length)
      this.yearsSelected.splice(0, this.yearsSelected.length)
      this.sizeSelected.splice(0, this.sizeSelected.length)
      this.handleApply()
    },

    handleApply() {
      const filters = {}
      if (this.typeSelected && this.typeSelected.length > 0) {
        filters.types = this.typeSelected
      }
      if (this.sizeTypeSelected && this.sizeTypeSelected.length > 0) {
        filters.sizeTypes = this.sizeTypeSelected
      }
      if (this.categorySelected && this.categorySelected.length > 0) {
        filters.categories = this.categorySelected
      }
      if (
        this.yearsSelected &&
        this.yearsSelected[0] != null &&
        this.yearsSelected[1] != null
      ) {
        filters.years = this.yearsSelected
      }
      if (this.sizeSelected && this.sizeSelected.length > 0) {
        filters.sizes = this.sizeSelected
      }
      this.$emit('apply', filters)
      this.filtersApplied = _.cloneDeep({
        typeSelected: this.typeSelected,
        sizeTypeSelected: this.sizeTypeSelected,
        categorySelected: this.categorySelected,
        yearsSelected: this.yearsSelected,
        sizeSelected: this.sizeSelected,
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.search-filters-container
  display: flex
  flex-direction: column
  align-items: center

  .header
    @include body-2-medium
    color: $color-black-1

  .main
    width: 100%
    background-color: $color-gray-1
    border-radius: 8px
    max-width: 1198px
    padding: 20px
    margin-top: 20px

    .section-filters
      display: flex
      flex-wrap: wrap

      .form-checkbox-group::v-deep
        margin-bottom: 30px

        &.with-border:not(:last-of-type)
          border-bottom: 1px solid $color-gray-58
          padding-bottom: 21px

        .form-group
          max-height: 200px
          overflow-y: scroll
          padding: 0px

          .custom-checkbox
            min-width: 80px

            > input.custom-control-input
              &:checked
                &::after
                  background-color: $color-blue-20
                  border-color: $color-blue-20

      .slider-input-year::v-deep
        max-width: 191px
        font-family: SF Pro Display
        margin-bottom: 30px

        .vue-slider-process
          background-color: $color-blue-20

        .vue-slider-dot
          .vue-slider-dot-handle
            background-color: $color-blue-20

    .btn-apply::v-deep
      font-family: SF Pro Display
      @include body-4-normal
      background-color: $color-blue-20
      border-color: $color-blue-20

      &:hover
        background-color: $color-purple-2
        border-color: $color-purple-2

    .btn-clear::v-deep
      font-family: SF Pro Display
      @include body-4-normal
      color: $color-black-1
      text-decoration: underline

    .badge
      @include body-9-regular
      background-color: $color-blue-21
      border-radius: 20px
      color: $color-blue-20
      padding: 5px 8px 6px 10px
      display: inline-flex
      align-items: center
      margin-right: 10px
      margin-bottom: 4px

      >div
        margin-left: 7px
        margin-top: 1px
        cursor: pointer

  .btn-close
    cursor: pointer

@media (max-width: 824px)
  .search-filters-container
    .section-actions
      flex-direction: column
      justify-content: center !important
      align-items: center !important
      width: 100%

      > *
        &:not(:last-child)
          margin-bottom: 20px

@media (max-width: 628px)
  .search-filters-container
    .main
      .section-filters
        flex-direction: column

        > div
          margin-left: 0 !important
          margin-right: 0 !important
          padding: 0 10px
          max-width: 100% !important
</style>
