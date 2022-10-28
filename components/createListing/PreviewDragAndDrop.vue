<template>
  <div class="h-100 max-w828 mx-auto" @drop="dropped" @dragover.prevent="(ev) => true">
    <b-row  class="preview-drag bg-white mt-2 mt-md-3 pb-md-2 px-md-5" :class="{ 'no-items': inventories.length === 0 }">
      <b-col
        v-for="(inventory, index) in inventories"
        :key="`inventory-${inventory.id}`"
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
      <div v-if="inventories.length===0" class="d-none d-md-flex align-items-center justify-content-around w-100 preview-body my-auto ">
        <div  v-if="!hideInfo" class="d-flex flex-column align-items-center my-5 ">
          <h4 class="font-weight-bold">{{ $t('create_listing.collection.select_drag') }}</h4>
          <h5 class="mt-2">{{ $t('create_listing.collection.or_searcn') }}</h5>
          <img :src="plusIcon" class="scale-2 mt-4"/>
        </div>
      </div>
    </b-row>

    <div v-if="inventories.length>0" class="d-flex justify-content-end">
      <Button pill class="w-100 w-md-auto my-3 my-md-4 px-5 next-button" @click="$emit('next')"> {{ $t('create_listing.collection.next') }}</Button>
    </div>
  </div>

</template>

<script>
import InventoryCard from '~/components/inventory/Card'
import Button from '~/components/common/Button';
import plusIcon from '~/assets/img/icons/plus_circle_black.svg';
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
      plusIcon
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
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.max-w828
  max-width: 1200px
.preview-body
  min-height: 315px

.scale-2
  transform: scale(3)

.preview-drag
  border: 4px dashed $color-gray-14
  border-radius: 30px

.next-button.btn
  background: $color-blue-20
  border-color: $color-blue-20

.inventory-card
  flex: 0 0 33.3%
  max-width: 33.3%

  @media (min-width: 1030px)
    flex: 0 0 50%
    max-width: 50%

  @media (min-width: 1280px)
    flex: 0 0 25%
    max-width: 25%

  @media (min-width: 1525px)
    flex: 0 0 25%
    max-width: 25%

  @media (min-width: 1800px)
    flex: 0 0 25%
    max-width: 25%
</style>
