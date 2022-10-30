<template>
 <b-row>
   <b-col md="12" class="px-0">
     <div class="text-center body-8-medium text-color-red-3">{{ $t('products.error.out_of_stock') }}</div>

     <b-row class="mt-3">
       <b-col md="8">
         <b-form-input
           v-model="offerAmount"
           type="number"
           min="0"
           :placeholder="$t('products.enter_offer_amount')"
         />
       </b-col>
       <b-col class="mt-3" md="4">
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
       block
       @click="$emit('notify-me')"
     >
       {{ $t('products.notify_me') }}
     </Button>
   </b-col>
 </b-row>
</template>

<script>
import Button from '~/components/common/Button'

export default {
  name: 'OutOfStock',
  components: { Button },
  data() {
    return {
      offerAmount: null
    }
  },
  watch: {
    offerAmount(newValue) {
      return '$' + newValue
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-red-3
  color: $color-red-3

input.form-control
  background: $white
  border: 1px solid $color-blue-20
</style>
