export function setWishLists(state, wishLists) {
  state.shopByStyleWishLists = wishLists
}

export function addWishList(state, wishList) {
  state.shopByStyleWishLists.push(wishList)
}

export function updateWishList(state, wishList) {
  const found = state.shopByStyleWishLists.find((list) => list.id === wishList.id)
  if (found) {
    Object.assign(found, wishList)
  }
}

export function updatePrivacy(state, { wishList, privacy }) {
  const found = state.shopByStyleWishLists.find((list) => list.id === wishList.id)
  if (found) found.privacy = privacy
}
