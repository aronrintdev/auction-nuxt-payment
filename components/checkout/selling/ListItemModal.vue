<template>
  <!-- List Item Modal -->
  <b-modal
    id="shopping-cart-list-item-modal"
    centered
    hide-footer
    hide-header
    content-class="radius-3"
    body-class="py-0"
    size="lg"
  >
    <b-container fluid>
      <b-row>
        <b-col md="4" class="py-5 d-flex flex-column justify-content-center align-items-center">
          <b-row class="thumbnail-wrapper active">
            <b-img :src="getImageUrl" class="mb-2 custom-thumbnail" @click="handleClick"></b-img>
          </b-row>
        </b-col>
        <b-col md="7" class="py-5 pl-5 border-left d-flex justify-content-center align-items-center">
          <b-row>
            <b-col md="12">
              <b-img block center :src="getImageUrl" class="img-preview"></b-img>
              <div class="body-4-bold mt-3">{{ product.name }}</div>
              <div class="body-4-normal text-gray-6 mt-2">{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ product.colorWay }}</div>
              <div class="body-4-bold mt-2">&dollar;{{ product.price | formatPrice }}</div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="1">
          <b-button class="float-right mt-3" variant="img" @click="$bvModal.hide('shopping-cart-list-item-modal')">
            <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')"></b-img>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal
  ><!-- End of List Item Modal -->
</template>

<script>
export default {
  name: 'ListItemModal',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getImageUrl(vm) {
      try {
        return vm.product.image
      } catch (error) {
        return require('~/assets/img/shopping-cart/product-thumbnail.png')
      }
    }
  },
  methods: {
    handleClick(event) {
      const elements = document.getElementsByClassName('thumbnail-wrapper active')
      elements.forEach(element => {
        $(element).removeClass('active')
      })
      $(event.target).parent().addClass('active')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
/* Image preview styles */
.img-preview
  width: 250px
  height: 150px
  object-fit: cover
/* Active item indicator (dot) styles */
.thumbnail-wrapper
  position: relative
  &.active::after
    content: ''
    position: absolute
    top: 50%
    right: -25%
    width: 8px
    height: 8px
    border-radius: 2rem
    border: 1px solid $color-gray-23
    background: $color-gray-23
</style>
