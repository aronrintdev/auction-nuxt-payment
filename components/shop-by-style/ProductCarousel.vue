<template>
    <div class="product-carousel-wrapper">
      <client-only>
        <Carousel
          v-if="products.length"
          ref="carousel"
          :loop="loop"
          :nav="false"
          :showArrows="showArrows || showArrowsOnHover"
          :center="true"
          :margin="0"
          :responsive="responsiveAttr"
          :mouse-drag="true"
          :dots="false"
          class="carousel"
          :class="{ 'show-arrows-on-hover': showArrowsOnHover }"
          :style="`--item-width: ${itemWidth}`"
          :autoWidth="autoWidth"
        >
          <template #default>
            <slot name="product">
              <div
                v-for="(product, index) in products"
                :key="`product-carousel-${index}`"
                :class="{ item: true, 'photo-item': variant === 'photo' }"
              >
                <div>
                  <ProductCard
                    v-if="variant === 'detail'"
                    :product="product"
                    :pageName="pageName"
                    :cardHeight="cardHeight"
                    :showActions="showActions"
                  />
                </div>
                <nuxt-link
                  v-if="variant === 'photo'"
                  :to="`/shop/${product.sku}`"
                >
                  <ProductThumb
                    :src="product.image"
                    :product="product"
                    :height="500"
                  />
                </nuxt-link>
              </div>
            </slot>
          </template>
          <template #prev>
            <div
              class="owl-nav navigation-arrows owl-prev"
              :style="`--cardHeight: ${cardHeight}`"
            >
              <img :src="require('~/assets/img/home/arrow-left.svg')" />
            </div>
          </template>
  
          <template #next>
            <div
              class="owl-nav navigation-arrows owl-next"
              :style="`--cardHeight: ${cardHeight}`"
            >
              <img :src="require('~/assets/img/home/arrow-right.svg')" />
            </div>
          </template>
        </Carousel>
  
        <div v-else class="no-text py-5">
          {{ $t('message.no_products_found') }}
        </div>
      </client-only>
    </div>
  </template>
  <script>
  import ProductCard from '~/components/product/Card.vue'
  import ProductThumb from '~/components/product/Thumb.vue'
  export default {
    name: 'HomeProductCarousel',
    components: { ProductCard, ProductThumb },
    props: {
      products: {
        type: Array,
        default: () => [],
      },
      variant: {
        type: String, // enum: ['detail', 'photo']
        default: 'detail',
      },
      loop: {
        type: Boolean,
        default: false,
      },
      pageName: {
        type: String,
        default: 'shop',
      },
      showArrows: {
        type: Boolean,
        default: false,
      },
      showActions: {
        type: Boolean,
        default: true,
      },
      showArrowsOnHover: {
        type: Boolean,
        default: false,
      },
      cardHeight: {
        type: String,
        default: '312px',
      },
      itemWidth: {
        type: String,
        default: '100%',
      },
      autoWidth: {
        type: Boolean,
        default: false,
      },
    },
  
    computed: {
      responsiveAttr() {
        if (this.variant === 'detail') {
          return {
            0: { items: 2, nav: false, center: false },
            768: { items: 3, nav: false, center: false },
            950: { items: 4, nav: false, center: false },
          }
        } else {
          return {
            0: { items: 2, nav: false, center: false },
            768: { items: 3, nav: false, center: false },
            950: { items: 4, nav: false, center: false },
          }
        }
      },
    },
    watch: {
      products() {
        // Destroy and recreate carousel when products change
        this.$refs.carousel?.destroy()
        this.$nextTick(() => this.$refs.carousel?.create())
      },
    },
  }
  </script>
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  .product-carousel-wrapper
    padding: 0
    margin: 0 -12px
    .no-text
      @include body-4-medium
      text-align: center
      color: $color-gray-5
    .carousel::v-deep
      width: 100%
      text-align: center
      position: relative
      margin-left: auto
      margin-right: auto
      display: flex
      align-items: center
      @media (max-width: 576px)
        [id^='carousel_next_']
          display: none
        [id^='carousel_prev_']
          display: none
      >span .owl-nav
        display: block
      .owl-carousel
        .item
          text-align: left
          margin: 0 12px
          width: var(--item-width)
          &.photo-item
            img
              border-radius: 5px
              object-fit: contain
              @media (max-width: 500px)
                height: 300px
      .owl-nav
        width: auto
        cursor: pointer
        [class*='owl-']
          background: none
        &.owl-next
          float: right
          margin-right: -30px
        &.owl-prev
          float: left
          margin-left: -30px
      &.show-arrows-on-hover
        .navigation-arrows
          display: none
          height: calc(var(--cardHeight) + 66px)
          width: 30px
          img
            width: 12px
          &.owl-prev
            justify-content: end
        &:hover
          .navigation-arrows
            display: flex
  </style>
  