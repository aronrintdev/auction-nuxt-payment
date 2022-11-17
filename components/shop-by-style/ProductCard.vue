<template>
  <div>
    <div class="d-none d-sm-block">
      <div class="d-flex">
        <!-- Product name, colorway and thumbnail -->
        <ProductThumb
          v-show="show !== product.id"
          :src="product.image"
          :product="product"
          :width="152"
          :height="172"
          overlay
          class="flex-shrink-0 product-image"
        />
        <div class="info-section position-relative flex-grow-1">
          <div class="title">{{ product.name }}</div>
          <div class="color mt-2">
            {{ `${$t('common.color')}: ${product.colorway}` }}
          </div>
          <div class="color mt-1">
            {{ $t('common.price') }}: {{ product.sale_price | toCurrency }}
          </div>
          <div class="position-absolute btn-add cursor-pointer">
            <Icon v-show="show !== product.id" src="transparent-plus.png" width="35" height="35" @click='showProductDetail(product.id)' />
            <Icon v-show="show === product.id" src="transparent-minus.png" width="35" height="5" @click='showProductDetail(product.id)' />
          </div>
        </div>
      </div>
      <!-- Product Detail -->
      <div v-show="show === product.id" class="info-section position-relative flex-grow-1">
        <div>
          <ShopByStyleImageCarousel :images="productImages" class="mt-4" />
          <div  class="w-100">
            <ProductSizePicker
              :sizes="sizes"
              :prices="pricesBySize"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker ml-2"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
            />
          </div>

          <ProductBoxConditionPicker
            :value="currentCondition"
            :conditions="packagingConditions"
            class="box-conditions p-0"
            @change="handleConditionChange"
          />
          <div class="accordion-filter-item bg-transparent w-100 border-0 mt-4">
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-4">
              <button
                v-b-toggle.collapse-product-detail
                aria-controls="panelsStayOpen-collapseOne"
                aria-expanded="false"
                class="p-0 accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
                data-bs-target="#panelsStayOpen-collapseOne"
                data-bs-toggle="collapse"
                type="button"
              >
              <span class="w-100 text-left">{{ $t('shop_by_style.product_details')  }}</span>
              </button>
            </h2>
            <b-collapse
              id="collapse-product-detail"
              :accordion="accordion-title"
              role="tabpanel"
              class="accordion-filter-collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-filter-body">
                <div class="tab-content mt-40 ml-2">
                  <div class="content-row w-100">
                    <div>{{ $t('common.sku') }}</div>
                    <div>{{ products.sku }}</div>
                  </div>

                  <div class="content-row w-100">
                    <div>{{ $t('common.colorway') }}</div>
                    <div>{{ products.colorway }}</div>
                  </div>

                  <div class="content-row w-100">
                    <div>{{ $t('common.retail_price') }}</div>
                    <div>{{ products.retail_price | toCurrency }}</div>
                  </div>

                  <div class="content-row w-100">
                    <div>{{ $t('common.release_date') }}</div>
                    <div>{{ products.release_year }}</div>
                  </div>
                </div>
              </div>
            </b-collapse>
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header">
              <button
                v-b-toggle.collapse-1
                aria-controls="panelsStayOpen-collapseOne"
                aria-expanded="false"
                class="p-0 accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
                data-bs-target="#panelsStayOpen-collapseOne"
                data-bs-toggle="collapse"
                type="button"
              >
              {{ $t('shop_by_style.size_guide')  }}
              </button>
            </h2>
            <b-collapse
              id="collapse-1"
              :accordion="accordion-title"
              role="tabpanel"
              class="accordion-filter-collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-filter-body">
                <ProductSizeGuideShoe
                  v-if="
                    products.size_type && SHOE_CATEGORIES.indexOf(products.size_type) > -1
                  "
                />
              </div>
            </b-collapse>
          </div>
          <div class="wrapper mt-4">
            <div
              v-if="method === 'buy' && isOutOfStock"
              class="out-of-stock-btns w-100 text-center"
            >
              <div class="warn-text mx-auto">
                {{ $t('products.error.out_of_stock') }}
              </div>

              <Button
                variant="outline-dark-blue"
                block
                black-text
                border="thick"
                class="mx-auto"
                @click="handleNotifyMeClick"
              >
                {{ $t('products.notify_me') }}
              </Button>
            </div>

            <div
              v-else-if="
                method === 'buy' &&
                sizeViewMode === 'all' &&
                !isOutOfStock
              "
              class="action-btns w-100"
            >
              <div>
                <Button
                  variant="dark"
                  block
                  border="thick"
                  :disabled="addingToCart"
                  class="mx-auto"
                  @click="handleAddToCartClick"
                >
                  <div class="d-flex justify-content-center">
                    <div>{{ $t('products.add_to_cart') }} {{ currentListingItem ? `: (`+ currentListingItem.length / 100 +`)`: '' }}</div>
                    <div
                      class="ml-1"
                      :class="
                        addingToCart ? 'add-to-cart-animation' : 'invisible'
                      "
                    >
                      +1
                    </div>
                  </div>
                </Button>
                <div class="error-text">
                  {{ error.addToCart }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <AlertModal id="message-modal" :message="message" icon="tick" />
    </div>
    <div class="d-block d-sm-none">
      <div class="d-flex">
        <!-- Product name, colorway and thumbnail -->
        <ProductThumb
          v-show="show !== product.id"
          :src="product.image"
          :product="product"
          :width="152"
          :height="172"
          overlay
          class="flex-shrink-0 product-image"
        />
        <div v-show="show === product.id" class="row">
          <div class="col-sm-6 w-50 text-center">
            <h2 class="fs-13 fw-6">{{ $t('shop_by_style.style_id') }}</h2>
            <p>{{ styleID }}</p>
          </div>
          <div class="col-sm-6 w-50 text-center">
            <h2 class="fs-13 fw-6">{{ $t('common.color') }}</h2>
            <p>{{ product.colorway }}</p>
          </div>
        </div>
        <div v-show="show !== product.id" class="info-section position-relative flex-grow-1">
          <div class="title">{{ product.name }}</div>
          <div class="color mt-2">
            {{ product.colorway }}
          </div>
          <div class="price color mt-1">
            {{ product.sale_price | toCurrency }}
          </div>
          <div class="position-absolute btn-add">
            <Icon v-show="show !== product.id" src="thick-plus.png" width="45" height="45" @click='showProductDetail(product.id)' />
            <Icon v-show="show === product.id" src="minus.svg" width="45" height="45" @click='showProductDetail(product.id)' />
          </div>
        </div>
      </div>
      <!-- Product Detail -->
      <div v-show="show === product.id" class="info-section position-relative flex-grow-1 ml-0">
        <div>
          <ShopByStyleImageCarousel :images="productImages" class="mt-4" />
          <div  class="w-100">
            <ProductSizePicker
              :sizes="sizes"
              :prices="pricesBySize"
              :value="currentSize"
              :viewMode="sizeViewMode"
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
            />
          </div>

          <ProductBoxConditionPicker
            :value="currentCondition"
            :conditions="packagingConditions"
            class="box-conditions text-center"
            @change="handleConditionChange"
          />
          <div class="accordion-filter-item bg-transparent w-100 border-0">
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0 product-detail-sheet p-3" @click="open">
              <button
                aria-controls="panelsStayOpen-collapseOne"
                aria-expanded="false"
                class="accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
                data-bs-target="#panelsStayOpen-collapseOne"
                data-bs-toggle="collapse"
                type="button"
              >
              {{ $t('shop_by_style.product_details')  }}
              </button>
            </h2>
            <vue-bottom-sheet ref="openProductDetail">
              <h2 class="fs-16 fw-7 text-center">{{ $t('shop_by_style.product_details')  }}</h2>
              <hr class="mb-0" />
              <div class="accordion-filter-body pl-3 pr-3 m-0">
                <div class="mobile-tab-content mt-40">
                  <div class="content-row pb-1">
                    <div>{{ $t('common.colorway') }}</div>
                    <div>{{ products.colorway }}</div>
                  </div>
                  <div class="content-row pb-1">
                    <div>{{ $t('common.retail_price') }}</div>
                    <div>{{ products.retail_price | toCurrency }}</div>
                  </div>
                  <div class="content-row pb-1">
                    <div>{{ $t('common.release_date') }}</div>
                    <div>{{ products.release_year }}</div>
                  </div>
                  <div class="content-row pb-1">
                    <div>{{ $t('common.sku') }}</div>
                    <div>{{ products.sku }}</div>
                  </div>
                  <div class="content-row pb-1">
                    <div>{{ $t('common.season') }}</div>
                    <div>{{ $t('common.season_detail') }}</div>
                  </div>
                  <div class="content-row pb-1">
                    <div>{{ $t('common.model') }}</div>
                    <div>{{ $t('common.model_detail') }}</div>
                  </div>
                </div>
              </div>
              <h2 class="fs-14 fw-6 text-left p-3">{{ $t('product_page.description')  }}:</h2>
              <p class="pl-3 pr-3">{{ $t('create_listing.product.description_details') }}</p>
            </vue-bottom-sheet>
            
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mt-3 product-detail-sheet p-3">
              <button
                v-b-toggle.collapse-1
                aria-controls="panelsStayOpen-collapseOne"
                aria-expanded="false"
                class="accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
                data-bs-target="#panelsStayOpen-collapseOne"
                data-bs-toggle="collapse"
                type="button"
              >
              {{ $t('shop_by_style.size_guide')  }}
              </button>
            </h2>
            <b-collapse
              id="collapse-1"
              :accordion="accordion-title"
              role="tabpanel"
              class="accordion-filter-collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-filter-body">
                <ProductSizeGuideShoe
                  v-if="
                    products.size_type && SHOE_CATEGORIES.indexOf(products.size_type) > -1
                  "
                />
              </div>
            </b-collapse>
          </div>
          <div class="wrapper mt-4">
            <div
              v-if="method === 'buy' && isOutOfStock"
              class="out-of-stock-btns w-100 text-center"
            >
              <div class="warn-text mx-auto">
                {{ $t('products.error.out_of_stock') }}
              </div>

              <Button
                variant="outline-dark-blue"
                block
                black-text
                border="thick"
                class="mx-auto"
                @click="handleNotifyMeClick"
              >
                {{ $t('products.notify_me') }}
              </Button>
            </div>

            <div
              v-else-if="
                method === 'buy' &&
                sizeViewMode === 'all' &&
                !isOutOfStock
              "
              class="action-btns w-100"
            >
              <div>
                <Button
                  variant="dark"
                  block
                  border="thick"
                  :disabled="addingToCart"
                  class="mx-auto"
                  @click="handleAddToCartClick"
                >
                  <div class="d-flex justify-content-center">
                    <div>{{ $t('products.add_to_cart') }} {{ currentListingItem ? `: (`+ currentListingItem.length / 100 +`)`: '' }}</div>
                    <div
                      class="ml-1"
                      :class="
                        addingToCart ? 'add-to-cart-animation' : 'invisible'
                      "
                    >
                      +1
                    </div>
                  </div>
                </Button>
                <div class="error-text">
                  {{ error.addToCart }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-between pr-3 pl-3" v-show="show === product.id">
        <h2 class="fs-16 fw-6">{{ $t('shop_by_style.more_look') }}</h2>
        <p class="fs-14 fw-5 text-gray cursor-pointer" @click='showProductDetail(product.id)'>{{ $t('shop_by_style.view_all') }}</p>
      </div>
      <AlertModal id="message-modal" :message="message" icon="tick" />
    </div>
    
  </div>
</template>
<script>
import _ from 'lodash'
import { Icon, Button } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import ProductSizePicker from '~/components/product/SizePicker'
import ProductBoxConditionPicker from '~/components/shop-by-style/BoxConditionPicker'
import ProductSizeGuideShoe from '~/components/product/size-guide/Shoe'
import AlertModal from '~/components/modal/Alert'

export default {
  name: 'ShopByStyleProductCard',

  components: {
    ProductThumb,
    Icon,
    ShopByStyleImageCarousel,
    ProductSizePicker,
    ProductBoxConditionPicker,
    ProductSizeGuideShoe,
    Button,
    AlertModal
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    styleID: {
      type: Number,
      required: false,
    }
  },

  data() {
    return {
      productImages: [
        this.product.image
      ],
      products: {},
      method: 'buy',
      error: {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
      },
      sizeViewMode: 'all',
      addingToCart: false,
      currentSize: null,
      currentCondition: null,
      currentListingItem: null,
      loading: true,
      SHOE_CATEGORIES: [
        'men',
        'women',
        'child',
        'infant',
        'preschool',
        'toddler',
        'unisex',
        'youth',
      ],
      message: null,
      MODAL_FADE_TIMEOUT: 2000,
      show: null
    }
  },
  async fetch() {
    this.products = await this.$axios
      .get('/products/'+this.product.sku+'/details')
      .then((res) => res.data)
    if (this.products) {
      const lowestPrice = _.minBy(this.products.lowest_prices, 'price')
      if (lowestPrice) {
        this.currentSize = lowestPrice.size_id
        this.currentCondition = lowestPrice.packaging_condition_id
        await this.findListingItem() // 'add to chart' button needs listing of item
      } else {
        this.currentCondition = this.products.packaging_conditions[0]?.id
      }
    }
  },

  computed: {
    category() {
      return this.products?.category?.name
    },

    sku() {
      return this.products?.sku
    },

    lowestPrice() {
      return this.products?.lowest_prices?.find(
        (i) =>
          i.size_id === this.currentSize &&
          i.packaging_condition_id === this.currentCondition
      )?.price
    },

    highestOffer() {
      return this.products?.highest_offers?.find(
        (i) =>
          i.size_id === this.currentSize &&
          i.packaging_condition_id === this.currentCondition
      )?.price
    },

    sizes() {
      return this.products?.sizes || []
    },

    packagingConditions() {
      return this.products?.packaging_conditions || []
    },

    isOutOfStock() {
      return this.currentSize && !this.currentListingItem
    },

    pricesBySize() {
        if (this.method === 'buy') {
          return this.products?.lowest_prices?.filter(
            (i) => i.packaging_condition_id === this.currentCondition
          )
        } else {
          return this.products?.highest_offers?.filter(
            (i) => i.packaging_condition_id === this.currentCondition
          )
        }

    },

    wishList() {
      return this.products.wish_lists && this.products.wish_lists.length > 0
        ? this.products.wish_lists[0]
        : null
    },
  },

  methods: {
    open() {
      this.$refs.openProductDetail.open()
    },
    showProductDetail(id) {
      if(this.show === id) {
        this.show = 'false'
      } else {
        this.show = id
        this.$emit('styleProduct', id)
      }
    },
    resetError() {
      this.error = {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
      }
    },
    async findListingItem() {
      if (!this.currentSize || !this.currentCondition) return
      const params = {
        size_id: this.currentSize,
        packaging_condition_id: this.currentCondition,
      }
      this.currentListingItem = await this.$axios
        .get(`/products/${this.products.id}/selling-item`, {
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
        this.products.lowest_prices = this.products.lowest_prices.map((i) => {
          if (
            i.size_id === this.currentSize &&
            i.packaging_condition_id === this.currentCondition
          ) {
            i.price = this.currentListingItem.inventory.sale_price
          }
          return i
        })
      }
    },
    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
        this.resetError()
        this.findListingItem()
      }
    },

    handleConditionChange(condition) {
      if (condition?.id !== this.currentCondition) {
        this.currentCondition = condition.id
        this.findListingItem()
      }
    },
    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },
    handleNotifyMeClick() {
    this.$axios
      .post(`/products/${this.products.id}/requests`, {
        size_id: this.currentSize,
        packaging_condition_id: this.currentCondition,
      })
      .then(() => {
        this.showMessageModal(this.$t('products.message.send_item_email'))
      })
    },

    showMessageModal(message, callback = () => {}) {
      this.message = message
      this.$bvModal.show('message-modal')
      setTimeout(() => {
        this.$bvModal.hide('message-modal')
        callback()
      }, this.MODAL_FADE_TIMEOUT)
    },

    getCartProduct() {
      return {
        id: this.product.id,
        name: this.product.name,
        brand: this.product.brand,
        sku: this.product.sku,
        colorWay: this.product.colorway,
        size: this.sizes[this.currentSize - 1],
        quantity: 1,
        price: this.currentListingItem?.inventory?.sale_price,
        image: `${this.API_PROD_URL}/${this.category}/${this.sku}/image`,
        listing_item_id: this.currentListingItem?.id,
      }
    },

    handleAddToCartClick() {
      this.resetError()
      if (!this.currentSize) {
        return (this.error.addToCart = this.$t('products.error.select_size'))
      }

      this.addingToCart = true
      this.$store.dispatch('shopping-cart/addProduct', this.getCartProduct())
      this.showMessageModal(
        this.$t('products.message.added_to_cart', {
          productName: this.products.name,
        }),
        () => (this.addingToCart = true)
      )
    },
  }
}
</script>
<style lang="sass" scoped>
.product-image
  width: 152px
  height: 172px
.product-detail-sheet
  background: #FFFFFF
  box-shadow: 0px -0.1px 2px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.25)
  border-radius: 8px
</style>
