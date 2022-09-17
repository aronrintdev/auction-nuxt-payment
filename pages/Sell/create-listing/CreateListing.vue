<template>
  <div class="create-listing mb-5">
    <div class="d-flex mb-5 top-bar align-items-center">
      <div class="mr-3 position-relative">
        <SearchInput
          :value="searchText"
          variant="secondary"
          @change="onSearchInventory"
        />
        <div v-if="hasSearchResult" class="dropdown-options">
          <div
            v-for="inventory in searchedInventories"
            :key="`${inventory.sku}-${inventory.id}`"
            class="dropdown-option"
            @click="selectProduct(inventory.sku)"
          >
            <div class="d-flex justify-content-start">
              <img :src="getProductImageURL(inventory)" />
              <div class="ml-3">
                <div class="dropdown-option-title">{{ inventory.name }}</div>
                <div class="dropdown-option-desc">
                  {{ $t('sell.create_listing.sku') }}: {{ inventory.sku }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="searchedInventories.length == 0"
            class="dropdown-option text-center"
          >
            {{ $t('sell.create_listing.no_result') }}
          </div>
        </div>
      </div>
      <div class="enter-csv-file ml-3">
        <input
          id="input_file"
          ref="input_file"
          type="file"
          hidden
          accept=".csv"
          @change="importFromCSV"
        />
        <button
          type="button"
          class="btn w-100 btn-outline-dark"
          @click="openFileUploader"
        >
          {{ $t('sell.create_listing.enter_csv_file') }}
        </button>
      </div>
    </div>
    <div class="listing-content">
      <div class="row mb-3">
        <div class="col-12 col-md-6 product-details">
          <div v-if="product">
            <div class="product-details-title">{{ product.name }}</div>
            <div class="product-details-sku">{{ product.sku }}</div>
            <div class="product-details-color">{{ product.colorway }}</div>
            <div class="product-image">
              <img :src="getProductImageURL(product)" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="product" class="row">
        <div class="col-12 col-md-6">
          <div class="price-listings">
            <div class="price-listings-title">
              {{ $t('sell.create_listing.price_listings') }}
            </div>
            <div
              class="price-listings d-flex align-items-center justify-content-between"
            >
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.create_listing.lowest_price') }}:
                </div>
                <div class="price-listing-value lowest_price">
                  <span
                    v-if="
                      form.size &&
                      productSizesPrices[form.size] &&
                      productSizesPrices[form.size].min_price
                    "
                  >
                    ${{ productSizesPrices[form.size].min_price | formatPrice }}
                  </span>
                  <span v-else>{{
                    $t('sell.create_listing.not_available')
                  }}</span>
                </div>
              </div>
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.create_listing.highest_bid') }}:
                </div>
                <div class="price-listing-value highest_bid">
                  <span
                    v-if="
                      form.size &&
                      productSizesPrices[form.size] &&
                      productSizesPrices[form.size].high_bid_price
                    "
                  >
                    ${{
                      productSizesPrices[form.size].high_bid_price | formatPrice
                    }}
                  </span>
                  <span v-else>{{
                    $t('sell.create_listing.not_available')
                  }}</span>
                </div>
              </div>
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.create_listing.last_sold') }}:
                </div>
                <div class="price-listing-value last_sold_price">
                  <span
                    v-if="
                      form.size &&
                      productSizesPrices[form.size] &&
                      productSizesPrices[form.size].last_sold_price
                    "
                  >
                    ${{
                      productSizesPrices[form.size].last_sold_price
                        | formatPrice
                    }}
                  </span>
                  <span v-else>{{
                    $t('sell.create_listing.not_available')
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="listing-fields add-to-list-form">
            <div class="d-flex w-100 justify-content-between">
              <input
                id="size"
                name="size"
                :placeholder="$t('sell.create_listing.size_box_placeholder')"
                :value="form.size"
                @input="onAddToListFormChange"
              />
              <input
                id="amount"
                name="amount"
                type="number"
                :placeholder="$t('sell.create_listing.amount_box_placeholder')"
                min="0"
                max="50"
                :value="form.amount"
                @input="onAddToListFormChange"
              />
            </div>
            <div
              class="d-flex w-100 justify-content-between align-items-center"
            >
              <input
                id="sale_price"
                name="sale_price"
                type="number"
                :placeholder="$t('sell.create_listing.price_box_placeholder')"
                :readonly="form.sale_price === undefined"
                :value="form.sale_price"
                @input="onAddToListFormChange"
              />
              <strong>{{ $t('sell.create_listing.or') }}</strong>
              <button
                id="trade_btn"
                class="btn trade-btn"
                :disabled="form.listing_type == 'trade'"
                @click="onTradeClick"
              >
                {{ $t('sell.create_listing.trade_btn') }}
              </button>
            </div>
            <hr />
            <div class="d-flex w-100 justify-content-between">
              <div class="form-checkbox">
                <input
                  id="allow_bids"
                  class="form-check-input"
                  name="allow_bids"
                  type="checkbox"
                  :checked="form.listing_type != 'sell'"
                  @change="onAllowBidsChange"
                />
                <label class="form-check-label" for="allow_bids">{{
                  $t('sell.create_listing.allow_bids')
                }}</label>
              </div>
              <input
                id="bid_price"
                name="min_bid_price"
                type="number"
                :placeholder="$t('sell.create_listing.bid_amount_placeholder')"
                :readonly="form.min_bid_price === undefined"
                :value="form.min_bid_price"
                @input="onAddToListFormChange"
              />
            </div>
            <div>
              <button
                type="button"
                class="btn w-100 btn-outline-dark add-to-list-btn"
                :disabled="isFormInvalid"
                @click="onAddToListClick"
              >
                {{ $t('sell.create_listing.add_to_list') }}
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column justify-content-end">
          <div class="current-listings">
            <div class="current-listings-title">
              <span>{{ $t('sell.create_listing.current_listing') }}</span>
            </div>
            <div class="mt-2 current-listings-content">
              <div
                v-for="(listing, idx) in current_listings"
                :key="idx"
                class="listing"
              >
                <span class="name">{{
                  listing.product_name + ': ' + listing.product_color
                }}</span>
                <span>{{ `x ${listing.amount}` }}</span>
                <span>{{ `SZ; ${listing.size}` }}</span>
                <span class="price"
                  >${{ listing.sale_price | formatPrice }}</span
                >
                <span class="price"
                  >${{ listing.min_bid_price | formatPrice }}</span
                >
                <img
                  :src="redCrossIcon"
                  alt="delete listing"
                  class="delete-listing-product"
                  @click="removeListingItem(idx)"
                />
              </div>
              <div v-if="current_listings.length == 0" class="listing-empty">
                {{ $t('sell.create_listing.nothing_yet') }}
              </div>
            </div>
          </div>
          <div>
            <button
              class="btn w-100 btn-dark confirm-list-btn"
              :disabled="!current_listings.length"
              @click="onConfirmListingClick"
            >
              {{ $t('sell.create_listing.confirm_listing') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '~/components/common/SearchInput.vue'
import redCrossIcon from '~/assets/img/icons/red-cross.svg'
import { getProductImageURL } from '~/utils/image.js'

/*
  Create listing page
 */
export default {
  components: {
    SearchInput,
  },
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      searchedInventories: [],
      product: null,
      apiUrl: process.env.API_URL,
      hasSearchResult: false,
      pricesLoading: false,
      productSizesPrices: {},
      form: {
        listing_type: 'sell',
        sale_price: null,
      },
      isFormInvalid: true,
      current_listings: [],
      redCrossIcon,
      searchText: null,
    }
  },
  mounted() {
    // Check if sessionStorage has listingItems.
    const items = window.sessionStorage.getItem('listing-items')
    const sku = window.sessionStorage.getItem('sku_of_edit_listingitems')
    const category = window.sessionStorage.getItem('cat_of_edit_listingitems')
    this.current_listings = JSON.parse(items) || []
    if (sku && category && this.current_listings.length > 0) {
      this.product = {
        sku,
        category,
        name: this.current_listings[0].product_name,
        colorway: this.current_listings[0].product_color,
      }
      window.sessionStorage.removeItem('sku_of_edit_listingitems')
      window.sessionStorage.removeItem('cat_of_edit_listingitems')
      window.sessionStorage.removeItem('listing-items')
    }
  },
  methods: {
    getProductImageURL,
    // Product search event listener
    onSearchInventory(term) {
      this.$axios
        .get('/inventories', {
          params: {
            search: term.toLowerCase(),
          },
        })
        .then((response) => {
          const data = response.data
          this.hasSearchResult = true
          const inventories = []
          data.forEach((item) => {
            const idx = this.current_listings.findIndex(
              (listing) =>
                listing.product_sku === item.sku &&
                listing.product_category === item.category &&
                listing.size === item.size
            )
            if (idx < 0) {
              inventories.push(item)
            }
          })
          this.searchedInventories = inventories
        })
    },
    // Open file input form
    openFileUploader() {
      this.$refs.input_file.click()
    },
    // render sizes/prices box
    renderSizeChart() {
      this.pricesLoading = true
      this.$axios
        .get(`/listing-items/${this.product.sku}/prices`)
        .then((response) => {
          this.productSizesPrices = response.data
          this.pricesLoading = false
        })
    },
    // Products dropdown "Click" event listener
    selectProduct(sku) {
      const index = this.searchedInventories.findIndex((p) => p.sku === sku)
      this.product = this.searchedInventories[index]
      this.hasSearchResult = false // Hide product select box
      this.renderSizeChart()
    },
    // "Allow Bids" checkbox "Change" event listener
    onAllowBidsChange(evt) {
      if (evt.target.checked) {
        this.form = {
          ...this.form,
          listing_type: 'bid',
          sale_price: undefined,
          min_bid_price: null,
        }
      } else {
        this.form = {
          ...this.form,
          listing_type: 'sell',
          sale_price: null,
          min_bid_price: undefined,
        }
      }
      this.validateAddToList()
    },
    // Trade button "Click" event listener
    onTradeClick() {
      this.form = {
        ...this.form,
        listing_type: 'trade',
        sale_price: null,
        min_bid_price: null,
      }
    },
    //  Reset AddToList form
    resetAddToList() {
      this.form = {
        listing_type: 'sell',
        sale_price: null,
        size: null,
      }
      this.isFormInvalid = true
    },
    // Validate AddToList form
    validateAddToList() {
      let invalid = false
      if (!this.form.size) {
        invalid = true
      }
      if (!this.form.amount || this.form.amount < 1) {
        invalid = true
      }
      if (this.form.listing_type !== 'bid') {
        if (!this.form.sale_price || this.form.sale_price < 1) {
          invalid = true
        }
      }
      if (this.form.listing_type !== 'sell') {
        if (!this.form.min_bid_price || this.form.min_bid_price < 1) {
          invalid = true
        }
      }
      this.isFormInvalid = invalid
    },
    // AddToList forms "Input" event listener
    onAddToListFormChange(e) {
      const key = e.target.name
      const newForm = { ...this.form }
      newForm[key] = e.target.value
      this.form = newForm
      this.validateAddToList()
    },
    // AddToList button "Click" event listener
    onAddToListClick() {
      const newListing = {
        ...this.form,
        sale_price: this.form.sale_price * 100 || 0,
        min_bid_price: this.form.min_bid_price * 100 || 0,
        product_sku: this.product.sku,
        product_name: this.product.name,
        product_color: this.product.colorway,
        product_category: this.product.category,
        status: this.form.listing_type === 'sell' ? 'active' : 'listed',
        inventory_id: this.product.id,
      }
      this.current_listings.push(newListing)
      this.resetAddToList()
    },
    // DeleteListingItem button "Click" event listener
    removeListingItem(idx) {
      this.current_listings.splice(idx, 1)
    },
    // Confirm button "Click" event listener
    onConfirmListingClick() {
      window.sessionStorage.setItem(
        'listing-items',
        JSON.stringify(this.current_listings)
      )
      this.$router.push('/sell/confirm-listing')
    },
    // Load CSV file
    importFromCSV(evt) {
      const f = evt.target.files[0]
      const self = this
      if (f) {
        const r = new FileReader()
        r.onload = function (e) {
          const contents = e.target.result
          const rows = contents.split('\n')
          let keys = []
          const data = []
          rows.forEach(function (row, index) {
            if (index === 0) {
              keys = rows[0].split(',')
            } else {
              const row = rows[index]
              const rowData = row.split(',')
              const obj = {}
              rowData.forEach(function (dd, idx) {
                const key = keys[idx]
                obj[key] = dd
              })
              data.push(obj)
            }
          })
          if (data.length > 0) {
            const { sku, category, size } = data[0]
            if (sku && category && size) {
              self.$axios
                .get('/products', {
                  params: {
                    sku,
                  },
                })
                .then(function (response) {
                  self.product = response.data[0]
                  self.renderSizeChart()
                })
                .catch(function () {
                  alert(self.$t('sell.create_listing.product_sku_invalid'))
                })
            } else {
              alert(self.$t('sell.create_listing.csv_invalid'))
            }
          }
        }
        r.readAsText(f)
      } else {
        alert(self.$t('sell.create_listing.load_file_error'))
      }
    },
  },
}
</script>
