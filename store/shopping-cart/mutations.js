/**
 * Add product to shopping cart.
 * @param state
 * @param product
 */
export function addProduct(state, product) {
  state.shoppingCart.push(product)
}

/**
 * Remove the provided product from the shopping cart.
 * @param state
 * @param product
 */
export function removeProduct(state, product) {
  state.shoppingCart.splice(state.shoppingCart.indexOf(product), 1)
}

/**
 * Remove all the provided products from the shopping cart.
 * @param state
 * @param products
 */
export function removeProvidedProducts(state, products) {
  products.forEach(product => {
    state.shoppingCart = state.shoppingCart.filter(item => item.id !== product.id)
  })
}

/**
 * Remove all products from the shopping cart.
 * @param state
 * @param product
 */
export function removeProducts(state, product) {
  state.shoppingCart = []
}

/**
 * Increment the provided product's quantity.
 * @param state
 * @param product
 */
export function incrementQuantity(state, product) {
  state.shoppingCart[state.shoppingCart.indexOf(product)].quantity++
}

/**
 * Decrement the provided product's quantity.
 * @param state
 * @param product
 */
export function decrementQuantity(state, product) {
  state.shoppingCart[state.shoppingCart.indexOf(product)].quantity--
}
