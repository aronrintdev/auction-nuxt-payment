<template>
  <div class="bottom-navigation bg-black px-3 pt-3 position-sticky w-100">
    <SearchOverlay
      ref="searchOverlay"
      :show="showSearchOverlay"
      @hide="handleSearchOverlayHide"
    />
    <div
      class="d-flex text-center justify-content-between align-items-center w-100"
    >
      <nuxt-link class="navLink" to="/">
        <home :active="$route.path === '/'" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('home.home') }}
        </h6>
      </nuxt-link>
      <nuxt-link class="navLink" to="/browse">
        <search :active="$route.path === '/browse'" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.browse') }}
        </h6>
      </nuxt-link>
      <nuxt-link class="navLink" to="/shop">
        <shop :active="$route.path === '/shop'" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white shop-text">
          {{ $t('navbar.shop') }}
        </h6>
      </nuxt-link>
      <nuxt-link class="navLink" to="/trades">
        <trade :active="$route.path === '/trades'" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.trade') }}
        </h6>
      </nuxt-link>
      <nuxt-link class="navLink" to="/auction">
        <auction :active="$route.path.includes('/auction')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.auction') }}
        </h6>
      </nuxt-link>
      <nuxt-link v-b-toggle.bottom-menu-sidebar class="navLink" event="" to="/">
        <profile />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.profile') }}
        </h6>
      </nuxt-link>
    </div>

    <RightSideBarMenu
      :user="user"
      :is-authenticated="authenticated"
      :is-vendor="isVendor"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchOverlay from '~/components/search/Overlay'
import home from '~/assets/icons/bottom-nav/home'
import search from '~/assets/icons/bottom-nav/search'
import shop from '~/assets/icons/bottom-nav/shop'
import trade from '~/assets/icons/bottom-nav/trade'
import auction from '~/assets/icons/bottom-nav/auction'
import profile from '~/assets/icons/bottom-nav/profile'
import RightSideBarMenu from '~/components/RightSideBarMenu'
export default {
  name: 'BottomNavigation',
  components: { SearchOverlay, home, search, shop, trade, auction, profile, RightSideBarMenu },
  data() {
    return {
      showSearchOverlay: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      isVendor: 'auth/isVendor',
      user: 'auth/user',
    }),
  },
  methods: {
    handleSearchFocus() {
      this.$root.$emit('showSearchOverlay')
    },
    handleSearchOverlayHide() {
      this.$root.$emit('hideSearchOverlay')
    },
  },
}
</script>
<style lang="sass" scoped>

@import '/assets/css/variables'

.bottom-navigation
    bottom: 0
    z-index: 2000000001
    padding-bottom: 30px
.shop-text
  margin-top: 5px
</style>
