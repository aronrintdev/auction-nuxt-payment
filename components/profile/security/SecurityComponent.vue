<template>
  <b-col cols="12" class="mb-5">
    <b-row class="mt-md-4 mt-4">
      <b-col cols="12" class="d-flex justify-content-center align-items-center px-3 d-md-none">
        <NavGroup :value="activeNav" :data="navigations" class="my-2 w-100" @change="navItem"/>
      </b-col>
      <b-col md="6" class="d-none d-md-block">
        <div class="ph-30">
          <password-change-component/>
        </div>
      </b-col>
      <b-col md="6" class="mid-line d-none d-md-block">
        <div class="ph-30">
          <two-factor-authentication-component/>
        </div>
      </b-col>
      <b-col cols="12" class="d-block d-md-none">
        <div v-if="activeNav==='password'">
          <password-change-component/>
        </div>
        <div v-if="activeNav==='2fa_security'">
          <two-factor-authentication-component/>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import PasswordChangeComponent from '~/components/profile/security/PasswordChangeComponent';
import TwoFactorAuthenticationComponent from '~/components/profile/security/TwoFactorAuthenticationComponent';
import {NavGroup} from '~/components/common';

export default {
  name: 'SecurityComponent',
  components: {
    PasswordChangeComponent,
    TwoFactorAuthenticationComponent,
    NavGroup
  },
  data() {
    return {
      activeNav: 'password',
      navigations: [
        {label: 'Password', value: 'password'},
        {label: '2FA Security', value: '2fa_security'}
      ]
    }
  },
  methods: {
    navItem(val) {
      this.activeNav = val
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.ph-30
  padding: 0 30px

.mid-line
  border-left: 1px solid $light-gray-2

@media (max-width: 767px)
  ::v-deep .nav-group .btn-group
    width: 100%

  ::v-deep .nav-group .btn-group .btn
    font-size: 13px
</style>
