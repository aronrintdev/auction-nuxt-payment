<template>
  <div class="">
    <Preloader />
  </div>
</template>

<script>
import Preloader from '~/components/Preloader.vue';
export default {
  auth: 'guest',
  components: { Preloader },
  mounted(){
    // Calls the backend and get user details
    // Parameters from the callback url are passed
    this.$axios.get(`login/${this.$route.query.service}/callback`, { params:this.$route.query }).then((res)=>{
      const { user, response, error } = res.data
      // If errors
      if(error){
        this.$toasted.error(this.$t(error));
        this.$router.push({ path: '/'} ) // Redirect to the homepage
      }else{
        this.$auth.setUser(user)// Set the auth user
        this.$auth.setUserToken(response.original.access_token)// Set the accesstoken
        this.$store.commit('auth/setLoggedIn', true)// Switch the state to loggedIn
      }
    }).catch((err)=>{
      // Show error and redirect to the homepage
      this.$toasted.error(this.$t(err.response.data.error))
      this.$router.push({ path: '/'})// Redirect to home page
    })
  }
};
</script>
