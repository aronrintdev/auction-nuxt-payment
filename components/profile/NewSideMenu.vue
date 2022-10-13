<template>
  <div
      v-if="!isScreenXS && !isScreenMD"
      class="new-side-bar d-flex flex-column"
      :class="collapsed ? 'new-side-bar-collapsed' : 'new-side-bar-full'"
  >
    <div
      class="sidebar-header d-flex align-items-center justify-content-between mb-2"
    >
      <span v-if="!collapsed" class="sidebar-title">{{
        $t('profile_menu.profile')
      }}</span>
      <Button
        variant="link"
        class="shadow-none"
        icon-only
        @click="collapsed = !collapsed"
      >
        <img :src="hamburgerMenu" :alt="$t('common.menu')" />
      </Button>
    </div>

    <div class="sidebar-menus flex-column flex-grow-1 flex-column">
      <div class="sidebar-sub-header mb-4 mt-2">
        <span class="sidebar-sub-title">{{
          $t('profile_menu.categories.' + MENU_CATEGORY_BUYING)
        }}</span>
      </div>

      <div class="d-flex flex-column">
        <SideMenuItem
          v-for="(menuItem, i) in filteredMenus(MENU_CATEGORY_BUYING)"
          :key="i"
          :menu-item="menuItem"
          :current-route-name="currentRouteName"
          :collapsed="collapsed"
        />
      </div>

      <div v-if="isVendor" class="sidebar-sub-header mb-4 mt-2">
        <span class="sidebar-sub-title">{{
          $t('profile_menu.categories.' + MENU_CATEGORY_SELLING)
        }}</span>
      </div>

      <div v-if="isVendor" class="d-flex flex-column">
        <SideMenuItem
          v-for="(menuItem, i) in filteredMenus(MENU_CATEGORY_SELLING)"
          :key="i"
          :menu-item="menuItem"
          :current-route-name="currentRouteName"
          :collapsed="collapsed"
        />
      </div>

      <div v-if="isVendor">
        <Button
          v-b-tooltip.hover
          :title="collapsed ? $t('profile_menu.create_listing') : ''"
          to="/profile/create-listing"
          :variant="
            currentRouteName.includes('create-listing')
              ? 'dark'
              : 'outline-dark'
          "
          class="px-1 w-100 create-listing-button"
          :icon-only="collapsed"
        >
          <img
            :src="require('~/assets/img/icons/profile/create-listing.svg')"
            alt="create-a-listing"
            :class="{ 'mr-2': !collapsed }"
          />
          <span v-if="!collapsed" class="create-listing-button-text">{{
            $t('profile_menu.create_listing')
          }}</span>
        </Button>
      </div>

      <div class="sidebar-sub-header mb-4 mt-2">
        <span class="sidebar-sub-title">{{
          $t('profile_menu.categories.' + MENU_CATEGORY_MISC)
        }}</span>
      </div>

      <SideMenuItem
        v-for="(menuItem, i) in filteredMenus(MENU_CATEGORY_MISC)"
        :key="i"
        :menu-item="menuItem"
        :current-route-name="currentRouteName"
        :collapsed="collapsed"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/common/Button'
import hamburgerMenu from '~/assets/img/icons/side-menu/hamburger-menu.svg'
import {
  MENU_CATEGORY_BUYING,
  MENU_CATEGORY_MISC,
  MENU_CATEGORY_SELLING,
} from '~/static/constants'
import SideMenuItem from '~/components/side-menu/SideMenuItem'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'NewSideMenu',
  components: {SideMenuItem, Button},
  mixins: [screenSize],
  data() {
    return {
      collapsed: false,
      hamburgerMenu,
      MENU_CATEGORY_BUYING,
      MENU_CATEGORY_SELLING,
      MENU_CATEGORY_MISC,
      SIDEBAR_CONTENT: [
        {
          label: this.$t('profile_menu.dashboard'),
          icon: require('~/assets/img/icons/profile/dashboard.svg'),
          iconActive: require('~/assets/img/icons/profile/dashboard-active.svg'),
          route: 'profile-buyer-dashboard',
          href: '/profile/buyer-dashboard',
          menu: MENU_CATEGORY_BUYING,
        },
        {
          label: this.$t('profile_menu.offers_placed'),
          icon: require('~/assets/img/icons/side-menu/offers.svg'),
          iconActive: require('~/assets/img/icons/side-menu/offers-active.svg'),
          href: '/profile/offers-placed',
          route: 'profile-offers-placed',
          menu: MENU_CATEGORY_BUYING,
        },
        {
          label: this.$t('profile_menu.bids_placed'),
          icon: require('~/assets/img/icons/profile/bids.svg'),
          iconActive: require('~/assets/img/icons/profile/bids-active.svg'),
          href: '/profile/bids/outgoing',
          route: 'profile-bids-outgoing',
          menu: MENU_CATEGORY_BUYING,
        },

        {
          label: this.$t('profile_menu.purchases'),
          icon: require('~/assets/img/icons/profile/purchases.svg'),
          iconActive: require('~/assets/img/icons/profile/purchases-active.svg'),
          href: '/profile/purchases',
          route: 'profile-purchases' || 'profile-purchases-summary-id',
          menu: MENU_CATEGORY_BUYING,
        },

        {
          label: this.$t('profile_menu.wishlist'),
          icon: require('~/assets/img/icons/profile/wishlist.svg'),
          iconActive: require('~/assets/img/icons/profile/wishlist-active.svg'),
          href: '/profile/wish-lists',
          route: 'profile-wish-lists',
          menu: MENU_CATEGORY_BUYING,
        },

        {
          label: this.$t('profile_menu.watchlist'),
          icon: require('~/assets/img/icons/side-menu/watchlist.svg'),
          iconActive: require('~/assets/img/icons/side-menu/watchlist-active.svg'),
          href: '/profile/watchlist',
          route: 'profile-watchlist',
          menu: MENU_CATEGORY_BUYING,
        },
        //  =========================== Start Of Selling Category =====================================
        {
          label: this.$t('profile_menu.vendor_dashboard'),
          icon: require('~/assets/img/icons/profile/dashboard.svg'),
          iconActive: require('~/assets/img/icons/profile/dashboard-active.svg'),
          route: 'profile-vendor-dashboard',
          href: '/profile/vendor-dashboard',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.orders'),
          icon: require('~/assets/img/icons/profile/orders.svg'),
          iconActive: require('~/assets/img/icons/profile/orders-active.svg'),
          route: 'orders',
          href: '/orders',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.selling'),
          icon: require('~/assets/img/icons/profile/selling.svg'),
          iconActive: require('~/assets/img/icons/profile/selling-active.svg'),
          href: '/profile/vendor-selling',
          route:
            this.currentRouteName === 'profile-vendor-selling-id'
              ? 'profile-vendor-selling-id'
              : 'profile-vendor-selling',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.offers_received'),
          icon: require('~/assets/img/icons/side-menu/offers.svg'),
          iconActive: require('~/assets/img/icons/side-menu/offers-active.svg'),
          href: '/profile/offers-received',
          route: 'profile-offers-received',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.auctions'),
          icon: require('~/assets/img/icons/profile/auctions.svg'),
          iconActive: require('~/assets/img/icons/profile/auctions-active.svg'),
          route: 'profile-auctions',
          href: '/profile/auctions',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.bids_received'),
          icon: require('~/assets/img/icons/profile/bids.svg'),
          iconActive: require('~/assets/img/icons/profile/bids-active.svg'),
          href: '/profile/bids/incoming',
          route: 'profile-bids-incoming',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$tc('common.inventory', 1),
          icon: require('~/assets/img/icons/profile/inventory.svg'),
          iconActive: require('~/assets/img/icons/profile/inventory-active.svg'),
          href: '/profile/inventory',
          route: 'profile-inventory',
          menu: MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.vendor_hub'),
          icon: require('~/assets/img/icons/side-menu/vendor-hub.svg'),
          iconActive: require('~/assets/img/icons/side-menu/vendor-hub-active.svg'),
          href: '/profile/vendor-hub',
          route: 'vendor-hub',
          menu: !this.isVendor ? MENU_CATEGORY_BUYING : MENU_CATEGORY_SELLING,
        },
        {
          label: this.$t('profile_menu.trades'),
          icon: require('~/assets/img/icons/profile/trades.svg'),
          iconActive: require('~/assets/img/icons/trade-active.svg'),
          href: '/profile/trades/dashboard',
          route: 'profile-trades-dashboard',
          menu: MENU_CATEGORY_SELLING
        },
        // ========================== Start of Misc Category ===============================================

        // {
        //   label: this.$t('profile_menu.heat_check'),
        //   icon: require('~/assets/img/icons/profile/heat-check.svg'),
        //   iconActive: require('~/assets/img/icons/profile/heat-check-selected.svg'),
        //   href: '/heat-check',
        //   route: 'heat-check',
        //   menu: MENU_CATEGORY_MISC
        // },
        {
          label: this.$t('profile_menu.promotions'),
          icon: require('~/assets/img/icons/side-menu/promotions.svg'),
          iconActive: require('~/assets/img/icons/side-menu/promotions-active.svg'),
          href: '/promotions',
          route: 'promotions',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.stock_exchange'),
          icon: require('~/assets/img/icons/side-menu/promotions.svg'),
          iconActive: require('~/assets/img/icons/side-menu/promotions-active.svg'),
          href: '/stockExchange',
          route: 'stockExchange',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.rewards'),
          iconActive: require('~/assets/img/rewards/rewards_active.svg'),
          icon: require('~/assets/img/rewards/rewards.svg'),
          href: '/profile/rewards',
          route: 'profile-rewards',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.preferences'),
          icon: require('~/assets/img/icons/side-menu/preferences.svg'),
          iconActive: require('~/assets/img/icons/side-menu/preferences-active.svg'),
          href: '/profile/preferences',
          route: 'profile-preferences',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.notifications'),
          icon: require('~/assets/img/icons/profile/notifications.svg'),
          iconActive: require('~/assets/img/icons/profile/notifications-active.svg'),
          href: '/profile/notifications',
          route: 'profile-notifications',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.security'),
          icon: require('~/assets/img/icons/profile/security.svg'),
          iconActive: require('~/assets/img/icons/profile/security-active.svg'),
          href: '/profile/security',
          route: 'profile-security',
          menu: MENU_CATEGORY_MISC,
        },
        {
          label: this.$t('profile_menu.support'),
          icon: require('~/assets/img/icons/side-menu/support.svg'),
          iconActive: require('~/assets/img/icons/side-menu/support-active.svg'),
          href: '/profile/support',
          route: 'profile-support',
          menu: MENU_CATEGORY_MISC,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
    }),
    currentRouteName() {
      return this.$route.name
    },
  },
  methods: {
    filteredMenus(menuCategoryName) {
      return this.SIDEBAR_CONTENT.filter(
        (menu) => menu.menu === menuCategoryName
      )
    },
  },
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.new-side-bar
  -webkit-transition: width 0.3s ease-in-out
  -moz-transition: width 0.3s ease-in-out
  -o-transition: width 0.3s ease-in-out
  transition: width 0.3s ease-in-out

.new-side-bar-full
  width: 265px
  padding: 29px 15px 29px 52px

.new-side-bar-collapsed
  width: 70px
  padding: 15px

.sidebar-title
  @include body-2
  color: $color-gray-47
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold

.sidebar-sub-title
  @include body-4
  color: $color-gray-47
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold

.create-listing-button.btn
  color: $color-gray-47
</style>
