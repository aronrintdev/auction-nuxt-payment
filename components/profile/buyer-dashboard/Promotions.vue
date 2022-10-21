<template>
  <div class="promotions bg-white pt-4 p-sm-4 br-10 shadow-sm">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="fs-20 fw-7 font-primary mb-0 title">
        {{ $t('buyer_dashboard.promotions.title') }}
      </h2>
      <a
        href="#"
        class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0 d-none d-sm-block"
        >{{ $t('buyer_dashboard.promotions.view_promotions') }}</a
      >
    </div>
    <div class="container">
      <div class="row mt-4 my-sm-4">
        <div
          class="col-md-6 d-flex align-items-center align-items-sm-baseline flex-sm-column justify-content-center my-4 my-sm-0 order-2 order-sm-1"
        >
          <h2
            class="fs-30 fw-7 font-primary mb-0 text-left promotion-title mr-2 mr-sm-0"
          >
            Nissan GTR 2021
          </h2>
          <div
            class="divider bg-dark w-25 my-4 mx-auto mx-sm-0 d-none d-sm-block"
          ></div>
          <div class="d-none d-sm-block">
            <CountdownTimer />
          </div>
          <div
            class="your-entries d-flex gap-2 align-items-center justify-content-center justify-content-sm-start"
          >
            <img src="~/assets/img/icons/profile/entries.svg" />
            <h4 class="fs-18 fw-7 font-primary mb-0 mt-1 description">
              {{ $t('buyer_dashboard.promotions.your_entries') }}
            </h4>
            <h4 class="text-orange fs-18 fw-7 font-primary mb-0 mt-1">20</h4>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center order-1 order-sm-2">
          <div class="car-main justify-content-center d-flex">
            <img
              src="~/assets/img/icons/profile/carandbackground.svg"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="d-sm-none d-inline-block order-3 w-100 text-center mb-3">
          <b-button
            class="mt-3 px-4 py-2 font-primary fs-12 fw-6 border"
            variant="outline-secondary"
            pill
            >{{ $t('buyer_dashboard.promotions.view_promotions') }}</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountdownTimer from './CountdownTimer'
export default {
  name: 'Promotions',
  components: { CountdownTimer },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.divider
  height: 2px
.car-main img
  width: 500px
.text-orange
  color: $color-orange-11
@media (max-width: 576px)
  .title
    font-size: 14px
    font-weight: $bold
    color: $color-gray-69
    text-align: center
    width: 100%
  .promotion-title
    font-size: 18px
  .description
    font-size: 12px
    white-space: nowrap
  .your-entries
    column-gap: 4px
</style>
