/**
 * Return the vendorCommission and global commission
 * @param state 
 * @returns {object}
 */
export function getCommission(state) {
  return {
    vendorCommission: state.vendorCommission,
    globalCommission: state.globalCommission,
  }
}