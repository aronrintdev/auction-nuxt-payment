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
        <ProductThumb :product="inventory.product" overlay />

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

        <div
          v-if="addable"
          class="check-box position-absolute"
          role="button"
        >
          <img :src="plusIcon" alt="addIcon" @click="addClicked" />
        </div>
        <div
          v-if="removable"
          class="check-box position-absolute"
          role="button"
        >
          <img :src="removeFillIcon" alt="removeIcon"  class="remove" @click="removeClicked" />
        </div>
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
import removeFillIcon from '~/assets/img/icons/red-remove-icon.svg'

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
  .product-info
    .product-image
      padding: 60px 40px 40px
      background-color: $color-white-4
      .thumb-wrapper::v-deep
        .overlay
          background: rgba(195, 195, 195, 0.1)
      .product-overlay
        top: 0
        left: 0
        z-index: 1
        background: rgba($white, 0.1)

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
        right: 10px
        top: 10px
        line-height: 1em
        z-index: 10

    .product-detail
      padding: 10px 3px
      font-family: $font-sp-pro

      .product-title
        font-weight: $medium
        @include body-8
        color: $color-black-1
        margin-bottom: 1px

      .product-color
        font-weight: $normal
        @include body-5
        color: $color-gray-5
        margin-bottom: 1px

      .product-price
        font-weight: $normal
        @include body-5
        color: $black
        margin-top: 4px

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
    top: 10px
    right: 10px
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
      .product-image
        background: $color-white-4
        padding: 10px
        .check-box
          img
            width: 16px
            height: 16px
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
          font-weight: $medium
          color: $black
    .checkbox-label
      img
        width: 19px
        height: 19px
</style>
