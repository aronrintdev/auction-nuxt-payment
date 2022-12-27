<template>
  <ul class="list-group">
    <li class="px-3 pb-2 border-bottom">
      <div v-if="auctionItems.length > 1" class="collection-items">
        <b-carousel controls indicators>
          <b-carousel-slide v-for="(item, i) in auctionItems" :key="i" class="h-auto">
            <template #img>
              <b-row class="align-items-center">
                <b-col cols="2" class="pr-0 mb-1 mt-n2">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col cols="10" class="d-flex flex-wrap align-items-baseline pl-4 mt-n2">
                  <div class="text-nowrap overflow-hidden text-truncate">
                    <div class="text-black body-5-normal text-nowrap overflow-hidden text-truncate sf-pro-font">
                      {{ item.inventory.product.name }}
                    </div>
                    <div class="text-gray-6 body-6-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                      {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                        item.inventory.product.colorway
                      }} | {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                        item.inventory.size.size
                      }} |  {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${item.inventory.packaging_condition.category_id}.${item.inventory.packaging_condition.display_order}`) }}
                    </div>
                  </div>
                </b-col>
              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <template v-else>
        <b-row class="align-items-center">
          <b-col cols="2" class="pr-0 mb-1 mt-n2">
            <ProductThumb :product="auctionItems[0].inventory.product" />
          </b-col>
          <b-col cols="10" class="pl-4 d-flex flex-wrap mt-n2">
            <div class="text-nowrap overflow-hidden text-truncate">
              <div class="text-black body-5-normal text-nowrap overflow-hidden text-truncate sf-pro-font">
                {{ auctionItems[0].inventory.product.name }}
              </div>
              <div class="text-gray-6 body-6-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                  auctionItems[0].inventory.product.colorway
                }} | {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                  auctionItems[0].inventory.size.size
                }} |  {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${auctionItems[0].inventory.packaging_condition.category_id}.${auctionItems[0].inventory.packaging_condition.display_order}`) }}
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </li>
    <li class="border-bottom">
      <a
        class="d-flex justify-content-between align-items-center nav-link increase-bid"
        :class="{ disabled: isExpiredOrDelisted }"
        @click="$emit('increase')"
      >
        <span>{{ $t('bids.increase_bid') }}</span>
        <img :src="require('~/assets/img/icons/arrow-right-black.svg')" />
      </a>
    </li>
    <li class="border-bottom">
      <a
        class="d-flex justify-content-between align-items-center nav-link"
        @click="$emit('remove')"
      >
        <span>{{ $t('bids.remove_bid') }}</span>
      </a>
    </li>
    <li>
      <a
        class="d-flex justify-content-between align-items-center nav-link"
        @click="$emit('close')"
      >
        <span>{{ $t('create_listing.confirm.cancel') }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EditBidMobileMenu',
  props: {
    auctionItems: {
      type: Array,
      default: () => null
    },
    inventory: {
      type: Object,
      default: () => null
    },
    isExpiredOrDelisted: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.list-group
  .thumb-wrapper
    img
      padding: 0 !important

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
  &.increase-bid
    img
      width: 8px
  &.disabled
    opacity: 0.25
</style>