<template>
  <div>
    <b-modal id="delete-want-item" hide-footer hide-header no-close-on-esc no-close-on-backdrop sm>
      <div class="d-block text-center">
        <b-row class="justify-content-end pointer pr-3">
          <span @click="$bvModal.hide('delete-want-item')">X</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-col class="model-text-inner">
            {{$t('trades.are_you_sure_to_delete_item')}}
          </b-col>
        </b-row>
        <b-row class="mt-4 justify-content-center">
          <b-col class="model-text-inner">
            <p><img :src="Object.keys(product).length > 0 && product.product | getProductImageUrl" width="28px" /></p>
            <p>
              <b>{{ Object.keys(product).length > 0 && product.name }}</b><br />
              <small>{{$t('trades.color')}}: {{ Object.keys(product).length > 0 && product.colorway }}, {{$t('trades.size')}}: {{ Object.keys(product).length > 0 && product.selected_size_name }}</small><br />
              <small>{{$t('trades.packaging_condition')}}: {{ Object.keys(product).length > 0 && product.selected_box_condition_name }}</small>
            </p>
          </b-col>
        </b-row>
      </div>
      <div class="d-block text-center">
        <b-row class="justify-content-center mb-4 mt-4">
          <Button pill class="mr-5" @click="delistClick">{{$t('trades.delete')}}</Button>
          <Button pill variant="outline-dark" @click="$bvModal.hide('delete-want-item')">{{$t('trades.cancel')}}</Button>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Button from '~/components/common/Button';
export default {
  name: 'DeleteWantItemModal',
  components: {
    Button
  },
  props: {
    product: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    delistClick(){
      this.$emit('delete', Object.keys(this.product).length > 0 && this.product.id)
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
