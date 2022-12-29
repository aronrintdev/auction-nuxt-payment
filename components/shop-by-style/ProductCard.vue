<template>
  <div>
    <div class="d-flex">
      <!-- Product name, colorway and thumbnail -->
      <ProductThumb
        v-show="show !== product.id"
        :src="product.image"
        :product="product"
        :width="152"
        :height="172"
        class="flex-shrink-0 product-image"
      />
      <div class="info-section position-relative flex-grow-1">
        <div class="position-relative">
          <div class="title fw-6 fs-20 font-secondary text-capitalize">
            {{ product.name }}
          </div>
          <div
            class="position-absolute addBtn cursor-pointer"
            @click="showProductDetail(product.id)"
          >
            <PlusIcon :active="show === product.id" />
          </div>
        </div>
        <div class="color mt-2 fw-5 font-secondary fs-15">
          {{ `${$t('shopping_cart.color_way')}: ${product.colorway}` }}
        </div>
        <div
          v-if="pricesBySize ? pricesBySize.length > 0 : false"
          v-show="show !== product.id"
          class="color mt-2 fw-5 font-secondary fs-15"
        >
          {{ $t('products.lowest_price') }}: {{ lowestPrice | toCurrency }}
        </div>
      </div>
    </div>
    <!-- Product Detail -->
    <div
      v-show="show === product.id"
      class="info-section position-relative flex-grow-1"
    >
      <div>
        <ShopByStyleImageCarousel :images="productImages" />
        <div class="w-100">
          <ProductSizePicker
            :sizes="sizes"
            :prices="pricesBySize"
            :value="currentSize"
            :viewMode="sizeViewMode"
            :arrowsVisible="true"
            class="size-picker"
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
          <h2 id="panelsStayO pen-headingOne" class="accordion-filter-header">
            <button
              v-b-toggle="`collapse-product-detail${product.id}`"
              aria-controls="panelsStayOpen-collapseOne"
              aria-expanded="false"
              class="p-0 accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
              data-bs-target="#panelsStayOpen-collapseOne"
              data-bs-toggle="collapse"
              type="button"
            >
              <span class="w-100 text-left fs-18 font-secondary fw-7">{{
                $t('shop_by_style.product_details')
              }}</span>
            </button>
          </h2>
          <b-collapse
            :id="`collapse-product-detail${product.id}`"
            :accordion="`product-detail${product.id}`"
            role="tabpanel"
            class="accordion-filter-collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-filter-body mt-0">
              <div class="tab-content mt-40">
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
          <h2
            id="panelsStayO pen-headingOne"
            class="mt-4 accordion-filter-header"
          >
            <button
              v-b-toggle="`size-guide-collapse${product.id}`"
              aria-controls="panelsStayOpen-collapseOne"
              aria-expanded="false"
              class="p-0 accordion-filter-button collapsed position-relative d-flex align-items-center w-100 pa-0 border-0"
              data-bs-target="#panelsStayOpen-collapseOne"
              data-bs-toggle="collapse"
              type="button"
            >
              <span class="fs-18 font-secondary fw-7">
                {{ $t('shop_by_style.size_guide') }}
              </span>
            </button>
          </h2>
          <b-collapse
            :id="`size-guide-collapse${product.id}`"
            :accordion="`size-guide-collapse${product.id}`"
            role="tabpanel"
            class="accordion-filter-collapse"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-filter-body sf-pro-text">
              <ProductSizeGuideShoe
                v-if="
                  products.size_type &&
                  SHOE_CATEGORIES.indexOf(products.size_type) > -1
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
            <div class="warn-text mx-auto mb-13">
              {{ $t('products.error.out_of_stock') }}
            </div>

            <Button
              variant="outline-dark-blue"
              black-text
              border="thick"
              class="mx-auto warn-button"
              @click="handleNotifyMeClick"
            >
              {{ $t('products.notify_me') }}
            </Button>
          </div>

          <div
            v-else-if="method === 'buy' && !isOutOfStock"
            class="action-btns w-100"
          >
            <div>
              <p
                v-if="currentListingItem"
                class="text-center lowest-price mb-13"
              >
                <span class="total-price">{{
                  currentListingItem.inventory.sale_price | toCurrency
                }}</span>
                {{ $t('shop_by_style.4_installments') }}
                <span class="partial-price"
                  >of
                  {{
                    (currentListingItem.inventory.sale_price / 4) | toCurrency
                  }}</span
                >
              </p>
              <p v-else class="text-center lowest-price mb-13">
                <span class="total-price">{{ $t('common.$0') }}</span>
                {{ $t('shop_by_style.4_installments') }}
                <span class="partial-price"
                  >{{ $t('common.of') }} {{ $t('common.$0') }}</span
                >
              </p>
              <div class="d-flex align-items-center justify-content-center">
                <Button
                  variant="dark"
                  border="thick"
                  :disabled="addingToCart"
                  class="mx-auto add-to-cart-button"
                  @click="handleAddToCartClick('web', product.id)"
                >
                  <div class="d-flex justify-content-center">
                    <div>
                      {{ $t('product_page.add_to_cart') }}
                    </div>
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
                <button
                  :id="`popover-wishlist-${product.id}`"
                  class="addToWishlistBtn d-flex align-items-center justify-content-center border-0"
                  :alt-text="wishList ? wishList.name : ''"
                  :active="wishListShow || !!wishList"
                  @click="removeFromWishList"
                >
                  <HeartIcon
                    class="heart-icon cursor-pointer"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div class="error-text">
                {{ error.addToCart }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AlertModal
      :id="`message-modal-web-${product.id}`"
      :message="message"
      icon="tick"
    />
    <WishListPopover
      v-if="!wishList"
      :product="product"
      :wish-list="wishList"
      :target="`popover-wishlist-${product.id}`"
      @show="wishListShow = true"
      @hidden="wishListShow = false"
      @wishlisted="onWishListed"
    />
  </div>
</template>
<script>
import _ from 'lodash'
import { Button } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import ProductSizePicker from '~/components/shop-by-style/SizePicker'
import ProductBoxConditionPicker from '~/components/shop-by-style/BoxConditionPicker'
import ProductSizeGuideShoe from '~/components/shop-by-style/size-guide/Shoe'
import AlertModal from '~/components/modal/Alert'
import PlusIcon from '~/assets/icons/Plus'
import HeartIcon from '~/assets/icons/HeartIcon'
import WishListPopover from '~/components/wish-list/Popover.vue'
export default {
  name: 'ShopByStyleProductCard',
  components: {
    ProductThumb,
    ShopByStyleImageCarousel,
    ProductSizePicker,
    ProductBoxConditionPicker,
    ProductSizeGuideShoe,
    Button,
    AlertModal,
    PlusIcon,
    HeartIcon,
    WishListPopover,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    styleID: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      wishListShow: true,
      productImages: [this.product.image],
      products: {},
      method: 'buy',
      error: {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
      },
      sizeViewMode: 'carousel',
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
      show: null,
    }
  },
  async fetch() {
    this.products = await this.$axios
      .get('/products/' + this.product.sku + '/details')
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
    removeFromWishList() {
      if (this.wishList) {
        this.removeProductsFromWishList({
          wishList: this.wishList,
          ids: [this.product.id],
        })
        this.wishList = null
        this.$emit('unwishlisted', this.product)
      }
    },
    onWishListed(wishList) {
      if (wishList) {
        this.$set(this, 'wishList', wishList)
        this.wishListShow = false
        this.$emit('wishlisted', this.product, wishList)
      }
    },
    open() {
      this.$refs.openProductDetail.open()
    },
    showProductDetail(id) {
      if (this.show === id) {
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

    handleAddToCartClick(device = 'web', id = 0) {
      this.resetError()
      if (!this.currentSize) {
        return (this.error.addToCart = this.$t('products.error.select_size'))
      }
      this.addingToCart = true
      this.$store.dispatch('shopping-cart/addProduct', this.getCartProduct())
      this.show = false
      if (device !== 'mobile') {
        this.message = this.$t('products.message.added_to_cart', {
          productName: this.products.name,
        })
        this.$bvModal.show('message-modal-' + id)
      } else {
        this.message = this.$t('products.message.added_to_cart', {
          productName: this.products.name,
        })
        this.$bvModal.show('message-modal-web-' + id)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.info-section
  .title
    max-width: calc(100% - 20px)
.addBtn
  right: 0
  bottom: 0
.sf-pro-text
  font-family: $font-family-sf-pro-text
.mt-40
  margin-top: 13px
.product-image
  width: 152px
  height: 172px
  margin-right: 28px
.product-detail-sheet
  background: #FFFFFF
  box-shadow: 0px -0.1px 2px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.25)
  border-radius: 8px
.lowest-price
  font-family: $font-montserrat
  font-weight: $medium
  font-size: 15px
  color: $color-orange-11
  letter-spacing: 0.02em
  line-height: 18px
  .total-price
    color: $color-grey-101
    line-height: 21px
    font-size: 17px
  .partial-price
    font-weight: $regular
.mb-13
  margin-bottom: 13px
.add-to-cart-button
  height: 46px
  width: 100%
  border-radius: 4px 0 0 4px
.warn-button
  height: 46px
  width: 473px
.addToWishlistBtn
  min-width: 49px
  height: 46px
  background: $color-gray-75
  border-radius: 0 4px 4px 0
  .heart-icon
    width: 21px
    height: 21px
</style>
