<template>
  <div class="buyer-purchases">
    <div class="row">
      <div class="col-md-6">
        <div class="bg-white p-5 border br-10">
          <!-- TODO dummy data  -->
          <div class="row">
            <div class="col-6">
              <h2 class="fs-18 fw-7 font-secondary">
                {{ $t('buyer_dashboard.purchases.order') }}#123456789 (Buy)
              </h2>
              <h4 class="fs-16 fw-6 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.ordred_on') }} Feburary 9,2022
              </h4>
            </div>
            <div class="col-6 d-flex flex-column align-items-end">
              <a
                href="#"
                class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0"
                >{{ $t('buyer_dashboard.purchases.view_order') }}</a
              >
            </div>
          </div>
          <div class="row">
            <div class="col-md-4"><ProductThumb /></div>
            <div class="col-md-4"><ProductThumb /></div>
            <div class="col-md-4"><ProductThumb /></div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-8">
              <h5 class="fs-14 fw-5 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.quantity') }}: 4
              </h5>
              <h5 class="fs-14 fw-5 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.order_total') }}: $503.30
              </h5>
            </div>
            <div class="col-md-4 status-badge-warning">
              {{ $t('buyer_dashboard.purchases.pending') }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-white p-5 border br-10">
          <div class="row">
            <div class="col-6">
              <h2 class="fs-18 fw-7 font-secondary">
                {{ $t('buyer_dashboard.purchases.order') }}#123456789 (Buy)
              </h2>
              <h4 class="fs-16 fw-6 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.ordred_on') }} Feburary 9,2022
              </h4>
            </div>
            <div class="col-6 d-flex flex-column align-items-end">
              <a
                href="#"
                class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0"
                >{{ $t('buyer_dashboard.purchases.view_order') }}</a
              >
            </div>
          </div>
          <div class="row">
            <div class="col-md-4"><ProductThumb /></div>
            <div class="col-md-4"><ProductThumb /></div>
            <div class="col-md-4"><ProductThumb /></div>
          </div>
          <div class="row align-items-center">
            <div class="col-md-8">
              <h5 class="fs-14 fw-5 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.quantity') }}: 4
              </h5>
              <h5 class="fs-14 fw-5 font-secondary mb-0">
                {{ $t('buyer_dashboard.purchases.order_total') }}: $503.30
              </h5>
            </div>
            <div class="col-md-4 status-badge-purple">
              {{ $t('buyer_dashboard.purchases.send_to_deadstock') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  components: { ProductThumb },
}
</script>
<style lang="sass">
.buyer-purchases
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px
  thead th div
    font-family: $font-family-base
    font-size: 16px
    font-weight: 700
  tbody td
    height: 120px
    @media (max-width: 576px)
      display: flex
      height: fit-content
      padding: 2px 0.75rem
      &:nth-child(odd)
        background-color:  $color-white-5
      &:first-child
        background-color:  transparent
  .tdHeight
    height: inherit
  .tdHeightSm
    @media (min-width: 576px)
      height: inherit
  .col-thumb
    display: flex
    justify-content: center
    width: 100px
  .stats-graph
    width: 100px
    height: 40px
  @media (max-width: 576px)
    thead
      display: none
    tr[role="row"]
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 8px
      outline: 1px solid $color-gray-3
      display: block
      margin: 12px 0
      padding: 15px 0
      h4.font-secondary
        white-space: nowrap
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base
    .tdHeight
      font-size: 12px
      color: $color-black-1
      font-weight: $bold
      width: 100%
      .status-badge
        background: none
        padding: 0
      h4
        white-space: nowrap
        font-size: 12px
        font-weight: $normal
        font-family: $font-family-base
        &:not(.status-badge)
          color: $color-gray-6
        &.actions
          display: flex
          column-gap: 6px
      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
