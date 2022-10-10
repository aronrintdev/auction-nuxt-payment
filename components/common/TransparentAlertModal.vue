<template>
  <div class="transparent-modal">
    <b-modal id="transparent-modal" v-model="modalShow" size="sm" hide-backdrop>
      <template #modal-header>
        <span></span>
      </template>
      <template #default>
        <div class="alert-wrapper">
          <div class="background"></div>
          <div class="content d-flex align-items-center justify-content-center">
            <div class="p-3">
              <div><img :src="require('~/assets/img/icons/green-tik.svg')" alt=""/></div>
              <div class="mt-4">{{ text }}</div>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <span></span>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TransparentAlertModal',
  props: {
    text: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    autoHide: {
      type: Boolean,
      default: true
    },
    autoHideAfter: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      modalShow: this.show
    }
  },
  watch: {
    show(val) {
      this.modalShow = val
    }
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      this.$emit('show')
    })
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      this.$emit('shown')
      this.triggerAutoHide()
    })
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.$emit('hide')
    })
    this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
      this.$emit('hidden')
    })
  },
  methods: {
    triggerAutoHide() {
      if (!this.autoHide) {
        return;
      }
      setTimeout(() => {
        this.$bvModal.hide('transparent-modal')
      }, this.autoHideAfter)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.alert-wrapper
  margin: 30px
  min-height: 200px
  position: relative

  .background
    position: absolute
    width: 100%
    height: 100%
    background: $color-white-5
    backdrop-filter: blur(2px)
    opacity: .92
    border-radius: 8px
    z-index: 0

  .content
    position: absolute
    z-index: 9
    width: 100%
    height: 100%
    font-family: $font-montserrat
    @include body-13-regular


::v-deep .modal-footer, ::v-deep .modal-header
  display: none

::v-deep .modal-content
  background: none
  box-shadow: none
  border: none

::v-deep .modal-body
  padding: 0
  background: none
  box-shadow: none
  border: none
</style>
