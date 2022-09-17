<template>
  <section class="sell-with-us text-center" >
    <div class="d-inline-flex align-items-center justify-content-between m-auto sell-with-us-content">
      <img :src="require('~/assets/img/icons/auctions-fill.svg')" alt="auctions">
      <div class="sell-with-us-desc text-left">
        <h2>{{ $t('auctions.frontpage.sell_with_us.title') }}</h2>
        <div>{{ $t('auctions.frontpage.sell_with_us.description') }}</div>
      </div>
      <a href="#" class="sell-with-us-content-cta text-white" target="_blank"> {{ $t('auctions.frontpage.sell_with_us.cta_label') }}</a>
    </div>
  </section>
</template>

<script>
/*
 * Sell With Us Component
 */
export default {
  name: 'SellWithUs',
}
</script>
