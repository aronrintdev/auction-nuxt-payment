<template>
  <div class="bottom-navigation bg-black px-4 pt-3">
    <SearchOverlay
      ref="searchOverlay"
      :show="showSearchOverlay"
      @hide="handleSearchOverlayHide"
    />
    <div
      class="d-flex text-center justify-content-between align-items-center w-100"
    >
      <nuxt-link class="navLink" to="/">
        <img :src="require('~/assets/img/home/bottom-nav/home.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('home.home') }}
        </h6>
      </nuxt-link>
      <div class="navLink" @click="handleSearchFocus">
        <img :src="require('~/assets/img/home/bottom-nav/search.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.browse') }}
        </h6>
      </div>
      <nuxt-link class="navLink" to="/shop">
        <img :src="require('~/assets/img/home/bottom-nav/shop.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.shop') }}
        </h6>
      </nuxt-link>
      <nuxt-link v-if="authenticated" class="navLink" to="/trade">
        <img :src="require('~/assets/img/home/bottom-nav/trade.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.trade') }}
        </h6>
      </nuxt-link>
      <nuxt-link v-if="authenticated" class="navLink" to="/auction">
        <img :src="require('~/assets/img/home/bottom-nav/auction.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.auction') }}
        </h6>
      </nuxt-link>
      <nuxt-link v-if="authenticated" class="navLink" to="/profile/preferences">
        <img :src="require('~/assets/img/home/bottom-nav/profile.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.profile') }}
        </h6>
      </nuxt-link>
      <nuxt-link v-if="!authenticated" class="navLink" to="/login">
        <img :src="require('~/assets/img/home/bottom-nav/profile.svg')" />
        <h6 class="mb-0 fs-12 fw-5 font-primary text-white mt-2">
          {{ $t('navbar.login') }}
        </h6>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchOverlay from '~/components/search/Overlay'
export default {
  name: 'BottomNavigation',
  components: { SearchOverlay },
  data() {
    return {
      showSearchOverlay: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
  },
  methods: {
    handleSearchFocus() {
      this.showSearchOverlay = true
    },
    handleSearchOverlayHide() {
      this.showSearchOverlay = false
    },
  },
}
</script>
<style lang="sass" scoped>
.bottom-navigation
    position: sticky
    bottom: 0
    z-index: 99
    padding-bottom: 30px
</style>
