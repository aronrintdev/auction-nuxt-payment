<template>
  <ul class="formatted-ul something sell-top-nav">
    <li class="formatted-li" :class="{ active: current == 'create_listing' }" @click="onTabClicked('create_listing')">
      <a class="nav-link"><span>{{ $t('sell.create_listing_tabbar.create_listing') }}</span></a>
    </li>
    <li class="formatted-li" :class="{ active: current == 'sell_now' }" @click="onTabClicked('sell_now')">
      <a class="nav-link"><span>{{ $t('sell.create_listing_tabbar.sell_now') }}</span></a>
    </li>
    <li class="formatted-li" :class="{ active: current == 'create_inventory' }" @click="onTabClicked('create_inventory')">
      <a class="nav-link"><span>{{ $t('sell.create_listing_tabbar.create_inventory') }}</span></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CreateListingTabbar',
  props: {
    current: {
      type: String,
      default: 'create_listing',
    }
  },
  methods: {
    onTabClicked(value) {
      this.$emit('tabChanged', value);
    }
  }
};
</script>
