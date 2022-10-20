<template>
  <div>
    <div class="cross pl-3 pt-3">
      <img :src="require('~/assets/img/trades/cross-icon.svg')" role="button">
    </div>
    <div class="d-flex justify-content-between pt-3">
      <div class="add-cash">Add Cash</div>
      <div class="request-cash d-flex align-items-end" role="button">Request Cash</div>
    </div>
    <div class="balance-deal">Balance this deal by adding cash</div>
    <div class="d-flex flex-column align-items-center">
    <div class="d-flex justify-content-center">
      <Meter :fair="70" heading="trades.trade_arena.fair_trade_meter" :highest="100" :lowest="0" :value="60"/>
    </div>
    <div>
      <div class="d-flex justify-content-between pt-2 total-container" >
        <div class="theirs-total d-flex justify-content-center align-items-center">{{$t('trades.trade_arena.theirs')}}: <span class="total-value"> $200.00</span></div>
        <div class="yours-total d-flex justify-content-center align-items-center">{{$t('trades.trade_arena.yours')}}: <span class="total-value"> $200.00</span></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Meter from '~/components/common/Meter'
export default {
  name: 'AddCash',
  components:{
    Meter
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.add-cash
  padding-left: 24px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-31-medium
  color: $color-black-1
.request-cash
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-blue-20
  padding-right: 24px
.balance-deal
  font-family: $font-family-montserrat
  font-style: normal
  @include body-10-regular
  color: $color-gray-5
  padding-left: 24px
  padding-bottom: 12px
.theirs-total,.yours-total
  width: 122px
  height: 32px
  border: 0.5px solid $light-gray-2
  border-radius: 4px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  color: $color-black-1
.total-value
  color: $color-gray-5
  @include body-5-normal
.total-container
  width: 335px

</style>
