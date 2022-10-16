<template>
    <div class="invent-item">
      <div class="position-absolute size-cont">
        <b-row class="justify-content-end justify-content-sm-center">
          <img class="mr-3 d-sm-none" :src="require('assets/img/icons/More.svg')" />
          <div class="d-none d-sm-block">
            <b-form-checkbox
              v-if="editRemove"
              :checked="selected"
              class="pr-2 pt-2"
              @change="toggleSelect"
            ></b-form-checkbox>
            <div class="d-flex align-items-center">
              <div role="button" @click="editWant">
                <img 
                  :src="require('~/assets/img/icons/pencil-gray.svg')" 
                  height="15" 
                  width="15" 
                >
                <span class="edit-label">Edit</span>
              </div>
              <div role="button" @click="deleteWant">
                <img 
                  :src="require('~/assets/img/icons/Delete.svg')" 
                  height="15" 
                  width="15" 
                  class="ml-4" 
                >
                <span class="delete-label">Delete</span>
              </div>
            </div>
          </div>
        </b-row>
      </div>
      <div class="inventory-image d-flex justify-content-center mx-auto align-items-center">
        <div class="thumb-wrapper">
          <img :src="`${IMAGE_PATH}/${wantItem.product && wantItem.product.category && wantItem.product.category.name}/${wantItem.product && wantItem.product.sku}/800xAUTO/IMG01.jpg`" alt="No Image" class="invent-image h-auto">
        </div>
      </div>
      <div class="card-text-item pt-3 pl-2">
        <div class="invent-item-name">{{wantItem.product && wantItem.product.name}}</div>   <!-- to do just frontend .....  -->
        <div class="invent-item-color">
          {{ wantItem.product && wantItem.product.colorway }}, Size {{ wantItem.size && wantItem.size.size }}
        </div>
        <div class="invent-item-color">Box: {{
            wantItem.packaging_condition && wantItem.packaging_condition.name
          }}</div>
      </div>
    </div>
</template>

<script>
import {IMAGE_PATH} from '~/static/constants/create-listing'
export default {
  name: 'WantItemCard',
  props:{
    wantItem:{
      type: Object,
      required: true,
    },
    items:{
      type: Array,
      default: () => [],
    },
    editRemove:{
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    actionType: {
      type: String,
      default: null,
    },
    selectedItems: {
      type: Array,
      default: ()=> [],
    },
  },
  data(){
    return {
      IMAGE_PATH
    }
  },
  methods:{
    toggleSelect(checked) {
      this.$emit('select', this.wantItem.id, checked)
    },
    deleteWant() {
      this.$emit('click', this.wantItem.id, 'delete')
    },
    editWant() {
      this.$emit('click', this.wantItem, 'edit')
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.invent-item
  height: 281px
  width: 213px
  @media (min-width: 992px)
    margin-right: 50px

.size
  border: 1px solid $light-gray-2
  border-radius: 2px
  color: $color-black-1
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-regular
  width: 88px
  height: 20px

.inventory-image
  position: relative
  height: 201px
  padding: 0 20px
  .thumb-wrapper
    position: relative
  img
    width: 100%

.card-text-item
  height: 78px

.size-cont
  z-index: 1000
  width: 213px

.invent-item-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-medium
  color: $color-black-1
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 200px

.invent-item-color
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-10-regular
  color: $color-gray-5
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 200px

.mr-45
  margin-right: 40px


</style>

