<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="navbar-wrapper w-100 d-flex justify-content-between"
      :class="mobileClass ? 'border-bottom' : ''"
    >
      <PortalTarget name="back-icon-slot" class="d-block d-sm-none">
        <b-navbar-toggle target="top-menu-sidebar">
          <template #default>
            <img
              :src="require('~/assets/img/icons/menu_v2.svg')"
              alt="..."
            />
          </template>
        </b-navbar-toggle>
      </PortalTarget>
      <b-navbar-toggle class="d-none d-sm-block" target="top-menu-sidebar">
        <img :src="require('~/assets/icons/navbar/menu.svg')" alt="..."/>
      </b-navbar-toggle>

      <b-navbar-brand to="/" class="navbar-brand">
        <div class="d-none d-sm-inline-block">
          <Logo :width="164" />
        </div>
        <div class="d-inline-block d-sm-none">
          <h2 class="meta-info font-primary body-3-medium mb-0 text-black">
            <PortalTarget name="page-title">
              <Logo :width="164" />
            </PortalTarget>
          </h2>
        </div>
      </b-navbar-brand>

      <div class="d-flex">
        <b-navbar-nav class="nav-menu-wrapper d-flex align-items-center flex-row d-lg-none">
          <PortalTarget name="notification-slot">
            <b-nav-item
              class="nav-item-icons"
              :to="`${authenticated ? '/profile/notification' : '/login'}`"
            >
              <!-- to append custom elements based on different pages in responsive mode  -->
              <PortalTarget name="notification-icon-slot">
                <img
                  height="24px"
                  :src="require('~/assets/img/icons/notification-icon.svg')"
                  alt="..."
                />
              </PortalTarget>
            </b-nav-item>
          </PortalTarget>
          <b-nav-item class="nav-item-icons" to="/checkout/selling">
            <PortalTarget name="cart-icon-slot">
              <img :src="require('~/assets/img/icons/basket.svg')" alt="..."/>
            </PortalTarget>
          </b-nav-item>
        </b-navbar-nav>
        <b-collapse id="nav-collapse" is-nav class="navbar-collapse">
          <b-navbar-nav class="nav-menu-wrapper">
            <b-nav-item
              class="w-100"
              to="/shop"
              :link-attrs="{ title: $t('navbar.shop') }"
            >
              {{ $t('navbar.shop') }}
            </b-nav-item>
            <b-nav-item
              v-if="authenticated"
              class="w-100"
              to="/sell"
              :link-attrs="{ title: $t('navbar.sell') }"
            >
              {{ $t('navbar.sell') }}
            </b-nav-item>
            <b-nav-item
              v-if="!authenticated"
              class="w-100"
              to="/login"
              :link-attrs="{ title: $t('navbar.sell') }"
            >
              {{ $t('navbar.sell') }}
            </b-nav-item>
            <b-nav-item
              class="w-100"
              to="/trades"
              :link-attrs="{ title: $t('navbar.trade') }"
            >
              {{ $t('navbar.trade') }}
            </b-nav-item>
            <b-nav-item
              class="w-100"
              to="/auction"
              :link-attrs="{ title: $t('navbar.auction') }"
            >
              {{ $t('navbar.auction') }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <b-navbar-nav
          class="nav-menu-wrapper flex-row d-none d-lg-flex ml-5 pl-3"
        >
          <b-nav-item
            v-if="!authenticated"
            class="nav-item-signup"
            to="/signup"
            :link-attrs="{ title: $t('navbar.sign_up') }"
          >
            {{ $t('navbar.sign_up') }}
          </b-nav-item>
          <b-nav-item
            v-if="!authenticated"
            class="nav-item-login divider-left"
            to="/login"
            :link-attrs="{ title: $t('navbar.login') }"
          >
            {{ $t('navbar.login') }}
          </b-nav-item>
          <b-nav-item
            v-if="authenticated"
            class="nav-item-icons"
            @click.stop="handleSearchFocus"
          >
            <b-img :src="require('~/assets/icons/navbar/search.svg')" />
          </b-nav-item>
          <NotificationDropdown v-if="authenticated">
            <template #icon>
              <b-img :src="require('~/assets/icons/navbar/notification.svg')" />
            </template>
          </NotificationDropdown>
          <b-nav-item class="nav-item-icons" to="/checkout/selling">
            <b-img :src="require('~/assets/icons/navbar/basket.svg')" alt="..." />
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
    <SearchOverlay
      ref="searchOverlay"
      :show="showSearchOverlay"
      :search="searchKeyword"
      @hide="handleSearchOverlayHide"
    />
    <LeftSideBarMenu
      :user="user"
      :is-authenticated="authenticated"
      :is-vendor="isVendor"
    />
  </div>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Logo from '~/components/header/Logo'
import LeftSideBarMenu from '~/components/LeftSideBarMenu'
import SearchOverlay from '~/components/search/Overlay'
import NotificationDropdown from '~/components/header/NotificationDropdown'
import ScreenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'Header',
  components: {
    NotificationDropdown,
    Logo,
    LeftSideBarMenu,
    SearchOverlay,
  },
  mixins: [ScreenSize],
  data() {
    return {
      showSearchOverlay: false,
    }
  },
  head: {
    title: 'Deadstock',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/assets/img/icons/favicon.ico',
      },
    ],
  },
  computed: {
    ...mapState(['locale', 'locales']),
    ...mapGetters({
      authenticated: 'auth/authenticated',
      isVendor: 'auth/isVendor',
      user: 'auth/user',
    }),
    searchKeyword() {
      // Set value for search input box in search page
      if (this.$route.query?.q && this.$route.name === 'search') {
        return this.$route.query.q
      } else {
        return ''
      }
    },
    pageTitle() {
      return this.$nuxt?.context?.route?.meta[0]?.pageTitle ?? null
    },
    showMenuIcon() {
      return this.$route.name !== 'login' && this.$route.name !== 'signup'
    },
  },
  watch: {
    screenIsSmallThanLG(newVal) {
      const { topSidebar } = this.$refs
      if (!newVal && topSidebar) {
        topSidebar.hide()
      }
    },
  },
  mounted() {
    this.$root.$on('showSearchOverlay', this.open)
    this.$root.$on('hideSearchOverlay', this.close)
  },
  destroyed() {
    this.$root.$off('showSearchOverlay', this.open)
    this.$root.$off('hideSearchOverlay', this.close)
  },
  methods: {
    notificationPage() {
      if (this.authenticated) {
        this.$router.push({
          path: '/profile/notification',
        })
      }
    },
    setLocale(lang) {
      this.$refs.locale.hideDropdown()
      this.$store.commit('SET_LANG', lang)
      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${lang}`,
      })
    },
    handleSearchFocus() {
      this.showSearchOverlay = true
    },
    handleSearchOverlayHide() {
      this.showSearchOverlay = false
    },
    handleSearchClear() {
      // Search input box is cleared in next ticket because this should be done after component render
      this.$nextTick(() => {
        this.$refs.searchOverlay.clearInput()
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.page-title
  @include body-3-medium

.navbar-wrapper.navbar::v-deep
  font-family: $font-family-base
  padding: 19px 10px 10px 10px
  background-color: $color-white-1
  border-bottom: 1px $color-gray-47

  svg text
    font-family: $font-family-sf-pro-display
    @include body-18-normal

  @media (min-width: 576px)
    padding: 22.5px 16px
    padding-right: 16px
  .navbar-brand
    position: absolute
    left: 50%
    margin-left: -82px
    @media (max-width: 450px)
      padding-left: 35px
  .navbar-collapse
    padding: 0
    margin: 0
    border: none
    &.show
      .nav-item-signup, .nav-item-login
        .nav-link
          margin: 0
          padding: 6px 0
          border: none
          color: $color-gray-5
      .nav-item-icons
        padding: 6px 0
  .nav-menu-wrapper
    margin-left: auto
    color: $color-gray-5
    display: flex
    align-items: center
    .nav-item
      .nav-link
        color: $color-black-1
        @include body-34-normal
        font-family: $font-family-montserrat
        padding: 5px 23px
        margin: 0
        @media (max-width: 1256px)
          padding: 5px 13px
      &:not(.nav-item-icons)
        .nav-link
          &:hover
            font-weight: $medium
            color: $color-black-1
          &::before
            display: block
            content: attr(title)
            font-weight: $bold
            height: 0
            overflow: hidden
            visibility: hidden
    .nav-item-icons
      .nav-link
        margin: 0
        padding: 0
        display: flex
        align-items: center
        img, svg
          margin: 0 5px
    .nav-item-signup
      .nav-link
        padding-right: 7px
        color: $color-black-1
    .nav-item-login
      .nav-link
        padding-left: 7px
        color: $color-black-1
  .top-menu-container
    padding: 29px 15px 29px 52px
    margin-top: 1rem
    .sidebar-nav
      .nav-item
        padding: 5px 0px
        .nav-link
          img
            width: 22px
            height: 22px
          span
            text-align: right
            padding-left: 24px
            font-size: 14px
            line-height: 17px
  .divider-left
    position: relative
    &::before
      content: ''
      position: absolute
      top: 50%
      left: 0
      width: 1px
      height: 22px
      background-color: $color-black-1
      transform: translate(0, -50%)
img.search-icon
  top: 50%
  transform: translate(0, -50%)
  left: 10px
input.searchbar-input
  background-color: $color-gray-3
  color: $color-black-1
  border: 0
  border-radius: 50px
  padding: 6px 10px
  padding-left: 40px
  width: 100%
::v-deep .bottom-sheet__content
  margin-right: -8px
</style>
