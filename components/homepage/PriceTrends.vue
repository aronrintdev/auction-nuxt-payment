<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.price_trends')"
      :desc="$t('home_page.price_trends_desc')"
      :label="$t('home_page.view_price_trends')"
      to="#"
    />
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
        { label: this.$t('home.trending'), value: 'trending' },
        { label: this.$t('home.biggest_gainers'), value: 'gainers' },
        { label: this.$t('home.biggest_losers'), value: 'losers' },
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
        .catch((error) => {
          this.$toasted.error(error.message)
        })
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
