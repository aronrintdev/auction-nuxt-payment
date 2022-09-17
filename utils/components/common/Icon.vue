<template>
  <div
    v-b-tooltip.hover
    :class="`icon-wrapper ${hoverSrc ? 'pointer-cursor' : ''} ${
      active && 'active'
    } ${disableHover && 'no-hover'}`"
    :title="tooltipText"
    @click="handleClick"
  >
    <img
      :src="getUrl(hoverSrc)"
      :alt="altText"
      :width="width"
      :height="height"
      class="icon-hovered"
    />
    <img
      :src="getUrl(src)"
      :alt="altText"
      :width="width"
      :height="height"
      class="icon-default"
    />
  </div>
</template>
<script>
export default {
  name: 'Icon',

  props: {
    src: {
      type: String,
      required: true,
    },
    hoverSrc: {
      type: String,
      default: null,
    },
    altText: {
      type: String,
      default: null,
    },
    width: {
      type: [Number, String],
      default: 16,
    },
    height: {
      type: [Number, String],
      default: 16,
    },
    active: {
      type: Boolean,
      default: false,
    },
    tooltipText: {
      type: String,
      default: null,
    },
    disableHover: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getUrl(src) {
      try {
        if (src.includes('assets/')) {
          return require(src)
        } else {
          return require(`~/assets/img/icons/${src}`)
        }
      } catch {
        return src
      }
    },

    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
<style lang="sass" scoped>
.icon-wrapper
  display: flex
  align-items: center

  &.pointer-cursor
    cursor: pointer

    &.active, &:hover:not(.no-hover)
      .icon-hovered
        display: block

      .icon-default
        display: none

  .icon-hovered
    display: none
</style>
