<template>  
  <div class="container-shop pb-5">
    <section class="section-filters">
      <div class="d-none d-sm-block container">
        <h1 class="fs-48 fw-7 font-adobe-garamond my-4">{{$t('shop.browse_shop')}}</h1>
        <ShopFilters ref="filterSidebar" @apply="research" />
        <article class="pt-5">
          <div class="row">
            <div
              v-for="(product, index) in products"
              :key="`product-carousel-${index}`"
              class="item col-3"
            >
              <ProductCard :product="product">
                <template v-if="pageType === 'instant-shipping'" #badge>
                  <Badge
                    :title="$t('home_page.instant')"
                    :icon="require('~/assets/img/home/instant.svg')"
                    color="black"
                    right
                  />
                </template>
              </ProductCard>
            </div>
          </div>
          <infinite-loading :identifier="infiniteId" @infinite="handleLoading"></infinite-loading>
          <!-- <div v-if="products.length !== 0" class="below text-center pb-20">
            <div class="text-center"><img src="~/assets/img/loading.gif" width="100" /></div>
          </div> -->
          <div v-if="products.length == 0" class="no-text py-5 text-center">
            {{ $t('message.no_products_found') }}
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShopFilters from '~/components/shop/ShopFilters.vue'
import Badge from '~/components/product/Badge'

export default {
  components: {
    ShopFilters,
    Badge
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      currentPage: 1,
      maxPerPage: 12,
      totalResults: 0,
      showloader: true,
      products: [],
      pageType: '',
      state: '',
      url: '',
      infiniteId: +new Date()
    };
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedPrices',
      'selectedYears',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
      'selectedSearch',
      'selectedSort',
      'selectedOrdering'
    ]),
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage)
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage
    },
    
  },
  mounted() {
    this.pageType = this.$route.query.type
    if(this.pageType === 'recent'){
      this.url = '/products/shop'
    }else if (this.pageType === 'new-release'){
      this.url = '/products/shop'
    }else if (this.pageType === 'trending'){
      this.url = '/products/shop/trending'
    }else if(this.pageType === 'instant-shipping'){
      this.url = '/products/shop/instant-shipping'
    }
    // this.fetchProducts();
  },
  methods: {
    ...mapActions('browse', ['fetchFilters']),
    handleLoading($state) {
      this.state = $state
      this.fetchProducts();
    },
    research(){
      this.totalResults = 0
      this.currentPage = 1;
      this.products = []
      this.fetchProducts();
    },
    fetchProducts() {
      this.loading = false
      const filters = {}
      if (this.search) {
        filters.search = this.search
      }
      if (this.category) {
        filters.category = this.category !== 'all' ? this.category :  '';
      }
      if (this.selectedPrices) {
        filters.prices = this.selectedPrices.join('-')
      }
      if (this.selectedBrands) {
        filters.brands = this.selectedBrands.join(',')
      }
      if (this.selectedSizes) {
        filters.sizes = this.selectedSizes.join(',')
      }
      if (this.selectedSizeTypes) {
        filters.size_types = this.selectedSizeTypes
      }
      if (this.selectedYears) {
        filters.years = this.selectedYears.join('-')
      }
      if(this.selectedSearch){
        filters.search = this.selectedSearch
      }
      filters.desc = this.selectedOrdering

      filters.take = this.maxPerPage
      filters.page = this.currentPage

      if(this.pageType === 'recent'){
        this.getRecentProducts(filters)
      }else if (this.pageType === 'new-release'){
        this.getNewRelease(filters)
      }else if (this.pageType === 'trending'){
        this.getTrending(filters)
      }else if(this.pageType === 'instant-shipping'){
        this.getInstantShip(filters)
      }
    },
    getRecentProducts(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.order_by = 'views'
      }
      this.loadData(filters)
    },
    getNewRelease(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.order_by = 'created_at'
      }
      this.loadData(filters)
    },
    getTrending(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.loadData(filters)
    },
    getInstantShip(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.loadData(filters)
    },
    loadData(filters){
      this.$axios
        .get(this.url, {
          params: filters
        })
        .then((res) => {
          const that = this
          if (!res.data.next_page_url) {
            this.state.complete()
          }else{
            this.currentPage += 1;
            this.url = res.data.next_page_url
          }
          if (res.data.current_page === 1) {
            this.products = [...res.data.data]
          } else {
            this.products = [...that.products, ...res.data.data]
          }
          this.state.loaded()
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.article
  margin: 0 auto
  width: 400px
  .section
    width: 400px
    margin-bottom: 20px
    border-radius: 10px
    overflow: hidden
    .p
      margin: 0
      padding: 10px 20px 
.below
  position: relative
  height: 200px
  #scroll-trigger
    height: 50px
@keyframes animate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)
</style>
