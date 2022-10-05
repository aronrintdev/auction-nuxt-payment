<template>
  <b-modal
    id="payment-methods-modal"
    body-class="p-0"
    hide-footer
    :size="modalHeaderSize"
    @hidden="clearDetails"
  >
    <template #modal-title class="text-capitalize p-3">
      <h4 class="text-capitalize text-bold">{{ modalHeader.title }}</h4>
    </template>
    <div v-if="type === 'addCards'" class="modal-body">
      <b-card title="Card Title" no-body>
        <!-- Tabs -->
        <b-tabs v-if="modalHeader.showTabs" card no-nav-style>
          <!-- Credit Debit Card -->
          <b-tab
            class="text-muted"
            :active="tabIndex === 0"
            @click="updatePaymentMethod(0)"
          >
            <template #title class="Tab 1">
              {{ $t('preferences.payments.credit_debit_card') }}
            </template>
          </b-tab>
          <!-- ./Credit DebitCard -->
          <b-tab :active="tabIndex === 1" @click="updatePaymentMethod(1)">
            <template #title class="Tab 2 text-muted d-none">
              {{ $t('preferences.payments.redeem_gift_card') }}
            </template>
          </b-tab>
        </b-tabs>
        <!-- Tabs -->
        <!-- Content -->
        <b-card-text>
          <Cards v-if="tabIndex === 0" />
          <GiftCard v-if="tabIndex === 1" />
        </b-card-text>
        <!-- Content -->
      </b-card>
    </div>
    <div v-if="type === 'purchaseGiftCard'">
      <b-card title="Card Title" no-body>
        <GiftCardPurchaseComponent />
      </b-card>
    </div>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cards from './Cards.vue'
import GiftCard from './GiftCard.vue'
import GiftCardPurchaseComponent from './Purchase/GiftCardPurchaseComponent.vue'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'PaymentMethodsModal',

  components: {
    Cards,
    GiftCard,
    GiftCardPurchaseComponent,
  },

  mixins: [emitEvent],

  props: {
    type: {
      type: String,
      default: () => {
        return ''
      },
    },
  },

  data() {
    return {
      tabIndex: 0,
    }
  },

  computed: {
    ...mapGetters({
      modalHeader: 'preferences/getModalHeader',
    }),
    modalHeaderSize: (vm) => {
      return vm.modalHeader.size || 'md'
    },
  },

  methods: {
    ...mapActions({
      removeGiftCardValues: 'preferences/removeGiftCardValues',
    }),
    // Update the tab value
    updatePaymentMethod(val) {
      this.tabIndex = val
    },
    // Clear the stored details.
    clearDetails() {
      this.$nuxt.$emit('reloadPaymentMethods')
      this.removeGiftCardValues({})
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.backtext
  font-style: normal
  @include body-5-medium
  color: $color-gray-47
</style>
