<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.shop_by_style')"
      :desc="$t('home_page.shop_by_style_description')"
      :label="$t('home_page.view_more_products')"
      to="/shop-by-style"
    />
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center nav-group my-md-4"
      @change="handleCategoryChange"
    />
    <div>
      <ProductStyleCarousel :products="styles" variant="photo" />
      <Carousel :products="styles" variant="photo" />
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductStyleCarousel from '~/components/product/CarouselStyle.vue'
import Carousel from '~/components/shop-by-style/Carousel.vue'
export default {
  name: 'HomeShopByStyle',
  components: { NavGroup, Carousel, ProductStyleCarousel },
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
  async fetch() {
    await this.fetchStyles()
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
          this.styles = res.data.data
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
  padding-bottom: 48px
  .nav-group
    margin-top: 33px
    margin-bottom: 25px
  .corousel::v-deep
    .owl-stage
      margin-left: -22px
</style>
