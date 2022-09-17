<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step4.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step4.desc') }}</div>
    </div>
    <div class="row">
      <div class="col-12 mb-5 collection-listing">
        <b-table class="mt-3 collection-table" :items="collectionItems" :fields="tableColumns">
          <template #cell(details)="row">
            <div class="d-flex align-items-center text-left">
              {{ row.item.brand }}&nbsp;{{ row.item.model }}
            </div>
          </template>
          <template #cell(colorway)="row">
            <span>{{ row.item.color }}</span>
          </template>
          <template #cell(size)="row">
            <span>{{ row.item.size }}</span>
          </template>
          <template #cell(min_bid)="row">
            ${{ row.item.price * 100 | formatPrice }}
          </template>
        </b-table>
      </div>
      <div class="col-5 pr-5 estimated-values">
        <div class="estimated-values-title">{{ $t('create_listing.auction.collection.step4.collection_estimated_value') }}</div>
        <div class="estimated-values-price">${{ estimatedValue * 100 | formatPrice }}</div>
        <div class="text-center py-5">
          <img :src="require('~/assets/img/icons/meteor.svg')" />
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-5 pl-5">
        <div class="suggested-prices">
          <div class="suggested-prices-title">{{ $t('create_listing.auction.collection.step4.suggested_prices') }}</div>
          <div class="pt-3 d-flex justify-content-between">
            <div>
              <div class="label">{{ $t('create_listing.auction.collection.step4.lowest_bid_amount') }}:</div>
              <div classs="price">${{ suggestedPrices.lowestPrice * 100 | formatPrice }}</div>
            </div>
            <div>
              <div class="label">{{ $t('create_listing.auction.collection.step4.suggest_buy_now_price') }}:</div>
              <div classs="price">${{ suggestedPrices.suggestPrice * 100 | formatPrice }}</div>
            </div>
          </div>
        </div>
        <div class="d-flex mt-4 form-row">
          <div class="form-input">
            <label>{{ $t('create_listing.auction.collection.step4.your_buy_now_price') }}</label>
            <input v-model="form.buy_now_price" type="number" name="price" :placeholder="$t('create_listing.auction.collection.step4.price_placeholder')"/>
          </div>
          <div class="form-input">
            <label>{{ $t('create_listing.auction.collection.step4.auction_time_limit') }}</label>
            <select v-model="form.time_limit" name="time_limit">
              <option value="" disabled selected>{{ $t('create_listing.auction.single.default_time_limit') }}</option>
              <option v-for="(option,idx) in timeLimitOptions" :key="idx" :value="option">
                {{ `${option} ${$t('create_listing.auction.single.days')}` }}
              </option>
            </select>
          </div>
        </div>
        <div class="d-flex form-row">
          <div class="form-input w-100">
            <label>{{ $t('create_listing.auction.collection.step4.min_starting_bid_amount') }}</label>
            <input v-model="form.min_bid_amount" type="number" name="amount" placeholder="$0.00" />
          </div>
        </div>
        <div class="d-flex mt-4">
          <button :disabled="!isFormValid" class="w-100 btn btn-outline-dark px-5 next-outline-btn" @click="moveNext">
            {{ $t('create_listing.auction.collection.step4.submit_btn_label') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'EstimatedValue',
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  data () {
    return {
      collectionItems: [],
      tableColumns: [
        {
          key: 'details',
          label: this.$t('create_listing.auction.collection.step4.table_columns.details'),
        },
        {
          key: 'size',
          label: this.$t('create_listing.auction.collection.step4.table_columns.sizes'),
          class: 'text-center',
        },
        {
          key: 'color',
          label: this.$t('create_listing.auction.collection.step4.table_columns.colorway'),
          class: 'text-center',
        },
        {
          key: 'min_bid',
          label: this.$t('create_listing.auction.collection.step4.table_columns.price'),
          class: 'text-center',
        }
      ],
      suggestedPrices: {
        suggestPrice: 2500,
        lowestPrice: 2000,
      },
      form: {
        buy_now_price: null,
        time_limit: null,
        min_bid_amount: null,
      },
      timeLimitOptions: [1, 3, 5, 7, 10],
      isFormValid: false,
    }
  },
  computed: {
    estimatedValue() {
      return this.$sum(this.collectionItems)
    }
  },
  watch: {
    form: {
      handler(newV) {
        let isValid = true;
        if (!newV.buy_now_price || !newV.min_bid_amount || !newV.time_limit) {
          isValid = false;
        }
        this.isFormValid = isValid;
      },
      deep: true
    }
  },
  mounted() {
    this.collectionItems = this.data.items || [];
  },
  methods: {
    // Move to next step
    moveNext() {
      this.$emit('can-continue', this.form);
    }
  }
}
</script>