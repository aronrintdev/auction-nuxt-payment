<template>
  <ul class="list-group">
    <li class="px-2 pb-3 border-bottom">
      <div v-if="auctionItems" class="collection-items">
        <b-carousel controls indicators>
          <b-carousel-slide v-for="(item, i) in auctionItems" :key="i" class="h-auto">
            <template #img>
              <b-row>
                <b-col cols="2">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col cols="10" class="d-flex flex-wrap align-items-baseline">
                  <div class="text-nowrap overflow-hidden text-truncate">
                    <div class="text-black body-5-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                      {{ item.inventory.product.name }}
                    </div>
                    <div class="text-gray-6 body-6-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                      {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                        item.inventory.product.colorway
                      }} | {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                        item.inventory.size.size
                      }} |  {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
                    </div>
                  </div>
                </b-col>
              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <template v-else>
        <b-row>
          <b-col cols="2">
            <ProductThumb :product="inventory.product" class="w-25" />
          </b-col>
          <b-col cols="10" class="d-flex flex-wrap">
            <div class="text-nowrap overflow-hidden text-truncate">
              <div class="text-black body-5-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                {{ inventory.product.name }}
              </div>
              <div class="text-gray-6 body-6-normal text-nowrap overflow-hidden text-truncate sf-pro-font mt-1">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                  inventory.product.colorway
                }} | {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                  inventory.size.size
                }} |  {{ $t('products.box_condition') }}&colon;&nbsp;{{ inventory.packaging_condition.name }}
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </li>
    <li class="border-bottom">
      <a
        class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between"
        @click="$emit('edit')"
      >
        <span>{{ isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid') }}</span>
        <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
      </a>
    </li>
    <li class="border-bottom">
      <a
        class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between"
        @click="$emit('viewSimilar')"
      >
        <span>{{ $t('bids.view_similar') }}</span>
        <img src="~/assets/img/icons/arrow-right-black.svg" class="pl-3"/>
      </a>
    </li>
    <li>
      <a
        class="p-3 d-inline-block text-black body-3-normal d-flex justify-content-between"
        @click="$emit('close')"
      >
        <span>{{ $t('create_listing.confirm.cancel') }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MobileMenu',
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
  }
}
</script>
