<template>
  <!-- Parent component of Redeem Gift card Section -->
  <!-- Used to dynamically switch between components -->
  <component :is="renderedComponent"></component>
</template>
<script>
import RedeemGiftCard from './RedeemGiftCard.vue'
import GiftCardRedeemSuccess from './GiftCardRedeemSuccess.vue'
export default {
  name: 'GiftCard',
  
  components: {
    RedeemGiftCard,
    GiftCardRedeemSuccess
  },
  
  data: () => {
    return {
      renderedComponent: RedeemGiftCard.name
    }
  },
  
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  }
}
</script>
