export default function () {
  return {
    singleItemFilters: {},
    selectedItems: [],
    selectedInventoryProducts: [],
    editItem: null,
    auctionItems: [],
    auctionType: null,
    collectionState: 'add',
    collectionStates: ['add', 'details', 'confirm'],
    activeInventoryProduct: {},
    editProductInventory: {}, // Inventory product which is in the edit mode
    nonInventoryAuctionItems: [], // Single auctions with no inventories
    nonInventoryCollectionAuction: {}, // Collection auctions with no inventories
  }
}
