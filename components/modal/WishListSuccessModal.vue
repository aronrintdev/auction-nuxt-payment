<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    footer-class="justify-content-around pt-0"
    no-footer-border
    :hide-footer="true"
    headerClass="p-3 m-0 border-0"
    no-header-border
    @hidden="$emit('hidden')"
  >
    <template #header>
    </template>

    <template #default="{}">
      <div class="text-center">
        {{
          $t('wish_lists.item_added_success', {
            item: productName,
            list: listName,
          })
        }}
        <div class="d-flex justify-content-center mt-3">
          <img :src="require('~/assets/img/profile/wishlist/success.svg')" />
        </div>
      </div>
    </template>

    <template #footer></template>

  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'

export default {
  name: 'WishListSuccessModal',
  components: { Modal },
  props: {
    id: {
      type: String,
      default: 'wishlist-success-modal',
    },
    productName: {
      type: String,
      required: true,
    },
    listName: {
      type: String,
      default: null,
    },
  },
}
</script>
