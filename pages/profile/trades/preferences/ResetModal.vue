<template>
  <b-modal id="resetModel" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>
    <div class="d-block text-center">
      <b-row class="justify-content-end pointer pr-3">
        <span @click="$bvModal.hide('resetModel')">X</span>
      </b-row>
      <b-row class="justify-content-center">
        <b-col class="model-text-inner">
          {{$t('trades.preferences.are_you_sure_to_reset_preferences')}}
        </b-col>
      </b-row>
      <b-row class="justify-content-center mb-4 mt-4">
        <Button pill class="mr-5" @click="reset">{{$t('trades.preferences.reset')}}</Button>
        <Button pill variant="outline-dark" @click="$bvModal.hide('resetModel')">{{$t('trades.cancel')}}</Button>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import Button from '~/components/common/Button';
export default {
  name: 'ResetModal',
  components: {Button},
  methods: {
    reset(){
      this.$emit('reset')
      this.$bvModal.hide('resetModel')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.model-text-inner
  max-width: 300px
  font-family: $font-family-sf-pro-text
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 150%
  color: $color-black-1

</style>
