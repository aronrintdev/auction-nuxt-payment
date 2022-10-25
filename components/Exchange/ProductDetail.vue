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
            {{ dayjs().format('DD, MMM, h:mm A') }}
          </div>
          <div class="body-4-bold mb-2">$ 250.00 (Avg.price)</div>
          <div class="body-4-normal mb-2 text-success">+0.64 (+0.36%)</div>
        </div>
        <div class="col-4 text-right">
          <Button variant="dark-blue" class="px-4 mb-1 btn-block" @click="handleBuyClick">
              <div>{{ $t('deadstock_exchange.detail.buy') }}</div>
          </Button>
          <Button variant="dark" class="px-4 mb-3 btn-block" @click="handleSellClick">
              <div>{{ $t('deadstock_exchange.detail.sell') }}</div>
          </Button>
        </div>
    </div>
    <div v-if="!loading" class="row">

      <div class="col-lg-6 col-md-12 col-sm-12 desktop-design">
        <div class="row">
          <div class="col-lg-2">
            <ProductThumb
              src="https://api.deadstock.co/prod/api/sneakers/CV7562-401/image"
              class="product-thumbnail"
            />
          </div>
          <div class="col-lg-5 desktop-product-name-section">
            <div class="body-4-bold mb-2">Nike Lebron 18 Low (2021)</div>
            <div class="body-4-normal mb-2 text-gray-6 product-variant">Black & White</div>
          </div>
          <!-- mobile responsive product average Section   -->
          <div class="col-lg-5 mobile-product-name-section">
            <div class="row">
              <div class="col-10">
                <div class="body-4-bold mb-2">Nike Lebron 18 Low (2021)</div>
                <div class="body-5-normal mb-2 text-gray-6 product-variant">Last Sale: $250.00    <span class="text-success">+0.64 (+0.36%)</span></div>
              </div>
              <div class="col-2 text-right">
                <Button
                :id="`popover-wishlist-`"
                variant="link"
                :icon="wishList ? `heart-red.svg` : 'heart2.svg'"
                icon-only
                class="mr-3 shadow-none"
                tabindex="0"
                :tooltip-text="wishList ? wishList.name : ''"
                pill
                @click="removeFromWishList"
              >
              </Button>
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
          </div>
        </div>
        <div class="row desktop-product-price-section">
          <div class="col-lg-12">
            <div class="body-4-normal mb-2 text-gray-6">
              {{ dayjs().format('DD, MMM, h:mm A') }}
            </div>
            <div class="body-4-bold mb-2">$ 250.00</div>
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
              :sizes="sizes"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewAll"
            />
          </div>
        </div>
        <div class="row desktop-chart-header-section">
          <div class="col-lg-3 col-md-3">
            <div class="body-4-normal mb-2 text-success sale-average">+0.64 (+0.36%)</div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 ">
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
            <Button variant="white" class="share-icon" icon="share.svg" icon-only pill />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-12">
            <LineChart
              :chart-data="lineDatasets"
              :options="lineChartOptions"
              class="line-chart"
              chart-id="vendor-dashboard-line-chart"
            />
          </div>
        </div>
        <!-- mobile responsive product detail Section   -->

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
              :sizes="sizes"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewAll"
            />
          </div>
        </div>
      </div>
      <div v-if="isMobile" class="col-lg-6 col-md-12 col-sm-12">
        <div class="body-2-bold mb-2">
          {{ $t('deadstock_exchange.detail.product_detail') }}
        </div>
        <div class="row bg-gray-light p-1 mb-2">
          <div class="col-md-12 d-flex">
            <div class="col-md-6 col-sm-6">Sku</div>
            <div class="col-md-6 col-sm-6 text-right">2132</div>
          </div>
          <div class="col-md-12 d-flex">
            <div class="col-md-6 col-sm-6">Colorways</div>
            <div class="col-md-6 col-sm-6 text-right">2132</div>
          </div>
          <div class="col-md-12 d-flex">
            <div class="col-md-6 col-sm-6">Retails Price</div>
            <div class="col-md-6 col-sm-6 text-right">2132</div>
          </div>
          <div class="col-md-12 d-flex">
            <div class="col-md-6 col-sm-6">Retails Details</div>
            <div class="col-md-6 col-sm-6 text-right">2132</div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="body-2-bold mb-2">
          {{ $t('deadstock_exchange.detail.similar_products') }}
        </div>
        <div class="row">
          <div class="col-md-12">
            <StockExchangeMobileFilter @change="handleFilterChange"/>
          </div>
        </div>
        <div class="row desktop-similar-filter-section">
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-10">
            <!-- Input search -->
            <SearchInput
              :value="similarProductSearchValue"
              :placeholder="
                $t('deadstock_exchange.filter_by.details_placeholder')
              "
              variant="light"
              class="flex-grow-1 mr-4 search-input"
              :debounce="1000"
              @change="searchProduct"
            />
            <!-- ./Input search -->
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-2">
            <FormDropdown
              id="sort-by"
              :value="sortBy"
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
            <SimilarProductTable :products="products" />
          </div>
        </div>
      </div>
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
            <div class="body-4-bold">All Sizes</div>
          </div>
        </div>
        <hr class="my-2" />
        <div class="row">
          <div class="col-6 text-left">
            <div class="body-6-bold mb-2">Average price</div>
            <div class="body-4-bold">$ 234.00</div>
          </div>
          <div class="col-6 text-right">
            <div class="body-6-bold mb-2">Day gain</div>
            <div class="body-6-normal text-success">$90.00</div>
          </div>
        </div>
        <hr class="my-2" />
        <div class="row">
          <div class="col-12">
            <div class="all-sizes">
              <div class="row items-wrapper">
                <div
                  v-for="size in sizes"
                  :key="`size-${size.type}-${size.id}`"
                  :class="`col-3 item ${
                    currentSize === size.id ? 'active' : ''
                  }`"
                >
                  <div
                    class="card text-left pl-2"
                    @click="handleSizeSelect(size.id)"
                  >
                    {{ size.size }}
                    <div class="price">
                      $ 234.00
                      <!-- {{ getPriceBySize(size.id) | toCurrency }} -->
                    </div>
                    <div class="price-ratio text-success">
                      +0.64(+0.36%)
                      <!-- {{ getPriceBySize(size.id) | toCurrency }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- <WishListPopover
        @show="wishListShow = true"
        @hidden="wishListShow = false"
        @wishlisted="onWishListed"
      /> -->

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import dayjs from 'dayjs'
import SimilarProductTable from './SimilarProductTable.vue'
import ProductSizePicker from '~/components/product/SizePicker'
import StockExchangeMobileFilter from '~/components/Exchange/MobileFilter'
// import WishListPopover from '~/components/wish-list/Popover.vue'
import {
  Button,
  Loader,
  FormDropdown,
  SearchInput,
  Modal,

} from '~/components/common'
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
    SearchInput,
    FormDropdown,
    ProductSizePicker,
    Modal,
    StockExchangeMobileFilter
    // WishListPopover
  },
  data() {
    return {
      dayjs,
      loading: false,
      screenWidth: null,
      products: [],
      prices: [],
      similarProductSearchValue: '',
      sortBy: null,
      chartTabCurrentValue: '24',
      currentSize: null,
      currentCondition: null,
      method: 'buy',
      sizeViewMode: 'carousel',
      priceSizeTabCurrentValue: 'average_price',
      wishListShow: false,
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
  computed: {
    sizes() {
      // return this.products?.sizes || []
      return [
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 35,
          size: '5',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 36,
          size: '6',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 37,
          size: '7',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
        {
          created_at: '2022-08-19T18:53:52.000000Z',
          enabled: true,
          id: 38,
          size: '9',
          size_type_id: null,
          type: 'women',
          updated_at: '2022-08-19T18:53:52.000000Z',
        },
      ]
    },
    wishList() {
      return null
      // return this.product.wish_lists && this.product.wish_lists.length > 0
      //   ? this.product.wish_lists[0]
      //   : null
    },
    isMobile() {
      if (this.screenWidth <= 760) {
        return true
      } else {
        return false
      }
    },

  },

  watch: {
    lineDatasets: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
        // this.render()
      },
      deep: true,
    },
  },
  created(){
    this.myEventHandler()
  },
  mounted() {
    this.loadPage()
    window.addEventListener('resize', this.myEventHandler)

  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
  methods: {
    ...mapActions({
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
    }),
    // Set the screen Size
    myEventHandler(e) {
     this.screenWidth = screen.width
    },
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
    render() {
      // this.renderChart({
      //   // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [0, 50.0, 150.0, 250.0, 400.0] // [40, 39, 10, 40, 39, 80, 40]
      //     }
      //   ]
      // }, {responsive: true, maintainAspectRatio: false})
    },
    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
      }
    },
    // Event handler when user select size in `view all` mode
    handleSizeSelect(sizeId) {},
    // Get min price for a given size among listing items
    getPriceBySize(sizeId) {
      return this.prices.find((i) => String(i.size_id) === String(sizeId))
        ?.price
    },
    // pricesBySize() {
    //   if (this.method === 'buy') {
    //     return this.products?.lowest_prices?.filter(
    //       (i) => i.packaging_condition_id === this.currentCondition
    //     )
    //   } else {
    //     return this.products?.highest_offers?.filter(
    //       (i) => i.packaging_condition_id === this.currentCondition
    //     )
    //   }
    // },
    handleBuyNowClick() {
      this.resetError()
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
          this.$store.dispatch('sell-now/selectedItem', res.data.data).then(() => {
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
        case '24': {
          this.lineDatasets.labels = [
            '2 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        case '7': {
          this.lineDatasets.labels = [
            '7 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        case '30': {
          this.lineDatasets.labels = [
            '3 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          // this.$set(this.lineDatasets, 0, {
          //     data: [0, 50.0, 150.0, 250.0, 900.0],
          //     label: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          // })
           this.$set(this.lineDatasets, 0,

           this.lineDatasets.labels= ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          )
          break
        }
        case '1': {
          this.lineDatasets.labels = [
            '2 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          this.$set(this.lineDatasets, 0,

          this.lineDatasets.labels= [
            '1 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ],true
          )
          break
        }
        case 'all': {
          this.lineDatasets.labels = [
            '2 pm',
            '6 pm',
            '10 pm',
            '2 am',
            '6 am',
            '10 am',
            '2 pm',
          ]
          break
        }
        default:
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
    // On filter by change.
    handleSortBySelect(value) {
      this.similarProductSearchValue = value.value
      // this.loadPage()
    },
    // On filter by change.
    searchProduct(value) {
      this.search = value
      this.loadPage()
    },
    handleBuyClick() {},
    handleSellClick() {},
    loadPage() {
      this.loading = true
      this.$axios
        .get('/products', {
          // .get('/stock-exchange/', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            search: this.search,
            sortBy: this.sortBy,
          },
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data)
            this.products = response.data.data
            this.loading = false
            // this.totalRows = response.data.total
          }
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
