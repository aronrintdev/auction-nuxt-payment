<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step5.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step5.desc') }}</div>
    </div>
    <div class="d-flex flex-column step-content-main">
      <div class="d-flex mt-5 align-items-center">
        <div class="w-25 form-input">
          <select v-model="form.shipping_cost_payer">
            <option value="buyer">{{ $t('create_listing.auction.collection.step5.buyer') }}</option>
            <option value="seller">{{ $t('create_listing.auction.collection.step5.seller') }}</option>
          </select>
        </div>
        {{ $t('create_listing.auction.collection.step5.buy_label') }}
      </div>
      <div class="mt-3 pb-4 border-bottom">
        <div class="w-25 form-input">
          <div class="label">{{ $t('create_listing.auction.collection.step5.shipping') }}:</div>
          <input v-model="form.us_shipping_price" type="number" name="price" placeholder="$0.00"/>
        </div>
      </div>
      <div class="mt-3 pt-4 inline-form-checkbox">
        <label>
          <input v-model="form.will_ship_items_for_same_buyer" type="checkbox">&nbsp;{{ $t('create_listing.auction.collection.step5.ship_for_same_buyer') }}
        </label>
      </div>
      <div class="mt-3 inline-form-checkbox">
        <label>
          <input v-model="form.will_pick_up_item_for_buyer" type="checkbox">&nbsp;{{ $t('create_listing.auction.collection.step5.buyer_pick_up') }}
        </label>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-5">
      <button class="btn btn-outline-dark px-5 next-outline-btn" @click="moveNext">
        {{ $t('create_listing.auction.collection.step4.submit_btn_label') }}
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ShippingCost',
  data () {
    return {
      form: {
        us_shipping_price: 0,
        will_ship_items_for_same_buyer: false,
        will_pick_up_item_for_buyer: false,
        shipping_cost_payer: 'buyer',
      }
    }
  },
  methods: {
    // Move to next step
    moveNext() {
      this.$emit('can-continue', { settings: this.form });
    }
  }
}
</script>