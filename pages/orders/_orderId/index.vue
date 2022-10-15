<template>
  <b-container fluid>
    <div v-if="!order">{{ $t('orders.loading') }}...</div>
    <div v-if="order">
      <div class="d-none d-sm-flex justify-content-between align-items-center">
        <div>
          <div class="p-4 page-title text-capitalize">{{ $t('orders.order_id') }} #{{ order.order_id }}</div>
          <div class="px-4 page-subtitle">{{ $t('orders.product_summary') }}</div>
        </div>
        <div>
          <div class="px-5">
            <NuxtLink to="/orders">&laquo; {{ $t('orders.back') }}</NuxtLink>
          </div>
        </div>
      </div>
      <b-row class="p-4 d-none d-sm-block">
        <b-col>
          <order-summary :item="item" :order="order" />
        </b-col>
      </b-row>
      <b-row class="px-2 px-sm-4">
        <b-col class="order-1 order-sm-0" sm="6" cols="12">
          <order-status-timeline :item="item" :order="order" />
        </b-col>
        <b-col class="order-0 order-sm-1" sm="6" cols="12">
          <order-commission :order="order" />
        </b-col>
      </b-row>
    </div>
    <div v-if="isMultipleItems" class="px-4 py-2">
      <h5 class="my-4">{{ $t('orders.more_from_order_id') }} #{{ order.order_id }}</h5>
      <div class="product-card">
        <b-card-group deck>
          <div v-for="(single, index) in order.items" :key="single.key">
            <div v-if="single.id!==item.id">
              <div class="px-2">
                <NuxtLink :to="`/orders/${order.order_id}-${index + 1}`">
                  {{ order.order_id }}-{{ index + 1 }}
                </NuxtLink>
              </div>
              <b-card
                :img-src="product(single).image"
                img-width="102"
                class="card-width"
              >
                <b-card-text>
                  <div>{{ product(single).name }} ({{ product(single).release_year }})</div>
                  <div class="color-gray">{{ product(single).colorway }}</div>
                  <div>${{ product(single).retail_price | formatPrice }}</div>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </b-card-group>
      </div>
    </div>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex';
import OrderCommission from '~/components/orders/OrderCommission';
import OrderStatusTimeline from '~/components/orders/OrderStatusTimeline';
import OrderSummary from '~/components/orders/OrderSummary';

export default {
  name: 'ProductSummary',
  components: {
    OrderCommission,
    OrderStatusTimeline,
    OrderSummary
  },
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      item: {},
      order: ''
    }
  },
  computed: {
    ...mapGetters({
      'orders': 'vendors/orders',
      'currentPage': 'vendors/currentPage',
    }),
    isMultipleItems() {
      return this.order.items
        ? this.order.items.length > 1
        : false
    }
  },
  mounted() {
    const ids = this.$route.params.orderId.trim().split('-')
    const orderId = parseInt(ids[0])
    const itemIndex = parseInt(ids[1]) - 1

    this.order = this.orders.filter(x => x.order_id === orderId)[0]
    this.item = this.order.items[itemIndex]
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.page-title
  font-family: $font-montserrat
  font-weight: $bold
  @include body-16
  letter-spacing: -0.02em
  color: $color-black-1

.product-card
  @include body-9

.card-width
  width: 240px

.color-gray
  color: $color-gray-5
</style>
