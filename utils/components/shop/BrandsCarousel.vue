<template>
  <div class="brands-carousel-wrapper">
    <client-only>
      <Carousel
        v-if="filters.brands && filters.brands.length"
        :loop="false"
        :nav="false"
        :center="false"
        :margin="10"
        :responsive="{
          0: { items: 1 },
          600: { items: 2 },
          800: { items: 3 },
          1000: { items: 4 },
          1200: { items: 5 },
          1400: { items: 6 },
          1600: { items: 7 },
          1800: { items: 8 },
        }"
        :mouse-drag="false"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <div
            v-for="(brand, index) in filters.brands"
            :key="`brand-carousel-${index}`"
            class="item"
          >
            <img
              :key="index"
              v-b-tooltip.hover
              :title="brand.name"
              class="brand-image"
              :class="{
                active:
                  selectedBrands &&
                  selectedBrands.some(
                    (b) => b.toLowerCase() === brand.name.toLowerCase()
                  ),
              }"
              :src="brand.image"
              :name="brand.name"
              :alt="brand.name"
              @click="selectBrand"
            />
          </div>
        </template>

        <template #prev>
          <div class="owl-nav owl-prev">
            <img :src="require('~/assets/img/home/arrow-left.svg')" />
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next">
            <img :src="require('~/assets/img/home/arrow-right.svg')" />
          </div>
        </template>
      </Carousel>
    </client-only>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  name: 'ShopBrandsCarousel',

  components: {},

  computed: {
    // Get the details from browse store
    ...mapGetters('browse', ['filters', 'selectedBrands']),
  },

  methods: {
    selectBrand(e) {
      const value = e.target.name
      if (this.selectedBrands?.includes(value)) {
        this.$store.commit(
          'browse/setSelectedBrands',
          this.selectedBrands.filter((i) => i !== value)
        )
      } else {
        this.$store.commit('browse/setSelectedBrands', [
          ...(this.selectedBrands || []),
          value,
        ])
      }
      this.$emit('select', value)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.brands-carousel-wrapper
  padding: 0
  margin-left: -41px
  margin-right: -41px
  position: relative

  .carousel::v-deep
    width: 100%
    padding: 0 41px
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center

    .owl-stage-outer
      background-color: $color-gray-16 !important
      height: 163px

      .owl-item
        display: flex
        justify-content: center

      .brand-image
        width: auto
        height: 100px
        max-width: 100%
        max-height: 100%
        cursor: pointer
        opacity: 0.5

        &.active
          opacity: 1

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        margin: 0 10px
        height: 163px
        margin-left: auto
        margin-right: auto
        display: flex
        align-items: center

    .owl-nav
      width: auto
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        margin-right: -41px !important

      &.owl-prev
        float: left
        margin-left: -41px !important
</style>
