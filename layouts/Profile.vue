<template>
  <div class="wrapper">
    <Header/>

    <div class="custom-wrapper">
      <div class="row mb-bb">

        <!-- TODO: It will remove after getting confirmation for the new menu design -->
        <div v-if="false" class="col-md-12 col-lg-2">

          <button v-if="screenIsSmallThanLG"
                  v-b-toggle.sidebar
                  class="w3-button w3-xlarge w3-hide-large float-left">
            <span class="text-bold">{{ $t('navbar.profile') }}</span>
            <i class="fa fa-bars"></i>
          </button>
          <!-- BootstrapVue Sidebar: in small devices -->
          <b-sidebar id="sidebar" ref="mySidebar"
                     v-click-outside="onClickOutside"
                     shadow
                     @shown="sidebarIsVisible = true"
                     @hidden="sidebarIsVisible = false">
            <NewSideMenu id="sidemenu" ref="sidemenu" />
          </b-sidebar>
          <!-- ./BootstrapVue Sidebar -->

          <!-- Collapsable SideMenu for large devices -->
          <NewSideMenu v-if="!isScreenXS"/>
          <!-- Collapsable SideMenu for large devices -->
        </div>

        <!-- New menu design begin -->
        <div class="col">
          <button
            v-if="isScreenXS || isScreenSM || isScreenMD"
            v-b-toggle.sidebar
            class="w3-button w3-xlarge w3-hide-large float-left">
            <span class="text-bold">{{ $t('navbar.profile') }}</span>
            <i class="fa fa-bars"></i>
          </button>

          <!-- new menu area -->
          <b-sidebar id="sidebar"
                     ref="mySidebar"
                     shadow
                     @shown="sidebarIsVisible = true"
                     @hidden="sidebarIsVisible = false">
            <NewSideMenu id="sidemenu" ref="sidemenu" v-click-outside="onClickOutside" :show-title="false"  />
          </b-sidebar>
          <NewSideMenu v-if="!isScreenXS && !isScreenSM && !isScreenMD" />
          <!-- new menu area end -->
        </div>
        <!-- New menu design end -->
      </div>

      <div class="main-wrapper">
        <Nuxt/>
      </div>
    </div>

    <!-- ScollTo Top Button -->
    <ScrollToTop v-show="mobileClass && showScroll"/>
    <!-- ./ScrollTo Top Button Ends -->
    <Footer/>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import NewSideMenu from '~/components/profile/NewSideMenu'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import screenSize from '~/plugins/mixins/screenSize'
import {SCROLLY} from '~/static/constants'
import realtime from '~/plugins/mixins/realtime'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'Default',
  components: {
    NewSideMenu,
    Header,
    Footer,
    ScrollToTop,
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
      'pushActive': 'notifications/getPushNotificationsActive'
    })
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
    });
    const wrapper = document.querySelector('.main-wrapper')
    if (wrapper.querySelector('.wants-container')) {
      wrapper.style.backgroundColor = '#f7f7f7'
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Your scroll handling here
      this.showScroll = window.scrollY > this.scrollY
    },
    onClickOutside() {
      const { mySidebar } = this.$refs
      if (mySidebar && this.sidebarIsVisible) {
        mySidebar.hide()
      }
    }
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

</style>
