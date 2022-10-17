<template>
  <div class="purchase-card">
    <Carousel
        ref="sizeCarousel"
        :center="true"
        :dots="true"
        :loop="false"
        :margin="20"
        :mouse-drag="false"
        :nav="true"
        :nav-text="['', '']"
        :responsive="{
            0: { items: 1, nav: false, center: true },
          }"
        class="carousel slide-fade position-relative size-carousel"
    >
      <template #default>
        <div
            v-for="(item, index) in purchase.items" :key="item.id"
            :data-position="index"
            :data-size="item.id"
        >
          <b-row>
            <b-col class="title-item text-nowrap text-truncate" offset="4">
              {{ item.listing_item.inventory.product.name }}
            </b-col>
          </b-row>
          <b-row class="">
            <b-col cols="4">
              <ProductThumb :product="item.listing_item.inventory.product" width="82"/>
            </b-col>
            <b-col class="item-desc" cols="8">
              <div v-if="item.listing_item.inventory.product.sku" class="text-nowrap text-truncate mt-1">
                {{ $t('common.sku') }}: {{ item.listing_item.inventory.product.sku }}
              </div>
              <div v-if="item.listing_item.inventory.product.colorway" class="text-nowrap text-truncate mt-1">
                {{ $t('common.colorway') }}: {{ item.listing_item.inventory.product.colorway }}
              </div>
              <div v-if="item.listing_item.inventory.product.sku" class="text-nowrap text-truncate mt-1">
                {{ $t('common.box_condition') }}: {{ item.listing_item.inventory.product.sku }}
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';

export default {
  name: 'MobilePurchaseHistoryCard',
  components: {ProductThumb},
  props: {
    purchase: {
      type: Object,
      default: () => {
      },
    },
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.purchase-card
  box-shadow: 0 1px 4px rgba($color-black-1, 0.25)
  border-radius: 8px
  padding: 22px 12px
  margin-top: 15px
  font-style: normal


  .item-desc
    @include body-6-normal
    font-family: $font-family-sf-pro-display
    color: $color-gray-6

  .title-item
    @include body-5-medium
    font-family: $font-family-sf-pro-display


</style>
