<template>
  <b-navbar toggleable="lg" class="navbar-wrapper border-bottom px-2 px-md-4">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand to="/" class="navbar-brand ml-auto m-lg-0">
      <Logo :width="171" />
    </b-navbar-brand>
    <b-nav-form class="search-box-wrapper fsdfsd">
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
      <NotificationDropdown v-if="authenticated" />
      <b-nav-item class="nav-item-icons" to="/checkout/selling">
        <BagIcon />
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
        <b-nav-item to="/shop" :link-attrs="{ title: $t('navbar.shop') }">
          {{ $t('navbar.shop') }}
        </b-nav-item>
        <b-nav-item to="/sell" :link-attrs="{ title: $t('navbar.sell') }">
          {{ $t('navbar.sell') }}
        </b-nav-item>
        <b-nav-item
          v-if="authenticated"
          to="/trades"
          :link-attrs="{ title: $t('navbar.trade') }"
        >
          {{ $t('navbar.trade') }}
        </b-nav-item>
        <b-nav-item
          v-if="authenticated"
          to="/auction"
          :link-attrs="{ title: $t('navbar.auction') }"
        >
          {{ $t('navbar.auction') }}
        </b-nav-item>
        <b-nav-item
          v-if="authenticated"
          class="nav-item-profile"
          to="/profile/preferences"
          :link-attrs="{ title: $t('navbar.profile') }"
        >
          {{ $t('navbar.profile') }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav class="nav-menu-wrapper flex-row d-none d-lg-flex">
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
        class="nav-item-login"
        to="/login"
        :link-attrs="{ title: $t('navbar.login') }"
      >
        {{ $t('navbar.login') }}
      </b-nav-item>
      <!--        For now heatcheck is disabled-->
      <!--        <b-nav-item class="nav-item-icons" to="/heat-check">-->
      <!--          <b-img :src="require('~/assets/img/home/heat-check.svg')" />-->
      <!--        </b-nav-item>-->
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
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from '~/components/header/Logo'
import SearchInput from '~/components/common/SearchInput'
import BagIcon from '~/components/checkout/icons/BagIcon'
import SearchOverlay from '~/components/search/Overlay'
import NotificationDropdown from '~/components/header/NotificationDropdown'
export default {
  name: 'Header',
  components: {
    NotificationDropdown,
    BagIcon,
    Logo,
    SearchInput,
    SearchOverlay,
  },
  data() {
    return {
      showSearchOverlay: false,
    }
  },
  computed: {
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
  },
  methods: {
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
<style lang="sass">
@import '~/assets/css/_variables'
.navbar-wrapper
  padding: 25px 30px 26px 30px
  background-color: $color-white-1
  .navbar-brand
    margin: 0
    padding: 0
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
        text-align: center
        @media (max-width: 1256px)
          padding: 5px 13px
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
        margin-right: 15px
        padding-right: 14px
        border-right: 1px solid $color-gray-5
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
        border-right: 1px solid $color-black-1
        color: $color-black-1
    .nav-item-login
      .nav-link
        padding-left: 7px
        color: $color-black-1
</style>
