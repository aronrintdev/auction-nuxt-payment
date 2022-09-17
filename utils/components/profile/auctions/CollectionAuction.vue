<template>
    <div v-if="auction.auction_items" class="mt-3 text-center px-5 font-weight-bold w-100 bg-white collection-item" role="button" @click="$emit('click')">
      <b-row >
        <b-col sm="12" md="5" class="text-left">
          <b-row>
            <b-col md="2">
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
            <b-col md="10" class="pl-4 body-4-bold  d-flex justify-content-around flex-column">
              {{ auction.name }} ( {{auction.auction_items.length}} {{$t('auction.items')}} )
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
        <b-col sm="12" md="1" class="d-flex justify-content-around flex-column" :class="{' text-green ' :auction.status==='live'}">
          {{$t('auction.duration_type.' + auction.status)}}
        </b-col>
      </b-row>

      <b-row >
        <b-col sm="12" md="1" class="text-left">
        </b-col>
        <b-col sm="12" md="11">
          <b-row class="mt-2">
            <b-col v-for="(item, i) in auction.auction_items" :key="i" cols="12" sm="12" md="4">
              <b-row class="">
                <b-col md="3">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col md="5" class="pl-2 d-flex flex-column justify-content-around text-body item-name">
                  {{ item.inventory.product.name }}
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import CollectionSvg from '~/assets/img/icons/collection.svg'
import ProductThumb from '~/components/product/Thumb';
export default {
  name: 'CollectionAuction',
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
    return {
      CollectionSvg
    }
  },
  computed:{
    product(){
      return this.auction.auction_items[0]
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.item-name
  @include body-5-medium

.collection-item
  border-radius: 10px
  border: 1px solid $color-gray-58
  padding: 15px 10px
</style>
