/**
 * Retrieve the shopping cart products.
 * @param state
 * @returns {[{image: string, quantity: number, price: number, name: string, colorWay: string, id: number, sku: string},{image: string, quantity: number, price: number, name: string, colorWay: string, id: number, sku: string},{image: string, quantity: number, price: number, name: string, colorWay: string, id: number, sku: string},{image: string, quantity: number, price: number, name: string, colorWay: string, id: number, sku: string}]}
 */
export function getShoppingCart(state) {
  return state.shoppingCart
}
