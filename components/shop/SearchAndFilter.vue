<template>
  <div
    class="container search-filter-main py-3 px-1"
    :class="{ scrolled: scrollPosition > 150 }"
  >
    <div class="d-flex align-items-center sf-wrapper">
      <div class="searchbar-filter position-relative w-100">
        <input
          type="search"
          placeholder="Search"
          class="border-0 w-100 font-primary fs-12 fw-4"
        />
        <SearchIcon class="search_icon position-absolute" />
      </div>
      <div class="setting-filter d-flex justify-content-start px-0 ml-2">
        <FilterIcon id="filters_sheet" class="filter_icon" />
      </div>
    </div>
    <BottomSheet id="filters_sheet">
      <ShopFiltersMobile ref="shopFilters" />
      <template #footer>
        <div
          class="bottom-sheet-footers d-flex justify-content-between align-items-center w-100 px-3"
        >
          <button
            class="btn fs-16 fw-6 font-secondary rounded-pill btn-outline-dark"
          >
            Reset
          </button>
          <button
            class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
            @click="apply"
          >
            Apply Filters
          </button>
        </div>
      </template>
    </BottomSheet>
  </div>
</template>
<script>
import FilterIcon from '~/assets/icons/FilterIcon'
import SearchIcon from '~/assets/icons/SearchIcon'
import ShopFiltersMobile from '~/components/shop/ShopFiltersMobile'
export default {
  name: 'SearchAndFilter',
  components: { FilterIcon, SearchIcon, ShopFiltersMobile },
  data() {
    return {
      scrollPosition: null,
      search: null,
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    apply() {
      this.$refs.shopFilters.applyFilters()
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    handleSearchChange(value) {
      this.search = value
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
      background: rgba(247, 247, 247, 0.5)
      padding-left: 39px
      height: 33px
      border-radius: 8px
      &::placeholder
        color: $color-white-1
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
        color:  #6F6F6F
        letter-spacing: 0.06em
    .search_icon::v-deep
      .strokeColor
        stroke: #6F6F6F
    .filter_icon::v-deep
      .lineColor
        stroke: #999999
      .circleColor
        fill: #C4C4C4
  .bottom-sheet-footers
    .btn
      width: 134px
    .apply-btn
        background-color: $color-blue-20
</style>
