<template>
  <div class="view-more-wrapper d-flex align-items-center">
    <b-button
      variant="link"
      class="btn-view-more font-primary text-gray-light mr-4 d-none d-md-flex"
      @click="handleClick"
    >
      {{ label }}
    </b-button>
    <img
      class="pointer"
      :src="require('assets/img/home/view-more.png')"
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
</style>
