<template>
  <div class="filtersMobile">
    <div class="border-bottom mb-3 pb-2 bottom_sheet_header">
      <h3 class="font-secondary fs-16 fw-7 text-black text-center">
        {{ $t('common.filter_by') }}
      </h3>
    </div>
    <div class="bottom_sheet_body">
      <div class="border-bottom pt-0 pb-3">
        <h5 class="fs-16 fw-7 text-base-blue font-secondary">
          {{ $t('selling_page.filter.sort') }}
        </h5>
        <Radio
          v-for="(option, index) in SORT_OPTIONS"
          :key="index"
          v-model="sortBy"
          class="mb-2"
          :label="option.label"
          :val="option.value"
          name="sortFilter"
        />
      </div>
      <div class="border-bottom py-3">
        <Collapse
          :title="$t('createlisting.category')"
          :selectedValue="selectedCategory"
        >
          <div class="row">
            <div
              v-for="(category, index) in categories"
              :key="index"
              class="col-4"
            >
              <Radio
                v-model="selectedCategory"
                button
                :label="category.label"
                :val="category.value"
                name="category"
              />
            </div>
          </div>
        </Collapse>
      </div>
      <div class="border-bottom py-3">
        <Collapse
          :title="$t('common.sizetype')"
          :selectedValue="selectedSizeType"
        >
          <div class="row">
            <div
              v-for="(sizeType, index) in sizeTypeOptions"
              :key="index"
              class="col-4 mb-3"
            >
              <Radio
                v-model="selectedSizeType"
                button
                :label="sizeType.label"
                :val="sizeType.value"
                name="sizeType"
              />
            </div>
          </div>
        </Collapse>
      </div>
      <div class="border-bottom py-3">
        <Collapse :title="$t('home_page.size')" :selectedValue="selectedSizes">
          <div class="sizes-option">
            <div
              v-for="(size, index) in sizeOptions"
              :key="index"
              class="size-option"
              :class="`size-option-${index}`"
            >
              <Checkbox
                v-model="sizes"
                button
                :label="size.value"
                :val="size.value"
                name="size"
              />
            </div>
          </div>
        </Collapse>
      </div>
      <div class="border-bottom py-3">
        <Collapse
          :title="$t('common.price_range')"
          :selectedValue="selectedPriceRange"
        >
          <div>
            <SliderInput
              v-model="prices"
              :minLabel="$t('filter_sidebar.price_items.min')"
              :maxLabel="$t('filter_sidebar.price_items.max')"
              :fromLabel="$t('filter_sidebar.price_items.from')"
              :toLabel="$t('filter_sidebar.price_items.to')"
              :minValue="100"
              :maxValue="800"
              :minRange="MIN_PRICE_RANGE_WINDOW"
              :multiplier="1"
              class="mt-4"
            />
          </div>
        </Collapse>
      </div>
      <div class="border-bottom py-3">
        <Collapse
          :title="$t('filter_sidebar.brands')"
          :selectedValue="selectedBrandsValue"
        >
          <div class="row">
            <div
              v-for="(brandCategory, index) in brandOptionsLess"
              :key="index"
              class="col-4 mb-3"
            >
              <Checkbox
                v-model="selectedBrand"
                button
                :label="brandCategory.label"
                :val="brandCategory.value"
                name="brandCategory"
              />
            </div>
            <div class="text-center w-100">
              <button
                class="fs-14 fw-5 font-secondary text-base-blue bg-transparent border-0"
                @click="$emit('showAllBrands')"
              >
                View More
              </button>
            </div>
          </div>
        </Collapse>
      </div>
      <div class="border-bottom py-3">
        <Collapse :title="$t('common.year')" :selectedValue="selectedYearRange">
          <div>
            <SliderInput
              v-model="years"
              :minLabel="$t('filter_sidebar.year_items.start')"
              :maxLabel="$t('filter_sidebar.year_items.end')"
              :fromLabel="$t('filter_sidebar.year_items.from')"
              :toLabel="$t('filter_sidebar.year_items.to')"
              :minValue="minYear"
              :maxValue="maxYear"
              :minRange="MIN_YEAR_RANGE_WINDOW"
              class="mt-4"
            />
          </div>
        </Collapse>
      </div>
    </div>
    <div
      class="bottom-sheet-footers position-absolute d-flex justify-content-between align-items-center w-100 p-3 bg-white"
    >
      <button
        class="btn fs-16 fw-6 font-secondary rounded-pill btn-outline-dark"
        @click="resetFilters"
      >
        {{ $t('common.reset') }}
      </button>
      <button
        class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
        @click="applyFilters"
      >
        {{ $t('orders.apply_filter') }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import Collapse from '~/components/common/Collapse'
import Radio from '~/components/common/form/Radio'
import Checkbox from '~/components/common/form/Checkbox'
import SliderInput from '~/components/common/SliderInput'
import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
} from '~/static/constants'
export default {
  name: 'FiltersMobile',
  components: { Collapse, Radio, Checkbox, SliderInput },
  data() {
    return {
      SORT_OPTIONS: [
        {
          label: this.$t('home.trending'),
          value: 'trending',
        },
        {
          label: this.$t('home_page.newest'),
          value: 'newest',
        },
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'price_asc',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'price_desc',
        },
      ],
      sortBy: 'trending',
      categories: [
        { label: 'Footwear', value: 'footwear' },
        { label: 'Apparel', value: 'apparel' },
        { label: 'Accessories', value: 'accessories' },
      ],
      selectedCategory: 'apparel',
      search: '',
      years: ['2001', '2022'],
      prices: ['150', '700'],
      brands: [],
      sizes: ['62', '64'],
      selectedBrand: ['BAPE'],
      selectedSizeType: 'child',
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedPrices',
      'selectedYears',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
    ]),

    brandOptionsLess() {
      return this.brandOptions?.slice(0, 9)
    },

    selectedSizes() {
      return this.sizes.join(', ')
    },
    selectedBrandsValue() {
      return this.selectedBrand.join(', ')
    },
    selectedPriceRange() {
      return `$${Math.trunc(this.prices[0])}-$${Math.trunc(this.prices[1])}`
    },
    selectedYearRange() {
      return `${this.years[0]}-${this.years[1]}`
    },

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
  },
  methods: {
    ...mapActions('browse', ['resetFilters']),
    openSheet() {
      this.$refs.allBrands.open()
    },
    closeSheet() {
      this.$refs.allBrands.close()
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
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.filtersMobile
  padding-bottom: 90px
  .bottom_sheet_body
    margin: 0 19px
  .sizes-option
    display: grid
    grid-template-columns: repeat(5 , 1fr)
    gap: 14px
  .bottom-sheet-footers
    bottom: 0
    z-index: 9
    .btn
      width: 134px
    .apply-btn
        background-color: $color-blue-20
::v-deep .bottom-sheet__content
  margin-right: -8px
</style>
