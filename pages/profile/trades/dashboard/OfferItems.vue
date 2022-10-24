<template>
  <div class="product-card">
    <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
    <b-row class="justify-content-between" >
      <b-col v-for="(item) in offerItems" :key="'offer-item-list-' + item.id" class="offer-item text-center p-0" :class="`${marginItems}`">
        <b-col class="item-heading pt-2 pb-2 align-items-center">
          {{item.inventory ? item.inventory.product.name : item.product.name}}
        </b-col>
        <b-col>
          <img v-if="item.inventory" :src="item.inventory.product | getProductImageUrl" class="offer-item-image" width="100px" />
          <img v-else :src="item.product | getProductImageUrl" class="offer-item-image" width="100px" />
        </b-col>
        <div class="offer-item-text">{{$t('trades.box_condition')}}: {{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
        <div class="offer-item-text">{{item.inventory ? item.inventory.product.colorway : item.product.colorway}}</div>
        <div class="offer-item-text">{{$t('trades.size')}} {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'OfferItems',
  props:{
    marginItems: {
      type: String,
      default: 'mr-5',
    },
    heading: {
      type: String,
      default: null,
    },
    offerItems: {
      type: Array,
      required: true,
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.product-card
    //width : 350px
.offer-item
    width: 247px
    height: 230px
    background: $color-white-1
    box-shadow: 0 2px 4px $drop-shadow1
    border-radius: 8px
.item-heading
    background: $color-gray-1
    border-radius: 9px 9px 0 0
    height: 55px
    overflow: hidden
.offer-item-image
    width: 100px
    height: auto
.offer-item-text
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-5-regular
    color: $color-gray-4
.item-heading-text
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-13-normal
    color: $color-gray-47
</style>
