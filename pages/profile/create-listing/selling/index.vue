<template>
  <div class="vd-create-listing-section">
    <b-container fluid class="vendor-dashboard-body">
      <b-row class="mb-bb h-100">
        <b-col md="12" class="back-to-createlisting">
          <span role="button" @click="backToCreateListing">
            <img
              :src="require('~/assets/img/icons/back.svg')"
              class="img-fluid"
            />
            {{ $t('createlisting.back_to_createlisting') }}
          </span>
        </b-col>
        <b-col md="12" class="vd-create-listing-css">
          <div class="purchase-heading">{{ $t('common.search') }}</div>
        </b-col>
      </b-row>

      <div class="row">
        <!-- Search Input Field -->
        <b-col md="8" sm="6" class="mt-md-4 mt-2 text-center">
          <SearchInput
            id="new-inventory"
            :value="searchKeyword"
            :placeholder="$t('inventory.search_product_placeholder')"
            size="lg"
            class="search-input"
            bordered
            autofocus
            @change="handleSearchChange"
          >
            <template v-if="searchedProducts && searchedProducts.length">
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
                  @click="
                    showProductDetails({ sku: product.sku, id: product.id })
                  "
                >
                  {{ $t('createlisting.add_product') }}
                  <img
                    :src="require('~/assets/img/icons/forward.svg')"
                    class="ml-2"
                  />
                </Button>
              </div>
            </template>
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
        </b-col>

        <!-- ./Search Input Field -->

        <b-col md="4" sm="6" class="mt-md-4 mt-2 text-center">
          <Button variant="info" pill @click="moveToInventory">{{
            $t('createlisting.create_new_inventory')
          }}</Button>
        </b-col>
      </div>

      <b-row id="filters" class="text-center mt-md-4 mt-4">
        <b-col>
          <span class="d-flex justify-content-start text-bold">{{
            $t('selling_page.filter_by')
          }}</span>
          <b-row>
            <b-col id="filter-category" md="2" sm="6" class="mt-2">
              <CustomSelect
                id="category-types"
                :default="categorySelected"
                :options="{
                  '': $t('createlisting.category'),
                  sneakers: $t('common.footwear'),
                  apparel: $t('common.apparel'),
                  accessories: $t('common.accessories'),
                }"
                @input="handleCategoryChange"
              />
            </b-col>
            <b-col id="filter-sizetype" md="2" sm="6" class="mt-2">
              <CustomSelectwithCheckbox
                :default="``"
                :options="sizeTypes"
                :title="$t('common.sizetype')"
                :updateFilters="activeSizeTypes"
                @filters="updateSizeTypes"
              />
            </b-col>
            <b-col id="filter-size" md="2" sm="6" class="mt-2">
              <CustomSelectwithCheckbox
                :default="``"
                :options="sizes"
                :title="$tc('common.size', 1)"
                :updateFilters="activeSize"
                @filters="updateSize"
              />
            </b-col>
            <b-col id="apply-filter-col" md="1" sm="6" class="mt-2 float-left">
              <Button variant="info" class="float-left w-100" @click="filterInventories">
                {{ $tc('common.filter', 1) }}
              </Button>
            </b-col>
            <b-col id="apply-filter-col" md="2" sm="6" class="mt-2"> </b-col>
            <b-col md="3" sm="6" class="mt-2">
              <CustomSelect
                id="sortBy"
                class="border"
                :default="sortBySelected"
                :options="{
                  '': $t('createlisting.sortBy'),
                  price_low_high: $t('createlisting.price_low_high'),
                  price_high_low: $t('createlisting.price_high_low'),
                  size_small_large: $t('createlisting.size_small_large'),
                  size_large_small: $t('createlisting.size_large_small'),
                }"
                @input="handleSortByChange"
              />
            </b-col>
            <b-col id="apply-filter-small" md="2" sm="6" class="mt-md-4 mt-2"> </b-col>
            <b-col id="apply-filter-small" md="1" sm="6" class="mt-md-4 mt-2">
              <Button variant="info" @click="filterInventories">
                {{ $tc('common.filter', 1) }}
              </Button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <!-- For Active Filter -->
      <b-row
        v-if="
          (activeSizeTypes && activeSizeTypes.length) ||
          (activeSize && activeSize.length) ||
          categorySelected
        "
        class="mt-4"
      >
        <b-col md="12" sm="12">
          <b-badge
            v-if="categorySelected"
            class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize"
          >
            {{ categorySelected }}
            <i
              class="fa fa-times"
              role="button"
              aria-hidden="true"
              @click="removeFilter({ type: 'category' })"
            ></i>
          </b-badge>
          <b-badge
            v-for="(options, typeIndex) in activeSizeTypes"
            :key="`type-${typeIndex}`"
            class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize"
          >
            {{ options.text }}
            <i
              class="fa fa-times"
              role="button"
              aria-hidden="true"
              @click="removeFilter(options)"
            ></i>
          </b-badge>
          <b-badge
            v-for="(options, typeIndex) in activeSize"
            :key="`type-${typeIndex}`"
            class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize"
          >
            {{ $tc('common.size', 1) }}&colon; {{ options.text }}
            <i
              class="fa fa-times"
              role="button"
              aria-hidden="true"
              @click="removeFilter(options)"
            ></i>
          </b-badge>
          <span
            role="button"
            class="text-primary text-decoration-underline"
            @click="clearAllFilters"
            >{{ $t('vendor_purchase.clear_all_filters') }}</span
          >
        </b-col>
      </b-row>
      <!-- ./For Active Filter -->

      <b-row class="mt-4">
        <div class="vd-selling-Inventory col-sm-12 col-md-12">
          <h5 class="text-bold text-capitalize">
            {{ $t('createlisting.inventory') }}
            <span v-if="inventories || inventories.length"
              >&#040;{{ inventories.length }}<span v-show="showResult"> {{ $t('common.results') }}</span>&#041;</span
            >
          </h5>
        </div>
      </b-row>

      <template
        v-if="inventories && inventories.length > 0"
        :class="!action && 'mt-3'"
      >
        <b-row
          v-if="inventories && inventories.length > 0"
          class="mt-4"
        >
          <b-col
            v-for="(inventory, index) in inventories"
            :key="`inventory-${index}`"
            class="inventory-card"
          >
            <InventoryCard
              :inventory="inventory"
              :selected="!!selectedItems.find((id) => id == inventory.id)"
              class="my-3"
              @select="selectItem"
            />
          </b-col>
        </b-row>
      </template>

      <b-row
        v-if="inventories && inventories.length"
        class="d-flex justify-content-center"
      >
        <Pagination
          v-if="inventories.length > 0"
          v-model="page"
          :total="totalCount"
          :per-page="perPage"
          :per-page-options="perPageOptions"
          class="mt-2 d-flex justify-content-center"
          @page-click="handlePageClick"
          @per-page-change="handlePerPageChange"
        />
      </b-row>

      <template v-else>
        <b-row class="vd-purchase-empty">
          <b-col cols="12" class="text-center">
            <p class="vd-purchase-browse-now">
              {{ $t('createlisting.no_item_in_inventory') }}
              <br />
              {{ $t('createlisting.add_a_product_to_list') }}
            </p>
          </b-col>
        </b-row>
      </template>

      <div class="row p-md-4 p-2 continue-to-list-bulk-select">
        <BulkSelectToolbar
          ref="bulkSelectToolbar"
          :active="!!action"
          :selected="selectedItems"
          :unit-label="$tc('common.item', selectedItems.length)"
          :total="totalCount"
          :action-label="$t('createlisting.continue_to_list')"
          class="mt-3"
          @close="cancelAction()"
          @selectAll="handleSelectAll()"
          @deselectAll="handleDeselectAll()"
          @submit="handleBulkAction()"
        />
      </div>
      <!-- ./Clarification Screen -->
      <!-- Suggestion Modal -->
      <ListingItemProductSuggestion
        :id="`suggest_a_new_product`"
        @showSuccess="showSuccess"
      />
      <!-- ./Suggestion Modal -->
      <!-- Show Success Modal -->
      <Modal :id="`showSuceessModal`" hideFooter>
        <div class="successContent my-5">
          {{ $t('createlisting.product_suggestion_message') }}
        </div>
      </Modal>
      <!-- ./Show Success Modal -->

      <!-- Clarification Screen -->
      <ClarificationScreen
        id="clarification-screen"
        :heading="$t('createlisting.just_to_clarify')"
        :description="$t('createlisting.clarification_desc')"
        :products="similarProducts"
        @showDetailPage="showDetailPage"
      />
      <!-- ./Clarification Screen -->
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import InventoryCard from '~/components/profile/create-listing/selling/InventoryCard.vue'
import {
  ListingItemProductSuggestion,
  ClarificationScreen,
} from '~/components/modal'
import {
  SearchInput,
  CustomSelect,
  CustomSelectwithCheckbox,
  Button,
  BulkSelectToolbar,
  Pagination,
  Modal,
} from '~/components/common'

export default {
  name: 'CreateListing',

  components: {
    Button,
    ClarificationScreen,
    SearchInput,
    InventoryCard,
    CustomSelect,
    CustomSelectwithCheckbox,
    BulkSelectToolbar,
    Pagination,
    ListingItemProductSuggestion,
    Modal,
  },

  layout: 'Profile',

  data() {
    return {
      searchValue: null,
      searchResult: null,
      searchProduct: null,
      loading: false,
      similarProducts: null,
      searchKeyword: '',
      searchedProducts: [],
      perPageOptions: [8, 16, 32, 48],
      search: null,
      totalCount: 0,
      page: 1,
      perPage: null,
      category: null,
      type: '',
      inventories: [],
      action: null,
      selected: [],
      categorySelected: '',
      sortBySelected: '',
      sizeTypes: [],
      sizes: [],
      // For filters
      sizeTypeFilters: [],
      sizeFilters: [],
      activeSizeTypes: [],
      activeSize: [],

      selectedItems: [], // For inventory
      showResult: false
    }
  },
  created() {
    this.getInventories()
    this.getSizeFilters()
    this.removeDraftListing()
  },
  // update the per page options

  methods: {
    ...mapActions({
      searchProducts: 'product/searchProducts',
      suggestProduct: 'product/suggestProduct',
      fetchInventories: 'inventory/fetchInventories',
      addListingToDraft: 'listingItems/addListingToDraft',
      checkIfProductWithSameSKU: 'product/checkIfProductWithSameSKU',
      removeDraftListing: 'listingItems/removeDraftListing',
      addReferrer: 'inventory/addReferrer'
    }),
    backToCreateListing() {
      this.$router.push({
        path: '/profile/create-listing',
      })
    },
    // On filter inventory click
    filterInventories() {
      this.showResult = true
      this.getInventories()
    },

    // Get the size, size_type filter
    async getSizeFilters() {
      await this.$axios
        .get('/size-filters')
        .then((res) => {
          if (res.data.sizeType) {
            res.data.sizeType.forEach((value, index) => {
              this.sizeTypes.push({
                id: index,
                value,
                text: capitalizeFirstLetter(value),
                type: 'size-type',
              })
            })
          }
          if (res.data.size) {
            res.data.size.forEach((value, index) => {
              this.sizes.push({ id: index, value, text: value, type: 'size' })
            })
          }
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Create Listing section size filters error:',
            err.response
          )
          this.$toasted.error(this.$t('error.something_went_wrong'))
        })
    },

    // Redirect to inventory section
    moveToInventory() {
      this.addReferrer('/profile/create-listing/selling')
      this.$router.push('/profile/inventory/search')
    },

    // On item click
    // Note: For Jordans the kids SKU is the same as Men’s so we are adding a clarifcation screen here
    showProductDetails({ sku, id }) {
      // Check if there is more than one product with same sku.
      this.$axios
        .get(`/product/${sku}/same-sku`)
        .then((res) => {
          // If more than one item exist show clarification screen.
          if (res && res.data.length > 1) {
            this.showClarificationScreen(res.data)
          } else {
            // else show the details page
            this.showDetailPage(id)
          }
        })
        .catch((err) => {
          this.$toasted.error(err.response.data.message)
          this.$logger.logToServer(err.response.data?.message)
        })
    },

    // Show the clarification screen.
    showClarificationScreen(res) {
      this.similarProducts = res
      this.$bvModal.show('clarification-screen')
    },

    // Show the details page.
    showDetailPage(val) {
      this.$router.push(`/profile/create-listing/selling/product/${val}`)
    },

    // Search input on change
    handleSearchChange(value) {
      this.searchKeyword = value
      if (value) {
        // Search for products
        this.searchProducts({ search: value }).then((res) => {
          this.searchedProducts = res
          this.showResult = true
        })
      } else {
        this.searchedProducts = []
        this.showResult = false
      }
    },

    // Load the inventories
    getInventories() {
      this.loading = true
      this.fetchInventories({
        search: this.searchKeyword,
        page: this.page,
        per_page: this.perPage,
        category: this.categorySelected,
        type: this.type,
        size: this.sizeFilters,
        sizeType: this.sizeTypeFilters,
        sortBy: this.sortBySelected,
      }).then((res) => {
        this.inventories = res.data
        this.totalCount = parseInt(res.total)
        this.perPage = parseInt(res.per_page)
        this.loading = false
      })
    },

    // On inventory card checkbox action.
    selectItem(id, checked) {
      if (checked) {
        this.selectedItems.push(id)
        this.action = 'continue-to-list'
      } else {
        this.selectedItems.splice(this.selectedItems.indexOf(id), 1)
      }
    },

    // On suggest new product click
    handleSuggestClick() {
      this.$bvModal.show('suggest_a_new_product')
    },

    // Product suggestion on success
    showSuccess({ sku, name }) {
      this.suggestProduct({ name, sku }).then((res) => {
        this.$bvModal.show('showSuceessModal')
      })
    },

    // On category change
    handleCategoryChange(value) {
      this.categorySelected = value
    },

    // On sort by filter change
    handleSortByChange(value) {
      this.sortBySelected = value
      this.getInventories()
    },

    // Size Type filters on change
    updateSizeTypes({ array, value }) {
      this.activeSizeTypes = array

      if (this.sizeTypeFilters.includes(value)) {
        this.sizeTypeFilters.splice(this.sizeTypeFilters.indexOf(value), 1)
      } else {
        this.sizeTypeFilters.push(value)
      }
    },

    // Update the size array for filters
    updateSize({ array, value }) {
      this.activeSize = array

      if (this.sizeFilters.includes(value)) {
        this.sizeFilters.splice(this.sizeFilters.indexOf(value), 1)
      } else {
        this.sizeFilters.push(value)
      }
    },

    // Remove the filters, on close button click.
    removeFilter(option) {
      if (option.type === 'size-type') {
        const activeSizeTypes = this.activeSizeTypes
        const sizeTypeFilters = this.sizeTypeFilters

        if (activeSizeTypes.includes(option)) {
          activeSizeTypes.splice(activeSizeTypes.indexOf(option), 1)
        }
        if (sizeTypeFilters.includes(option.value)) {
          sizeTypeFilters.splice(sizeTypeFilters.indexOf(option.value), 1)
        }
      }
      if (option.type === 'size') {
        const activeSize = this.activeSize
        const sizeFilters = this.sizeFilters

        if (activeSize.includes(option)) {
          activeSize.splice(activeSize.indexOf(option), 1)
        }
        if (sizeFilters.includes(option.value)) {
          sizeFilters.splice(sizeFilters.indexOf(option.value), 1)
        }
      }
      if (option.type === 'category') {
        this.categorySelected = ''
      }
      this.getInventories()
      this.showResult = false
    },
    // Clear all filters
    clearAllFilters() {
      this.activeSizeTypes = []
      this.sizeTypeFilters = []
      this.activeSize = []
      this.sizeFilters = []
      this.sortBySelected = ''
      this.categorySelected = ''

      this.getInventories()

    },

    /* Bulk select Toolbar */
    // On close icon click
    cancelAction() {
      this.action = null
      this.selectedItems = []
    },
    // On select all
    handleSelectAll() {
      this.selectedItems = this.inventories.map((p) => p.id)
    },
    // On deselect all
    handleDeselectAll() {
      this.selectedItems = []
    },
    // On action confirm
    handleBulkAction() {
      const selectedID = this.selectedItems
      selectedID.forEach((value) => {
        this.$axios.get(`inventories/${value}`).then((res) => {
          const items = {
            product: res.data.product || {},
            sizeId: res.data.size_id || 0,
            quantity: 0,
            price: res.data.sale_price || null,
            packagingConditionId: res.data.packaging_condition_id || null,
            minOfferAmount: 0,
            inventory_id: res.data.id,
            stock: res.data.stock
          }
          this.addListingToDraft(items)
        })
      })

      this.$router.push({
        path: '/profile/create-listing/selling/confirm',
        query: { path: 'from-inventory' },
      })
    },
    /* Bulk select Toolbar */

    /* Pagination */
    handlePageClick(bvEvent, page) {
      this.page = page
      this.getInventories()
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.getInventories()
      }
    },
    /* Pagination */
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.vd-create-listing-section
  .inventory-card
    flex: 0 0 100%
    max-width: 100%

    @media (min-width: 1030px)
      flex: 0 0 50%
      max-width: 50%

      @media (min-width: 1280px)
        flex: 0 0 33.33%
        max-width: 33.33%

      @media (min-width: 1525px)
        flex: 0 0 25%
        max-width: 25%

      @media (min-width: 1800px)
        flex: 0 0 20%
        max-width: 20%
  .btn-apply-filter
    background: $color-blue-2
    border-radius: 5px
    color: $color-white-1
  @media (max-width: 768px)
    #apply-filter-col
      display: none
    #apply-filter-small
      display: block
  @media (min-width: 768px)
    #apply-filter-col
      display: block
    #apply-filter-small
      display: none
  .vd-purchase-empty
    margin-top: 10rem
.btn-info
  float: right
@media (max-width: 575px)
  .btn-info
    float: none
@media (max-width: 475px)
  .back-to-createlisting
    font-size: 15px
</style>
