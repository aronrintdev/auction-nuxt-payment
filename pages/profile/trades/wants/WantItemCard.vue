<template>
    <div class="invent-item">
      <div class="w-100">
        <div v-if="editRemove" class="position-absolute size-cont d-flex justify-content-end">
          <img
            v-if="selected"
            role="button"
            :src="require('~/assets/img/icons/red-minus.svg')"
            height="22" 
            width="22" 
            @click="$emit('select', wantItem.id, 'remove')" 
          >
          <img
            v-else
            role="button"
            :src="require('~/assets/img/icons/gray-plus.svg')"
            height="22" 
            width="22" 
            @click="$emit('select', wantItem.id, 'add')" 
          >
        </div>
        <div v-else>
          <div class="d-none d-sm-flex justify-content-center align-items-center">
            <div 
              role="button" 
              class="pr-1 d-flex align-items-center"
              @click="editWant"
            >
              <img 
                :src="require('~/assets/img/icons/pencil-gray.svg')" 
                height="15" 
                width="15" 
              >
              <span class="edit-label ml-1">{{ $t('common.edit') }}</span>
            </div>
            <div 
              role="button" 
              class="pl-1 d-flex align-items-center"
              @click="deleteWant"
            >
              <img 
                :src="require('~/assets/img/icons/Delete.svg')" 
                height="15" 
                width="15" 
                class="ml-4"
              >
              <span class="delete-label ml-1">{{ $t('common.delete') }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-end d-sm-none">
            <img 
              width="19"
              height="19"
              :src="require('assets/img/icons/More.svg')" 
              @click="isModalOpen = true"
            />
          </div>
        </div>
      </div>
      <div class="inventory-image d-flex justify-content-center mx-auto align-items-center">
        <div class="thumb-wrapper">
          <img :src="`${IMAGE_PATH}/${wantItem.product && wantItem.product.category && wantItem.product.category.name}/${wantItem.product && wantItem.product.sku}/800xAUTO/IMG01.jpg`" alt="No Image" class="invent-image h-auto">
        </div>
      </div>
      <div class="card-text-item pt-3 pl-sm-2">
        <div class="invent-item-name">{{wantItem.product && wantItem.product.name}}</div>   <!-- to do just frontend .....  -->
        <div class="invent-item-color">
          {{ wantItem.product && wantItem.product.colorway }}, {{ $t('home_page.size') }} {{ wantItem.size && wantItem.size.size }}
        </div>
        <div class="invent-item-color">{{ $t('sell.inventory.box') }}: {{
            wantItem.packaging_condition && wantItem.packaging_condition.name
          }}</div>
      </div>
      <ActionsModal
        :isOpen="isModalOpen"
        :product="wantItem"
        productType="want"
        @closed="isModalOpen = false"
        @opened="isModalOpen = true"
        @deleteWant="deleteWant()"
        @editWant="editWant()"
      />
    </div>
</template>

<script>
import {IMAGE_PATH} from '~/static/constants/create-listing'
import ActionsModal from '~/components/modal/ActionsModal'
export default {
  name: 'WantItemCard',
  components: { ActionsModal },
  props: {
    wantItem: {
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
  data() {
    return {
      IMAGE_PATH,
      isModalOpen: false
    }
  },
  methods: {
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
  padding: 0 20px
  .thumb-wrapper
    position: relative
  img
    width: 100%

.card-text-item
  height: 78px

.size-cont
  z-index: 90

.invent-item-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-medium
  color: $color-black-1
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.invent-item-color
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-10-regular
  color: $color-gray-5
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.mr-45
  margin-right: 40px

</style>