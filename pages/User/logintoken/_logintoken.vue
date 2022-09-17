<template>
  <div class="">
    <div class="wrapper">
      <Header />
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12 loginmain">
              <div class="panel panel-login">
                <div class="panel-body">
                  <div v-if="invalidToken">{{ $t('login.invalid_token') }}</div>
                  <div v-else>{{ $t('login.please_wait') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/AuthHeader/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    // Header Component
    Header,
    // Footer Component
    Footer,
  },
  data() {
    return {
      invalidToken: false,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'hold-transition sidebar-mini layout-fixed',
      },
    }
  },
  computed: {
    ...mapGetters(['getLang', 'setLoggedIn']),
  },
  mounted() {
    this.$axios
      .get(
        '/user/user-detail-with-token/' +
          this.$route.query.token +
          '/' +
          this.$route.query.admin_id
      )
      .then((response) => {
        if (response.data.user.id > 1) {
          this.$auth.setUser(response.data.user) // Set the auth user
          this.$auth.setUserToken(response.data.token) // Set the accesstoken
          this.$store.commit('SET_LOGGEDIN', true) // Switch the state to loggedIn
          this.$toasted.success(
            this.$t('login.success_message.login_successfull').toString()
          )
          this.$router.push('/?lang=' + this.getLang.locale)
        } else {
          this.invalidToken = true
        }
      })
      .catch((error) => {
        this.invalidToken = true
        // Show unauthorized message on error
        this.$toasted.error(error.response.data.message.user_token[0])
      })
  },
}
</script>
