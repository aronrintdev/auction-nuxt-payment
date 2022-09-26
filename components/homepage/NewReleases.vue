<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home.new_releases')"
      :desc="$t('home_page.new_releases_description')"
      :label="$t('home_page.view_more_products')"
      to="/new-release"
    />

    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center my-5"
      @change="handleCategoryChange"
    />
    <div class="row">
      <div class="col-12">
        <ProductCarousel :products="products" loop />
      </div>
    </div>
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
      products: [
        {
          id: 8,
          sku: 'DC6515-100 (2021)',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 9,
          sku: 'DC6515-100 (2021)',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 10,
          sku: 'DC6515-100 (2021)',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
        {
          id: 11,
          sku: 'DC6515-100 (2021)',
          name: 'Jordan Retro 4',
          colorway: 'University Blue',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
          sale_price: 500,
          size: 9,
        },
      ],
      categoryItems: [
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      currentCategory: 'sneakers',
    }
  },
  // async fetch() {
  //   await this.fetchProducts()
  // },
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
        // this.fetchProducts()
      }
    },
  },
}
</script>
