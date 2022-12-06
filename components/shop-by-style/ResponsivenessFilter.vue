<template>
  <div
    class="container search-filter-main py-3 px-1"
    :class="{ scrolled: scrollPosition > 130 }"
  >
    <div class="d-flex align-items-center sf-wrapper">
      <div class="searchbar-filter position-relative w-100"></div>
      <div
        class="setting-filter d-flex justify-content-start px-0 ml-2"
        @click="open"
      >
        <p class="filter-text w-auto">{{ $tc('common.filter', 1) }}</p>
      </div>
    </div>
    <vue-bottom-sheet
      ref="filtersBottomSheet"
      max-width="auto"
      max-height="70vh"
      :rounded="true"
      :is-full-screen="true"
    >
      <ShopFiltersMobile
        ref="shopFilters"
        :defaultType="currentType"
        :dateFilter="date"
        :defaultBrand="selectedBrand"
        @getStyles="stylesList"
        @selectedFilters="totalFilters"
        @showAllBrands="showAllBrands"
      />
    </vue-bottom-sheet>
    <vue-bottom-sheet
      ref="AllBrands"
      max-width="auto"
      max-height="70vh"
      :rounded="true"
      :is-full-screen="true"
    >
      <div class="all-brands-bottom-sheet">
        <div class="border-bottom mb-3 pb-2 bottom_sheet_header">
          <h3 class="font-secondary fs-16 fw-7 text-black text-center">
            {{ $t('filter_sidebar.brands') }}
          </h3>
        </div>
        <div class="bottom_sheet_body">
          <div class="searchbar-filter position-relative w-100 mb-3">
            <input
              v-model="brandName"
              type="search"
              :placeholder="`${$t('common.search')} ${$t(
                'filter_sidebar.brands'
              )}`"
              class="border-0 w-100 font-primary fs-12 fw-4 pr-2 brandsSearchbar"
            />
            <SearchIcon class="search_icon position-absolute" />
          </div>
          <div class="checkbox_wrapper">
            <div v-for="(brandCategory, index) in filterBrands" :key="index">
              <Checkbox
                v-model="selectedBrand"
                list
                :label="brandCategory.label"
                :val="brandCategory.value"
                name="brandCategory"
              />
            </div>
          </div>
        </div>
        <div
          class="bottom-sheet-footers position-absolute d-flex justify-content-between align-items-center w-100 p-3 bg-white"
        >
          <button
            class="btn fs-16 fw-6 font-secondary rounded-pill btn-outline-dark"
            @click="resetBrands"
          >
            {{ $t('common.reset') }}
          </button>
          <button
            class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
            @click="closeSelectedBrands()"
          >
            {{ $t('common.select_brands') }} 
          </button>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ShopFiltersMobile from '~/components/shop-by-style/MobileFilters'
import Checkbox from '~/components/common/form/Checkbox'
import SearchIcon from '~/assets/icons/SearchIcon'

export default {
  name: 'SearchAndFilter',
  components: { ShopFiltersMobile, Checkbox, SearchIcon },
  props: {
    date: {
      type: String,
      default: '',
    },
    currentType: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      scrollPosition: null,
      search: null,
      total: 0,
      brandName: '',
      selectedBrand: [],
    }
  },
  computed: {
    ...mapGetters('browse', ['filters', 'selectedBrands']),
    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
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
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },

  methods: {
    stylesList(styles) {
      this.$emit('renderStyles', styles)
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    handleSearchChange(value) {
      this.search = value
    },
    totalFilters(value) {
      this.total = value
    },
    open() {
      this.$refs.filtersBottomSheet.open()
    },
    showAllBrands(value) {
      this.selectedBrand = value
      this.$refs.AllBrands.open()
      this.$refs.filtersBottomSheet.close()
    },
    closeSelectedBrands() {
      this.$refs.filtersBottomSheet.open()
      this.$refs.AllBrands.close()
    },
    resetBrands() {
      this.selectedBrand = []
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.filter-text
  padding: 4px 15px
  border: 1px solid $color-gray-23
  border-radius: 2px
  font-family: $font-montserrat
  font-size: 11px
  line-height: 13px

.search-filter-main
  .sf-wrapper
      margin: 0 16px
  .searchbar-filter
    input[type="search"]
      background: $light-mobile-bg-color
      padding-left: 39px
      height: 33px
      border-radius: 8px
      &::placeholder
        color: $color-gray-5
        letter-spacing: 0.06em
    .search_icon
      left: 14px
      top: 9px
      width: 14px
      height: 14px
  &.scrolled
    position: fixed
    top: 0
    background: $color-white-1
    z-index: 1020
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)
    input[type="search"]
      &::placeholder
        color:  $color-gray-6
        letter-spacing: 0.06em
    .search_icon::v-deep
      .strokeColor
        stroke: $color-gray-6
    .filter_icon::v-deep
      .lineColor
        stroke: $color-gray-47
      .circleColor
        fill: $color-gray-23
  .bottom-sheet-footers
    .btn
      width: 134px
    .apply-btn
        background-color: $color-blue-20
.all-brands-bottom-sheet
  padding-bottom: 90px
  .bottom_sheet_body
    margin: 0 19px
    .checkbox_wrapper
      margin: 0 -19px
      ::v-deep .list-type .checkbox-title
        padding-left: 19px
        padding-right: 19px
  .bottom-sheet-footers
    bottom: 0
    z-index: 9
    .btn
      width: 140px
    .apply-btn
        background-color: $color-blue-20    
.search_icon
  left: 14px
  top: 9px
  width: 14px
  height: 14px
.search_icon::v-deep
  .strokeColor
    stroke: $color-gray-6           
input[type="search"].brandsSearchbar
  &::placeholder
    color:  $color-gray-6
    letter-spacing: 0.06em
</style>
