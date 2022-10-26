<template>
  <div v-if="activeAuction" class="container-fluid auction-details p-4">
    <div class="d-flex align-items-center justify-content-between mb-4 auction-header">
      <div>
        <b-breadcrumb :items="breadcrumbItems"></b-breadcrumb>
        <div class="auction-id">{{ $t('auctions.frontpage.auction_number') }} - #{{ activeAuction.id }}</div>
      </div>
      <div class="d-flex align-items-center">
        <div class="round-btn" role="button">
          <Icon
            :id="`popover-watchlist-item-${activeAuction.id}`"
            src="eye.svg"
            hover-src="red-eye.svg"
            :active="!!watchlist"
            width="20"
            height="20"
            tabindex="0"
            disableHover
            class="action-icon"
            :alt-text="watchlist ? watchlist.name : ''"
            :tooltip-text="watchlist ? watchlist.name : ''"
            @click="removeFromWatchList"
          />
        </div>
        <div :id="`popover-share-${activeAuction.id}`" class="round-btn" role="button" ><share-icon></share-icon></div>
      </div>
    </div>
    <div v-if="activeAuction.auction_items && activeAuction.auction_items.length > 0" class="auction-content">
      <div class="auction-content-main">
        <!-- Auction items carousel with arrows -->
        <div v-if="activeAuction.type === 'collection'" class="collection-items-slider">
          <LeftArrow role="button" :class="{ disabled: currentItemIdx === 0 }" @click="moveBack" />
          <span>{{`${currentItemIdx + 1} ${$t('auctions.frontpage.of')} ${activeAuction.auction_items.length} ${$t('common.items')}`}}</span>
          <RightArrow role="button" :class="{ disabled: currentItemIdx === activeAuction.auction_items.length - 1 }" @click="moveForward" />
        </div>
        <!-- Media Viewer & thumbnails list -->
        <media-carousel-with-thumbs :images="images.slice(currentItemIdx, currentItemIdx + 1)"></media-carousel-with-thumbs>
        <div class="mt-5 body-5-bold">
          {{ $t('auctions.frontpage.have_piece_to_sell') }} <nuxt-link to="#">{{ $t('auctions.frontpage.create_listing') }}</nuxt-link>
        </div>
        <div class="mt-5">
          <b-tabs pills class="product-details-tabs">
            <b-tab title="Product Details" active>
                <div>{{ $t('common.sku') }}: {{ activeAuction.auction_items[currentItemIdx].inventory.product.sku }}</div>
                <div>{{ $t('common.colorway') }}: {{ activeAuction.auction_items[currentItemIdx].inventory.color }}</div>
                <div>{{ $t('common.box_condition') }}: {{ activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.name }}</div>
                <div>{{ $t('product_page.release_date') }}: {{ activeAuction.auction_items[currentItemIdx].created_at | formatDate }}</div>
            </b-tab>
            <b-tab title="Size Guide">
              <div class="size-guide-content">
                <div>
                  <strong>{{ $t('auctions.frontpage.size_guide_text') }}</strong>
                  <div class="size-table">
                    <div class="size-sticky-col">
                      <div v-for="(size, idx) in sizes" :key="idx" class="size-table-cell">{{ size.type }}</div>
                    </div>
                    <div class="size-table-content">
                      <div v-for="(size, idx) in sizes" :key="idx" class="size-table-row">
                        <div v-for="(item, index) in size.items" :key="`cell-${idx}-${index}`" class="size-table-cell">{{ item }}</div>
                      </div>
                    </div>
                  </div>
                  <OverallFit />
                </div>
                <div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
        <div class="mt-5 auction-details">
          <div class="auction-details-title">{{ $t('auctions.frontpage.details') }}</div>
          <div class="mt-3 mb-4 mr-5 auction-details-border"></div>
          <div class="auction-details-content">
            <div>{{ $t('auctions.frontpage.estimated_value') }}: ${{ activeAuction.estimated_low_price | formatPrice }} - {{ activeAuction.high_price | formatPrice }}</div>
            <div>{{ $t('auctions.frontpage.duration') }}: {{ activeAuction.time_limit }} {{ $tc('common.day', activeAuction.time_limit) }}</div>
            <div>{{ $t('auctions.frontpage.auction_type') }}: {{ activeAuction.type === 'single' ? 'Single Item' : 'Collection' }}</div>
            <div class="mt-3 rating">{{ $t('auctions.frontpage.auctioneer_rating') }}: 97%</div> <!-- Todo -->
          </div>
        </div>
      </div>
      <div class="auction-content-side">
        <div class="mb-4 text-center stats-box">
          <div>
            <span class="stat-name">{{ $t('home_page.timeremaining') }}</span>
            <div class="text-danger stat-value">{{ activeAuction | remainingTime('medium') }}</div>
          </div>
          <div>
            <span class="stat-name">{{ $t('auctions.frontpage.starting_bid') }}</span>
            <div class="stat-value">${{ activeAuction.start_bid_price | formatPrice }}</div>
          </div>
          <div>
            <span class="stat-name">{{ $t('auctions.frontpage.number_of_bids') }}</span>
            <div class="stat-value">{{ activeAuction.bids.length }}</div>
          </div>
          <div>
            <span class="stat-name">{{ $t('auctions.frontpage.watchers') }}</span>
            <div class="stat-value">{{ activeAuction.number_of_bidders }}</div>
          </div>
        </div>
        <div class="mb-4 d-flex justify-content-between product-info-box">
          <div>
            <div class="product-info-box-title">{{ activeAuction.auction_items[currentItemIdx].inventory.product.name }}</div>
            <div class="product-info-box-value">{{ activeAuction.auction_items[currentItemIdx].inventory.color.name }}</div>
          </div>
          <div class="product-info-box-value">
            {{ $t('common.size') }} {{ activeAuction.auction_items[currentItemIdx].inventory.size.size }}
          </div>
        </div>
        <div class="mb-4 text-center bid-details">
          <strong v-if="activeAuction.highest_bid" class="bid-details-price">{{ $t('auctions.frontpage.current_bid') }}: ${{ activeAuction.highest_bid | formatPrice }}</strong>
          <strong v-else class="bid-details-price">{{ $t('auctions.frontpage.current_bid') }}: &nbsp;&nbsp;-&nbsp;&nbsp;</strong>
          <div class="mt-4 place-bid-form">
            <div class="place-bid-form-title">{{ $t('auctions.frontpage.place_bid') }}</div>
            <input v-model="placeBidPrice" :placeholder="$t('auctions.frontpage.insert_amount')" />
            <ArrowFillIcon role="button" :disabled="!placeBidPrice" @click="placeBid" />
          </div>
          <div v-if="showLowBidError" class="text-left text-danger mt-1">
            {{ $t('auctions.frontpage.place_bid_error') }}
          </div>
          <div class="mt-4 quick-bid">
            <div class="mb-3 quick-bid-title">{{ $t('auctions.frontpage.quick_bid') }}</div>
            <div class="d-flex align-items-center justify-content-between">
              <div
                v-for="price in quickBidPrices"
                :key="price"
                class="quick-bid-btn"
                @click="placeQuickBid(price)"
              >
                ${{ price / 100 }}
              </div>
            </div>
          </div>
          <div class="mt-4 auto-bid">
            <div class="position-relative d-inline-block auto-bid-title">
              <strong>{{ $t('auctions.frontpage.auto_bid') }}</strong>
              <InfoIcon id="info-icon" />
              <b-tooltip target="info-icon" custom-class="auto-bid-tooltip" triggers="hover">
                {{ $t('auctions.frontpage.auto_bid_tooltip') }} <span v-b-modal.auto-bid-thresholds-modal class="text-primary">{{ $t('auctions.frontpage.view_threshold_chart') }}</span>
              </b-tooltip>
            </div>
            <div class="mt-3 d-flex justify-content-between auto-bid-content">
              <input v-model="autoBidPrice" :placeholder="$t('auctions.frontpage.up_to')" />
              <b-btn :disabled="!autoBidPrice || parseFloat(autoBidPrice) * 100 < activeAuction.highest_bid" pill @click="placeAutoBid">{{ $t('auctions.frontpage.place_auto_bid') }}</b-btn>
            </div>
            <div v-if="authUser && activeAuction.auto_bid_setting" class="mt-3 text-left auto-bid-setting">
              <div>{{ $t('auctions.frontpage.prev_auto_bid_placed_at') }} ${{ activeAuction.auto_bid_setting.price | formatPrice }}</div>
              <div class="d-flex align-items-center mt-1">
                <strong class="mr-3">{{ $t('auctions.frontpage.auto_bid_settings') }}</strong>
                <span class="mr-3">{{ autoBidDisabled ? 'Disabled' : 'Enabled' }}</span>
                <b-form-checkbox :checked="!autoBidDisabled" switch size="lg" @change="onUpdateAutoBidSetting(!autoBidDisabled)"></b-form-checkbox>
              </div>
            </div>
          </div>
          <!-- Expired Wrapper -->
          <div v-if="isExpired" class="expired-wrapper">
            <ExpiredSvg></ExpiredSvg>
          </div>
        </div>
        <div class="recent-bidding-history">
          <div class="recent-bidding-history-title">{{ $t('auctions.frontpage.recent_bidding_history') }}</div>
          <table class="mt-3">
            <thead>
              <tr>
                <th>{{ $t('auctions.frontpage.time_date') }}</th>
                <th>{{ $t('auctions.frontpage.bid_amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="activeAuction.bids.length > 0">
                <tr v-for="bid in activeAuction.bids" :key="bid.id">
                  <td>
                    <strong>{{ bid.created_at | formatDate('MM-DD-YYYY') }}</strong>
                    <span>{{ bid.created_at | formatTime }}</span>
                  </td>
                  <td>${{ bid.price | formatPrice }}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="similar-auctions">
      <product-slider
        :title="$t('auctions.frontpage.auction_details.similar_auctions')"
        :auctions="similarAuctions"
        @showAll="showAllAuctions"
      ></product-slider>
    </div>
    <b-modal id="auto-bid-thresholds-modal" hide-footer hide-header size="lg">
      <close-icon class="close-icon" @click="$bvModal.hide('auto-bid-thresholds-modal')"></close-icon>
      <h3 class="thresholds-modal-title">{{ $t('auctions.frontpage.auto_bid_thresholds') }}</h3>
      <p class="thresholds-modal-content">{{ $t('auctions.frontpage.auto_bid_modal_content') }}</p>
      <div class="pb-4">
        <b-table :items="ThresholdsData" :fields="ThresholdFields">
          <template #cell(current_bid)="row">
            <div>{{ row.item.current_bid }}</div>
          </template>
          <template #cell(bid_increment)="row">
            <div>{{ row.item.bid_increment }}</div>
          </template>
        </b-table>
      </div>
    </b-modal>
    <b-modal id="auto-bid-modal" centered hide-footer hide-header size="lg">
      <div class="text-right">
        <close-icon class="close-icon auto-bid-auth-link" @click="$bvModal.hide('auto-bid-modal')"></close-icon>
      </div>
      <h1 class="auto-bid-modal-title">
        {{ authUser ? $t('auctions.frontpage.enable_auto_bid') : $t('auctions.frontpage.signup_enable_auto_bid') }}
      </h1>
      <div v-if="autoBidStep === 'auth'" class="auto-bid-auth">
        <div v-if="activeAuthTab === 'signup'" class="auto-bid-auth-signup">
          <sign-up-component @complete="onAuthFinished"></sign-up-component>
          <div class="mb-4">
            {{ $t('auctions.frontpage.already_have_account') }}&nbsp;
            <span class="text-primary auto-bid-auth-link" @click="activeAuthTab = 'login'">
              {{ $t('auctions.frontpage.login_to_continue') }}
            </span>
          </div>
        </div>
        <div v-else class="auto-bid-auth-login">
          <login-component inlineMode @complete="onAuthFinished"></login-component>
          <div class="mb-4">
            {{ $t('auctions.frontpage.have_no_account_yet') }}&nbsp;
            <span class="text-primary auto-bid-auth-link" @click="activeAuthTab = 'signup'">
              {{ $t('auctions.frontpage.register_new_one') }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="autoBidStep === 'payment'">
        <div class="auto-bid-section">
          <div class="auto-bid-section-title">{{ $t('auctions.frontpage.payment_method') }}</div>
          <Cards isInlineMode :cta-label="'Next'" @complete="autoBidStep = 'shipping_address'" />
        </div>
      </div>
      <div v-if="autoBidStep === 'shipping_address'">
        <div class="auto-bid-section">
          <div class="auto-bid-section-title">{{ $t('auctions.frontpage.shipping_information') }}</div>
          <ValidationObserver ref="shippingAddressObserver">
            <BillingShippingAddressForm
              addressType="shipping"
              ctaAlignment="center"
              @submit="(address) => addressChanged('shipping', address)"
            ></BillingShippingAddressForm>
          </ValidationObserver>
        </div>
      </div>
      <div v-if="autoBidStep === 'billing_address'">
        <div class="auto-bid-section">
          <div class="auto-bid-section-title">{{ $t('auctions.frontpage.billing_information') }}</div>
          <ValidationObserver ref="billingAddressObserver">
            <BillingShippingAddressForm
              addressType="billing"
              ctaAlignment="center"
              @submit="(address) => addressChanged('billing', address)"
            ></BillingShippingAddressForm>
          </ValidationObserver>
        </div>
      </div>
    </b-modal>
    <!-- Bid Confirm Modal -->
    <b-modal id="quick-bid-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('quick-bid-modal')"></close-icon>
      </div>
      <div>
        <h5 class="mt-3 mb-4 mx-auto w-75">{{ modalData.title }}</h5>
        <div class="d-flex justify-content-center">
          <span class="text-primary mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span><strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
        </div>
        <div class="my-4 d-flex justify-content-center">
          <b-button class="mx-2 px-4" variant="primary" pill @click="onPlaceBidConfirmed">{{ modalData.auto_bid ? $t('auctions.frontpage.bid_up_to') : $t('auctions.frontpage.bid') }} ${{ modalData.price | formatPrice }}<small> {{ $t('auctions.frontpage.fees') }}</small></b-button>
          <b-button class="mx-2 px-5" variant="outline-dark" pill @click="$bvModal.hide('quick-bid-modal')">{{ $t('common.cancel') }}</b-button>
        </div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.placed_bid_desc') }}</small></div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/fee-policy" class="text-primary">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></small></div>
      </div>
    </b-modal>
    <!-- Bid Confirm Modal -->
    <b-modal id="auto-bid-enable-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('auto-bid-enable-modal')"></close-icon>
      </div>
      <div>
        <h5 class="mt-3 mb-4 mx-auto w-75">{{ $t('auctions.frontpage.enable_auto_bid_confirm_text') }}</h5>
        <div class="d-flex justify-content-center">
          <span class="text-primary mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span><strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
        </div>
        <div class="my-4 d-flex justify-content-center">
          <b-button class="mx-2 px-4" variant="primary" pill @click="onEnableAutoBid">{{ $t('auctions.frontpage.bid_up_to') }} ${{ autoBidPrice }}<small> {{ $t('auctions.frontpage.fees') }}</small></b-button>
          <b-button class="mx-2 px-5" variant="outline-dark" pill @click="$bvModal.hide('auto-bid-enable-modal')">{{ $t('common.cancel') }}</b-button>
        </div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.placed_bid_desc') }}</small></div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/fee-policy" class="text-primary">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></small></div>
      </div>
    </b-modal>
    <b-modal id="auto-bid-success-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('auto-bid-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('auctions.frontpage.success_bid_msg') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
          <CheckmarkIcon />
        </div>
      </div>
    </b-modal>
    <WatchlistPopover
      v-if="!watchlist"
      :auction="activeAuction"
      :target="`popover-watchlist-item-${activeAuction.id}`"
      @show="watchlistShow = true"
      @hidden="watchlistShow = false"
      @watchlisted="onWatchlisted"
    />
    <b-popover
      ref="sharePopover"
      :target="`popover-share-${activeAuction.id}`"
      triggers="hover"
      placement="bottom"
      :container="`popover-share-${activeAuction.id}`"
      custom-class="watchlist-popover"
      delay="200"
      @show="shareShow = true"
      @hidden="shareShow = false"
    >
      <ShareButton
        :url="shareUrl + activeAuction.id"
        :title="auctionName"
        :description="''"
      />
    </b-popover>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'

import ProductSlider from '~/components/Auctions/ProductSlider'
import MediaCarouselWithThumbs from '~/components/Auctions/MediaCarouselWithThumbs'
import OverallFit from '~/components/Auctions/OverallFit'
import ArrowFillIcon from '~/assets/img/icons/arrow-fill.svg?inline'
import InfoIcon from '~/assets/img/icons/info-blue.svg?inline'
import ShareIcon from '~/assets/img/icons/share.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import SignUpComponent from '~/components/Auth/SignUpComponent'
import LoginComponent from '~/components/Auth/LoginComponent'
import Cards from '~/components/profile/preferences/Popup/Payments/Cards'
import BillingShippingAddressForm from '~/components/profile/preferences/Popup/BillingShippingAddressForm'
import ExpiredSvg from '~/assets/img/icons/expired-mark.svg?inline'
import { AuctionThresholdsData, AuctionSizes, AUCTION_TYPE_COLLECTION, WATCHLIST_TYPE_AUCTION } from '~/static/constants'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import LeftArrow from '~/assets/img/home/arrow-left.svg?inline'
import RightArrow from '~/assets/img/home/arrow-right.svg?inline'
import {API_PROD_URL} from '~/static/constants/environments'
import {LARGE_PRODUCT_IMG_WIDTH, THUMB_PRODUCT_IMG_WIDTH, DEADSTOCK_PRODUCT_FALLBACK_IMAGE, EXPIRED_STATUS} from '~/static/constants/auctions'
import WatchlistPopover from '~/components/watchlist/Popover'
import ShareButton from '~/components/common/ShareButton'
import Icon from '~/components/common/Icon.vue'

export default {
  name: 'AuctionDetailsPage',
  components: {
    ShareIcon,
    ProductSlider,
    MediaCarouselWithThumbs,
    ArrowFillIcon,
    InfoIcon,
    CloseIcon,
    OverallFit,
    SignUpComponent,
    LoginComponent,
    Cards,
    BillingShippingAddressForm,
    ValidationObserver,
    ExpiredSvg,
    CheckmarkIcon,
    RightArrow,
    LeftArrow,
    WatchlistPopover,
    ShareButton,
    Icon,
  },
  layout: 'IndexLayout',
  data() {
    return {
      loading: false,
      breadcrumbItems: [],
      images: [],
      similarAuctions: [],
      ThresholdFields: [
        {
          key: 'current_bid',
          label: this.$t('auctions.frontpage.auction_details.thresholds_current_bid'),
          class: 'current-bid',
        },
        {
          key: 'bid_increment',
          label: this.$t('auctions.frontpage.auction_details.thresholds_bid_increment'),
          class: 'bid-increment',
        },
      ],
      ThresholdsData: AuctionThresholdsData,
      sizes: AuctionSizes,
      activeAuthTab: 'signup',
      authUser: this.$auth.user,
      autoBidStep: this.$auth.loggedIn ? 'payment' : 'auth',
      quickBidPrices: [],
      quickBidPrice: null,
      modalData: {},
      placeBidPrice: null,
      autoBidPrice: null,
      API_PROD_URL,
      isExpired: false,
      showLowBidError: false,
      isAutoBidConfigSaving: false,
      autoBidDisabled: false,
      currentItemIdx: 0,
      shareShow: false,
      shareUrl: `${process.env.APP_URL}/auction/`,
      watchlistShow: false,
      watchlist: null,
      auctionName: '',
    }
  },
  computed: {
    ...mapGetters({
      activeAuction: 'auction/activeAuction',
    }),
  },
  watch: {
    activeAuction(newV) {
      this.breadcrumbItems = [
        {
          text: this.$t('home.auctions'),
          href: '/auction'
        },
        {
          text: this.$t('home_page.collections'),
        },
        {
          text: `${this.$t('auctions.frontpage.auction_id')}# ${newV.id}`,
          active: true
        }
      ]
      this.images = newV.auction_items.map(item => {
        if (item.inventory.product.category && LARGE_PRODUCT_IMG_WIDTH && THUMB_PRODUCT_IMG_WIDTH) {
          return {
            big: `${this.API_PROD_URL}/${item.inventory.product.category.name}/${item.inventory.product.sku}/image?width=${LARGE_PRODUCT_IMG_WIDTH}`,
            thumb: `${this.API_PROD_URL}/${item.inventory.product.category.name}/${item.inventory.product.sku}/image?width=${THUMB_PRODUCT_IMG_WIDTH}`,
          }
        }
        return {
          big: DEADSTOCK_PRODUCT_FALLBACK_IMAGE,
          thumb: DEADSTOCK_PRODUCT_FALLBACK_IMAGE,
        }
      })
      const mainPrice = newV.highest_bid ? Math.floor(newV.highest_bid / 5000) + 1 : Math.floor(newV.start_bid_price / 5000) + 1;
      this.quickBidPrices = [mainPrice * 5000, (mainPrice + 1) *5000, (mainPrice + 2) * 5000, (mainPrice + 3) * 5000]
      if (this.$options.filters.remainingTime(newV) === EXPIRED_STATUS || newV.status === EXPIRED_STATUS) {
        this.isExpired = true
      }
      this.autoBidDisabled = newV.auto_bid_setting ? newV.auto_bid_setting.is_disabled : false
      this.auctionName = this.getAuctionName(newV)
      this.watchlist = newV.watchlist_item?.watchlist
      this.loadSimilarAuctions()
    },
    placeBidPrice() {
      this.showLowBidError = false
    },
  },
  mounted() {
    this.loadAuction()
  },
  methods: {
    ...mapActions({
      removeItemsFromWatchList: 'watchlist/removeItemsFromWatchList',
    }),
    ...mapMutations({
      updateBidPrice: 'auction/updateActiveAuctionPrice',
      updateAuction: 'auction/updateActiveAuction',
    }),
    // Load auction details
    loadAuction() {
      this.loading = true
      const { id: auctionId } = this.$route.params
      this.$store.dispatch('auction/getAuctionDetails', auctionId)
    },
    // Click place bid button
    placeBid() {
      if (this.placeBidPrice * 100 <= this.activeAuction.highest_bid || this.placeBidPrice * 100 <= this.activeAuction.start_bid_price) {
        this.showLowBidError = true
      } else {
        this.modalData = {
          title: this.$t('auctions.frontpage.place_bid_modal_content'),
          price: this.placeBidPrice * 100,
        }
        this.$bvModal.show('quick-bid-modal')
      }
    },
    onAuthFinished(user) {
      this.authUser = user
      this.getAutoBidStep()
    },
    // Add Shipping/Billing address to current login user
    addressChanged(type, address) {
      if (type === 'shipping') {
        this.$refs.shippingAddressObserver.validate().then((success) => {
          if (success) {
            this.addAddress(address)
          }
        })
      } else {
        this.$refs.billingAddressObserver.validate().then((success) => {
          if (success) {
            this.addAddress(address)
          }
        })
      }
    },
    // Add Shipping/ Billing Address
    addAddress(address) {
      this.$axios
        .post('/preferences/profile/add-address', address)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          if (address.type === 'billing') {
            this.$bvModal.hide('auto-bid-modal')
            this.$bvModal.show('auto-bid-enable-modal')
          }
          const billingAddresses = this.authUser.addresses.filter(address => address.type === 'BILLING')
          if (address.type === 'shipping') {
            if (billingAddresses.length > 0 || address.addAsBilling === true) {
              this.$bvModal.hide('auto-bid-modal')
              this.$bvModal.show('auto-bid-enable-modal')
            } else {
              this.autoBidStep = 'billing_address'
            }
          }
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Section - Add Address:',
            err.response.data
          )
          this.$toasted.error(err.response.data.message)
        })
    },
    // Go to bid checkout page
    onPlaceBidConfirmed() {
      this.updateBidPrice(this.modalData.price)
      this.$router.push('/checkout/auction')
    },
    // Click quick bid button
    placeQuickBid(price) {
      this.modalData = {
        title: this.$t('auctions.frontpage.place_quick_bid_modal_content'),
        price,
      }
      this.$bvModal.show('quick-bid-modal')
    },
    // Click autobid button
    placeAutoBid() {
      if (this.authUser) {
        this.getAutoBidStep()
      } else {
        this.$bvModal.show('auto-bid-modal')
      }
    },
    // Similar auctions
    loadSimilarAuctions() {
      this.$axios.get('/auctions/public', {
        params: {
          status: 'live',
          take: 8,
          type: this.activeAuction.type,
        }
      })
        .then(res => {
          this.similarAuctions = res.data.data
        })
        .catch(err => {
          this.$toasted.error(err)
        })
    },
    // Find which step will be shown in autobid modal
    getAutoBidStep() {
      if (this.authUser) {
        if (this.authUser.paymentmethod && this.authUser.paymentmethod.length > 0) {
          const billingAddresses = this.authUser.addresses.filter(address => address.type === 'BILLING')
          const shippingAddresses = this.authUser.addresses.filter(address => address.type === 'SHIPPING')
          if (shippingAddresses.length > 0 && billingAddresses.length > 0) {
            this.$bvModal.hide('auto-bid-modal')
            this.$bvModal.show('auto-bid-enable-modal')
          } else {
            this.$bvModal.show('auto-bid-modal')
            if (shippingAddresses.length > 0) {
              this.autoBidStep = 'billing_address'
            } else {
              this.autoBidStep = 'shipping_address'
            }
          }
        } else {
          this.$bvModal.show('auto-bid-modal')
          this.autoBidStep = 'payment'
        }
      }
    },
    // Update auto bid settings
    onEnableAutoBid() {
      this.isAutoBidConfigSaving = true
      this.$axios.post('/auctions/auto-bid', {
        id: this.activeAuction.auto_bid_setting ? this.activeAuction.auto_bid_setting.id : null,
        price: this.autoBidPrice * 100,
        auction_id: this.activeAuction.id,
        user_id: this.$auth.user.id,
        is_disabled: false,
      })
      .then((res) => {
        // Show Auto Bid Confirm Modal
        this.isAutoBidConfigSaving = false
        this.autoBidPrice = null
        this.$bvModal.hide('auto-bid-enable-modal')
        this.$bvModal.show('auto-bid-success-modal')
        this.updateAuction({
          auto_bid_setting: res.data,
        })
      })
      .catch((error) => {
        this.$toasted.error(error)
      })
    },
    // Enable/disable autobid setting
    onUpdateAutoBidSetting(value) {
      this.$axios.post('/auctions/auto-bid', {
        ...this.activeAuction.auto_bid_setting,
        is_disabled: value,
      })
      .then((res) => {
        this.autoBidDisabled = value
        this.$toasted.info(value ? this.$t('auctions.frontpage.auto_bid_setting_disabled') : this.$t('auctions.frontpage.auto_bid_setting_enabled'))
        this.updateAuction({
          auto_bid_setting: res.data,
        })
      })
      .catch((error) => {
        this.$toasted.error(error)
      })
    },
    moveBack() {
      this.currentItemIdx--
    },
    moveForward() {
      this.currentItemIdx++
    },
    // Add auction to Watchlist
    addToWatchlist() {
      this.addItemToWatchlist(this.activeAuction.id)
    },

    onWatchlisted(watchlist) {
      if (watchlist) {
        this.watchlistShow = false
        this.watchlist = watchlist
      }
    },
    removeFromWatchList() {
      if (this.watchlist) {
        this.removeItemsFromWatchList({
          watchlist: this.watchlist,
          ids: [this.activeAuction.id],
          type: WATCHLIST_TYPE_AUCTION,
        })
        this.watchlist = null
      }
    },
    getAuctionName(auction) {
      if (auction) {
        if (auction.type === AUCTION_TYPE_COLLECTION) {
          return auction.name
        }
        if (auction.auction_items && auction.auction_items.length > 0) {
          return auction.auction_items[0].inventory.product.name
        }
      }
      return ''
    },
    showAllAuctions() {
      this.$router.push('/auction')
    }
  },
}
</script>
