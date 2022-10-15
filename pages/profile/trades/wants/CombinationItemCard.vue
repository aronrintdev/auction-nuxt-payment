<template>
  <div>
    <div class="d-none d-sm-block col-6">
      <div class="combination-div py-4 mx-1">
        <div class="d-flex justify-content-between ml-5 mr-2">
          <div class="text-left title-combination">
            {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combinationIndex }}
          </div>
          <b-form-checkbox
            v-if="editRemove"
            :checked="selected"
            class="pr-2 pt-2"
            @change="toggleSelect"
          ></b-form-checkbox>
          <div v-else class="d-flex align-items-center pr-3 pt-2">
            <img 
              :src="require('~/assets/img/icons/pencil-gray.svg')" 
              height="15" 
              width="15" 
              role="button" 
              @click="editWant"
            >
            <span class="edit-label ml-2">Edit</span>
            <img 
              :src="require('~/assets/img/icons/Delete.svg')" 
              height="15" 
              width="15" 
              class="ml-5" 
              role="button" 
              @click="deleteWant"
            >
            <span class="delete-label ml-2">Delete</span>
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
            <div class="name-desktop">
              <span class="text-uppercase">{{ $t('trades.create_listing.vendor.wants.sku') }}:</span>
              {{ combinationItems[selectedItemIndex].product.sku }}
            </div>
            <div class="name-desktop">
              {{ $t('sell.confirm_listing.table_columns.colorway') }}:
              {{ combinationItems[selectedItemIndex].product.colorway }}
            </div>
            <div class="name-desktop">
              {{ $t('trades.create_listing.vendor.wants.box') }}:
              {{ combinationItems[selectedItemIndex].packaging_condition.name }}
            </div>
            <div class="text-bold">{{ $t('trades.create_listing.vendor.wants.lowest_ask') }}: 
              ${{ combinationItems[selectedItemIndex].product.estimated_market_value }}
            </div>
          </div>
        </div>
        <div class="col-md-12 d-flex combination-item">
          <b-col v-for="(item, index) in combinationItems"
                :key="item.id" class="d-flex flex-column align-items-center">
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
    <div class="d-flex row d-sm-none custom-shadow rounded">
      <div 
        class="col-4 d-flex flex-column align-items-end pb-3"
        :style="{'padding-top': '20px'}"
      >
        <img 
          width="16"
          height="16"
          :src="require('assets/img/icons/draft-list-image.svg')"
        />
        <object 
          v-if="combinationItems[selectedItemIndex].product.image"
          :data="combinationItems[selectedItemIndex].product.image"
          class="img-fluid pointer"
          type="image/png"
        >
          <img class="img-fluid pointer" :src="fallbackImgUrl" alt="image"/>
        </object>
      </div>
      <div class="col-7 py-3">
        <div class="combination-mobile">
          {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combinationIndex }}
        </div>
        <div class="name">
          {{ combinationItems[selectedItemIndex].product.name }}
        </div>
        <div class="name">
          <span class="text-uppercase">{{ $t('trades.create_listing.vendor.wants.sku') }}:</span>
          {{ combinationItems[selectedItemIndex].product.sku }}
        </div>
        <div class="name">
          {{ $t('sell.confirm_listing.table_columns.colorway') }}:
          {{ combinationItems[selectedItemIndex].product.colorway }}
        </div>
        <div class="name">
          Size: {{ combinationItems[selectedItemIndex].size.size }}
        </div>
        <div class="value">{{
            $t('trades.create_listing.vendor.wants.total_est_value')
          }}:   ${{ estValue(combinationItems) }}
        </div>
      </div>
      <img class="more d-sm-none" :src="require('assets/img/icons/More.svg')" />
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
    console.log('this.combination.combination_items', this.combination.combination_items);
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
        this.$store.commit('trade/setUpdateCombination', this.combination)
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

<style scoped lang="sass">
@import '~/assets/css/_variables'

.more
  position: absolute
  right: 3px
  top: 7px

.combination-item
  margin-top: -25px

.value
  font-family: 'Montserrat'
  font-weight: 600
  font-size: 12px
  margin-top: 20px
  color: #000
  
.name, .name-desktop
  font-family: $font-sp-pro
  font-weight: 500
  font-size: 11px
  color: $color-gray-6

.name-desktop
  font-size: 13px
  line-height: 20px

.combination-mobile
  font-family: $font-sp-pro
  font-weight: 600
  font-size: 14px
  color: #000

.custom-shadow
  box-shadow: 0px 1px 4px rgb(0 0 0 / 25%)

</style>