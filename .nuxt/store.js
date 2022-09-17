import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('../store/index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../store/wish-list/index.js'), 'wish-list/index.js')
  resolveStoreModules(require('../store/watchlist/index.js'), 'watchlist/index.js')
  resolveStoreModules(require('../store/vendor-hub/index.js'), 'vendor-hub/index.js')
  resolveStoreModules(require('../store/trades/index.js'), 'trades/index.js')
  resolveStoreModules(require('../store/tax-rate/index.js'), 'tax-rate/index.js')
  resolveStoreModules(require('../store/size/index.js'), 'size/index.js')
  resolveStoreModules(require('../store/shopping-cart/index.js'), 'shopping-cart/index.js')
  resolveStoreModules(require('../store/sell-listing/index.js'), 'sell-listing/index.js')
  resolveStoreModules(require('../store/rewards/index.js'), 'rewards/index.js')
  resolveStoreModules(require('../store/redeemed-reward/index.js'), 'redeemed-reward/index.js')
  resolveStoreModules(require('../store/profile-bids/index.js'), 'profile-bids/index.js')
  resolveStoreModules(require('../store/profile-auction/index.js'), 'profile-auction/index.js')
  resolveStoreModules(require('../store/product/index.js'), 'product/index.js')
  resolveStoreModules(require('../store/preferences/index.js'), 'preferences/index.js')
  resolveStoreModules(require('../store/order-settings/index.js'), 'order-settings/index.js')
  resolveStoreModules(require('../store/order-details/index.js'), 'order-details/index.js')
  resolveStoreModules(require('../store/listingItems/index.js'), 'listingItems/index.js')
  resolveStoreModules(require('../store/inventory/index.js'), 'inventory/index.js')
  resolveStoreModules(require('../store/heat-check/index.js'), 'heat-check/index.js')
  resolveStoreModules(require('../store/create-listing/index.js'), 'create-listing/index.js')
  resolveStoreModules(require('../store/browse/index.js'), 'browse/index.js')
  resolveStoreModules(require('../store/auth/index.js'), 'auth/index.js')
  resolveStoreModules(require('../store/auction/index.js'), 'auction/index.js')
  resolveStoreModules(require('../store/auction/actions.js'), 'auction/actions.js')
  resolveStoreModules(require('../store/auction/getters.js'), 'auction/getters.js')
  resolveStoreModules(require('../store/auction/mutations.js'), 'auction/mutations.js')
  resolveStoreModules(require('../store/auction/state.js'), 'auction/state.js')
  resolveStoreModules(require('../store/auth/actions.js'), 'auth/actions.js')
  resolveStoreModules(require('../store/auth/getters.js'), 'auth/getters.js')
  resolveStoreModules(require('../store/auth/mutations.js'), 'auth/mutations.js')
  resolveStoreModules(require('../store/auth/state.js'), 'auth/state.js')
  resolveStoreModules(require('../store/browse/actions.js'), 'browse/actions.js')
  resolveStoreModules(require('../store/browse/getters.js'), 'browse/getters.js')
  resolveStoreModules(require('../store/browse/mutations.js'), 'browse/mutations.js')
  resolveStoreModules(require('../store/browse/state.js'), 'browse/state.js')
  resolveStoreModules(require('../store/create-listing/actions.js'), 'create-listing/actions.js')
  resolveStoreModules(require('../store/create-listing/getters.js'), 'create-listing/getters.js')
  resolveStoreModules(require('../store/create-listing/mutations.js'), 'create-listing/mutations.js')
  resolveStoreModules(require('../store/create-listing/state.js'), 'create-listing/state.js')
  resolveStoreModules(require('../store/heat-check/actions.js'), 'heat-check/actions.js')
  resolveStoreModules(require('../store/heat-check/getters.js'), 'heat-check/getters.js')
  resolveStoreModules(require('../store/heat-check/mutations.js'), 'heat-check/mutations.js')
  resolveStoreModules(require('../store/heat-check/state.js'), 'heat-check/state.js')
  resolveStoreModules(require('../store/inventory/actions.js'), 'inventory/actions.js')
  resolveStoreModules(require('../store/inventory/getters.js'), 'inventory/getters.js')
  resolveStoreModules(require('../store/inventory/mutations.js'), 'inventory/mutations.js')
  resolveStoreModules(require('../store/inventory/state.js'), 'inventory/state.js')
  resolveStoreModules(require('../store/listingItems/actions.js'), 'listingItems/actions.js')
  resolveStoreModules(require('../store/listingItems/getters.js'), 'listingItems/getters.js')
  resolveStoreModules(require('../store/listingItems/mutations.js'), 'listingItems/mutations.js')
  resolveStoreModules(require('../store/listingItems/state.js'), 'listingItems/state.js')
  resolveStoreModules(require('../store/order-details/actions.js'), 'order-details/actions.js')
  resolveStoreModules(require('../store/order-details/getters.js'), 'order-details/getters.js')
  resolveStoreModules(require('../store/order-details/mutations.js'), 'order-details/mutations.js')
  resolveStoreModules(require('../store/order-details/state.js'), 'order-details/state.js')
  resolveStoreModules(require('../store/order-settings/actions.js'), 'order-settings/actions.js')
  resolveStoreModules(require('../store/order-settings/getters.js'), 'order-settings/getters.js')
  resolveStoreModules(require('../store/order-settings/mutations.js'), 'order-settings/mutations.js')
  resolveStoreModules(require('../store/order-settings/state.js'), 'order-settings/state.js')
  resolveStoreModules(require('../store/preferences/actions.js'), 'preferences/actions.js')
  resolveStoreModules(require('../store/preferences/getters.js'), 'preferences/getters.js')
  resolveStoreModules(require('../store/preferences/mutations.js'), 'preferences/mutations.js')
  resolveStoreModules(require('../store/preferences/state.js'), 'preferences/state.js')
  resolveStoreModules(require('../store/product/actions.js'), 'product/actions.js')
  resolveStoreModules(require('../store/product/getters.js'), 'product/getters.js')
  resolveStoreModules(require('../store/product/mutations.js'), 'product/mutations.js')
  resolveStoreModules(require('../store/product/state.js'), 'product/state.js')
  resolveStoreModules(require('../store/profile-auction/actions.js'), 'profile-auction/actions.js')
  resolveStoreModules(require('../store/profile-auction/getters.js'), 'profile-auction/getters.js')
  resolveStoreModules(require('../store/profile-auction/mutations.js'), 'profile-auction/mutations.js')
  resolveStoreModules(require('../store/profile-auction/state.js'), 'profile-auction/state.js')
  resolveStoreModules(require('../store/profile-bids/actions.js'), 'profile-bids/actions.js')
  resolveStoreModules(require('../store/profile-bids/getters.js'), 'profile-bids/getters.js')
  resolveStoreModules(require('../store/profile-bids/mutations.js'), 'profile-bids/mutations.js')
  resolveStoreModules(require('../store/profile-bids/state.js'), 'profile-bids/state.js')
  resolveStoreModules(require('../store/redeemed-reward/actions.js'), 'redeemed-reward/actions.js')
  resolveStoreModules(require('../store/redeemed-reward/getters.js'), 'redeemed-reward/getters.js')
  resolveStoreModules(require('../store/redeemed-reward/mutations.js'), 'redeemed-reward/mutations.js')
  resolveStoreModules(require('../store/redeemed-reward/state.js'), 'redeemed-reward/state.js')
  resolveStoreModules(require('../store/rewards/actions.js'), 'rewards/actions.js')
  resolveStoreModules(require('../store/rewards/getters.js'), 'rewards/getters.js')
  resolveStoreModules(require('../store/rewards/mutations.js'), 'rewards/mutations.js')
  resolveStoreModules(require('../store/rewards/state.js'), 'rewards/state.js')
  resolveStoreModules(require('../store/sell-listing/actions.js'), 'sell-listing/actions.js')
  resolveStoreModules(require('../store/sell-listing/getters.js'), 'sell-listing/getters.js')
  resolveStoreModules(require('../store/sell-listing/mutations.js'), 'sell-listing/mutations.js')
  resolveStoreModules(require('../store/sell-listing/state.js'), 'sell-listing/state.js')
  resolveStoreModules(require('../store/shopping-cart/actions.js'), 'shopping-cart/actions.js')
  resolveStoreModules(require('../store/shopping-cart/getters.js'), 'shopping-cart/getters.js')
  resolveStoreModules(require('../store/shopping-cart/mutations.js'), 'shopping-cart/mutations.js')
  resolveStoreModules(require('../store/shopping-cart/state.js'), 'shopping-cart/state.js')
  resolveStoreModules(require('../store/size/actions.js'), 'size/actions.js')
  resolveStoreModules(require('../store/size/getters.js'), 'size/getters.js')
  resolveStoreModules(require('../store/size/mutations.js'), 'size/mutations.js')
  resolveStoreModules(require('../store/size/state.js'), 'size/state.js')
  resolveStoreModules(require('../store/tax-rate/actions.js'), 'tax-rate/actions.js')
  resolveStoreModules(require('../store/tax-rate/getters.js'), 'tax-rate/getters.js')
  resolveStoreModules(require('../store/tax-rate/mutations.js'), 'tax-rate/mutations.js')
  resolveStoreModules(require('../store/tax-rate/state.js'), 'tax-rate/state.js')
  resolveStoreModules(require('../store/trades/actions.js'), 'trades/actions.js')
  resolveStoreModules(require('../store/trades/getters.js'), 'trades/getters.js')
  resolveStoreModules(require('../store/trades/mutations.js'), 'trades/mutations.js')
  resolveStoreModules(require('../store/trades/state.js'), 'trades/state.js')
  resolveStoreModules(require('../store/vendor-hub/actions.js'), 'vendor-hub/actions.js')
  resolveStoreModules(require('../store/vendor-hub/getters.js'), 'vendor-hub/getters.js')
  resolveStoreModules(require('../store/vendor-hub/mutations.js'), 'vendor-hub/mutations.js')
  resolveStoreModules(require('../store/vendor-hub/state.js'), 'vendor-hub/state.js')
  resolveStoreModules(require('../store/watchlist/actions.js'), 'watchlist/actions.js')
  resolveStoreModules(require('../store/watchlist/getters.js'), 'watchlist/getters.js')
  resolveStoreModules(require('../store/watchlist/mutations.js'), 'watchlist/mutations.js')
  resolveStoreModules(require('../store/watchlist/state.js'), 'watchlist/state.js')
  resolveStoreModules(require('../store/wish-list/actions.js'), 'wish-list/actions.js')
  resolveStoreModules(require('../store/wish-list/getters.js'), 'wish-list/getters.js')
  resolveStoreModules(require('../store/wish-list/mutations.js'), 'wish-list/mutations.js')
  resolveStoreModules(require('../store/wish-list/state.js'), 'wish-list/state.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../store/index.js',
      '../store/wish-list/index.js',
      '../store/watchlist/index.js',
      '../store/vendor-hub/index.js',
      '../store/trades/index.js',
      '../store/tax-rate/index.js',
      '../store/size/index.js',
      '../store/shopping-cart/index.js',
      '../store/sell-listing/index.js',
      '../store/rewards/index.js',
      '../store/redeemed-reward/index.js',
      '../store/profile-bids/index.js',
      '../store/profile-auction/index.js',
      '../store/product/index.js',
      '../store/preferences/index.js',
      '../store/order-settings/index.js',
      '../store/order-details/index.js',
      '../store/listingItems/index.js',
      '../store/inventory/index.js',
      '../store/heat-check/index.js',
      '../store/create-listing/index.js',
      '../store/browse/index.js',
      '../store/auth/index.js',
      '../store/auction/index.js',
      '../store/auction/actions.js',
      '../store/auction/getters.js',
      '../store/auction/mutations.js',
      '../store/auction/state.js',
      '../store/auth/actions.js',
      '../store/auth/getters.js',
      '../store/auth/mutations.js',
      '../store/auth/state.js',
      '../store/browse/actions.js',
      '../store/browse/getters.js',
      '../store/browse/mutations.js',
      '../store/browse/state.js',
      '../store/create-listing/actions.js',
      '../store/create-listing/getters.js',
      '../store/create-listing/mutations.js',
      '../store/create-listing/state.js',
      '../store/heat-check/actions.js',
      '../store/heat-check/getters.js',
      '../store/heat-check/mutations.js',
      '../store/heat-check/state.js',
      '../store/inventory/actions.js',
      '../store/inventory/getters.js',
      '../store/inventory/mutations.js',
      '../store/inventory/state.js',
      '../store/listingItems/actions.js',
      '../store/listingItems/getters.js',
      '../store/listingItems/mutations.js',
      '../store/listingItems/state.js',
      '../store/order-details/actions.js',
      '../store/order-details/getters.js',
      '../store/order-details/mutations.js',
      '../store/order-details/state.js',
      '../store/order-settings/actions.js',
      '../store/order-settings/getters.js',
      '../store/order-settings/mutations.js',
      '../store/order-settings/state.js',
      '../store/preferences/actions.js',
      '../store/preferences/getters.js',
      '../store/preferences/mutations.js',
      '../store/preferences/state.js',
      '../store/product/actions.js',
      '../store/product/getters.js',
      '../store/product/mutations.js',
      '../store/product/state.js',
      '../store/profile-auction/actions.js',
      '../store/profile-auction/getters.js',
      '../store/profile-auction/mutations.js',
      '../store/profile-auction/state.js',
      '../store/profile-bids/actions.js',
      '../store/profile-bids/getters.js',
      '../store/profile-bids/mutations.js',
      '../store/profile-bids/state.js',
      '../store/redeemed-reward/actions.js',
      '../store/redeemed-reward/getters.js',
      '../store/redeemed-reward/mutations.js',
      '../store/redeemed-reward/state.js',
      '../store/rewards/actions.js',
      '../store/rewards/getters.js',
      '../store/rewards/mutations.js',
      '../store/rewards/state.js',
      '../store/sell-listing/actions.js',
      '../store/sell-listing/getters.js',
      '../store/sell-listing/mutations.js',
      '../store/sell-listing/state.js',
      '../store/shopping-cart/actions.js',
      '../store/shopping-cart/getters.js',
      '../store/shopping-cart/mutations.js',
      '../store/shopping-cart/state.js',
      '../store/size/actions.js',
      '../store/size/getters.js',
      '../store/size/mutations.js',
      '../store/size/state.js',
      '../store/tax-rate/actions.js',
      '../store/tax-rate/getters.js',
      '../store/tax-rate/mutations.js',
      '../store/tax-rate/state.js',
      '../store/trades/actions.js',
      '../store/trades/getters.js',
      '../store/trades/mutations.js',
      '../store/trades/state.js',
      '../store/vendor-hub/actions.js',
      '../store/vendor-hub/getters.js',
      '../store/vendor-hub/mutations.js',
      '../store/vendor-hub/state.js',
      '../store/watchlist/actions.js',
      '../store/watchlist/getters.js',
      '../store/watchlist/mutations.js',
      '../store/watchlist/state.js',
      '../store/wish-list/actions.js',
      '../store/wish-list/getters.js',
      '../store/wish-list/mutations.js',
      '../store/wish-list/state.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
