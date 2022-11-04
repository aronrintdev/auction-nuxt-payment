<template>
  <div class="container searchbar-main py-3 px-3">
    <div class="d-flex align-items-center sf-wrapper">
      <div class="back-arrow" @click="$emit('close')">
        <Arrowback class="backarrow_icon mr-2" />
      </div>
      <div class="searchbar-filter position-relative w-100">
        <b-form-input
          ref="searchInput"
          type="search"
          :placeholder="$t('common.search')"
          class="border-0 w-100 font-primary fs-12 fw-4"
          :autofocus="true"
        />
        <SearchIcon class="search_icon position-absolute" />
      </div>
      <div
        class="setting-filter d-flex justify-content-start px-0 ml-2"
        @click="$emit('showFilters')"
      >
        <FilterIcon class="filter_icon" />
      </div>
    </div>
    <section class="recent-searches mt-4 mb-3">
      <div class="d-flex justify-content-between align-items-center my-3">
        <h4 class="fs-16 fw-6 text-black font-primary mb-0">
          {{ $t('common.recent_searches') }}
        </h4>
        <h4 class="fs-13 fw-5 text-gray font-primary mb-0">
          {{ $t('common.clear_all') }}
        </h4>
      </div>
      <!-- Todo  -->
      <div class="recent-searches-list">
        <div class="d-flex justify-content-between align-items-center my-2">
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate">
            Jordan BB
          </h4>
          <Arrowforward class="backarrow_icon" />
        </div>
        <div class="d-flex justify-content-between align-items-center my-2">
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate">
            Jordan BB
          </h4>
          <Arrowforward class="backarrow_icon" />
        </div>
        <div class="d-flex justify-content-between align-items-center my-2">
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate">
            Jordan BB
          </h4>
          <Arrowforward class="backarrow_icon" />
        </div>
      </div>
    </section>
    <!-- todo  -->
    <section class="trending-products my-3">
      <h4 class="fs-16 fw-6 text-black font-primary mb-0 my-3">
        {{ $t('home.trending') }}
      </h4>
      <div
        v-for="x in 4"
        :key="x"
        class="trending-products-list border br-5 p-2 my-2"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="mr-2 d-flex align-items-center">
            <div class="product-thumb">
              <Thumb class="mr-2" />
            </div>
            <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate">
              Something
            </h4>
          </div>
          <Arrowforward class="backarrow_icon" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import FilterIcon from '~/assets/icons/FilterIcon'
import SearchIcon from '~/assets/icons/SearchIcon'
import Arrowback from '~/assets/icons/Arrowback'
import Arrowforward from '~/assets/icons/Arrowforward'
import Thumb from '~/components/product/Thumb'
export default {
  name: 'SearchbarMobile',
  components: { FilterIcon, SearchIcon, Arrowback, Thumb, Arrowforward },
  methods: {
    focusInput() {
      this.$refs.searchInput.$el.focus()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.searchbar-main
  display: block
  .searchbar-filter
    input[type="search"]
      background: $color-white-5
      padding-left: 39px
      padding-right: 10px
      height: 33px
      border-radius: 8px
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
.search_icon
    left: 14px
    top: 9px
    width: 14px
    height: 14px
.product-thumb
    width: 70px
</style>
