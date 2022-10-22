<template>
  <aside class="sidebar-dark-primary profile-sidemenu">
    <div class="sidebar-title mb-4">{{ $t('profile_menu.profile') }}</div>

    <nav class="mt-2">
      <ul
        class="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li
          v-for="(item, index) in SIDEBAR_CONTENT"
          :key="index"
          class="nav-item"
        >
          <NuxtLink
            v-if="!item.isSpacing"
            :to="item.href"
            class="nav-link pl-0"
          >
            <i class="nav-icon mr-4">
              <img
                :src="
                  currentRouteName.indexOf(item.route) > -1
                    ? item.iconActive
                    : item.icon
                "
                :alt="item.label"
                class="sidebar-icon"
              />
            </i>
            <p
              :class="
                currentRouteName.indexOf(item.route) > -1
                  ? 'sidebar-label active'
                  : 'sidebar-label'
              "
            >
              {{ item.label }}
            </p>
          </NuxtLink>
          <div v-else class="my-4"></div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link pl-0" @click="logout">
            <i class="nav-icon mr-4">
              <img
                :src="require('~/assets/img/icons/logout.svg')"
                alt="..."
                class="sidebar-icon"
              />
            </i>
            <p class="sidebar-label">
              {{ $t('home.logout') }}
            </p>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProfileSideMenu',

  data() {
    return {
      users: this.$store.state.auth.user,
      loggingOut: false,
      SIDEBAR_CONTENT: [
        {
          label: this.$t('profile_menu.dashboard'),
          icon: require('~/assets/img/icons/profile/dashboard.svg'),
          href: '#',
        },
        {
          label: this.$t('profile_menu.orders'),
          icon: require('~/assets/img/icons/profile/orders.svg'),
          href: '#',
        },
        {
          label: this.$tc('common.inventory', 1),
          icon: require('~/assets/img/icons/profile/inventory.svg'),
          iconActive: require('~/assets/img/icons/profile/inventory-active.svg'),
          href: '/profile/inventory',
          route: 'profile-inventory',
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
        },
        {
          label: this.$t('profile_menu.purchases'),
          icon: require('~/assets/img/icons/profile/purchases.svg'),
          iconActive: require('~/assets/img/icons/profile/purchases-active.svg'),
          href: '/profile/purchases',
          route:
            this.currentRouteName === 'profile-purchases'
              ? 'profile-purchases'
              : 'profile-purchases-summary-id',
        },
        {
          label: this.$t('profile_menu.trades'),
          icon: require('~/assets/img/icons/profile/trades.svg'),
          href: '#',
        },
        {
          label: this.$t('profile_menu.auctions'),
          icon: require('~/assets/img/icons/profile/auctions.svg'),
          iconActive: require('~/assets/img/icons/profile/auctions-active.svg'),
          route: 'profile-auctions',
          href: '/profile/auctions',
        },
        {
          label: this.$t('profile_menu.bids'),
          icon: require('~/assets/img/icons/profile/bids.svg'),
          iconActive: require('~/assets/img/icons/profile/bids-active.svg'),
          href: '/profile/bids',
          route: 'profile-bids',
        },
        {
          label: this.$t('profile_menu.create_listing'),
          icon: require('~/assets/img/icons/profile/create-listing.svg'),
          iconActive: require('~/assets/img/icons/profile/create-listing-active.svg'),
          href: '/profile/create-listing',
          route: 'profile-create-listing'
        },
        {
          label: this.$t('profile_menu.heat_check'),
          icon: require('~/assets/img/icons/profile/heat-check.svg'),
          iconActive: require('~/assets/img/icons/profile/heat-check-selected.svg'),
          href: '/heat-check',
          route: 'heat-check',
        },
        {
          label: this.$t('profile_menu.ambassador_hub'),
          icon: require('~/assets/img/icons/profile/ambassador-hub.svg'),
          href: '#',
        },
        {
          label: this.$t('profile_menu.wishlist'),
          icon: require('~/assets/img/icons/profile/wishlist.svg'),
          iconActive: require('~/assets/img/icons/profile/wishlist-active.svg'),
          href: '/profile/wish-lists',
          route: 'profile-wish-lists',
        },
        {
          label: this.$t('profile_menu.promotions'),
          icon: require('~/assets/img/icons/profile/promotions.svg'),
          href: '#',
        },
        {
          isSpacing: true,
        },
        {
          label: this.$t('profile_menu.rewards'),
          iconActive: require('~/assets/img/rewards/rewards_active.svg'),
          icon: require('~/assets/img/rewards/rewards.svg'),
          href: '/profile/rewards',
          route: 'profile-rewards',
        },
        {
          label: this.$t('profile_menu.preferences'),
          icon: require('~/assets/img/icons/profile/preferences.svg'),
          iconActive: require('~/assets/img/icons/profile/preferences-active.svg'),
          href: '/profile/preferences',
          route: 'profile-preferences',
        },
        {
          label: this.$t('profile_menu.notifications'),
          icon: require('~/assets/img/icons/profile/notifications.svg'),
          href: '#',
        },
        {
          label: this.$t('profile_menu.stock_exchange'),
          icon: require('~/assets/img/icons/side-menu/promotions.svg'),
          iconActive: require('~/assets/img/icons/side-menu/promotions-active.svg'),
          href: '/stock/exchange/trending',
          route: 'stock-exchange',
        },
        {
          label: this.$t('profile_menu.security'),
          icon: require('~/assets/img/icons/profile/security.svg'),
          iconActive: require('~/assets/img/icons/profile/security-active.svg'),
          href: '/profile/security',
          route: 'profile-security'
        },
        {
          label: this.$t('profile_menu.support'),
          icon: require('~/assets/img/icons/profile/support.svg'),
          href: '#',
        },
      ],
    }
  },

  computed: {
    currentRouteName() {
      return this.$route.name
    },
  },
  methods: {
    ...mapActions({
      removeUserDetails: 'auth/removeUserDetails',
      removeCryptoDetails: 'order-details/removeCryptoDetails',
      removePromoCode: 'order-details/removePromoCode',
      removeGiftCard: 'order-details/removeGiftCard',
      removeTradeDetails: 'trades/removeTradeDetails',
      removeGiftCardValuesAndDetails: 'preferences/clearGiftCardValues'
    }),
    // Logout
    async logout() {
      this.loggingOut = true
      // Logout a user
      await this.$auth.logout().then(() => {
        this.$auth.strategy.token.reset()
        this.removeUserDetails()
        this.removeCryptoDetails()
        this.removePromoCode()
        this.removeGiftCard()
        this.removeTradeDetails()
        this.removeGiftCardValuesAndDetails() // Values of giftcard store in preference section.
      })

      if (!this.$store.state.auth.loggedIn) {
        this.$toasted.success(this.$t('home.logout_successful').toString())
        await this.$router.push('/login')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '/assets/css/variables';

.profile-sidemenu {
  min-width: 265px;
  padding: 29px 15px 29px 52px;

  .sidebar-title {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #999;
  }

  .sidebar-icon {
    width: 25px;
    height: 25px;
  }

  .sidebar-label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #999;

    &.active,
    &:hover {
      font-weight: bold;
      color: $color-black-1;
    }
  }
}
</style>
