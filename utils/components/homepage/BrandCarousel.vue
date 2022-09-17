<template>
  <div class="brand-carousel-wrapper">
    <client-only>
      <Carousel
        v-if="brands.length"
        ref="carousel"
        :loop="true"
        :nav="false"
        :center="true"
        :margin="10"
        :responsive="{
          0: { items: 1, nav: false, center: true },
          450: { items: 2, nav: false, center: false },
          675: { items: 3, nav: false, center: true },
          900: { items: 4, nav: false, center: false },
          1125: { items: 5, nav: false, center: true },
          1350: { items: 6, nav: false, center: false },
        }"
        :mouse-drag="false"
        :dots="false"
        :autoplay="true"
        :autoplay-timeout="3000"
        class="carousel"
      >
        <template #default>
          <div
            v-for="(brand, index) in brands"
            :key="`brand-carousel-${index}`"
            class="item"
          >
            <b-img
              v-b-tooltip.hover
              :alt="brand.name"
              :src="brand.image"
              :title="brand.name"
              @click="handleBrandClick(brand)"
            />
          </div>
        </template>
      </Carousel>
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'HomeBrandCarousel',

  props: {
    brands: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    brands() {
      // Destroy and recreate carousel when products change
      this.$refs.carousel?.destroy()
      this.$nextTick(() => this.$refs.carousel?.create())
    },
  },

  methods: {
    handleBrandClick(brand) {
      this.$store.commit('browse/setSelectedBrands', [
        brand.name?.toLowerCase(),
      ])
      this.$router.push('/shop')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.brand-carousel-wrapper
  padding: 0

  .carousel::v-deep
    width: 100%
    text-align: center
    position: relative
    margin-left: auto
    margin-right: auto

    .owl-carousel
      background-color: $color-gray-16
      padding: 58px 0 58px 0

      .owl-stage
        display: flex
        align-items: center

        .owl-item
          .item
            margin: 0 10px
            width: auto
            margin-left: auto
            margin-right: auto
            display: flex
            align-items: center
            justify-content: center

            img
              border-radius: 4px
              width: auto
              height: 100px
              cursor: pointer
</style>
