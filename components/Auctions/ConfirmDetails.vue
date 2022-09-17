<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step6.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step6.desc') }}</div>
    </div>
    <div class="row step-content-main">
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
      <div class="col-12">
        <div class="d-flex align-items-center justify-content-between">
          <span class="collection-price-label">{{ $t('create_listing.auction.collection.step6.buy_now_price') }}</span>
          <span class="collection-price-value">${{ buyNowPrice * 100 | formatPrice }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <span class="collection-price-label">{{ $t('create_listing.auction.collection.step6.min_starting_bid') }}</span>
          <span class="collection-price-value">${{ minStartBid * 100 | formatPrice }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex mt-5 justify-content-end">
      <b-button pill class="border-none btn btn-outline-dark px-5 next-btn" @click="submit">
        {{ $t('create_listing.auction.collection.step6.submit_btn_label') }}
      </b-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ConfirmDetails',
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  data () {
    return {
      buyNowPrice: 0,
      minStartBid: 0,
      collectionItems: [],
      tableColumns: [
        {
          key: 'details',
          label: this.$t('create_listing.auction.collection.step4.table_columns.details'),
        },
        {
          key: 'size',
          label: this.$t('create_listing.auction.collection.step4.table_columns.sizes'),
          class: 'text-center'
        },
        {
          key: 'color',
          label: this.$t('create_listing.auction.collection.step4.table_columns.colorway'),
          class: 'text-center'
        },
        {
          key: 'min_bid',
          label: this.$t('create_listing.auction.collection.step4.table_columns.price'),
          class: 'text-center'
        }
      ]
    }
  },
  computed: {
    estimatedValue() {
      return this.$sum(this.collectionItems)
    }
  },
  mounted() {
    this.collectionItems = this.data.items || [];
    this.buyNowPrice = this.data.buy_now_price;
    this.minStartBid = this.data.min_bid_amount;
  },
  methods: {
    // Create new auction collection
    submit() {
      this.loading = true
      // Create auction items array. 
      const items = this.data.items.map(it => ({
        ...it,
        price: it.price * 100,
        name: it.model || '',
        category: this.data.category,
        box_images: it.images.map((img, idx) => ({
          name: `Box image ${idx}`,
          url: img,
        })),
      }))
      this.$axios.post('auctions/collection', {
        auction_items: items,
        collection_setting: this.data.settings,
        min_bid_amount: Number(this.data.min_bid_amount) * 100,
        time_limit: this.data.time_limit,
      }).then(() => {
          this.loading = false
          this.$toasted.success(this.$t('create_listing.auction.collection.step6.create_success'))
          this.$router.push('/auctions')
        })
        .catch((err) => {
          this.loading = false
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }
  }
}
</script>