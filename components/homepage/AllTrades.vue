<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.all_trades')"
      :desc="$t('home_page.trade_desc')"
      :label="$t('home_page.view_more_trades')"
      to="/trades"
    />

    <div class="banner-wrapper">
      <div class="banner">
        <h1
          class="fw-7 fs-24 font-primary text-white text-center text-uppercase mb-0"
        >
          {{ $t('home_page.trade_areana') }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ProductCarousel :products="products" :pageName='pageName'>
          <template #product>
            <div
              v-for="(product, index) in products"
              :key="`product-carousel-${index}`"
              class="item"
            >
              <ProductCard
                :product="product"
                showActionBtn
                showSize
                :showPrice="false"
                :pageName='pageName'
              >
                <template #badge>
                  <!-- TODO -->
                  <Badge
                    title="5d 18h"
                    :icon="require('~/assets/img/home/clock.svg')"
                    color="red-24"
                  />
                </template>
                <template #action>
                  <nuxt-link 
                  :to="'/trades/' + product.id"
                  >
                    <b-button
                      variant="dark"
                      class="fs-15 fw-5 font-secondary w-100 btn-sm d-flex align-items-center justify-content-center bg-grey-73"
                    >
                      <img class="btnIcon" src="~/assets/img/home/trade.svg" />
                      <span class="ml-1">
                        {{ $t('home_page.trade') }}
                      </span>
                    </b-button>
                  </nuxt-link>
                </template>
              </ProductCard>
            </div>
          </template>
        </ProductCarousel>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from '~/components/product/Card'
import Badge from '~/components/product/Badge'
export default {
  name: 'AllTrades',
  components: { ProductCard, Badge },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      pageName: 'trades'
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
.banner-wrapper
  margin-top: 33px
  margin-bottom: 28px
  @media (max-width: 550px)
    margin-left: -7.5px
    margin-right: -7.5px
.banner
  background-image: url('~/assets/img/home/all-trades-cover.svg')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  height: 400px
  padding: 50px
  @media (max-width: 550px)
    background-image: url('~/assets/img/home/all-trades-cover-sm.png')
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
</style>
