<template>
  <b-navbar toggleable="xs" class="navbar-wrapper" :class="mobileClass ? 'border-bottom' : ''">
    <div class="w-100 d-flex justify-content-between">
      <div>
        <PortalTarget name="back-icon-slot" class="">
          <b-navbar-toggle target="top-menu-sidebar">
            <template #default>
              <img :src="require('~/assets/img/icons/menu_v2.svg')" alt="..." />
            </template>
          </b-navbar-toggle>
        </PortalTarget>
      </div>
      <div>
        <Logo :width="146" />
      </div>
      <div class="d-flex justify-content-between">
        <div>Shop</div>
        <div class="d-flex">
          <NotificationDropdown v-if="authenticated" />
          <b-nav-item class="nav-item-icons" to="/checkout/selling">
            <PortalTarget name="cart-icon-slot">
              <img
                height="22px"
                :src="require('~/assets/img/icons/basket.svg')"
                alt="..."
              />
            </PortalTarget>
          </b-nav-item>
        </div>
      </div>
    </div>
  </b-navbar>
</template>
<script>
import { mapGetters } from 'vuex'
import ScreenSize from '~/plugins/mixins/screenSize'
import Logo from '~/components/header/Logo'
import NotificationDropdown from '~/components/header/NotificationDropdown'

export default {
  name: 'Header',
  components: {
    Logo,
    NotificationDropdown
  },
  mixins: [ScreenSize],
  data() {
    return {
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
    ...mapGetters({
      authenticated: 'auth/authenticated',
      isVendor: 'auth/isVendor',
      user: 'auth/user',
    }),
    pageTitle() {
      return this.$nuxt?.context?.route?.meta[0]?.pageTitle ?? null
    },
    showMenuIcon() {
      return this.$route.name !== 'login' && this.$route.name !== 'signup'
    },
  },
  methods: {
    notificationPage() {
      if (this.authenticated) {
        this.$router.push({
          path: '/profile/notification',
        })
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
</style>
