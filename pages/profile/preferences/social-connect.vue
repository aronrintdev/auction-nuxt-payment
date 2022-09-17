<template>
  <div>
    <Preloader />
  </div>
</template>

<script>
import Preloader from '~/components/Preloader.vue';
export default {
  name: 'SocialConnect',

  components: {
    Preloader
  },
  // after the instance has been mounted
  mounted() {
    /**
     * On social callback,
     * Call the api to update the social details of the user.
     * @params passed, query parameters from the callback url.
     * this.$route.query.service can be any social service - google, twitter, facebook.
     */
    this.$axios
      .get(`/preferences/socialaccount/connect/${this.$route.query.service}`, {
        params: this.$route.query,
      })
      .then((res) => {
        this.$toasted.success(this.$t(res.data.message))
        this.$router.push({ path: '/profile/preferences' })
        
      })
      .catch((err) => {
        this.$toasted.error(this.$t('preferences.payments.something_went_wrong'))
        this.$logger.logToServer('Profile Social Media Connection', err.response.data)
        this.$router.push({ path: '/profile/preferences' })
      })
  },
}
</script>