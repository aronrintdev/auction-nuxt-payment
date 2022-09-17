export default function () {
  return {
    // State to store the current displaying product adn details
    activeProduct: {},
    // State to store the current products sizes array
    activeSizes: [],
    // Currently selected product's sku
    activeSku: false,
    // Currently selected product's category
    activeCategory: false,
    // Sneakers items to show in the homepage are loaded and stored in products[]
    products: [],
    // Apparel items to show in the homepage are loaded and stored in apparel[]
    apparel: [],
    // Accessories items to show in the homepage are loaded and stored in accessories[]
    accessories: [],
  }
}
