<template>
  <div>
    <b-modal id="relist-trade" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>
      <div class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="$bvModal.hide('relist-trade')">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
            {{$t('trades.are_you_sure_to_relist_trade')}}
          </b-col>
        </b-row>
      </div>
      <div class="d-block text-center">
        <b-row class="justify-content-center mb-4 mt-4">
          <Button pill class="mr-5" @click="relistClick">{{$t('trades.relist')}}</Button>
          <Button pill variant="outline-dark" @click="$bvModal.hide('relist-trade')">{{$t('trades.cancel')}}</Button>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Button from '~/components/common/Button';
export default {
  name: 'RelistModal',
  components: {
    Button
  },
  props: {
    tradeId: {
      type: Number,
      required: true
    }
  },
  methods: {
    relistClick(){
      this.$emit('relist', this.tradeId)
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
