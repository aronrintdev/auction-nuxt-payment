export function addInventoryToDraft(state, payload) {
    state.draftInventories.push(payload)
}

export function deleteInventoryFromDraft(state, payload) {
    state.draftInventories.splice(state.draftInventories.indexOf(payload), 1)
}

export function updateInventoryInDraft(state, payload) {
    state.draftInventories[payload.index] = payload.data
}

export function deleteAllDrafts(state) {
    state.draftInventories = []
}

export function addInventoriesToCsvDraft(state, payload) {
    state.csvDraftInventories = state.csvDraftInventories.concat(payload)
}

export function updateInventoryFieldInCsvDraft(
    state, { inventory, key, value }
) {
    const index = state.csvDraftInventories.indexOf(inventory)
    state.csvDraftInventories[index][key] = value
}

export function updateInventoryInCsvDraft(state, { inventory, value }) {
    const index = state.csvDraftInventories.indexOf(inventory)
    Object.assign(state.csvDraftInventories[index], value)
}

export function deleteCsvDrafts(state, ids) {
    state.csvDraftInventories = state.csvDraftInventories.filter(
        (i, index) => !ids.includes(index)
    )
}

export function setReferrer(state, referrer) {
    state.inventoryPageReferrer = referrer
}
export function setPackageConditions(state, payload) {
    state.packageConditions = payload
}

export function setColors(state, payload) {
    state.colors = payload
}

export function setLastUploadedCSVFile(state, filename) {
  state.lastUploadedCSVFile = filename
}
