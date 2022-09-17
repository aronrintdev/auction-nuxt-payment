<template>
  <b-row class="p-md-4 p-2 vd-selling-details">
    <b-col md="12">
      <p class="purchase-history-summary text-bold mb-0 offers-heading">
        {{
          $t('selling_page.offers_count', {
            count: status === delisted ? 0 : totalOffer,
          })
        }}
      </p>
      <div class="text-bold">
        {{ $t('selling_page.min_offers') }}
        <span v-if="minimumOffer && status !== delisted"
          >&dollar;{{ minimumOffer | formatPrice }}</span
        >
      </div>
    </b-col>

    <b-col md="12 mt-3">
      <b-table-simple borderless responsive>
        <b-thead>
          <b-tr class="text-center vd-selling-TblHead">
            <b-th scope="col" class="text-start"></b-th>
            <b-th scope="col">{{ $t('selling_page.offer_amount') }}</b-th>
            <b-th scope="col">{{ $t('selling_page.offer_date') }}</b-th>
            <b-th scope="col">{{ $t('selling_page.status') }}</b-th>
            <b-th scope="col">{{ $t('selling_page.actions') }}</b-th>
          </b-tr>
        </b-thead>

        <b-tbody>
          <template v-if="!offers || !offers.length || status === delisted">
            <b-tr class="vd-selling-bt">
              <b-td colspan="5" class="text-center text-bold text-muted">
                <p v-if="status === delisted">
                  {{ $t('selling_page.product_is_delisted') }}
                </p>
                {{ $t('selling_page.no_offers_placed') }}
              </b-td>
            </b-tr>
          </template>
          <template v-else>
            <OfferListItem
              v-for="(item, index) in offers"
              :key="index"
              :item="item"
              :highestOffer="highestOffer"
              @acceptOffer="acceptOrDeclineOffer"
            />
          </template>
        </b-tbody>
      </b-table-simple>
    </b-col>

    <!-- Accept Offer -->
    <ConfirmModal
      id="accept-offer-modal"
      :message="
        $t('selling_page.offer.content', {
          type: acceptOrDecline,
          price: amount,
        })
      "
      :confirmLabel="$t('selling_page.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- Accept Offer -->

    <!-- Reject Offer -->
    <ConfirmModal
      id="reject-offer-modal"
      :message="
        $t('selling_page.offer.reject_content', {
          type: acceptOrDecline,
          price: amount,
        })
      "
      :confirmLabel="$t('selling_page.confirm')"
      @confirm="onConfirm"
      @cancel="onConfirmDiscard"
    />
    <!-- ./Reject Offer -->
  </b-row>
</template>

<script>
import OfferListItem from './OfferList.vue'
import { ConfirmModal } from '~/components/modal'
import { DELISTED, PENDING_OFFER, ACCEPTED_OFFER } from '~/static/constants'
export default {
  name: 'Offers',

  components: {
    OfferListItem,
    ConfirmModal,
  },

  props: {
    offers: {
      type: Array,
      default: () => [],
    },

    status: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      acceptOrDecline: null,
      amount: null,
      offerId: null,
      actionType: null,
      delisted: DELISTED,
      pendingOffer: PENDING_OFFER,
      acceptedOffer: ACCEPTED_OFFER,
    }
  },

  computed: {
    // Highest offer object
    highestOffer: (vm) => {
      if (vm.offers && vm.offers.length > 1) {
        return vm.offers
          .filter(
            (i) =>
              i.status === vm.pendingOffer ||
              (i.status === vm.acceptedOffer &&
                i.sell_details &&
                i.sell_details.vendor_id === vm.$auth.user.vendor.id)
          )
          .reduce((a, b) => (Number(a.bid_price) > Number(b.bid_price) ? a : b))
      }
      if (vm.offers && vm.offers.length === 1) {
        return vm.offers[0]
      }
    },

    value: (vm) => {
      if (vm.offers && vm.offers.length >= 1) {
        return vm.offers
          .filter(
            (i) =>
              i.status === vm.pendingOffer ||
              (i.status === vm.acceptedOffer &&
                i.sell_details &&
                i.sell_details.vendor_id === vm.$auth.user.vendor.id)
          )
          .map((d) => d.bid_price)
      }
      return 0
    },
    // Get the min Offer
    minimumOffer: (vm) => {
      if (vm.offers && vm.offers.length >= 1) {
        return Math.min(...vm.value)
      }
      return 0
    },

    totalOffer: (vm) => {
      let offer = 0
      if (vm.offers && vm.offers.length) {
        vm.offers.forEach((element) => {
          if (
            element.status === vm.pendingOffer ||
            (element.status === vm.acceptedOffer &&
              element.sell_details &&
              element.sell_details.vendor_id === vm.$auth.user.vendor.id)
          ) {
            offer = offer + 1
          }
        })
      }
      return offer
    },
  },

  methods: {
    // on accept offer emit.
    acceptOrDeclineOffer({ val }) {
      this.offerId = val.id
      this.actionType = val.type
      this.amount = this.$root.$options.filters.formatPrice(val.amount)
      val.type === 'accept'
        ? this.$bvModal.show('accept-offer-modal')
        : this.$bvModal.show('reject-offer-modal')
    },

    // On accept offer confirm.
    onConfirm() {
      this.$axios
        .put(`/listing-items/offers/${this.actionType}/${this.offerId}`)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$emit('reloadData')
        })
        .catch((err) => {
          this.$logger.logToServer('Offer Accept/ Reject Error', err.response)
        })
    },

    // On discard
    onConfirmDiscard() {
      this.offerId = null
      this.amount = null
    },
  },
}
</script>

<style lang="sass" scoped>
@media (min-width:769)
  .table-responsive-view
    display: inline-table
</style>