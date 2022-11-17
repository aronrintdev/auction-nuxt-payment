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
      styles: [
        {
          id: 14,
          style_name: 'FOREST-1-10-25-22',
          type: 'look',
          size_type: 'women',
          product_ids: '506,556,558',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-09T12:48:12.000000Z',
          updated_at: '2022-11-15T06:35:22.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 13,
          style_name: 'AMARI-1-10-20-22',
          type: 'look',
          size_type: 'men',
          product_ids: '567,558',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-09T12:19:38.000000Z',
          updated_at: '2022-11-09T12:19:38.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 12,
          style_name: 'ISABELLA-2-10-19-22',
          type: 'look',
          size_type: 'toddler',
          product_ids: '552',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-03T18:08:54.000000Z',
          updated_at: '2022-11-03T18:08:54.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 11,
          style_name: 'GABE-3-10-21-22',
          type: 'look',
          size_type: 'child',
          product_ids: '511',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-03T18:07:59.000000Z',
          updated_at: '2022-11-03T18:07:59.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 10,
          style_name: 'MIKA-1-10-21-22',
          type: 'look',
          size_type: 'women',
          product_ids: '567,556,497',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-03T13:09:17.000000Z',
          updated_at: '2022-11-03T13:09:17.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 9,
          style_name: 'GABE-1-10-21-22',
          type: 'look',
          size_type: 'women',
          product_ids: '552',
          brands_featured: null,
          status: 'active',
          created_at: '2022-11-02T12:30:27.000000Z',
          updated_at: '2022-11-02T12:30:27.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
        {
          id: 8,
          style_name: 'AMARI-4-10-20-22',
          type: 'look',
          size_type: 'men',
          product_ids: '388,268,494',
          brands_featured: null,
          status: 'active',
          created_at: '2022-10-28T23:46:26.000000Z',
          updated_at: '2022-11-02T10:31:44.000000Z',
          image: require('~/assets/img/home/style1.png'),
        },
      ],
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
