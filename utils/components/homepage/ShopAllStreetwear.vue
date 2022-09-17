<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.shop_all_streetwear')"
      :description="$t('home.shop_all_streetwear_desc')"
      :button-label="$t('home.view_more_products')"
      :button-target="'/shop'"
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
  name: 'HomeShopAllStreetwear',

  components: { HomeSectionHeader, NavGroup, ProductCarousel },

  fetchOnServer: false,

  data() {
    return {
      categoryItems: [
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      currentCategory: 'sneakers',
      products: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
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
            order_by: 'created_at',
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
    margin-top: 110px

  .section-nav
    margin-top: 37px
    text-align: center

  .section-carousel
    margin-top: 37px
</style>
