<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    title="adad"
    size="lg"
    @hidden="$emit('hidden')"
  >
    <div class="clarification-modal-content">
      <div class="clarification-heading d-flex text-center">
        {{ heading }}
      </div>
      <span class="clarification-description d-flex text-center mt-3">{{
        description
      }}</span>
      <div class="similar-products d-flex justify-content-center my-5">
        <template v-if="products && products.length">
          <!-- If has products -->
          <div class="row">
          <template v-for="(product, index) in products">
            <div :key="index" class="col-md-6 item-wrapper mt-2">
              <div class="item border text-left m-auto">
                <div
                  id="product-card-container"
                  class="product-card-wrapper text-left mx-auto"
                >
                  <div class="product-image mx-auto">
                    <div class="thumb-wrapper">
                      <img
                        :src="
                          product.image ||
                          fallbackImg
                        "
                        alt="product-image"
                        class="product-img-width"
                      />
                    </div>
                    <div class="overlay"></div>
                  </div>
                  <div class="product-name">
                    {{ product.name }}
                  </div>
                  <div class="product-color text-muted">
                    {{ product.colorway }}
                  </div>
                  <div class="product-sku mt-2 text-muted text-capitalize">
                    <span
                      >{{ $t('createlisting.size_type') }}&colon;
                      {{ product.size_type }}</span
                    >
                  </div>
                </div>
              </div>
              <b-button
                variant="outline-clarification"
                pill
                class="border-2 mt-3"
                @click="showDetails(product.id)"
              >
                <span class="btn-text"
                  >{{ $t('createlisting.i_have_this_one') }}
                  <img
                    :src="require('~/assets/img/icons/forward-icon-blue.svg')"
                    class="img-fluid img-forward"
                  />
                </span>
              </b-button>
            </div>
          </template>
          </div>
          <!-- ./If has products -->
        </template>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Modal } from '~/components/common'

export default {
  name: 'ClarificationScreen',

  components: {
    Modal,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      fallbackImg: `${process.env.PRODUCT_FALLBACK_IMG_URL}${process.env.PRODUCT_IMG_WIDTH}`
    }
  },

  methods: {
    // On item click
    showDetails(val) {
      this.$emit('showDetailPage', val)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.clarification-modal-content
  .clarification-heading
    @include body-1-medium
    font-style: normal
    color: $color-black-1
  .clarification-description
    @include body-3-medium
    font-style: normal
    color: $color-gray-5
  .similar-products
    .item
      width: 213px
    .product-card-wrapper
      max-width: 213px
    .product-image
      position: relative
      height: 240px
      padding: 0 20px
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      max-width: 100%
      height: auto
      width: 100%
    .thumb-wrapper
      position: relative
    .thumb-wrapper img
      width: 100%
    .owl-carousel .owl-item img
      display: block
      width: 100%
    .overlay
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      background: $color-gray-4
      opacity: 0.1
      transition: 0.5s ease
    .product-card-wrapper .product-name
      @include body-8-medium
      color: $color-black-1
      margin-top: 13px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      padding: 0 7px
    .product-card-wrapper .product-color
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      padding: 0 7px
    .product-card-wrapper .product-sku
      @include body-4-normal
      color: $color-black-1
      margin-top: 7px
      padding: 0 7px
    .overlay
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      background: $color-gray-4
      opacity: 0.1
      transition: 0.5s ease
    .btn-outline-clarification
      box-sizing: border-box
      width: 202px
      left: 634px
      top: 663px
      background: $color-white-1
      border: 0.5px solid $color-blue-1
      border-radius: 46px
      .btn-text
        width: 101px
        height: 19px
        left: 668px
        top: 670px
        font-style: normal
        @include body-4-medium
        color: $color-blue-1
        .img-forward
          box-sizing: border-box
          width: 25px
          left: 783px
          top: 679px
@media (max-width: 425px)
  .clarification-modal-content
    .clarification-description
      @include body-8-medium

</style>
