<template>
  <b-tr
    v-show="
      item.status === pendingOffer ||
      (item.status === acceptedOffer &&
        item.sell_details &&
        item.sell_details.vendor_id === $auth.user.vendor.id)
    "
    class="bg-white vd-selling-bt"
  >
    <b-td>
      <div class="vd-sell-product-img text-center">
        <b-row>
          <b-col md="2">
            <b-img
              :src="require('~/assets/img/icons/selling-outline.png')"
              fluid
              class="w-100"
              alt="offer-img"
            >
            </b-img>
          </b-col>
          <b-col md="6" class="m-auto">
            <span v-if="highestOffer && item.id === highestOffer.id" class="offer-value">
              {{ $t('selling_page.highest_offer') }}
            </span>
          </b-col>
        </b-row>
      </div>
    </b-td>

    <b-td class="vd-date-only align-self-center text-center text-bold">
      <span class="table-text text-center">&dollar;{{ item.bid_price | formatPrice }}</span>
    </b-td>

    <b-td class="vd-invoce-qty-total align-self-center text-center">
      <span class="table-text text-center">{{ item.created_at | formatDate }}</span>
    </b-td>

    <b-td class="vd-invoce-qty-total align-self-center text-center">
      <div class="status-wrapper w-100">
        <span class="text-bold">
          <b-button
            id="offers"
            :variant="item.status === 'declined' ? 'declined' : 'awaiting'"
            class="text-bold text-capitalize"
            :class="item.status === 'declined' ? 'text-danger' : 'text-muted'"
          >
            {{ getOfferStatus }}</b-button
          ><br />
          <span class="offer-text text-center">
            {{ $t('selling_page.expires_in') }} {{ remainingTime }}
          </span>
        </span>
      </div>
    </b-td>

    <b-td class="vd-invoce-qty-total text-center">
      <div v-if="item.status === 'pending'" class="action-wrapper">
        <b-button
          variant="outline-success"
          class="success-btn"
          @click="
            acceptOrDeclineOffer({
              id: item.id,
              amount: item.bid_price,
              type: accept,
            })
          "
        >
          {{ $t('selling_page.accept') }}
        </b-button>
        <b-button
          variant="outline-danger"
          class="decline-btn"
          @click="
            acceptOrDeclineOffer({
              id: item.id,
              amount: item.bid_price,
              type: decline,
            })
          "
        >
          {{ $t('selling_page.decline') }}
        </b-button>
      </div>
    </b-td>
  </b-tr>
</template>

<script>
import {
  PENDING_STATUS,
  AWAITING_APPROVAL,
  ACCEPT,
  DECLINE,
  ACCEPTED_OFFER,
  PENDING_OFFER,
} from '~/static/constants'
export default {
  name: 'OfferListItem',

  props: {
    item: {
      type: Object,
      default: () => {},
    },

    highestOffer: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      // Offer status
      awaiting: AWAITING_APPROVAL,
      pending: PENDING_STATUS,
      accept: ACCEPT,
      decline: DECLINE,
      acceptedOffer: ACCEPTED_OFFER,
      pendingOffer: PENDING_OFFER,
    }
  },

  computed: {
    getOfferStatus: (vm) => {
      if (vm.item.status === vm.pending) {
        return vm.awaiting
      }
      return vm.item.status
    },
    remainingTime: (vm) => {
      if (vm.item.created_at) {
        if (new Date(vm.item.created_at) > new Date()) {
          return 'expired'
        } else {
          const date1 = new Date(vm.item.created_at)
          const date2 = new Date()
          // One day in milliseconds
          const oneDay = 1000 * 60 * 60 * 24
          // Calculating the time difference between two dates
          const diffInTime = date2.getTime() - date1.getTime()
          // Calculating the no. of days between two dates
          const diffInDays = Math.round(diffInTime / oneDay)

          return `${diffInDays} ${vm.$t('selling_page.days')}`
        }
      }
    },
  },

  methods: {
    // Accept offer on click button
    acceptOrDeclineOffer(val) {
      this.$emit('acceptOffer', { val })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
#offers
  width: 176px
  height: 34px
  font-style: normal
  @include body-4-normal
.offer-text
  font-style: normal
  @include body-5-normal
  color: $color-gray-5
.table-text
  font-style: normal
  @include body-4-normal
  color: $color-black-1
.offer-value
  font-style: normal
  @include body-4-normal
  color: $color-green-19
</style>
