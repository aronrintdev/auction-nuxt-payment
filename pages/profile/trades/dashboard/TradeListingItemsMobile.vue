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
      <div>

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
        <div class="d-flex justify-content-center align-content-center">
          <div class="d-flex justify-content-center align-content-center" v-for="(offer) in trade.offers" :key="'trade-offer-'+offer.id">
            <div class="d-inline body-section-box m-1">
              <div class="d-flex justify-content-center align-content-center">
                <img class="image-tarde" :src="offer.inventory.product | getProductImageUrl">
              </div>

              <div class="bottom-section mt-4">
                <div class="product-name p-1">{{ offer.inventory.product.name }}</div>
                <div class="product-size p-1"><span>Size</span>{{offer.inventory.size.id }}</div>
              </div>
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
  width: 350px
  height: 265px
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 5px

.trade-id
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 700
  font-size: 16px
  line-height: 19px
  color: #667799
.new-offers
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 13px
  line-height: 18px
  color: #E90000

.listed-time
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 13px
  line-height: 16px
  color: #999999

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
  width: 90px
  height: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 11px
  line-height: 13px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.product-size
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 10px
.body-section-box
  height: 143px
  width: 100px
  border-radius: 0px
  background: #FFFFFF
  border: 1px solid #D8D8D8
.bottom-section
  height: 52px
  width: 98px
  background: #F7F7F7
.image-tarde
  width: 68px
  height: 65px
</style>
