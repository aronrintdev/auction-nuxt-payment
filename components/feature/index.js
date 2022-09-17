export { default as FeatureBenefits } from '~/components/feature/Benefits'
export { default as FeatureBanner } from '~/components/feature/Banner'
export { default as FeatureBackButton } from '~/components/feature/BackButton'
export { default as FeatureStepCard } from '~/components/feature/StepCard'
export { default as FeatureContentWrapper } from '~/components/feature/ContentWrapper'
export { default as FeatureTitle } from '~/components/feature/Title'
export { default as FeatureBrowseSection } from '~/components/feature/BrowseSection'
export { default as FeatureCardHoverable } from '~/components/feature/CardHoverable'

export default () => {
  // eslint-disable-next-line no-console
  console.error(
    "You imported default instead of a component, make sure to use: `import { X } from 'components/feature'`"
  )
}
