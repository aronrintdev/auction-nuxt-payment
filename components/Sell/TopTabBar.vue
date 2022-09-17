<template>
  <ul class="formatted-ul something sell-top-nav">
      <li class="formatted-li" :class="{ active: current == 'summary' }" @click="onTabClicked('summary')">
        <a class="nav-link"><span>{{ $t('sell.top_tab_bar.summary') }}</span></a>
      </li>
      <li class="formatted-li" :class="{ active: current == 'inventory' }" @click="onTabClicked('inventory')">
        <a class="nav-link"><span>{{ $t('sell.top_tab_bar.inventory') }}</span></a>
      </li>
      <li class="formatted-li" :class="{ active: current == 'orders' }" @click="onTabClicked('orders')">
        <a class="nav-link"><span>{{ $t('sell.top_tab_bar.orders') }}</span></a>
      </li>
      <li class="formatted-li" :class="{ active: current == 'settings' }" @click="onTabClicked('settings')">
        <a class="nav-link"><span>{{ $t('sell.top_tab_bar.settings') }}</span></a>
      </li>
  </ul>
</template>

<script>
export default {
  name: 'SellTopTabBar',
  props: {
    current: {
      type: String,
      default: 'summary',
    }
  },
  methods: {
    onTabClicked(value) {
      this.$emit('tabChanged', value);
    }
  }
};
</script>
