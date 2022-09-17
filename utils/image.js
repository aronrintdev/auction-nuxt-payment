import {API_PROD_URL} from '~/static/constants/environments'

export const getProductImageURL = (product, width) => {
  return `${API_PROD_URL}/${product.category}/${product.sku}/image${
    width ? '?width=' + width : ''
  }`
}
