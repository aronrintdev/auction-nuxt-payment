<template>
  <section class="shop_by_category">
    <SectionHeader class="px-2"
                   :title="$t('mobile_search.shop_by_category')"
                   full-width
                   loop
                   to="/shop"
    />
    <MobileSearchCarousel
      class="mt-4 mb-5"
      :items="shopByCategory"
      variant="photo"
      :item-settings="{
            0: { items: 2, nav: false, center: false },
          }"
    />
  </section>
</template>

<script>
import MobileSearchCarousel from '~/components/browse/MobileSearchCarousel'
export default {
  name: 'ShopByCategory',
  components: { MobileSearchCarousel },
  data() {
    return {
      shopByCategory: [
        { image: require('~/assets/img/browse/category_1.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_2.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_3.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_4.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_5.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_6.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_7.png'), title: '', to: '/shop' },
        { image: require('~/assets/img/browse/category_8.png'), title: '', to: '/shop' },
      ],
    }
  },
}
</script>

<style scoped>

</style>
