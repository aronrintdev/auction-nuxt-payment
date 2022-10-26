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
      :is-full-screen="true"
    >
      <ShopFiltersMobile ref="shopFilters" @apply="apply" />
    </vue-bottom-sheet>
  </div>
</template>
<script>
import FilterIcon from '~/assets/icons/FilterIcon'
import SearchIcon from '~/assets/icons/SearchIcon'
import ShopFiltersMobile from '~/components/shop/ShopFiltersMobile'
import SearchbarMobile from '~/components/shop/SearchbarMobile'
export default {
  name: 'SearchAndFilter',
  components: { FilterIcon, SearchIcon, ShopFiltersMobile, SearchbarMobile },
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
    open() {
      this.$refs.filtersBottomSheet.open()
    },
    close() {
      this.$refs.filtersBottomSheet.close()
    },
    openSearchbar() {
      this.$refs.searchBottomSheet.open()
      this.$refs.searchbar.focusInput()
    },
    closeSearchbar() {
      this.$refs.searchBottomSheet.close()
    },
    apply() {
      this.$emit('apply')
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
      background: $light-grey-rgba
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
    box-shadow: 0 .125rem .25rem $extralight-grey-rgba
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
::v-deep .bottom-sheet__content
  margin-right: -8px
</style>
