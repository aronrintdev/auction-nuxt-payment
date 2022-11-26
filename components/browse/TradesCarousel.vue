<template>
  <section class="view_trades">
    <SectionHeader class="px-2"
                   :title="$t('mobile_search.view_trades')"
                   to="/trades"
                   full-width
    />
    <MobileSearchCarousel
      class="mt-4 mb-5"
      :items="products"
      :variant="'trade'"
      :item-settings="{
            0: { items: 2, nav: false, center: false }
          }"
      loop />
  </section>
</template>

<script>
import MobileSearchCarousel from '~/components/browse/MobileSearchCarousel'
import SectionHeader from '~/components/SectionHeader'
export default {
  name: 'MobileSearchAuctions',
  components: { MobileSearchCarousel, SectionHeader },
  fetchOnServer: false,
  data() {
    return {
      products: [],
      pageName: 'trades'
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
          },
          handleError: false,
        })
        .then((res) => res.data || [])
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>

<style scoped>

</style>
