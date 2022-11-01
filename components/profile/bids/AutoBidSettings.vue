<template>
  <div class=" auto-bid px-3 px-md-5 pb-3 w-100 bg-white d-flex flex-column">
    <div>
      <h3 class="auto-bid-title">{{ $t('bids.autobid_settings') }}</h3>
    </div>
    <div class="ml-0 ml-md-5 mt-2 d-flex align-items-center">
      <div class="auto-bid-sub">{{ $t('bids.auto_bid') }}</div>
      <CheckboxSwitch
        class="scale-up mx-2"
        :value="form.isAutoBid"
        @change="handleAutoBidChange"
      />
      <b-form-input v-if="form.isAutoBid" v-model="form.autoBidPrice" type="number" class="bid-input"
                    :placeholder="$t('bids.amount')" step="0.01"></b-form-input>
      <Button
        v-if="form.isAutoBid"
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
      form: {
        isAutoBid: false,
        autoBidPrice: null
      },
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
    haveAutoBid() {
      return this.selectedBid.auction.auto_bid_setting
    }
  },
  mounted() {
    if (this.haveAutoBid) {
      this.form.isAutoBid = !this.selectedBid.auction.auto_bid_setting.is_disabled
      this.form.autoBidPrice = this.form.isAutoBid ? this.selectedBid.auction.auto_bid_setting.price / 100 : null
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
      const payload = {
        id: undefined,
        auction_id: this.selectedBid.auction.id,
        user_id: this.$auth.user.id,
        is_disabled: !this.form.isAutoBid,
        price: this.form.autoBidPrice * 100
      }
      if (this.haveAutoBid)
        payload.id = this.selectedBid.auction.auto_bid_setting.id

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
      this.form.isAutoBid = item
      if (!item) {
        this.changeAutoBid()
        this.$nextTick(() => {
          this.form.autoBidPrice = null
        })
      }
    },
  }
}

</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.scale-up
  transform: scale(1.4)

:deep(.custom-switch)
  .custom-control-input
    &:checked
      & ~ .custom-control-label
        &::before
          color: $color-white-1
          border-color: $color-green-17
          background-color: $color-green-17
          box-shadow: none

:deep(.custom-switch)
  .custom-control-input
    & ~ .custom-control-label
      &::before
        color: $color-white-1
        border-color: rgba($color-gray-61, 0.16)
        background-color: rgba($color-gray-61, 0.16)
        box-shadow: none

:deep(.custom-switch)
  .custom-control-input
    &:checked
      & ~ .custom-control-label
        &::after
          background-color: $color-white-1

:deep(.custom-switch)
  .custom-control-input
    & ~ .custom-control-label
      &::after
        background-color: $color-white-1

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
</style>
