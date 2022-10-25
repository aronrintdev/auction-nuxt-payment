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
      <div :style="messageStyle" class="message" v-html="message"></div>
      <img
        v-if="icon && icon === 'tick'"
        :src="require('~/assets/img/icons/product/confirm-tick.svg')"
      />
      <img
        v-if="icon && icon === 'trash'"
        :src="require('~/assets/img/icons/trash-mobile.svg')"
      />
    </div>

    <div 
      v-if="mobileClass" 
      class="message-modal-content" 
    >
      <div>
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
        <img
          v-if="icon && icon === 'success-tick'"
          :src="require('~/assets/img/icons/product/success-tick.svg')"
          @click="$emit('hidden')"
        />
        <img
          v-if="icon && icon === 'trash-red-bg'"
          :src="require('~/assets/img/icons/trash-mobile.svg')"
          @click="$emit('hidden')"
        />
      </div>
      <div
        :class="`message ${mobileClass} ${
          mobileClass &&
          'd-flex align-items-center text-center justify-content-center'
        }`"
        v-html="message"
        :style="messageStyle" 
      ></div>
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
      default: false,
    },
    messageStyle: {
      type: Object,
      default: () => {}
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
    &.mobile
      margin-top: 25px
      font-family: $font-montserrat
      font-style: normal
      @include body-4-normal
      color: $color-black-1

  img
    margin-top: 13px
    width: 55px
    height: 55px
</style>
