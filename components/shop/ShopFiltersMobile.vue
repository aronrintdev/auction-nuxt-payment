<template>
  <div class="ShopFiltersMobile">
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
          class="mb-2"
          :label="option.label"
          :val="option.value"
          name="sortFilter"
          @change="handleSortBySelect"
        />
      </div>
      <div class="border-bottom py-3">
        <Collapse
          :title="$t('createlisting.category')"
          :selectedValue="getCategoryLabel(category)"
        >
          <div class="row">
            <div
              v-for="(cat, index) in categories"
              :key="index"
              class="col-4 mb-2"
            >
              <Radio
                v-model="category"
                button
                :label="cat.label"
                :val="cat.value"
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
      <div v-if="sizeOptions.length" class="border-bottom py-3">
        <Collapse
          :title="$t('home_page.size')"
          :selectedValue="getSizesLabel(selectedSizes)"
        >
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
                :label="size.label"
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
          :selectedValue="selectedRangePrices"
        >
          <div>
            <SliderInput
              :minLabel="$t('filter_sidebar.price_items.min')"
              :maxLabel="$t('filter_sidebar.price_items.max')"
              :fromLabel="$t('filter_sidebar.price_items.from')"
              :toLabel="$t('filter_sidebar.price_items.to')"
              :minValue="MIN_PRICE"
              :maxValue="MAX_PRICE / 100"
              :min-range="MIN_PRICE_RANGE_WINDOW"
              :value="selectedPrices"
              :multiplier="1"
              class="mt-4"
              @change="updatePriceFilters"
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
        <Collapse
          :title="$t('common.year')"
          :selectedValue="selectedRangeYears"
        >
          <div>
            <SliderInput
              :minLabel="$t('filter_sidebar.year_items.start')"
              :maxLabel="$t('filter_sidebar.year_items.end')"
              :fromLabel="$t('filter_sidebar.year_items.from')"
              :toLabel="$t('filter_sidebar.year_items.to')"
              :minValue="MIN_YEAR"
              :maxValue="MAX_YEAR"
              :value="selectedYears"
              :minRange="MIN_YEAR_RANGE_WINDOW"
              class="mt-4"
              @change="updateYearFilters"
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
        @click="resetMobileFilters"
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
import Collapse from '~/components/common/Collapse'
import Radio from '~/components/common/form/Radio'
import Checkbox from '~/components/common/form/Checkbox'
import SliderInput from '~/components/shop/SliderInput'
import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
} from '~/static/constants'
export default {
  name: 'ShopFiltersMobile',
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
          value: 'created_at',
        },
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'false',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'true',
        },
      ],
      sortBy: '',
      orderBy: '',
      categories: [
        { label: this.$t('common.all'), value: 'all' },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.all_sizes', 2), value: 'all_sizes' },
      ],
      selectedRangePrices: null,
      selectedRangeYears: null,
      selectedPrices: [MIN_PRICE, MAX_PRICE / 100],
      selectedYears: [MIN_YEAR, MAX_YEAR],
      MAX_PRICE,
      MIN_PRICE,
      MAX_YEAR,
      MIN_YEAR,
      MIN_PRICE_RANGE_WINDOW,
      category: 'all',
      search: '',
      years: [],
      prices: [],
      brands: [],
      sizes: [],
      selectedBrand: [],
      selectedSizeType: '',
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
      'selectedCategory',
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
    sizeOptions() {
      if (!this.selectedSizeType) {
        return []
      }
      let options = this.filters?.sizes
      if (options && this.selectedSizeType) {
        options = options.filter(({ type }) =>
          this.selectedSizeType.includes(type)
        )
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
  },
  watch: {
    selectedCategory: {
      immediate: true,
      handler(val) {
        this.category = val
      },
    },
  },
  created() {
    this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
    this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
  },
  methods: {
    ...mapActions('browse', ['resetFilters']),
    resetMobileFilters() {
      this.sizes = []
      this.selectedSizeType = ''
      this.brands = []
      this.years = []
      this.prices = []
      this.category = 'all'
      this.search = ''
      this.sortBy = ''
      this.orderBy = ''
      this.resetFilters()
      this.applyFilters()
    },
    openSheet() {
      this.$refs.allBrands.open()
    },
    closeSheet() {
      this.$refs.allBrands.close()
    },
    applyFilters() {
      this.$store.commit('browse/setSelectedCategory', this.category)
      this.$store.commit('browse/setSelectedYears', this.years)
      this.$store.commit('browse/setSelectedPrices', this.prices)
      this.$store.commit('browse/setSelectedBrands', this.brands)
      this.$store.commit('browse/setSelectedSizeTypes', this.sizeTypes)
      this.$store.commit('browse/setSelectedSort', this.sortBy)
      this.$store.commit('browse/setSelectedOrdering', this.orderBy)

      if (this.selectedSizeType && this.sizes) {
        const newSizes = this.sizes.filter((size) =>
          this.filters?.sizes?.find(
            (s) => s.id === size && this.selectedSizeType.includes(s.type)
          )
        )
        this.$store.commit('browse/setSelectedSizes', newSizes)
      } else {
        this.$store.commit('browse/setSelectedSizes', this.sizes)
      }
      this.$emit('apply')
    },
    getCategoryLabel(value) {
      if (value) {
        const category = this.categories.find(
          (category) => category.value === value
        )
        return category.label
      }
    },
    getSizesLabel(sizes) {
      if (sizes.length) {
        const newSizes = []
        const selectedSizes = this.filters?.sizes.filter((size) =>
          this.sizes?.find((s) => s === size.id)
        )
        selectedSizes?.map(({ id, size, type }) => {
          newSizes.push(`${type} - ${size}`)
          return `${type} - ${size}`
        })
        return newSizes.join(', ')
      } else {
        return ''
      }
    },
    handleSortBySelect(option) {
      // Select SortBy option
      if (option === 'true' || option === 'false') {
        this.sortBy= option
        this.orderBy=  'sale_price'
      } else if(option === 'trending' || option === 'created_at') {
        this.sortBy= 'true'
        this.orderBy=  option
      }else{
        this.orderBy=  ''
      }
    },
    // Update selected prices and pass to parent component
    updatePriceFilters(value) {
      this.selectedPrices = value
      this.selectedRangePrices = `$${Math.trunc(value[0])}-$${Math.trunc(
        value[1]
      )}`
      this.prices = value
    },
    updateYearFilters(value) {
      this.selectedYears = value
      this.selectedRangeYears = `${Math.trunc(value[0])}-${Math.trunc(
        value[1]
      )}`
      this.years = value
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.ShopFiltersMobile
  padding-bottom: 90px
  .bottom_sheet_body
    margin: 0 19px
  .sizes-option
    display: grid
    grid-template-columns: repeat(2 , 1fr)
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
