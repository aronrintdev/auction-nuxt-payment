<template>
  <div id="bottom-sheet-wrapper" class="bottom-sheet">
    <b-popover
      ref="bottomSheetBackdrop"
      :target="id"
      placement="bottom"
      :custom-class="`bottom-sheet-backdrop-popover`"
      container="bottom-sheet-wrapper"
      :show.sync="bottomSheetShowBackdrop"
      :delay="0"
      :boundary-padding="0"
    >
      <div class="bottom-sheet-backdrop" @click="closeBottomSheet"></div>
    </b-popover>
    <b-popover
      ref="bottomSheet"
      :target="id"
      triggers="focus"
      placement="bottom"
      :custom-class="`bottom-sheet-popover shadow border`"
      container="bottom-sheet-wrapper"
      :show.sync="bottomSheetShow"
      :delay="0"
      :boundary-padding="0"
      @show="onShow"
      @hidden="onHidden"
    >
      <div class="bottom_sheet_body_wrapper">
        <div class="bottom-sheet-header p-2 pb-3 mb-3 mt-1 border-bottom">
          <div
            class="dash position-relative"
            @click="bottomSheetShow = false"
          ></div>
          <div class="font-secondary fs-18 fw-7 text-center mt-2">
            Filter By
          </div>
        </div>
        <div class="bottom_sheet_body" :class="{ 'no-footer': hideFooter }">
          <slot></slot>
        </div>
        <div
          class="bottom-sheet-footer align-items-center border-top"
          :class="[hideFooter ? 'd-none' : 'd-flex']"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </b-popover>
  </div>
</template>
<script>
export default {
  name: 'BottomSheet',
  props: {
    id: {
      type: String,
      required: true,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bottomSheetShowBackdrop: false,
      bottomSheetShow: false,
    }
  },
  methods: {
    closeBottomSheet() {
      this.bottomSheetShowBackdrop = false
      this.bottomSheetShow = false
    },
    onSelect(item) {
      if (item) {
        this.$emit('select', item)
        this.$emit('input', item.value)
        this.dropdownShow = false
      }
    },
    onShow() {
      this.bottomSheetShowBackdrop = true
    },
    onHidden() {
      this.bottomSheetShowBackdrop = false
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.b-popover::v-deep
  .popover-body
    padding: 0 !important
.bottom-sheet-backdrop-popover
  position: fixed !important
  top: 0
  left: 0
  width: 100% !important
  background: rgba(0, 0, 0, 0.25)
  height: 100vh !important
  overflow: hidden !important
  transform: translate(0, 0) !important
  max-width: 100% !important
  z-index: 1098 !important
  margin: 0 !important
  border-radius: 0 !important
  backdrop-filter: blur(1px)
  .arrow
    display: none !important
.bottom-sheet-popover
  transform: none !important
  position: fixed !important
  top: unset !important
  bottom: 0
  width: 100% !important
  max-width: 100% !important
  height: fit-content !important
  max-height: calc(100vh - 46px)
  border: none
  border-radius: 20px 20px 0 0 !important
  overflow: hidden
  margin: 0
  z-index: 1099 !important
  .arrow
    display: none !important
  .dash::after
    content: ''
    position: absolute
    width: 36px
    height: 4px
    background: #C4C4C4
    left: 50%
    border-radius: 5px
    transform: translate(-50%)
  .bottom_sheet_body
    height: calc(100vh - 220px)
    overflow: auto
    padding: 0 10px
    padding-bottom: 10px
    &.no-footer
      height: calc( 100vh - 128px )
  .bottom-sheet-footer
    height: 92px
    width: 100% !important
    .btn
      width: 134px
      .apply-btn
        background-color: $color-blue-20
</style>
