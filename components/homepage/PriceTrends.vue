<template>
  <div class="section-wrapper py-5">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-2 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.price') }} <br />
          {{ $t('home_page.trends') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.price_trends_desc') }}
        </h5>
      </div>
      <div class="col-2 col-md-7 d-flex justify-content-end">
        <ViewMoreBtn :label="$t('home_page.view_price_trends')" to="#" />
      </div>
    </div>

    <div class="my-5">
      <div class="banner">
        <h1
          class="fw-7 fs-24 font-primary text-white text-center text-uppercase mb-0"
        >
          {{ $t('home.deadstock_exchange') }}
        </h1>
      </div>
    </div>

    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center my-5"
      @change="handleCategoryChange"
    />
    <ProductTrendTable />
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductTrendTable from '~/components/product/TrendTable.vue'
export default {
  name: 'PriceTrends',
  components: { NavGroup, ProductTrendTable },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      categoryItems: [
        { label: 'Trending', value: 'trending' },
        { label: 'Biggest Gainers', value: 'gainers' },
        { label: 'Biggest Losers', value: 'losers' },
      ],
      currentCategory: 'trending',
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
    handleCategoryChange(category) {
      if (this.currentCategory !== category) {
        this.currentCategory = category
        this.fetchProducts()
      }
    },
  },
}
</script>
<style lang="sass" scoped>
.banner
  background-image: url('~/assets/img/home/price-trend-cover.png')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 50px
  @media (max-width: 550px)
    background-image: url('~/assets/img/home/price-trend-cover-sm.png')
    height: 215px
    padding: 24px
</style>
