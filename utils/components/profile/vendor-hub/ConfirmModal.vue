<template>
  <Modal
    :id="id"
    centered
    no-header-border
    no-footer-border
    hide-footer
    @hidden="$emit('confirm-hidden')"
  >
    <template #default>
      <div class="px-5">
        <b-row class="mb-4">
          <b-col md="12">
            {{saveModalBody || $t('vendor_hub.payout_method.save_changes_body') }}
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-around">
          <Button
            variant="primary"
            class="bg-blue-2"
            pill
            :disabled="modalActionLoading"
            @click="$emit('confirm-accept')"
          >{{ confirmText || $t('common.save') }}
          </Button>
          <Button
            variant="outline-dark"
            pill
            :disabled="modalActionLoading"
            @click="$bvModal.hide(id)"
          >{{ cancelText || $t('common.cancel') }}
          </Button
          >
        </b-row>
      </div>

    </template>
  </Modal>
</template>

<script>
import {Modal, Button} from '~/components/common';
export default {
  name: 'ConfirmModal',
  components: {Modal, Button},
  props: {
    modalActionLoading: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    saveModalBody: {
      type: [String, null],
      default: null
    },
    cancelText: {
      type: [String, null],
      default: null
    },
    id: {
      type: String,
      default: (Math.random() + 1).toString(36).substring(7)
    },
    confirmText: {
      type: [String, null],
      default: null
    },
  },
  watch: {
    showConfirm(val){
      if (val){
        this.$bvModal.show(this.id)
      }else {
        this.$bvModal.hide(this.id)
      }
    }
  }
}
</script>
