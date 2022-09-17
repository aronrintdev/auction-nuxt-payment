<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card radius-3">
        <b-row
          v-for="(item, index) in items"
          :key="item.key"
          :class="{ 'mt-3': index }"
        >
          <b-col md="6">
            <div class="body-5-regular text-gray-25">{{ item.key }}&colon;</div>
          </b-col>
          <b-col md="6">
            <div class="body-5-regular text-gray-25 pull-right">
              &dollar;{{ item.value | formatPrice }}
            </div>
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
      },
    },
  },
  computed: {
    getTotal: (vm) => {
      return vm.items.reduce((sum, item) => {
        return sum + item.value
      }, 0)
    },
  },
}
</script>
