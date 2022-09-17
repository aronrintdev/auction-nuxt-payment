<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    @shown="onShown"
    @hidden="$emit('hidden')"
  >
    <div class="message-modal-content">
      <div class="message" v-html="message"></div>
      <img
        v-if="icon && icon === 'tick'"
        :src="require('~/assets/img/icons/product/confirm-tick.svg')"
      />
      <img
        v-if="icon && icon === 'trash'"
        :src="require('~/assets/img/icons/product/trash.svg')"
      />
    </div>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'

export default {
  name: 'AlertModal',

  components: { Modal },

  props: {
    id: {
      type: String,
      default: 'alert-modal',
    },
    message: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
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
    onShown() {
      if (this.autoHide) {
        setTimeout(() => {
          this.$bvModal.hide(this.id)
        }, this.autoHideTimeout)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.message-modal-content::v-deep
  text-align: center

  .message
    @include body-3-regular
    color: $color-black-1
    text-align: center
    width: 300px
    margin-left: auto
    margin-right: auto

  img
    margin-top: 13px
    width: 55px
    height: 55px
</style>
