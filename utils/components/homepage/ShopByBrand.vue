<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.shop_by_brand')"
      :description="$t('home.shop_by_brand_desc')"
      :button-label="$t('home.view_more_brands')"
      :button-target="'/shop'"
      class="section-header"
    />
    <HomeBrandCarousel :brands="brands" class="section-carousel" />
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'
import HomeBrandCarousel from '~/components/homepage/BrandCarousel.vue'

export default {
  name: 'HomeShopByBrand',

  components: { HomeSectionHeader, HomeBrandCarousel },

  data() {
    return {
      brands: [],
    }
  },

  async fetch() {
    this.brands = await this.$axios
      .get('/brands', {
        params: {
          take: 10,
        },
        handleError: false,
      })
      .then((res) => res.data || [])
      .catch(() => [])
  },

  methods: {},
}
</script>
<style lang="sass" scoped>
.section-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .section-carousel
    margin-top: 40px
    max-width: 1145px
    margin-left: auto
    margin-right: auto

  @media (max-width: 830px)
    .section-carousel
      padding: 0
</style>
