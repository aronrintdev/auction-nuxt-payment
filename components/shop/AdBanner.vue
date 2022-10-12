<template>
  <div class="shop-ad-banner">
    <div class="d-flex justify-content-between align-items-center">
      <div class="ad-content">
        <h1 class="font-primary fw-5 fs-20 text-black">SELL WITH US</h1>
        <h1 class="font-primary fw-5 fs-15 helping-text">
          Have a Pair to Sell?
        </h1>
        <b-button class="fs-16 fw-5 font-primary text-white rounded-pill">
          Create a Listing
        </b-button>
      </div>
      <div>
        <img
          src="~/assets/img/shop/ad-image.png"
          width="162px"
          height="162px"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdBanner',
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
@media (max-width: 450px)
  .shop-ad-banner
    background-color: $color-white-5
    margin: 30px -7.5px
    padding: 0 21px
    height: 180px
    .helping-text
      margin-top: 16px
      margin-bottom: 22px
      color: $color-white-17
    button
      background-color: $color-blue-20
      padding: 7px 18px
</style>
