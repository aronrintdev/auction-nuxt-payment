<template>
  <div
    class="container search-filter-main py-3 px-1"
    :class="{ scrolled: scrollPosition > 150 }"
  >
    <div class="d-flex align-items-center sf-wrapper">
      <div class="searchbar-filter position-relative w-100">
        <FilterIcon id="filters_sheet" class="filter_icon" />
      </div>
      <div class="setting-filter d-flex justify-content-start px-0 ml-2">
        <Icon 
          src="heart.svg"
          width="40"
          height="40"
          class="btn-close"
        />
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
import { Icon } from '~/components/common'
import FilterIcon from '~/assets/icons/FilterIcon'
import ShopFiltersMobile from '~/components/shop-by-style/MobileFilters'
export default {
  name: 'SearchAndFilter',
  components: { FilterIcon, ShopFiltersMobile, Icon },
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
</style>