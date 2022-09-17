<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
  >
    <div class="confirm-modal-content">
      <div class="message">
        {{ message }}
      </div>
      <div class="d-flex justify-content-around mt-4 mb-3">
        <Button variant="info" pill @click="handleOkClick">{{
          confirmLabel || $t('common.ok')
        }}</Button>
        <Button variant="outline-dark" pill @click="handleCancelClick">{{
          cancelLabel || $t('common.cancel')
        }}</Button>
      </div>
    </div>
  </Modal>
</template>
<script>
import { Button, Modal } from '~/components/common'

export default {
  name: 'ConfirmModal',

  components: { Button, Modal },

  props: {
    id: {
      type: String,
      default: 'confirm-modal',
    },
    message: {
      type: String,
      default: '',
    },
    confirmLabel: {
      type: String,
      default: null,
    },
    cancelLabel: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleOkClick() {
      this.$bvModal.hide(this.id)
      this.$emit('confirm')
    },

    handleCancelClick() {
      this.$bvModal.hide(this.id)
      this.$emit('cancel')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.confirm-modal-content::v-deep
  text-align: center

  .message
    @include body-3-regular
    color: $color-black-1
    text-align: center
    width: 300px
    margin-left: auto
    margin-right: auto
</style>
