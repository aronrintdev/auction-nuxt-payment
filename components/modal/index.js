export { default as AlertModal } from '~/components/modal/Alert'
export { default as ConfirmModal } from '~/components/modal/Confirm'
export { default as InventoryCsvUploadModal } from '~/components/modal/InventoryCsvUpload'
export { default as NewProductSuggestedModal } from '~/components/modal/NewProductSuggested'
export { default as ListingItemProductSuggestion } from '~/components/modal/ListingItemProductSuggestion'
export { default as ClarificationScreen } from '~/components/modal/ClarificationScreen'
export default () => {
  // eslint-disable-next-line no-console
  console.error(
    "You imported default instead of a component, make sure to use: `import { X } from 'components/modal'`"
  )
}
