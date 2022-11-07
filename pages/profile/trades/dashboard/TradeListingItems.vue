<template>
  <div class="d-flex justify-content-between flex-wrap pr-4">
    <div v-for="(trade) in tradesList" :key="'trade-' + trade.id" role="button"
         class="trade-listing-item-single mt-3">
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
      <div class="d-flex justify-content-between p-4" @click="showTrade(trade.id)">
        <div class="d-block">
          <div class="trade-id">{{ $t('trades.trade_id') }} #{{ trade.id }}</div>
          <div class="listed-time">{{ $t('trades.listed_on') }} {{
              trade.created_at | formatDateTimeString
            }}
          </div>
        </div>
        <div class="new-offers pr-3">
          <ul>
            <li>{{ $t('trades.new_offers', {'0': trade.new_offers}) }}</li>
          </ul>
        </div>
      </div>
      <div class="inner-items-listed ml-auto mr-auto" @click="showTrade(trade.id)">
        <div class="inner-heading-listing text-center p-2">
          {{ $t('trades.your_listed_items') }}
        </div>
        <div v-for="(offer) in trade.offers" :key="'trade-offer-'+offer.id"
             class="d-flex align-items-center ml-4">
          <img :src="offer.inventory.product | getProductImageUrl" class="inner-item-image h-auto">
          <ul class="inner-item-text">
            <li class="pt-3 text-truncate product-name">{{ offer.inventory.product.name | truncate(32, '...') }}</li>
          </ul>
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
  width: 514px
  height: 370px
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 10px

.trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-blue-1

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

.product-name
  width: 90%
</style>
