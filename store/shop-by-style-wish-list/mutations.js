export function setWishLists(state, wishLists) {
  state.wishLists = wishLists
}

export function addWishList(state, wishList) {
  state.wishLists.push(wishList)
}

export function updateWishList(state, wishList) {
  const found = state.wishLists.find((list) => list.id === wishList.id)
  if (found) {
    Object.assign(found, wishList)
  }
}

export function updatePrivacy(state, { wishList, privacy }) {
  const found = state.wishLists.find((list) => list.id === wishList.id)
  if (found) found.privacy = privacy
}
