<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home.new_releases')"
      :desc="$t('home.new_releases_desc')"
      :label="$t('home_page.view_more_products')"
      to="/shop/products?type=new-release"
    />

    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases" 
      class="text-center"
      @change="handleCategoryChange"
    />
    <section class="product-carousel">
      <ProductCarousel :products="products" showArrowsOnHover loop />
    </section>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
export default {
  name: 'HomeNewReleases',
  components: { NavGroup },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      categoryItems: [
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      currentCategory: 'sneakers',
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
@media (max-width:550px)
  .nav-group
    margin-top: 36px
    margin-bottom: 26px
</style>
