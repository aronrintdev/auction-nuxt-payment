<template>
  <div>
    <b-modal id="discardModel" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>
      <div v-if="discarded" class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="$bvModal.hide('discardModel')">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
            {{$t('trades.your_changes_discarded')}}
          </b-col>
        </b-row>
        <b-row class="justify-content-center mb-4 mt-4">
          <img :src="require('~/assets/img/trades/trash-icon.svg')">
        </b-row>
      </div>
      <div v-else class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="$bvModal.hide('discardModel')">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
            {{ $t('trades.are_you_sure_discard') }}
          </b-col>
        </b-row>
        <b-row class="justify-content-center mb-4 mt-4">
          <Button pill class="mr-5" @click="discard()">{{$t('trades.discard')}}</Button>
          <Button pill variant="outline-dark" @click="$bvModal.hide('discardModel')">{{$t('trades.cancel')}}</Button>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>

import Button from '~/components/common/Button';
export default {
  name: 'DiscardModel',
  components:{Button},
  data() {
    return {
      discarded: false
    }
  },
  methods: {
    discard(){
      this.discarded = true
      this.$emit('discard')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.model-text-inner
  max-width: 310px
  font-family: $font-family-sf-pro-text
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 150%
  color: $color-black-1

</style>
