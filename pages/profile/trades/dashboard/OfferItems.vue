<template>
  <div>
    <div v-if="width <= 500">
      <div class="product-card">
        <div v-if="heading" class="item-heading-text pb-2 pl-2">{{heading}}</div>
        <div class="d-flex justify-content-center align-content-center" >
          <div v-for="(item) in offerItems" :key="'offer-item-list-' + item.id" class="single-div m-2">
            <div class="offer-item-small">
              <img v-if="item.inventory" :src="item.inventory.product | getProductImageUrl" class="offer-item-image" width="100px" />
              <img v-else :src="item.product | getProductImageUrl" class="offer-item-image-small" />
            </div>
            <div class="inner-section">
              <div class="item-name align-items-center mt-2">
                {{item.inventory ? item.inventory.product.name : item.product.name}}
              </div>
              <div class="offer-item-text-small">Box : {{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
              <div class="offer-item-text-small">{{item.inventory ? item.inventory.product.colorway : item.product.colorway}}</div>
              <div class="offer-item-text-small">Size {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="product-card" v-else>
      <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
      <div class="d-flex justify-content-between">
        <b-col 
          v-for="(item) in offerItems" :key="'offer-item-list-' + item.id" 
          :class="`${marginItems}`"
        >
          <b-col>
            <img v-if="item.inventory" :src="item.inventory.product | getProductImageUrl" class="offer-item-image" width="100px" />
            <img v-else :src="item.product | getProductImageUrl" class="offer-item-image" width="100px" />
          </b-col>
          <div class="offer-item-name">
            {{ item.inventory ? item.inventory.product.name : item.product.name }}
          </div>
          <div class="mt-1 offer-box">
            {{ $t('trades.trade_arena.box') }}: 
            {{ item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name }}
          </div>
          <div class="mt-1 offer-size">
            {{ $t('trades.size') }} {{ item.inventory ? item.inventory.size.size : item.size.size }}
          </div>
        </b-col>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'OfferItems',
  data(){
    return {
      width:'',
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
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

.offer-item-name, .offer-size, .offer-box
  font-family: $font-family-sf-pro-display

.offer-item-name
  @include body-10-medium
  color: $color-black-1

.offer-size
  @include body-9-medium
  color: $color-black-1

.offer-box
  @include body-10-medium
  color: $color-gray-5

.offer-item-small
  width: 80px
  background: $color-white-1
  border-radius: 8px
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
.item-name
  width: 90px
  height: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 11px
  line-height: 13px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.offer-item-image
    width: 100px
    height: auto
.offer-item-image-small
   width: 80px
.offer-item-text
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-5-regular
    color: $color-gray-4
.offer-item-text-small
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: 500
  font-size: 11px
  color: $color-gray-5
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 50px

.item-heading-text
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-13-normal
    color: $color-gray-47
.single-div
  width: 100px
  height: 161px
</style>
