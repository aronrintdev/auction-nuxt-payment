<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.all_trades')"
      :desc="$t('home_page.trade_desc')"
      :label="$t('home_page.view_more_trades')"
      to="/new-release"
    />

    <div class="my-5">
      <div class="banner">
        <h1
          class="fw-7 fs-24 font-primary text-white text-center text-uppercase mb-0"
        >
          {{ $t('home_page.trade_areana') }}
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
            <b-button variant="dark" class="d-flex justify-content-end w-100">
              <img src="~/assets/img/home/trade.svg" />
              {{ $t('home_page.trade') }}
            </b-button>
          </template>
        </ProductCard>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from '~/components/product/Card'
export default {
  name: 'AllTrades',
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
  background-image: url('~/assets/img/home/all-trades-cover.png')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 50px
  @media (max-width: 550px)
    background-image: url('~/assets/img/home/all-trades-cover-sm.png')
    height: 215px
    padding: 24px
</style>
