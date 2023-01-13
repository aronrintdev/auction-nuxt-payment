<template>
<ul class="list-group">
  <li class="px-3 pb-2 border-bottom">
    <b-row class="align-items-center">
      <b-col cols="2" class="pr-0 mb-1 mt-n2">
        <ProductThumb :product="inventory.product" />
      </b-col>
      <b-col cols="10" class="pl-4 d-flex flex-wrap mt-n2">
        <div class="text-nowrap overflow-hidden text-truncate">
          <div class="text-black body-5-normal text-nowrap overflow-hidden text-truncate sf-pro-font">
            {{ inventory.product.name }}
          </div>
          <div class="text-gray-6 body-6-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
            {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
              inventory.product.colorway
            }} | {{ $t('products.box_condition') }}&colon;&nbsp;{{ inventory.packaging_condition.name }}
            | {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
              inventory.size.size
            }}
          </div>
        </div>
      </b-col>
    </b-row>
  </li>
  <li v-if="!inventory.listing_items.length" class="border-bottom">
    <a
      class="d-flex justify-content-between align-items-center nav-link"
      @click="$emit('list')"
    >
      <span>{{ $t('common.list') }}</span>
      <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
    </a>
  </li>
  <li class="border-bottom">
    <a
      class="d-flex justify-content-between align-items-center nav-link"
      @click="$emit('edit')"
    >
      <span>{{ $t('common.edit') }}</span>
      <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
    </a>
  </li>
  <li v-if="inventory.listing_items.length" class="border-bottom">
    <a
      class="d-flex justify-content-between align-items-center nav-link"
      @click="$emit('delist')"
    >
      <span>{{ $t('auction.delist') }}</span>
      <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
    </a>
  </li>
  <li class="border-bottom">
    <a
      class="d-flex justify-content-between align-items-center nav-link"
      @click="$emit('delete')"
    >
      <span>{{ $t('common.delete') }}</span>
    </a>
  </li>
  <li>
    <a
      class="d-flex justify-content-between align-items-center nav-link"
      @click="$emit('cancel')"
    >
      <span>{{ $t('create_listing.confirm.cancel') }}</span>
    </a>
  </li>
</ul>
</template>

<script>
export default {
  name: 'MobileInventoryOptions',
  props: {
    inventory: {
      type: Object,
      default: () => null
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.nav-link
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-17
  letter-spacing: -0.02em
  color: $black
  height: 54px
  padding-left: 20px
  padding-right: 13px
  img
    width: 24px
    height: 22px

.sf-pro-font
  font-family: $font-family-sf-pro-display
</style>
