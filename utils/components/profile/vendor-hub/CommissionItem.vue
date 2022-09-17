<template>
  <div class="d-flex flex-column justify-content-center">
    <img :src="item.image" :alt="item.description" height="40">
    <div class="title text-center my-1">{{item.description}}</div>
    <div v-if="item.amount" class="amount text-center" :class="item.color">{{item.amount}}</div>
  </div>
</template>

<script>
export default {
  name: 'CommissionItem',
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
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  color: $color-black-1

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
