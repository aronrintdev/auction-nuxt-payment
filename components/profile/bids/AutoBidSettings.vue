<template>
  <div class=" auto-bid px-3 px-md-5 pb-3 w-100 bg-white d-flex flex-column">
    <div>
      <h3 class="auto-bid-title">{{ $t('bids.autobid_settings') }}</h3>
    </div>
    <div class="ml-0 ml-md-5 mt-2 d-flex align-items-center">
      <div class="auto-bid-sub">{{ $t('bids.auto_bid') }}</div>
      <CheckboxSwitch
        class="mx-2 "
        :value="isAutoBid"
        @change="handleAutoBidChange"
      />
      <b-form-input
        v-if="isAutoBid"
        v-model="autoBidPrice"
        type="number"
        class="bid-input"
        :class="{ 'error' : hasError }"
        :placeholder="$t('bids.amount')"
        step="0.01"
      ></b-form-input>
      <Button
        v-if="isAutoBid"
        variant="link"
        class="btn-save ml-3"
        :disabled="saveLoading"
        :tooltip-text="$t('common.save')"
        @click="changeAutoBid"
      ></Button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {Button, CheckboxSwitch} from '~/components/common';

/**
 * This is the code for the AutoBidSettings component.
 * @name = AutoBidSettings
 */
export default {
  name: 'AutoBidSettings',
  components: {Button, CheckboxSwitch},
  data() {
    return {
      isAutoBid: false,
      autoBidPrice: null,
      hasError: false,
      saveLoading: false
    }
  },
  computed: {
    ...mapGetters({
      selectedBid: 'profile-bids/getSelectedBid',
    }),
    /**
     * A computed property that returns the auto bid setting of the selected bid.
     * @returns {bid}
     */
    autoBidSetting() {
      return this.selectedBid.auction.auto_bid_settings && this.selectedBid.auction.auto_bid_settings[0]
    }
  },
  watch: {
    autoBidPrice() {
      this.hasError = false
    }
  },
  mounted() {
    if (this.autoBidSetting) {
      this.isAutoBid = !this.autoBidSetting.is_disabled
      this.autoBidPrice = this.isAutoBid ? this.autoBidSetting.price / 100 : null
    }
  },
  methods: {
    ...mapActions({
      editAutoBid: 'profile-bids/editAutoBid'
    }),
    /**
     * A method that is called when the user clicks the save button. It is used to save the auto bid settings.
     */
    changeAutoBid() {
      if (this.autoBidPrice * 100 < this.selectedBid.auction.highest_bid ||
        this.autoBidPrice * 100 < this.selectedBid.auction.start_bid_price) 
      {
        this.hasError = true
        return
      }
      const payload = {
        id: this.autoBidSetting.id,
        auction_id: this.autoBidSetting.auction_id,
        is_disabled: !this.isAutoBid,
        price: this.autoBidPrice * 100
      }
      this.saveLoading = true
      this.editAutoBid(payload).then(res => {
        this.$toasted.success(this.$t('bids.messages.saved'))
        this.$emit('update-bid')
      }).catch(err => {
        this.$toasted.error(err.data.message)
      }).finally(() => {
        this.saveLoading = false
      })
    },
    handleAutoBidChange(item) {
      this.isAutoBid = item
      if (!item) {
        this.changeAutoBid()
        this.$nextTick(() => {
          this.autoBidPrice = null
        })
      }
    },
  }
}

</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

::v-deep .checkbox-switch
  line-height: 32px
  span[role='button']
    font-family: $font-montserrat
    @include body-5-bold
    margin-top: 7px
  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background-color: rgba(120, 120, 128, 0)
      border: none
      height: 31px
      width: 51px
      box-shadow: none
      background-image: url('~/assets/img/profile/wishlist/toggle-bg.svg')
      background-repeat: no-repeat

    .custom-control-label::after
      background: $color-white
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%
    .custom-control-input:checked ~ .custom-control-label::after
      transform: translateX(1.27rem)

.btn-save.btn
  width: 30px
  height: 30px
  background-image: url('~/assets/img/icons/save.svg')
  background-repeat: no-repeat
  background-size: 30px
  background-position: center
  border: none
  border-radius: 4px

.auto-bid-title
  @include body-2
  font-family: $font-family-base
  font-weight: $normal

.auto-bid-sub
  @include body-4
  font-family: $font-family-base
  font-weight: $normal
  color: $color-gray-5

.auto-bid
  border-radius: 10px
  border: 1px solid $color-gray-60
  padding: 15px 10px


.bid-input
  @include body-5
  height: 30px
  max-width: 100px
  font-weight: $regular
  color: $color-gray-5 !important
  background-color: white
  border: 1px solid $color-gray-4
  box-sizing: border-box

  &::-webkit-inner-spin-button
    -webkit-appearance: none

@media (max-width: 576px)
  .auto-bid-title
    @include body-5
    font-weight: $medium
  .auto-bid-sub
    @include body-10

.error
  border: 1px solid $color-red-2
</style>
