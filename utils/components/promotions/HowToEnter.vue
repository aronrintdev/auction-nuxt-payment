<template>
  <div class="my-5 d-flex align-items-center justify-content-center shop-now">
    <div class="body-1-bold mx-3">{{ $t('promotions.how_to_enter') }}</div>
    <div class="body-3-regular mx-3">{{ $t('promotions.how_to_enter_content') }}</div>
    <Button
        class="px-5 mx-3"
        to="/shop"
        variant="dark"
    >
      {{ $t('promotions.show_now') }}
    </Button>
  </div>
</template>
<script>
import Button from '~/components/common/Button'

export default {
  name: 'PromotionsHowToEnter',
  components: {
    Button,
  }
};
</script>
