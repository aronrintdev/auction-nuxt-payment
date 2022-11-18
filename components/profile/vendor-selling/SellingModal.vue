<template>
  <Modal
      :id="id"
      hide-footer
      modal-class="confirm-modal"
      :hide-backdrop="true"
      no-border
      size="md"
      @hidden="$emit('hidden')"
  >
    <div class="confirm-modal-content d-flex flex-column justify-content-center padding-web">
      <div class="body-3-regular font-secondary">
        {{ heading }}
      </div>
      <div
          class="mt-2"
      >
        <p v-if="description1">{{ description1 }}</p>
        <p v-if="description2">{{ description2 }}</p>
        <p v-if="description3">{{ description3 }}</p>
      </div>
      <div class="d-flex  mt-41">
        <Button variant="dark-blue" pill @click="handleOkClick" class="modal-btn mr-43">{{
          confirmLabel || $t('common.ok')
        }}</Button>
        <Button variant="outline-dark" pill @click="handleCancelClick" class="modal-btn">{{
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
<style lang="sass" scoped>
::v-deep.modal-btn
  &.btn
    width: 147px

.mr-43
  margin-right: 43px

.mt-41
  margin-top: 41px

.padding-web
  padding: 0 24px 42px
</style>
