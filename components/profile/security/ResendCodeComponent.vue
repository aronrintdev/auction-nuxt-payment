<template>
  <div class="resend-code">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <verification-code-component/>
      </div>
      <div class="mx-3">
        <button class="btn btn-dark">
          <div class="d-flex align-items-center">
            <img :src="require('/assets/img/icons/clock.svg')" />
            <span class="ml-1">5:00</span>
          </div>
        </button>
      </div>
      <div class="link d-none d-md-block">
        <NuxtLink to="#">Resend Code</NuxtLink>
      </div>
    </div>
    <div class="py-3 note">A verification code will be sent to your mobile phone, please input the code below to confirm</div>
    <div class="d-block d-md-none text-center">
      Haven’t received it?
      <NuxtLink to="#">Resend a new code.</NuxtLink>
    </div>
  </div>
</template>

<script>
import VerificationCodeComponent from '~/components/profile/security/VerificationCodeComponent';

export default {
  name: 'ResendCodeComponent',
  components: {
    VerificationCodeComponent
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.resend-code
  .btn
    vertical-align: bottom

  .link a
    color: #3A71EA
    text-decoration: underline

  .note
    font-family: $font-family-sf-pro-display
    @include body-12-regular
    color: $color-gray-5

  @media (max-width: 767px)
    .note
      @include body-5-regular

</style>
