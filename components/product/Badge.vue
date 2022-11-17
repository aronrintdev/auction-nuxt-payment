<template>
  <div class="d-flex product-badge-wrapper">
    <div
      class="d-flex align-items-center product-badge"
      :class="[{ 'ml-auto': right }, `bg-${color}`]"
    >
      <span class="badge-icon">
        <img :src="icon" />
      </span>
      <h5 class="fs-14 fw-6 font-primary ml-1 mb-0 text-white">
        {{ title }}
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductBadge',
  props: {
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    right: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'black',
    },
  },
}
</script>
<style lang="sass" scoped>
.product-badge
  padding: 7px 12px
@media (max-width: 550px)
  .product-badge-wrapper
      h5
        font-size: 10px
      img
        width: 14px
</style>
