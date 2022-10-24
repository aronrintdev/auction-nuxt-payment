<template>
  <div class="card-wrapper">
    <div :class="{
      'px-4': !isScreenXS,
    }"
         class="action-buttons d-flex align-items-center justify-content-between ">
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
          v-if="!selectable && isActionsVisible && !isScreenXS"
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

      <b-dropdown v-if="isScreenXS" id="mobile-down-icon" class="border-0 ml-auto drop-menu" no-caret
                  variant="outlined">
        <template #button-content>
          <img :src="require('~/assets/img/icons/dot-circle-gray.svg')" height="19" width="19">
        </template>
        <Button
            v-if="!selectable && isActionsVisible"
            class="btn-list edit d-flex align-items-center mx-auto"
            icon="edit-pencil.svg"
            icon-height="14"
            icon-pos="left"
            icon-width="14"
            variant="link"
            @click="handleEditClick()"
        >
          {{ $t('common.edit') }}
        </Button>
        <b-dropdown-divider></b-dropdown-divider>
        <Button
            v-if="!selectable && isActionsVisible"
            class="btn-list add d-flex align-items-center mx-auto"
            icon="plus-circle-gray.svg"
            icon-height="15"
            icon-pos="left"
            icon-width="15"
            variant="link"
            @click="handleListClick()"
        >
          {{ $t('common.list') }}
        </Button>

      </b-dropdown>

      <b-checkbox
          v-if="selectable"
          :checked="selected"
          class="check-box position-absolute"
          @change="toggleSelect"
      ></b-checkbox>
    </div>
    <div
        class="
          product-image
          d-flex
          align-items-center
          justify-content-center
          position-relative
        "
        :class="mobileClass"
    >
      <ProductThumb :product="inventory.product"/>

      <div class="image-bottom-text position-absolute w-100 px-4">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <!--          TODO add link to auction, trada or listing-->
          </div>
          <div v-if="inventory.stock" class="stock-count">
            {{ inventory.stock }}X
          </div>
        </div>
      </div>
    </div>
    <div class="product-detail position-relative mt-2">
      <div class="product-title text-truncate">
        {{ inventory.product.name }}
      </div>
      <div class="product-color text-truncate">
        {{ inventory.product.colorway }}, {{ $t('sell.inventory.size') }} {{ inventory.size.size }}
      </div>
      <div class="product-color text-truncate mr-5">
        {{ conditionLabel }}&colon; {{ inventory.packaging_condition.name }}
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
import Button from '~/components/common/Button';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'NewInventoryCard',

  components: {Button, ProductThumb, ConfirmModal},
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

::v-deep.btn-list
  .btn
    @include body-8-normal
    font-family: $font-montserrat
    font-style: normal

  &.edit.btn
    color: $color-blue-20

  &.delist.btn
    color: $color-red-24

::v-deep.drop-menu
  ul.dropdown-menu
    min-width: 80px
</style>
