<template>
  <b-col cols="12" class="mb-5">
    <b-row class="mt-md-4 mt-4">
      <b-col cols="6">
        <div class="ph-30">
          <password-change-component />
        </div>
      </b-col>
      <b-col cols="6" class="mid-line">
        <div class="ph-30">
          <two-factor-authentication-component />
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import PasswordChangeComponent from '~/components/profile/security/PasswordChangeComponent';
import TwoFactorAuthenticationComponent from '~/components/profile/security/TwoFactorAuthenticationComponent';

export default {
  name: 'SecurityComponent',
  components:{
    PasswordChangeComponent,
    TwoFactorAuthenticationComponent
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.ph-30
  padding: 0 30px

.mid-line
  border-left: 1px solid $light-gray-2
</style>
