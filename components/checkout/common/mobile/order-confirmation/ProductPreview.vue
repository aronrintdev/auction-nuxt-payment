<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Product Preview Carousel -->
      <b-row class="carousel-wrapper">
        <b-col cols="12" sm="12">
          <b-carousel ref="productPreviewCarousel" v-model="slide">
            <b-carousel-slide
              v-for="product in products"
              :key="product.listing_item_id"
              class="h-auto position-relative"
            >
              <template #img>
                <b-row>
                  <b-col cols="12" sm="12">
                    <b-img :src="brandLogo(product.brand)" width="70" height="70" />
                    <b-button id="share-button" variant="false">
                      <b-img :src="require('~/assets/img/shopping-cart/share-filled-black.svg')" width="18" height="18" />
                    </b-button>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12" sm="12" class="text-center">
                    <b-img fluid :src="product.image" width="320" />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12" sm="12" class="text-center">
                    <div class="copped-text">{{ coppedText }}</div>
                    <b-img :src="require('~/assets/img/home/logo-mb.png')" class="ds-logo" />
                  </b-col>
                </b-row>
              </template>
            </b-carousel-slide>
          </b-carousel>
        </b-col>
      </b-row>
      <!-- End of Product Preview Carousel -->

      <!-- Share what you copped paragraph -->
      <b-row class="share-text-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <span class="body-5-normal">
            {{ $t('shopping_cart.share_what_you_copped_text') }}
          </span>
        </b-col>
      </b-row>
      <!-- End of Share what you copped paragraph -->
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ProductPreview',
  props: {
    products: {
      type: Array,
      required: true,
    },
    coppedText: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      shareUrl: process.env.APP_URL + '/shop/',
      shareShow: false,
      slide: 0,
      brands: [],
    }
  },
  created() {
    this.fetchBrandLogos()
  },
  methods: {
    prev() {
      this.$refs.productPreviewCarousel.prev()
    },
    next() {
      this.$refs.productPreviewCarousel.next()
    },
    // return the brand logo file path base on the brand name
    brandLogo(name) {
      const brand = this.brands.find(
        (v) => v.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      return brand ? brand.image : require('~/assets/img/blank.png')
    },
    // fetching all the logos along with their image url
    fetchBrandLogos() {
      this.$axios
        .$get('/brands')
        .then((response) => {
          this.brands = response
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$toasted.error(this.$t(error.response.data.error).toString())
            return
          }
          this.$toasted.error(error.response.statusText)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.carousel-wrapper
  background: $color-white-5

  .carousel
    margin: 26px 18px 0
    padding-bottom: 12px
    background: $color-white-1

    .copped-text
      @include heading-10
      line-height: 56px

    .ds-logo
      margin-top: 24px
      width: 90px
      height: 30px

/* Share button styles */
#share-button
  background: $color-white-1
  position: absolute
  top: 10px
  right: 10px
  border: 1px
  width: 40px
  height: 40px
  padding: 0
  z-index: 99999
  box-shadow: 0 4px 4px 0 $color-black-rgb2
  border-radius: 25px

  div
    display: flex
    align-items: center
    justify-content: center

  &:hover
    background: $color-white-1
    box-shadow: 0 0.5rem 1rem $color-black-rgb3

.share-text-wrapper
  padding: 26px 24px 14px
  background: $color-white-5

  span
    @include body-5-normal
    color: $black-1
</style>
