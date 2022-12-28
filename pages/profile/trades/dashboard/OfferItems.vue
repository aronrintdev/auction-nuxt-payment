<template>
  <div>
    <div v-if="isScreenXS">
      <div class="product-card">
        <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
        <div class="mt-2 row justify-content-center align-content-center">
        <div v-for="(item,index) in offerItems" :key="'offer-item-list-' + item.id" class="" :class="{'mobile-offer-item': (mobileItem === OFFER_SUMMARY || mobileItem === OFFER_SUMMARY_INITIAL_LISTING ),
        'col-4' : mobileItem === '','mr-11px' :(mobileItem === OFFER_SUMMARY || mobileItem === OFFER_SUMMARY_INITIAL_LISTING ) && index !== 2,}">
            <div class="" :class="{'bg-white' : mobileItem === ''}">
              <div class="offer-item-small d-flex position-relative justify-content-center align-items-center"
                   :class="{'mobile-initial-listing':mobileItem === OFFER_SUMMARY_INITIAL_LISTING}">
                <div class="thumb-wrapper">
                  <img
                    v-if="item.inventory" :src="item.inventory.product | getProductImageUrl"
                    class="img-fluid"
                  />
                  <img v-else :src="item.product | getProductImageUrl" class="img-fluid" />
                  <div class="" :class="{'overlay-image' : mobileItem === OFFER_SUMMARY_INITIAL_LISTING }"></div>
                </div>
              </div>
              <div class="inner-section">
                <div class="item-name align-items-center mt-2">
                  {{item.inventory ? item.inventory.product.name : item.product.name}}
                </div>
                <div class="offer-item-text-small">{{item.inventory ? item.inventory.product.colorway : item.product.colorway}},{{$tc('common.size')}} {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
                <div class="offer-item-text-small">{{$t('common.box')}}: {{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="product-card">
        <div v-if="heading" class="item-heading-text pb-2">{{heading}}</div>
        <div class="row align-content-center justify-content-center">
          <div
            v-for="(item,index) in offerItems"
            :key="'offer-item-list-' + item.id"
            class="d-flex justify-content-center align-content-center"
            :class="{'offer-summary-item': isOfferSummary,'col-4':!isOfferSummary,'mr-76':isOfferSummary && index !==2 }"
          >
            <div class="d-inline body-section-box w-100">
              <div class="image-wrapper">
                <img
                  v-if="item.inventory" :src="item.inventory.product | getProductImageUrl"
                  class="pro-image pt-4"
                />
                <img v-else :src="item.product | getProductImageUrl" class="pro-image pt-4" />
                <div class="overlay"></div>
              </div>
              <div class="bottom-section  mt-4">
                <div class="product-name pt-1">  {{item.inventory ? item.inventory.product.name : item.product.name}}</div>
                <div class="product-size "><span>{{ $tc('common.size') }} </span> {{item.inventory ? item.inventory.size.size : item.size.size}}</div>
                <div class="product-box "><span>{{$t('common.box')}}: </span>{{item.inventory ? item.inventory.packaging_condition.name : item.packaging_condition.name}}</div>
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
import { OFFER_SUMMARY , OFFER_SUMMARY_INITIAL_LISTING } from '~/static/constants/trades'
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
    isOfferSummary:{
      type: Boolean,
      default: false
    },
    mobileItem:{
      type: String,
      default: ''
    },
  },
  data(){
    return {
      width:'',
      OFFER_SUMMARY,
      OFFER_SUMMARY_INITIAL_LISTING
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
.mobile-initial-listing
  background: $color-white-4
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
  font-style: normal
  font-weight: $normal
  @include body-13
  line-height: 19px
  text-decoration-line: underline
  color: $color-blue-20

.product-name
  width: 150px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  @media (min-width: 576px)
    @include body-10-medium
    width: 150px
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
.image-wrapper
  position: relative
  width: 150px
.image-wrapper
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
.pro-image
  width: 140px
.box-pad
  padding-right: 40px
.offer-summary-item
  height: 215px
  width: 140px
.image-container
  padding: 15px
  height: 160px
  background: $color-white-4
.thumb-wrapper
  background: $color-white-4
  position: relative
.overlay-image
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.mr-76
  margin-right: 76px
.image-wrapper
  position: relative
  width: 150px
.image-wrapper
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
.pro-image
  width: 140px
.box-pad
  padding-right: 40px
.mobile-offer-item
  height: 161px
  width: 99px
.mr-11px
  margin-right: 11px
.mobile-initial-listing
  background: $color-white-4
  height: 112px
  padding: 10px
</style>
