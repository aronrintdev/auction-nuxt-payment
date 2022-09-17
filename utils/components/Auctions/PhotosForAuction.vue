<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step2.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step2.desc') }}</div>
    </div>
    <div class="d-flex mt-4 mb-5 pb-5 step-content-main">
      <h6>{{ $t('create_listing.auction.collection.step2.content') }}</h6>
    </div>
    <div class="mt-5 py-4 d-flex justify-content-end">
      <button class="btn btn-dark px-5 next-btn" @click="moveNext">{{ $t('create_listing.auction.collection.step2.button_label') }}</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PhotosForAuction',
  data () {
    return {
      categories: [
        {
          id: 'sneakers',
          label: this.$t('create_listing.auction.collection.sneakers'),
        },
        {
          id: 'apparel',
          label: this.$t('create_listing.auction.collection.apparel'),
        },
        {
          id: 'accessories',
          label: this.$t('create_listing.auction.collection.accessories'),
        }
      ]
    }
  },
  methods: {
    // Move to next step
    moveNext() {
      this.$emit('can-continue');
    }
  }
}
</script>