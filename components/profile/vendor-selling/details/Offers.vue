<template>
  <b-row class="p-md-4 p-1 vd-selling-details">
    <b-col md="12" class="offers-section">
      <p class="body-15-bold text-black font-secondary">
        <span class="">{{
            $t('selling_page.offers_count', {
              count: status === delisted ? 0 : totalOffer,
            })
          }}</span>
        <span class="offer-heading">
          {{ $t('products.offers') }}
        </span>
      </p>
      <div class="text-bold min-offer-text">
        {{ $t('selling_page.min_offers') }}
        <span v-if="status !== delisted" class="show-amount"
          >&dollar;{{ minimumOffer | formatPrice }}
        </span>
      </div>
    </b-col>

    <b-col md="12 mt-3 offers-table">
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


    <template v-if="!offers || !offers.length || status === delisted">
      <div class="no-offers-placed align-items-center text-center justify-content-center w-100">
        <p v-if="status === delisted" class="text-center d-flex justify-content-center w-100">
          {{ $t('selling_page.product_is_delisted') }}</p>
        <p>{{ $t('selling_page.no_offers_placed') }}</p>
      </div>
    </template>

    <template v-else>

      <OfferGrid
          v-for="(itemGrid, indexGrid) in offers"
          :key="indexGrid"
          :highestOffer="highestOffer"
          :offer="itemGrid"
          class="offer-grid"
          @confirmation="showAcceptConfirmation"
      />
    </template>

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

    <!-- vue bottom sheet for accept/decline confirmation -->
    <vue-bottom-sheet
      id="offer-bottom-sheet"
      ref="offerActionConfirmation"
      max-width="100vw"
      max-height="25vh"
      :rounded="true"
    >
      <OfferConfirmation :action="actionType" @confirm="confirmOfferAction" @cancel="cancelOfferAction" />
    </vue-bottom-sheet>
    <!-- vue bottom sheet for accept/decline confirmation ends -->
  </b-row>
</template>

<script>
import OfferListItem from './OfferList.vue'
import OfferGrid from './OffersGrid.vue'
import OfferConfirmation from './OfferConfirmation.vue'
import { ConfirmModal } from '~/components/modal'
import { DELISTED, PENDING_OFFER, ACCEPTED_OFFER } from '~/static/constants'
export default {
  name: 'Offers',

  components: {
    OfferListItem,
    ConfirmModal,
    OfferGrid,
    OfferConfirmation
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

    highestOffer: {
      type: Object,
      default: () => {}
    }
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
      offerConfirmationAction: '',
      selectedOffer: null
    }
  },

  computed: {
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
        return isFinite(Math.min(...vm.value)) ? Math.min(...vm.value) : 0
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

    showConfirmation: (vm) => {
      return !!vm.actionType
    }
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
    onConfirm(val) {
      this.$axios
        .put(`/listing-items/offers/${this.actionType}/${this.offerId}`)
        .then((res) => {
          if(!val){
            this.$toasted.success(this.$t(res.data.message))
          }
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

    showAcceptConfirmation({action, id}){
      this.actionType = action
      this.offerId = id

      if(this.showConfirmation){
        this.$refs.offerActionConfirmation.open()
      }
    },

    confirmOfferAction(){
      this.onConfirm('closeToasted')
      this.cancelOfferAction()
    },

    cancelOfferAction(){
      this.actionType = ''
      this.offerId = null
      this.$refs.offerActionConfirmation.close()
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
// Media query
@media (min-width:769)
  .table-responsive-view
    display: inline-table
// Media query
@media (min-width: 576px)
  .offer-text,
  .offers-table
    display: block
  .offer-heading,
  .offer-grid,
  .no-offers-placed
    display: none

@media (max-width: 576px)
  .offer-text,
  .offers-table
    display: none
  .offer-grid,
  .no-offers-placed
    display: block
  .offer-heading
    display: block
    font-family: $font-montserrat
    font-style: normal
    @include body-4-medium
    color: $color-black-1
  .offers-section
    margin-top: 1.5rem
  .min-offer-text
    font-family: $font-montserrat
    font-style: normal
    @include body-9-normal
    color: $color-gray-6
    .show-amount
      display: none
#offer-bottom-sheet::v-deep
  .bottom-sheet__content
    overflow-y: hidden
    height: 150px
.no-offers-placed
  margin-top: 3rem
  margin-bottom: 10rem
  font-family: $font-montserrat
  font-style: normal
  @include body-17-medium
  color: $color-gray-5
</style>
