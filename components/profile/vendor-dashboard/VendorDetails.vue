<template>
  <SideOverlay :is-open="detailsMenu" @closed="$emit('closed')" @opened="$emit('opened')">
    <div class="d-flex flex-column h-100">
      <div class="menu-header">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="flex-grow-1 menu-body">

      </div>
    </div>
  </SideOverlay>
</template>

<script>
import SideOverlay from '~/components/common/SideOverlay';

export default {
  name: 'VendorDetails',
  components: {SideOverlay},
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detailsMenu: false
    }
  },
  watch: {
    isOpen(val) {
      this.detailsMenu = val
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.menu-header
  background-color: $color-black-1
  height: 80px

.menu-body
  background-color: $color-white-12

</style>
