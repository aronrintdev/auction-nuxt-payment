<template>
  <div class="view-more-wrapper">
    <b-button variant="link" class="btn-view-more d-none d-sm-block" @click="handleClick">
      {{ label }}
    </b-button>
    <img :src="require('assets/img/home/view-more.png')" @click="handleClick" />
  </div>
</template>
<script>
export default {
  name: 'HomeSectionViewMoreButton',

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
  display: flex
  align-items: center
  margin-right: 70px

  .btn-view-more
    @include body-4-regular
    color: $color-gray-30
    margin-right: 24px

    &:hover
      color: $color-black-1

  img
    cursor: pointer

  @media (max-width: 830px)
    margin: 20px 0 0 0
    justify-content: flex-end
 
</style>
