<template>
  <b-row>
    <b-col md="12" class="d-flex align-items-center justify-content-center p-0">
      <b-img
        :src="require('~/assets/img/auth/social_login_google.svg')"
        class="mx-3 social_login_btn"
        role="button"
        alt="..."
        @click="socialLogin('google')"
      />
      <b-img
        :src="require('~/assets/img/auth/social_login_facebook.svg')"
        class="mx-3 social_login_btn"
        role="button"
        alt="..."
        @click="socialLogin('facebook')"
      />
      <b-img
        :src="require('~/assets/img/auth/social_login_apple.svg')"
        class="mx-3 social_login_btn"
        role="button"
        alt="..."
        @click="socialLogin('apple')"
      />
      <b-img
        :src="require('~/assets/img/auth/social_login_twitter.svg')"
        class="ml-3 social_login_btn"
        role="button"
        alt="..."
        @click="socialLogin('twitter')"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SocialLoginButtons',
  methods: {
    socialLogin(service) {
      this.$axios.get(`login/${service}`).then((res) => {
        window.open(res.data, '_blank')
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@media (min-width: 320px) and (max-width: 556px)
  .social_login_btn
    height: 48px !important
    width: 48px !important
</style>
