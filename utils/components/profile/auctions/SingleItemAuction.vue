<template>
    <b-row v-if="inventory.product" class="mt-3 text-center px-5 ml-n1 font-weight-bold w-100 bg-white single-item" role="button" @click="$emit('click')">
      <b-col sm="12" md="5" class="text-left">
        <b-row>
          <b-col md="2" >
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
          <b-col md="10" class="pl-4">
            <b-row class="mb-2 d-block">
              <div class="body-4-bold mb-2">{{ inventory.product.name }}</div>
              <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ inventory.product.sku }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ inventory.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{inventory.size.size }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{inventory.packaging_condition.name}}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column">
        {{$t('auction.auction_types.'+auction.type)}}
      </b-col>
      <b-col v-if="auction.bids.length" sm="12" md="2" class="d-flex justify-content-around flex-column">
        {{ auction.highest_bid | formatPrice }} &dollar;
      </b-col>
      <b-col v-else sm="12" md="2" class="d-flex justify-content-around flex-column">
        -
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column">
        {{auction.bids.length|| '-'}}
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column">
        {{auction.status !== 'live' ? '-' : auction.remaining_time}}
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column" :class="{' text-green ' :auction.status===LIVE_STATUS}">
        {{$t('auction.duration_type.' + auction.status)}}
      </b-col>
    </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';
import {LIVE_STATUS} from '~/static/constants';

export default {
  name: 'SingleItemAuction',
  components: {ProductThumb},
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
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.chekbox
  margin-top: 35px

.single-item
  border-radius: 10px
  border: 1px solid $color-gray-58
  padding: 15px 10px
</style>
