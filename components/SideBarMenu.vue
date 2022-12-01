<template>
  <!-- Side Bar Menu -->
  <b-sidebar
    id="top-menu-sidebar"
    ref="topSidebar"
    width="100%"
    z-index="99999"
    shadow
    no-header
    @shown="isVisible = true"
    @hidden="isVisible = false"
  >
    <div class="main-content-wrapper">
      <!-- Welcome Message Text -->
      <b-row class="welcome-text-wrapper">
        <b-col cols="12" sm="12" class="d-flex align-items-center px-3">
          <UserOutlineGraySVG />
          <span v-if="isAuthenticated" class="body-2-medium text-blue-20"
            >{{ $t('home.hi_user', { name: user.first_name }) }}&excl;</span
          >
          <span v-else class="body-2-medium text-blue-20"
            >{{ $t('home.welcome') }}&excl;</span
          >
          <CloseOutlineBlueSVG
            class="ml-auto"
            @click="$refs.topSidebar.hide()"
          />
        </b-col>
      </b-row>
      <!-- End of Welcome Message Text -->

      <!-- Info Message Text -->
      <b-row v-if="! isAuthenticated" class="info-text-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-8-medium">{{ $t('home.deadstock_app_buy_sell_trade') }}</div>
        </b-col>
      </b-row>
      <!-- End of Info Message Text -->

      <!-- Guest Image -->
      <b-row v-if="! isAuthenticated" class="guest-img-wrapper">
        <b-col cols="12" sm="12">
          <b-img fluid-grow :src="require('~/assets/img/home/sidebar/sidebar-menu-banner.png')" />
        </b-col>
      </b-row>
      <!-- End of Guest Image -->

      <!-- Authentication Buttons -->
      <b-row v-if="!isAuthenticated" class="btn-wrapper">
        <b-col cols="6" sm="6">
          <Button
            variant="outline-dark-blue"
            block
            pill
            @click="$router.push('/signup')"
            >{{ $t('home.create_account') }}</Button
          >
        </b-col>
        <b-col cols="6" sm="6">
          <Button variant="dark-blue" block pill @click="$router.push('/login')">{{ $t('home.login') }}</Button>
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
            >
              <b-row>
                <b-col cols="12" sm="12" class="d-flex align-items-center">
                  <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                  <span class="body-13-medium">{{ listItem.label }}</span>
                  <ArrowRightBlackSVG class="ml-auto" />
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
            >
              <b-row>
                <b-col cols="12" sm="12" class="d-flex align-items-center">
                  <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                  <span class="body-13-medium">{{ listItem.label }}</span>
                  <ArrowRightBlackSVG class="ml-auto" />
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
            :to="'/profile/create-listing'"
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
      <b-row v-if="isAuthenticated && !isVendor" class="create-listing-wrapper">
        <b-col cols="12" sm="12">
          <Button block variant="outline-dark-blue">
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

      <!-- Profile List Group -->
      <b-row v-if="isAuthenticated" class="list-group-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <div class="group-item-title">{{ $t('home.my_profile') }}</div>
            <b-list-group-item
              v-for="listItem in profileListItems"
              :key="listItem.label"
              :to="listItem.link"
            >
              <b-row>
                <b-col cols="12" sm="12" class="d-flex align-items-center">
                  <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                  <span class="body-13-medium">{{ listItem.label }}</span>
                  <ArrowRightBlackSVG class="ml-auto" />
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <!-- End of Profile List Group -->

      <!-- Guest Profile List Group -->
      <b-row v-if="!isAuthenticated" class="list-group-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item
              v-for="listItem in guestProfileListItems"
              :key="listItem.label"
              :to="listItem.link"
            >
              <b-row>
                <b-col cols="12" sm="12" class="d-flex align-items-center">
                  <b-img :src="getIcon(listItem.icon)" class="action-icon" />
                  <span class="body-13-medium">{{ listItem.label }}</span>
                  <ArrowRightBlackSVG class="ml-auto" />
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <!-- End of Guest Profile List Group -->
    </div>
  </b-sidebar>
  <!-- End of Side Bar Menu -->
</template>

<script>
import Button from '~/components/common/Button'
import UserOutlineGraySVG from '~/assets/img/home/sidebar/user-outline-black.svg?inline'
import CloseOutlineBlueSVG from '~/assets/img/home/sidebar/close-outline-blue.svg?inline'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'
import PlusOutlineGraySVG from '~/assets/img/home/sidebar/plus-outline-gray.svg?inline'

export default {
  name: 'SideBarMenu',
  components: {
    Button,
    UserOutlineGraySVG,
    CloseOutlineBlueSVG,
    ArrowRightBlackSVG,
    PlusOutlineGraySVG,
  },
  props: {
    user: {
      type: [Object, Boolean],
      required: true,
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVendor: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
      guestProfileListItems: [
        {
          icon: 'vendor-outline-gray',
          label: this.$t('vendor_hub.apply_title'),
          link: '/signup'
        },
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.promotions'),
          link: '/promotions',
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.rewards'),
          link: '/profile/rewards',
        },
        {
          icon: 'headphones-outline-gray',
          label: this.$t('home.support'),
          link: '/profile/support',
        },
      ],
      profileListItems: [
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.promotions'),
          link: '/promotions',
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.rewards'),
          link: '/profile/rewards',
        },
        {
          icon: 'clog-outline-gray',
          label: this.$t('home.preferences'),
          link: '/profile/preferences',
        },
        {
          icon: 'shield-outline-gray',
          label: this.$t('home.security'),
          link: '/profile/security',
        },
        {
          icon: 'headphones-outline-gray',
          label: this.$t('home.support'),
          link: '/profile/support',
        },
      ],
      buyerProfileListItems: [
        {
          icon: 'gauge-outline-gray',
          label: this.$t('home.dashboard'),
          link: '/profile/buyer-dashboard',
        },
        {
          icon: 'offer-outline-gray',
          label: this.$t('home.offers_placed'),
          link: '/profile/offers-placed',
        },
        {
          icon: 'bid-outline-gray',
          label: this.$t('home.bids_placed'),
          link: '/profile/bids/outgoing',
        },
        {
          icon: 'cart-outline-gray',
          label: this.$t('home.purchases'),
          link: '/profile/purchases',
        },
        {
          icon: 'heart-outline-gray',
          label: this.$t('home.wishlist'),
          link: '/profile/wish-lists',
        },
        {
          icon: 'eye-outline-gray',
          label: this.$t('home.watchlist'),
          link: '/profile/watchlist',
        },
      ],
      sellerProfileListItems: [
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.vendor_dashboard'),
          link: '/profile/vendor-dashboard',
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.selling_listings'),
          link: '/profile/vendor-selling',
        },
        {
          icon: 'arrow-bottom-left-outline-gray',
          label: this.$t('home.offers_received'),
          link: '/profile/offers-received',
        },
        {
          icon: 'hummer-outline-gray',
          label: this.$t('home.auctions_listings'),
          link: '/profile/auctions',
        },
        {
          icon: 'bid-outline-gray',
          label: this.$t('home.bids_received'),
          link: '/profile/bids/incoming',
        },
        {
          icon: 'box-outline-gray',
          label: this.$t('home.inventory'),
          link: '/profile/inventory',
        },
        {
          icon: 'document-outline-gray',
          label: this.$t('home.orders'),
          link: '/orders',
        },
        {
          icon: 'vendor-hub-outline-gray',
          label: this.$t('home.vendor_hub'),
          link: '/profile/vendor-hub',
        },
        {
          icon: 'trade-outline-gray',
          label: this.$t('home.trade_listings'),
          link: '/profile/trades/dashboard/alltradelistings',
        },
        {
          icon: 'shoes-outline-gray',
          label: this.$t('home.trade_offers'),
          link: '/profile/trades/dashboard/alloffers',
        },
      ],
    }
  },
  methods: {
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

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.main-content-wrapper
  font-family: 'SF Pro Display', serif
  margin: 42px 9px 0

  .welcome-text-wrapper
    span
      margin-left: 10px

  .info-text-wrapper
    font-family: 'SF Pro Text', serif
    margin-top: 10px

  .guest-img-wrapper
    img
      margin-top: 11px

  .btn-wrapper
    margin: 42px 0

    button
      @include body-13-medium
      height: 40px
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
        @include body-12-bold
        color: $color-blue-20
        margin: 14px 21px 0

      .list-group-item
        padding: 20px
        border-color: $color-gray-23b

        &:nth-child(2)
          border-top: none

        .action-icon
          width: 22px

        span
          margin-left: 36px

        &:hover, &:active, &:focus
          background: $color-gray-23b

  .create-listing-wrapper
    margin-bottom: 20px
    border-radius: 0.5rem
</style>
