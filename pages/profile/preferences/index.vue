<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider">
      <h1 class="vd-preferences-slider-heading">
        {{ $t('profile_menu.preferences') }}
      </h1>
    </div>
    <b-container fluid>
      <b-row class="mt-md-4 mt-4">
        <b-col md="3" sm="3"></b-col>
        <b-col
          md="6"
          sm="6"
          class="vd-sub-row-heading justify-content-center d-flex col-xs-8"
        >
          <!-- Profile/ Payments Tab -->
          <NavGroup :value="activeNav" :data="menus" @change="navItem" />
          <!-- ./Profile/ Payments Tab -->
        </b-col>
        <!-- Logout Button -->
        <b-col
          id="logout-button-wrapper"
          md="3"
          sm="3"
          class="text-center col-xs-4 m-auto"
        >
          <b-button
            v-if="activeNav === 'profile'"
            variant="light"
            class="preferences-logout-btn"
            pill
            @click="logout"
          >
            {{ $t('home.logout') }}
          </b-button>
        </b-col>
        <!-- ./ Logout Button -->
      </b-row>
      <b-row class="component-row">
        <!-- Content -->
        <PreferenceComponent :active-nav="activeNav" />
        <!-- ./Content -->
      </b-row>
    </b-container>
  </b-col>
</template>
<script>
import { mapActions } from 'vuex'
import NavGroup from '~/components/common/NavGroup.vue'
import PreferenceComponent from '~/components/profile/preferences/PreferenceComponent.vue'
import logoutMixin from '~/plugins/mixins/logout'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'
export default {
  name: 'ProfilePreferencesIndexPage',
  components: {
    NavGroup, // Tabs Component
    PreferenceComponent,
  },
  mixins: [logoutMixin],
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: 'profile',
      // Menus for tabs
      menus: [
        { label: this.$t('navbar.profile'), value: 'profile' },
        { label: this.$tc('common.payment', 2), value: 'payments' },
      ],
    }
  },
  mounted() {
    // inject google maps on mount.
    this.injectGoogleMapsApi()
    this.getUserPaymentMethods()
  },
  methods: {
    ...mapActions({
      savePaymentMethods: 'preferences/savePaymentMethods'
    }),
    // On Tab Change (Profile/ Payment)
    navItem(val) {
      this.activeNav = val
    },
    // Logout User
    async logout() {
      this.loggingOut = true
      // Logout a user
      await this.$auth.logout({ handleError: false }).then(() => {
        this.postLogout()
      })
      if (!this.$store.state.auth.loggedIn) {
        this.$router.push('/?lang=' + this.$store.state.locale)
        this.$toasted.success(this.$t('home.logout_successful'))
      }
    },
    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
      }
      return false
    },
    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true
      return scriptTag
    },
    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    },
    // Get the users paymenst
    getUserPaymentMethods() {
      this.$axios
        .get('/preferences/payments/user-payment-methods')
        .then((res) => {
          this.savePaymentMethods({
            data: res.data,
          })
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>