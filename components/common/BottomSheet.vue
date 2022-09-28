<template>
  <div :class="`bottom-sheet-wrapper ${display}`">
    <div class="bottom-sheet border">
      <div class="text-center border-bottom">
        <svg width="36" height="4" viewBox="0 0 36 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 2C0 0.895431 0.895431 0 2 0H34C35.1046 0 36 0.895431 36 2C36 3.10457 35.1046 4 34 4H2C0.895431 4 0 3.10457 0 2Z"
            fill="#C4C4C4"/>
        </svg>
        <div class="title pb-1">{{ title }}</div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      display: this.show ? 'bs-show' : 'bs-hide'
    }
  },
  watch: {
    show(val) {
      this.display = val ? 'bs-show' : 'bs-hide'
    }
  }
}
</script>

<style scoped lang="sass">

.bottom-sheet-wrapper
  position: absolute
  bottom: 0
  left: 0
  right: 0
  z-index: 9999
  background-color: rgba(0, 0, 0, 0.65)
  opacity: 0
  transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 0ms

  .bottom-sheet
    position: fixed
    bottom: 0
    width: 100%
    background: #fff
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.22), 0px 14px 56px rgba(0, 0, 0, 0.25)
    padding: 5px 0
    border-radius: 20px 20px 0 0

    .title
      font-size: 17px
      font-weight: bold

.bottom-sheet-wrapper.bs-show
  position: fixed
  top: 0
  opacity: 1

  .bottom-sheet
    transform: translate(0, 0)
    transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 100ms

.bottom-sheet-wrapper.bs-hide
  .bottom-sheet
    transform: translate(0, 100%)
    transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 100ms
</style>
