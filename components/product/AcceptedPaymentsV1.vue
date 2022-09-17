<template>
  <div class="container">
    <div class="blockchain-text">
      {{ $t('products.we_accept') }}
      <img :src="require('~/assets/img/icons/btc.svg')" />
      <img :src="require('~/assets/img/icons/binance.svg')" />
      <img :src="require('~/assets/img/icons/vechain.svg')" />
      <img :src="require('~/assets/img/icons/etherium.svg')" />
      <!-- todo: add click action -->
      <Button variant="link" underlined-text>{{
        $t('products.and_more')
      }}</Button>
    </div>

    <div class="pay-over-text">
      {{ $t('products.pay_over_time') }}
      <img
        :src="require('~/assets/img/icons/affirm.svg')"
        class="affirm-img"
        alt="Affirm"
      />
      {{ $t('common.or') }}
      <img
        :src="require('~/assets/img/icons/afterpay.svg')"
        class="afterpay-img"
        alt="Afterpay"
      />
      <!-- todo: add click action -->
      <Button variant="link" underlined-text>{{
        $t('common.learn_more')
      }}</Button>
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button'

export default {
  name: 'ProductAcceptedPayments',
  components: { Button },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container
  .blockchain-text
    @include body-4-bold
    color: $color-black-1
    margin-top: 30px
    text-align: center

    >img
      height: 28px
      margin: 0 20px

  .pay-over-text
    @include body-4-bold
    margin-top: 36px
    text-align: center

    >img.affirm-img
      height: 20px
      margin: -9px 5px 0 5px

    >img.afterpay-img
      height: 16px
      margin: 2px 5px 0 5px
</style>
