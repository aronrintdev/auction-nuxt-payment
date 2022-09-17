<template>
  <NuxtLink
    v-if="!menuItem.isSpacing"
    :to="menuItem.href"
    class="d-flex mb-3 align-items-center pl-0 "
    :class="{'justify-content-center': collapsed}"
  >
    <img
      v-b-tooltip.hover
      :title="collapsed?menuItem.label: ''"
      :src="menuItemIcon"
      :alt="menuItem.label"
      :class="{'mr-4': !collapsed}"
      width="24px"
      height="24px"
    />
    <p
      v-if="!collapsed"
      class="mb-0 sidebar-menu-item-text"
      :class="menuItemTextClass"
    >
      {{ menuItem.label }}
    </p>
  </NuxtLink>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    currentRouteName: {
      type: String,
      default: ''
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    menuItem: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    menuItemIcon() {
      return this.currentRouteName.includes(this.menuItem.route)
        ? this.menuItem.iconActive
        : this.menuItem.icon
    },
    menuItemTextClass() {
      return this.currentRouteName.includes(this.menuItem.route) ? 'active-text' : ''
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.sidebar-menu-item-text
  @include body-5
  color: $color-gray-47
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.active-text
  color: $color-black-1
  font-weight: $medium
</style>
