/**
 * Retrieve the main images of product.
 * @param state
 * @returns {[{'name': string, 'image' : string, 'border': string}]}
 */
export function getMainImages(state) {
  return state.mainImages
}

/**
 * Retrieve the additional images of product.
 * @param state
 * @returns {[{'name': string, 'image' : string, 'border': string}]}
 */
export function getAdditionalImages(state) {
  return state.additionalImages
}

/**
 * Retrieve selected images.
 * @param state
 * @returns {[{'name': string, 'image' : string, 'border': string}]}
 */
export function getSelectedImages(state) {
  return state.selectedImages
}

export function getCheckoutStatus(state) {
  return state.processCheckout
}

export function getSku(state) {
  return state.sku
}
