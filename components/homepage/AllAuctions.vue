<template>
  <div class="section-wrapper py-5">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-2 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.all') }} <br />
          {{ $t('home_page.auctions') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.auction_desc') }}
        </h5>
      </div>
      <div class="col-2 col-md-7 d-flex justify-content-end">
        <ViewMoreBtn
          :label="$t('homepage_view_more_auctions')"
          to="/auctions"
        />
      </div>
    </div>

    <div class="my-5">
      <div class="banner">
        <h1
          class="fw-7 fs-24 font-primary text-white text-center text-uppercase mb-0"
        >
          {{ $t('home_page.auction_house') }}
        </h1>
      </div>
    </div>

    <div class="row">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="col-6 col-md-3"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from '~/components/product/Card.vue'
export default {
  name: 'AllAuctions',
  components: { ProductCard },
  fetchOnServer: false,
  data() {
    return {
      products: [],
    }
  },
  async fetch() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      this.products = await this.$axios
        .get('/products/selling', {
          params: {
            order_by: 'release_date',
            desc: 1,
            take: 10,
            category: this.currentCategory,
          },
          handleError: false,
        })
        .then((res) => res.data || [])
        .catch(() => [])
    },
  },
}
</script>
<style lang="sass" scoped>
.banner
  background-image: url('~/assets/img/home/auctions-cover.png')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 40px
  @media (max-width: 550px)
    background-image: url('~/assets/img/home/auctions-cover-sm.png')
    height: 215px
    padding: 24px
</style>
