<template>
  <div class="section-wrapper">
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
      class="text-center nav-group my-md-4"
      @change="handleCategoryChange"
    />
    <div>
      <ProductCarousel :products="products" variant="photo" />
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
export default {
  name: 'HomeShopByStyle',
  components: { NavGroup },
  fetchOnServer: false,
  data() {
    return {
      categoryItems: [
        { label: 'All', value: 'all' },
        { label: 'Trending', value: 'trending' },
        { label: 'Best Seller', value: 'best' },
      ],
      currentCategory: 'all',
      products: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          image: require('~/assets/img/home/style1.png'),
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
        {
          id: 9,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          image: require('~/assets/img/home/style4.png'),
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
        {
          id: 10,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          image: require('~/assets/img/home/style3.png'),
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
        {
          id: 11,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          image: require('~/assets/img/home/style4.png'),
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
      styles: [],
    }
  },
  // async fetch() {
  //   await this.fetchStyles()
  // },
  // mounted() {
  //   this.fetchStyles()
  // },

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
  padding-bottom: 48px
  .nav-group
    margin-top: 33px
    margin-bottom: 25px
  .corousel::v-deep
    .owl-stage
      margin-left: -22px
</style>
