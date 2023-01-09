<template>
  <div v-if="show" class="search-overlay-wrapper" :class="{ show: show }">
    <div class="backdrop" @click="hideOverlay"></div>
    <div class="search-content">
      <div class="search-form">
        <div class="d-flex">
          <h3>{{ $t('common.search') }}</h3>
          <close-icon role="button" class="close-icon ml-auto d-flex" @click="hideOverlay"></close-icon>
        </div>
        <SearchInput
          id="nav-search"
          ref="searchInput"
          :value="searchKeyword"
          :placeholder="$t('search.placeholder')"
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
            <ProductThumb
              :product="product"
              class="mr-3 flex-shrink-0 product-img"
              overlay
            />
            <div class="flex-grow-1 flex-shrink-1 product-name text-truncate">
              <ProductThumb
                :product="product"
                class="mr-3 flex-shrink-0 product-img"
                overlay
              />
              <div class="text-truncate">
                {{ product.name }}
              </div>
            </div>
            <div class="flex-shrink-0 d-flex align-items-center">
              <Button
                :to="`/shop/${product.sku}`"
                variant="link"
                @click="hideOverlay"
                >{{ $t('common.shop') }}</Button
              >
              <Button to="#" variant="link">{{ $t('common.trade') }}</Button>
              <Button variant="link" @click="goToAuction(product)">{{ $t('common.auction') }}</Button>
            </div>
          </div>
        </SearchInput>
      </div>

      <div
        class="popular-section"
        :class="{ hide: searchResultShow && searchedProducts.length }"
      >
        <h4>{{ $t('search.popular') }}</h4>

        <div
          v-for="product in popularProducts"
          :key="`popular-product-${product.id}`"
          class="d-flex align-items-center popular-item"
        >
          <div class="flex-grow-1 text-nowrap">{{ product.name.slice(0, 41) }}</div>
          <div class="flex-shrink-0">
            <Button
              :to="`/shop/${product.sku}`"
              variant="link"
              @click="hideOverlay"
              >{{ $t('common.shop') }}</Button
            >
            <Button to="#" variant="link">{{ $t('common.trade') }}</Button>
            <Button variant="link" @click="goToAuction(product)">{{ $t('common.auction') }}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
import { mapActions } from 'vuex'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import { Button, SearchInput } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'

export default {
  name: 'SearchOverlay',

  components: { SearchInput, Button, ProductThumb, CloseIcon },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
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

  watch: {
    search: {
      handler(newVal) {
        this.searchKeyword = newVal
      },
    },

    show: {
      handler(newVal) {
        if (newVal) {
          this.searchKeyword = this.search
        }
      },
    },
  },

  created() {
    this.searchKeyword = this.search
  },

  methods: {
    ...mapActions({
      searchProducts: 'product/searchProducts',
      setProductFilter: 'auction/setProductFilter',
    }),

    handleSearchChange: debounce( async function (value) {
      this.searchKeyword = value
      if (value) {
        this.searchedProducts = await this.searchProducts({
          search: value,
          take: 3,
        })
      } else {
        this.searchedProducts = []
      }
    }, 500),

    async fetchPopularProducts() {
      this.popularProducts = await this.searchProducts({
        take: 3,
      })
    },

    hideOverlay() {
      this.$emit('hide')
      this.searchedProducts = []
    },

    goToSearch() {
      this.$emit('hide')
      this.$router.push({ path: '/search', query: { q: this.searchKeyword } })
    },

    clearInput() {
      this.searchKeyword = ''
    },
    goToAuction(product) {
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.hideOverlay()
      this.$router.push('/auction')
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.search-overlay-wrapper
  z-index: $zindex-search-overlay

  .search-content
    background-color: $color-white-1
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: $zindex-search-overlay
    padding: 80px 0 57px 0
    -webkit-animation: fadein 0.2s
    -moz-animation: fadein 0.2s
    -ms-animation: fadein 0.2s
    -o-animation: fadein 0.2s
    animation: fadein 0.2s

    >div
      width: 688px
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
        margin-top: 30px

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

    .popular-section
      margin-top: 36px
      opacity: 1
      transition: all 0.2s ease-in

      &.hide
        opacity: 0
        transition: all 0.2s ease-in

      h4
        @include heading-1
        margin: 0
        font-size:41px
        color: $color-black-1

      .popular-item
        @include body-4-medium
        color: $color-gray-4
        margin-top: 25px

        button
          @include body-5-normal
          color: $color-blue-19
          text-decoration: underline
          margin-left: 45px

  .backdrop
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    outline: 0
    background-color: rgba(0,0,0,0.25)
    backdrop-filter: blur(2px)
    z-index: $zindex-search-overlay
    -webkit-animation: fadein 0.2s
    -moz-animation: fadein 0.2s
    -ms-animation: fadein 0.2s
    -o-animation: fadein 0.2s
    animation: fadein 0.2s

@media (max-width: 700px)
  .search-overlay-wrapper
    .search-content
      padding-left: 20px
      padding-right: 20px

@media (max-width: 622px)
  .search-overlay-wrapper
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

      .popular-section
        h4
          @include heading-1
        .popular-item
          font-family: $font-family-montserrat
          font-style: $normal
          font-size: 13px
          flex-direction: column
          align-items: flex-start !important

          button
            margin: 15px 20px 0 0
.product-img
  width: 39px
  height: 39px
.close-icon
  margin-top: 20px
  margin-right: 20px
</style>
