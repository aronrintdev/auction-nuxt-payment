<template>
  <div class="sidebar-wrapper">
    <ShopBreadcrumb />

    <client-only>
      <div class="sliders">
        <SliderInput
          v-model="years"
          :title="$t('filter_sidebar.year')"
          :minLabel="$t('filter_sidebar.year_items.start')"
          :maxLabel="$t('filter_sidebar.year_items.end')"
          :fromLabel="$t('filter_sidebar.year_items.from')"
          :toLabel="$t('filter_sidebar.year_items.to')"
          :minValue="minYear"
          :maxValue="maxYear"
          :minRange="MIN_YEAR_RANGE_WINDOW"
          class="mt-4"
        />

        <SliderInput
          v-model="prices"
          :title="$t('filter_sidebar.price')"
          :minLabel="$t('filter_sidebar.price_items.min')"
          :maxLabel="$t('filter_sidebar.price_items.max')"
          :fromLabel="$t('filter_sidebar.price_items.from')"
          :toLabel="$t('filter_sidebar.price_items.to')"
          :minValue="minPrice"
          :maxValue="maxPrice"
          :minRange="MIN_PRICE_RANGE_WINDOW"
          :multiplier="100"
          class="mt-4"
        />
      </div>

      <div class="collapses">
        <!-- Brand -->
        <FilterCollapsible
          v-model="brands"
          collapseKey="brands"
          :title="$t('filter_sidebar.brands')"
          :options="brandOptions"
          class="mt-4"
        />

        <!-- Gender -->
        <FilterCollapsible
          v-model="sizeTypes"
          collapseKey="size-types"
          :title="$t('filter_sidebar.size_types')"
          :options="sizeTypeOptions"
          class="mt-4"
        />

        <!-- Sizes -->
        <FilterCollapsible
          v-model="sizes"
          collapseKey="sizes"
          :title="$t('filter_sidebar.sizes')"
          :options="sizeOptions"
          class="mt-4"
        />
      </div>
    </client-only>

    <div class="section-actions mt-4">
      <Button
        pill
        class="btn-apply"
        :disabled="!filtersUpdated"
        @click="applyFilters"
        >{{ $t('filter_sidebar.apply_filters') }}</Button
      >

      <Button
        variant="light"
        icon="delete.png"
        icon-only
        :tooltip-text="$t('vendor_purchase.clear_all_filters')"
        :disabled="filtersCleared"
        pill
        class="btn-reset"
        @click="handleResetClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import {
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
} from '~/static/constants'
import Button from '~/components/common/Button'
import SliderInput from '~/components/common/SliderInput'
import FilterCollapsible from '~/components/common/FilterCollapsible'
import ShopBreadcrumb from '~/components/shop/Breadcrumb'

export default {
  components: {
    SliderInput,
    Button,
    FilterCollapsible,
    ShopBreadcrumb,
  },

  fetchOnServer: false,

  data() {
    return {
      years: null,
      prices: null,
      brands: null,
      sizes: null,
      sizeTypes: null,
    }
  },

  computed: {
    // Get the details from browse store
    ...mapGetters('browse', [
      'filters',
      'selectedPrices',
      'selectedYears',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
    ]),

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

    minPrice() {
      if (this.filters?.price_range?.min == null) {
        return MIN_PRICE
      } else {
        return Number(this.filters?.price_range?.min)
      }
    },

    maxPrice() {
      if (this.filters?.price_range?.max == null) {
        return MAX_PRICE
      } else {
        return Number(this.filters?.price_range?.max)
      }
    },

    sizeOptions() {
      let options = this.filters?.sizes
      if (options && this.sizeTypes && this.sizeTypes.length > 0) {
        options = options.filter(({ type }) => this.sizeTypes.includes(type))
      }
      return (
        options?.map(({ id, size, type }) => {
          return {
            label: `${type} - ${size}`,
            value: id,
          }
        }) || []
      )
    },

    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },

    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: type, value: type }
      })
    },

    filtersUpdated() {
      return (
        !_.isEqual(this.prices, this.selectedPrices) ||
        !_.isEqual(this.years, this.selectedYears) ||
        _.xor(this.brands, this.selectedBrands).length > 0 ||
        _.xor(this.sizes, this.selectedSizes).length > 0 ||
        _.xor(this.sizeTypes, this.selectedSizeTypes).length > 0
      )
    },

    filtersCleared() {
      return (
        !this.prices &&
        !this.years &&
        !this.brands &&
        !this.sizes &&
        !this.sizeTypes
      )
    },
  },

  created() {
    this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
    this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
    this.loadOptions()
  },

  methods: {
    ...mapActions('browse', ['resetFilters']),

    loadOptions() {
      this.prices = this.selectedPrices
      this.years = this.selectedYears
      this.brands = this.selectedBrands
      this.sizes = this.selectedSizes
      this.sizeTypes = this.selectedSizesTypes
    },

    applyFilters() {
      this.$store.commit('browse/setSelectedYears', this.years)
      this.$store.commit('browse/setSelectedPrices', this.prices)
      this.$store.commit('browse/setSelectedBrands', this.brands)
      this.$store.commit('browse/setSelectedSizeTypes', this.sizeTypes)
      if (this.sizeTypes && this.sizeTypes.length > 0 && this.sizes) {
        const newSizes = this.sizes.filter((size) =>
          this.filters?.sizes?.find(
            (s) => s.id === size && this.sizeTypes.includes(s.type)
          )
        )
        this.$store.commit('browse/setSelectedSizes', newSizes)
      } else {
        this.$store.commit('browse/setSelectedSizes', this.sizes)
      }
      this.$emit('apply')
    },

    handleResetClick() {
      this.prices = null
      this.years = null
      this.brands = null
      this.sizes = null
      this.sizeTypes = null
      this.resetFilters()
      this.$emit('apply')
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.sidebar-wrapper
  font-family: SF Pro Display
  background-color: $color-white-14
  padding: 60px 34px 60px 39px
  display: flex
  flex-direction: column
  align-items: flex-start
  // height: 100%

  .sliders, .collapses
    display: flex
    flex-direction: column
    width: 100%

  .btn-apply
    padding: 10px 22px

  .btn-reset
    box-shadow: none !important
    border: 1px solid $color-white-3

  .section-actions
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between

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
</style>
