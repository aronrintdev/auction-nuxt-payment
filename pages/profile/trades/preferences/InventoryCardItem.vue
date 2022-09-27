<template>
  <div class="d-flex flex-wrap justify-content-start">
      <div v-for="(item) in items" :key="'preference-inventory' + item.id" class="invent-item mr-45">
          <div class="position-absolute size-cont">
              <b-row class="justify-content-between">
                  <div class="size text-center ml-3 mt-2">
                      {{$t('trades.size')}} {{item.size.size}}
                  </div>
                  <b-form-checkbox :checked="selectedItems" :value="item.id" class="pr-2 pt-2" @change="changeSelection(item.id)"></b-form-checkbox>
              </b-row>
          </div>
          <div class="inventory-image d-flex justify-content-center mx-auto align-items-center">
              <div class="thumb-wrapper">
                  <img :src="item.product.image" class="invent-image h-auto">
              </div>
          </div>
          <div class="card-text-item pt-3 pl-2">
              <div class="invent-item-name">{{item.product.name}}</div>
              <div class="invent-item-color">{{item.product.colorway}}</div>
              <div class="invent-item-color">{{$t('trades.box_condition')}}: {{item.packaging_condition.name}}</div>
          </div>
      </div>
      <div v-if="!items.length">
          <p class="text-center">{{$t('trades.preferences.no_inventory_found')}}</p>
      </div>
  </div>
</template>

<script>
import {
  PUBLIC_INVENTORY_STATUS
} from '~/static/constants/trades'
export default {
  name: 'InventoryCardItem',
  props:{
      items:{
          type: Array,
          default: () => [],
      },
      selectedItems: {
          type: Array,
          default: () => []
      }
  },
  data(){
      return {
          PUBLIC_INVENTORY_STATUS
      }
  },
  methods: {
      changeSelection(itemId){
          this.$emit('changePublicInventories', itemId)
      }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.invent-item
  background: $color-white-1
  border: 1px solid $light-gray-2
  height: 281px
  width: 213px
.size
  border: 1px solid $light-gray-2
  border-radius: 2px
  color: $color-black-1
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-regular
  width: 88px
  height: 20px
.inventory-image
  position: relative
  height: 201px
  padding: 0 20px
  .thumb-wrapper
      position: relative
  img
      width: 100%
.card-text-item
  height: 78px
  background: $color-gray-1
.size-cont
  z-index: 1000
  width: 213px
.invent-item-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-medium
  color: $color-black-1
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 200px
.invent-item-color
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-10-regular
  color: $color-gray-5
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 200px
.mr-45
  margin-right: 40px
</style>
