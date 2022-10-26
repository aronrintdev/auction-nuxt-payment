<template>
  <div class="row product-input-row mt-4 mb-5">
    <div class="col-6">
      <FormInput
        id="form-input"
        :value="quantity"
        :placeholder="$t('common.quantity')"
        :label="$t('common.quantity')"
        class="input-form input-error"
        required
        :pill="false"
        integer
        @input="$emit('quantity', $event, index)"
      />
      <small v-if="quantityError" class="text-danger">
        {{
          $t('createlisting.error.field', {
            field: $t('common.quantity').toLowerCase(),
          })
        }}
      </small>
    </div>
    <div class="col-6">
      <FormInput
        id="form-input"
        :value="minOffer"
        :placeholder="$t('createlisting.enter_min_offer')"
        :label="$t('createlisting.minOfferAmount')"
        class="input-form input-error"
        required
        :pill="false"
        integer
        @input="$emit('minOffer', $event, index)"
      />

      <small v-if="minOfferError" class="text-danger">
        {{
          $t('createlisting.error.field', {
            field: $t('createlisting.minOfferAmount'),
          })
        }}
      </small>
    </div>
  </div>
</template>

<script>
import { FormInput } from '~/components/common'
import { MINOFFER_MIN_VAL } from '~/static/constants'

export default {
  name: 'DetailsInput',

  components: {
    FormInput,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    minOffer: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      minOfferMinVal: MINOFFER_MIN_VAL,
    }
  },

  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    minOfferError: (vm) => {
      return vm.minOffer && vm.minOffer < vm.minOfferMinVal
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    quantityError: (vm) => {
      return !vm.quantity || vm.quantity > vm.stock || vm.quantity <= 0
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-input-row::v-deep
  #form-input
    input
      width: 150px
      height: 49px
      border: 1px solid $white-5
      border-radius: 10px
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-gray-88
      &::placeholder
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-gray-23
    .input-label
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-black-1
      margin-bottom: 3px
</style>