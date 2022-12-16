<template>
  <div>
    <div v-if="isScreenXS">
      <div class="product-card">
        <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
        <div class="mt-2 row justify-content-center align-content-center">
          <div v-for="(item) in offerItems" :key="'offer-item-list-' + item.id" class="col-4">
            <div class="bg-white">
              <div class="offer-item-small">
                <img 
                  v-if="item.inventory" :src="item.inventory.product | getProductImageUrl"
                  class="img-fluid"
                />
                <img v-else :src="item.product | getProductImageUrl" class="img-fluid" />
              </div>
              <div class="inner-section">
                <div class="item-name align-items-center mt-2">
                  {{item.inventory ? item.inventory.product.name : item.product.name}}
                </div>
                <div class="offer-item-text-small">{{$t('common.box')}}: {{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
                <div class="offer-item-text-small">{{item.inventory ? item.inventory.product.colorway : item.product.colorway}}</div>
                <div class="offer-item-text-small">{{$tc('common.size')}} {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product-card">
        <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
        <div class="row justify-content-center align-content-center" >
          <div
            v-for="(item) in offerItems"
            :key="'offer-item-list-' + item.id"
            class="d-flex justify-content-center align-content-center col-4"
          >
            <div class="d-inline body-section-box w-100 m-1">
              <img 
                v-if="item.inventory" :src="item.inventory.product | getProductImageUrl"
                class="img-fluid pt-4" 
              />
              <img v-else :src="item.product | getProductImageUrl" class="img-fluid pt-4" />

              <div class="bottom-section mt-4">
                <div class="product-name pt-1">  {{item.inventory ? item.inventory.product.name : item.product.name}}</div>
                <div class="product-box "><span>{{$t('common.box')}}: </span>{{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
                <div class="product-size "><span>{{ $tc('common.size') }} </span> {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ScreenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'OfferItems',
  mixins: [ScreenSize],
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
  },
  data(){
    return {
      width:'',
    }
  },
  mounted() {
    this.width = window.innerWidth
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.offer-item-small
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
  @include body-6-normal
  font-family: $font-family-sf-pro-display
  line-height: 15px
  color: $color-gray-5
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.item-heading-text
  @include body-9-normal
  font-family: $font-family-sf-pro-display
  color: $color-gray-47
  @media (min-width: 576px)
    @include body-13-normal

.listed-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-gray-4

.inner-items-listed
  width: 430px
  height: 220px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.inner-heading-listing
  background: $color-gray-1
  border-radius: 9px 9px 0 0
  font-family: $font-family-montserrat
  font-style: normal
  @include body-3-bold
  color: $color-black-1

.inner-item-image
  width: 58px

.inner-item-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-normal
  color: $color-gray-5
.view-detail-text
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: 500
  @include body-13
  line-height: 19px
  text-decoration-line: underline
  color: #667799

.product-name
  width: 90px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  @media (min-width: 576px)
    @include body-10-medium
    width: auto
    color: $color-black-1

.product-size, .product-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  font-size: 10px
  @media (min-width: 576px)
    @include body-9-medium
    color: $color-black-1

.product-box
  @media (min-width: 576px)
    color: $color-gray-5

.body-section-box
  @media (max-width: 500px)
    height: 215px
    width: 140px
    border-radius: 0px
    background: $color-white-4
.bottom-section
  height: 67px

.image-tarde
  @media (max-width: 500px)
    width: 125px

.box-pro
  background: $color-white-4

.responsive-width
  width: 100%
  @media (min-width: 1200px)
    width: 72%

.inner-section
  padding: 5px 

</style>
