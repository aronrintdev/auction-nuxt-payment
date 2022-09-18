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
