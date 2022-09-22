<template>
  <div class="section-wrapper py-5">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-2 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.instant') }} <br />
          {{ $t('home_page.shipping') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.instant_shipping_desc') }}
        </h5>
      </div>
      <div class="col-2 col-md-7 d-flex justify-content-end">
        <ViewMoreBtn :label="$t('home_page.view_more_products')" to="#" />
      </div>
    </div>
    <NavGroup
      :data="categoryItems"
      :value="currentCategory"
      nav-key="new_releases"
      class="text-center my-5"
      @change="handleCategoryChange"
    />

    <div class="row">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="col-6 col-md-3"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import ProductCard from '~/components/product/Card'
export default {
  name: 'InstantShipping',
  components: { NavGroup, ProductCard },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      categoryItems: [
        { label: 'All', value: 'all' },
        { label: 'Trending', value: 'trending' },
        { label: 'Best Seller', value: 'best' },
      ],
      currentCategory: 'all',
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
