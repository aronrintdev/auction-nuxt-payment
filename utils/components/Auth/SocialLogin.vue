<template>
  <div class="social-auth">
    <div class="form-group signup signup-social">
      <!-- Google SignInButton -->
      <NuxtLink to="#">
      <span @click="socialLogin('google')">
        <i>
          <img :src="require('~/assets/img/icons/google.png')" alt="" />
        </i>{{ $t('socialLogins.log_in_with_google') }}
      </span>
      </NuxtLink>
    </div>
    <!-- ./Google SignInButton -->
    <!-- Facebook SignInButton -->
    <div class="form-group signup signup-social">
      <NuxtLink to="#">
      <span @click="socialLogin('facebook')">
        <i>
          <img :src="require('~/assets/img/icons/facebook.png')" alt="" />
        </i>{{ $t('socialLogins.log_in_with_facebook') }}
      </span>
      </NuxtLink>
    </div>
    <!-- ./Facebook SignInButton -->
    <!-- AppleID SignInButton -->
    <div class="form-group signup signup-social">
      <NuxtLink to="#">
        <i>
          <img :src="require('~/assets/img/icons/apple.png')" alt="" />
        </i>{{ $t('socialLogins.log_in_with_apple_id') }}
      </NuxtLink>
    </div>
    <!-- ./AppleID SignInButton -->
    <!-- Twitter SignInButton -->
    <div class="form-group signup signup-social">
      <NuxtLink to="#">
      <span @click="socialLogin('twitter')">
        <i>
          <img :src="require('~/assets/img/icons/twitter.png')" alt="" />
        </i>{{ $t('socialLogins.log_in_with_twitter') }}
      </span>
      </NuxtLink>
    </div>
    <!-- ./Twitter SignInButton -->
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'SocialLogin',
  methods: {
    // On social login button click, redirect to specific service.
    socialLogin(service){
      // make a call to login/{service} to get the redirect url.
      this.$axios.get(`login/${service}`).then((res)=>{
        // Redirect to the target url for the respective provider.
        window.location.href = res.data
      }).catch((err)=>{
        // Show the error message
        this.$toasted.error(this.$t(err.response.data.error));
      })
    }
  },
};
</script>