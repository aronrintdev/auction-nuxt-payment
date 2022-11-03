<template>
  <div class="exchange-product-detail mb-5">
    <!-- Loaders -->
    <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>
    <!-- mobile responsive Pricing Section   -->
    <div v-if="!loading" class="row mobile-design mb-5">
      <div class="col-8">
        <div class="body-4-normal mb-1 text-gray-6">
          {{ dayjs(product && product.created_at).format('DD, MMM, h:mm A') }}
        </div>
        <div class="body-4-bold mb-2">
          {{ product && product.avg_sales_price | toCurrency }} ({{
            $t('deadstock_exchange.detail.avg_price')
          }})
        </div>
        <div
          class="body-4-normal mb-2"
          :class="
            product && product.sales_percentage >= 0
              ? 'text-success'
              : 'text-danger'
          "
        >
          {{ product && product.sales_percentage | toPercentage }}
        </div>
      </div>
      <div class="col-4 text-right">
        <Button
          variant="dark-blue"
          class="px-4 mb-1 btn-block"
          @click="handleBuyNowClick"
        >
          <div>{{ $t('deadstock_exchange.detail.buy') }}</div>
        </Button>
        <Button
          variant="dark"
          class="px-4 mb-3 btn-block"
          @click="handleSellNowClick"
        >
          <div>{{ $t('deadstock_exchange.detail.sell') }}</div>
        </Button>
        <div v-if="error.buyNow" class="error-text">
          {{ error.buyNow }}
        </div>
      </div>
    </div>
    <div v-if="!loading" class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 desktop-design">
        <div class="row">
          <div class="col-lg-2">
            <ProductThumb
              :src="product && product.image"
              class="product-thumbnail"
            />
          </div>
          <div class="col-lg-5 desktop-product-name-section">
            <div class="body-4-bold mb-2">{{ product && product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 product-variant">
              {{ product && product.colorway }}
            </div>
          </div>
          <!-- mobile responsive product average Section   -->
          <div class="col-lg-5 mobile-product-name-section">
            <div class="row">
              <div class="col-10">
                <div class="body-4-bold mb-2">
                  {{ product && product.name }}
                </div>
                <div class="body-5-normal mb-2 text-gray-6 product-variant">
                  {{ $t('deadstock_exchange.detail.last_sale') }}:
                  {{ product && product.last_price | toCurrency }}
                  <span
                    :class="
                      product && product.sales_percentage > 0
                        ? 'text-success'
                        : 'text-danger'
                    "
                    >{{
                      product && product.sales_percentage | toPercentage
                    }}</span
                  >
                </div>
              </div>
              <div class="col-2 text-right">
                <Button
            id="popover-wishlist"
            :tooltip-text="wishList ? wishList.name : ''"
            tabindex="0"
            variant="link"
            class="mr-3 shadow-none"
            @click="removeFromWishList"
          >
            <template #default>
              <b-img v-if="!wishList" width="18" :src="require('~/assets/img/product/heart-outline.svg')"></b-img>
              <b-img v-else width="18" :src="require('~/assets/img/icons/heart-red.svg')"></b-img>
            </template>
          </Button>
                <!-- <Button
                  id="popover-wishlist"
                  variant="link"
                  :icon="wishList ? `heart-red.svg` : 'heart2.svg'"
                  icon-only
                  class="mr-3 shadow-none"
                  tabindex="0"
                  :tooltip-text="wishList ? wishList.name : ''"
                  pill
                  @click="removeFromWishList"
                >
                </Button> -->
              </div>
            </div>
          </div>
          <div class="col-lg-5 text-right desktop-product-btns-section">
            <Button variant="dark-blue" @click="handleBuyNowClick">
              <div class="d-flex justify-content-between">
                <div>{{ $t('deadstock_exchange.detail.buy') }}</div>
              </div>
            </Button>
            <Button variant="dark" @click="handleSellNowClick">
              <div class="d-flex justify-content-between">
                <div>{{ $t('deadstock_exchange.detail.sell') }}</div>
              </div>
            </Button>
            <div v-if="error.buyNow" class="error-text">
              {{ error.buyNow }}
            </div>
          </div>
        </div>
        <div class="row desktop-product-price-section">
          <div class="col-lg-12">
            <div class="body-4-normal mb-2 text-gray-6">
              {{
                dayjs(product && product.created_at).format('DD, MMM, h:mm A')
              }}
            </div>
            <div class="body-4-bold mb-2">
              {{ product && product.retail_price | toCurrency }}
            </div>
          </div>
        </div>
        <!-- mobile Responsive TabBar Section  -->
        <div class="row mobile-average-tab my-2">
          <div class="col-lg-12 text-center">
            <NavGroup
              :data="PRICE_SIZE_TABS"
              :value="priceSizeTabCurrentValue"
              class="section-nav"
              nav-key="line_chart"
              @change="handlePriceSizeTabChange"
            />
          </div>
        </div>
        <!-- mobile responsive product sizepicker Section -->
        <div class="row mobile-product-size-picker mb-3">
          <div class="col-12">
            <ProductSizePicker
              ref="productSizePicker"
              :sizes="sizes"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewAll"
            />
             <!--Out Of Stock Message -->
             <div
              v-if="
                method === 'buy' && isOutOfStock && sizeViewMode === 'carousel'
              "
              class="text-center body-8-medium text-danger"
            >
              {{ $t('products.error.out_of_stock') }}
            </div>
          </div>
        </div>
        <div class="row desktop-chart-header-section">
          <div class="col-lg-3 col-md-3">
            <div
              class="body-4-normal mb-2 sale-average"
              :class="
                product && product.sales_percentage > 0
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ product && product.sales_percentage | toPercentage }}
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="body-4-normal mb-2 text-gray-6">
              <NavGroup
                :data="CHART_FILTER_TABS"
                :value="chartTabCurrentValue"
                class="chart-section-nav"
                nav-key="line_chart"
                @change="handleChartTabChange"
              />
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3">
            <Button
              variant="white"
              class="share-icon"
              icon="share.svg"
              icon-only
              pill
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-12">
            <client-only>
              <LineChart
                ref="lineChart"
                :data="lineDatasets.datasets[0].data"
                :chartData="lineDatasets"
                :options="lineChartOptions"
                :labels="lineDatasets.labels"
                :isGraph="true"
                class="line-chart"
                chart-id="vendor-dashboard-line-chart"
              />
            </client-only>
          </div>
        </div>
        <div class="row mt-5 desktop-average-tab">
          <div class="col-lg-12 text-center">
            <NavGroup
              :data="PRICE_SIZE_TABS"
              :value="priceSizeTabCurrentValue"
              class="section-nav"
              nav-key="line_chart"
              @change="handlePriceSizeTabChange"
            />
          </div>
        </div>
        <div class="row desktop-product-size-picker">
          <div class="col-lg-12 ml-3">
            <ProductSizePicker
              ref="productSizePicker"
              :sizes="sizes"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewAll"
            />
            <!--Out Of Stock Message -->
            <div
              v-if="
                method === 'buy' && isOutOfStock && sizeViewMode === 'carousel'
              "
              class="text-center body-8-medium text-danger"
            >
              {{ $t('products.error.out_of_stock') }}
            </div>
          </div>
        </div>
      </div>
      <!-- mobile responsive product detail Section -->
      <div class="col-lg-6 col-md-12 col-sm-12 mobile-product-detail-section">
        <div class="body-2-bold mb-2">
          {{ $t('deadstock_exchange.detail.product_detail') }}
        </div>
        <div class="row bg-gray-light p-2 mb-2">
          <div class="col-md-12">
            <div class="row">
              <div class="col-6 body-6-bold">
                {{ $t('deadstock_exchange.detail.sku') }}
              </div>
              <div class="col-6 text-right">
                {{ product && product.sku }}
              </div>
            </div>
            <div class="row">
              <div class="col-6 body-6-bold">
                {{ $t('deadstock_exchange.detail.colorway') }}
              </div>
              <div class="col-6 text-right">
                {{ product && product.colorway }}
              </div>
            </div>
            <div class="row">
              <div class="col-6 body-6-bold">
                {{ $t('deadstock_exchange.detail.retail_price') }}
              </div>
              <div class="col-6 text-right">
                {{ product && product.retail_price }}
              </div>
            </div>
            <div class="row">
              <div class="col-6 body-6-bold">
                {{ $t('deadstock_exchange.detail.release_date') }}
              </div>
              <div class="col-6 text-right">
                {{ product && product.release_year }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="body-2-bold mb-2">
          {{ $t('deadstock_exchange.detail.similar_products') }}
        </div>
        <div class="row">
          <div class="col-md-12">
            <StockExchangeMobileFilter @change="handleSortBySelect" />
          </div>
        </div>
        <div class="row desktop-similar-filter-section">
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-10">
            <!-- Input search -->
            <div
              v-click-outside="hideDropdown"
              class="searchbox"
              :class="{ open: hasSearchResult }"
            >
              <search-box
                :searchText="searchText"
                :placeholder="
                  $t('deadstock_exchange.filter_by.details_placeholder')
                "
                @search="searchProduct"
              />
              <div v-if="hasSearchResult" class="dropdown-options">
                <div
                  v-for="prod in searchedProducts"
                  :key="`${prod.sku}-${prod.category.name}`"
                  class="dropdown-option d-flex align-items-center"
                  @click="selectProduct(prod)"
                >
                  <div class="position-relative d-inline-flex">
                    <b-img
                      :src="`${
                        prod.image || 'https://images.deadstock.co/404.png'
                      }?width=150}`"
                      class="mx-auto"
                      alt="..."
                    />
                    <div class="position-absolute overlay"></div>
                  </div>
                  &nbsp; {{ prod.name }}
                </div>
                <div
                  v-if="!searchedProducts.length"
                  class="dropdown-option text-center"
                >
                  {{ $t('sell.create_listing.no_result') }}
                </div>
              </div>
            </div>
            <!-- ./Input search -->
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-2">
            <FormDropdown
              id="sort-by"
              :value="selectedFilters.sortBy"
              :placeholder="$t('deadstock_exchange.detail.filter')"
              :items="SIMILAR_FILTER_SORT_OPTIONS"
              :icon="require('~/assets/img/icons/three-lines.svg')"
              :icon-arrow-down="
                require('~/assets/img/icons/arrow-down-gray2.svg')
              "
              class="dropdown-sort flex-shrink-1"
              can-clear
              @select="handleSortBySelect"
            />
          </div>
        </div>
        <div class="row">
          <div id="tb-product" class="col-lg-12 overflow-auto">
            <SimilarProductTable
              :products="similarProducts"
              notDataTitle="No similar products found"
            />
          </div>
        </div>
      </div>
      <WishListPopover
      :product="productDetail"
      :wish-list="wishList"
      target="popover-wishlist"
      @show="wishListShow = true"
      @hidden="wishListShow = false"
      @wishlisted="onWishListed"
    />
    </div>
    <Modal
      id="size-all-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="row text-left">
          <div class="col-12">
            <div class="body-4-bold">
              {{ $t('deadstock_exchange.detail.all_sizes') }}
            </div>
          </div>
        </div>
        <hr class="my-2" />
        <div class="row">
          <div class="col-6 text-left">
            <div class="body-6-bold mb-2">
              {{ $t('deadstock_exchange.detail.average_price') }}
            </div>
            <div class="body-4-bold">
              {{ product && product.avg_sales_price | toCurrency }}
            </div>
          </div>
          <div class="col-6 text-right">
            <div class="body-6-bold mb-2">
              {{ $t('deadstock_exchange.detail.day_gain') }}
            </div>
            <div
              class="body-6-normal"
              :class="
                product && product.gainRatio > 0
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              {{ product && product.gainRatio | toCurrency }}
            </div>
          </div>
        </div>
        <hr class="my-2" />
        <div class="row">
          <div class="col-12">
            <div class="all-sizes">
              <div class="row  row-cols-lg-4 row-cols-md-4 row-cols-sm-3 row-cols-xs-2 items-wrapper">
                <div
                  v-for="size in sizes"
                  :key="`size-${size.type}-${size.id}`"
                  :class="`col item ${
                    currentSize === size.id ? 'active' : ''
                  }`"
                >
                  <div
                    class="card text-left pl-2 w-100"
                    @click="handleSizeSelect(size.id)"
                  >
                    {{ size.size }}
                    <div class="price">
                      {{ size.price | toCurrency }}
                    </div>
                    <div
                      class="price-ratio"
                      :class="
                        product && product.size_to_price_percentage > 0
                          ? 'text-success'
                          : 'text-danger'
                      "
                    >
                      {{ size.size_to_price_percentage | toPercentage }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
 
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash.debounce'
import SearchBox from '../RoundSearchBox'
import SimilarProductTable from './SimilarProductTable.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import StockExchangeMobileFilter from '~/components/Exchange/MobileFilter'
import WishListPopover from '~/components/wish-list/Popover.vue'
import { Button, Loader, FormDropdown, Modal } from '~/components/common'
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'

export default {
  name: 'ProductDetail',
  components: {
    ProductThumb,
    Button,
    Loader,
    NavGroup,
    SimilarProductTable,
    SearchBox,
    FormDropdown,
    ProductSizePicker,
    Modal,
    StockExchangeMobileFilter,
    WishListPopover,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      dayjs,
      loading: false,
      product: null,
      graphData: null,
      similarProducts: [],
      prices: [],
      sortBy: null,
      chartTabCurrentValue: 'all',
      currentSize: null,
      currentCondition: null,
      currentListingItem: null,
      method: 'buy',
      sizeViewMode: 'carousel',
      priceSizeTabCurrentValue: 'average_price',
      wishListShow: false,
      searchedProducts: [],
      searchText: null,
      hasSearchResult: false,
      error: {
        addToCart: null,
        buyNow: null,
      },
      selectedFilters: {
        type: 'trending',
        sizeTypes: [],
        sizes: [],
        brands: [],
        categories: [],
        status: [],
        sortby: null,
        product: null,
      },
      SIMILAR_FILTER_SORT_OPTIONS: [
        {
          label: this.$t('vendor_purchase.sort_by'),
          value: 'default',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.highest_change'),
          value: 'highestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.lowest_change'),
          value: 'lowestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.release_date_asc'),
          value: 'releaseDateAsc',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_lh'),
          value: 'lastPriceLh',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_hl'),
          value: 'lastPriceHl',
        },
      ],
      PRICE_SIZE_TABS: [
        {
          label: this.$t('deadstock_exchange.detail.avg_price'),
          value: 'average_price',
        },
        {
          label: this.$t('deadstock_exchange.detail.size_specific'),
          value: 'size_specific',
        },
      ],
      CHART_FILTER_TABS: [
        {
          label: this.$t('deadstock_exchange.detail.24h'),
          value: '24',
        },
        {
          label: this.$t('deadstock_exchange.detail.7d'),
          value: '7',
        },
        {
          label: this.$t('deadstock_exchange.detail.30d'),
          value: '30',
        },
        {
          label: this.$t('deadstock_exchange.detail.6m'),
          value: '6',
        },
        {
          label: this.$t('deadstock_exchange.detail.1y'),
          value: '1',
        },
        {
          label: this.$t('deadstock_exchange.detail.all'),
          value: 'all',
        },
      ],
      // line chart data
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                fontFamily: 'Montserrat',
                fontColor: '#000',
                fontSize: 12,
                fontStyle: 'bold',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                labelString: [
                  '$0.00',
                  '$100.00',
                  '$200.00',
                  '$300.00',
                  '$400.00',
                ],
              },
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                fontFamily: 'Montserrat',
                fontColor: '#000',
                fontSize: 12,
                fontStyle: 'bold',
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      lineDatasets: {
        labels: ['2 pm', '6 pm', '10 pm', '2 am', '6 am', '10 am', '2 pm'],
        datasets: [
          {
            borderColor: '#0bb63f',
            backgroundColor: null,
            data: [0, 50.0, 150.0, 250.0, 400.0],
            fill: false,
            borderWidth: 2,
          },
        ],
      },
    }
  },
  async fetch() {
    const { sku } = this.$route.params

    this.loading = true
    this.product = await this.$axios
      .get(`/stock-exchange/${sku}`)
      .then((res) => res.data)
    this.similarProducts = this.product.similar_products
    const lowestPrice = _.minBy(this.product.lowest_prices, 'price')
    if (lowestPrice) {
      this.currentSize = lowestPrice.size_id
      this.currentCondition = lowestPrice.packaging_condition_id
      await this.findListingItem() // 'add to chart' button needs listing of item
    } else {
      this.currentCondition = this.product.packaging_conditions[0]?.id
    }
    this.loading = false
  },
  computed: {
    sizes() {
      return this.product?.sizes || []
    },
    wishList() {
      return this.product &&
        this.product.wish_lists &&
        this.product.wish_lists.length > 0
        ? this.product.wish_lists[0]
        : null
    },
    productId(){
        return this.product && this.product.id
    },
    isOutOfStock() {
      return this.currentSize && !this.currentListingItem
    },
    productDetail() {
      return this.product || {}
    },
  },
  watch: {
    selectedFilters: {
      handler(newV) {
        this.emitChange(newV)
      },
      deep: true,
    },
  },
  mounted() {
    this.getProductChartData()
  },
  methods: {
    ...mapActions({
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      checkItemExistforVendor: 'sell-now/checkItemExistforVendor',
      storeOfferDetails: 'offer/storeOfferDetails',
    }),
    handleChartTabChange(value) {
      this.chartTabCurrentValue = value
      this.changeGraphLabel(value)
    },
    handlePriceSizeTabChange(value) {
      this.priceSizeTabCurrentValue = value
    },
    handleSizeViewAll() {
      this.$bvModal.show('size-all-modal')
    },
    // Event handler when user select size in `view all` mode
    handleSizeSelect(sizeId) {
      this.$bvModal.hide('size-all-modal')
      this.updateSize(sizeId)
    },
    // Event handler when user select size in `view all` mode
    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
        this.resetError()
        this.findListingItem()
      }
    },
    // Emit update event to parent component when user select size
    updateSize(sizeId) {
      this.$refs.productSizePicker.updateSize(sizeId)
    },
    pricesBySize() {
      if (this.method === 'buy') {
        return this.product?.lowest_prices?.filter(
          (i) => i.packaging_condition_id === this.currentCondition
        )
      } else {
        return this.product?.highest_offers?.filter(
          (i) => i.packaging_condition_id === this.currentCondition
        )
      }
    },
    async findListingItem() {
      if (!this.currentSize || !this.currentCondition) return
      const params = {
        size_id: this.currentSize,
        packaging_condition_id: this.currentCondition,
      }
      this.currentListingItem = await this.$axios
        .get(`/products/${this.product.id}/selling-item`, {
          params,
          handleError: false,
        })
        .then((res) => res.data)
        .catch(() => null)
      if (
        this.currentListingItem &&
        this.currentListingItem.inventory &&
        this.currentListingItem.inventory.sale_price < this.lowestPrice
      ) {
        this.product.lowest_prices = this.product.lowest_prices.map((i) => {
          if (i.size_id === this.currentSize) {
            i.price = this.currentListingItem.inventory.sale_price
          }
          return i
        })
      }
    },
    resetError() {
      this.error = {
        addToCart: null,
        buyNow: null,
      }
    },
    getCartProduct() {
      return {
        id: this.product.id,
        name: this.product.name,
        sku: this.product.sku,
        colorWay: this.product.colorway,
        size: this.sizes[this.currentSize - 1],
        quantity: 1,
        inventory_stock: this.currentListingItem?.inventory_stock,
        price: this.currentListingItem?.inventory?.sale_price,
        image: `${this.API_PROD_URL}/${this.category}/${this.sku}/image`,
        listing_item_id: this.currentListingItem?.id,
      }
    },
    handleBuyNowClick() {
      if (!this.currentSize) {
        this.error.buyNow = this.$t('products.error.select_size')
        return
      }

      this.$store.dispatch('shopping-cart/addProduct', this.getCartProduct())
      this.$router.push('/checkout/selling')
    },
    // On sell now click
    handleSellNowClick() {
      // When user clicks on sell now, if not logged in, the user will go to login screen or to sign up,
      if (!this.authenticated) {
        this.$router.push('/login')
      }

      // If the user is not a vendor then we will redirect user to vendor hub apply page
      if (this.authenticated && !this.isVendor) {
        this.$router.push('/profile/vendor-hub')
        return
      }

      // If no highest offer is placed.
      if (!this.highestOffer) {
        this.$toasted.error(this.$t('sell_now.no_offer'))
        return false
      }

      // If no listing or
      // If the currently listing inventory's vendor id doesnot matches the logged in vendor id,
      // then create listing with inventory.

      this.checkItemExistforVendor({
        productID: this.getCartProduct().id,
        sizeId: this.currentSize,
        packagingConditionId:
          this.packagingConditions[this.currentCondition - 1].id,
        offerAmount: this.highestOffer,
      })
        .then((res) => {
          this.$store
            .dispatch('sell-now/selectedItem', res.data.data)
            .then(() => {
              this.moveToSellNow()
            })

          return true
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Sell now create inventory and listing error',
            err.response.data.message
          )
          this.$nuxt.refresh()
        })
    },

    moveToSellNow() {
      // after becoming a vendor or logging in as a vendor, the user will see
      // the above screen for the sell now based on commission percentage like if
      // vendor specific is defined then vendor specific otherwise global and
      // calculate the products price including shipping and processing fee
      if (
        this.getSelectedItemforVendor &&
        this.getSelectedItemforVendor.product &&
        this.authenticated &&
        this.isVendor
      ) {
        const sellNowData = {
          id: this.getSelectedItemforVendor.product_id,
          size: this.getSelectedItemforVendor.size,
          size_id: this.getSelectedItemforVendor.size_id,
          name: this.getSelectedItemforVendor.product.name,
          product: this.product,
          brand: this.getSelectedItemforVendor.product.brand,
          sku: this.getSelectedItemforVendor.product.sku,
          colorWay: this.getSelectedItemforVendor.product.colorway,
          image: `${this.API_PROD_URL}/${this.getSelectedItemforVendor.product.category.name}/${this.getSelectedItemforVendor.product.sku}/image`,
          quantity: 1,
          packaging_condition:
            this.packagingConditions[
              this.getSelectedItemforVendor.packaging_condition_id - 1
            ],
          packaging_condition_id:
            this.packagingConditions[
              this.getSelectedItemforVendor.packaging_condition_id - 1
            ].id,
          price: this.getSelectedItemforVendor.sale_price,
          listing_item_id: this.getSelectedItemforVendor.listing_items[0].id,
          highestOffer: this.highestOffer,
        }

        this.$store.dispatch('sell-now/addItem', sellNowData)
        this.$router.push('/checkout/sell-now')
      }
    },
    onWishListed(wishList) {
      if (wishList) {
        this.product.wish_lists = [wishList]
        this.wishListShow = false
      }
    },
    removeFromWishList() {
      if (this.wishList) {
        // We need to blur button in order to make popover work again.
        document.activeElement.blur()
        this.removeProductsFromWishList({
          wishList: this.wishList,
          ids: [this.product.id],
        })
        this.product.wish_lists = []
      }
    },
    changeGraphLabel(category) {
      switch (category) {
        // there will sort category if equal to 24 hours then we will assgin
        //  24 hours record to the graph
        case '24': {
          const oneDay = this.getGraphData(this.graphData.oneDay.data)
          this.lineDatasets.labels = this.graphData.oneDay.labels
          this.lineDatasets.datasets[0].data = oneDay
          this.$refs.lineChart.renderLineChart()
          break
        }
        case '7': {
          // there will sort category if equal to week then we will assgin
          //  Week record to the graph
          const week = this.getGraphData(this.graphData.week.data)
          this.lineDatasets.labels = this.graphData.week.labels
          this.lineDatasets.datasets[0].data = week
          this.$refs.lineChart.renderLineChart()
          console.log(week)
          break
        }
        case '30': {
          // there will sort category if equal to 30 days then we will assgin
          //  30 days record to the graph
          const oneMonth = this.getGraphData(this.graphData.oneMonth.data)
          this.lineDatasets.labels = this.graphData.oneMonth.labels
          this.lineDatasets.datasets[0].data = oneMonth
          this.$refs.lineChart.renderLineChart()
          break
        }
        case '6': {
          // there will sort category if equal to 6 month then we will assgin
          //  6 month record to the graph
          const sixMonth = this.getGraphData(this.graphData.sixMonths.data)
          this.lineDatasets.labels = this.graphData.sixMonths.labels
          this.lineDatasets.datasets[0].data = sixMonth
          this.$refs.lineChart.renderLineChart()
          break
        }
        case '1': {
          // there will sort category if equal to 1 Year then we will assgin
          //  1 year record to the graph
          const oneYear = this.getGraphData(this.graphData.oneYear.data)
          this.lineDatasets.labels = this.graphData.oneYear.labels
          this.lineDatasets.datasets[0].data = oneYear
          this.$refs.lineChart.renderLineChart()
          break
        }
        case 'all': {
          // there will sort category if equal to Al record then we will assgin
          //  All record to the graph
          const allData = this.getGraphData(this.graphData.all.data)
          this.lineDatasets.labels = this.graphData.all.labels
          this.lineDatasets.datasets[0].data = allData
          this.$refs.lineChart.renderLineChart()
          break
        }
        default:
          // there will sort category if equal to 24 hours then we will assgin
          //  24 hours record to the graph
          this.lineDatasets.labels = [
            '7 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
      }
    },
    // On filter sort by change.
    handleSortBySelect(option) {
      console.log(option?.value)
      this.selectedFilters = {
        ...this.selectedFilters,
        sortby: option?.value,
      }
    },
    // Submit updated filters
    emitChange: debounce(function (filters) {
      this.$emit('filterList', filters)
    }, 300),
    getProductChartData() {
      this.loading = true
      this.$axios
        .get(`/stock-exchange/${this.$route.params.sku}/graph`)
        .then((response) => {
          if (response.data) {
            this.graphData = response.data.data
            this.loading = false
          }
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.message)
        })
    },
    // Search event listener
    searchProduct(value) {
      this.searchText = value
      if (value) {
        this.$axios
          .get('/products', {
            params: {
              type: this.type,
              page: this.currentPage,
              take: this.perPage,
              search: this.searchText.toLowerCase(),
              sortBy: this.sortBy,
            },
          })
          .then((response) => {
            this.hasSearchResult = true
            this.similarProducts = response.data.data || []
          })
          .catch((error) => {
            this.hasSearchResult = false
            this.$toasted.error(error)
          })
      } else {
        this.selectedProduct = null
        this.emitChange()
      }
    },
    // Select product
    selectProduct(product) {
      this.selectedProduct = product.sku
      this.searchText = product.name
      this.selectedFilters = {
        ...this.selectedFilters,
        product: this.selectedProduct,
      }
      this.hideDropdown()
    },
    hideDropdown() {
      this.hasSearchResult = false
      this.searchedProducts = []
    },
    getGraphData(arrayData) {
      // there we sort the garph data with selected time period
      if (arrayData.length > 0) {
        const newData = arrayData.reduce(function (acc, current) {
          acc.push(current.sale_price)
          return acc
        }, [])
        return newData
      }
      return []
    },
  },
}
</script>
