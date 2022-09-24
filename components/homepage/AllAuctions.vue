<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.all_auctions')"
      :desc="$t('home_page.auction_desc')"
      :label="$t('home_page.view_more_auctions')"
      to="/auctions"
    />

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
        <ProductCard :product="product">
          <template #badge>
            <div class="d-flex">
              <div class="bg-red px-2 py-1 fs-14 fw-6 font-primary">
                <img src="~/assets/img/home/clock.svg" />
                {{ $t('home_page.instant') }}
              </div>
            </div>
          </template>
          <template #action>
            <b-button variant="dark" class="fs-15 fw-5 font-secondary">{{
              $t('home_page.bid_now')
            }}</b-button>
          </template></ProductCard
        >
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
        .catch((error) => {
          this.$toasted.error(error.message)
        })
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
