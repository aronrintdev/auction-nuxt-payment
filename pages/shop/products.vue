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
          <div class="below text-center pb-20">
            <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
            <div class="text-center"><img src="~/assets/img/loading.gif" width="200" /></div>
          </div>
          <div v-if="products.length == 0" class="no-text py-5 text-center">
            {{ $t('message.no_products_found') }}
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex'
import VueLoadmore from 'vuejs-loadmore';
import ShopFilters from '~/components/shop/ShopFilters.vue'
import Badge from '~/components/product/Badge'

Vue.use(VueLoadmore);
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
      pageType: ''
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
    this.scrollTrigger();
    this.fetchProducts();
  },
  methods: {
    ...mapActions('browse', ['fetchFilters']),
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.currentPage < this.pageCount) {
            this.showloader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.fetchProducts()
            }, 1000) // ajax call here;
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
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
      this.$axios
        .get('/products/shop', {
          params: filters
        })
        .then((res) => {
          const that = this
          res.data.data.forEach(function (row) {
            console.log(row)
            that.products.push(row)
          });
          
          this.totalResults = res.data.total
          this.showloader = false;
        })
        .finally(() => {
          this.loading = false
        })
    },
    getNewRelease(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.order_by = 'created_at'
      }
      this.$axios
        .get('/products/shop', {
          params: filters
        })
        .then((res) => {
          const that = this
          res.data.data.forEach(function (row) {
            console.log(row)
            that.products.push(row)
          });
          this.totalResults = res.data.total
          this.showloader = false;
        })
        .finally(() => {
          this.loading = false
        })
    },
    getTrending(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/trending', {
          params: filters
        })
        .then((res) => {
          const that = this
          res.data.data.forEach(function (row) {
            console.log(row)
            that.products.push(row)
          });
          this.totalResults = res.data.total
          this.showloader = false;
        })
        .finally(() => {
          this.loading = false
        })
    },
    getInstantShip(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/instant-shipping', {
          params: filters
        })
        .then((res) => {
          const that = this
          res.data.data.forEach(function (row) {
            console.log(row)
            that.products.push(row)
          });
          this.totalResults = res.data.total
          this.showloader = false;
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
  width: 400px
  height: 100px
  #scroll-trigger
    height: 50px
@keyframes animate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)
</style>
