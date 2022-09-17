export function getDrafts(state) {
    return state.draftInventories
}

export function findDraftItem(state) {
    return (index) => {
        return state.draftInventories[index]
    }
}

export function getCsvDrafts(state) {
    return state.csvDraftInventories
}

export function getReferrer(state) {
    return (state.inventoryPageReferrer) ?
        state.inventoryPageReferrer : '/profile/inventory'
}
export function getPackageConditions(state) {
    return state.packageConditions
}

export function getColors(state) {
    return state.colors
}