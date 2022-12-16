<template>
  <div class="main-content-wrapper">
    <!-- Welcome Message Text -->
    <b-row class="welcome-text-wrapper">
      <b-col cols="12" sm="12" class="d-flex align-items-center px-3">
        <UserOutlineGraySVG v-if="isAuthenticated" />
        <span v-if="isAuthenticated" class="body-2-medium text-blue-20">
          {{ $t('home.hi_user', { name: user.first_name }) }}&excl;
        </span>
        <div v-else class="body-2-medium text-blue-20 text-center">
          {{ $t('home.welcome_to_deadstock') }}&excl;
        </div>
      </b-col>
    </b-row>
    <!-- End of Welcome Message Text -->

    <!-- Authentication Buttons -->
    <b-row v-if="! isAuthenticated" class="signup-btn-wrapper">
      <b-col md="12">
        <Button
          variant="dark"
          block
          @click="$router.push('/signup')"
        >
          {{ $t('home.create_account') }}
        </Button>
      </b-col>
    </b-row>

    <b-row v-if="! isAuthenticated" class="login-btn-wrapper">
      <b-col md="12">
        <Button
          variant="outline-dark"
          block
          @click="$router.push('/login')"
        >
          {{ $t('auth.login') }}
        </Button>
      </b-col>
    </b-row>
    <!-- End of Authentication Buttons -->

    <!-- Buyer Profile List Group -->
    <b-row v-if="isAuthenticated" class="list-group-wrapper buyer-profile">
      <b-col cols="12" sm="12">
        <b-list-group>
          <div class="group-item-title">{{ $t('home.buying_profile') }}</div>
          <b-list-group-item
            v-for="listItem in buyerProfileListItems"
            :key="listItem.label"
            :to="listItem.link"
            :class="{ 'active': isLinkActive(listItem.routeName) }"
          >
            <b-row>
              <b-col cols="12" sm="12" class="d-flex align-items-center">
                <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                <span>{{ listItem.label }}</span>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <!-- End of Buyer Profile List Group -->

    <!-- Seller Profile List Group -->
    <b-row v-if="isAuthenticated && isVendor" class="list-group-wrapper">
      <b-col cols="12" sm="12">
        <b-list-group>
          <div class="group-item-title">{{ $t('home.selling_profile') }}</div>
          <b-list-group-item
            v-for="listItem in sellerProfileListItems"
            :key="listItem.label"
            :to="listItem.link"
            :class="{ 'active': isLinkActive(listItem.routeName) }"
          >
            <b-row>
              <b-col cols="12" sm="12" class="d-flex align-items-center">
                <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                <span>{{ listItem.label }}</span>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <!-- End of Seller Profile List Group -->

    <!-- Create a Listing Button -->
    <b-row v-if="isAuthenticated && isVendor" class="create-listing-wrapper">
      <b-col cols="12" sm="12">
        <Button
          block
          variant="outline-dark-blue"
          to="/profile/create-listing"
        >
          <template #default>
            <b-row>
              <b-col
                cols="12"
                sm="12"
                class="d-flex align-items-center justify-content-center"
              >
                <PlusOutlineGraySVG />
                <span class="body-8-regular ml-2">{{
                    $t('home.create_a_listing')
                  }}</span>
              </b-col>
            </b-row>
          </template>
        </Button>
      </b-col>
    </b-row>
    <!-- End of Create a Listing Button -->

    <!-- Become a Vendor Button -->
    <b-row v-if="isAuthenticated && ! isVendor" class="create-listing-wrapper">
      <b-col cols="12" sm="12">
        <Button block variant="outline-dark-blue" to="/profile/vendor-hub/apply">
          <template #default>
            <b-row>
              <b-col
                cols="12"
                sm="12"
                class="d-flex align-items-center justify-content-center"
              >
                <PlusOutlineGraySVG />
                <span class="body-8-regular ml-2">{{
                    $t('home.become_a_vendor')
                  }}</span>
              </b-col>
            </b-row>
          </template>
        </Button>
      </b-col>
    </b-row>
    <!-- End of Become a Vendor Button -->

    <!-- Miscellaneous List Group -->
    <b-row v-if="isAuthenticated" class="list-group-wrapper">
      <b-col cols="12" sm="12">
        <b-list-group>
          <div class="group-item-title">{{ $t('home.misc') }}</div>
          <b-list-group-item
            v-for="listItem in miscellaneousListItems"
            :key="listItem.label"
            :to="listItem.link"
            :class="{ 'active': isLinkActive(listItem.routeName) }"
          >
            <b-row>
              <b-col cols="12" sm="12" class="d-flex align-items-center">
                <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                <span>{{ listItem.label }}</span>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <!-- End of Miscellaneous List Group -->

    <!-- Guest Profile List Group -->
    <b-row v-if="! isAuthenticated" class="list-group-wrapper">
      <b-col cols="12" sm="12">
        <b-list-group>
          <b-list-group-item
            v-for="listItem in guestProfileListItems"
            :key="listItem.label"
            :to="listItem.link"
            :class="{ 'active': isLinkActive(listItem.routeName) }"
          >
            <b-row>
              <b-col cols="12" sm="12" class="d-flex align-items-center">
                <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                <span>{{ listItem.label }}</span>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <!-- End of Guest Profile List Group -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/common/Button'
import UserOutlineGraySVG from '~/assets/img/home/sidebar/user-outline-black.svg?inline'
import PlusOutlineGraySVG from '~/assets/img/home/sidebar/plus-outline-gray.svg?inline'

export default {
  name: 'SideMenu',
  components: { Button, UserOutlineGraySVG, PlusOutlineGraySVG },
  data() {
    return {
      guestProfileListItems: [
        {
          icon: 'vendor-outline-gray',
          label: this.$t('vendor_hub.apply_title'),
          link: '/signup',
          routeName: 'signup'
        },
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.promotions'),
          link: '/promotions',
          routeName: 'promotions'
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.rewards'),
          link: '/profile/rewards',
          routeName: 'profile-rewards'
        },
        {
          icon: 'headphones-outline-gray',
          label: this.$t('home.support'),
          link: '/profile/support',
          routeName: 'profile-support'
        },
      ],
      miscellaneousListItems: [
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.promotions'),
          link: '/promotions',
          routeName: 'promotions'
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.rewards'),
          link: '/profile/rewards',
          routeName: 'profile-rewards'
        },
        {
          icon: 'clog-outline-gray',
          label: this.$t('home.preferences'),
          link: '/profile/preferences',
          routeName: 'profile-preferences'
        },
        {
          icon: 'shield-outline-gray',
          label: this.$t('home.security'),
          link: '/profile/security',
          routeName: 'profile-security'
        },
        {
          icon: 'headphones-outline-gray',
          label: this.$t('home.support'),
          link: '/profile/support',
          routeName: 'profile-support'
        },
      ],
      buyerProfileListItems: [
        {
          icon: 'gauge-outline-gray',
          label: this.$t('home.dashboard'),
          link: '/profile/buyer-dashboard',
          routeName: 'profile-buyer-dashboard'
        },
        {
          icon: 'offer-outline-gray',
          label: this.$t('home.offers_placed'),
          link: '/profile/offers-placed',
          routeName: 'profile-offers-placed'
        },
        {
          icon: 'bid-outline-gray',
          label: this.$t('home.bids_placed'),
          link: '/profile/bids/outgoing',
          routeName: 'profile-bids-outgoing'
        },
        {
          icon: 'cart-outline-gray',
          label: this.$t('home.purchases'),
          link: '/profile/purchases',
          routeName: 'profile-purchases'
        },
        {
          icon: 'heart-outline-gray',
          label: this.$t('home.wishlist'),
          link: '/profile/wish-lists',
          routeName: 'profile-wish-lists'
        },
        {
          icon: 'eye-outline-gray',
          label: this.$t('home.watchlist'),
          link: '/profile/watchlist',
          routeName: 'profile-watchlist'
        },
      ],
      sellerProfileListItems: [
        {
          icon: 'gauge-outline-gray',
          label: this.$t('home.vendor_dashboard'),
          link: '/profile/vendor-dashboard',
          routeName: 'profile-vendor-dashboard'
        },
        {
          icon: 'sell-outline-gray',
          label: this.$t('home.selling_listings'),
          link: '/profile/vendor-selling',
          routeName: 'profile-vendor-selling'
        },
        {
          icon: 'arrow-bottom-left-outline-gray',
          label: this.$t('home.offers_received'),
          link: '/profile/offers-received',
          routeName: 'profile-offers-received'
        },
        {
          icon: 'hummer-outline-gray',
          label: this.$t('home.auctions_listings'),
          link: '/profile/auctions',
          routeName: 'profile-auctions'
        },
        {
          icon: 'bid-outline-gray',
          label: this.$t('home.bids_received'),
          link: '/profile/bids/incoming',
          routeName: 'profile-bids-incoming'
        },
        {
          icon: 'box-outline-gray',
          label: this.$t('home.inventory'),
          link: '/profile/inventory',
          routeName: 'profile-inventory'
        },
        {
          icon: 'document-outline-gray',
          label: this.$t('home.orders'),
          link: '/orders',
          routeName: 'orders'
        },
        {
          icon: 'vendor-hub-outline-gray',
          label: this.$t('home.vendor_hub'),
          link: '/profile/vendor-hub',
          routeName: 'profile-vendor-hub'
        },
        {
          icon: 'trade-outline-gray',
          label: this.$t('home.trade_listings'),
          link: '/profile/trades/dashboard/alltradelistings',
          routeName: 'profile-trades-dashboard-alltradelistings'
        },
        {
          icon: 'shoes-outline-gray',
          label: this.$t('home.trade_offers'),
          link: '/profile/trades/dashboard/alloffers',
          routeName: 'profile-trades-dashboard-alloffers'
        },
        {
          icon: 'settings-outline-gray',
          label: this.$t('home.trade_preferences'),
          link: '/profile/trades/preferences',
          routeName: 'profile-trades-preferences'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
      isAuthenticated: 'auth/authenticated',
    }),
  },
  methods: {
    isLinkActive(routeName) {
      return this.$route.name === routeName
    },
    getIcon(name) {
      try {
        return require(`~/assets/img/home/sidebar/${name}.svg`)
      } catch (error) {
        return require('~/assets/img/home/sidebar/trophy-outline-gray.svg')
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.main-content-wrapper
  font-family: 'SF Pro Display', serif
  margin: 46px 15px 24px
  min-width: 235px

  .welcome-text-wrapper
    span
      margin-left: 10px

  .signup-btn-wrapper
    margin: 29px -7.5px 0

  .login-btn-wrapper
    margin: 15px -7.5px 29px

  .signup-btn-wrapper, .login-btn-wrapper
    button
      @include body-13-medium
      height: 40px
      border-radius: 4px
      padding-left: 0
      padding-right: 0

  .list-group-wrapper
    margin-bottom: 20px

    &.buyer-profile
      margin-top: 25px

    .list-group
      box-shadow: 0 1px 4px $drop-shadow1
      border-radius: 10px

      .group-item-title
        @include body-13-bold
        color: $color-blue-20
        margin: 14px 21px

      .list-group-item
        padding: 20px
        border-color: $color-gray-23b

        .action-icon
          width: 22px

        span
          @include body-5-regular
          color: $color-gray-47
          margin-left: 24px

        &:hover, &:active, &:focus
          background: $color-gray-23b

          span
            @include body-5-medium
            color: $black

          img
            filter: brightness(0)

        &.active
          background: $white

          span
            @include body-5-medium
            color: $black

          img
            filter: brightness(0)

  .create-listing-wrapper
    margin-bottom: 20px
    border-radius: 0.5rem
</style>
