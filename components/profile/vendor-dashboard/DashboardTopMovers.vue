<template>
  <div>
    <div class="d-flex justify-content-between align-items-baseline">
      <h2
        class="text-black"
        :class="{
          'body-5-bold font-primary mb-20': isScreenXS,
          'body-15-bold font-secondary': !isScreenXS,
        }"
      >
        {{ $t('orders.your_top_movers') }}
        <small
          class="text-gray-6"
          :class="{
            'body-13-bold ': !isScreenXS,
            'body-9-medium   ': isScreenXS,
          }"
          >({{ $t('orders.this_month') }})</small
        >
      </h2>
      <div class="d-none d-md-block">
        <span class="cursor-pointer" @click="prev"
          ><img :src="require('~/assets/img/icons/arrow-left-gray.svg')"
        /></span>
        <span class="cursor-pointer" @click="next"
          ><img :src="require('~/assets/img/icons/arrow-right-gray.svg')"
        /></span>
      </div>
    </div>

    <div class="d-none d-md-block">
      <Carousel
        ref="sizeCarousel"
        :center="false"
        :dots="false"
        :loop="false"
        :margin="10"
        :mouse-drag="false"
        :nav="false"
        :nav-text="['', '']"
        :responsive="{
          0: { items: 3, nav: false, center: false },
        }"
        class="carousel slide-fade position-relative thumb-carousel"
      >
        <template #prev><span ref="prev"></span></template>

        <template #next><span ref="next"></span></template>
        <div
          v-for="(item, index) in products"
          :key="item.id"
          :data-position="index"
          :data-size="item.id"
        >
          <div class="h-100 w-100">
            <movers-card
              v-if="item"
              :product="item"
              :top-sales-percentage="topSalesPercentage"
            ></movers-card>
          </div>
        </div>
      </Carousel>
    </div>
    <div
      style="overflow-x: scroll"
      class="d-block d-md-none product-strip-wrapper"
    >
      <div class="bg-light" :style="stripWidth">
        <div class="d-flex box-gap flex-nowrap product-strip">
          <div
            v-for="item in products"
            :key="item.key"
            class="item overflow-hidden"
          >
            <movers-card
              v-if="item"
              :product="item"
              :top-sales-percentage="topSalesPercentage"
            >
            </movers-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MoversCard from '~/components/orders/MoversCard'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'DashboardTopMovers',
  components: { MoversCard },
  mixins: [screenSize],
  data() {
    return {
      slide: 0,
      topSalesPercentage: 0,
    }
  },
  computed: {
    ...mapGetters({
      products: 'vendors/products',
    }),
    stripWidth() {
      const count = this.products.length
      return `width: ${count * 151}px`
    },
  },
  methods: {
    prev() {
      this.$refs.prev.click()
    },
    next() {
      this.$refs.next.click()
    },
  },
}
</script>
<style scoped lang="sass">
.mb-20
  margin-bottom: 20px

::v-deep.thumb-carousel
  .owl-carousel
    margin-left: -15px
    .owl-stage
      width: max-content !important
    .owl-item
      max-width: 360px !important
      max-height: 250px !important
      .product-name
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        max-width: 250px
      .text-center
        img
          width: 155px
          object-fit: cover
          margin-inline: auto
</style>
