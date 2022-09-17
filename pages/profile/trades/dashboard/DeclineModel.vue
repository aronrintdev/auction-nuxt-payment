<template>
  <div>
    <b-modal id="declineOffer" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>
      <div v-if="offerDeclined" class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="closeModal()">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
            {{$t('trades.offer_has_been_decline')}}
          </b-col>
        </b-row>
        <b-row class="justify-content-center mb-4 mt-4">
          <img :src="require('~/assets/img/trades/tick-icon.svg')">
        </b-row>
      </div>
      <div v-else class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="closeModal()">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
              {{ $t('trades.are_you_sure_decline_offer') }}
          </b-col>
        </b-row>
        <b-row class="justify-content-center mb-4 mt-4">
          <Button pill class="mr-5" @click="declineOffer()">{{$t('trades.decline')}}</Button>
          <Button pill variant="outline-dark" @click="closeModal()">{{$t('trades.cancel')}}</Button>
        </b-row>
        <b-row class="justify-content-center mb-4 mt-4">
          <b-checkbox
            class="checkbox-remove-trade" @change="setFutureBlock()"
          >
            {{$t('trades.stop_all_future_trades')}}
          </b-checkbox>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Button from '~/components/common/Button';
export default {
  name: 'DeclineModel',
  components: {Button},
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      offerDeclined : false,
      blockForFuture: 0,
      offerUpdated: false
    }
  },
  methods: {
    declineOffer(){
      this.$emit('decline', this.blockForFuture)
      this.offerDeclined = this.offerUpdated = true
    },
    setFutureBlock(){
      this.blockForFuture = !this.blockForFuture
    },
    closeModal(){
      this.$emit('close', this.offerUpdated)
      this.$bvModal.hide('declineOffer')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.checkbox-remove-trade
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  font-size: 14px
  color: $color-black-1

.model-text-inner
  max-width: 300px
  font-family: $font-family-sf-pro-text
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 150%
  color: $color-black-1
</style>
