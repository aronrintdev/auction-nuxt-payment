<template>
  <!-- Dynamic Component Rendering of OfferSummary, ListItemOptionsMenu -->
  <component :is="renderedComponent"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OfferSummary from '~/components/checkout/place-offer/mobile/OfferSummary'
import ListItemOptionsMenu from '~/components/checkout/place-offer/mobile/ListItemOptionsMenu'

export default {
  name: 'ShoppingBagOrder',
  components: {
    OfferSummary,
    ListItemOptionsMenu
  },
  data: () => {
    return {
      renderedComponent: OfferSummary.name,
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>
