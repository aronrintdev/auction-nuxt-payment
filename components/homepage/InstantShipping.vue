<template>
  <div class="section-wrapper py-5">
    <SectionHeader
      :title="$t('home_page.instant_shipping')"
      :desc="$t('home_page.instant_shipping_desc')"
      :label="$t('home_page.view_more_products')"
      to="/shop"
    />
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
        <ProductCard :product="product">
          <template #badge>
            <div class="d-flex justify-content-end">
              <div class="bg-black px-2 py-1 fs-14 fw-6 font-primary">
                <img src="~/assets/img/home/instant.svg" />
                {{ $t('home_page.instant') }}
              </div>
            </div>
          </template>
        </ProductCard>
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
        { label: this.$t('home_page.all'), value: 'all' },
        { label: this.$t('home.trending'), value: 'trending' },
        { label: this.$t('home_page.bestsellers'), value: 'best' },
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
