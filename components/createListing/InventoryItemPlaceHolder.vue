<template>
    <div class="product-info mt-md-3">
      <div class="d-flex justify-content-around text-center">
        <span class="sltext">
          {{$t('create_listing.collection.select_inventory')}}
        </span>
      </div>
      <div class="d-none d-md-flex justify-content-around sltext2">
        {{$t('create_listing.collection.up_to_ten')}}
      </div>
      <div class="d-flex justify-content-around">
        <img :src="plusIcon" class="plus-icon"/>
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
import plusIcon from '~/assets/img/icons/large-plus-icon.svg';

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
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-1214
  width: 90px
  margin-bottom: 16px

.sltext2
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-1214
  color: $color-gray-5

.rectangle
  width: 108px
  height: 20px
  border-radius: 4px
  background-color: $color-gray-12
  margin-top: 5px

.plus-icon
  width: 31px
  height: 31px
  margin: 10px 0

.product-info
  background-color: $color-white-4
  padding: 26px 0px 12px
  background-image: url("~/assets/img/icons/sneaker-shoe.svg")
  background-repeat: no-repeat
  background-position: center

  @media (max-width: 576px)
    border: none
    min-height: 0
    background-size: 100%
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
