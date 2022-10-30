<template>
  <b-row class="w-100 bg-white px-2 py-3 rounded-sm">
    <b-col cols="12" sm="12" :md="editDisabled ? 10 : 8">
      <b-row>
        <b-col md="2">
          <Thumb :product="itemProduct.product" />
        </b-col>
        <b-col md="10" class="pl-4">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ itemProduct.product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ itemProduct.product.sku }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ itemProduct.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{itemProduct.size.size }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('products.box_condition') }}&colon;&nbsp;{{itemProduct.packaging_condition.name}}
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-if="showQuantityText" cols="12" sm="12" md="2" class="text-center d-flex flex-column justify-content-center">
      <span >{{ quantity }}</span>
    </b-col>
    <b-col v-else cols="12" sm="12" md="2" class="text-center d-flex flex-column justify-content-center">
      <b-input v-model="quantity" type="number"
               :disabled="disableQuantity"
               :class="{'is-invalid': itemError.includes(`items.${item.id}.quantity`)}"
               class="quantityField"
               min="1" max="10"
               :placeholder="$t('create_listing.collection.enter_quantity')"
               @change="quantityChanged"/>
      <span class="small">{{ $t('create_listing.collection.out_of') }} {{MAX_AUCTION_ITEM_COUNT }}</span>
    </b-col>
    <b-col v-if="!editDisabled" cols="12" sm="12" md="2" class="text-center">
      <div class="d-flex flex-column h-100 justify-content-center ">
        <div class="d-flex align-items-center justify-content-center ">
          <Button
            variant="link"
            class="btn-copy mr-2"
            :tooltip-text="$t('common.copy')"
            @click="cloneItem"
          ></Button>
          <!-- <Button
            variant="link"
            class="btn-edit-inventory mr-2"
            :tooltip-text="$t('common.edit')"
            @click="editItem"
          ></Button> -->
          <Button
            variant="link"
            class="btn-delete"
            :tooltip-text="$t('common.delete')"
            @click="deleteItem"
          ></Button></div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Thumb from '~/components/product/Thumb';
import {MAX_AUCTION_ITEM_COUNT} from '~/static/constants/create-listing';

export default {
  name: 'AuctionItemHorizontal',
  components: {Thumb},
  props: {
    item: {
      type: Object,
      default: null,
    },
    disableQuantity: {
      type: Boolean,
      default: false,
    },
    itemError: {
      type: Array,
      default: () => ([]),
    },
    showQuantityText: {
      type: Boolean,
      default: false,
    },
    editDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      MAX_AUCTION_ITEM_COUNT,
      quantity: this.itemQuantity
    }
  },
  computed: {
    itemProduct(){
      return this.item.item
    },
    itemQuantity(){
      return this.item.quantity
    }
  },
  mounted() {
    this.quantity =this.itemQuantity
  },
  methods:{
    cloneItem(){
      this.$emit('clone', this.item)
    },
    deleteItem(){
      this.$emit('delete', this.item)
    },
    editItem(){
      this.$emit('edit', this.item)
    },
    quantityChanged(){
      this.$emit('quantityChanged', this.item.id, parseInt(this.quantity))
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.quantityField
  max-width: 100px

.is-invalid
  border: $color-red-1 2px solid
  border-radius: 100px

.btn-copy
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: left
  border: none
  border-radius: 4px

.btn-edit-inventory
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

.btn-delete
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: right
  border: none
  border-radius: 4px
</style>
