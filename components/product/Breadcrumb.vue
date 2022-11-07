<template>
  <div class="container mx-sm-0">
    <b-breadcrumb :items="items"></b-breadcrumb>
  </div>
</template>
<script>
import { capitalizeFirstLetter } from '~/utils/string'

export default {
  name: 'ProductBreadcrumb',

  props: {
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    items() {
      return [
        {
          text: capitalizeFirstLetter(this.category),
          to: {
            path: '/browse',
            query: { category: this.category },
          },
        },
        {
          text: capitalizeFirstLetter(this.brand),
          to: {
            path: '/browse',
            query: {
              category: this.category,
              brand: this.brand,
            },
          },
        },
        {
          text: capitalizeFirstLetter(this.name),
        },
      ]
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container
  .breadcrumb
    background: none
    margin: 0
    padding: 0

    .breadcrumb-item
      font-size: 13px
      line-height: 22px
      color: $color-black-5
      font-weight: 600
      padding-left: 13px

      a
        color: $color-gray-4

      &:before
        color: $color-gray-6
        line-height: 22px
        font-size: 22px
        font-weight: 100
        padding-right: 13px
</style>
