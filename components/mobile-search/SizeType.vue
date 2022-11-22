<template>
  <section class="mt-3">
    <SectionHeader class="px-2"
                   :title="$t('common.sizetype')"
                   full-width
    />
    <MobileSearchCarousel
      class="mt-4 mb-5"
      :items="sizeType"
    />
  </section>
</template>

<script>
export default {
  name: 'SizeType',
  data() {
    return {
      sizeType: [
        { image: require('~/assets/img/browse/img-1.png'), title: 'Men', to: '/shop' },
        { image: require('~/assets/img/browse/img-2.png'), title: 'Women', to: '/shop' },
        { image: require('~/assets/img/browse/img-3.png'), title: 'Kids', to: '/shop' }
      ],
    }
  },
}
</script>

<style scoped>

</style>
