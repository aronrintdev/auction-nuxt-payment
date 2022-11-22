<template>
  <section class="view_auctions">
    <SectionHeader class="px-2"
                   :title="$t('mobile_search.view_auctions')"
                   to="/auction"
                   full-width
    />
    <MobileSearchCarousel
      class="mt-4 mb-5"
      :items="auctions"
      :variant="'auction'"
      :item-settings="{
            0: { items: 2, nav: false, center: false }
          }"
      loop />
  </section>
</template>

<script>
import MobileSearchCarousel from '~/components/mobile-search/MobileSearchCarousel'
import SectionHeader from '~/components/SectionHeader'
export default {
  name: 'MobileSearchAuctions',
  components: { MobileSearchCarousel, SectionHeader },
  fetchOnServer: false,
  data() {
    return {
      auctions: [],
      pageName: 'auctions'
    }
  },
  async fetch() {
    await this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.$axios
        .get('/auctions/public', {
          params: {
            take: 10,
            category: this.currentCategory,
            type: 'single',
            status: 'live',
          },
          handleError: false,
        })
        .then((res) => {
          this.auctions = res.data.data || []
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    },
  },
}
</script>

<style scoped>

</style>
