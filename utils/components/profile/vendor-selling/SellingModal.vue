<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    title="adad"
    size="md"
    @hidden="$emit('hidden')"
  >
    <div class="confirm-modal-content">
      <div class="">
        {{ heading }}
      </div>
      <div
        class="mt-4 mb-5"
      >
        <p v-if="description1">{{ description1}}</p>
        <p v-if="description2">{{ description2 }}</p>
        <p v-if="description3">{{ description3 }}</p>
      </div>
      <div class="d-flex justify-content-around mt-4 mb-3">
        <Button variant="info" pill @click="handleOkClick">{{
          confirmLabel || $t('common.ok')
        }}</Button>
        <Button variant="outline-dark" pill @click="handleCancelClick">{{
          $t('common.cancel')
        }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Modal, Button } from '~/components/common'
export default {
  name: 'SellingModal',

  components: {
    Modal,
    Button
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    confirmLabel: {
      type: String,
      required: true
    },

    heading: {
      type: String,
      required: true,
    },

    description1: {
      type: String,
      default: null
    },

    description2: {
      type: String,
      default: null
    },

    description3: {
      type: String,
      default: null
    }

  },

  methods: {
    // On Cancel
    handleCancelClick() {
      this.$emit('onClear')
    },

    // On Confirm
    handleOkClick() {
      this.$emit('onConfirm')
    }
  },
}
</script>