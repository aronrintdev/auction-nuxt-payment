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
          <UserOutlineGraySVG v-if="! isAuthenticated" />
          <span v-if="! isAuthenticated" class="body-2-medium text-blue-20"
            >{{ $t('home.welcome') }}&excl;</span
          >
          <span v-else class="body-2-medium text-blue-20"
            >{{ $t('home.menu') }}</span
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
          <Button
            variant="dark"
            block
            pill
            @click="$router.push('/login')"
            >{{ $t('auth.login') }}</Button
          >
        </b-col>
      </b-row>
      <!-- End of Authentication Buttons -->

      <!-- Seller Profile List Group -->
      <b-row v-if="isAuthenticated && isVendor" class="list-group-wrapper authenticated-profile">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item
              v-for="listItem in sellerProfileListItems"
              :key="listItem.label"
              @click="listItem.onClick"
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

      <!-- Profile List Group -->
      <b-row v-if="isAuthenticated && ! isVendor" class="list-group-wrapper authenticated-profile">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item
              v-for="listItem in profileListItems"
              :key="listItem.label"
              @click="listItem.onClick"
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
              @click="listItem.onClick"
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

export default {
  name: 'LeftSideBarMenu',
  components: {
    Button,
    UserOutlineGraySVG,
    CloseOutlineBlueSVG,
    ArrowRightBlackSVG,
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
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/signup')
          }
        },
        {
          icon: 'tag-outline-gray',
          label: this.$t('home.promotions'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/promotions')
          }
        },
        {
          icon: 'trophy-outline-gray',
          label: this.$t('home.rewards'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/profile/rewards')
          }
        },
        {
          icon: 'headphones-outline-gray',
          label: this.$t('home.support'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/profile/support')
          }
        },
      ],
      profileListItems: [
        {
          icon: 'shop-outline-gray',
          label: this.$t('home.shop'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/shop')
          }
        },
        {
          icon: 'trade-outline-gray',
          label: this.$t('home.trade'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/trades')
          }
        },
        {
          icon: 'hummer-outline-gray',
          label: this.$t('home.auction'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/auction')
          }
        },
        {
          icon: 'shirt-outline-gray',
          label: this.$t('home.shop_by_style_2'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/shop-by-style')
          }
        },
        {
          icon: 'vendor-outline-gray',
          label: this.$t('vendor_hub.apply_title'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/profile/vendor-hub/apply')
          }
        },
        {
          icon: 'exchange-outline-gray',
          label: this.$t('home.dead_stock_exchange'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/stock/exchange')
          }
        },
        {
          icon: 'user-outline-gray',
          label: this.$t('home.profile'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$root.$emit('open-right-sidebar')
          }
        },
      ],
      sellerProfileListItems: [
        {
          icon: 'shop-outline-gray',
          label: this.$t('home.shop'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/shop')
          }
        },
        {
          icon: 'trade-outline-gray',
          label: this.$t('home.trade'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/trades')
          }
        },
        {
          icon: 'hummer-outline-gray',
          label: this.$t('home.auction'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/auction')
          }
        },
        {
          icon: 'shirt-outline-gray',
          label: this.$t('home.shop_by_style_2'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/shop-by-style')
          }
        },
        {
          icon: 'sell-outline-gray',
          label: this.$t('home.sell'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/sell')
          }
        },
        {
          icon: 'exchange-outline-gray',
          label: this.$t('home.dead_stock_exchange'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$router.push('/stock/exchange')
          }
        },
        {
          icon: 'user-outline-gray',
          label: this.$t('home.profile'),
          onClick: () => {
            this.$refs.topSidebar.hide()
            this.$root.$emit('open-right-sidebar')
          }
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

    &.authenticated-profile
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
</style>
