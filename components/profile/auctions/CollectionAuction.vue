<template>
    <b-row
      v-if="auction.auction_items"
      :class="{'border shadow-sm' : isMobileSize}"
      class="mt-3 text-center mx-0 ml-md-n1 font-weight-bold w-100 bg-white collection-item"
      role="button"
      @click="$emit('click')"
    >
      <b-row class="w-100 pr-0">
        <b-col sm="12" md="5" class="text-left mt-4">
          <b-row>
            <b-col cols="4" md="4" :class="isMobileSize ? 'text-right' : 'text-center'">
              <div @click.stop>
                <b-form-checkbox
                  v-if="selectable"
                  :checked="selected"
                  class="position-absolute ml-n4 chekbox"
                  @change="$emit('selected', auction.id)"
                >
                </b-form-checkbox>
              </div>
              <img :src="CollectionSvg" alt="collection image">
            </b-col>
            <b-col cols="8" md="8" class="pl-4 pt-2">
              <span :class="isMobileSize ? 'body-5-medium': 'body-4-bold'">
                {{ auction.name }} ( {{auction.auction_items.length}} {{$t('auction.items')}} )
              </span>
            </b-col>
          </b-row>
        </b-col>
        <template v-if="!isMobileSize">
          <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4">
            <span class="body-4-medium">{{$t('auction.auction_types.'+auction.type)}}</span>
          </b-col>
          <b-col  sm="12" md="2" class="d-flex justify-content-around flex-column pt-4">
            <span v-if="auction.bids.length" class="body-4-medium">{{ auction.highest_bid | formatPrice }} &dollar;</span>
            <span v-else>-</span>

          </b-col>
          <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4">
            <span class="body-4-medium">{{auction.bids.length|| '-'}}</span>
          </b-col>
          <b-col sm="12" md="2" class="d-flex justify-content-around flex-column pt-4">
            <span class="body-4-medium">{{auction.status !== 'live' ? '-' : auction.remaining_time}}</span>
          </b-col>
          <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4"
                 :class="{' text-green ' :auction.status==='live'}">
            <span class="body-4-medium">{{$t('auction.duration_type.' + auction.status)}}</span>
          </b-col>
        </template>
      </b-row>

      <div v-if="isMobileSize" class="collection-items mt-2">
        <b-carousel controls indicators>
          <b-carousel-slide v-for="(item, i) in auction.auction_items" :key="i" class="h-auto">
            <template #img>
              <b-row>
                <b-col cols="4">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col class="d-flex flex-column justify-content-center pl-3">
                  <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
                  </div>
                  <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                      item.inventory.product.colorway
                    }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                      item.inventory.size.size
                    }}
                  </div>
                  <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
                  </div>
                </b-col>

              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-col class="py-1">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
            <span class="body-9-regular text-decoration-underline text-blue-30">{{ auction.id }}</span>
          </div>
        </b-col>
        <b-col class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.type') }}:</span>
            <span class="body-9-regular text-gray-6">{{ $t('auction.auction_types.'+auction.type) }}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.highest_bid') }}:</span>
            <span class="body-9-regular text-gray-6">
              <span v-if="auction.bids.length">{{ auction.highest_bid | formatPrice }} &dollar;</span>
              <span v-else>-</span>
            </span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.bids') }}:</span>
            <span class="body-9-regular text-gray-6">{{auction.bids.length|| '-'}}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.time_remaining') }}:</span>
            <span class="body-9-regular text-gray-6">{{auction.status !== 'live' ? '-' : auction.remaining_time}}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.status') }}:</span>
            <span class="body-9-regular text-gray-6"
                  :class="{' text-green ' :auction.status==='live'}">
              {{$t('auction.duration_type.' + auction.status)}}
            </span>
          </div>
        </b-col>
      </div>
      <b-row v-else>
        <b-col sm="12" md="2" class="text-left">
        </b-col>
        <b-col sm="12" md="10">
          <b-row class="mt-2">
            <b-col
              v-for="(item, i) in auction.auction_items"
              :key="i"
              cols="12"
              sm="12"
              md="4"
            >
              <b-row class="mr-3">
                <b-col md="3" class="p-0">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col md="9" class="pl-2 pr-3 d-flex align-items-center">
                  <div class="body-5-medium flex-grow-1 text-nowrap overflow-hidden text-truncate">
                    {{ item.inventory.product.name }}
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-row>
</template>

<script>
import CollectionSvg from '~/assets/img/icons/collection.svg'
import ProductThumb from '~/components/product/Thumb';
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'CollectionAuction',
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
    return {
      CollectionSvg
    }
  },
  computed:{
    product(){
      return this.auction.auction_items[0]
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.collection-item
  padding: 15px 10px

.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden

.text-blue-30
  color: $color-blue-30
</style>
<style lang="sass">
@import '~/assets/css/_variables'
.collection-items
  .carousel-indicators
    position: relative
    margin: 0
  .carousel-indicators li
    background-color: $color-gray-25
    width: 12px
    height: 12px
    border-radius: 50%
</style>
