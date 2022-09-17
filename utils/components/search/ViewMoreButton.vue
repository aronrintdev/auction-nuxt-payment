<template>
  <Button variant="link" class="btn-view-more" @click="$emit('click')">
    {{ $t('common.view_more') }}
    <Icon src="arrow-right-gray2.svg" width="20" height="20" class="ml-2" />
  </Button>
</template>
<script>
import { Button, Icon } from '~/components/common'
export default {
  name: 'SearchViewMoreButton',

  components: { Button, Icon },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.btn.btn-link.btn-view-more
  color: $color-gray-30

  &:hover
    color: $color-black-1
</style>
