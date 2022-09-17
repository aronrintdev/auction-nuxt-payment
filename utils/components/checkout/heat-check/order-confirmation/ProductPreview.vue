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
        <b-carousel ref="productPreviewCarousel">
          <b-carousel-slide class="h-auto">
            <template #img>
              <b-img
                :src="
                  require(`~/assets/img/shopping-cart/order-confirmation/product-preview-1.png`)
                "
              ></b-img>
            </template>
          </b-carousel-slide>
          <b-carousel-slide class="h-auto">
            <template #img>
              <b-img
                :src="
                  require(`~/assets/img/shopping-cart/order-confirmation/product-preview-1.png`)
                "
              ></b-img>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-button id="share-button" variant="false">
          <b-img
            :src="
              require(`~/assets/img/shopping-cart/order-confirmation/share.svg`)
            "
          ></b-img>
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
  </b-col>
</template>

<script>
export default {
  name: 'OrderConfirmationProductPreview',
  methods: {
    prev() {
      this.$refs.productPreviewCarousel.prev()
    },
    next() {
      this.$refs.productPreviewCarousel.next()
    },
  },
}
</script>
