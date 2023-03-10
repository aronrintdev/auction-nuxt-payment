<template>
  <b-container fluid class="container-wishlists">
    <div
      v-if="listProducts.length === 0"
      class="section-no-list text-center py-5"
    >
      <p class="mb-3">
        {{ $t('wish_lists.no_wish_lists') }}
      </p>

      <Button variant="dark-blue" class="mx-auto" pill>
        {{ $t('wish_lists.create_new_list') }}
      </Button>
    </div>
    <div v-else class="wishlist-mobile">
      <div v-for="(product, index) in listProducts" :key="index" class="mb-4">
        <div class="d-flex">
          <div class="thumb-wrapper">
            <Thumb :src="product.image" />
          </div>
          <div class="w-100 d-flex flex-column justify-content-between ml-3">
            <div>
              <h4 class="fs-14 fw-6 font-secondary wishlist-product-name-mobile mb-1">
                {{ product.name }}
              </h4>
              <h6 class="fs-12 fw-5 text-gray-5 font-secondary wishlist-product-colorway-mobile text-capitalize">
                {{ product.colorway }}
              </h6>
              <h6 class="fs-12 fw-5 text-gray-5 font-secondary wishlist-product-price-mobile text-capitalize">
                ${{ product.retail_price }}
              </h6>
            </div>
            <button
              class="btn w-100 rounded-pill fs-13 fw-6 font-primary mb-4 text-base-blue add-to-bag"
            >
              {{ $t('products.add_to_cart') }}
            </button>
          </div>
        </div>
        <div>
          <button
            class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3"
          >
            {{ $t('shopping_cart.remove') }}
          </button>
          <button
            class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3 ml-4"
          >
            {{ $t('wish_lists.move') }}
          </button>
        </div>
      </div>
    </div>

    <Portal to="back-icon-slot">
      <nuxt-link to="/profile/wish-lists">
        <img src="~/assets/img/icons/back.svg" />
      </nuxt-link> </Portal
    ><Portal to="page-title">
      {{ currentWishList ? currentWishList.name : 'Wishlist' }}
    </Portal>
    <Portal to="notification-icon-slot">
      <div :id="`popover-share-wishlist`">
        <ShareIcon class="share-icon" />
      </div>
      <b-popover
        ref="sharePopover"
        :target="`popover-share-wishlist`"
        triggers="click"
        placement="bottom"
        container="body"
        custom-class="wishlist-popover"
        delay="200"
        @show="shareShow = true"
        @hidden="shareShow = false"
      >
        <ShareButton
          :url="`${shareUrl}${currentWishList ? currentWishList.id : ''}`"
          :title="currentWishList ? currentWishList.name : ''"
          :description="shareDescription"
        />
      </b-popover>
    </Portal>
    <div class="border-top my-2 divider"></div>
    <div class="inspirtaion-list">
      <h1 class="fs-16 fw-6 font-primary my-3">
        {{ $t('wish_lists.inspired_by_you') }}
      </h1>
      <ProductCarousel class="mt-4 mb-5" :products="products" :show-share-btns="false" :showActions="false" loop />
    </div>
    <CreateWishListModal />
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import Thumb from '~/components/product/Thumb'
import CreateWishListModal from '~/components/modal/CreateWishList'
import ShareIcon from '~/assets/icons/ShareIcon'
import ShareButton from '~/components/common/ShareButton.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'WishListsId',
  components: { Thumb, CreateWishListModal, ShareIcon, ShareButton, Button },
  layout: 'IndexLayout',
  data() {
    return {
      category: 'all',
      CATEGORIES: [
        {
          label: this.$t('wish_lists.categories.all'),
          value: 'all',
        },
        {
          label: this.$t('wish_lists.categories.footwear'),
          value: 'sneakers',
        },
        {
          label: this.$t('wish_lists.categories.apparel'),
          value: 'apparel',
        },
        {
          label: this.$t('wish_lists.categories.accessories'),
          value: 'accessories',
        },
      ],
      currentWishList: null,
      listProducts: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
      shareDescription: this.$t('wish_lists.share_description'),
      shareUrl: process.env.APP_URL + '/wish-lists/',
      // todo
      products: [
        {
          id: 1,
          sku: 'CZ0328-400',
          brand: 'Nike',
          name: 'Nike LeBron 8 South Beach (2021)',
          colorway: 'Retro/Pink Flash-Filament Green-Black',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-21',
          retail_price: 20000,
          estimated_market_value: 252,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60556a245d104527f351af92',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 27004,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 2,
          sku: 'DJ7998-100',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Hare Space Jam',
          colorway: 'White/Light Blue Fury-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 12000,
          estimated_market_value: 185,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          _id: '60c9ea8eb842f35756e39442',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 23547,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 3,
          sku: 'CV7562-401',
          brand: 'Nike',
          name: 'Nike Lebron 18 Low Wile E. vs Roadrunner Space Jam',
          colorway: 'Racer Blue/Baltic Blue-University Gold-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 16000,
          estimated_market_value: 223,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/CV7562-401/800xAUTO/IMG01.jpg',
          _id: '60e59a7fea2d5e0f0a00c97a',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 26129,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
      ],
    }
  },

  async fetch() {
    this.loading = true
    if (this.$route.params?.id) {
      this.currentWishList = await this.findWishList({
        id: this.$route.params.id,
      })
    }
    if (this.currentWishList) {
      await this.getWishListItems()
    }
    this.loading = false
  },

  computed: {
    isMyWishList() {
      return this.$store.state?.auth?.user?.id === this.currentWishList.user_id
    },
  },

  methods: {
    ...mapActions({
      findWishList: 'wish-list/findWishList',
      fetchWishListItems: 'wish-list/fetchWishListItems',
    }),

    async getWishListItems() {
      this.loading = true
      const res = await this.fetchWishListItems({
        wishList: this.currentWishList,
        page: this.currentPage,
        perPage: this.perPage,
        category: this.category !== 'all' ? this.category : null,
      })
      this.perPage = parseInt(res.per_page)
      this.totalCount = res.total
      this.listProducts = res.data
      this.loading = false
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.thumb-wrapper
  width: 164px
  background-color: $color-white-4
.add-to-bag
  border: 1px solid $color-blue-20
.divider
  margin: 0 -16px
  border-color: $color-gray-47  !important
::v-deep .share-icon
  .strokeColor
    stroke: $color-gray-47
  .fillColor
    fill: $color-gray-47
.wishlist-product-name-mobile
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: $medium
  @include body-10
.wishlist-product-colorway-mobile
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: $normal
  @include body-10
.wishlist-product-price-mobile
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: $medium
  color: $color-black-1
  @include body-9
</style>
