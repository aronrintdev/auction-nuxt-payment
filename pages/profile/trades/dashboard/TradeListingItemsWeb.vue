<template>
  <div class="row justify-content-between flex-wrap">
    <div
      v-for="(trade) in tradesList"
      :key="'trade-' + trade.id"
      role="button"
      class="col-12 col-xl-6 mt-3"
    >
      <div class="trade-listing-item-single">
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
        <div class="d-flex justify-content-between" @click="showTrade(trade.id)">
          <div>
            <div class="trade-id">{{ $t('trades.trade_id') }} #{{ trade.id }}</div>
            <div class="mt-2 listed-time">{{ $t('trades.listed_on') }} {{
                trade.created_at | formatDateTimeString
              }}
            </div>
          </div>
          <div>
            <div class="new-offers d-flex align-items-center">
              <div class="red-circle rounded-circle mr-2"></div>
              <span>{{ $t('trades.new_offers', {'0': trade.new_offers}) }}</span>
            </div>
            <div class="mt-2 view-detail-text text-right">{{ $t('vendor_purchase.view_details') }}</div>
          </div>
        </div>
        <div class="row justify-content-center align-content-center" @click="showTrade(trade.id)">
          <div
            v-for="(offer) in trade.offers"
            :key="'trade-offer-'+offer.id"
            class="d-flex flex-column justify-content-center align-content-center col-4"
          >
            <img class="img-fluid mt-1" :src="offer.inventory.product | getProductImageUrl" />
            <div class="mt-1 product-name text-truncate">{{ offer.inventory.product.name }}</div>
            <div class="mt-1 product-box">
              <span>{{ $t('sell.inventory.box') }}: </span>
              {{ offer.inventory.packaging_condition.name }}
            </div>
            <div class="mt-1 product-size">
              {{ $t('home_page.size') }} {{ offer.inventory.size.id }}
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
  background: $color-white-0
  border-radius: 10px
  padding: 20px 28px 7px 28px

.trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-blue-20
  font-weight: $bold

.new-offers
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-14-normal
  letter-spacing: 0.05em
  color: $color-red-18

.listed-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-gray-4

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

.product-name, .product-box
  @include body-10-medium
  font-family: $font-family-sf-pro-display
  color: $color-black-1

.product-box
  color: $color-gray-5

.view-detail-text
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: 500
  @include body-13
  line-height: 19px
  text-decoration-line: underline
  color: $color-blue-20
.inner-item-image
  width: 58px

.inner-item-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-normal
  color: $color-gray-5

.body-section-box
  border-radius: 0px
  background: $color-white-4
.bottom-section
  background: $color-white-1
.image-tarde
  width: 125px
.box-pro
  background: $color-white-4

.red-circle
  background: $color-red-18
  width: 4px
  height: 4px

.product-size
  @include body-9-medium
  color: $color-black-1

</style>
