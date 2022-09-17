<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    size="lg"
    @shown="onShown"
    @hidden="$emit('hidden')"
  >
    <div class="message-modal-content">
      <img :src="require('~/assets/img/icons/product/confirm-tick.svg')" />
      <div class="mt-4">
        {{ $t('inventory.message.thanks_for_suggestion') }}
      </div>
      <div class="mt-4 info p-2">
        <div v-if="name">{{ name }}</div>
        <div v-if="sku">{{ `${$t('common.sku')}:${sku}` }}</div>
      </div>
      <div
        class="mt-4 mb-5"
        v-html="$t('inventory.message.after_suggestion_info')"
      ></div>
    </div>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'

export default {
  name: 'NewProductSuggestedModal',

  components: { Modal },

  props: {
    id: {
      type: String,
      default: 'new-product-suggested-modal',
    },
    name: {
      type: String,
      default: null,
    },
    sku: {
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
  @include body-3-regular
  color: $color-black-1
  text-align: center

  .info
    @include body-5-medium
    color: $color-black-4
    background-color: $color-white-5
    border-radius: 6px
    text-align: center
    width: 310px
    margin-left: auto
    margin-right: auto

  img
    width: 48px
    height: 48px
</style>
