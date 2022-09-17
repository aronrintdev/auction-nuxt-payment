<template>
  <b-container fluid class="container-profile-inventory-search h-100">
    <Button :to="moveBack" variant="link" class="btn-back">
      <img :src="require('~/assets/img/icons/back.svg')" alt="back" />
      {{ $t('common.back') }}
    </Button>

    <div class="d-flex justify-content-between align-items-center mt-3">
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
        mt-4
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
            width="39"
            height="39"
            class="mr-2 flex-shrink-0"
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

    <NewProductSuggestedModal
      id="new-product-suggested-modal"
      :name="searchKeyword"
      auto-hide
    />
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Button, SearchInput } from '~/components/common'
import { 
  InventoryCsvUploadModal,
  NewProductSuggestedModal,
} from '~/components/modal'
import ProductThumb from '~/components/product/Thumb'

export default {
  name: 'ProfileInventorySearch',

  components: {
    Button,
    SearchInput,
    ProductThumb,
    InventoryCsvUploadModal,
    NewProductSuggestedModal,
  },

  layout: 'Profile',

  data() {
    return {
      searchedProducts: [],
      searchKeyword: ''
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
    async handleSearchChange(value) {
      this.searchKeyword = value
      if (value) {
        this.searchedProducts = await this.searchProducts({ search: value })
      } else {
        this.searchedProducts = []
      }
    },

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

  h2.title
    @include heading-3
    color: $color-black-1

  .btn-back
    @include body-5-regular
    color: $color-gray-40

    img
      margin-right: 9px

  .btn-draft
    @include body-4-medium
    color: $color-black-1

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
</style>
