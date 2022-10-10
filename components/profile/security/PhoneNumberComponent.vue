<template>
  <div class="phone-number">
    {{ $t('manage_text_message.update_phone_number') }}
    <div class="d-flex justify-content-center my-2">
      <input type="text" class="form-control"/>
      <button class="btn ml-1">{{ $t('manage_text_message.update') }}</button>
    </div>
    <div class="msg">{{ $t('manage_text_message.action_required') }}</div>
    <div class="my-5">
      <resend-code-component/>
    </div>
  </div>
</template>

<script>
import ResendCodeComponent from '~/components/profile/security/ResendCodeComponent';

export default {
  name: 'PhoneNumberComponent',
  components: {
    ResendCodeComponent
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.phone-number
  font-family: $font-montserrat
  @include body-5-regular

  .form-control
    background: $color-white-5
    border: 1px solid $color-red-3
    border-radius: 20px

  .btn
    background: $color-gray-47
    border-radius: 4px
    color: $color-white-1

  .msg
    color: $color-red-3

</style>
