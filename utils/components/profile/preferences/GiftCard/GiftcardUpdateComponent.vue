<template>
  <!-- Parent component of View Gift card Section -->
  <!-- Used to dynamically switch between components -->
  <component :is="renderedComponent"></component>
</template>

<script>
import NewPaymentInfo from './AddFunds/NewPaymentInfo.vue'
import AddFundButton from './AddFunds/AddFundButton.vue'
import SavedUserPayments from './AddFunds/SavedUserPayments.vue'
import AddFundPaymentCard from './AddFunds/AddFundPaymentCard.vue'
import EditCardPayment from './AddFunds/EditCardPayment.vue'
export default {
  
  name: 'GiftcardUpdateComponent',

  components: {
    AddFundButton,
    NewPaymentInfo,
    SavedUserPayments,
    AddFundPaymentCard,
    EditCardPayment
  },

  data() {
    return {
      renderedComponent: AddFundButton.name
    }
  },

  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })

    // On back button click update
    this.$auth.$storage.watchState('backTo', newValue => {
      if(newValue === 'SavedUserPayments'){
        this.renderedComponent = SavedUserPayments.name
      }

      if(newValue === 'NewPaymentInfo'){
        this.renderedComponent = NewPaymentInfo.name
      }

      if(newValue === 'AddFundButton'){
        this.renderedComponent = AddFundButton.name
      }
     })
  },
}
</script>