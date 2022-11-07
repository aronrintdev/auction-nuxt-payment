<template>
    <div class="d-flex flex-wrap justify-content-start">
      <div v-if="width <=500">
        <b-row class="inventory-items-small">
        <b-col sm="6" v-for="(item) in items" :key="'preference-inventory' + item.id" class="invent-item-small ml-2 mr-2 mb-2 p-0">
            <div class="d-flex mt-2">
              <div class="size-small ml-2">
                {{$t('trades.size')}} {{item.size.size}}
              </div>
              <div class="ml-5">
                <b-form-checkbox :key="'inventory-checkbox-' + item.id" :checked="selectedItems" :value="item.id"  @change="changeSelection(item.id)"></b-form-checkbox>
              </div>
            </div>

          <div class="inventory-image-small d-flex justify-content-center mx-auto align-items-center">
            <div class="thumb-wrapper">
              <img :src="item.product.image" class="invent-image">
            </div>
          </div>
          <div class="card-text-item-small pt-2 pl-2">
            <div class="invent-item-name-small">{{item.product.name}}</div>
            <div class="invent-item-color-small">{{item.product.colorway}}</div>
            <div class="invent-item-color-small">{{$t('trades.box_condition')}}: {{item.packaging_condition.name}}</div>
          </div>
        </b-col>
        <div v-if="!items.length">
          <p class="text-center">{{$t('trades.preferences.no_inventory_found')}}</p>
        </div>
        </b-row>
      </div>
      <div v-else>
        <div v-for="(item) in items" :key="'preference-inventory' + item.id" class="invent-item mr-45">
          <div class="position-absolute size-cont">
            <b-row class="justify-content-between">
              <div class="size text-center ml-3 mt-2">
                {{$t('trades.size')}} {{item.size.size}}
              </div>
              <b-form-checkbox :key="'inventory-checkbox-' + item.id" :checked="selectedItems" :value="item.id" class="pr-2 pt-2" @change="changeSelection(item.id)"></b-form-checkbox>
            </b-row>
          </div>
          <div class="inventory-image d-flex justify-content-center mx-auto align-items-center">
            <div class="thumb-wrapper">
              <img :src="item.product.image" class="invent-image">
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
            PUBLIC_INVENTORY_STATUS,
             width:''
        }
    },
  mounted() {
    this.width = window.innerWidth
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
.invent-item-small
    background: $color-white-1
    border: 0.5px solid $color-gray-23
    height: 190px
    width: 140px
.size
    border: 1px solid $light-gray-2
    border-radius: 2px
    color: $color-black-1
    font-family: $font-family-montserrat
    font-style: normal
    @include body-5-regular
    width: 88px
    height: 20px
.size-small
  border-radius: 2px
  color: $color-black-1
  font-family: $font-family-montserrat
  font-style: normal
  font-size: 11px
.inventory-image
    position: relative
    height: 201px
    padding: 0 20px
    .thumb-wrapper
        position: relative
    img
        width: 100%
.inventory-image-small
  position: relative
  height: 100px
  padding: 0 10px
  .thumb-wrapper
    position: relative
  img
    width: 100%
    height: 90px
.card-text-item
    height: 78px
    background: $color-gray-1
.card-text-item-small
  //height: 60px
  background: $color-gray-1
  width: auto
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
.invent-item-name-small
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-medium
  color: $color-black-1
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 100px
.invent-item-color
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-10-regular
    color: $color-gray-5
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    width: 200px
.invent-item-color-small
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-10-regular
    color: $color-gray-5
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    width: 100px
.mr-45
    margin-right: 40px
.inventory-items-small
  max-height: 300px
  background: $color-white-1
  border-radius: 10px
  overflow-y: scroll
</style>
