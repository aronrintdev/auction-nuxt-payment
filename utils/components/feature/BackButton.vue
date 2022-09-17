<template>
  <Button
    variant="link"
    to="/features"
    :icon="require('~/assets/img/icons/arrow-left-gray.svg')"
    :icon-width="20"
    :icon-height="20"
    class="btn-back"
  >
    {{ $t('features.payment_plans.all_features') }}
  </Button>
</template>
<script>
import { Button } from '~/components/common'

export default {
  name: 'FeatureBackButton',

  components: { Button },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.btn.btn-back::v-deep
  @include body-8-medium
  color: $color-gray-22
</style>
