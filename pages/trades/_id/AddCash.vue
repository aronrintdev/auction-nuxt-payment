<template>
  <div>
    <div class="cross pl-3 pt-3">
      <img :src="require('~/assets/img/trades/cross-icon.svg')" role="button" @click="cancelAction">
    </div>
    <div class="d-flex justify-content-between pt-3">
      <div class="add-cash">{{heading}}</div>
      <div class="request-cash d-flex align-items-end" role="button" @click="addOrReq(addCash = !addCash)">{{headingReq}}</div>
    </div>
    <div class="balance-deal">{{subHeading}}</div>
    <div class="d-flex flex-column align-items-center">
    <div class="d-flex justify-content-center">
      <Meter :fair="getFairTradeValue()" heading="trades.trade_arena.fair_trade_meter" :highest="parseFloat(theirAmount)" :lowest="0" :value="yourTotal(false)"/>
    </div>
    <div>
      <div class="d-flex justify-content-between pt-2 total-container" >
        <div class="theirs-total d-flex justify-content-center align-items-center">{{$t('trades.trade_arena.theirs')}}: <span class="total-value"> {{theirAmount}}</span></div>
        <div class="yours-total d-flex justify-content-center align-items-center">{{$t('trades.trade_arena.yours')}}: <span class="total-value"> {{yourAmount}}</span></div>
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between align-items-center amount-cont mt-2">
      <div class="amount-headings">
        {{$t('trades.insert_amount')}}
      </div>
      <b-form-input
        id="amount"
        ref="amount"
        v-model="amount"
        placeholder="0"
        type="number"
        class="add-cash-mob"
        autofocus
      ></b-form-input>
    </div>
      <div class="d-flex justify-content-between align-items-center amount-cont mt-2">
      <div class="amount-headings">
        {{$t('trades.your_item_value')}}
      </div>
      <span class="amount-val">{{yourAmount}}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center amount-cont mt-2">
      <div class="amount-headings">
        {{$t('trades.total_value')}}
      </div>
      <span class="amount-val">{{yourTotal()}}</span>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <Button pill variant="dark-blue" class="confirm-btn" @click="confirmAmount()">
        {{$t('common.confirm')}}
      </Button>
    </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Meter from '~/components/common/Meter'
import Button from '~/components/common/Button';
import {DEFAULT_FAIR_TRADE_VALUE} from '~/static/constants/trades';
export default {
  name: 'AddCash',
  components:{
    Button,
    Meter
  },
  props:{
    yourAmount:{
      type: String,
      required:true
    },
    theirAmount:{
      type: String,
      required:true
    },
    addedAmount:{
      type: String,
      default: '0'
    },
    selectedType:{
      type: String,
      default: null
    },
  },
  data(){
    return {
      amount: 0,
      addCash: true,
      fairTradePercentage: (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
    }
  },
  computed:{
    ...mapGetters('trade', ['getYourTradeItems']),// List of your trade items from store
    heading(){
      if(parseInt(this.addedAmount)>0 && this.selectedType === 'add_cash')
      return this.$t('trades.edit_added_cash')
      else if(parseInt(this.addedAmount)>0 && this.selectedType === 'request_cash')
      return this.$t('trades.edit_requested_cash')
      else if(this.addCash) return this.$t('trades.add_cash')
      else return this.$t('trades.request_cash')
    },
    headingReq(){
      if(!this.addCash) return this.$t('trades.add_cash')
      else return this.$t('trades.request_cash')
    },
    subHeading(){
      if(this.addCash) return this.$t('trades.balance_the_deal')
      else return this.$t('trades.balance_the_deal_request')
    },
  },
  mounted() {
    this.amount = parseInt(this.addedAmount)
  },
  methods:{
    addOrReq(val){
      this.addCash = val
    },
    cancelAction(){
      this.$emit('click',false)
    },
    totalAmount(){
      return parseInt(this.yourTotal.replace('$',''))+parseInt(this.amount?this.amount:0)
    },
    /**
     * This function is used to get total amount of wants items
     * offered by you for trade by default it return string 0
     * @returns {string|*}
     */
    yourTotal(formattedPrice = true){
      const price = this.getYourTradeItems.map((item) => item.sale_price)
      const cashAdded = !isNaN(parseFloat(this.amount)) ? this.amount : 0
      if(price.length) {
        return (formattedPrice) ?
          '$' + ((price.reduce((a, b) => a + b, 0)/100) + parseFloat(cashAdded)).toFixed(2) : price.reduce((a, b) => a + b, 0) + (cashAdded * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(cashAdded)) : cashAdded * 100
    },
    confirmAmount(){
      const data = {
        add_cash: this.addCash,
        amount:this.amount
      }
      this.$emit('change',data)
    },
    getFairTradeValue(){
      return (this.theirAmount * this.fairTradePercentage)
    },
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
.amount-cont
  width: 375px
  height: 57px
  padding: 0 24px
  border-bottom: 0.5px solid $color-gray-86
.amount-headings
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-regular
  letter-spacing: 0.045em
  color: $color-black-1
.add-cash-mob
  border: none
  background: unset
  width: 52px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-bold
  letter-spacing: 0.045em
  color: $color-black-1
  padding-right: 0
.amount-val
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-bold
  letter-spacing: 0.045em
  color: $color-black-1
.confirm-btn
  width: 327px
  height: 45px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-medium
  margin-top: 32px
  margin-bottom: 50px

</style>
