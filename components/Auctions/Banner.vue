<template>
  <section class="auction-banner">
    <div class="auction-banner-overlay">
      <div class="auction-banner-overlay-title">{{ $t('auctions.frontpage.banner.title') }}</div>
      <div class="auction-banner-overlay-desc">
        {{ $t('auctions.frontpage.banner.description') }}
      </div>
      <a href="#" class="auction-banner-overlay-cta" target="_blank"> {{ $t('auctions.frontpage.banner.cta_label') }}</a>
    </div>
  </section>
</template>

<script>
/*
 * Auction Banner Component
 */
export default {
  name: 'AuctionBanner',
}
</script>
