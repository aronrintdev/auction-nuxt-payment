<template>
  <div class="inventory-card-wrapper">
    <div class="product-info">
      <div
        class="
          product-image
          d-flex
          align-items-center
          justify-content-center
          position-relative
        "
      >
        <ProductThumb :product="inventory.product" />

        <div class="product-overlay position-absolute w-100 h-100">
        </div>

        <label v-if="selectable" class="position-absolute d-flex align-items-center checkbox-label">
          <input
            type="checkbox"
            class="check-box position-absolute"
            :checked="selected"
            @change="toggleSelect"
          />
          <img :src="plusIcon" alt="addIcon" class="add" />
          <img :src="removeIcon" alt="addIcon" class="remove" />
          
        </label>

        <span
          v-if="addable"
          class="check-box position-absolute mr-1"
          role="button"
        >
          <img :src="plusIcon" alt="addIcon" @click="addClicked" />
        </span>
        <span
          v-if="removable"
          class="check-box position-absolute mr-1"
          role="button"
        >
          <img :src="removeIcon" alt="addIcon" class="remove d-none d-md-block" @click="removeClicked" />
          <img :src="removeFillIcon" alt="removeIcon"  class="remove d-md-none" @click="removeClicked" />
        </span>
      </div>

      <div class="product-detail position-relative">
        <div class="product-title text-truncate">
          {{ inventory.product.name }}
        </div>
        <div class="product-color text-truncate">
          {{ inventory.product.colorway }}, {{ `${$tc('common.size', 1)} ${inventory.size.size}` }}
        </div>
        <div class="product-color text-truncate">
          {{ inventory.packaging_condition.name }}
        </div>
        <div class="product-price text-truncate">
          {{ inventory.sale_price | toCurrency }}
        </div>

        <div
          v-if="stockVisible"
          class="product-stock position-absolute text-truncate"
        >
          x{{ inventory.stock }}
        </div>
      </div>
    </div>

    <div
      v-if="isActionsVisible"
      class="d-flex justify-content-between align-items-center actions"
    >
      <Button
        variant="outline-secondary"
        icon="list-gray.svg"
        icon-hover="list-white.svg"
        icon-class="mt-1"
        icon-width="17"
        icon-height="12"
        icon-pos="right"
        class="btn-list"
        @click="handleListClick()"
      >
        {{ $t('common.list') }}
      </Button>
      <Button
        variant="outline-secondary"
        icon="pencil-gray.svg"
        icon-hover="pencil-white.svg"
        icon-width="12"
        icon-height="12"
        icon-pos="right"
        class="btn-list"
        @click="handleEditClick()"
      >
        {{ $t('common.edit') }}
      </Button>
      <Button
        variant="outline-secondary"
        class="btn-delete"
        icon="trash-gray.svg"
        icon-hover="trash-white.svg"
        icon-only
        @click="handleDeleteClick()"
      ></Button>
    </div>

    <ConfirmModal
      :id="`confirm-delete-modal-${inventory.id}`"
      :message="$t('inventory.message.confirm_delete')"
      :confirmLabel="$t('common.delete')"
      @confirm="onConfirmDelete"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Button } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import { ConfirmModal } from '~/components/modal'
import plusIcon from '~/assets/img/icons/plus_circle.svg'
import removeIcon from '~/assets/img/icons/red-remove.svg'
import removeFillIcon from '~/assets/img/icons/minus-filled-red.svg'

export default {
  name: 'InventoryCard',

  components: { ProductThumb, Button, ConfirmModal },

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
      removeFillIcon,
    }
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
      this.$emit('list', { inventory: this.inventory, checked: true })
    },

    handleEditClick() {
      this.$router.push({
        path: '/profile/inventory/edit',
        query: { id: this.inventory.id },
      })
    },

    handleDeleteClick() {
      this.$bvModal.show(`confirm-delete-modal-${this.inventory.id}`)
    },

    onConfirmDelete() {
      this.deleteInventories({ ids: [this.inventory.id] })
      this.$nuxt.refresh()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.inventory-card-wrapper
  max-width: 213px
  margin-left: auto
  margin-right: auto

  .product-info
    border: 1px solid $color-gray-23

    .product-image
      padding: 25px
      height: 200px
      background-color: $color-white-1

      .product-overlay
        top: 0
        left: 0
        z-index: 1
        background: rgba($white, 0.49)

      .product-size
        @include body-5-regular
        color: $color-black-1
        top: 12px
        left: 13px
        border: 1px solid $color-gray-23
        border-radius: 2px
        width: 88px
        height: 20px
        display: flex
        align-items: center
        justify-content: center
        overflow: hidden

      .check-box
        right: 4px
        top: 10px
        z-index: 10

    .product-detail
      @include body-10-normal
      padding: 5px 8px

      .product-title
        @include body-5-medium
        color: $color-black-1
        margin-bottom: 3px

      .product-color
        color: $color-gray-5
        margin-bottom: 3px

      .product-price
        color: $color-gray-39
        margin-top: 3px

      .product-stock
        @include body-4-normal
        background-color: $color-gray-4
        border-radius: 4px
        color: $color-white-1
        padding: 4px 5px
        bottom: 11px
        right: 8px
        max-width: 50px

  .actions
    margin-top: 12px

    .btn-list::v-deep
      @include body-10-normal
      width: 82px
      height: 32px
      padding: 0
      border-color: $color-gray-4

    .btn-delete::v-deep
      width: 27px
      height: 32px
      padding: 0
      border-color: $color-gray-4
  
  .checkbox-label
    top: 4px
    right: 4px
    z-index: 2
    .check-box
      visibility: hidden
      & ~ .remove
        display: none
      &:checked ~ .remove
        display: block
      &:checked ~ .add
        display: none

  @media (max-width: 576px)
    .product-info
      border: none
      padding-left: 6px
      padding-right: 6px
      .product-image
        background: $color-white-4
        padding: 10px
      .product-detail
        .product-title
          font-size: 13px
          line-height: 130%
        .product-color
          font-size:  13px
          line-height: 130%
        .product-price
          font-size: 12px
          line-height: 14px
          color: $black
    .checkbox-label
      img
        width: 19px
        height: 19px
</style>
