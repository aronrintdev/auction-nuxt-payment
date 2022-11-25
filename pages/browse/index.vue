<template>
  <div class="container-search pb-5">
    <section>
      <div class="container">
        <div class="d-flex align-items-center px-2 pt-3">
          <SearchInput :placeholder="$t('common.search')"
                     class="flex-grow-1"
                       variant="light"
                     @focus="handleSearchFocus"
                     @clear="handleSearchClear" />
          <a role="button" @click="openFilter">
            <img src="~/assets/img/icons/filter-icon.png" />
          </a>
        </div>
        <SearchOverlay
          ref="searchOverlay"
          :show="showSearchOverlay"
          :search="searchKeyword"
          @hide="handleSearchOverlayHide"
        />
      </div>
    </section>
    <div class="container">
      <SizeType />
      <ShopByStyle />
      <ShopByCategory />
      <ShopByBrand />
      <TradesCarousel />
      <AuctionCarousel />
    </div>
    <FiltersWrapper ref="filtersWrapper" />
  </div>
</template>

<script>
import AuctionCarousel from '~/components/browse/AuctionCarousel'
import TradesCarousel from '~/components/browse/TradesCarousel'
import ShopByBrand from '~/components/browse/ShopByBrand'
import ShopByCategory from '~/components/browse/ShopByCategory'
import ShopByStyle from '~/components/browse/ShopByStyle'
import SizeType from '~/components/browse/SizeType'
import SearchOverlay from '~/components/search/Overlay'
import SearchInput from '~/components/common/SearchInput'
import FiltersWrapper from '~/components/browse/FiltersWrapper'

export default {
  name: 'Index',
  components: {
    SizeType,
    ShopByStyle,
    ShopByBrand,
    ShopByCategory,
    AuctionCarousel,
    TradesCarousel,
    SearchOverlay,
    SearchInput,
    FiltersWrapper
  },
  layout: 'IndexLayout',
  data() {
    return {
      showSearchOverlay: false
    }
  },
  computed: {
    searchKeyword() {
      // Set value for search input box in search page
      if (this.$route.query?.q && this.$route.name === 'browse') {
        return this.$route.query.q
      } else {
        return ''
      }
    },
  },
  watch:{
    showSearchOverlay(val) {
      document.getElementsByTagName('body')[0].style.overflow = val ? 'hidden' : 'auto'
    }
  },
  methods: {
    handleSearchFocus() {
      this.showSearchOverlay = true
    },
    handleSearchOverlayHide() {
      this.showSearchOverlay = false
    },
    handleSearchClear() {
      // Search input box is cleared in next ticket because this should be done after component render
      this.$nextTick(() => {
        this.$refs.searchOverlay.clearInput()
      })
    },
    openFilter() {
      this.$refs.filtersWrapper.open()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-search
  @media (min-width: 1024px)
    .scroll-to-top
      display: flex !important
      bottom: -100px
      right: 60px
      border: 2px solid $color-blue-20
      width: 40px
      aspect-ratio: 1
      z-index: 1020
      transition: 0.5s all ease-in-out
      &.scrolled
        bottom: 40px
  .no-items-found
    img
      width: 130px
    &-title
      @include heading-7
      color: $color-gray-5
      font-family: $font-sp-pro
    &-subtitle
      @include body-1-regular
      font-family: $font-sp-pro
      color: $black
::v-deep .section-header
  @media (max-width: 576px)
    margin: 30px 12.5px
