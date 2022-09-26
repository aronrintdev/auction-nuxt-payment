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
      <div class="col-12">
        <ProductCarousel :products="products">
          <template #product>
            <div
              v-for="(product, index) in products"
              :key="`product-carousel-${index}`"
              class="item"
            >
              <ProductCard :product="product">
                <template #badge>
                  <!-- TODO -->
                  <Badge
                    title="5d 18h"
                    :icon="require('~/assets/img/home/clock.svg')"
                    color="red"
                  />
                </template>
                <template #action>
                  <b-button
                    variant="dark"
                    class="fs-15 fw-5 font-secondary w-100 btn-sm d-flex align-items-center justify-content-center"
                  >
                    <img class="btnIcon" src="~/assets/img/home/trade.svg" />
                    <span class="ml-1">
                      {{ $t('home_page.trade') }}
                    </span>
                  </b-button>
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
      products: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 9,
          sku: 'DC6515-100',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 10,
          sku: 'DC6515-100',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 11,
          sku: 'DC6515-100',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
      ],
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
