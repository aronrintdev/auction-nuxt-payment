<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card radius-3">
        <!-- Price breakdown -->
        <b-row
          v-for="(item, index) in items"
          :key="item.key"
          :class="{ 'mt-3': index }"
        >
          <b-col md="8">
            <div class="body-5-regular text-gray-25">
              {{ item.key }}
            </div>
          </b-col>
          <b-col md="4">
            <div class="body-5-regular text-gray-25 pull-right">
              <span v-if="item.sign === '-'">{{ item.sign }}</span
              >&dollar;{{ item.value | formatPrice }}
            </div>
          </b-col>
        </b-row>
        <!-- ./Price breakdown ends -->
        <!-- Total -->
        <b-row class="mt-3">
          <b-col md="6" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('sell_now.total_payout') }}&colon;
            </div>
          </b-col>
          <b-col md="6">
            <div class="pull-right body-5-normal">
              &dollar;{{ getTotal | formatPrice }}
            </div>
          </b-col>
        </b-row>
        <!-- ./Total -->
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SaleSummaryCard',
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },

  computed: {
    // Get the total amount
    getTotal: (vm) => {
      const totalPayout = vm.items.reduce((sum, item) => {
        let total = 0
        if (item.sign === '-') {
          total += sum - item.value
        }

        if (item.sign === '+') {
          total += sum + item.value
        }
        return total
      }, 0)

      return totalPayout
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.card-body
  background: $color-white-5
  border-radius: 10px
</style>
