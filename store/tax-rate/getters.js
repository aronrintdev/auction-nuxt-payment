import { TAX_RATE_FALLBACK_PERCENTAGE } from '~/static/constants'

/**
 * Returns the user's tax rate based on the billing address zip code.
 * @param state
 * @returns {object}
 */
export function getTaxRate(state) {
  if (Object.keys(state.taxRate).length) {
    return state.taxRate.tax_rate / 100
  }

  return TAX_RATE_FALLBACK_PERCENTAGE
}
