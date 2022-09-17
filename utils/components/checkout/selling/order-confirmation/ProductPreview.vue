<template>
  <b-col md="5" class="py-5">
    <!-- Product preview carousel -->
    <b-row>
      <b-col md="2" class="d-flex justify-content-end align-items-center">
        <b-button variant="img" @click="prev">
          <b-img
            :src="
              require(`~/assets/img/shopping-cart/order-confirmation/arrow-left.svg`)
            "
          ></b-img>
        </b-button>
      </b-col>
      <b-col md="8" class="text-center">
        <b-carousel ref="productPreviewCarousel" v-model="slide">
          <b-carousel-slide
            v-for="product in combinedProducts"
            :key="product.listing_item_id"
            class="h-auto position-relative"
          >
            <template #img>
              <div class="shoe-preview">
                <b-img fluid :src="product.image"></b-img>
              </div>
              <div
                class="position-absolute logo-overlay d-flex flex-column justify-content-between pb-1"
              >
                <div class="align-self-start">
                  <b-img
                    :src="brandLogo(product.brand)"
                    class="brand-logo"
                  ></b-img>
                </div>
                <div>
                  <div class="copped-logo">COPPED</div>
                  <b-img
                    :src="require('~/assets/img/home/logo-mb.png')"
                    class="deadstock-logo"
                  ></b-img>
                </div>
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>

        <b-button id="share-button" variant="false">
          <Icon
            id="popover-share-icon"
            src="share.svg"
            width="18"
            height="18"
          />
        </b-button>
      </b-col>
      <b-col md="2" class="d-flex align-items-center">
        <b-button variant="img" @click="next">
          <b-img
            :src="
              require(`~/assets/img/shopping-cart/order-confirmation/arrow-right.svg`)
            "
          ></b-img>
        </b-button>
      </b-col> </b-row
    ><!-- End of Product preview carousel -->

    <!-- Share what you copped paragraph -->
    <b-row class="mt-5">
      <b-col md="6" offset="3" class="text-center">
        <div class="body-5-normal">
          {{ $t('shopping_cart.share_what_you_copped_text') }}
        </div>
      </b-col> </b-row
    ><!-- End of Share what you copped paragraph -->

    <b-popover
      ref="sharePopover"
      target="share-button"
      triggers="hover focus click"
      placement="bottom"
      container="body"
      custom-class="wishlist-popover"
      delay="200"
      @show="shareShow = true"
      @hidden="shareShow = false"
    >
      <ShareButton
        :url="`${shareUrl}${combinedProducts[slide].sku}`"
        :title="combinedProducts[slide].name"
      />
    </b-popover>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ShareButton from '~/components/common/ShareButton'
import { Icon } from '~/components/common'

export default {
  name: 'OrderConfirmationProductPreview',
  components: {
    ShareButton,
    Icon,
  },
  data() {
    return {
      shareUrl: process.env.APP_URL + '/shop/',
      shareShow: false,
      slide: 0,
      brands: [],
    }
  },
  computed: {
    ...mapGetters({
      products: 'order-details/getProducts',
      freeSneakersRedeemedReward: 'order-details/getFreeSneakersRedeemedReward'
    }),
    combinedProducts(vm) {
      const products = [...vm.products]

      if (vm.freeSneakersRedeemedReward) {
        products.push(vm.freeSneakersRedeemedReward)
      }

      return products
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

/* Share button styles */
#share-button
  background: $color-white-1
  border: 1px
  position: absolute
  top: -2%
  right: -2%
  width: 40px
  height: 40px
  padding: 0
  box-shadow: 0 4px 4px 0 $color-black-rgb2
  border-radius: 25px

  div
    justify-content: center

  &:hover
    background: $color-white-1
    box-shadow: 0 0.5rem 1rem $color-black-rgb3

.logo-overlay
  top: 0
  left: 0
  right: 0
  bottom: 0

.brand-logo
  height: 100px

.deadstock-logo
  height: 35px
  margin-bottom: 30px

.copped-logo
  font-family: $font-family-proxima-nova
  font-weight: $exbolder
  font-size: 60px
  letter-spacing: -2px

.shoe-preview
  background: $color-white-1

  img
    width: 65%
    margin: 80px 0 100px 0
</style>
