/**
 * Get the list items in temporary draft.
 * @param state  
 */
export function getListingDrafts(state) {
  return state.draftListing
}

/**
 * Find the temporary draft item by index
 * @param state
 */
export function findDraftItem(state) {
  return (index) => {
    return state.draftListing[index]
  }
}

/**
 * Get the listing items saved as drafts.
 * @param state 
 * @returns 
 */
export function listingSavedAsDraft(state){
  return state.listingSavedAsDraft
}