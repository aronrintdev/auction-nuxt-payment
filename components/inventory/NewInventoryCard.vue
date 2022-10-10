<template>
  <div class="card-wrapper">
    <div
        class="
          product-image
          d-flex
          align-items-center
          justify-content-center
          position-relative
        "
    >
      <ProductThumb :product="inventory.product"/>

      <b-checkbox
          v-if="selectable"
          :checked="selected"
          class="check-box position-absolute"
          @change="toggleSelect"
      ></b-checkbox>
    </div>
    <div class="product-detail position-relative mt-2">
      <div class="product-title text-truncate">
        {{ inventory.product.name }}
      </div>
      <div class="product-color text-truncate">
        {{ inventory.product.colorway }}, {{ $t('sell.inventory.size') }} {{ inventory.size.size }}
      </div>
      <div class="product-color text-truncate mr-5">
        {{ $t('sell.inventory.package') }}&colon; {{ inventory.packaging_condition.name }}
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
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ProductThumb from '~/components/product/Thumb'
import {ConfirmModal} from '~/components/modal'
import plusIcon from '~/assets/img/icons/plus_circle.svg'
import removeIcon from '~/assets/img/icons/red-remove.svg'

export default {
  name: 'NewInventoryCard',

  components: {ProductThumb, ConfirmModal},

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
  },
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-image
  padding: 25px
  height: 273px
  width: 242px
  background-color: $color-white-4

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

.product-detail
  font-family: $font-family-sf-pro-display
  @include body-5-normal
  padding: 5px 8px
  max-width: 242px

  .product-title
    @include body-8
    color: $color-black-1
    margin-bottom: 3px
    font-weight: $medium

  .product-color
    color: $color-gray-5
    margin-bottom: 3px

  .product-price
    color: $color-black-1
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
</style>
