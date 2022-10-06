<template>
  <div class="wrapper">
    <Header />

    <div class="custom-wrapper">
      <div class="row mb-bb">
        <div class="col-md-12 col-lg-2">
          <button
              v-if="!isScreenXS"
              v-b-toggle.sidebar
              class="w3-button w3-xlarge w3-hide-large float-left"
          >
            <span class="text-bold">{{ $t('navbar.profile') }}</span>
            <i class="fa fa-bars"></i>
          </button>
          <!-- BootstrapVue Sidebar: in small devices -->
          <b-sidebar id="sidebar" ref="mySidebar" shadow>
            <SideMenu id="sidemenu" />
          </b-sidebar>
          <!-- ./BootstrapVue Sidebar -->

          <!-- Collapsable SideMenu for large devices -->
          <NewSideMenu v-if="!isScreenXS"/>
          <!-- Collapsable SideMenu for large devices -->
        </div>
      </div>

      <div class="main-wrapper">
        <Nuxt />
      </div>
    </div>

    <!-- ScollTo Top Button -->
    <ScrollToTop v-show="mobileClass && showScroll" />
    <!-- ./ScrollTo Top Button Ends -->
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import SideMenu from '~/components/profile/SideMenu.vue'
import NewSideMenu from '~/components/profile/NewSideMenu'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { SCROLLY } from '~/static/constants'
export default {
  name: 'Default',

  components: {
    NewSideMenu,
    Header,
    Footer,
    SideMenu,
    ScrollToTop,
  },
  mixins: [screenSize],
  data() {
    return {
      showScroll: false,
      scrollY: SCROLLY
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'hold-transition sidebar-mini layout-fixed authLayout',
      },
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // disable guests to access this layout and pages that uses this layout
    if (!this.$store.state.auth.loggedIn) {
      this.$router.push('/login')
    }
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)

    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    onResize() {
      this.$store.commit('size/setWindowWidth', window.innerWidth)
    },
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
</style>
