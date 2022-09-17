<template>
  <div>
    <b-modal id="poor_trade_confirmation" :hide-footer="true" :hide-header="true" size="md">
      <div v-if="poorTrade" class="col-md-12">
        <div class="text-right text-bold" role="button" @click="$bvModal.hide('poor_trade_confirmation')">X</div>
        <div class="width-300 ml-auto mr-auto mt-1">
          {{$t('trades.trade_arena.you_have_not_met')}}
        </div>
        <div class="width-300 ml-auto mr-auto mb-5 mt-3">
          {{$t('trades.trade_arena.please_update_your_offer')}}
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'PoorTradeConfirmationModal',
  props:{
    poorTrade: {
      type: Boolean,
      required: true,
    }
  },
}
</script>

<style lang="sass" scoped>
.modal-sm
  max-width: 438px !important

</style>
