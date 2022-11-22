<template>
  <div>
    <div class="d-flex flex-column h-100 filters-sheet">
      <div class="filters-sheet-title text-center">{{ $t('auctions.frontpage.filterbar.filter_by') }}</div>
      <div class="flex-shrink-1 overflow-auto filters-sheet-content">
        <div v-if="orderFilter" class="filter-group">
          <div class="filter-group-title mb-3">{{ $t('auctions.frontpage.filterbar.sort') }}</div>
          <div class="flex-wrap justify-content-between filter-group-body">
            <label v-for="(option, idx) in SORT_OPTIONS" :key="idx" class="d-flex align-items-center">
              <input v-model="selectedFilters.sortby" :value="option.value" type="radio" name="sortby"/>
              <span class="ml-2">{{ option.text }}</span>
            </label>
          </div>
        </div>
        <FilterGroup
          :title="$t('home_page.categories')"
          :options="categoryOptions"
          :selectedValues="selectedFilters.categories"
          name="category"
          @change="(value) => filterGroupChanged(value, 'categories')"
        />
        <FilterGroup
          :title="$t('filter_sidebar.size_types')"
          :options="sizeTypeOptions"
          :selectedValues="selectedFilters.sizeTypes"
          name="sizeTypes"
          @change="(value) => filterGroupChanged(value, 'sizeTypes')"
        />
        <FilterGroup
          :title="$t('filter_sidebar.sizes')"
          :options="sizeOptions"
          :selectedValues="selectedFilters.sizes"
          name="size"
          multiple
          @change="(value) => filterGroupChanged(value, 'sizes')"
        />
      </div>
      <div class="d-flex align-items-center justify-content-between filters-sheet-footer mb-4 pb-4">
        <button class="btn btn-pills" @click="resetFilters">{{ $t('auctions.frontpage.filterbar.reset') }}</button>
        <button class="btn btn-pills apply-btn" @click="applyFilters">{{ $t('auctions.frontpage.filterbar.apply_filters') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FilterGroup from '~/components/trade/FilterGroup';


export default {
  name: 'TradeArenaFilters',
  components: {FilterGroup},
  props:{
    orderFilter:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      categoryOptions: [],
      selectedFilters: {
        sizeTypes: [],
        category: '',
        sizes: [],
        sortby: null,
      },
      SORT_OPTIONS: [
        { text: this.$t('trades.create_listing.vendor.wants.price_low_to_high'), value: 'price_low_to_high' },
        { text: this.$t('trades.create_listing.vendor.wants.price_high_to_low'), value: 'price_high_to_low' },
      ],
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedSizes',
      'selectedSizeTypes',
    ]),
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
    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: type, value: type }
      })
    },
  },
  mounted() {
    // Get categories list
    this.$axios.get('/categories', {
      params: {
        take: 3,
      }
    })
      .then(res => {
        this.categoryOptions = res.data.map(cat => ({
          label: this.$t(`common.categories.${cat.name}`),
          value: cat.name,
        }))
      })
      .catch(() => {
        this.categoryOptions = []
      })
  },
  methods: {
    filterGroupChanged(value, name) {
      this.selectedFilters = {
        ...this.selectedFilters,
        [name]: value,
      }
    },
    resetFilters() {
      this.selectedFilters = {
        sizeTypes: [],
        category: '',
        sizes: [],
        sortby: null,
      }
      this.applyFilters()
    },
    applyFilters() {
      this.$emit('change', this.selectedFilters)
    }
  }

}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.filters-sheet
  label
    font-family: $font-sp-pro
    font-weight: $normal
    font-size: 14px
    line-height: 17px
    color: $color-black-9
    margin-bottom: 15px
    &:last-child
      margin-bottom: 0
  &-title
    font-family: $font-sp-pro
    font-weight: $bold
    font-size: 17px
    line-height: 20px
    letter-spacing: -0.02em
    color: $black
    border-bottom: 0.5px solid $color-gray-4
    padding-bottom: 18px
  &-content
    padding: 20px 25px 0
  &-footer
    padding: 26px 25px
    .btn
      font-family: $font-sp-pro
      font-weight: $medium
      font-size: 16px
      line-height: 19px
      color: $black
      border-radius: 20px
      border: 1px solid $black
      padding: 10px
      width: 135px
    .apply-btn
      color: $white
      background: $color-blue-20
      border-color: $color-blue-20
.filter-group
  border-bottom: 1px solid $color-gray-62
  &-title
    font-weight: $medium
    @include body-13
    color: $color-blue-20
    font-family: $font-sp-pro
  &-main
    padding: 20px 0
  &-body
    padding-bottom: 20px
.auction-mobile-filter
  &-bg
    height: 56vw
  .more-btn
    width: 20px
    height: 20px
  &-content
    top: 0
    left: 0
    padding: 15px
    width: 100%
  .search-results
    top: 0
    left: 0
    padding: 15px
    padding-top: 66px
    width: 100%
    z-index: 999
    background: $white
    height: 100vh
    overflow: auto
    .product
      @include body-21
      letter-spacing: -0.02em
      color: $color-black-15
      border: 0.2px solid $color-gray-23
      font-weight: $normal
      border-radius: 4px
      padding: 5px 1em
      margin-bottom: 10px
      &:hover
        background-color: $color-white-5
      img
        height: 50px
        width: 50px
      .long-arrow
        width: 20px

::v-deep
  @media (max-width: 576px)
    .auction-filters-type-selector
      margin: 26px 0
      .nav-group
        .btn-group
          flex-direction: row
          border-radius: 20px
  .searchbox
    margin-right: 25px
    position: absolute
    &.open
      .rounded-search-input
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        border: 1px solid $gray
    .rounded-search-input
      flex: 1
      border-radius: 8px
      background: rgba($color-white-5, 0.5)
      padding: 8px 12px
      display: flex
      align-items: center
      margin: 0
      border: 1px solid transparent
      .icon-search
        width: 18px
        height: 18px
        margin-right: 10px
      input
        @include body-9
        font-weight: $regular
        color: $black
        letter-spacing: 0.06em
        text-transform: capitalize
        width: 100%
        border: none
        outline: none
        background: transparent
    &.active
      position: fixed
      background: white
      z-index: 1000
  @media (min-width: 576px)
    display: none
</style>
