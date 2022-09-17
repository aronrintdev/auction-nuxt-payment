<template>
  <div class="breadcrumb-wrapper">
    <b-breadcrumb>
      <b-breadcrumb-item href="/">
        <Icon src="home.svg" width="20" height="20" class="icon" />
        <div>{{ $t('home.home') }}</div>
      </b-breadcrumb-item>

      <b-breadcrumb-item active>{{ $t('navbar.shop') }}</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script>
import { Icon } from '~/components/common'

export default {
  name: 'ShopBreadcrumb',

  components: { Icon },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.breadcrumb-wrapper
  .breadcrumb
    background: none
    margin: 0
    padding: 0

    .breadcrumb-item
      @include body-3-normal
      color: $color-black-5
      font-weight: $medium
      display: flex
      align-items: center
      padding: 0
      margin: 0

      a
        color: $color-gray-4
        display: flex
        align-items: center

        .icon
          margin-top: -2px
          margin-right: 6px

      &:not(:first-child)
        &::before
          content: url('~/assets/img/icons/arrow-right-gray.svg')
          margin: 4px 5px 0 7px
          padding: 0
          display: flex
          align-items: center
</style>
