<template>
  <div class="shop-filters-mobile d-flex flex-column justify-content-between h-100">
    <div>
      <div class="border-bottom pb-3">
        <h5 class="fs-16 fw-7 text-base-blue font-secondary">{{ $t('common.sort_by') }}</h5>
        <Radio
          v-for="(option, index) in SORT_OPTIONS"
          :key="index"
          v-model="sortBy"
          class="mb-2"
          :label="option.label"
          :val="option.value"
          name="sortFilter"
          @change="selectedStatus"
        />
      </div>
      <div class="border-bottom pb-3 mt-2">
        <Collapse :title="$tc('common.size_type', 1)" :selectedValue="activeSizeTypes">
          <div class="row">
            <div
              v-for="(sizeType, index) in sizeTypeOptions"
              :key="index"
              class="col-4 mb-3"
            >
              <Checkbox
                v-model="selectedSizeType"
                button
                :label="sizeType.label"
                :val="sizeType.value"
                name="sizeType"
                @change="getSizeType"
              />
            </div>
          </div>
        </Collapse>
      </div>

      <div class="border-bottom py-3">
        <Collapse
          :title="$t('filter_sidebar.brands')"
          :selectedValue="activeBrands"
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
                @change="getBrands"
              />
            </div>
            <div class="text-center w-100">
              <button
                class="fs-14 fw-5 font-secondary text-base-blue bg-transparent border-0"
                @click="$emit('showAllBrands', selectedBrand)"
              >
                {{ $t('common.view_more') }}
              </button>
            </div>
          </div>
        </Collapse>
      </div>

      <div v-if="isArchive" class="border-bottom pb-2 mt-2">
        <div class="py-1">
          <collapsible-box :title="$t('filter_sidebar.year')" :second-title="selectedDateString">
            <div class="row">
              <div class="col mt-2">
                <CalendarInput
                  class="mr-4"
                  :value="years.start"
                  :placeholder="$t('bids.start_date').toString()"
                  @context="(context) => years.start = context.selectedYMD"
                ></CalendarInput>
              </div>
              <div class="col mt-2">
                <CalendarInput
                  class="mr-4"
                  :value="years.end"
                  :placeholder="$t('bids.end_date').toString()"
                  @context="(context) => years.end = context.selectedYMD"
                ></CalendarInput>
              </div>
            </div>
          </collapsible-box>
        </div>
      </div>
    </div>
    <div
      class="bottom-sheet-footers d-flex justify-content-between align-items-center w-100 mb-5"
    >
      <button
        class="btn fs-16 fw-6 font-secondary rounded-pill btn-outline-dark"
        @click="clearFilters"
      >
        {{ $t('common.reset') }}
      </button>
      <button
        class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
        @click="applyFilters"
      >
        {{ $t('common.apply_filters') }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Collapse from '~/components/common/Collapse'
import Radio from '~/components/common/form/Radio'
import Checkbox from '~/components/common/form/Checkbox'
import { TYPE, ACTIVE } from '~/static/constants/shop-by-style'
import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
} from '~/static/constants'
import CollapsibleBox from '~/components/common/CollapsibleBox'
import CalendarInput from '~/components/common/form/CalendarInput'
export default {
  name: 'ShopFiltersMobile',
  components: { Collapse, Radio, Checkbox, CollapsibleBox, CalendarInput },
  props: {
    dateFilter: {
      type: String,
      default: ''
    },
    defaultType: {
      type: String,
      default: ''
    },
    defaultBrand: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      SORT_OPTIONS: [
        {
          label: this.$tc('common.all', 2),
          value: TYPE,
        },
        {
          label: this.$tc('home.trending', 2),
          value: 'grid',
        },
        {
          label: this.$tc('common.best_seller', 2),
          value: 'best_sellers',
        },
        {
          label: this.$t('shop_by_style.archive'),
          value: 'Archive',
        },
      ],
      sortBy: TYPE,

      selectedCategory: '',
      search: '',
      brands: [],
      selectedBrand: [],
      selectedSizeType: [],
      years: {
        start: '',
        end: ''
      },
      allFilters: {},
      status: ACTIVE,
      checkedTypes: [],
      checkedBrands: [],
      isArchive: this.dateFilter
    }
  },
  watch: {
    defaultBrand(brands) {
      this.selectedBrand = brands
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedBrands',
      'selectedSizeTypes',
      'selectedYears'
    ]),

    brandOptionsLess() {
      return this.brandOptions?.slice(0, 9)
    },

    selectedSizes() {
      return this.sizes.join(', ')
    },

    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },

    activeBrands() {
      return this.selectedBrand.join(', ')
    },

    activeSizeTypes() {
      return this.selectedSizeType.join(', ')
    },

    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: type, value: type }
      })
    },

    selectedYearRange() {
      return this.years.start ? `${this.years.start}-${this.years.end}` : ''
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

    filtersUpdated() {
      return (
        _.xor(this.brands, this.selectedBrands).length > 0 ||
        _.xor(this.sizeTypes, this.selectedSizeTypes).length > 0
      )
    },

    filtersCleared() {
      return (
        !this.brands &&
        !this.years &&
        !this.sizeTypes
      )
    },
    selectedDateString() {
      if (this.years.start || this.years.end) {
        return this.years.start + ' to ' + this.years.end
      }
      return ''
    }
  },
  created() {
    this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
    this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
  },
  
  mounted() {
    this.loadFilter()
  },

  methods: {
    selectedStatus(value) {
      if(value === this.$t('shop_by_style.archive')) {
        this.status = 'archived'
        this.isArchive = true
      } else {
        this.status = ACTIVE
        this.isArchive = false
      }
    },
    getSizeType(value) {
      this.selectedSizeType = this.checkedTypes;
      if(this.selectedSizeType.includes(value)){
        this.selectedSizeType.splice(this.selectedSizeType.indexOf(value), 1);
          return;
      }
      this.selectedSizeType.push(value);
    },

    getBrands(value) {
      this.selectedBrand = this.checkedBrands;
      if(this.selectedBrand.includes(value)){
        this.selectedBrand.splice(this.selectedBrand.indexOf(value), 1);
          return;
      }
      this.selectedBrand.push(value);
    },

    loadFilter() {
      if(this.dateFilter !== '') {
        this.sortBy = this.status = this.$t('shop_by_style.archive')
      } else {
        this.sortBy = this.defaultType
      }
    },
    
    loadPage() {
      this.$axios
        .get('shop-by-style', {
          params: {
            selectedType: (this.sortBy === this.$t('shop_by_style.archive')) ? 'look' : this.sortBy,
            status: this.status,
            filters: JSON.stringify(this.allFilters)
          }
        })
        .then((res) => {
          this.$emit('getStyles', res.data.data)
        })
        .catch(error => {
          this.$toasted.error(error)
        }) 
    },  
    applyFilters() {
      
      this.allFilters = {
        year: this.years,
        brandsSelected: this.selectedBrand ? this.selectedBrand : [],
        sizeTypes: this.selectedSizeType ? this.selectedSizeType : []
      }
      this.loadPage()
    },
    clearFilters() {
      this.selectedBrand = []
      this.selectedSizeType = []
      this.years = {
        start: '',
        end: ''
      }
      this.sortBy = TYPE
      this.loadPage()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.shop-filters-mobile 
  margin: 0 19px
.apply-btn
  background-color: $color-blue-20
.bottom-sheet-footers
  .btn
    width: 134px
</style>