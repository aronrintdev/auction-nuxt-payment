<template>
  <div class="d-flex flex-column justify-content-center">
    <img :src="item.image" :alt="item.description" :height="mobileClass.length ? 20 : 40">
    <div class="text-center my-1" :class="mobileClass ? 'body-6-bold': 'body-5-bold'">{{item.description}}</div>
    <div v-if="item.amount" class="amount text-center" :class="item.color">{{item.amount}}</div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'CommissionItem',
  mixins: [screenSize],
  props: {
    /**
     * @example
     * {
     *   image: string,
     *   description: string,
     *   amount: string,
     *  color: enum(blue, orange),
     * }
     */
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title
  font-family: $font-family-montserrat

.amount
  @include body-3
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  letter-spacing: 0.1em

.amount.blue
  color: $color-blue-25

.amount.orange
  color: $color-red-16

</style>
