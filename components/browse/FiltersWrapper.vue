<template>
  <div>
    <vue-bottom-sheet
      ref="filtersBottomSheet"
      max-width="auto"
      max-height="95vh"
      :rounded="true"
      :is-full-screen="true"
    >
      <FiltersMobile
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
        <div class="border-bottom mb-3 pb-2 bottom_sheet_header">
          <h3 class="font-secondary fs-16 fw-7 text-black text-center">
            All Brands
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
              class="border-0 w-100 font-primary fs-12 fw-4 pr-2"
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
          >
            {{ $t('common.reset') }}
          </button>
          <button
            class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
          >
            {{ $t('orders.apply_filter') }}
          </button>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchIcon from '~/assets/icons/SearchIcon'
import FiltersMobile from '~/components/browse/FiltersMobile'
import Checkbox from '~/components/common/form/Checkbox'
export default {
  name: 'FiltersWrapper',
  components: {
    SearchIcon,
    FiltersMobile,
    Checkbox,
  },
  data() {
    return {
      brandName: '',
      selectedBrand: []
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
  methods: {
    openAllBrands() {
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
    apply() {
      this.$emit('apply')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.search-filter-main
  .sf-wrapper
    margin: 0 16px
  .searchbar-filter
    input[type="search"]
      background: $color-white-5
      padding-left: 39px
      height: 33px
      border-radius: 8px
      color: $color-gray-5
      &::placeholder
        color: $color-gray-5
        letter-spacing: 0.06em
    .search_icon
      left: 14px
      top: 9px
      width: 14px
      height: 14px
    .search_icon::v-deep
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
  margin-right: -8px
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
      width: 134px
    .apply-btn
      background-color: $color-blue-20
</style>
