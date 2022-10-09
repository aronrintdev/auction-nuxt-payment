<template>
  <div>
    <div class="two-fa-component">
      <div id="two-factor-auth-component-title">{{ $t('home.2fa') }}</div>
      <p class="mt-2 gray">{{ $t('features.2fa_security.add_additional_security') }}</p>
      <div>
        <toggle-switch :value="enable2fa" :label-on="$t('features.2fa_security.2fa_enabled').toString()"
                       :label-off="$t('features.2fa_security.2fa_disabled').toString()"
                       @change="change"/>
      </div>
      <div class="mt-2">
        <text-verification-component></text-verification-component>
      </div>
      <div class="mt-5">
        <p v-html="$t('features.2fa_security.as_part_of_our_mission')"></p>
      </div>
      <div class="text-right">
        <b-button type="submit" class="btn-recovery-codes">{{ $t('features.2fa_security.recovery_codes') }}</b-button>
      </div>
    </div>

    <NuxtLink to="/faqs/security">
      <div class="btn-faq-wrapper">
        <span class="d-none d-md-block">{{ $t('features.2fa_security.2fa_faq_full') }}</span>
        <span class="d-block d-md-none">{{ $t('features.2fa_security.2fa_faq_small') }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import ToggleSwitch from '~/components/common/ToggleSwitch';
import TextVerificationComponent from '~/components/profile/security/TextVerificationComponent';

export default {
  name: 'TwoFactorAuthenticationComponent',
  components: {
    ToggleSwitch,
    TextVerificationComponent
  },
  data() {
    return {
      enable2fa: false
    }
  },
  created() {
    // loads the current 2fa status and sets the toggle-switch's state
    this.$axios.get('is-2fa-enable')
      .then(resp => {
        if (resp.status === 200)
          this.enable2fa = resp.data.data.is_2fa_enabled || false;
      });
  },
  methods: {
    change(value) {
      this.$axios.post('set-2fa-status', {'is_2fa_enabled': value})
        .then(resp => {
          if (resp.status === 200) {
            const msg = value ? this.$t('features.2fa_security.msg_enable_success').toString() : this.$t('features.2fa_security.msg_disable_success').toString();
            this.$toasted.success(msg).toString();
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

#two-factor-auth-component-title
  font-family: $font-family-montserrat
  @include body-16-medium
  color: $color-blue-20

.btn-recovery-codes
  background: $color-blue-2
  border-radius: 20px
  border-color: $color-blue-2
  padding: 5px 50px

  &:hover
    box-shadow: 0 0.15rem 0.25rem $color-black-rgb3


.btn-faq-wrapper
  border: 1px solid $color-gray-47
  border-radius: 8px
  padding: 20px
  margin-top: 20px
  background: url('~/assets/img/icons/right-round-arrow.svg') no-repeat 95% 50%
  cursor: pointer

  &:hover
    box-shadow: 0 1px 4px $color-black-rgb3

  span
    display: block
    margin-right: 80px
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $medium
    font-size: 20px
    line-height: 24px
    color: $color-blue-20

@media (max-width: 767px)
  .two-fa-component
    font-family: $font-family-sf-pro-display
    padding: 20px
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px
    @include body-10-regular

  #two-factor-auth-component-title
    font-family: $font-family-sf-pro-display
    @include body-13-medium

  .btn-faq-wrapper
    span
      @include body-5-medium

  .gray
    color: $color-gray-5

  ::v-deep .checkbox-switch span
    @include body-10-bold

</style>
