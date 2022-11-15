<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.price_trends')"
      :desc="$t('home_page.trade_desc')"
      :label="$t('home_page.view_price_trends')"
      to="/stock/exchange/trending"
    />
    <div class="banner-wrapper">
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
      class="text-center"
      @change="handleCategoryChange"
    />
    <client-only>
      <ProductTrendTable />
    </client-only>
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
        { label: this.$t('home.gainers'), value: 'gainers' },
        { label: this.$t('home.losers'), value: 'losers' },
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
@import '~/assets/css/_variables'
.banner-wrapper
  margin-top: 33px
  margin-bottom: 28px
  @media (max-width: 550px)
    margin-left: -7.5px
    margin-right: -7.5px
.banner
  background-image: url('~/assets/img/home/price-trend-cover.svg')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 50px

  @media (max-width: 550px)
    background-image: url('~/assets/img/home/price-trend-cover-sm.png')
    background-size: contain
    height: 214px
    padding-top: 38px
    h1
      font-size: 15px
      letter-spacing: 0.26em
.header-text
  color: $color-black-1
</style>
