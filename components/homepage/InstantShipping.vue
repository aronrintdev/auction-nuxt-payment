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
      products: [],
      categoryItems: [
        { label: this.$t('home_page.all'), value: 'all' },
        { label: this.$t('home.trending'), value: 'trending' },
        { label: this.$t('home_page.bestsellers'), value: 'best' },
      ],
      currentCategory: 'all',
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
