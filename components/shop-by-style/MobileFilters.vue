<template>
    <div class="ShopFiltersMobile">
      <div class="border-bottom pb-3">
        <h5 class="fs-16 fw-7 text-base-blue font-secondary">Sort</h5>
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
        <Collapse title="Size Type" :selectedValue="selectedSizeType">
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
      
      <div class="border-bottom pb-3 mt-2">
        <Collapse title="Brands" :selectedValue="selectedBrand">
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
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  </template>
  <script>
  import { mapGetters } from 'vuex'
  // import debounce from 'lodash.debounce'
  import _ from 'lodash'
  import Collapse from '~/components/common/Collapse'
  import Radio from '~/components/common/form/Radio'
  import { TYPE } from '~/static/constants/shop-by-style'
  import {
    MIN_PRICE_RANGE_WINDOW,
    MIN_YEAR_RANGE_WINDOW,
  } from '~/static/constants'
  export default {
    name: 'ShopFiltersMobile',
    components: { Collapse, Radio },
    data() {
      return {
        SORT_OPTIONS: [
          {
            label: this.$tc('common.all', 2),
            value: 'all',
          },
          {
            label: this.$tc('home.trending', 2),
            value: 'grid',
          },
          {
            label: this.$tc('common.best_seller', 2),
            value: 'best_seller',
          },
          {
            label: this.$t('shop_by_style.archive'),
            value: 'archive',
          },
        ],
        sortBy: TYPE,
  
        selectedCategory: '',
        search: '',
        brands: [],
        selectedBrand: '',
        selectedSizeType: '',
      }
    },
    computed: {
      ...mapGetters('browse', [
        'filters',
        'selectedBrands',
        'selectedSizeTypes',
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
  
      filtersUpdated() {
        return (
          _.xor(this.brands, this.selectedBrands).length > 0 ||
          _.xor(this.sizeTypes, this.selectedSizeTypes).length > 0
        )
      },
  
      filtersCleared() {
        return (
          !this.brands &&
          !this.sizeTypes
        )
      },
    },
    created() {
      this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
      this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
    },
    methods: {
      applyFilters() {
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
  .ShopFiltersMobile
    margin: 0 19px
  </style>