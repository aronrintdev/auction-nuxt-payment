<template>
  <div class="sell-now mb-5">
    <div class="d-flex mb-5 top-bar align-items-center">
      <div class="position-relative w-50">
        <SearchInput variant="secondary" @change="onSearchInventory" />
        <div v-if="hasSearchResult" class="dropdown-options">
          <div
            v-for="inventory in searchedInventories"
            :key="`${inventory.sku}-${inventory.category.name}-${inventory.size}`"
            class="dropdown-option"
            @click="selectProduct(inventory.sku)"
          >
            <div class="d-flex justify-content-start">
              <img :src="`${apiUrl}/products/${inventory.sku}/thumb`" />
              <div class="ml-3">
                <div class="dropdown-option-title">{{ inventory.name }}</div>
                <div class="dropdown-option-desc">
                  {{ $t('sell.create_listing.sku') }}: {{ inventory.sku }}
                </div>
                <div class="dropdown-option-desc">
                  {{ $t('sell.create_listing.size') }}: {{ inventory.size }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="searchedInventories.length == 0"
            class="dropdown-option text-center"
          >
            {{ $t('sell.sell_now.no_result') }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="product" class="listing-content">
      <div class="row mb-3">
        <div class="col-12 col-md-6">
          <div class="product-details">
            <div class="product-details-title">{{ product.name }}</div>
            <div class="product-details-sku">{{ product.sku }}</div>
            <div class="product-details-color">{{ product.colorway }}</div>
            <div class="product-image">
              <img :src="`${apiUrl}/products/${product.sku}/image`" />
            </div>
          </div>
          <div class="price-listings mb-4">
            <div class="price-listings-title">
              {{ $t('sell.sell_now.price_listings') }}
            </div>
            <div
              class="
                price-listings
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.sell_now.lowest_price') }}:
                </div>
                <div class="price-listing-value lowest_price">
                  <span>{{ $t('sell.sell_now.not_available') }}</span>
                </div>
              </div>
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.sell_now.highest_bid') }}:
                </div>
                <div class="price-listing-value highest_bid">
                  <span>{{ $t('sell.sell_now.not_available') }}</span>
                </div>
              </div>
              <div class="price-listing">
                <div class="price-listing-label">
                  {{ $t('sell.sell_now.last_sold') }}:
                </div>
                <div class="price-listing-value last_sold_price">
                  <span>{{ $t('sell.sell_now.not_available') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex w-100 justify-content-between">
            <input
              id="size"
              name="size"
              type="text"
              readonly
              :value="product.size"
              :placeholder="$t('sell.sell_now.size_box_placeholder')"
              @input="onAddToListFormChange"
            />
            <input
              id="amount"
              name="amount"
              type="number"
              :placeholder="$t('sell.sell_now.amount_box_placeholder')"
              min="0"
              max="50"
              @input="onAddToListFormChange"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="payment-beakdown-title">
            {{ $t('sell.sell_now.payment_breakdown') }}
          </div>
          <div class="mt-3 mb-5">
            <input
              id="breakdown-price"
              class="w-100 breakdown-price"
              name="price"
              type="number"
              :placeholder="$t('sell.sell_now.price_box_placeholder')"
              @input="onAddToListFormChange"
            />
          </div>
          <div class="payment-details">
            <div class="payment-details-info mb-4">
              {{ $t('sell.sell_now.info') }}
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="payment-details-label">
                {{ $t('sell.sell_now.transaction_fee') }} ({{
                  transaction_fee_percent
                }}%)
              </div>
              <div class="payment-details-price">
                ${{ (form.price * transaction_fee_percent) | formatPrice }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="payment-details-label">
                {{ $t('sell.sell_now.payment_proc') }} ({{
                  payment_proc_percent
                }}%)
              </div>
              <div class="payment-details-price">
                ${{ (form.price * payment_proc_percent) | formatPrice }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="payment-details-label">
                {{ $t('sell.sell_now.shipping') }}
              </div>
              <div class="payment-details-price">
                {{ $t('sell.sell_now.free') }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <div class="payment-details-label">
                {{ $t('sell.sell_now.discount') }}
              </div>
              <div class="payment-details-price">
                <button class="add-discount-btn">
                  {{ $t('sell.sell_now.add_discount') }}
                </button>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between total-payout">
            <div class="payment-details-label">
              {{ $t('sell.sell_now.total_payout') }}
            </div>
            <div class="payment-details-price">
              ${{
                (form.price *
                  (100 - transaction_fee_percent - payment_proc_percent))
                  | formatPrice
              }}
            </div>
          </div>

          <button
            id="sell-now-btn"
            class="btn sell-now-btn"
            :disabled="isFormInvalid"
            @click="onSellNowClick"
          >
            {{ $t('sell.sell_now.sell_now') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '~/components/common/SearchInput.vue'
import redCrossIcon from '~/assets/img/icons/red-cross.svg'
import {TRANSACTION_FEE_PERCENT} from '~/static/constants/environments'

export default {
  name: 'SellNow',
  components: {
    SearchInput,
  },
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      searchedInventories: [],
      product: null,
      apiUrl: process.env.API_URL,
      transaction_fee_percent: TRANSACTION_FEE_PERCENT,
      payment_proc_percent: process.env.PAYMENT_PROC_PERCENT,
      hasSearchResult: false,
      form: {
        listing_type: 'sell',
        sale_price: null,
        price: 0,
      },
      isFormInvalid: true,
      redCrossIcon,
      breakdown_price: null,
    }
  },
  methods: {
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
          this.searchedInventories = data
        })
    },
    // Products dropdown "Click" event listener
    selectProduct(sku) {
      const index = this.searchedInventories.findIndex((p) => p.sku === sku)
      this.product = this.searchedInventories[index]
      this.hasSearchResult = false // Hide product select box
    },
    // Reset form
    resetAddToList() {
      this.form = {
        listing_type: 'sell',
        sale_price: null,
      }
      this.isFormInvalid = true
    },
    // Validate form
    validateAddToList() {
      let invalid = false
      if (!this.form.amount || this.form.amount < 1) {
        invalid = true
      }
      if (!this.form.price || this.form.price < 1) {
        invalid = true
      }
      this.isFormInvalid = invalid
    },
    // AddToList forms "Input" event listener
    onAddToListFormChange(e) {
      const key = e.target.name
      const newForm = { ...this.form }
      this.breakdown_price = this.form.price
      newForm[key] = parseFloat(e.target.value) || 0
      this.form = newForm
      this.validateAddToList()
    },
    // SellNow button "Click" event listener
    onSellNowClick() {
      const form = {
        ...this.form,
        size: `${this.product.size}`,
        sale_price:
          this.form.price *
          (100 - this.transaction_fee_percent - this.payment_proc_percent) *
          100,
        is_sell_now: true,
        inventory_id: this.product.id,
        min_bid_price: 0,
      }
      const self = this
      this.$axios.post('/listing-items', form).then(function () {
        self.$router.push('/sell/sale-confirmed')
      })
    },
  },
}
</script>
