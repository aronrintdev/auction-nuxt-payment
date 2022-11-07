<template>
  <b-container fluid class="container-watchlists">
    <div class="watchlist-mobile">
      <div v-for="(product, index) in listProducts" :key="index" class="mb-4">
        <div class="d-flex">
          <div class="thumb-wrapper">
            <Thumb :src="product.image" />
          </div>
          <div class="w-100 d-flex flex-column justify-content-between ml-3">
            <div>
              <h4 class="fs-14 fw-6 font-secondary mb-1">
                {{ product.name }}
              </h4>
              <h6 class="fs-12 fw-5 text-gray-5 font-secondary text-capitalize">
                {{ product.colorway }}
              </h6>
              <h6 class="fs-12 fw-5 text-gray-5 font-secondary text-capitalize">
                ${{ product.retail_price }}
              </h6>
            </div>
            <button
              class="btn w-100 rounded-pill fs-13 fw-6 font-primary mb-4 text-base-blue add-to-bag"
            >
              Add to Bag
            </button>
          </div>
        </div>
        <div>
          <button
            class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3"
          >
            Remove
          </button>
          <button
            class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3 ml-4"
          >
            Move
          </button>
        </div>
      </div>
    </div>

    <Portal to="back-icon-slot">
      <nuxt-link to="/profile/watchlist">
        <img src="~/assets/img/icons/back.svg" />
      </nuxt-link> </Portal
    ><Portal to="page-title">
      {{ currentWatchList ? currentWatchList.name : 'Watchlist' }}
    </Portal>
    <Portal to="notification-icon-slot">
      <div :id="`popover-share-watchlist`">
        <ShareIcon class="share-icon" />
      </div>
      <b-popover
        ref="sharePopover"
        :target="`popover-share-watchlist`"
        triggers="click"
        placement="bottom"
        container="body"
        custom-class="watchlist-popover"
        delay="200"
        @show="shareShow = true"
        @hidden="shareShow = false"
      >
        <ShareButton
          :url="`${shareUrl}${currentWatchList ? currentWatchList.id : ''}`"
          :title="currentWatchList ? currentWatchList.name : ''"
          :description="shareDescription"
        />
      </b-popover>
    </Portal>
    <div class="border-top my-2 divider"></div>
    <div class="inspirtaion-list">
      <h1 class="fs-16 fw-6 font-primary my-3">Inspired By Your List</h1>
      <ProductCarousel class="mt-4 mb-5" :products="products" loop />
    </div>
    <CreateWatchListModal />
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import Thumb from '~/components/product/Thumb'
import CreateWatchListModal from '~/components/modal/CreateWatchList'
import ShareIcon from '~/assets/icons/ShareIcon'
import ShareButton from '~/components/common/ShareButton.vue'
export default {
  name: 'WatchListsId',
  components: { Thumb, CreateWatchListModal, ShareIcon, ShareButton },
  layout: 'IndexLayout',
  data() {
    return {
      category: 'all',
      CATEGORIES: [
        {
          label: this.$t('watch_lists.categories.all'),
          value: 'all',
        },
        {
          label: this.$t('watch_lists.categories.footwear'),
          value: 'sneakers',
        },
        {
          label: this.$t('watch_lists.categories.apparel'),
          value: 'apparel',
        },
        {
          label: this.$t('watch_lists.categories.accessories'),
          value: 'accessories',
        },
      ],
      currentWatchList: null,
      listProducts: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
      shareDescription: this.$t('watchlists.share_description'),
      shareUrl: process.env.APP_URL + '/watch-lists/',
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
      this.currentWatchList = await this.findWatchList({
        id: this.$route.params.id,
      })
    }
    if (this.currentWatchList) {
      await this.getWatchListItems()
    }
    this.loading = false
  },

  computed: {
    isMyWatchList() {
      return this.$store.state?.auth?.user?.id === this.currentWatchList.user_id
    },
  },

  methods: {
    ...mapActions({
      findWatchList: 'watch-list/findWatchList',
      fetchWatchListItems: 'watch-list/fetchWatchListItems',
    }),

    async getWatchListItems() {
      this.loading = true
      const res = await this.fetchWatchListItems({
        watchList: this.currentWatchList,
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
</style>
