<template>
  <div class="text-message-component">
    <div class="d-flex">
      <div>
        <img :src="require('/assets/img/icons/mobile.svg')" height="45"/>
      </div>
      <div class="flex-grow-1 px-2">
        <div class="title">{{ $t('features.2fa_security.text_message') }}</div>
        <div class="desc my-1">{{ $t('features.2fa_security.label_when_you_login') }}</div>
        <div class="warn">{{ $t('features.2fa_security.action_required') }}</div>
      </div>
      <div>
        <NuxtLink to="/profile/security/manage">
          <span class="d-none d-md-block">{{ $t('features.2fa_security.manage') }}</span>
          <img class="d-block d-md-none" :src="require('/assets/img/icons/arrow-right-black.svg')"/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextVerificationComponent'
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.text-message-component
  @include body-5-normal
  font-family: $font-montserrat

  .title
    color: $color-black-1

  .desc
    color: $color-gray-5

  .warn
    color: $color-red-3


</style>
