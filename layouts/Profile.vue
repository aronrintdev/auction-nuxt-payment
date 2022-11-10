<template>
  <div id="profile-layout" class="wrapper min-vh-100 d-flex flex-column">
    <Header />

    <div class="custom-wrapper flex-grow-1">
      <div class="row mb-bb">
        <!-- New menu design begin -->
        <client-only>
          <div class="col">
            <div v-if="screenIsSmallThanLG" class="heading-1-bold p-3">{{ $t('navbar.profile') }}</div>

            <NewSideMenu v-if="!isScreenXS && !isScreenSM && !isScreenMD" />
            <!-- new menu area end -->
          </div>
        </client-only>
        <!-- New menu design end -->
      </div>

      <div
        class="main-wrapper"
        :class="{ 'mobile-p-b': isScreenXS || isScreenSM }"
      >
        <Nuxt />
      </div>
    </div>

    <!-- ScollTo Top Button -->
    <ScrollToTop v-show="mobileClass && showScroll" />
    <!-- ./ScrollTo Top Button Ends -->
    <BottomNavigation class="d-flex d-md-none mt-4" />
    <Footer class="d-none d-md-flex" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import NewSideMenu from '~/components/profile/NewSideMenu'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { SCROLLY } from '~/static/constants'
import realtime from '~/plugins/mixins/realtime'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'
import BottomNavigation from '~/components/homepage/BottomNavigation.vue'
export default {
  name: 'Default',
  components: {
    NewSideMenu,
    Header,
    Footer,
    ScrollToTop,
    BottomNavigation,
  },
  mixins: [screenSize, realtime],
  data() {
    return {
      showScroll: false,
      scrollY: SCROLLY,
      sidebarIsVisible: false,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'hold-transition sidebar-mini layout-fixed authLayout',
      },
    }
  },
  computed: {
    ...mapGetters({
      pushActive: 'notifications/getPushNotificationsActive',
    }),
  },
  watch: {
    screenIsSmallThanLG(newVal) {
      const { mySidebar } = this.$refs
      if (!newVal && mySidebar) {
        mySidebar.hide()
      }
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // disable guests to access this layout and pages that uses this layout
    if (!this.$store.state.auth.loggedIn) {
      this.$router.push('/login')
    }
    this.$store.dispatch('notifications/getNotifications')
    this.$store.dispatch('notifications/getUnreadCount')
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
    const wrapper = document.querySelector('.main-wrapper')
    if (wrapper.querySelector('.wants-container')) {
      wrapper.style.backgroundColor = '#f7f7f7'
    }
    this.notificationSubscriptions()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Your scroll handling here
      this.showScroll = window.scrollY > this.scrollY
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.wrapper
  .custom-wrapper
    overflow: hidden
    margin: 0
    padding: 0

    .main-wrapper
      width: 100%
      background-color: $color-white-4
      @media (max-width: 576px)
        min-height: calc(100vh - 200px)

.w3-xlarge
  @include body-1
  float: right

.w3-btn, .w3-button
  border: none
  display: inline-block
  padding: 8px 16px
  vertical-align: middle
  overflow: hidden
  text-decoration: none
  color: inherit
  background-color: inherit
  text-align: center
  cursor: pointer
  white-space: nowrap

@media (min-width: 993px)
  .wrapper
    .custom-wrapper
      display: flex
  .w3-hide-large
    display: none
  .sidebar
    display: block

@media (max-width: 992px)
  .wrapper
    .custom-wrapper
      .main-wrapper
        background-color: $color-white-1

  .sidebar
    display: none
  #sidemenu-expanded
    display: none
@media (max-width: 992px)
  .wrapper
    .custom-wrapper
      background-color: $color-white-19

.mobile-p-b
  padding-bottom: 98px
</style>
