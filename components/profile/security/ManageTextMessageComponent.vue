<template>
  <div class="d-flex justify-content-center w-100">
    <div class="manage-text-message my-5 p-4">
      <div class="title">{{ $t('manage_text_message.manage_text_message_verification') }}</div>
      <div class="desc py-3">{{ $t('manage_text_message.label_we_will_send_a_message') }}</div>
      <div class="my-3">
        <phone-number-component ref="phone_number" @submit="handleSubmit" @codeSubmit="handleCodeSubmit"
                                @resend="handleSubmit"/>
      </div>
      <div class="text-center go-back">
        <NuxtLink to="/profile/security">{{ $t('manage_text_message.go_back') }}</NuxtLink>
      </div>
    </div>
    <transparent-alert-modal :text="$t('manage_text_message.alert_text')" :show="showAlert" @hide="listenModalClose"/>
  </div>
</template>

<script>
import PhoneNumberComponent from '~/components/profile/security/PhoneNumberComponent';
import TransparentAlertModal from '~/components/common/TransparentAlertModal';

export default {
  name: 'ManageTextMessageComponent',
  components: {
    PhoneNumberComponent,
    TransparentAlertModal
  },
  data() {
    return {
      showAlert: false,
      phone: ''
    }
  },
  methods: {
    async handleCodeSubmit(code) {
      const resp = await this.$axios.post('/verify-code', {phone: this.phone, code})

      if (resp.data.status === true) {
        this.$refs.phone_number.clearVerificationCode()
        this.showAlert = !this.showAlert
        this.$refs.phone_number.showVerificationCodeForm = false
      }
    },
    listenModalClose() {
      this.showAlert = false
    },
    async handleSubmit(phone) {
      this.phone = phone
      await this.$axios.post('/create-verification-code', {phone})
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.manage-text-message
  width: 500px
  background: $color-white-1
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
  font-family: $font-montserrat

  .title
    @include body-1-medium

  .desc
    font-family: $font-family-sf-pro-display
    @include body-12-normal
    color: $color-gray-5
    border-bottom: 1px solid $color-gray-23

  .go-back a
    color: $color-blue-20
    @include body-13-medium

@media (max-width: 767px)
  .manage-text-message
    width: 95%
    border-radius: 10px

    .title
      color: $color-blue-20
      @include body-13-medium

    .desc
      @include body-10-regular

</style>
