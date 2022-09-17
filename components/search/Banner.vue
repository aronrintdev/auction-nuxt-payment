<template>
  <div class="banner-wrapper">
    <div class="header">
      <h1 v-html="$t('search.header.title')"></h1>
      <p>{{ $t('search.header.description') }}</p>

      <Button variant="info" pill>{{ $t('common.learn_more') }}</Button>
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button.vue'

export default {
  name: 'SearchBanner',

  components: { Button },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-wrapper
  background-image: url('~/assets/img/search/banner.png')
  width: 100%
  background-color: $color-white-1
  background-position: center
  background-size: cover
  position: relative
  padding: 70px 60px

  .header
    background-color: rgba(255, 255, 255, 0.56)
    padding: 24px 48px 30px 40px
    max-width: 399px

    h1
      @include heading-5
      line-height: 48px
      margin: 0
      color: $color-black-1

    p
      @include body-4-regular
      margin: 1px 0 0 0
      color: $color-black-1

    button
      margin-top: 65px

@media (max-width: 576px)
  .banner-wrapper
    padding: 30px 20px
</style>
