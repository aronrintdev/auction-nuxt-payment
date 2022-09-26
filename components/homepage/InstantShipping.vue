<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.instant_shipping')"
      :desc="$t('home_page.instant_shipping_desc')"
      :label="$t('home_page.view_more_products')"
      to="/shop"
    />
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center my-5"
      @change="handleCategoryChange"
    />
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
                    :title="$t('home_page.instant')"
                    :icon="require('~/assets/img/home/instant.svg')"
                    color="black"
                    right
                  />
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
import NavGroup from '~/components/common/NavGroup.vue'
import ProductCard from '~/components/product/Card'
import Badge from '~/components/product/Badge'
export default {
  name: 'InstantShipping',
  components: { NavGroup, ProductCard, Badge },
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
      categoryItems: [
        { label: this.$t('home_page.all'), value: 'all' },
        { label: this.$t('home.trending'), value: 'trending' },
        { label: this.$t('home_page.bestsellers'), value: 'best' },
      ],
      currentCategory: 'all',
    }
  },
  // async fetch() {
  //   await this.fetchProducts()
  // },
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
