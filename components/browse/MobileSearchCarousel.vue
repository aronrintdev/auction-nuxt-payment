<template>
  <div class="product-carousel-wrapper">
    <client-only>
      <Carousel
        v-if="items.length"
        ref="carousel"
        :loop="loop"
        :nav="false"
        :showArrows="showArrows"
        :center="true"
        :margin="0"
        :responsive="responsiveAttr"
        :mouse-drag="true"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <slot name="product">
            <div
              v-for="(item, index) in items"
              :key="`product-carousel-${index}`"
              :class="{ item: true, 'photo-item': variant === 'photo' }"
              @click.stop="()=> item.to ? $router.push(item.to) : null"
            >
              <div v-if="variant === 'trade' || variant === 'auction'">
                <CountdownItem :key="index" :time="5000000 * 3.8" />
                <div class="bg-gray">
                  <ProductThumb
                    :src="variant === 'auction' ? item.auction_items[0].inventory.product.image : item.image"
                    :img-class="'m-0'"
                    class="thumb"
                  />
                </div>
                <div class="title mt-2 text-nowrap text-truncate px-1">
                  <template v-if="variant === 'auction'">
                    {{ item.auction_items[0].inventory.product.name }}
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
                <div class="color text-gray-light fs-14 fw-5 font-secondary text-nowrap text-truncate px-1">
                  {{ item.colorway }}
                </div>

                <div v-if="variant === 'trade'" class="d-flex justify-content-between px-1 pb-1">
                  <div class="font-secondary fs-14 mt-1 text-black body-5-normal">
                   {{ $t('home_page.size')}} {{ item.inventory.length ? item.inventory[0].size.size : '-' }}
                  </div>
                  <a role="button" class="trade d-flex align-items-center" @click="$router.push(`/trades/${item.id}`)">
                    <img src="~/assets/img/browse/arrows.svg" /> <span class="ml-2">{{ $t('mobile_search.trade')}}</span>
                  </a>
                </div>

                <div v-else class="d-flex justify-content-sm-start w-100 px-1 pb-1">
                 <div class="font-secondary fs-14 mt-1 text-black body-5-normal">
                   &dollar;{{ item.highest_bid ? item.highest_bid : item.start_bid_price | formatPrice }}
                 </div>
                  <div class="d-flex justify-content-between w-100">
                     <span class="font-secondary fs-12 mt-1 text-gray-light body-5-light px-1 flex-grow-1">
                        ({{ item.auction_items[0].inventory.color }})
                     </span>
                    <a role="button" class="bid d-flex align-items-center justify-content-between"
                         @click="$router.push(`/profile/auctions/${item.id}`)">
                      <span>{{ $t('mobile_search.bid_now')}}</span>
                    </a>
                  </div>

               </div>
              </div>
              <div v-else>
                <ProductThumb :src="item.image" :img-class="'m-0'" />
                <div class="title mt-2">{{ item.title }}</div>
              </div>
            </div>
          </slot>
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

      <div v-else class="no-text py-5">
        {{ $t('message.no_products_found') }}
      </div>
    </client-only>
  </div>
</template>
<script>
import ProductThumb from '~/components/browse/Thumb.vue'
import CountdownItem from '~/components/browse/CountdownItem'

export default {
  name: 'MobileSearchCarousel',
  components: {CountdownItem, ProductThumb },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    variant: {
      type: String, // enum: ['detail', 'photo', 'countdown']
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
    itemSettings: {
      type: Object,
      default: () => null
    },
  },
  computed: {
    responsiveAttr() {
      if(this.itemSettings) return this.itemSettings
      if (this.variant === 'detail') {
        return {
          0: { items: 3, nav: false, center: false },
          768: { items: 4, nav: false, center: false },
          950: { items: 5, nav: false, center: false },
        }
      } else {
        return {
          0: { items: 3, nav: false, center: false },
          768: { items: 4, nav: false, center: false },
          950: { items: 5, nav: false, center: false },
        }
      }
    },
  },

  watch: {
    items() {
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
        margin: 0
        margin-left: 0.5em
        margin-right: 0.5em
        &.photo-item
          img
            object-fit: contain
            @media (max-width: 500px)
              //height: 300px
    .owl-nav
      width: auto
      cursor: pointer
      [class*='owl-']
        background: none
      &.owl-next
        float: right
        margin-right: -15px
      &.owl-prev
        float: left
        margin-left: -15px

  .title
    font-family: $font-family-sf-pro-display
    @include body-4-medium

  .color
    font-family: $font-family-sf-pro-display

  .trade
    font-family: $font-montserrat
    @include body-18-normal
    background-color: $color-gray-73
    color: $color-white
    border-radius: 4px
    padding: 5px 8px
    img
      width: 13px
      height: 9px

  .bid
    font-family: $font-montserrat
    @include body-18-normal
    background-color: $color-black-1
    color: $color-white
    padding: 5px 8px
    min-width: 60px
    height: 22px

  .thumb
    opacity: 0.9
    padding-bottom: 15%
    padding-top: 15%
    background-color: $color-white
    border: none
    padding-left: 15px
    padding-right: 15px
</style>
