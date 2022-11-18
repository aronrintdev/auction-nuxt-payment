<template>
  <div class="d-flex justify-content-between flex-wrap">
    <div 
      v-for="(trade) in tradesList" 
      :key="'trade-' + trade.id" 
      role="button"
      class="trade-listing-item-single w-100 mt-3"
    >
      <b-row class="justify-content-end">
        <b-checkbox
          v-if="selectable"
          class="pr-2 pt-2"
          :checked="selected"
          :value="trade.id"
          @change="toggleSelect(trade.id)"
        >
        </b-checkbox>
      </b-row>
      <div>

        <div class="row justify-content-between" @click="showTrade(trade.id)">
          <div class="trade-id col-7">{{ $t('trades.trade_id') }} #{{ trade.id }}</div>
          <div class="col-5 new-offers d-flex align-items-center justify-content-end">
            <div class="red-circle rounded-circle mr-2"></div>
            <span>{{ $t('trades.new_offers', {'0': trade.new_offers}) }}</span>
          </div>
        </div>
        <div class="mt-1 listed-time">{{ $t('trades.listed_on') }} {{
            trade.created_at | formatDateTimeString
          }}
        </div>
        <div class="mt-1 row justify-content-center align-content-center"  @click="showTrade(trade.id)">
          <div 
            class="d-flex flex-column justify-content-center col-4" 
            v-for="(offer) in trade.offers" 
            :key="'trade-offer-' + offer.id"
          >
            <img class="img-fluid" :src="offer.inventory.product | getProductImageUrl">
            <div class="mt-3 product-name">{{ offer.inventory.product.name }}</div>
            <div class="mt-1 product-info d-flex">
              <div class="w-50 text-truncate">{{ offer.inventory.product.colorway }}</div>
              <div>, {{ $t('home_page.size') }}: {{ offer.inventory.size.id }}</div>
            </div>
            <div class="mt-1 product-info text-truncate">
              {{ $t('sell.inventory.box') }}: {{ offer.inventory.packaging_condition.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeListingItems',
  props: {
    tradesList: {
      type: Array,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
      required: false
    },
    selected: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    showTrade(tradeId) {
      this.$router.push('/profile/trades/dashboard/' + tradeId + '/offers')
    },
    toggleSelect(id) {
      this.$emit('click', id)
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.trade-listing-item-single
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 5px
  padding: 13px
  padding-bottom: 16px

.trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-bold
  color: $color-blue-20
.new-offers
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-21-normal
  color: $color-red-18

.listed-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-21-normal
  color: $color-gray-47

.inner-items-listed
  width: 430px
  height: 220px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.inner-heading-listing
  background: $color-gray-1
  border-radius: 9px 9px 0 0
  font-family: $font-family-montserrat
  font-style: normal
  @include body-3-bold
  color: $color-black-1

.inner-item-image
  width: 58px

.inner-item-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-normal
  color: $color-gray-5

.product-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.product-size
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  font-size: 10px
.body-section-box
  height: 137px
  width: 100px
  border-radius: 0px
  background: $color-white-4
.bottom-section
  height: 67px
  width: 100px
  background: $color-white-1
.image-tarde
  width: 68px
  height: 65px
.box-pro
  background: $color-white-4

.red-circle
  background: $color-red-18
  width: 4px
  height: 4px

.product-info
  @include body-6-normal
  color: $color-gray-5
  font-family: $font-family-sf-pro-display

.w-50
  width: 50%

</style>
