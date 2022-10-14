<template>
    <div class="product-info mt-md-3 d-flex flex-column justify-content-around p-2 p-md-4">
      <div class="">
        <div class="rectangle2 position-absolute mt-n3 ml-n2"></div>
      </div>
      <div class="d-flex justify-content-around text-center">
        <span class="sltext">
          {{$t('create_listing.collection.select_inventory')}}
        </span>
      </div>
      <div class="d-none d-md-flex justify-content-around sltext2">
        {{$t('create_listing.collection.up_to_ten')}}
      </div>
      <div class="d-flex justify-content-around">
        <img :src="plusIcon" class="scale-2 mt-2 mt-md-4 py-2 mb-2"/>
      </div>
      <div class="d-none d-md-flex justify-content-around text-center sltext2">
        {{$t('create_listing.collection.select_items')}}
      </div>
      <div class="d-none d-md-flex justify-content-around">
        <div class="rectangle"></div>
      </div>
    </div>
</template>

<script>
import sneaker from '~/assets/img/icons/sneaker-placeholder.svg';
import plusIcon from '~/assets/img/icons/plus_circle_black.svg';

export default {
  name: 'InventoryItemPlaceHolder',
  data(){
    return {
      sneaker,
      plusIcon
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.sltext
  @include body-4-bold
  max-width: 100px

.sltext2
  @include body-10-medium

.rectangle
  width: 160px
  height: 30px
  border-radius: 4px
  background-color: $color-gray-12

.rectangle2
  width: 60px
  height: 20px
  border-radius: 4px
  background-color: $color-gray-18

.scale-2
  transform: scale(2)

.product-info
  @include body-10-normal
  border: 1px solid $color-gray-23
  background: url("~/assets/img/icons/sneaker-placeholder.svg") no-repeat
  background-size: 150px
  background-position: center
  background-color: $white
  padding: 5px 8px
  max-width: 213px
  margin-left: auto
  margin-right: auto
  min-height: 284px

.product-info
  @media (max-width: 576px)
    border: none
    min-height: 0
    background-size: 100%
    margin-top: 15px
    .rectangle2
      width: 50px
      height: 14px
    .rectangle
      display: none
    .sltext
      font-size: 11px
      line-height: 13px
      margin-top: 10px
    .sltext2
      font-size: 11px
      line-height: 13px
    img
      width: 12px
</style>
