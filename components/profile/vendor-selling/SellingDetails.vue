<template>
  <b-col cols="12" class="vd-selling mb-4">
    <b-row class="heading-row">
      <!-- Heading -->
      <div
        class="
          col-12
          mt-md-4 mt-2
          vd-selling-heading
          mobile
          d-flex
          justify-content-between
          border-bottom
          py-2
        "
      >
        <span role="button" @click="moveBack()">
          <img
            :src="require('~/assets/img/icons/back.svg')"
            alt="back-arrow"
            class="float-left"
          />
        </span>
        <span class="selling-heading">
          {{ $t('selling_page.selling_page_heading') }}
        </span>
        <span class="filter-wrapper" role="button">
          <img
            class="mobile-filter"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </div>
      <!-- ./Heading -->
    </b-row>

    <!--Product Summary  -->
    <ProductSummary :details="details" @viewOptions="viewOptions" />
    <!-- Product Summary ends -->

    <!-- Offers -->
    <Offers
      :offers="details.offers"
      class="offer-details"
      :highestOffer="highestOffer"
      :status="details.status"
      @reloadData="reloadData"
    />
    <!-- Offers ends -->

    <!-- Vue-bottom-sheets -->
    <vue-bottom-sheet
      id="more-options"
      ref="options"
      max-width="100vw"
      max-height="50vh"
      :rounded="true"
    >
      <Actions
        :details="details"
        @close="closeMoreOption"
        @modifyListing="modifyListing"
        @delist="delistConfirmation"
        @relist="relistConfirmation"
      />
    </vue-bottom-sheet>

    <vue-bottom-sheet
      id="delistConfirmation"
      ref="delistConfirmation"
      max-width="100vw"
      max-height="39vh"
      :rounded="true"
    >
      <ListingConfirmation
        :action="action"
        @onCancel="onCancelConfirmation"
        @onConfirm="onConfirm"
      />
    </vue-bottom-sheet>

    <vue-bottom-sheet
      id="relistConfirmation"
      ref="relistConfirmation"
      max-width="100vw"
      max-height="30vh"
      :rounded="true"
    >
      <ListingConfirmation
        :action="action"
        @onCancel="onCancelConfirmation"
        @onConfirm="onConfirm"
      />
    </vue-bottom-sheet>
    <!-- Vue bottom-sheets ends -->
  </b-col>
</template>

<script>
import Actions from './details/Actions.vue'
import ProductSummary from './details/ProductSummary.vue'
import Offers from './details/Offers.vue'
import ListingConfirmation from './details/ListingConfirmation.vue'
import { DELIST, RELIST } from '~/static/constants'

export default {
  name: 'SellingDetails',

  components: {
    ProductSummary,
    Offers,
    Actions,
    ListingConfirmation
  },

  props: {
    details: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      action: '',
      delistOption: DELIST,
      relistOption: RELIST
    }
  },

  computed: {
    highestOffer: (vm) => {
      return vm.details && vm.details.highest_offer
    },

    status: (vm) => {
      return vm.details && vm.details.status
    }
  },

  methods: {
    // Reload data
    reloadData() {
      this.$parent.loadData()
    },

    // Move to index page
    moveBack() {
      if(this.$nuxt.context.from.name === 'profile-vendor-selling-details-modify'){
        this.$router.push('/profile/vendor-selling')
      }else{
        this.$router.push(this.$nuxt.context.from || '/profile/vendor-selling')
      }
    },

    // View options vue bottom sheet popup
    viewOptions(){
      this.$refs.options.open()
    },

    // Close options bottom sheet popup
    closeMoreOption(){
      this.$refs.options.close()
    },

    // On modiy listing click
    // TODO: Responsive screen will be done in the upcoming PR.
    modifyListing(){
      this.closeMoreOption()
      this.$router.push({
        path: '/profile/vendor-selling/details/modify',
        query: { id: this.details.id },
      })
    },

    // On delist option click, show confirmation
    delistConfirmation(){
      this.closeMoreOption()
      this.action = this.delistOption
      this.$refs.delistConfirmation.open()
    },

    // On relist option click, show confirmation
    relistConfirmation(){
      this.closeMoreOption()
      this.action = this.relistOption
      this.$refs.relistConfirmation.open()
    },

    // On delist confirmation.
    delist(){
      this.$axios
        .put(`/listing-items/${this.details.id}/delist`)
        .then((res) => {
          this.$nuxt.refresh()
          this.$emit('reloadData')
        })
        .catch((err) => {
          this.$logger.logToServer('Delist item', err.response)
        })
    },

    relist(){
      this.$axios
        .put(`/listing-items/${this.details.id}/relist`)
        .then((res) => {
          this.$emit('reloadData')
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer('Relist item', err.res.data)
        })
    },

    // On cancel the confirmation close the confirmation popup
    onCancelConfirmation(){
      if(this.action === this.delistOption){
        this.$refs.delistConfirmation.close()
      }
      if(this.action === this.relistOption) {
        this.$refs.relistConfirmation.close()
      }
    },

    // On confirm action, delist or relist
    onConfirm(){
      if(this.action === this.delistOption){
        this.delist()
        this.onCancelConfirmation();
        return true
      }

      if(this.action === this.relistOption){
        this.relist()
        this.onCancelConfirmation();
        return true
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.selling-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  letter-spacing: -0.02em
  color: $color-black-1
#delistConfirmation::v-deep,
#relistConfirmation::v-deep
  .bottom-sheet__content
    overflow-y: hidden
</style>