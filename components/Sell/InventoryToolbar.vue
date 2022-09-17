<template>
  <div class="d-flex align-items-end justify-content-between inventory-toolbar">
    <div class="form-group listing-type-select">
      <label for="listing-type">{{ $t('sell.inventory.toolbar.listing_type') }}</label>
      <select id="listing-type" class="form-control" name="search-listing-type" @change="onTypeChanged">
        <option value="">{{ $t('sell.inventory.toolbar.show_all') }}</option>
        <option value="bid">{{ $t('sell.inventory.toolbar.bids') }}</option>
        <option value="sell">{{ $t('sell.inventory.toolbar.sell') }}</option>
        <option value="trade">{{ $t('sell.inventory.toolbar.trades') }}</option>
        <option value="auction" disabled>{{ $t('sell.inventory.toolbar.auctions') }}</option>
      </select>
    </div>
    <div class="form-group rounded-search-input">
      <img :src="searchIcon" class="icon-search" alt="" />
      <input type="text" :placeholder="$t('sell.inventory.toolbar.search_box_placeholder')" @input="onSearchChanged">
    </div>
    <div class="form-group form-checkbox">
      <input id="vacation_mode" type="checkbox" class="form-check-input" >
      <label class="form-check-label" for="vacation_mode">{{ $t('sell.inventory.toolbar.enable_vacation') }}</label>
      <div v-b-tooltip.hover class="tooltip" :title="$t('sell.inventory.toolbar.enable_vacation_tooltip')">
        <img :src="infoIcon" class="icon-info" alt="Info icon" />
      </div>
    </div>
    <div class="btn-groups mb-5">
      <NuxtLink to="/sell/create-listing" class="btn w-100 btn-dark mb-2">{{ $t('sell.inventory.toolbar.create_listing_btn') }}</NuxtLink>
      <NuxtLink to="/sell/create-listing" class="btn w-100 btn-outline-dark">{{ $t('sell.inventory.toolbar.edit_listing_btn') }}</NuxtLink>
    </div>
  </div>
</template>

<script>
import searchIcon from '~/assets/img/icons/search.svg';
import infoIcon from '~/assets/img/icons/info.svg';

export default {
  name: 'InventoryToolbar',
  data: () => ({
    searchIcon,
    infoIcon,
  }),
  methods: {
    onTypeChanged(e) {
      this.$emit('typeChange', e.target.value);
    },
    onSearchChanged(e) {
      this.$emit('search', e.target.value);
    }
  },
};
</script>
