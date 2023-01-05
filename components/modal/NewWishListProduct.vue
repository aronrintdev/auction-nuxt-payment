<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    :rounded="true"
    no-header-border
    header-class="py-0"
    bodyClass="pt-3"
    footerClass="border-0"
    @hidden="$emit('hidden')"
  >
    <template #header>
      <h5 class="header px-5">{{ $t('wish_lists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <div class="px-5">
        <div class="message_text">
        {{
          $t('wish_lists.one_item_added', {
            list: wishList ? wishList.name : 'Wishlist',
          })
        }}
      </div>
        <div class="d-flex align-items-center justify-content-center mt-2">
        <div class="img-product">
          <ProductThumb :product="product" :src="product.image" />
        </div>
        <div class="d-flex flex-column ml-3">
          <div class="product-title">{{ name }}</div>
          <div class="product-color">{{ color }}</div>
        </div>
      </div>
      </div>
    </template>

    <template #footer="{ hide }">
      <div class="action-btn-wrapper d-flex justify-content-between flex-grow-1 w-100 px-5">
        <Button variant="dark-blue px-0" pill @click="hide">
          {{ $t('wish_lists.keep_shopping') }}
        </Button>
        <Button
          variant="outline-dark"
          pill
          @click="wishList ? $router.push(`/profile/wish-lists?id=${wishList}`) : ''"
        >
          {{ $t('wish_lists.view_list') }}
        </Button>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'
import Button from '~/components/common/Button.vue'
import ProductThumb from '~/components/product/Thumb'

export default {
  name: 'NewWishListProductModal',
  components: { Modal, ProductThumb, Button },
  props: {
    id: {
      type: String,
      default: 'new-list-product-modal',
    },
    product: {
      type: Object,
      required: true,
    },
    wishList: {
      type: Object,
      default: null,
    },
  },
  computed: {
    name(vm) {
      return vm.product.name.substr(0, 22)
    },
    color(vm) {
      return vm.product.colorway ? vm.product.colorway.substr(0, 16) : vm.product.colorWay.substr(0, 16)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.header
  padding-top: 27px

.message_text
  color: $color-gray-5
  font-family: $font-sf-pro-text


.action-btn-wrapper
  ::v-deep.btn
    width: 160px

.product-title
  font-family: $font-family-sf-pro-display
</style>
