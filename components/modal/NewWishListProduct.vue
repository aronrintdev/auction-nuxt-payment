<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    footer-class="justify-content-around pt-0"
    no-footer-border
    @hidden="$emit('hidden')"
  >
    <template #header>
      <h5>{{ $t('wish_lists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <div class="body-text text-center">
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
    </template>

    <template #footer="{ hide }">
      <b-row class="action-btn-wrapper">
        <b-col md="12" class="d-flex flex-column align-items-center justify-content-center">
          <Button
            variant="outline-dark"
            pill
            @click="wishList ? $router.push(`/profile/wish-lists?id=${wishList}`) : ''"
          >
            {{ $t('wish_lists.view_list') }}
          </Button>
          <Button class="mt-3" variant="dark-blue" pill @click="hide">
            {{ $t('wish_lists.continue_shopping') }}
          </Button>
        </b-col>
      </b-row>
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
  methods: {
    test123() {
      console.log('hello i am hidding now.')
    }
  }
}
</script>

<style lang="sass" scoped>
.action-btn-wrapper
  button
    width: 214px
    height: 40px
</style>
