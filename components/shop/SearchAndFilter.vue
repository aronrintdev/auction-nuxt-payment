<template>
  <div
    class="container search-filter-main py-3 px-1"
    :class="{ scrolled: scrollPosition > 150 }"
  >
    <div class="d-flex align-items-center sf-wrapper">
      <div
        class="searchbar-filter position-relative w-100"
        @click="openSearchbar"
      >
        <input
          type="search"
          :placeholder="$t('common.search')"
          class="border-0 w-100 font-primary fs-12 fw-4"
        />
        <SearchIcon class="search_icon position-absolute" />
      </div>
      <div
        class="setting-filter d-flex justify-content-start px-0 ml-2"
        @click="open"
      >
        <FilterIcon class="filter_icon" />
      </div>
    </div>
    <vue-bottom-sheet
      ref="searchBottomSheet"
      max-width="auto"
      max-height="100%"
      :rounded="false"
      :is-full-screen="true"
    >
      <SearchbarMobile
        ref="searchbar"
        @showFilters="open"
        @close="closeSearchbar"
      />
    </vue-bottom-sheet>
    <vue-bottom-sheet
      ref="filtersBottomSheet"
      max-width="auto"
      max-height="95vh"
      :rounded="true"
      :background-scrollable="false"
      :is-full-screen="true"
    >
      <ShopFiltersMobile
        ref="shopFilters"
        @showAllBrands="openAllBrands"
        @apply="apply"
      />
    </vue-bottom-sheet>
    <vue-bottom-sheet
      ref="AllBrands"
      max-width="auto"
      max-height="95vh"
      :rounded="true"
      :is-full-screen="true"
    >
      <div class="all-brands-bottom-sheet">
        <div class="border-bottom pb-3 bottom_sheet_header">
          <div class="row">
            <div class="col-3">
              <div class="back-arrow" @click="closeAllBrands">
                <Arrowback class="backarrow_icon mr-2" />
              </div>
            </div>
            <div class="col-6">
              <div class="font-secondary fs-16 fw-7 text-black text-center">
                {{ $t('filter_sidebar.brands') }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="bottom_sheet_body"
          :class="{ scrolled: scrollPosition > 30 }"
        >
          <div class="searchbar-filter position-relative w-100 mb-3 pt-3">
            <input
              v-model="brandName"
              type="search"
              :placeholder="`${$t('common.search')} ${$t(
                'filter_sidebar.brands'
              )}`"
              class="border-0 w-100 font-primary fs-13 fw-4 pr-2"
            />
            <SearchIcon class="brand-search-icon position-absolute" />
          </div>
          <div class="checkbox_wrapper">
            <div v-for="(brandCategory, index) in filterBrands" :key="index">
              <Checkbox
                v-model="selectedBrands"
                list
                :label="brandCategory.label"
                :val="brandCategory.value"
                name="brandCategory"
              />
            </div>
          </div>
        </div>
        <div
          class="bottom-sheet-footers position-absolute d-flex justify-content-between align-items-center w-100 py-3 px-4 bg-white"
        >
          <button
            class="btn fs-16 fw-4 font-secondary rounded-pill btn-outline-dark"
            @click="resetBrand"
          >
            {{ $t('common.reset') }}
          </button>
          <button
            class="btn text-white fs-16 fw-4 font-secondary rounded-pill apply-btn"
            @click="selectBrands"
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
import FilterIcon from '~/assets/icons/FilterIcon'
import SearchIcon from '~/assets/icons/SearchIcon'
import ShopFiltersMobile from '~/components/shop/ShopFiltersMobile'
import SearchbarMobile from '~/components/shop/SearchbarMobile'
import Checkbox from '~/components/common/form/Checkbox'
import Arrowback from '~/assets/icons/Arrowback'

export default {
  name: 'SearchAndFilter',
  components: {
    FilterIcon,
    SearchIcon,
    ShopFiltersMobile,
    SearchbarMobile,
    Checkbox,
    Arrowback,
  },
  data() {
    return {
      scrollPosition: null,
      search: null,
      brandName: '',
      selectedBrands: [],
    }
  },
  computed: {
    ...mapGetters({
      filters: 'browse/filters',
      getSelectedBrands: 'browse/selectedBrands',
    }),
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
  watch: {
    getSelectedBrands: {
      immediate: true,
      handler(val) {
        this.selectedBrands = val
      },
    },
    selectedBrands: {
      immediate: true,
      handler(val) {
        this.$store.commit('browse/setSelectedBrands', val)
      },
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },

  methods: {
    openAllBrands() {
      this.$store.commit('browse/setSelectedBrands', this.selectedBrands)
      this.$refs.AllBrands.open()
    },
    closeAllBrands() {
      this.$refs.AllBrands.close()
    },
    open() {
      this.$refs.filtersBottomSheet.open()
    },
    close() {
      this.$refs.filtersBottomSheet.close()
    },
    openSearchbar() {
      this.$refs.searchBottomSheet.open()
      this.$refs.searchbar.focusInput()
      this.$refs.searchbar.getTrending()
      this.$refs.searchbar.getRecentSearches()
    },
    closeSearchbar() {
      this.$refs.searchBottomSheet.close()
    },
    apply() {
      this.$emit('apply')
      this.close()
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    handleSearchChange(value) {
      this.search = value
    },
    resetBrand() {
      this.$store.commit('browse/setSelectedBrands', [])
      this.closeAllBrands()
    },
    selectBrands() {
      this.$store.commit('browse/setSelectedBrands', this.selectedBrands)
      this.closeAllBrands()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.bottom-sheet
  z-index: 2000000003 !important
.bottom-sheet__pan
  height: 20px !important
  padding-bottom: 0
.search-filter-main
  .sf-wrapper
      margin: 0 16px
  .searchbar-filter
    input[type="search"]
      background: $color-white-19
      padding-left: 39px
      height: 35px
      border-radius: 8px
      color: $color-gray-5
      outline: none
      &::placeholder
        color: $color-gray-5
        letter-spacing: 0.06em
      &::-webkit-search-cancel-button
        -webkit-appearance: none
        height: 1.5em
        width: 1.5em
        background: url(~assets/img/icons/close-circle-grey.svg) no-repeat 50% 50%
        background-size: contain
        padding-right: 10px
        cursor: pointer
    .search_icon
      left: 14px
      top: 9px
      width: 14px
      height: 14px
    .search_icon::v-deep
      .strokeColor
        stroke: $color-gray-6
    .brand-search-icon
      top: 24px
      left: 10px
      height: 18px
      width: 18px
    .brand-search-icon::v-deep
      .strokeColor
        stroke: $color-gray-6
  .filter_icon::v-deep
    .lineColor
      stroke: $color-gray-47
    .circleColor
      fill: $color-gray-23
  &.scrolled
    position: fixed
    top: 0
    background: $color-white-1
    z-index: 1020
    box-shadow: 0 .125rem .25rem $extralight-grey-rgba
::v-deep .bottom-sheet__content
  overflow-y: hidden!important
.all-brands-bottom-sheet
  padding-bottom: 90px
  .bottom_sheet_header
    padding: 0px 30px
  .bottom_sheet_body
    padding: 0px 28px
    overflow-y: scroll
    overflow-x: hidden
    height: 550px
    &::-webkit-scrollbar
      width: 0px !important

    .checkbox_wrapper
      margin: 0 -28px
      ::v-deep .list-type .checkbox-title
         padding-left: 28px
         padding-right: 28px
  .bottom-sheet-footers
    bottom: 0
    z-index: 9999
    .btn
      width: 140px
    .apply-btn
        background-color: $color-blue-20

</style>
