<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card radius-3">
        <b-row
          v-for="(item, index) in items"
          :key="item.key"
          :class="{'mt-3': index }"
        >
          <b-col md="6">
            <div class="body-5-regular text-gray-25">
              {{ item.key }}&colon;
            </div>
          </b-col>
          <b-col md="6">
            <div class="body-5-regular text-gray-25 pull-right">
              &dollar;{{ item.value | formatPrice }}
            </div>
          </b-col>
        </b-row>
        <b-row v-if="promoCode" class="mt-3">
          <b-col md="6">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.promo_code') }}&colon;
            </div>
            <div class="body-5-regular text-success">
              {{ $t('shopping_cart.promo_code_applied') }}
            </div>
          </b-col>
          <b-col md="6" class="d-flex align-items-center">
            <b-button
              class="ml-auto pa-0"
              variant="img"
              @click="$emit('clear-promo')"
            >
              <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')" />
            </b-button>
            <span class="body-5-regular text-gray-25">
              &minus;&dollar;{{ discount | formatPrice }}
            </span>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col md="6" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.total') }}&colon;
            </div>
          </b-col>
          <b-col md="6">
            <div class="pull-right body-5-normal">
              &dollar;{{ getTotal | formatPrice }}
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'OrderSummaryCard',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    promoCode: {
      type: [Object, Boolean],
      default: false,
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getTotal: (vm) => {
      return vm.items.reduce((sum, item) => {
        return sum + item.value
      }, 0)
    }
  },
}
</script>
