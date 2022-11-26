<template>
  <div class="h-100 preview-container" @drop="dropped" @dragover.prevent="(ev) => true">
    <b-row v-if="fullView" class="preview-drag justify-content-center bg-white mx-0 px-md-5" :class="{ 'no-items': inventories.length === 0 }">
      <b-col
        v-for="(inventory, index) in inventories"
        :key="`inventory-${inventory.id}-${index}`"
        class="inventory-card"
      >
        <InventoryCard
          :inventory="inventory.item"
          :is-actions-visible="false"
          :addable="false"
          :selectable="false"
          :removable="true"
          :stock-visible="false"
          class="my-md-3"
          @remove="removeItem(index)"
        />
      </b-col>
      <b-col
        v-if="inventories.length> 0"
        class="inventory-card"
      >
        <InventoryItemPlaceHolder/>
      </b-col>
      <div v-if="inventories.length===0" class="d-none d-md-flex align-items-center justify-content-around w-100 preview-body">
        <div  v-if="!hideInfo" class="d-flex flex-column align-items-center">
          <div class="main-desc">{{ $t('create_listing.collection.select_drag') }}</div>
          <div class="sub-desc">{{ $t('create_listing.collection.or_searcn') }}</div>
          <img :src="plusIcon" class="plus-icon"/>
        </div>
      </div>
    </b-row>
    <div v-else class="simple-content">
      {{ inventories.length }} {{ $t('create_listing.collection.items_selected') }}
    </div>

    <div v-if="inventories.length>0" class="d-flex justify-content-end">
      <Button class="my-3 my-md-4 next-button" @click="$emit('next')"> {{ $t('create_listing.collection.next') }}</Button>
    </div>

    <div v-if="inventories.length>0" class="d-md-none position-absolute expand-btn">
      <img src="~/assets/img/icons/expand-icon.svg" @click="togglePreview" />
    </div>
  </div>

</template>

<script>
import InventoryCard from '~/components/inventory/Card'
import Button from '~/components/common/Button';
import plusIcon from '~/assets/img/icons/large-plus-icon.svg';
import InventoryItemPlaceHolder from '~/components/createListing/InventoryItemPlaceHolder';

export default {
  name: 'PreviewDragAndDrop',
  components: {InventoryItemPlaceHolder, Button, InventoryCard},
  props: {
    inventories: {
      type: Array,
      default: () => []
    },
    hideInfo: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      plusIcon,
      fullView: true,
    }
  },
  methods: {
    dropped(ev){
      // try catch because user can drop selected text or link
      try {
        const item = JSON.parse(ev.dataTransfer.getData('item'));
        this.$emit('dragged', item.id)
      }catch (e){
        this.$toasted.error(e)
      }
      // prevent link open
      ev.preventDefault()
    },
    log(event){
      if (event.added){
        this.$emit('dragged', event.added.element.id)
      }
    },
    removeItem(index) {
      this.$emit('removed', index)
    },
    togglePreview() {
      this.fullView = !this.fullView
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.preview-container
  margin: 0 30px

.preview-drag
  background: $white
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25), 0px 1px 4px rgba(0, 0, 0, 0.25)
  border-radius: 22px
  padding: 0
  &.no-items
    padding: 80px 0 65px
    .main-desc
      font-family: $font-sp-pro
      font-weight: $medium
      @include body-1
      color: $black
      margin-bottom: 11px
    .sub-desc
      font-family: $font-sp-pro
      font-weight: $regular
      @include body-13
      color: $black
      margin-bottom: 18px
    .plus-icon
      width: 54px
      height: 54px

.next-button.btn
  background: $color-blue-20
  border-color: $color-blue-20
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-13
  color: $white
  width: 151px
  border-radius: 4px
  @media (max-width: 576px)
    width: 100%
    border-radius: 20px

.inventory-card::v-deep
  flex: 0 0 179px
  max-width: 179px
  margin: 0 14px
  .product-info
    .product-image
      padding: 50px 25px 25px
    .product-detail
      .product-title
        @include body-21
      .product-color
        @include body-21
      .product-price
        display: none
</style>
