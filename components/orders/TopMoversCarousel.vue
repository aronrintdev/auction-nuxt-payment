<template>
  <div>
    <div class="d-flex justify-content-between align-items-baseline">
      <h2 class="top-movers-heading px-md-2">{{ $t('orders.your_top_movers') }} <small class="text-capitalize">({{ $t('orders.this_month') }})</small>
      </h2>
      <div class="d-none d-md-block">
        <span class="cursor-pointer" @click="prev"><img :src="require('~/assets/img/icons/arrow-left-gray.svg')"></span>
        <span class="cursor-pointer" @click="next"><img
          :src="require('~/assets/img/icons/arrow-right-gray.svg')"></span>
      </div>
    </div>
    <div class="d-none d-md-block">
      <b-carousel
        id="carousel-1"
        ref="showcase"
        v-model="slide"
        :interval="4000"
        img-width="1024"
        img-height="250"
      >
        <b-carousel-slide v-for="product in slides" :key="product.key">
          <template #img>
            <div class="row box-gap flex-nowrap">
              <movers-card v-if="product[0]" :product="product[0]"
                           :top-sales-percentage="topSalesPercentage"></movers-card>
              <movers-card v-if="product[1]" :product="product[1]"
                           :top-sales-percentage="topSalesPercentage"></movers-card>
              <movers-card v-if="product[2]" :product="product[2]"
                           :top-sales-percentage="topSalesPercentage"></movers-card>
            </div>
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div style="overflow-x: scroll" class="d-block d-md-none product-strip-wrapper">
      <div class="bg-light" :style="stripWidth">
        <div class="d-flex box-gap flex-nowrap product-strip">
          <div v-for="item in products" :key="item.key" class="item overflow-hidden">
            <movers-card v-if="item"
                         :product="item"
                         :top-sales-percentage="topSalesPercentage">
            </movers-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import MoversCard from '~/components/orders/MoversCard';

export default {
  name: 'TopMoversCarousel',
  components: {
    MoversCard
  },
  data() {
    return {
      slide: 0,
      topSalesPercentage: 0
    }
  },
  computed: {
    ...mapGetters({
      'products': 'vendors/products'
    }),
    stripWidth(){
      const count = this.products.length
      return `width: ${(count * 151)}px`
    },
    slides() {
      const slides = []
      const products = Object.values(this.products)

      // find the highest sales_percentage from the product list
      products.forEach(p => {
        if (p.sales_percentage >= this.topSalesPercentage) {
          this.topSalesPercentage = p.sales_percentage
        }
      })

      // in the carousel we are showing 3 products in single slide,
      // creating a segment of 3 products from the list of all the products,
      for (let i = 0; i < products.length;) {
        slides.push(products.slice(i, i + 3))
        i = i + 3;
      }
      return slides
    }
  },
  methods: {
    prev() {
      this.$refs.showcase.prev()
    },
    next() {
      this.$refs.showcase.next()
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.box-gap
  gap: 8px

.top-movers-heading
  font-family: $font-family-sf-pro-display
  @include body-15-bold
  text-transform: uppercase
  margin: 20px 0

  small
    color: $color-gray-6
    @include body-14

.product-strip-wrapper
  -ms-overflow-style: none
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none

.product-strip .item
  width: 151px

  ::v-deep .col
    padding: 0 !important

  ::v-deep .mx-2
    margin-left: 0 !important
    margin-right: 0 !important

@media (max-width: 992px)
  .box-gap
    gap: 10px

  .top-movers-heading
    font-family: $font-montserrat
    @include body-5
    text-transform: capitalize
    margin: 34px 0

    small
      @include body-9

</style>
