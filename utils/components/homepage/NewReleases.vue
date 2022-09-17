<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.new_releases')"
      :description="$t('home.new_releases_desc')"
      :button-label="$t('home.view_more_products')"
      button-target="/shop"
      class="section-header"
    />
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="section-nav"
      @change="handleCategoryChange"
    />
    <ProductCarousel
      :products="products"
      variant="detail"
      class="section-carousel"
    />
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import ProductCarousel from '~/components/product/Carousel.vue'

export default {
  name: 'HomeNewReleases',

  components: { HomeSectionHeader, NavGroup, ProductCarousel },

  props: {},

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
