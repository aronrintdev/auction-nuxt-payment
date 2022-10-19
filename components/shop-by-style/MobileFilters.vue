<template>
    <div class="shop-filters-mobile">
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
        />
      </div>
      <div class="border-bottom pb-3 mt-2">
        <Collapse :title="$tc('common.size_type', 1)" :selectedValue="selectedSizeType">
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
                @change="getSizeType"
              />
            </div>
          </div>
        </Collapse>
      </div>  
      
      <div class="border-bottom pb-3 mt-2">
        <Collapse :title="$t('filter_sidebar.brands')" :selectedValue="selectedBrand">
          <div class="row">
            <div
              v-for="(brandCategory, index) in brandOptions"
              :key="index"
              class="col-4 mb-3"
            >
              <Radio
                v-model="selectedBrand"
                button
                :label="brandCategory.label"
                :val="brandCategory.value"
                name="brandCategory"
                @change="getBrands"
              />
            </div>
          </div>
        </Collapse>
      </div>

      <div v-if="dateFilter" class="border-bottom pb-3 mt-2">
        <Collapse :title="$t('filter_sidebar.year')" :selectedValue="selectedYearRange">
          <b-row>
            <b-col sm="2" class="w-50">
                <b-form-datepicker
                    size="sm"
                    locale="en"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    class="mr-2  bg-transparent border border-secondary rounded-5"
                    :placeholder="$t('shop_by_style.filter.start_date')"
                ></b-form-datepicker>
            </b-col>
            <b-col sm="2" class="w-50">
                <b-form-datepicker
                    size="sm"
                    locale="en"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    class="mr-2 bg-transparent border border-secondary rounded-5"
                    :placeholder="$t('shop_by_style.filter.end_date')"
                ></b-form-datepicker>
            </b-col>
          </b-row>
        </Collapse>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  import Collapse from '~/components/common/Collapse'
  import Radio from '~/components/common/form/Radio'
  import { TYPE, ACTIVE } from '~/static/constants/shop-by-style'
  import {
    MIN_YEAR,
    MAX_YEAR,
    MIN_PRICE_RANGE_WINDOW,
    MIN_YEAR_RANGE_WINDOW,
  } from '~/static/constants'
  export default {
    name: 'ShopFiltersMobile',
    components: { Collapse, Radio },
    props: {
      dateFilter: {
        type: String,
        default: ''
      },
      defaultType: {
        type: String,
        default: ''
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
        selectedBrand: '',
        selectedSizeType: '',
        years: '',
        allFilters: {},
        status: ACTIVE,
        checkedTypes: [],
        checkedBrands: []
      }
    },
    computed: {
      ...mapGetters('browse', [
        'filters',
        'selectedBrands',
        'selectedSizeTypes',
        'selectedYears'
      ]),
  
      selectedSizes() {
        return this.sizes.join(', ')
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
    },
    created() {
      this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
      this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
    },
    
    mounted() {
      this.loadFilter()
    },

    methods: {
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
              selectedType: (this.sortBy === this.$t('shop_by_style.archive')) ? TYPE : this.sortBy,
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
          brandsSelected: this.selectedBrand ? [this.selectedBrand] : [],
          sizeTypes: this.selectedSizeType ? [this.selectedSizeType] : []
        }
        this.loadPage()
        this.$emit('apply')
      },
    },
  }
  </script>
  <style lang="sass" scoped>
  .shop-filters-mobile
    margin: 0 19px
  </style>