<template>
  <Modal
    :id="id"
    hide-footer
    :hide-header="hideHeader"
    no-border
    @shown="onShown"
    @hidden="$emit('hidden')"
  >
    <div v-if="!mobileClass" class="message-modal-content">
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
    
    <div v-if="mobileClass" class="message-modal-content">
      <img
        v-if="icon && icon === 'tick'"
        :src="require('~/assets/img/icons/product/confirm-tick.svg')"
        @click="$emit('hidden')"
      />
      <img
        v-if="icon && icon === 'trash'"
        :src="require('~/assets/img/icons/trash-mobile.svg')"
        @click="$emit('hidden')"
      />
      <div :class="`message ${mobileClass}`" v-html="message"></div>
    </div>
  </Modal>
</template>
<script>
import Modal from '~/components/common/Modal.vue'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'AlertModal',

  components: { Modal },

  mixins: [screenSize],

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
    hideHeader: {
      type: Boolean,
      default: false
    }
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
    &.mobile
      margin-top: 25px
      font-family: $font-montserrat
      font-style: normal
      @include body-4-normal
      display: flex
      align-items: center
      text-align: center
      color: $color-black-1

  img
    margin-top: 13px
    width: 55px
    height: 55px
</style>
