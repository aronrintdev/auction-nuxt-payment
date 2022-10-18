<template>
    <b-row v-if="inventory.product"
           class="mt-3 text-center ml-n1 font-weight-bold w-100 bg-white single-item" role="button" @click="$emit('click')">
      <b-col sm="12" md="5" class="text-left">
        <b-row>
          <b-col cols="4" md="4">
            <div @click.stop>
              <b-form-checkbox
                v-if="selectable"
                :checked="selected"
                class="position-absolute ml-n4 chekbox"
                @change="$emit('selected', auction.id)"
              >
              </b-form-checkbox>
            </div>
            <ProductThumb :product="inventory.product" />
          </b-col>
          <b-col cols="8" md="8" class="pl-4 d-flex align-items-center">
            <b-row class="mb-2 d-block" :class="{ 'flex-grow-1' : isMobileSize }">
              <div class="body-4-bold mb-2">
                <span :class="isMobileSize ? 'body-5-medium': 'body-8-medium'">{{ inventory.product.name }}</span>
              </div>
              <div class="mb-2 text-gray-6 text-uppercase" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ inventory.product.sku }}
              </div>
              <div class="mb-2 text-gray-6" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ inventory.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{inventory.size.size }}
              </div>
              <div class="mb-2 text-gray-6" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{inventory.packaging_condition.name}}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.type') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">{{$t('auction.auction_types.'+auction.type)}}</span>
        </div>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.highest_bid') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">
            <span v-if="auction.bids.length">{{ auction.highest_bid | formatPrice }} &dollar;</span>
            <span v-else>-</span>
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.bids') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">
           {{auction.bids.length|| '-'}}
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.time_remaining') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">
            {{auction.status !== 'live' ? '-' : auction.remaining_time}}
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0">

        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.status') }}:</span>
          <span :class="[isMobileSize ? 'body-9-regular' : 'body-4-medium',
                        {' text-green ' :auction.status===LIVE_STATUS}]">
            {{$t('auction.duration_type.' + auction.status)}}
          </span>
        </div>
      </b-col>
    </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';
import {LIVE_STATUS} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'SingleItemAuction',
  components: {ProductThumb},
  mixins: [screenSize],
  props: {
    auction: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      LIVE_STATUS
    }
  },
  computed:{
    inventory(){
      return this.auction.auction_items[0].inventory
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.chekbox
  margin-top: 35px

.single-item
  //border-radius: 10px
  //border: 1px solid $color-gray-58
  //padding: 15px 10px
  padding: 15px 10px
</style>
