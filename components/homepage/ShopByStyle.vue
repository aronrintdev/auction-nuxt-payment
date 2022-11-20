<template>
  <div class="section-wrapper">
    <SectionHeader
      :title="$t('home_page.shop_by_style')"
      :desc="$t('home_page.shop_by_style_description')"
      :label="$t('home_page.view_more_styles')"
      to="/shop-by-style"
    />
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center"
      @change="handleCategoryChange"
    />
    <div>
      <ProductStyleCarousel
        :products="styles"
        showArrowsOnHover
        variant="photo"
      />
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductStyleCarousel from '~/components/product/CarouselStyle.vue'
export default {
  name: 'HomeShopByStyle',
  components: { NavGroup, ProductStyleCarousel },
  fetchOnServer: false,
  data() {
    return {
      categoryItems: [
        { label: 'All', value: 'all' },
        { label: 'Trending', value: 'trending' },
        { label: 'Best Seller', value: 'best' },
      ],
      currentCategory: 'all',
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
            pageName: 'HOME',
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
.nav-group
  margin-top: 33px
  margin-bottom: 25px
.corousel::v-deep
  .owl-stage
    margin-left: -22px
</style>
