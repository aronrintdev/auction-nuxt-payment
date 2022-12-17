/**
 * Add the provided order settings.
 * @param state
 * @param payload
 */
export function addOrderSettings(state, payload) {
  state.orderSettings = payload
}

/**
 * Add the provided order settings.
 * @param state
 * @param payload
 */
export function saveStatuses(state, payload) {
  const statuses = {}
  Object.keys(payload).forEach(role => {
    Object.keys(payload[role]).forEach(key => {
      if (!statuses[role])
        statuses[role] = {}
      statuses[role][key] = payload[role][key].label
    })
  })
  state.orderStatuses = statuses
}
