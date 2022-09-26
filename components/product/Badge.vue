<template>
  <div class="d-flex product-badge">
    <div
      class="px-2 py-1 d-flex align-items-center"
      :class="[{ 'ml-auto': right }, `bg-${color}`]"
    >
      <span class="badge-icon">
        <img :src="icon" />
      </span>
      <h5 class="fs-14 fw-6 font-primary ml-1 mb-0">
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
<style lang="sass">
@media (max-width: 550px)
  .product-badge
    h5
      font-size: 10px
    img
      width: 14px
</style>
