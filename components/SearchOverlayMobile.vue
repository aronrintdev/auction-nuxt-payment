<template>
  <div class="searchbar-main py-3 px-3">
    <div class="d-flex align-items-center sf-wrapper">
      <div class="back-arrow" @click="$emit('close')">
        <Arrowback class="backarrow_icon mr-2" />
      </div>
      <div class="search-content">
        <div class="search-form">
          <SearchInput
            id="nav-search"
            ref="searchInput"
            :value="searchKeyword"
            :placeholder="$t('common.search')"
            :resultShow.sync="searchResultShow"
            :debounce="500"
            size="md"
            variant="light"
            class="w-100 search-input"
            autofocus
            @change="handleSearchChange"
            @enterKeydown="goToSearch"
          >
            <div
              v-for="product in searchedProducts"
              :key="`product-${product.id}`"
              class="d-flex align-items-center w-100 search-result-item"
            >
              <div class="flex-grow-1 flex-shrink-1 product-name text-truncate">
                <Thumb
                  :product="product"
                  class="mr-3 flex-shrink-0 product-img"
                />
                <div class="text-truncate">
                  {{ product.name }}
                </div>
              </div>
              <div class="flex-shrink-0 d-flex align-items-center">
                <Button :to="`/shop/${product.sku}`" variant="link">{{
                  $t('common.shop')
                }}</Button>
                <Button to="#" variant="link">{{ $t('common.trade') }}</Button>
                <Button variant="link" @click="goToAuction(product)">{{
                  $t('common.auction')
                }}</Button>
              </div>
            </div>
          </SearchInput>
        </div>
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
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0">Jordan BB</h4>
          <Arrowforward class="backarrow_icon" />
        </div>
        <div class="d-flex justify-content-between align-items-center my-2">
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0">Jordan BB</h4>
          <Arrowforward class="backarrow_icon" />
        </div>
        <div class="d-flex justify-content-between align-items-center my-2">
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0">Jordan BB</h4>
          <Arrowforward class="backarrow_icon" />
        </div>
      </div>
    </section>
    <section class="trending-products my-3">
      <h4 class="fs-16 fw-6 text-black font-primary mb-0 my-3">
        {{ $t('home_page.popular') }}
      </h4>
      <div
        v-for="product in popularProducts"
        :key="product.id"
        class="trending-products-list border br-5 p-2 my-2"
        @click="goToProduct(product)"
      >
        <div class="d-flex justify-content-between align-items-center">
          <div class="mr-2 d-flex align-items-center">
            <div class="product-thumb mr-1">
              <Thumb :product="product" :src="product.image" class="mr-2" />
            </div>
            <h4 class="fs-13 fw-5 text-gray font-primary mb-0">
              {{ product.name }}
            </h4>
          </div>
          <Arrowforward class="backarrow_icon" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Arrowback from '~/assets/icons/Arrowback'
import Arrowforward from '~/assets/icons/Arrowforward'
import { Button, SearchInput } from '~/components/common'
import Thumb from '~/components/product/Thumb'
export default {
  name: 'SearchOverlayMobile',
  components: {
    Arrowback,
    Thumb,
    Arrowforward,
    Button,
    SearchInput,
  },
  data() {
    return {
      searchKeyword: '',
      searchedProducts: [],
      searchResultShow: false,
      popularProducts: [],
    }
  },
  fetch() {
    this.fetchPopularProducts()
  },
  methods: {
    ...mapActions({
      searchProducts: 'product/searchProducts',
      setProductFilter: 'auction/setProductFilter',
    }),
    async fetchPopularProducts() {
      this.popularProducts = await this.searchProducts({
        take: 5,
      })
    },
    async handleSearchChange(value) {
      this.searchKeyword = value
      if (value) {
        this.searchedProducts = await this.searchProducts({
          search: value,
          take: 3,
        })
      } else {
        this.searchedProducts = []
      }
    },
    goToSearch() {
      this.$router.push({ path: '/search', query: { q: this.searchKeyword } })
      this.$emit('close')
    },
    goToProduct(product) {
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.$router.push('/auction')
      this.$emit('close')
    },
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
.search_icon
    left: 14px
    top: 9px
    width: 14px
    height: 14px
.product-thumb
    min-width: 70px
    width: 70px
.backarrow_icon
  min-width: 22px
  width: 22px
::v-deep .search-form
  input.search-input
      padding: 6px 30px
      font-size: 12px !important
  img.icon-search
    width: 15px
    margin: 10px

.searchbar-main
  z-index: $zindex-search-overlay
  .search-content
    background-color: $color-white-1
    width: 100%
    z-index: $zindex-search-overlay
    padding: 80px 0 57px 0
    animation: fadein 0.2s
    >div
      width: 100%
      max-width: 100%
      margin-left: auto
      margin-right: auto
    .search-form
      h3
        @include heading-3
        font-weight: $bold
        margin: 0
        color: $color-black-1
      .search-input::v-deep
        .search-result-item
          background-color: $color-white-5
          border-top: 1px solid $color-gray-59
          height: 45px
          .product-name
            .product-img
              display: none
          .text-truncate
            font-weight: $normal
          button
            font-family: $font-family-base
            @include body-5-normal
            color: $color-blue-19
            text-decoration: underline
            margin-left: 40px
@media (max-width: 700px)
  .searchbar-main
    .search-content
      padding: 0

@media (max-width: 622px)
  .searchbar-main
    .search-content
      .search-form
        .search-input::v-deep
          .search-result-item
            flex-direction: column
            height: auto
            align-items: flex-start !important
            padding: 10px 20px

            .product-img
              display: none

            .product-name
              display: flex
              align-items: center

              .product-img
                display: block

            > div
              width: 100%

            button
              margin: 5px 20px 0 0
.product-img
  width: 39px
  height: 39px
</style>
