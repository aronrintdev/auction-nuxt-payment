<template>
  <div class="trade-carousel-wrapper">
    <client-only>
      <Carousel
        :loop="false"
        :nav="false"
        :center="true"
        :margin="0"
        :responsive="{
          0: { items: 1, nav: false, center: true },
          700: { items: 2, nav: false, center: false },
          950: { items: 3, nav: false, center: true },
          1150: { items: 4, nav: false, center: false },
        }"
        :mouse-drag="false"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <div
            v-for="(trade) in trades"
            :key="`trade-carousel-item-${trade.id}`"
          >
            <div
              v-for="(product, index) in trade.offers"
              :key="`trade-carousel-${index}`"
              class="item"
            >
              <nuxt-link :to="'/trades/' + trade.id">
                <BrowseItemCard
                  :trade="extractTradeInformation(trade)"
                  :product="product.inventory.product" />
              </nuxt-link>
            </div>
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
import BrowseItemCard from '~/components/trade/BrowseItemCard.vue'

export default {
  name: 'BrowseCarousel',

  components: { BrowseItemCard },

  props: {
    trades: {
      type: Array,
      default: () => [],
    },
    variant: {
      type: String, // enum: ['detail', 'photo']
      default: 'detail',
    },
  },
  methods: {
    // extract trade information
    extractTradeInformation(trade){
      return {
          id: trade.id,
          created_at: trade.created_at,
        }
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.trade-carousel-wrapper
  padding: 0

  .carousel::v-deep
    width: 100%
    padding: 0 58px
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        margin: 0 10px
        width: 261px
        margin-left: auto
        margin-right: auto

    .owl-nav
      width: auto
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        margin-right: -50px !important

      &.owl-prev
        float: left
        margin-left: -50px !important

.item
  border: 0.5px solid $light-gray-2
</style>
