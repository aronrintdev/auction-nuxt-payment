<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.all_auctions')"
      :desc="$t('home_page.trade_desc')"
      :label="$t('home_page.view_more_auctions')"
      to="/auction"
    />

    <div class="banner-wrapper">
      <div class="banner">
        <h1
          class="fw-7 fs-24 font-primary text-white text-center text-uppercase mb-0"
        >
          {{ $t('home_page.auction_house') }}
        </h1>
      </div>
    </div>
    <div class="products-wrapper">
      <product-slider
        :title="''"
        :auctions="auctions"
        :type="'live'"
        :showHeader="false"
        @showAll="() => {}"
      ></product-slider>
    </div>
  </div>
</template>
<script>
import ProductSlider from '~/components/Auctions/ProductSlider'

export default {
  name: 'AllAuctions',
  components: { ProductSlider },
  fetchOnServer: false,
  data() {
    return {
      auctions: [],
      pageName: 'auctions'
    }
  },
  async fetch() {
    await this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.$axios
        .get('/auctions/public', {
          params: {
            take: 10,
            category: this.currentCategory,
            type: 'single',
            status: 'live',
          },
          handleError: false,
        })
        .then((res) => {
          this.auctions = res.data.data || []
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>
<style lang="sass" scoped>
.banner-wrapper
  margin-top: 33px
  @media (max-width: 550px)
    margin-left: -7.5px
    margin-right: -7.5px
.banner
  background-image: url('~/assets/img/home/auctions-cover.png')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 40px
  @media (max-width: 550px)
    background-image: url('~/assets/img/home/auctions-cover-sm.png')
    background-size: contain
    height: 214px
    padding-top: 38px
    h1
      font-size: 15px
      letter-spacing: 0.26em
.product-card-wrapper::v-deep
  @media (max-width: 550px)
    .product-badge
      .px-2.py-1
        height: 25px
    .badge-icon
      width: 15px

.products-wrapper
  .auctions-block
    padding: 0
</style>
