<template>
  <b-row>
    <b-col md="12">
      <div class="text-center body-8-medium">
        <span class="text-color-blue-20">{{ $t('products.place_offer') }}</span>
        <span class="text-black">{{ $t('products.or_sell_now') }}</span>
      </div>

      <b-row class="mt-3">
        <b-col md="8">
          <b-form-input
            v-model="offerAmount"
            type="number"
            min="0"
            :placeholder="$t('products.enter_offer_amount')"
          />
        </b-col>
        <b-col md="4">
          <Button
            variant="dark-blue"
            block
            @click="$emit('place-offer', offerAmount)"
          >
            {{ $t('products.place_offer') }}
          </Button>
        </b-col>
      </b-row>

      <Button
        class="mt-3"
        variant="dark"
        :disabled="!highestOffer"
        block
        @click="$emit('sell-now')"
      >
        {{ $t('products.sell_for', { amount: $root.$options.filters.toCurrency(highestOffer)  }) }}
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import Button from '~/components/common/Button'

export default {
  name: 'SellNow',
  components: { Button },
  props: {
    highestOffer: {
      type: Number,
      required: true,
      default: 0.00
    }
  },
  data() {
    return {
      offerAmount: null,
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-blue-20
  color: $color-blue-20

input.form-control
  background: $white
  border: 1px solid $color-blue-20
</style>
