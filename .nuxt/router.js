import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _65c98c45 = () => interopDefault(import('../pages/auction/index.vue' /* webpackChunkName: "pages/auction/index" */))
const _65461ff8 = () => interopDefault(import('../pages/Auctions/index.vue' /* webpackChunkName: "pages/Auctions/index" */))
const _e0a824f2 = () => interopDefault(import('../pages/create-listing/index.vue' /* webpackChunkName: "pages/create-listing/index" */))
const _f53e8d5e = () => interopDefault(import('../pages/features/index.vue' /* webpackChunkName: "pages/features/index" */))
const _6450cb04 = () => interopDefault(import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _6e608782 = () => interopDefault(import('../pages/heat-check/index.vue' /* webpackChunkName: "pages/heat-check/index" */))
const _ba0ac4e0 = () => interopDefault(import('../pages/Home.vue' /* webpackChunkName: "pages/Home" */))
const _62cbdb28 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _66235207 = () => interopDefault(import('../pages/Notifications.vue' /* webpackChunkName: "pages/Notifications" */))
const _0c06b5ef = () => interopDefault(import('../pages/payout-details/index.vue' /* webpackChunkName: "pages/payout-details/index" */))
const _93e144ac = () => interopDefault(import('../pages/reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _46b9eb3c = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _75175ec6 = () => interopDefault(import('../pages/Sell/index.vue' /* webpackChunkName: "pages/Sell/index" */))
const _6b5225d7 = () => interopDefault(import('../pages/Settings/index.vue' /* webpackChunkName: "pages/Settings/index" */))
const _31fd3d6c = () => interopDefault(import('../pages/shop/index.vue' /* webpackChunkName: "pages/shop/index" */))
const _5e4cd898 = () => interopDefault(import('../pages/shop-by-style/index.vue' /* webpackChunkName: "pages/shop-by-style/index" */))
const _430976e9 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _430cdfa4 = () => interopDefault(import('../pages/social-callback.vue' /* webpackChunkName: "pages/social-callback" */))
const _227ccc63 = () => interopDefault(import('../pages/trades/index.vue' /* webpackChunkName: "pages/trades/index" */))
const _ef5b7c32 = () => interopDefault(import('../pages/Admin/Notifications.vue' /* webpackChunkName: "pages/Admin/Notifications" */))
const _4d94664e = () => interopDefault(import('../pages/checkout/auction/index.vue' /* webpackChunkName: "pages/checkout/auction/index" */))
const _903a8cd4 = () => interopDefault(import('../pages/checkout/heat-check/index.vue' /* webpackChunkName: "pages/checkout/heat-check/index" */))
const _3f83e9ca = () => interopDefault(import('../pages/checkout/selling/index.vue' /* webpackChunkName: "pages/checkout/selling/index" */))
const _08868810 = () => interopDefault(import('../pages/create-listing/confirm/index.vue' /* webpackChunkName: "pages/create-listing/confirm/index" */))
const _7db5ccfa = () => interopDefault(import('../pages/create-listing/details/index.vue' /* webpackChunkName: "pages/create-listing/details/index" */))
const _b70cac7c = () => interopDefault(import('../pages/create-listing/SelectProductType.vue' /* webpackChunkName: "pages/create-listing/SelectProductType" */))
const _acc4331e = () => interopDefault(import('../pages/features/2fa-security.vue' /* webpackChunkName: "pages/features/2fa-security" */))
const _2db380e1 = () => interopDefault(import('../pages/features/auctions.vue' /* webpackChunkName: "pages/features/auctions" */))
const _7323bf14 = () => interopDefault(import('../pages/features/blockchain-authentication-ledger.vue' /* webpackChunkName: "pages/features/blockchain-authentication-ledger" */))
const _5cd1e3a6 = () => interopDefault(import('../pages/features/buying.vue' /* webpackChunkName: "pages/features/buying" */))
const _64460a10 = () => interopDefault(import('../pages/features/crypto-payments.vue' /* webpackChunkName: "pages/features/crypto-payments" */))
const _69f7ee7e = () => interopDefault(import('../pages/features/csv-bulk-uploading.vue' /* webpackChunkName: "pages/features/csv-bulk-uploading" */))
const _b2f8c722 = () => interopDefault(import('../pages/features/deadstock-exchange.vue' /* webpackChunkName: "pages/features/deadstock-exchange" */))
const _d4810d08 = () => interopDefault(import('../pages/features/heat-check.vue' /* webpackChunkName: "pages/features/heat-check" */))
const _08207d05 = () => interopDefault(import('../pages/features/in-app-game.vue' /* webpackChunkName: "pages/features/in-app-game" */))
const _53af92f4 = () => interopDefault(import('../pages/features/live-customer-service.vue' /* webpackChunkName: "pages/features/live-customer-service" */))
const _0af4cce2 = () => interopDefault(import('../pages/features/payment-plans.vue' /* webpackChunkName: "pages/features/payment-plans" */))
const _eda137cc = () => interopDefault(import('../pages/features/rewards-program.vue' /* webpackChunkName: "pages/features/rewards-program" */))
const _92fa99e2 = () => interopDefault(import('../pages/features/selling.vue' /* webpackChunkName: "pages/features/selling" */))
const _6920b913 = () => interopDefault(import('../pages/features/streetwear.vue' /* webpackChunkName: "pages/features/streetwear" */))
const _1527f860 = () => interopDefault(import('../pages/features/trading.vue' /* webpackChunkName: "pages/features/trading" */))
const _6ec87270 = () => interopDefault(import('../pages/features/virtual-giftcards.vue' /* webpackChunkName: "pages/features/virtual-giftcards" */))
const _33ebf89e = () => interopDefault(import('../pages/heat-check/listing.vue' /* webpackChunkName: "pages/heat-check/listing" */))
const _6df8d166 = () => interopDefault(import('../pages/heat-check/new.vue' /* webpackChunkName: "pages/heat-check/new" */))
const _69c9e89c = () => interopDefault(import('../pages/heat-check/product.vue' /* webpackChunkName: "pages/heat-check/product" */))
const _3773385c = () => interopDefault(import('../pages/heat-check/product-detail.vue' /* webpackChunkName: "pages/heat-check/product-detail" */))
const _ce78ad68 = () => interopDefault(import('../pages/heat-check/public.vue' /* webpackChunkName: "pages/heat-check/public" */))
const _8aad8dec = () => interopDefault(import('../pages/profile/auctions/index.vue' /* webpackChunkName: "pages/profile/auctions/index" */))
const _8b5aece0 = () => interopDefault(import('../pages/profile/bids/index.vue' /* webpackChunkName: "pages/profile/bids/index" */))
const _8fde03a6 = () => interopDefault(import('../pages/profile/create-listing/index.vue' /* webpackChunkName: "pages/profile/create-listing/index" */))
const _07e00df8 = () => interopDefault(import('../pages/profile/inventory/index.vue' /* webpackChunkName: "pages/profile/inventory/index" */))
const _1e99048f = () => interopDefault(import('../pages/profile/offers-placed/index.vue' /* webpackChunkName: "pages/profile/offers-placed/index" */))
const _c9d93758 = () => interopDefault(import('../pages/profile/preferences/index.vue' /* webpackChunkName: "pages/profile/preferences/index" */))
const _086a76a4 = () => interopDefault(import('../pages/profile/purchases/index.vue' /* webpackChunkName: "pages/profile/purchases/index" */))
const _7c0bc400 = () => interopDefault(import('../pages/profile/rewards/index.vue' /* webpackChunkName: "pages/profile/rewards/index" */))
const _3d2eac8c = () => interopDefault(import('../pages/profile/security/index.vue' /* webpackChunkName: "pages/profile/security/index" */))
const _27d36ceb = () => interopDefault(import('../pages/profile/support/index.vue' /* webpackChunkName: "pages/profile/support/index" */))
const _9a2674ac = () => interopDefault(import('../pages/profile/vendor-hub/index.vue' /* webpackChunkName: "pages/profile/vendor-hub/index" */))
const _c3d52576 = () => interopDefault(import('../pages/profile/vendor-selling/index.vue' /* webpackChunkName: "pages/profile/vendor-selling/index" */))
const _4566a949 = () => interopDefault(import('../pages/profile/watchlist/index.vue' /* webpackChunkName: "pages/profile/watchlist/index" */))
const _99d7d22e = () => interopDefault(import('../pages/profile/wish-lists/index.vue' /* webpackChunkName: "pages/profile/wish-lists/index" */))
const _3b8671a4 = () => interopDefault(import('../pages/Sell/confirm-listing/index.vue' /* webpackChunkName: "pages/Sell/confirm-listing/index" */))
const _1269e632 = () => interopDefault(import('../pages/Sell/create-listing/index.vue' /* webpackChunkName: "pages/Sell/create-listing/index" */))
const _177e9c30 = () => interopDefault(import('../pages/Sell/Inventory.vue' /* webpackChunkName: "pages/Sell/Inventory" */))
const _ae41737e = () => interopDefault(import('../pages/Sell/Orders.vue' /* webpackChunkName: "pages/Sell/Orders" */))
const _06184558 = () => interopDefault(import('../pages/Sell/sale-confirmed/index.vue' /* webpackChunkName: "pages/Sell/sale-confirmed/index" */))
const _237a0f7f = () => interopDefault(import('../pages/Sell/Settings.vue' /* webpackChunkName: "pages/Sell/Settings" */))
const _d029570c = () => interopDefault(import('../pages/Sell/Summary.vue' /* webpackChunkName: "pages/Sell/Summary" */))
const _6775e74a = () => interopDefault(import('../pages/Settings/Addresses/index.vue' /* webpackChunkName: "pages/Settings/Addresses/index" */))
const _2e72a924 = () => interopDefault(import('../pages/shop-by-style/archive.vue' /* webpackChunkName: "pages/shop-by-style/archive" */))
const _19d44deb = () => interopDefault(import('../pages/trades/CompletedTrades.vue' /* webpackChunkName: "pages/trades/CompletedTrades" */))
const _06503258 = () => interopDefault(import('../pages/trades/OpenTrades.vue' /* webpackChunkName: "pages/trades/OpenTrades" */))
const _3b6d0e28 = () => interopDefault(import('../pages/trades/Thanks.vue' /* webpackChunkName: "pages/trades/Thanks" */))
const _28569142 = () => interopDefault(import('../pages/checkout/heat-check/itemsList.vue' /* webpackChunkName: "pages/checkout/heat-check/itemsList" */))
const _75b1307a = () => interopDefault(import('../pages/checkout/heat-check/order-confirmation/index.vue' /* webpackChunkName: "pages/checkout/heat-check/order-confirmation/index" */))
const _5cd4d61e = () => interopDefault(import('../pages/checkout/selling/order-confirmation/index.vue' /* webpackChunkName: "pages/checkout/selling/order-confirmation/index" */))
const _49728fa5 = () => interopDefault(import('../pages/create-listing/auction/Collection.vue' /* webpackChunkName: "pages/create-listing/auction/Collection" */))
const _6216e062 = () => interopDefault(import('../pages/create-listing/auction/Single.vue' /* webpackChunkName: "pages/create-listing/auction/Single" */))
const _601244f0 = () => interopDefault(import('../pages/create-listing/confirm/Collection.vue' /* webpackChunkName: "pages/create-listing/confirm/Collection" */))
const _4ebc6c70 = () => interopDefault(import('../pages/create-listing/confirm/Details.vue' /* webpackChunkName: "pages/create-listing/confirm/Details" */))
const _39b95cb4 = () => interopDefault(import('../pages/create-listing/details/collection.vue' /* webpackChunkName: "pages/create-listing/details/collection" */))
const _331166f5 = () => interopDefault(import('../pages/create-listing/product/Confirm.vue' /* webpackChunkName: "pages/create-listing/product/Confirm" */))
const _5dcfe9b6 = () => interopDefault(import('../pages/create-listing/product/Edit.vue' /* webpackChunkName: "pages/create-listing/product/Edit" */))
const _ecee0f5e = () => interopDefault(import('../pages/create-listing/product/Inventory.vue' /* webpackChunkName: "pages/create-listing/product/Inventory" */))
const _e77fa1fa = () => interopDefault(import('../pages/create-listing/product/Search.vue' /* webpackChunkName: "pages/create-listing/product/Search" */))
const _af3d3b20 = () => interopDefault(import('../pages/create-listing/search/Inventory.vue' /* webpackChunkName: "pages/create-listing/search/Inventory" */))
const _f1f39762 = () => interopDefault(import('../pages/profile/auctions/send-offer.vue' /* webpackChunkName: "pages/profile/auctions/send-offer" */))
const _0d38a6d8 = () => interopDefault(import('../pages/profile/bids/incoming.vue' /* webpackChunkName: "pages/profile/bids/incoming" */))
const _60677db2 = () => interopDefault(import('../pages/profile/create-listing/drafts.vue' /* webpackChunkName: "pages/profile/create-listing/drafts" */))
const _5eb70e6a = () => interopDefault(import('../pages/profile/create-listing/drafts/index.vue' /* webpackChunkName: "pages/profile/create-listing/drafts/index" */))
const _de93c9a4 = () => interopDefault(import('../pages/profile/create-listing/selling/index.vue' /* webpackChunkName: "pages/profile/create-listing/selling/index" */))
const _d9070d34 = () => interopDefault(import('../pages/profile/inventory/confirm.vue' /* webpackChunkName: "pages/profile/inventory/confirm" */))
const _44b9683a = () => interopDefault(import('../pages/profile/inventory/csv-drafts.vue' /* webpackChunkName: "pages/profile/inventory/csv-drafts" */))
const _24d85f47 = () => interopDefault(import('../pages/profile/inventory/draft.vue' /* webpackChunkName: "pages/profile/inventory/draft" */))
const _0ea67654 = () => interopDefault(import('../pages/profile/inventory/edit.vue' /* webpackChunkName: "pages/profile/inventory/edit" */))
const _293f0346 = () => interopDefault(import('../pages/profile/inventory/new.vue' /* webpackChunkName: "pages/profile/inventory/new" */))
const _c03eeb1c = () => interopDefault(import('../pages/profile/inventory/search.vue' /* webpackChunkName: "pages/profile/inventory/search" */))
const _2f6d0916 = () => interopDefault(import('../pages/profile/preferences/redeem-giftcard/index.vue' /* webpackChunkName: "pages/profile/preferences/redeem-giftcard/index" */))
const _71b34d10 = () => interopDefault(import('../pages/profile/preferences/social-connect.vue' /* webpackChunkName: "pages/profile/preferences/social-connect" */))
const _76d3abc4 = () => interopDefault(import('../pages/profile/rewards/faq.vue' /* webpackChunkName: "pages/profile/rewards/faq" */))
const _cbf44404 = () => interopDefault(import('../pages/profile/security/faq.vue' /* webpackChunkName: "pages/profile/security/faq" */))
const _3400ad18 = () => interopDefault(import('../pages/profile/support/about-us/index.vue' /* webpackChunkName: "pages/profile/support/about-us/index" */))
const _148647a5 = () => interopDefault(import('../pages/profile/support/contact-us/index.vue' /* webpackChunkName: "pages/profile/support/contact-us/index" */))
const _2dec1d17 = () => interopDefault(import('../pages/profile/support/faqs/index.vue' /* webpackChunkName: "pages/profile/support/faqs/index" */))
const _50ca90b5 = () => interopDefault(import('../pages/profile/support/live-chat/index.vue' /* webpackChunkName: "pages/profile/support/live-chat/index" */))
const _19b46e8e = () => interopDefault(import('../pages/profile/trades/dashboard/index.vue' /* webpackChunkName: "pages/profile/trades/dashboard/index" */))
const _68764395 = () => interopDefault(import('../pages/profile/trades/prefrences/index.vue' /* webpackChunkName: "pages/profile/trades/prefrences/index" */))
const _51ed0bd4 = () => interopDefault(import('../pages/profile/vendor-hub/application-received.vue' /* webpackChunkName: "pages/profile/vendor-hub/application-received" */))
const _67567246 = () => interopDefault(import('../pages/profile/vendor-hub/apply.vue' /* webpackChunkName: "pages/profile/vendor-hub/apply" */))
const _30c035ee = () => interopDefault(import('../pages/profile/vendor-hub/faq.vue' /* webpackChunkName: "pages/profile/vendor-hub/faq" */))
const _f2519000 = () => interopDefault(import('../pages/Sell/create-listing/CreateInventory.vue' /* webpackChunkName: "pages/Sell/create-listing/CreateInventory" */))
const _17ca1828 = () => interopDefault(import('../pages/Sell/create-listing/CreateListing.vue' /* webpackChunkName: "pages/Sell/create-listing/CreateListing" */))
const _10a83738 = () => interopDefault(import('../pages/Sell/create-listing/SellNow.vue' /* webpackChunkName: "pages/Sell/create-listing/SellNow" */))
const _914c075e = () => interopDefault(import('../pages/trades/create-listing/ConfirmTrade.vue' /* webpackChunkName: "pages/trades/create-listing/ConfirmTrade" */))
const _a2424eea = () => interopDefault(import('../pages/trades/create-listing/CreateTrade.vue' /* webpackChunkName: "pages/trades/create-listing/CreateTrade" */))
const _346876ea = () => interopDefault(import('../pages/trades/create-listing/SelectTrade.vue' /* webpackChunkName: "pages/trades/create-listing/SelectTrade" */))
const _1abc616a = () => interopDefault(import('../pages/create-listing/product/collection/Confirm.vue' /* webpackChunkName: "pages/create-listing/product/collection/Confirm" */))
const _30b70342 = () => interopDefault(import('../pages/create-listing/product/collection/Create.vue' /* webpackChunkName: "pages/create-listing/product/collection/Create" */))
const _e5e24828 = () => interopDefault(import('../pages/create-listing/product/collection/Details.vue' /* webpackChunkName: "pages/create-listing/product/collection/Details" */))
const _1ddb2cd0 = () => interopDefault(import('../pages/create-listing/product/collection/Edit.vue' /* webpackChunkName: "pages/create-listing/product/collection/Edit" */))
const _325f2986 = () => interopDefault(import('../pages/create-listing/product/collection/Inventory.vue' /* webpackChunkName: "pages/create-listing/product/collection/Inventory" */))
const _3f04111c = () => interopDefault(import('../pages/profile/create-listing/selling/confirm.vue' /* webpackChunkName: "pages/profile/create-listing/selling/confirm" */))
const _707c70f3 = () => interopDefault(import('../pages/profile/create-listing/trades/AlreadyListedModal.vue' /* webpackChunkName: "pages/profile/create-listing/trades/AlreadyListedModal" */))
const _8be3b05a = () => interopDefault(import('../pages/profile/create-listing/trades/confirmation/index.vue' /* webpackChunkName: "pages/profile/create-listing/trades/confirmation/index" */))
const _25d81652 = () => interopDefault(import('../pages/profile/create-listing/trades/create.vue' /* webpackChunkName: "pages/profile/create-listing/trades/create" */))
const _2227cc18 = () => interopDefault(import('../pages/profile/create-listing/trades/CreateTradeSearchItem.vue' /* webpackChunkName: "pages/profile/create-listing/trades/CreateTradeSearchItem" */))
const _621c4a5b = () => interopDefault(import('../pages/profile/create-listing/trades/wants/index.vue' /* webpackChunkName: "pages/profile/create-listing/trades/wants/index" */))
const _0bbdf9c8 = () => interopDefault(import('../pages/profile/trades/dashboard/AllOffersItems.vue' /* webpackChunkName: "pages/profile/trades/dashboard/AllOffersItems" */))
const _417b8ee6 = () => interopDefault(import('../pages/profile/trades/dashboard/AllTradeListings.vue' /* webpackChunkName: "pages/profile/trades/dashboard/AllTradeListings" */))
const _62356a67 = () => interopDefault(import('../pages/profile/trades/dashboard/DeclineModel.vue' /* webpackChunkName: "pages/profile/trades/dashboard/DeclineModel" */))
const _1463fc90 = () => interopDefault(import('../pages/profile/trades/dashboard/ExpiredOffers.vue' /* webpackChunkName: "pages/profile/trades/dashboard/ExpiredOffers" */))
const _640f7c98 = () => interopDefault(import('../pages/profile/trades/dashboard/InitialListing.vue' /* webpackChunkName: "pages/profile/trades/dashboard/InitialListing" */))
const _1fb69ea8 = () => interopDefault(import('../pages/profile/trades/dashboard/OfferHistory.vue' /* webpackChunkName: "pages/profile/trades/dashboard/OfferHistory" */))
const _08601dd8 = () => interopDefault(import('../pages/profile/trades/dashboard/OfferItems.vue' /* webpackChunkName: "pages/profile/trades/dashboard/OfferItems" */))
const _ab47b088 = () => interopDefault(import('../pages/profile/trades/dashboard/TradeListingItems.vue' /* webpackChunkName: "pages/profile/trades/dashboard/TradeListingItems" */))
const _c75b4638 = () => interopDefault(import('../pages/profile/trades/dashboard/TradeOfferItems.vue' /* webpackChunkName: "pages/profile/trades/dashboard/TradeOfferItems" */))
const _04eefb53 = () => interopDefault(import('../pages/profile/trades/dashboard/ViewAllTradeOffers.vue' /* webpackChunkName: "pages/profile/trades/dashboard/ViewAllTradeOffers" */))
const _3c8af13c = () => interopDefault(import('../pages/profile/trades/prefrences/InventoryCardItem.vue' /* webpackChunkName: "pages/profile/trades/prefrences/InventoryCardItem" */))
const _5204c80b = () => interopDefault(import('../pages/profile/trades/prefrences/ResetModal.vue' /* webpackChunkName: "pages/profile/trades/prefrences/ResetModal" */))
const _251d22e8 = () => interopDefault(import('../pages/profile/trades/prefrences/YourInventory.vue' /* webpackChunkName: "pages/profile/trades/prefrences/YourInventory" */))
const _7720df47 = () => interopDefault(import('../pages/profile/vendor-selling/details/modify/index.vue' /* webpackChunkName: "pages/profile/vendor-selling/details/modify/index" */))
const _2e50538d = () => interopDefault(import('../pages/profile/create-listing/trades/wants/ViewOfferItemsModal.vue' /* webpackChunkName: "pages/profile/create-listing/trades/wants/ViewOfferItemsModal" */))
const _94c949fa = () => interopDefault(import('../pages/profile/trades/dashboard/counter-offer/DiscardModel.vue' /* webpackChunkName: "pages/profile/trades/dashboard/counter-offer/DiscardModel" */))
const _3e5901ec = () => interopDefault(import('../pages/profile/create-listing/selling/product/edit/_id/index.vue' /* webpackChunkName: "pages/profile/create-listing/selling/product/edit/_id/index" */))
const _d8ac240e = () => interopDefault(import('../pages/profile/create-listing/selling/product/_id/index.vue' /* webpackChunkName: "pages/profile/create-listing/selling/product/_id/index" */))
const _da48c31c = () => interopDefault(import('../pages/profile/preferences/giftcard/view-giftcard/_id.vue' /* webpackChunkName: "pages/profile/preferences/giftcard/view-giftcard/_id" */))
const _0804ffb5 = () => interopDefault(import('../pages/profile/trades/dashboard/counter-offer/_id/index.vue' /* webpackChunkName: "pages/profile/trades/dashboard/counter-offer/_id/index" */))
const _597f752d = () => interopDefault(import('../pages/profile/purchases/summary/_id.vue' /* webpackChunkName: "pages/profile/purchases/summary/_id" */))
const _a710db0e = () => interopDefault(import('../pages/profile/trades/dashboard/_id/index.vue' /* webpackChunkName: "pages/profile/trades/dashboard/_id/index" */))
const _2254ff20 = () => interopDefault(import('../pages/profile/vendor-selling/details/_id.vue' /* webpackChunkName: "pages/profile/vendor-selling/details/_id" */))
const _0c65f5f2 = () => interopDefault(import('../pages/profile/auctions/_id.vue' /* webpackChunkName: "pages/profile/auctions/_id" */))
const _314680de = () => interopDefault(import('../pages/profile/wish-lists/_id.vue' /* webpackChunkName: "pages/profile/wish-lists/_id" */))
const _e11d57da = () => interopDefault(import('../pages/User/logintoken/_logintoken.vue' /* webpackChunkName: "pages/User/logintoken/_logintoken" */))
const _6ba4cb71 = () => interopDefault(import('../pages/profile/bids/_id/edit.vue' /* webpackChunkName: "pages/profile/bids/_id/edit" */))
const _ee6e06a0 = () => interopDefault(import('../pages/auction/_id/index.vue' /* webpackChunkName: "pages/auction/_id/index" */))
const _7560f31c = () => interopDefault(import('../pages/shop-by-style/_id.vue' /* webpackChunkName: "pages/shop-by-style/_id" */))
const _70f2a516 = () => interopDefault(import('../pages/shop/_sku.vue' /* webpackChunkName: "pages/shop/_sku" */))
const _01e5d8ae = () => interopDefault(import('../pages/Auctions/_id/Bids.vue' /* webpackChunkName: "pages/Auctions/_id/Bids" */))
const _cdb78fde = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auction",
    component: _65c98c45,
    name: "auction"
  }, {
    path: "/Auctions",
    component: _65461ff8,
    name: "Auctions"
  }, {
    path: "/create-listing",
    component: _e0a824f2,
    name: "create-listing"
  }, {
    path: "/features",
    component: _f53e8d5e,
    name: "features"
  }, {
    path: "/forgot-password",
    component: _6450cb04,
    name: "forgot-password"
  }, {
    path: "/heat-check",
    component: _6e608782,
    name: "heat-check"
  }, {
    path: "/Home",
    component: _ba0ac4e0,
    name: "Home"
  }, {
    path: "/login",
    component: _62cbdb28,
    name: "login"
  }, {
    path: "/Notifications",
    component: _66235207,
    name: "Notifications"
  }, {
    path: "/payout-details",
    component: _0c06b5ef,
    name: "payout-details"
  }, {
    path: "/reset-password",
    component: _93e144ac,
    name: "reset-password"
  }, {
    path: "/search",
    component: _46b9eb3c,
    name: "search"
  }, {
    path: "/Sell",
    component: _75175ec6,
    name: "Sell"
  }, {
    path: "/Settings",
    component: _6b5225d7,
    name: "Settings"
  }, {
    path: "/shop",
    component: _31fd3d6c,
    name: "shop"
  }, {
    path: "/shop-by-style",
    component: _5e4cd898,
    name: "shop-by-style"
  }, {
    path: "/signup",
    component: _430976e9,
    name: "signup"
  }, {
    path: "/social-callback",
    component: _430cdfa4,
    name: "social-callback"
  }, {
    path: "/trades",
    component: _227ccc63,
    name: "trades"
  }, {
    path: "/Admin/Notifications",
    component: _ef5b7c32,
    name: "Admin-Notifications"
  }, {
    path: "/checkout/auction",
    component: _4d94664e,
    name: "checkout-auction"
  }, {
    path: "/checkout/heat-check",
    component: _903a8cd4,
    name: "checkout-heat-check"
  }, {
    path: "/checkout/selling",
    component: _3f83e9ca,
    name: "checkout-selling"
  }, {
    path: "/create-listing/confirm",
    component: _08868810,
    name: "create-listing-confirm"
  }, {
    path: "/create-listing/details",
    component: _7db5ccfa,
    name: "create-listing-details"
  }, {
    path: "/create-listing/SelectProductType",
    component: _b70cac7c,
    name: "create-listing-SelectProductType"
  }, {
    path: "/features/2fa-security",
    component: _acc4331e,
    name: "features-2fa-security"
  }, {
    path: "/features/auctions",
    component: _2db380e1,
    name: "features-auctions"
  }, {
    path: "/features/blockchain-authentication-ledger",
    component: _7323bf14,
    name: "features-blockchain-authentication-ledger"
  }, {
    path: "/features/buying",
    component: _5cd1e3a6,
    name: "features-buying"
  }, {
    path: "/features/crypto-payments",
    component: _64460a10,
    name: "features-crypto-payments"
  }, {
    path: "/features/csv-bulk-uploading",
    component: _69f7ee7e,
    name: "features-csv-bulk-uploading"
  }, {
    path: "/features/deadstock-exchange",
    component: _b2f8c722,
    name: "features-deadstock-exchange"
  }, {
    path: "/features/heat-check",
    component: _d4810d08,
    name: "features-heat-check"
  }, {
    path: "/features/in-app-game",
    component: _08207d05,
    name: "features-in-app-game"
  }, {
    path: "/features/live-customer-service",
    component: _53af92f4,
    name: "features-live-customer-service"
  }, {
    path: "/features/payment-plans",
    component: _0af4cce2,
    name: "features-payment-plans"
  }, {
    path: "/features/rewards-program",
    component: _eda137cc,
    name: "features-rewards-program"
  }, {
    path: "/features/selling",
    component: _92fa99e2,
    name: "features-selling"
  }, {
    path: "/features/streetwear",
    component: _6920b913,
    name: "features-streetwear"
  }, {
    path: "/features/trading",
    component: _1527f860,
    name: "features-trading"
  }, {
    path: "/features/virtual-giftcards",
    component: _6ec87270,
    name: "features-virtual-giftcards"
  }, {
    path: "/heat-check/listing",
    component: _33ebf89e,
    name: "heat-check-listing"
  }, {
    path: "/heat-check/new",
    component: _6df8d166,
    name: "heat-check-new"
  }, {
    path: "/heat-check/product",
    component: _69c9e89c,
    name: "heat-check-product"
  }, {
    path: "/heat-check/product-detail",
    component: _3773385c,
    name: "heat-check-product-detail"
  }, {
    path: "/heat-check/public",
    component: _ce78ad68,
    name: "heat-check-public"
  }, {
    path: "/profile/auctions",
    component: _8aad8dec,
    name: "profile-auctions"
  }, {
    path: "/profile/bids",
    component: _8b5aece0,
    name: "profile-bids"
  }, {
    path: "/profile/create-listing",
    component: _8fde03a6,
    name: "profile-create-listing"
  }, {
    path: "/profile/inventory",
    component: _07e00df8,
    name: "profile-inventory"
  }, {
    path: "/profile/offers-placed",
    component: _1e99048f,
    name: "profile-offers-placed"
  }, {
    path: "/profile/preferences",
    component: _c9d93758,
    name: "profile-preferences"
  }, {
    path: "/profile/purchases",
    component: _086a76a4,
    name: "profile-purchases"
  }, {
    path: "/profile/rewards",
    component: _7c0bc400,
    name: "profile-rewards"
  }, {
    path: "/profile/security",
    component: _3d2eac8c,
    name: "profile-security"
  }, {
    path: "/profile/support",
    component: _27d36ceb,
    name: "profile-support"
  }, {
    path: "/profile/vendor-hub",
    component: _9a2674ac,
    name: "profile-vendor-hub"
  }, {
    path: "/profile/vendor-selling",
    component: _c3d52576,
    name: "profile-vendor-selling"
  }, {
    path: "/profile/watchlist",
    component: _4566a949,
    name: "profile-watchlist"
  }, {
    path: "/profile/wish-lists",
    component: _99d7d22e,
    name: "profile-wish-lists"
  }, {
    path: "/Sell/confirm-listing",
    component: _3b8671a4,
    name: "Sell-confirm-listing"
  }, {
    path: "/Sell/create-listing",
    component: _1269e632,
    name: "Sell-create-listing"
  }, {
    path: "/Sell/Inventory",
    component: _177e9c30,
    name: "Sell-Inventory"
  }, {
    path: "/Sell/Orders",
    component: _ae41737e,
    name: "Sell-Orders"
  }, {
    path: "/Sell/sale-confirmed",
    component: _06184558,
    name: "Sell-sale-confirmed"
  }, {
    path: "/Sell/Settings",
    component: _237a0f7f,
    name: "Sell-Settings"
  }, {
    path: "/Sell/Summary",
    component: _d029570c,
    name: "Sell-Summary"
  }, {
    path: "/Settings/Addresses",
    component: _6775e74a,
    name: "Settings-Addresses"
  }, {
    path: "/shop-by-style/archive",
    component: _2e72a924,
    name: "shop-by-style-archive"
  }, {
    path: "/trades/CompletedTrades",
    component: _19d44deb,
    name: "trades-CompletedTrades"
  }, {
    path: "/trades/OpenTrades",
    component: _06503258,
    name: "trades-OpenTrades"
  }, {
    path: "/trades/Thanks",
    component: _3b6d0e28,
    name: "trades-Thanks"
  }, {
    path: "/checkout/heat-check/itemsList",
    component: _28569142,
    name: "checkout-heat-check-itemsList"
  }, {
    path: "/checkout/heat-check/order-confirmation",
    component: _75b1307a,
    name: "checkout-heat-check-order-confirmation"
  }, {
    path: "/checkout/selling/order-confirmation",
    component: _5cd4d61e,
    name: "checkout-selling-order-confirmation"
  }, {
    path: "/create-listing/auction/Collection",
    component: _49728fa5,
    name: "create-listing-auction-Collection"
  }, {
    path: "/create-listing/auction/Single",
    component: _6216e062,
    name: "create-listing-auction-Single"
  }, {
    path: "/create-listing/confirm/Collection",
    component: _601244f0,
    name: "create-listing-confirm-Collection"
  }, {
    path: "/create-listing/confirm/Details",
    component: _4ebc6c70,
    name: "create-listing-confirm-Details"
  }, {
    path: "/create-listing/details/collection",
    component: _39b95cb4,
    name: "create-listing-details-collection"
  }, {
    path: "/create-listing/product/Confirm",
    component: _331166f5,
    name: "create-listing-product-Confirm"
  }, {
    path: "/create-listing/product/Edit",
    component: _5dcfe9b6,
    name: "create-listing-product-Edit"
  }, {
    path: "/create-listing/product/Inventory",
    component: _ecee0f5e,
    name: "create-listing-product-Inventory"
  }, {
    path: "/create-listing/product/Search",
    component: _e77fa1fa,
    name: "create-listing-product-Search"
  }, {
    path: "/create-listing/search/Inventory",
    component: _af3d3b20,
    name: "create-listing-search-Inventory"
  }, {
    path: "/profile/auctions/send-offer",
    component: _f1f39762,
    name: "profile-auctions-send-offer"
  }, {
    path: "/profile/bids/incoming",
    component: _0d38a6d8,
    name: "profile-bids-incoming"
  }, {
    path: "/profile/create-listing/drafts",
    component: _60677db2,
    children: [{
      path: "",
      component: _5eb70e6a,
      name: "profile-create-listing-drafts"
    }]
  }, {
    path: "/profile/create-listing/selling",
    component: _de93c9a4,
    name: "profile-create-listing-selling"
  }, {
    path: "/profile/inventory/confirm",
    component: _d9070d34,
    name: "profile-inventory-confirm"
  }, {
    path: "/profile/inventory/csv-drafts",
    component: _44b9683a,
    name: "profile-inventory-csv-drafts"
  }, {
    path: "/profile/inventory/draft",
    component: _24d85f47,
    name: "profile-inventory-draft"
  }, {
    path: "/profile/inventory/edit",
    component: _0ea67654,
    name: "profile-inventory-edit"
  }, {
    path: "/profile/inventory/new",
    component: _293f0346,
    name: "profile-inventory-new"
  }, {
    path: "/profile/inventory/search",
    component: _c03eeb1c,
    name: "profile-inventory-search"
  }, {
    path: "/profile/preferences/redeem-giftcard",
    component: _2f6d0916,
    name: "profile-preferences-redeem-giftcard"
  }, {
    path: "/profile/preferences/social-connect",
    component: _71b34d10,
    name: "profile-preferences-social-connect"
  }, {
    path: "/profile/rewards/faq",
    component: _76d3abc4,
    name: "profile-rewards-faq"
  }, {
    path: "/profile/security/faq",
    component: _cbf44404,
    name: "profile-security-faq"
  }, {
    path: "/profile/support/about-us",
    component: _3400ad18,
    name: "profile-support-about-us"
  }, {
    path: "/profile/support/contact-us",
    component: _148647a5,
    name: "profile-support-contact-us"
  }, {
    path: "/profile/support/faqs",
    component: _2dec1d17,
    name: "profile-support-faqs"
  }, {
    path: "/profile/support/live-chat",
    component: _50ca90b5,
    name: "profile-support-live-chat"
  }, {
    path: "/profile/trades/dashboard",
    component: _19b46e8e,
    name: "profile-trades-dashboard"
  }, {
    path: "/profile/trades/prefrences",
    component: _68764395,
    name: "profile-trades-prefrences"
  }, {
    path: "/profile/vendor-hub/application-received",
    component: _51ed0bd4,
    name: "profile-vendor-hub-application-received"
  }, {
    path: "/profile/vendor-hub/apply",
    component: _67567246,
    name: "profile-vendor-hub-apply"
  }, {
    path: "/profile/vendor-hub/faq",
    component: _30c035ee,
    name: "profile-vendor-hub-faq"
  }, {
    path: "/Sell/create-listing/CreateInventory",
    component: _f2519000,
    name: "Sell-create-listing-CreateInventory"
  }, {
    path: "/Sell/create-listing/CreateListing",
    component: _17ca1828,
    name: "Sell-create-listing-CreateListing"
  }, {
    path: "/Sell/create-listing/SellNow",
    component: _10a83738,
    name: "Sell-create-listing-SellNow"
  }, {
    path: "/trades/create-listing/ConfirmTrade",
    component: _914c075e,
    name: "trades-create-listing-ConfirmTrade"
  }, {
    path: "/trades/create-listing/CreateTrade",
    component: _a2424eea,
    name: "trades-create-listing-CreateTrade"
  }, {
    path: "/trades/create-listing/SelectTrade",
    component: _346876ea,
    name: "trades-create-listing-SelectTrade"
  }, {
    path: "/create-listing/product/collection/Confirm",
    component: _1abc616a,
    name: "create-listing-product-collection-Confirm"
  }, {
    path: "/create-listing/product/collection/Create",
    component: _30b70342,
    name: "create-listing-product-collection-Create"
  }, {
    path: "/create-listing/product/collection/Details",
    component: _e5e24828,
    name: "create-listing-product-collection-Details"
  }, {
    path: "/create-listing/product/collection/Edit",
    component: _1ddb2cd0,
    name: "create-listing-product-collection-Edit"
  }, {
    path: "/create-listing/product/collection/Inventory",
    component: _325f2986,
    name: "create-listing-product-collection-Inventory"
  }, {
    path: "/profile/create-listing/selling/confirm",
    component: _3f04111c,
    name: "profile-create-listing-selling-confirm"
  }, {
    path: "/profile/create-listing/trades/AlreadyListedModal",
    component: _707c70f3,
    name: "profile-create-listing-trades-AlreadyListedModal"
  }, {
    path: "/profile/create-listing/trades/confirmation",
    component: _8be3b05a,
    name: "profile-create-listing-trades-confirmation"
  }, {
    path: "/profile/create-listing/trades/create",
    component: _25d81652,
    name: "profile-create-listing-trades-create"
  }, {
    path: "/profile/create-listing/trades/CreateTradeSearchItem",
    component: _2227cc18,
    name: "profile-create-listing-trades-CreateTradeSearchItem"
  }, {
    path: "/profile/create-listing/trades/wants",
    component: _621c4a5b,
    name: "profile-create-listing-trades-wants"
  }, {
    path: "/profile/trades/dashboard/AllOffersItems",
    component: _0bbdf9c8,
    name: "profile-trades-dashboard-AllOffersItems"
  }, {
    path: "/profile/trades/dashboard/AllTradeListings",
    component: _417b8ee6,
    name: "profile-trades-dashboard-AllTradeListings"
  }, {
    path: "/profile/trades/dashboard/DeclineModel",
    component: _62356a67,
    name: "profile-trades-dashboard-DeclineModel"
  }, {
    path: "/profile/trades/dashboard/ExpiredOffers",
    component: _1463fc90,
    name: "profile-trades-dashboard-ExpiredOffers"
  }, {
    path: "/profile/trades/dashboard/InitialListing",
    component: _640f7c98,
    name: "profile-trades-dashboard-InitialListing"
  }, {
    path: "/profile/trades/dashboard/OfferHistory",
    component: _1fb69ea8,
    name: "profile-trades-dashboard-OfferHistory"
  }, {
    path: "/profile/trades/dashboard/OfferItems",
    component: _08601dd8,
    name: "profile-trades-dashboard-OfferItems"
  }, {
    path: "/profile/trades/dashboard/TradeListingItems",
    component: _ab47b088,
    name: "profile-trades-dashboard-TradeListingItems"
  }, {
    path: "/profile/trades/dashboard/TradeOfferItems",
    component: _c75b4638,
    name: "profile-trades-dashboard-TradeOfferItems"
  }, {
    path: "/profile/trades/dashboard/ViewAllTradeOffers",
    component: _04eefb53,
    name: "profile-trades-dashboard-ViewAllTradeOffers"
  }, {
    path: "/profile/trades/prefrences/InventoryCardItem",
    component: _3c8af13c,
    name: "profile-trades-prefrences-InventoryCardItem"
  }, {
    path: "/profile/trades/prefrences/ResetModal",
    component: _5204c80b,
    name: "profile-trades-prefrences-ResetModal"
  }, {
    path: "/profile/trades/prefrences/YourInventory",
    component: _251d22e8,
    name: "profile-trades-prefrences-YourInventory"
  }, {
    path: "/profile/vendor-selling/details/modify",
    component: _7720df47,
    name: "profile-vendor-selling-details-modify"
  }, {
    path: "/profile/create-listing/trades/wants/ViewOfferItemsModal",
    component: _2e50538d,
    name: "profile-create-listing-trades-wants-ViewOfferItemsModal"
  }, {
    path: "/profile/trades/dashboard/counter-offer/DiscardModel",
    component: _94c949fa,
    name: "profile-trades-dashboard-counter-offer-DiscardModel"
  }, {
    path: "/profile/create-listing/selling/product/edit/:id",
    component: _3e5901ec,
    name: "profile-create-listing-selling-product-edit-id"
  }, {
    path: "/profile/create-listing/selling/product/:id",
    component: _d8ac240e,
    name: "profile-create-listing-selling-product-id"
  }, {
    path: "/profile/preferences/giftcard/view-giftcard/:id?",
    component: _da48c31c,
    name: "profile-preferences-giftcard-view-giftcard-id"
  }, {
    path: "/profile/trades/dashboard/counter-offer/:id",
    component: _0804ffb5,
    name: "profile-trades-dashboard-counter-offer-id"
  }, {
    path: "/profile/purchases/summary/:id?",
    component: _597f752d,
    name: "profile-purchases-summary-id"
  }, {
    path: "/profile/trades/dashboard/:id",
    component: _a710db0e,
    name: "profile-trades-dashboard-id"
  }, {
    path: "/profile/vendor-selling/details/:id",
    component: _2254ff20,
    name: "profile-vendor-selling-details-id"
  }, {
    path: "/profile/auctions/:id",
    component: _0c65f5f2,
    name: "profile-auctions-id"
  }, {
    path: "/profile/wish-lists/:id?",
    component: _314680de,
    name: "profile-wish-lists-id"
  }, {
    path: "/User/logintoken/:logintoken?",
    component: _e11d57da,
    name: "User-logintoken-logintoken"
  }, {
    path: "/profile/bids/:id/edit",
    component: _6ba4cb71,
    name: "profile-bids-id-edit"
  }, {
    path: "/auction/:id",
    component: _ee6e06a0,
    name: "auction-id"
  }, {
    path: "/shop-by-style/:id",
    component: _7560f31c,
    name: "shop-by-style-id"
  }, {
    path: "/shop/:sku",
    component: _70f2a516,
    name: "shop-sku"
  }, {
    path: "/Auctions/:id/Bids",
    component: _01e5d8ae,
    name: "Auctions-id-Bids"
  }, {
    path: "/",
    component: _cdb78fde,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
