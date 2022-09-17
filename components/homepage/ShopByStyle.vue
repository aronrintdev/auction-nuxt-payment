<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.shop_by_style')"
      :description="$t('home.shop_by_style_desc')"
      :button-label="$t('home.view_more_styles')"
      :button-target="'/shop-by-style'"
      class="section-header"
    />
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center"
      @change="handleCategoryChange"
    />
    <ProductCarousel
      :products="products"
      :loop="true"
      variant="photo"
      class="section-carousel"
    />
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import ProductCarousel from '~/components/product/Carousel.vue'

export default {
  name: 'HomeShopByStyle',

  components: { HomeSectionHeader, NavGroup, ProductCarousel },

  fetchOnServer: false,

  data() {
    return {
      categoryItems: [
        { label: this.$tc('common.look', 2), value: 'look' },
        { label: this.$tc('common.outfit_grid', 2), value: 'grid' },
      ],
      currentCategory: 'look',
      // todo: implmement data fetch
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
          image: require('~/assets/img/home/look.jpg'),
        },
        {
          id: 9,
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
          image: require('~/assets/img/home/look2.jpg'),
        },
      ],
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
            type: this.currentCategory
          }
        })
        .then((res) => {
          this.styles = res.data
        })
        .catch(error => {
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
