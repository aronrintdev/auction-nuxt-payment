/**
 * Set Selected Items
 * @param state
 * @param val
 */
export function setSelectedItems(state, val) {
  state.selectedItems = val
}

/**
 *  Set Single item filters
 * @param state
 * @param val
 */
export function setSingleItemFilters(state, val) {
  state.singleItemFilters = val
}



/**
 * Set Edit Items
 * @param state
 * @param val
 */
export function setEditItems(state, val) {
  state.editItems = val
}

/**
 * Set Collection state
 * @param state
 * @param val
 */
export function setCollectionState(state, val) {
  state.collectionState = val
}

/**
 * Set Collection states
 * @param state
 * @param val
 */
export function setCollectionStates(state, val) {
  state.collectionStates = val
}


/**
 * Set Auction items
 * @param state
 * @param val
 */
export function setAuctionItems(state, val) {
  state.auctionItems = val
}

/**
 * Selected inventories to state
 * @param state
 * @param val
 */
export function addSelectedInventoryProducts(state, val) {
  state.selectedInventoryProducts.push(val)
}

/**
 * Set Selected inventory products
 * @param state
 * @param val
 */
export function setSelectedInventoryProducts(state, val) {
  state.selectedInventoryProducts = val
}
/**
 * Edit single Auction from auction items
 * @param state
 * @param val
 */
export function setSingleAuctionItem(state, val) {
  state.auctionItems = state.auctionItems.map( a => {
    if (a.id === val.id){
      a = {...a,...val}
    }
    return a
  })
}

/**
 * Add auction item to auctions
 * @param state
 * @param val
 */
export function addItemToAuctions(state, val) {
  state.auctionItems.push(val)
}

/**
 * Add auction item to Collection type Auction
 * @param state
 * @param val
 */
export function addItemToCollection(state, val) {
  state.auctionItems[0].items.push(val)
}

/**
 * Delete item from collection
 * @param state
 * @param val
 */
export function deleteFromCollection(state, val) {
  state.auctionItems[0].items = state.auctionItems[0].items.filter((a, ind) => ind !==val)
}
/**
 * Change item quantity
 * @param state
 * @param val
 */
export function itemQuantityChange(state, val) {
  state.auctionItems[0].items = state.auctionItems[0].items.map((a) => {
    if (a.id === val.id){
      a.quantity = val.quantity
    }
    return a
  })
}

/**
 * Set selected auction Type
 * @param state
 * @param val
 */
export function setAuctionType(state, val) {
  state.auctionType = val
}

/**
 * Store acitve product used for creating new inventory
 * @param state
 * @param val
 */
 export function setActiveInventoryProduct(state, val) {
  state.activeInventoryProduct = val
}

/**
 * Set active product inventory for edit
 * @param state
 * @param val
 */
 export function setEditProductInventory(state, val) {
  state.editProductInventory = val
}

/**
 * Delete item from AuctionItems
 * @param state
 * @param val
 */
 export function deleteItemFromNonInventoryAuctions(state, id) {
  const items = state.nonInventoryAuctionItems.slice()
  const idx = items.findIndex(item => item.id === id)
  items.splice(idx, 1)
  state.nonInventoryAuctionItems = items
}

/**
 * Add new single type non-inventory auction to the state
 * @param state
 * @param val
 */
 export function addItemToNonInventoryAuctions(state, val) {
  state.nonInventoryAuctionItems.push(val)
}

/**
 * Set single type non-inventory auctions
 * @param state
 * @param val
 */
 export function setNonInventoryAuctionItems(state, val) {
  state.nonInventoryAuctionItems = val
}

/**
 * Add new product to non-inventory collection auction
 * @param state
 * @param val
 */
 export function addItemToNonInventoryCollectionAuction(state, val) {
  if (!state.nonInventoryCollectionAuction.items) {
    state.nonInventoryCollectionAuction.items = []
  }
  state.nonInventoryCollectionAuction.items.push(val)
}

/**
 * Set non-inventory collection auction in the state
 * @param state
 * @param val
 */
 export function setNonInventoryCollectionAuction(state, val) {
  state.nonInventoryCollectionAuction = val
}

/**
 * Delete item from nonInventorycollectionAuction
 * @param state
 * @param val
 */
 export function deleteItemFromNonInventoryCollectionAuction(state, id) {
  const items = state.nonInventoryCollectionAuction.items.slice()
  const idx = items.findIndex(item => item.id === id)
  items.splice(idx, 1)
  state.nonInventoryCollectionAuction = {
    ...state.nonInventoryCollectionAuction,
    items,
  }
}

// Store similar products
export function storeSimilarProduct(state, val){
  state.similarProduct = val
}