<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    footer-class="justify-content-around"
    no-footer-border
  >
    <template #header>
      <h5>{{ $t('wish_lists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <div class="body-text">
        {{ $t('wish_lists.one_item_added', { list: wishList.name }) }}
      </div>
      <div class="d-flex align-items-center justify-content-center mt-2">
        <div class="img-product">
          <ProductThumb :product="product" />
        </div>
        <div class="d-flex flex-column ml-3">
          <div class="product-title">{{ product.name }}</div>
          <div class="product-color">{{ product.colorway }}</div>
        </div>
      </div>
    </template>

    <template #footer="{ hide }">
      <Button
        variant="outline-dark"
        pill
        @click="$router.push(`/profile/wish-lists?id=${wishList.id}`)"
      >
        {{ $t('wish_lists.view_list') }}
      </Button>
      <Button variant="primary" pill @click="hide">
        {{ $t('wish_lists.continue_shopping') }}
      </Button>
    </template>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'NewWishListProductModal',

  components: { Modal, Button },

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
}
</script>
