<template>
  <b-navbar toggleable="lg" class="navbar-wrapper border-bottom">
    <b-navbar-toggle target="top-menu-sidebar">
      <template #default>
        <img width="25px" :src="require('~/assets/img/icons/menu.svg')" alt="..."/>
      </template>
    </b-navbar-toggle>
    <b-navbar-brand to="/" class="navbar-brand ml-auto m-lg-0">
      <div class="d-none d-sm-inline-block">
        <Logo :width="171" />
      </div>
      <div class="d-inline-block d-sm-none">
        <Logo v-if="pageTitle" :width="171" />
        <h2 v-else class="meta-info font-primary fs-18 fw-7 mb-0 text-black">
          {{ pageTitle }}
        </h2>
      </div>
    </b-navbar-brand>
    <b-nav-form class="search-box-wrapper">
      <SearchInput
        :placeholder="$t('navbar.search')"
        :value="searchKeyword"
        pill
        size="sm"
        variant="secondary"
        class="w-100 search-input"
        @focus="handleSearchFocus"
        @clear="handleSearchClear"
      />
    </b-nav-form>
    <SearchOverlay
      ref="searchOverlay"
      :show="showSearchOverlay"
      :search="searchKeyword"
      @hide="handleSearchOverlayHide"
    />
    <b-navbar-nav class="nav-menu-wrapper flex-row d-flex d-lg-none">
      <b-nav-item class="nav-item-icons" to="#">
        <img
          height="24px"
          :src="require('~/assets/img/icons/notification-icon.svg')"
          alt="..."
        />
      </b-nav-item>
      <b-nav-item class="nav-item-icons" to="/checkout/selling">
        <img height="22px" :src="require('~/assets/img/icons/bag.png')" alt="..." />
      </b-nav-item>
    </b-navbar-nav>
    <b-collapse id="nav-collapse" is-nav class="navbar-collapse">
      <b-nav-form class="search-box-collapse">
        <SearchInput
          :placeholder="$t('navbar.search')"
          :value="searchKeyword"
          pill
          size="sm"
          variant="secondary"
          class="w-100"
          @focus="handleSearchFocus"
          @clear="handleSearchClear"
        />
      </b-nav-form>
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
        <b-nav-item
          v-if="authenticated"
          class="nav-item-profile w-100"
          to="/profile/preferences"
          :link-attrs="{ title: $t('navbar.profile') }"
        >
          {{ $t('navbar.profile') }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <vue-bottom-sheet
      ref="searchBottomSheet"
      max-width="auto"
      max-height="100%"
      :rounded="false"
      :is-full-screen="true"
    >
      <SearchOverlayMobile ref="searchbar" @close="close" />
    </vue-bottom-sheet>
    <!-- Sidebar menu begin -->
    <b-sidebar
      id="top-menu-sidebar"
      ref="topSidebar"
      v-click-outside="onClickOutside"
      shadow
      @shown="sidebarIsVisible = true"
      @hidden="sidebarIsVisible = false"
    >
      <div class="top-menu-container">
        <b-nav-form class="search-box-collapse">
          <div class="searchbar-mobile position-relative" @click="open">
            <img
              :src="require('~/assets/img/icons/search.svg')"
              class="search-icon position-absolute"
            />
            <b-form-input
              class="searchbar-input"
              placeholder="Search"
              type="search"
            />
          </div>
        </b-nav-form>
        <b-navbar-nav class="nav-menu-wrapper sidebar-nav mt-4">
          <b-nav-item
            class="w-100"
            to="/shop"
            :link-attrs="{ title: $t('navbar.shop') }"
          >
            <img src="~/assets/img/icons/profile/purchases.svg" />
            <span>{{ $t('navbar.shop') }}</span>
          </b-nav-item>
          <b-nav-item
            class="w-100"
            to="/sell"
            :link-attrs="{ title: $t('navbar.sell') }"
          >
            <img src="~/assets/img/icons/profile/selling.svg" /><span>{{
              $t('navbar.sell')
            }}</span>
          </b-nav-item>
          <b-nav-item
            class="w-100"
            to="/trades"
            :link-attrs="{ title: $t('navbar.trade') }"
          >
            <img src="~/assets/img/icons/profile/trades.svg" /><span>{{
              $t('navbar.trade')
            }}</span>
          </b-nav-item>
          <b-nav-item
            class="w-100"
            to="/auction"
            :link-attrs="{ title: $t('navbar.auction') }"
          >
            <img src="~/assets/img/icons/profile/auctions.svg" /><span>{{
              $t('navbar.auction')
            }}</span>
          </b-nav-item>
          <b-nav-item
            v-if="authenticated"
            class="nav-item-profile w-100"
            to="/profile/preferences"
            :link-attrs="{ title: $t('navbar.profile') }"
          >
            <img src="~/assets/img/icons/side-menu/preferences.svg" /><span>{{
              $t('navbar.profile')
            }}</span>
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-sidebar>
    <!-- Sidebar menu end -->
    <b-navbar-nav
      class="nav-menu-wrapper flex-row d-none d-lg-flex"
      :class="{ 'divider-left pl-4': authenticated }"
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
      <NotificationDropdown v-if="authenticated" />
      <b-nav-item
        v-if="authenticated"
        class="nav-item-icons"
        to="/profile/wish-lists"
      >
        <b-img :src="require('~/assets/img/home/wish-list.svg')" />
      </b-nav-item>
      <b-nav-item class="nav-item-icons" to="/checkout/selling">
        <BagIcon />
      </b-nav-item>
      <b-nav-item id="locale-dropdown" class="langDropdown">
        <Dropdown
          id="locale-dropdown"
          ref="locale"
          class="locale-dropdown"
          :placeholder="locale"
          :icon-arrow-down="require('~/assets/img/icons/arrow-down-gray2.svg')"
        >
          <template #body>
            <div
              v-for="(lang, index) in locales"
              :key="index"
              class="text-uppercase lang-option"
              href="#"
              @click="setLocale(lang)"
            >
              <div class="font-secondary fs-14 py-1">
                {{ lang }}
              </div>
            </div>
          </template>
        </Dropdown>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Logo from '~/components/header/Logo'
import SearchInput from '~/components/common/SearchInput'
import BagIcon from '~/components/checkout/icons/BagIcon'
import SearchOverlay from '~/components/search/Overlay'
import NotificationDropdown from '~/components/header/NotificationDropdown'
import ScreenSize from '~/plugins/mixins/screenSize'
import Dropdown from '~/components/common/form/Dropdown'
import SearchOverlayMobile from '~/components/SearchOverlayMobile'
export default {
  name: 'Header',
  components: {
    NotificationDropdown,
    BagIcon,
    Logo,
    SearchInput,
    SearchOverlay,
    Dropdown,
    SearchOverlayMobile,
  },
  mixins: [ScreenSize],
  data() {
    return {
      showSearchOverlay: false,
      sidebarIsVisible: false,
    }
  },
  head: {
    title: 'Deadstock',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/assets/img/icons/favicon.ico' }]
  },
  computed: {
    ...mapState(['locale', 'locales']),
    ...mapGetters({
      authenticated: 'auth/authenticated',
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
    }
  },
  watch: {
    screenIsSmallThanLG(newVal) {
      const { topSidebar } = this.$refs
      if (!newVal && topSidebar) {
        topSidebar.hide()
      }
    },
  },
  methods: {
    open() {
      this.$refs.searchBottomSheet.open()
    },
    close() {
      this.$refs.searchBottomSheet.close()
    },
    setLocale(lang) {
      this.$refs.locale.hideDropdown()
      this.$store.commit('SET_LANG', lang)
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
    onClickOutside() {
      const { topSidebar } = this.$refs
      if (topSidebar && this.sidebarIsVisible) {
        topSidebar.hide()
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.locale-popover.popover
  background-color: red
  width: 100%
  max-width: 100%
  margin: 0
  margin-left: 1px
  border: none
  box-shadow: none
  .arrow
    display: none
  .popover-body
    padding: 0
    border-radius: 5px
    overflow: hidden
.navbar-wrapper.navbar::v-deep
  font-family: $font-family-base
  padding: 31px 16px
  background-color: $color-white-1
  @media (min-width: 576px)
    padding: 25px 43px
    padding-right: 19px
  .navbar-brand
    margin: 0
    padding: 0
    @media (max-width: 450px)
      padding-left: 15px
  .navbar-collapse
    padding: 0
    margin: 0
    border: none
    &.show
      .nav-item-signup, .nav-item-login, .nav-item-profile
        .nav-link
          margin: 0
          padding: 6px 0
          border: none
          color: $color-gray-5
      .nav-item-icons
        padding: 6px 0
    .search-box-collapse
      display: none
      padding: 6px 20px
      margin-top: 10px
      margin-left: auto
      margin-right: auto
      width: 380px
      max-width: 100%
      .form-inline
        width: 100%
      @media (max-width: 840px)
        display: flex
      @media (max-width: 436px)
        width: 100%
  .search-box-wrapper
    margin-left: 59px
    margin-right: 20px
    width: 338px
    position: relative
    .form-inline
      width: 100%
    @media (max-width: 840px)
      display: none
  .nav-menu-wrapper
    @include body-4-medium
    margin-left: auto
    color: $color-gray-5
    display: flex
    align-items: center
    .nav-item
      .nav-link
        color: $color-gray-5
        padding: 5px 23px
        margin: 0
        @media (max-width: 1256px)
          padding: 5px 13px
      &.langDropdown
         .nav-link
          padding: 0
          margin-left: 0
      &:not(.nav-item-icons)
        .nav-link
          &:hover
            font-weight: $bold
            color: $color-black-1
          &::before
            display: block
            content: attr(title)
            font-weight: $bold
            height: 0
            overflow: hidden
            visibility: hidden
    .nav-item-profile
      .nav-link
        padding-right: 14px
        @media (min-width: 991px)
          margin-left: 12px !important
    .nav-item-icons
      .nav-link
        margin: 0
        padding: 0
        display: flex
        align-items: center
        img, svg
          margin: 0 6px
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
      .nav-item-profile
        .nav-link
          border-right: none
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
.locale-dropdown::v-deep
  .dropdown_wrapper
    padding: 0 !important
    text-align: left
  .lang-option
    padding: 0 10px
    transition: 0.1s all ease-in-out
    &:not(:last-child)
      border-bottom: 1px solid $color-gray-3
    &:hover
      background-color: $color-gray-3
  .btn-dropdown
    color: $color-black-1
    border-width: 0
    background-color: $color-white-1
    border-radius: 8px
    height: 30px
    width: 100%
    padding: 0 10px
    text-transform: uppercase
    .icon-main
      margin-right: 20px !important
    .icon-clear
      right: 23px
    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      background-color: $color-white-4
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
