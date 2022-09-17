<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    size="md"
    @shown="onShown"
    @hidden="$emit('hidden')"
  >
    <div class="message-modal-content">
      <div class="mt-4">
        {{ heading }}
      </div>
      <div class="mt-4">
        {{ text }}
      </div>
      <div class="d-flex justify-content-around mt-4 mb-3">
        <Button variant="info" pill @click="handleOkClick">{{
          $t('common.edit')
        }}</Button>
        <Button variant="outline-dark" pill @click="handleCancelClick">{{
          $t('common.cancel')
        }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '~/components/common/Modal.vue'
import { Button } from '~/components/common'
export default {
  name: 'ModifyListingConfirm',

  components: {
    Modal,
    Button
  },
  
  props: {
    id: {
      type: String,
      default: 'modify-listing-confirm',
    },

    heading: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    autoHide: {
      type: Boolean,
      default: false,
    },

    autoHideTimeout: {
      type: Number,
      default: 2000,
    },
  },

  methods: {
    // Auto hide
    onShown() {
      if (this.autoHide) {
        setTimeout(() => {
          this.$bvModal.hide(this.id)
        }, this.autoHideTimeout)
      }
    },
    // On Success Click
    handleOkClick(){
      this.$emit('success')
    },

    // On cancel click
    handleCancelClick(){
      this.$bvModal.hide(this.$id)
    }
  },
}
</script>