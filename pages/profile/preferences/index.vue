<template>
  <b-col class="vendor-preferences-body" :class="isScreenXS">
    <div v-if="!isScreenXS" class="vd-preferences-slider preferences-web">
      <h1 class="vd-preferences-slider-heading">
        {{ $t('profile_menu.preferences') }}
      </h1>
    </div>
    <b-container class="vendor-preferences-body preferences-web" fluid>
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

    <!-- for responsive screen-->
    <div v-if="isScreenXS" class="responsive-preferences">
      <!-- heading for responsive screen-->
      <span
        v-if="showHeader"
        class="
          d-flex
          text-align-center
          align-items-center
          justify-content-center
          mt-3
          border-bottom
        "
      >
        <h1 class="responsive-heading text-capitalize">
          {{ $t('profile_menu.preferences') }}
        </h1>
      </span>
      <!-- heading for responsive screen-->
      <b-col
        v-if="showHeader"
        class="justify-content-center align-items-center d-flex mt-3"
      >
        <!-- Profile/ Payments Tab for responsive screen-->
        <NavGroup
          id="responsive-nav"
          :value="activeNav"
          :data="menus"
          class="nav-select w-100"
          @change="navItem"
        />
        <!-- Profile/ Payments Tab for responsive screen-->
      </b-col>
      <b-row class="component-row">
        <!-- Content -->
        <ResponsiveProfileComponent v-if="activeNav === 'profile'" />
        <ResponsivePaymentComponent v-else />
        <!-- ./Content -->
      </b-row>
    </div>
    <!-- for responsive screen-->
  </b-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import NavGroup from '~/components/common/NavGroup.vue'
import PreferenceComponent from '~/components/profile/preferences/PreferenceComponent.vue'
import logoutMixin from '~/plugins/mixins/logout'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'
import realtime from '~/plugins/mixins/realtime'
import screenSize from '~/plugins/mixins/screenSize'
import ResponsiveProfileComponent from '~/components/profile/preferences/ResponsiveProfileComponent.vue'
import ResponsivePaymentComponent from '~/components/profile/preferences/ResponsivePaymentComponent.vue'

export default {
  name: 'ProfilePreferencesIndexPage',

  components: {
    NavGroup, // Tabs Component
    PreferenceComponent,
    ResponsiveProfileComponent,
    ResponsivePaymentComponent,
  },
  mixins: [logoutMixin, realtime, screenSize],
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

  computed: {
    ...mapGetters({
      showHeader: 'preferences/showHeader',
    }),
  },

  mounted() {
    if(this.$auth.$storage.getUniversal('showGiftCardMethod')){
      this.activeNav = 'payments'
    }
    // inject google maps on mount.
    this.injectGoogleMapsApi()
    this.getUserPaymentMethods()
    this.$store.dispatch('preferences/changeHeaderVisibility', true)
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
        this.disconnectSocket()
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
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.vendor-preferences-body
  .responsive-preferences
    padding: 20px 16px
  .responsive-heading
    font-family: $font-montserrat
    font-style: normal
    @include body-3-medium
    letter-spacing: -0.02em
    color: $color-black-1
    background-color: $color-white-1

@media (max-width:576px)
  .preferences-web
    display: none
  .responsive-preferences::v-deep
    display: block
    background-color: $color-white-1
@media (min-width:576px)
  .preferences-web
    display: block
.vendor-preferences-body
  #responsive-nav::v-deep
    .btn-group
      margin: 0
</style>
