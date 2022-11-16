<template>
  <b-col :class="{
    'mobile' : isScreenXS,
    'mb-5' : !isScreenXS
  }" class="security-body" cols="12">
    <b-row :class="{
        'mobile' : isScreenXS,
        'mt-md-4 mt-4-5' : !isScreenXS
      }" class="content">
      <b-col :class="{
        'px-3': !isScreenXS,
        '': !isScreenXS
      }" class="d-flex justify-content-center align-items-center d-md-none" cols="12">
        <NavGroup :class="{
          'my-2': !isScreenXS,
          'mb-30': isScreenXS
        }" :data="navigations" :value="activeNav" class="w-100" @change="navItem"/>
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
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'SecurityComponent',
  components: {
    PasswordChangeComponent,
    TwoFactorAuthenticationComponent,
    NavGroup
  },
  mixins: [screenSize],
  data() {
    return {
      activeNav: 'password',
      navigations: [
        {label: this.$t('change_password.password'), value: 'password'},
        {label: this.$t('features.2fa_security.title'), value: '2fa_security'}
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

.security-body
  &.mobile
    padding: 22px 11px

  .mb-30
    margin-bottom: 30px

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
