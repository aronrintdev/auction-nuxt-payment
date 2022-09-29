<template>
  <div class="view-more-wrapper d-flex align-items-center">
    <b-button
      variant="link"
      class="btn-view-more font-primary text-gray-light mr-3 d-none d-lg-flex"
      @click="handleClick"
    >
      {{ label }}
    </b-button>
    <img
      class="pointer"
      width="44px"
      :src="require('assets/img/icons/view-more-arrow.png')"
      @click="handleClick"
    />
  </div>
</template>
<script>
export default {
  name: 'ViewMoreBtn',
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$router.push(this.to)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.view-more-wrapper
  .btn-view-more
    &:hover
      color: $color-black-1
    @media (max-width: 768px)
      font-size: 12px
  img
    @media (max-width: 768px)
      width: 44px
</style>
