<template>
  <div ref="side-overlay" class="side-overlay" @click.self="close">
    <div ref="menu" :class="position" class="menu">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideOverlay',
  props: {
    isOpen: {
      type: Boolean,
      default: false// right or left
    },
    position: {
      type: String,
      default: 'right' // right or left
    },
    maxWidth: {
      type: String,
      default: '500px'
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.open()
      } else {
        this.close()
      }
    }
  },
  mounted() {
    if (this.isOpen) {
      this.open()
    }
  },
  methods: {
    open() {
      this.$refs['side-overlay'].style.width = '100%';
      this.$refs.menu.style.width = this.maxWidth;
      this.$emit('opened')
    },
    close() {
      this.$refs['side-overlay'].style.width = '0';
      this.$refs.menu.style.width = '0';
      this.$emit('closed')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.side-overlay
  height: 92%
  width: 0
  position: absolute
  top: 104px
  left: 0
  z-index: 1000
  background: rgba($color-black-1, 0.25)
  backdrop-filter: blur(3px)
  overflow-x: hidden
  transition: 0.1s

  .menu
    height: 100%
    z-index: 1001
    top: 0
    overflow-x: hidden
    position: fixed

    &.right
      right: 0

    &.left
      left: 0


</style>
