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
          <div class="position-absolute btn-add">
            <Icon v-show="show !== product.id" src="plus.svg" width="45" height="45" @click='showProductDetail(product.id)' />
            <Icon v-show="show === product.id" src="minus.svg" width="45" height="45" @click='showProductDetail(product.id)' />
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
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
            />
          </div>

          <ProductBoxConditionPicker
            :value="currentCondition"
            :conditions="packagingConditions"
            class="box-conditions"
            @change="handleConditionChange"
          />
          <div class="accordion-filter-item bg-transparent w-100 border-0">
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0">
              <button
                v-b-toggle.collapse-product-detail
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
            <b-collapse
              id="collapse-product-detail"
              :accordion="accordion-title"
              role="tabpanel"
              class="accordion-filter-collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-filter-body">
                <div class="tab-content mt-40">
                  <div class="content-row">
                    <div>{{ $t('common.sku') }}</div>
                    <div>{{ products.sku }}</div>
                  </div>

                  <div class="content-row">
                    <div>{{ $t('common.colorway') }}</div>
                    <div>{{ products.colorway }}</div>
                  </div>

                  <div class="content-row">
                    <div>{{ $t('common.retail_price') }}</div>
                    <div>{{ products.retail_price | toCurrency }}</div>
                  </div>

                  <div class="content-row">
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
          <div class="wrapper">
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
                  variant="warning"
                  block
                  border="thick"
                  :disabled="addingToCart"
                  class="mx-auto"
                  @click="handleAddToCartClick"
                >
                  <div class="d-flex justify-content-center">
                    <div>{{ $t('products.add_to_bag') }}: ${{ currentListingItem ? currentListingItem.inventory.sale_price / 100 : 0 }}</div>
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
        <div class="info-section position-relative flex-grow-1">
          <div class="title">{{ product.name }}</div>
          <div class="color mt-2">
            {{ product.colorway }}
          </div>
          <div class="color mt-1">
            {{ product.sale_price | toCurrency }}
          </div>
          <div class="position-absolute btn-add">
            <Icon v-show="show !== product.id" src="plus.svg" width="45" height="45" @click='showProductDetail(product.id)' />
            <Icon v-show="show === product.id" src="minus.svg" width="45" height="45" @click='showProductDetail(product.id)' />
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
              class="size-picker"
              @update="handleSizeChange"
              @changeViewMode="handleSizeViewModeChange"
            />
          </div>

          <ProductBoxConditionPicker
            :value="currentCondition"
            :conditions="packagingConditions"
            class="box-conditions"
            @change="handleConditionChange"
          />
          <div class="accordion-filter-item bg-transparent w-100 border-0">
            <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header mb-0">
              <button
                v-b-toggle.collapse-product-detail
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
            <b-collapse
              id="collapse-product-detail"
              :accordion="accordion-title"
              role="tabpanel"
              class="accordion-filter-collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-filter-body">
                <div class="tab-content mt-40">
                  <div class="content-row">
                    <div>{{ $t('common.sku') }}</div>
                    <div>{{ products.sku }}</div>
                  </div>

                  <div class="content-row">
                    <div>{{ $t('common.colorway') }}</div>
                    <div>{{ products.colorway }}</div>
                  </div>

                  <div class="content-row">
                    <div>{{ $t('common.retail_price') }}</div>
                    <div>{{ products.retail_price | toCurrency }}</div>
                  </div>

                  <div class="content-row">
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
          <div class="wrapper">
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
                  variant="warning"
                  block
                  border="thick"
                  :disabled="addingToCart"
                  class="mx-auto"
                  @click="handleAddToCartClick"
                >
                  <div class="d-flex justify-content-center">
                    <div>{{ $t('products.add_to_bag') }}: ${{ currentListingItem ? currentListingItem.inventory.sale_price / 100 : 0 }}</div>
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
    
  </div>
</template>
<script>
import _ from 'lodash'
import { Icon, Button } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import ProductSizePicker from '~/components/product/SizePicker'
import ProductBoxConditionPicker from '~/components/product/BoxConditionPicker'
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
    showProductDetail(id) {
      if(this.show === id) {
        this.show = 'false'
      } else {
        this.show = id
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
</style>
