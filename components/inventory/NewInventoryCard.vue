<template>
  <div class="card-wrapper">
    <div
      :class="{'px-4': !isScreenXS}"
      class="pt-3 action-buttons d-flex align-items-center justify-content-between mx-auto"
    >
      <Button
        v-if="!selectable && isActionsVisible && !isScreenXS"
        class="btn-list edit"
        icon="edit-pencil.svg"
        icon-height="14"
        icon-pos="left"
        icon-width="14"
        variant="link"
        @click="handleEditClick()"
      >
        {{ $t('common.edit') }}
      </Button>
      <Button
        v-if="!selectable && isActionsVisible && !isScreenXS && !inventory.listing_items.length"
        class="btn-list add"
        icon="plus-circle-gray.svg"
        icon-height="15"
        icon-pos="left"
        icon-width="15"
        variant="link"
        @click="handleListClick()"
      >
        {{ $t('common.list') }}
      </Button>
      <Button
        v-if="!selectable && isActionsVisible && !isScreenXS && inventory.listing_items.length"
        class="btn-list delist"
        icon="plus-circle-delist.svg"
        icon-height="15"
        icon-pos="left"
        icon-width="15"
        variant="link"
        @click="handleDelistClick"
      >
        {{ $t('auction.delist') }}
      </Button>

      <div v-if="isScreenXS" class="d-flex flex-grow-1 justify-content-end w-100 dot-icon-position">
        <Button variant="link"
              class="mobile-down-icon"  @click="showMobileOptionsMenu">
        <img
          :src="require('~/assets/img/icons/dot-circle-gray.svg')"
          height="19"
          width="19"
          class="z-1 position-relative"
        >
      </Button>
      </div>

      <input
        v-if="selectable"
        type="checkbox"
        class="check-box position-absolute"
        :checked="selected"
        @change="toggleSelect"
      />
    </div>
    <div
        class="
          product-image
          d-flex
          align-items-center
          justify-content-center
          position-relative
          mx-auto
        "
        :class="mobileClass"
    >
      <ProductThumb :product="inventory.product"/>

      <div class="image-bottom-text position-absolute w-100 px-4">
        <div>
          <div v-if="inventory.listing_items.length">
            <span class="listing-id">{{ $t('common.listing_id') }}: #{{inventory.listing_items[0].id}}</span>
          </div>
          <div v-if="inventory.stock" class="stock-count text-right">
            X{{ inventory.stock }}
          </div>
        </div>
      </div>
    </div>
    <div class="product-detail position-relative mt-2  mx-auto">
      <div class="product-title text-truncate">
        {{ inventory.product.name }}
      </div>
      <div class="product-color text-truncate">
        {{ inventory.product.colorway }}, {{ $t('sell.inventory.size') }} {{ inventory.size.size }}
      </div>
      <div class="product-color text-truncate mr-5">
        {{ conditionLabel }}&colon; {{ $t(inventory.packaging_condition.name) }}
      </div>
      <div class="product-price text-truncate">
        {{ inventory.sale_price | toCurrency }}
      </div>

    </div>


    <ConfirmModal
        :id="`confirm-delete-modal-${inventory.id}`"
        :confirmLabel="$t('common.delete')"
        :message="$t('inventory.message.confirm_delete')"
        @confirm="onConfirmDelete"
    />


    <vue-bottom-sheet
      ref="mobileOptionsMenu"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
     <MobileInventoryOptions
       :inventory="inventory"
       @list="handleListClick"
       @edit="handleEditClick"
       @cancel="hideMobileOptionsMenu"
       @delist="showDelistConfirm"
       @delete="()=>{
         this.hideMobileOptionsMenu();
         handleDeleteClick()
       }"
     />
    </vue-bottom-sheet>

    <vue-bottom-sheet
      ref="delistConfirm"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <div class="delist-confirm">
        <div class="message-section-1">{{ $t('inventory.delist_mobile_message.title') }}</div>
        <div class="message-section-2">
          <span>{{ $t('inventory.delist_mobile_message.part_1') }}</span>
          <span class="message-link">{{ $t('inventory.delist_mobile_message.part_2') }}</span>
          <span>{{ $t('inventory.delist_mobile_message.part_3') }}</span>
        </div>
        <div class="text-center">
          <Button @click="handleDelistClick" variant="dark-blue btn-delist" pill>{{ $t('auction.delist') }}</Button>
        </div>
        <div class="cancel-wrapper">
          <a @click="hideDelistConfirm" class="cancel-confirm">{{ $t('common.cancel') }}</a>
        </div>
      </div>
    </vue-bottom-sheet>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ProductThumb from '~/components/product/Thumb'
import {ConfirmModal} from '~/components/modal'
import plusIcon from '~/assets/img/icons/plus_circle.svg'
import removeIcon from '~/assets/img/icons/red-remove.svg'
import Button from '~/components/common/Button';
import screenSize from '~/plugins/mixins/screenSize';
import MobileInventoryOptions from '~/components/inventory/MobileInventoryOptions'

export default {
  name: 'NewInventoryCard',

  components: {Button, ProductThumb, ConfirmModal, MobileInventoryOptions},
  mixins: [screenSize],
  props: {
    inventory: {
      type: Object,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
    removable: {
      type: Boolean,
      default: false,
    },
    stockVisible: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isActionsVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      removeIcon,
      plusIcon,
    }
  },
  computed: {
    conditionLabel() {
      return this.inventory.product.category.name === 'sneakers' ? this.$t('sell.inventory.box') : this.$t('sell.inventory.package')
    },
  },
  methods: {
    ...mapActions({
      deleteInventories: 'inventory/deleteInventories',
    }),

    toggleSelect(checked) {
      this.$emit('select', this.inventory.id, checked)
    },
    addClicked() {
      this.$emit('add', this.inventory.id)
    },
    removeClicked() {
      this.$emit('remove', this.inventory.id)
    },
    handleListClick(checked) {
      this.$emit('list', {inventory: this.inventory, checked: true})
    },
    handleDelistClick() {
      this.$emit('delist', this.inventory.listing_items[0].id)
      this.hideMobileOptionsMenu()
      this.hideDelistConfirm()
    },

    handleEditClick() {
      this.$router.push({
        path: '/profile/inventory/edit',
        query: {id: this.inventory.id},
      })
    },

    handleDeleteClick() {
      this.$bvModal.show(`confirm-delete-modal-${this.inventory.id}`)
    },

    onConfirmDelete() {
      this.deleteInventories({ids: [this.inventory.id]})
      this.$nuxt.refresh()
    },

    showMobileOptionsMenu() {
      const { mobileOptionsMenu } = this.$refs
      if (mobileOptionsMenu) {
        mobileOptionsMenu.open()
      }
    },
    hideMobileOptionsMenu() {
      const { mobileOptionsMenu } = this.$refs
      if (mobileOptionsMenu) {
        mobileOptionsMenu.close()
      }
    },
    showDelistConfirm() {
      const { delistConfirm } = this.$refs
      if (delistConfirm) {
        delistConfirm.open()
      }
    },
    hideDelistConfirm() {
      const { delistConfirm } = this.$refs
      if (delistConfirm) {
        delistConfirm.close()
      }
    },
  },
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'

.z-1
  z-index: 1

.stock-count
  @include body-12
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  color: $color-gray-5

.image-bottom-text
  bottom: 10px

.action-buttons
  background-color: $color-white-4
  max-width: 242px

.product-image
  padding: 0 25px 15px 25px
  height: 273px
  max-width: 242px
  background-color: $color-white-4

  &.mobile
    height: 150px

.check-box
  accent-color: $color-black-1
  z-index: 2
  transform : scale(1.4)

.product-detail
  font-family: $font-family-sf-pro-display
  max-width: 242px
  @include body-10-normal
  padding: 5px 8px

  .product-title
    @include body-8
    font-family: $font-family-sf-pro-display
    color: $color-black-1
    margin-bottom: 3px
    font-weight: $medium

  .product-color
    color: $color-gray-5
    font-family: $font-family-sf-pro-display
    margin-bottom: 3px

  .product-price
    color: $color-black-1
    margin-top: 3px
    @include body-9-normal

  .product-stock
    @include body-4-normal
    background-color: $color-gray-4
    border-radius: 4px
    color: $color-white-1
    padding: 4px 5px
    bottom: 11px
    right: 8px
    max-width: 50px

::v-deep.btn-list
  .btn.btn-link
    font-family: $font-montserrat
    font-style: normal

  &.edit.btn, &.add.btn, &.delist.btn
    @include body-8-normal
  &.edit.btn
    color: $color-blue-20

  &.delist.btn, &.add.btn
    color: $color-black-1

.dot-icon-position
  padding-right: 6px
  margin-top: -10px

.listing-id
  font-family: $font-family-sf-pro-display
  @include body-10-medium
  color: $color-blue-31
  text-decoration: underline

.delist-confirm
  .message-section-1
    width: 250px
    margin: auto
    text-align: center
    font-family: $font-sf-pro-text
    @include body-17-normal

  .message-section-2
    width: 350px
    margin-left: auto
    margin-right: auto
    text-align: center
    font-family: $font-sf-pro-text
    @include body-17-regular
    margin-top: 25px

  .message-link
    color: $color-blue-31
    text-decoration: underline

  .btn-delist
    width: 216px
    margin-top: 61px
    font-family: $font-family-sf-pro-display
    @include body-4-normal

  .cancel-wrapper
    margin-top: 19px
    margin-bottom: 25px
    text-align: center
    .cancel-confirm
      font-family: $font-family-sf-pro-display
      color: $color-blue-20
      @include body-17-normal
      border: none
      width: 216px
      padding: 10px 80px

</style>
