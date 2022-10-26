<template>
  <div class="section-wrapper">
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
      class="text-center"
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
        { label: this.$t('home_page.all'), value: '' },
        { label: this.$t('home_page.footwear'), value: 'footwear' },
        { label: this.$t('home_page.apparel'), value: 'apparel' },
        { label: this.$t('home_page.accessories'), value: 'accessories' },
      ],
      currentCategory: '',
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
.nav-group
  margin-top: 33px
  margin-bottom: 25px
@media (max-width: 550px)
  .product-card-wrapper::v-deep
    .product-badge
      .px-2.py-1
        height: 25px
    .badge-icon
      width: 7px
</style>
