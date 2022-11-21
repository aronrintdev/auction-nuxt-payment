<template>
  <section class="featured">
    <SectionHeader class="px-2"
                   :title="$t('preferences.payments.featured')"
                   full-width
    />
    <MobileSearchCarousel
      class="mt-4 mb-5"
      :items="featured"
      variant="photo"
      :item-settings="{
            0: { items: 2, nav: false, center: false },
          }"
      loop />
  </section>
</template>

<script>
export default {
  name: 'Featured',
  data() {
    return {
      featured: [
        { image: require('~/assets/img/browse/featured_1.png'), title: 'New Releases', to: '/new-release' },
        { image: require('~/assets/img/browse/featured_2.png'), title: 'Instant Shipping', to: '/shop/products?type=instant-shipping' },
        { image: require('~/assets/img/browse/featured_3.png'), title: 'Best Selling', to: '/shop/products?type=best-selling' },
        { image: require('~/assets/img/browse/featured_4.png'), title: 'Trending', to: '/shop/products?type=trending' },
        { image: require('~/assets/img/browse/featured_5.png'), title: 'Gift Card', to: '/shop/products?type=gift-card' },
        { image: require('~/assets/img/browse/featured_6.png'), title: '', to: '/shop' }
      ],
    }
  },
}
</script>

<style scoped>

</style>
