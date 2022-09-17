<template>
  <div>
    <div class="combination-div py-4 mx-1">
      <div class="d-flex justify-content-between ml-5">
        <div class="text-left title-combination">
          {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combinationIndex }}
        </div>
        <b-form-checkbox
          v-if="editRemove"
          :checked="selected"
          class="pr-2 pt-2"
          @change="toggleSelect"
        ></b-form-checkbox>
        <div v-else class="d-flex pr-3 pt-2">
          <img :src="require('~/assets/img/trades/edit-icon.svg')" height="24" width="24" role="button" @click="editWant">
          <img :src="require('~/assets/img/trades/minus-icon.svg')" height="24" width="24" class="ml-2" role="button" @click="deleteWant">
        </div>
      </div>
      <div v-if="combinationItems[selectedItemIndex]" class="col-md-12 d-flex">
        <div class="col-md-6 d-flex justify-content-center">
          <object v-if="combinationItems[selectedItemIndex].product.image"
                  :data="combinationItems[selectedItemIndex].product.image"
                  class="large-image-combination pointer"
                  type="image/png">
            <img class="large-image-combination pointer" :src="fallbackImgUrl" alt="image"/>
          </object>
          <img v-else class="large-image-combination pointer" :src="fallbackImgUrl" alt="image"/>
        </div>
        <div class="col-md-6 d-block text-left text-div-combination d-flex flex-column justify-content-center">
          <div class="text-bold">
            {{ combinationItems[selectedItemIndex].product.name }}
          </div>
          <div class="">
            {{ $t('trades.create_listing.vendor.wants.sku') }}:
            {{ combinationItems[selectedItemIndex].product.sku }}
          </div>
          <div>
            {{ $t('trades.create_listing.vendor.wants.color') }}:
            {{ combinationItems[selectedItemIndex].product.colorway }}
          </div>
          <div>
            {{ $t('trades.create_listing.vendor.wants.box_condition') }}:
            {{ combinationItems[selectedItemIndex].packaging_condition.name }}
          </div>
          <div class="text-bold">{{ $t('trades.create_listing.vendor.wants.lowest_ask') }}: {{ combinationItems[selectedItemIndex].product.estimated_market_value }}</div>
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-center">
        <b-col v-for="(item, index) in combinationItems"
               :key="item.id" class="d-flex justify-content-center flex-column align-items-center">
          <object v-if="item.product.image" :data="item.product.image"
                  class="item-image-combination pointer"
                  type="image/png"
                  @click="setCombinationSelectedItem(index)">
            <img class="item-image-combination mb-2 pointer" :src="fallbackImgUrl"
                 alt="image"/>
          </object>
          <img v-else alt="image"
               class="item-image-combination mb-2 pointer" :src="fallbackImgUrl"
               @click="setCombinationSelectedItem(index)"/>
          <div class="position-relative">
            <div v-if="selectedItemIndex === index" class="bar-combination"></div>
          </div>
        </b-col>
      </div>
      <div class="col-md-12 d-flex">
        <div class="text-bold ml-auto mr-auto mt-3">{{
            $t('trades.create_listing.vendor.wants.total_est_value')
          }}:   ${{ estValue(combinationItems) }}
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import {PRODUCT_FALLBACK_URL} from '~/static/constants';

export default {
  name: 'CombinationItemCard',
  props:{
    combination: {
      type: Object,
      default: () => {},
    },
    editRemove:{
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    combinationIndex: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data (){
    return {
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      combinationItems: this.combination.combination_items,
      selectedItemIndex: this.combination.selectedItemIndex
    }
  },
  methods:{
    toggleSelect(checked) {
      this.$emit('select', this.combination.combination_id, checked)
    },
    deleteWant() {
      this.$emit('click', this.combination.combination_id, 'delete_combination')
    },
    editWant() {
      this.$emit('click', this.combination, 'edit_combination')
    },
    /**
     * This function is used to return estimated total value
     * param combination contain list of items
     */
    estValue(combinationLists) {
      return combinationLists.reduce((a, b) => a + b.product.estimated_market_value, 0)
    },
    /**
     * This function is used to set combination want
     * item detail in variable to display detail in template
     * @param combinationIndex
     * @param itemIndex
     */
    setCombinationSelectedItem(combinationIndex) {
      this.selectedItemIndex = combinationIndex
    },
  }
}
</script>
