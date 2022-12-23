<template>
  <b-container fluid class="container-profile-inventory-confirm h-100">
    <Button to="/profile/inventory/search" variant="link" class="btn-back">
      <img :src="require('~/assets/img/icons/back.svg')" alt="back" />
      {{ $t('common.back') }}
    </Button>

    <h2 class="title mt-3">{{ $t('inventory.confirm_inventory') }}</h2>

    <table class="mt-2 w-100 table-inventory">
      <thead>
        <tr>
          <th class="p-3 font-sf-pro">{{ $t('common.details') }}</th>
          <th class="text-center p-3 font-sf-pro">{{ $t('common.amount') }}</th>
          <th class="text-center p-3 font-sf-pro">{{ $t('common.price') }}</th>
          <th class="text-center p-3 font-sf-pro">{{ $tc('common.action', 2) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(inventory, index) in inventories"
          :key="index"
          class="inventory-row"
        >
          <td class="d-flex align-items-center p-3">
            <ProductThumb
              :product="inventory.product"
              :width='83'
              :height='53'
              class="mr-2 flex-shrink-0 product-img"
            />
            <div>
              <div class="title mb-1">{{ inventory.product.name }}</div>
              <div class="info mb-1">
                {{ $t('common.sku') + ': ' + inventory.product.sku }}
              </div>
              <div class="info mb-1">
                {{ $t('common.colorway') + ': ' + inventory.product.colorway }}
              </div>
              <div class="info mb-1">
                {{ $tc('common.size', 1) + ': ' + getSize(inventory) }}
              </div>
              <div class="info">
                {{
                  $t('common.box_condition') +
                  ': ' +
                  getPackagingCondition(inventory)
                }}
              </div>
            </div>
          </td>
          <td class="p-3 text-center">{{ inventory.quantity }}</td>
          <td class="p-3 text-center">{{ inventory.price | toCurrency }}</td>
          <td class="p-3">
            <div class="d-flex justify-content-center align-items-center">
              <Button
                variant="link"
                class="btn-copy mr-2"
                :tooltip-text="$t('common.copy')"
                @click="handleCopy(inventory)"
              ></Button>
              <Button
                variant="link"
                class="btn-edit-inventory mr-2"
                :tooltip-text="$t('common.edit')"
                @click="handleEdit(inventory)"
              ></Button>
              <Button
                variant="link"
                class="btn-delete"
                :tooltip-text="$t('common.delete')"
                @click="handleDelete(inventory)"
              ></Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 d-flex justify-content-center">
      <Button
        to="/profile/inventory/search"
        variant="outline-primary mr-5"
        pill
        >{{ $t('inventory.add_another_item') }}</Button
      >
      <Button variant="dark-blue" pill @click="handleAddInventoryClick">{{
        $t('inventory.add_to_inventory')
      }}</Button>
    </div>

    <AlertModal
      id="added-message-modal"
      :message="$t('inventory.message.added')"
      icon="tick"
      auto-hide
      @hidden="onAddedModalHidden"
    />
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Button } from '~/components/common'
import ProductThumb from '~/components/product/Thumb'
import AlertModal from '~/components/modal/Alert'

export default {
  name: 'ProfileInventoryConfirm',

  components: { Button, ProductThumb, AlertModal },

  layout: 'Profile',

  computed: {
    ...mapGetters({
      inventories: 'inventory/getDrafts',
      referer: 'inventory/getReferrer'
    }),
  },

  methods: {
    ...mapActions({
      addInventory: 'inventory/addInventoryToDraft',
      deleteInventory: 'inventory/deleteInventoryFromDraft',
      createInventories: 'inventory/createInventories',
    }),

    getSize(inventory) {
      return inventory.product.sizes.find((i) => i.id === inventory.sizeId)
        ?.size
    },

    getPackagingCondition(inventory) {
      return inventory.product.packaging_conditions.find(
        (i) => i.id === inventory.packagingConditionId
      )?.name
    },

    handleCopy(inventory) {
      this.addInventory({ ...inventory })
    },

    handleEdit(inventory) {
      this.$router.push({
        path: '/profile/inventory/draft',
        query: { id: this.inventories.indexOf(inventory) },
      })
    },

    handleDelete(inventory) {
      this.deleteInventory(inventory)
    },

    handleAddInventoryClick() {
      this.createInventories(
        this.inventories.map((i) => {
          return {
            size_id: i.sizeId,
            packaging_condition_id: i.packagingConditionId,
            product_id: i.product.id,
            stock: i.quantity,
            sale_price: i.price,
          }
        })
      ).then(() => {
        this.$bvModal.show('added-message-modal')
      })
    },

    onAddedModalHidden() {
      this.$router.push(this.referer)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory-confirm
  padding: 47px 54px
  background-color: $color-white-5

  .btn-back
    @include body-5-regular
    color: $color-gray-40

    img
      margin-right: 9px

  h2.title
    @include heading-1
    color: $color-black-1

  .table-inventory
    th
      font-family: $font-family-sf-pro-display
    .inventory-row
      @include body-4-regular
      color: $color-black-1
      background-color: $color-white-1
      border-bottom: 10px solid $color-white-5

      .title
        @include body-8-medium
        color: $color-black-1
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        font-size: 15px

      .info
        @include body-10-normal
        color: $color-gray-6
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        font-size: 13px

      .btn-copy
        width: 30px
        height: 30px
        background-image: url('~/assets/img/product/actions.png')
        background-position: left
        border: none

      .btn-edit-inventory
        width: 30px
        height: 30px
        background-image: url('~/assets/img/product/actions.png')
        background-position: center
        border: none

      .btn-delete
        width: 30px
        height: 30px
        background-image: url('~/assets/img/product/actions.png')
        background-position: right
        border: none

.product-img
  width: 83px
  height: 53px

.font-sf-pro
  font-family: $font-sp-pro
</style>
