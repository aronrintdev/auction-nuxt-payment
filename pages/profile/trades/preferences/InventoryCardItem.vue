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
      <div v-if="editRemove" class="d-flex pr-3 pt-2">
        <img :src="require('~/assets/img/trades/edit-icon.svg')" height="24" width="24" role="button">
        <img :src="require('~/assets/img/trades/minus-icon.svg')" height="24" width="24" class="ml-2" role="button">
      </div>
      <b-form-checkbox v-else v-model="selectedItems" :value="item" class="pr-2 pt-2"></b-form-checkbox>
    </b-row>
    </div>
    <div class="inventory-image d-flex justify-content-center mx-auto align-items-center">
      <div class="thumb-wrapper">
      <img src="https://api.deadstock.co/prod/api/sneakers/M992NK1/image" alt="No Image" class="invent-image h-auto">
    </div>
    </div>
    <div class="card-text-item pt-3 pl-2">
      <div class="invent-item-name">Yeezy 350 V2 (2020)</div>   <!-- to do just frontend .....  -->
      <div class="invent-item-color">Sesame</div>
      <div class="invent-item-color">{{$t('trades.box_condition')}}: Good</div>
    </div>
  </div>
  </div>
</template>

<script>
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
