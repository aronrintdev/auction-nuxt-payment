<template>
  <b-container fluid class="h-100" :class="isScreenXS ? 'p-4' : 'container-profile-inventory-search'">
    <!-- Mobile View Begin -->
    <div v-if="isScreenXS">
      <div class="d-flex align-items-center">
        <MobileSearchInput
          :value="searchKeyword"
          class="flex-grow-1 mr-2"
          @input="handleSearchChange"
        />
        <span class="filter-wrapper" role="button">
          <img
            class="mobile-filter"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </div>
      <div class="pt-3">
        <b-row v-for="(product, index) in searchedProducts" :key="index" align-v="center"
               class="border mt-3 rounded search-response-item">
          <b-col cols="3">
            <ProductThumb :product="product" width="78px" style="margin-top:-8px" />
          </b-col>
          <b-col cols="6"><div class="product-name pl-2">{{ product.name }}</div></b-col>
          <b-col cols="3 text-right">
            <a role="button" class="add-btn" @click="handleAddToInventory(product.sku)">{{ $t('common.add') }}</a>
          </b-col>
        </b-row>
        <div v-if="searchKeyword.length && !loading"
             class="d-flex justify-content-between info-text px-4">
          <div>{{ $t('common.dont_see_your_product') }}</div>
          <a role="button" @click="handleSuggestClick">
            <span class="text-decoration-underline">{{ $t('common.suggest_a_new_product_mobile') }}</span>
          </a>
        </div>
      </div>
      <div class="text-center" :class="searchKeyword.length && !loading ? 'mt-38' : 'mt-150'">
        <span class="mobile-search-info">{{ $t('inventory.mobile_search_info') }}</span>
      </div>
    </div>
    <!-- Mobile View End -->

    <!-- Desktop View Begin -->
    <template v-else>
      <Button :to="moveBack" variant="link" class="btn-back">
        <img :src="require('~/assets/img/icons/back.svg')" alt="back" />
        {{ $t('common.back') }}
      </Button>
      <div class="d-flex justify-content-between align-items-end mt-3">
        <h2 class="title">{{ $t('common.search') }}</h2>
        <Button
          variant="link"
          class="btn-draft"
          underlined-text
          :disabled="!drafts.length"
          @click="handleDraftClick"
          >Drafts ({{ drafts.length }})</Button
        >
      </div>

      <div
        class="
          d-flex
          justify-content-between
          align-items-center
          mt-2
          position-relative
        "
      >
        <SearchInput
          id="new-inventory"
          :value="searchKeyword"
          :placeholder="$t('inventory.search_product_placeholder')"
          size="lg"
          class="search-input mr-3"
          bordered
          autofocus
          @change="handleSearchChange"
        >
          <div
            v-for="product in searchedProducts"
            :key="`product-${product.id}`"
            class="d-flex align-items-center w-100"
          >
            <ProductThumb
              :product="product"
              class="mr-2 flex-shrink-0 product-img"
            />
            <div class="flex-grow-1 text-truncate">{{ product.name }}</div>
            <Button
              variant="link"
              class="flex-shrink-0 ml-3 btn-add-to-inventory"
              @click="handleAddToInventory(product.sku)"
            >
              {{ $t('inventory.add_to_inventory') }}
              <img
                :src="require('~/assets/img/icons/forward.svg')"
                class="ml-2"
              />
            </Button>
          </div>
          <div
            v-if="searchKeyword.length"
            class="d-flex align-items-center font-italic"
          >
            <span>{{ $t('inventory.dont_see_your_product') }}</span>
            &nbsp;
            <Button
              variant="link"
              underlined-text
              class="font-italic"
              @click="handleSuggestClick"
              >{{ $t('inventory.suggest_new_product') }}</Button
            >
          </div>
        </SearchInput>

        <Button
          variant="dark"
          class="flex-shrink-0"
          @click="handleUploadCSVClick"
          >{{ $t('inventory.upload_csv_file') }}</Button
        >
      </div>

      <div class="d-flex justify-content-end mt-3">
        <Button
          variant="link"
          class="btn-download justify-content-center"
          @click="handleSampleDownload"
        >
          <img
            :src="require('~/assets/img/icons/download.svg')"
            :alt="$t('common.download')"
          />
          {{ $t('inventory.csv_sample') }}
        </Button>
      </div>

      <InventoryCsvUploadModal
        id="csv-upload-modal"
        :message="$t('inventory.message.csv_upload')"
        @uploaded="onCsvUploaded"
      />
    </template>
    <!-- Desktop View End -->
    <NewProductSuggestedModal
      id="new-product-suggested-modal"
      :name="searchKeyword"
      auto-hide
    />
  </b-container>
</template>
<script>
import debounce from 'lodash.debounce'
import { mapGetters, mapActions } from 'vuex'
import { Button, SearchInput } from '~/components/common'
import {
  InventoryCsvUploadModal,
  NewProductSuggestedModal,
} from '~/components/modal'
import ProductThumb from '~/components/product/Thumb'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'ProfileInventorySearch',

  components: {
    Button,
    SearchInput,
    ProductThumb,
    InventoryCsvUploadModal,
    NewProductSuggestedModal,
  },
  mixins: [screenSize],
  layout: 'Profile',

  data() {
    return {
      searchedProducts: [],
      searchKeyword: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      drafts: 'inventory/getDrafts',
      referer: 'inventory/getReferrer'
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    moveBack: (vm) => {
      return vm.$nuxt.context.from.path
    },
  },

  methods: {
    ...mapActions({
      searchProducts: 'product/searchProducts',
      suggestProduct: 'product/suggestProduct',
    }),
    handleSearchChange: debounce (async function (value) {
      this.loading = true
      this.searchKeyword = value
      if (value) {
        this.searchedProducts = await this.searchProducts({ search: value })
      } else {
        this.searchedProducts = []
      }
      this.loading = false
    }, 500),

    handleAddToInventory(sku) {
      this.$router.push({
        path: '/profile/inventory/new',
        query: { sku },
      })
    },

    handleDraftClick() {
      this.$router.push({
        path: '/profile/inventory/confirm',
      })
    },

    handleUploadCSVClick() {
      this.$bvModal.show('csv-upload-modal')
    },

    onCsvUploaded() {
      this.$router.push('/profile/inventory/csv-drafts')
    },

    handleSampleDownload() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'product',
          'sku',
          'size',
          'packaging condition',
          'quantity',
          'price',
        ].join(','),
        [
          "Yeezy Slides 'Resin' 2021",
          'GZ5551',
          '12.5',
          'Good Condition',
          '2',
          '335.00',
        ].join(','),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'sample.csv')
      link.click()
    },

    handleSuggestClick() {
      this.suggestProduct({ name: this.searchKeyword }).then(() => {
        this.$bvModal.show('new-product-suggested-modal')
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory-search
  padding: 47px 54px
  background-color: $color-white-5

  .content-header
    border-bottom: 1px solid $color-gray-4
    padding: 0px

  h2.title
    @include heading-1
    color: $color-black-1
    font-family: $font-family-sf-pro-display
    font-size: 24px
    font-weight: $bold

  .btn-back
    @include body-5-regular
    color: $color-gray-40

    img
      margin-right: 9px

  .btn-draft
    @include body-4-medium
    color: $color-black-1
    padding-right: 55px

  .search-input
    width: 100%
    max-width: 688px

  .btn-download
    @include body-3-normal
    color: $color-black-1
    margin-right: 25px
    padding-bottom: 4px
    border-bottom: 1px solid $color-black-1
    border-radius: 0px

    img
      margin-right: 12px

  .btn-add-to-inventory
    @include body-4-normal

  .product-img
    width: 39px
    height: 39px

.search-response-item
  height: 71px
  overflow: hidden
  .product-name
    font-family: $font-montserrat
    @include body-10-medium
    color: $color-black-15
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden

  .add-btn
    font-family: $font-family-sf-pro-display
    @include body-9-normal
    color: $color-white
    border-radius: 5px
    margin-right: 5px
    padding: 4px 17px

    background-color: $color-blue-20
    &:hover
      background-color: rgba($color-blue-20, .9)

.info-text
  font-family: $font-montserrat
  @include body-20-normal
  margin-top: 20px

.mobile-search-info
  font-family: $font-montserrat
  color: $color-gray-5
  @include body-5-normal

.mt-150
  margin-top: 150px

.mt-38
  margin-top: 38px


</style>
