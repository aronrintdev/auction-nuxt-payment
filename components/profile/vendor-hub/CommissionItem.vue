<template>
  <div class="d-flex flex-row flex-sm-column justify-sm-content-center"
       :class="{'m-2 px-1 py-1 mobile-box': mobileClass.length}">
    <div :class="mobileClass.length ? 'circle rounded-circle' : 'text-center'">
      <img :src="item.image" :alt="item.description" :height="mobileClass ? 30 : 40" :width="mobileClass ? 30 : 'auto'">
    </div>
    <div class="flex-column flex-sm-row pl-3 pl-sm-0">
      <div class="text-sm-center my-1" :class="mobileClass ? 'body-6-medium text-nowrap text-truncate d-flex': 'body-5-normal title'">
        {{
          mobileClass ? item.description
            .replace('Fulfilled', '')
            .replace('Total Commission Due', 'Commission Due')
            .replace('Total Commission Paid', 'Paid Commission') : item.description
        }}</div>
      <div v-if="item.amount" class="amount text-sm-center"
           :class="[item.color, {'body-3-medium': !mobileClass}, {'body-9-normal': mobileClass}]">
        {{item.amount}}
      </div>
    </div>
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
  // @include body-3
  font-family: $font-family-montserrat
  font-style: normal
  // font-weight: $medium
  letter-spacing: 0.1em

.amount.blue
  color: $color-blue-25

.amount.orange
  color: $color-red-16

.mobile-box
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15)
  border-radius: 16px
  height: 45px
  max-height: 45px

.circle
  width: 32px
  height: 32px
  border: solid 1px $color-blue-20
  display: flex
  align-items: center
  flex-wrap: wrap
  justify-content: center
  img
    height: 16px

</style>
