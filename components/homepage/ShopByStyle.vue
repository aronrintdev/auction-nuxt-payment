<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.shop_by_style')"
      :desc="$t('home_page.shop_by_style_description')"
      :label="$t('home_page.view_more_products')"
      to="#"
    />
    <NavGroup
      :data="categoryItems" 
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center my-5"
      @change="handleCategoryChange"
    />
    <div class="products row">
      <div v-for="product in products" :key="product.id" class="col-6 col-lg-3">
        <ProductThumb :src="product.image" :height="500" :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  name: 'HomeShopByStyle',

  components: { NavGroup, ProductThumb },

  fetchOnServer: false,

  data() {
    return {
      categoryItems: [
        { label: 'All', value: 'all' },
        { label: 'Trending', value: 'trending' },
        { label: 'Best Seller', value: 'best' },
      ],
      currentCategory: 'all',
      products: [],
      styles: [],
    }
  },

  mounted() {
    this.fetchStyles()
  },

  methods: {
    // fetch styles as per selected category
    fetchStyles() {
      this.$axios
        .get('/shop-by-style', {
          params: {
            type: this.currentCategory,
          },
        })
        .then((res) => {
          this.styles = res.data
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    },

    handleCategoryChange(category) {
      this.currentCategory = category
      this.fetchStyles()
    },
  },
}
</script>
<style lang="sass" scoped>
.section-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .section-nav
    margin-top: 37px
    text-align: center

  .section-carousel
    margin-top: 37px
</style>
