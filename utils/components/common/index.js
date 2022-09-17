export { default as BulkSelectToolbar } from '~/components/common/BulkSelectToolbar'
export { default as Button } from '~/components/common/Button'
export { default as CheckboxSwitch } from '~/components/common/CheckboxSwitch'
export { default as CustomSelect } from '~/components/common/CustomSelect'
export { default as FilterCollapsible } from '~/components/common/FilterCollapsible'
export { default as Icon } from '~/components/common/Icon'
export { default as Loader } from '~/components/common/Loader'
export { default as Meter } from '~/components/common/Meter'
export { default as Modal } from '~/components/common/Modal'
export { default as NavGroup } from '~/components/common/NavGroup'
export { default as Pagination } from '~/components/common/Pagination'
export { default as SearchInput } from '~/components/common/SearchInput'
export { default as ShareButton } from '~/components/common/ShareButton'
export { default as SliderInput } from '~/components/common/SliderInput'
export { default as CustomSelectwithCheckbox } from '~/components/common/CustomSelectwithCheckbox'
// form elements
export { default as FormInput } from '~/components/common/form/Input'
export { default as FormDropdown } from '~/components/common/form/Dropdown'
export { default as FormCheckboxGroup } from '~/components/common/form/CheckboxGroup'
export { default as EmailInputTags } from '~/components/common/form/EmailInputTags'
export default () => {
  // eslint-disable-next-line no-console
  console.error(
    "You imported default instead of a component, make sure to use: `import { X } from 'components/common'`"
  )
}
