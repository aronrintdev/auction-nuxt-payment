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
        <div class="d-flex">
          <div>
            <div class="trade-id">{{ $t('trades.trade_id') }} #{{ trade.id }}</div>
            <div class="listed-time">{{ $t('trades.listed_on') }} {{
                trade.created_at | formatDateTimeString
              }}
            </div>
          </div>
         <div>
           <div class="new-offers ml-4"> {{ $t('trades.new_offers', {'0': trade.new_offers}) }}</div>
           <div class="view-detail-text ml-4"> View Details</div>
         </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-content-center"  @click="showTrade(trade.id)">
        <div class="d-flex justify-content-center align-content-center" v-for="(offer) in trade.offers" :key="'trade-offer-'+offer.id">
          <div class="d-inline body-section-box m-1">
            <div class="d-flex justify-content-center align-content-center">
              <img class="image-tarde pt-4" :src="offer.inventory.product | getProductImageUrl">
            </div>

            <div class="bottom-section mt-4">
              <div class="product-name pt-1">{{ offer.inventory.product.name }}</div>
              <div class="product-size "><span>Size : </span>{{offer.inventory.size.id }}</div>
              <div class="product-size "><span>Box : </span>{{offer.inventory.packaging_condition.name}}</div>
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
  width: 514px
  height: 370px
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 10px

.trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: #667799
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

.product-name
  width: 290px
.view-detail-text
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: 500
  @include body-13
  line-height: 19px
  text-decoration-line: underline
  color: #667799
.inner-item-image
  width: 58px

.inner-item-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-normal
  color: $color-gray-5

.product-name
  width: 90px
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
  height: 215px
  width: 140px
  border-radius: 0px
  background: $color-white-4
.bottom-section
  height: 67px
  //width: 213px
  background: $color-white-1
.image-tarde
  width: 125px
.box-pro
  background: $color-white-4
</style>
