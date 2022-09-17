<template>
  <div class="banner-wrapper">
    <div>
      <h1 v-html="$t('home.bug_bounty_program')"></h1>
      <p>{{ $t('home.for_reporting') }}</p>
    </div>

    <div>
      <Button variant="info" pill>{{ $t('common.learn_more') }}</Button>
    </div>
  </div>
</template>
<script>
import Button from '~/components/common/Button.vue'

export default {
  name: 'HomeBanner',

  components: { Button },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-wrapper
  background-image: url('~/assets/img/home/banner.png')
  width: 100%
  height: 398px
  background-color: purple
  background-position: center
  background-size: cover
  position: relative
  padding: 65px 90px
  display: flex
  flex-direction: column
  justify-content: space-between

  @media (max-width: 552px)
    padding: 40px 35px

  h1
    @include heading-5
    color: $color-white-1
    font-weight: $medium
    line-height: 120%

  p
    @include body-1-regular
    color: $color-white-1
</style>
