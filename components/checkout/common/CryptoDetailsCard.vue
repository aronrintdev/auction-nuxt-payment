<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="3" class="d-flex align-items-center">
            <img
              :src="getCryptoCurrencyLogo"
              alt="..."
            />
          </b-col>
          <b-col md="8" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.estimated_amount') }}&colon;&nbsp;{{ estimatedAmount }}
            </div>
          </b-col>
          <b-col md="1" class="d-flex flex-column">
            <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'

export default {
  name: 'CryptoDetailsCard',
  components: { PencilSquaredBlueSvg },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    cryptoCurrency: {
      type: String,
      required: true,
      validator(value) {
        return [
          'btc',
          'eth',
          'bnbbsc',
          'vet',
        ].includes(value)
      },
      default: '',
    },
    estimatedAmount: {
      type: [Number, String],
      required: true,
      validator(value) {
        return value > 0
      },
      default: null,
    }
  },
  computed: {
    getCryptoCurrencyLogo: (vm) => {
      try {
        return require(`~/assets/img/shopping-cart/${vm.cryptoCurrency}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/btc-logo.png')
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.card
  &.custom-card
    .card-body
      @media (min-width: 576px)
        padding: 20px
        min-height: 57px

        svg
          position: absolute
          top: -11px
          right: 0
</style>
