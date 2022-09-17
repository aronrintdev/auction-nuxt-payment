<template>
  <div
    class="d-flex align-items-start accepted-payments-wrapper justify-content-center"
  >
    <div class="d-flex align-items-start">
      <div class="img">
        <b-img :src="require('~/assets/img/product/authenticity.png')" />
      </div>

      <div>
        <div class="desc-text">
          {{ $t('products.authenticity_guaranteed') }}
        </div>

        <Button variant="link">{{ $t('common.learn_more') }}</Button>
      </div>
    </div>
    <div class="d-flex align-items-start">
      <div class="img">
        <b-img :src="require('~/assets/img/product/affirm.png')" />
      </div>

      <div>
        <div class="desc-text">{{ $t('home.payment_plans') }}</div>

        <Button variant="link">{{ $t('common.learn_more') }}</Button>
      </div>
    </div>
    <div class="d-flex align-items-start">
      <div class="img">
        <b-img :src="require('~/assets/img/product/crypto.png')" />
      </div>

      <div>
        <div class="desc-text">{{ $t('success.crypto') }}</div>

        <Button variant="link">{{ $t('common.learn_more') }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button'

export default {
  name: 'ProductAcceptedPaymentsV2',
  components: { Button },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.accepted-payments-wrapper
  @include body-5-regular
  color: $color-black-1
  flex-wrap: wrap

  > div
    margin: 0 8px 16px 8px

  img
    margin-right: 23px

  .btn
    @include body-10-normal
    color: $color-blue-20
    margin-top: 4px

  .desc-text
    max-width: 84px

@media (max-width: 620px)
  .accepted-payments-wrapper
    flex-direction: column

    .desc-text
      max-width: 100%

    .img
      width: 73px
      display: flex
      justify-content: flex-end
</style>
