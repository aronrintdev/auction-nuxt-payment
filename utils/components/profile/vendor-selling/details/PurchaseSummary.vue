<template>
  <b-row class="mt-md-4 mt-4 vd-selling-details">
    <b-col md="12" class="purchase-history-summary text-bold">
      {{ $t('selling_page.product_summary') }}
    </b-col>
    <b-col md="12 mt-md-4 mt-2">
      <b-card
        class="purchase-summary-details"
        :title="$t('selling_page.list_id', { list_id: `#${details.id}` })"
      >
        <p>
          <span
            :id="`status-${details.status}`"
            class="text-capitalize ml-3 text-bold"
            >&#183;&nbsp;{{ details.status }}</span
          >
          <b-button
            v-if="details.status !== 'delisted'"
            variant="delist"
            pill
            class="float-right px-3"
            @click="delistItem()"
          >
            {{ $t('selling_page.delist') }}
          </b-button>
          <b-button
            v-else
            variant="delist"
            pill
            class="float-right px-3"
            @click="relist()"
          >
            {{ $t('selling_page.relist') }}
          </b-button>
        </p>
        <!-- Listed on -->
        <b-card-text class="mt-md-4 mt-2">
          <span class="text-bold text-capitalize"
            >{{ $t('selling_page.listed_on') }}
            {{ details.created_at | formatDateTimeString }}
          </span>
          <span role="button" class="text-ds" @click="modifyListing">
            {{ $t('selling_page.modify_listing') }}
          </span>
        </b-card-text>
        <!-- ./Listed On -->
        <!-- Price -->
        <b-card-text class="m-0">
          <span class="text-bold"
            >{{ $t('selling_page.price_at') }} &dollar;{{
              details.inventory.sale_price | formatPrice
            }}</span
          >
        </b-card-text>
        <!-- ./Price -->
        <!-- Details -->
        <b-card-text class="mt-3">
          <span
            >{{ $t('selling_page.you_listed') }}&colon; {{ itemCount }}</span
          >
        </b-card-text>
        <b-card-text>
          <b-row class="details-row">
            <!-- Product Image -->
            <b-col md="2" sm="12">
              <b-img
                :src="getImage"
                fluid
                class="product-image"
                alt="product-image"
                @error="imageLoadError"
              ></b-img>
            </b-col>
            <!-- ./Product Image -->
            <!-- Product Details -->
            <b-col md="4" sm="12">
              <p class="text-bold text-muted">
                {{ $t('selling_page.product_details') }}
              </p>
              <p class="product-details mb-0">
                {{ details.inventory.product.name }}
              </p>
              <p class="product-details mb-0">
                {{ $t('selling_page.colorway') }}&colon;
                {{ details.inventory.product.colorway }}
              </p>
              <p class="product-details mb-0">
                {{ $t('selling_page.box_condition') }}&colon;
                {{ details.inventory.packaging_condition.name }}
              </p>
            </b-col>
            <!-- ./Product Details -->
            <!-- Size/ SKU -->
            <b-col md="4" sm="12" class="product-details-desc">
              <p class="product-details mb-0">
                {{ $t('selling_page.size') }}&colon;
                {{ details.inventory.size.size }}
              </p>
              <p class="product-details mb-0">
                {{ $t('selling_page.sku') }}&colon;
                {{ details.inventory.product.sku }}
              </p>
            </b-col>
            <!-- ./Size/ SKU -->
            <b-col md="4" sm="12"> </b-col>
          </b-row>
          <!-- ./Details -->
        </b-card-text>
      </b-card>
    </b-col>

    <SellingModal
      id="delist-item-modal"
      :heading="$t('selling_page.delist_content')"
      :confirmLabel="$t('selling_page.delist')"
      :description1="$t('selling_page.delist_description')"
      @onClear="onDelistCancel"
      @onConfirm="onDelistConfirm"
      @hidden="onDelistCancel"
    />
    <!-- ./Delist -->

    <!-- Relist Item Modal -->
    <SellingModal
      id="relist-item-modal"
      :heading="$t('selling_page.relist_content')"
      :confirmLabel="$t('selling_page.relist')"
      @onClear="onRelistCancel"
      @onConfirm="onRelistConfirm"
      @hidden="onRelistCancel"
    />
    <!-- ./Relist Item Modal -->
  </b-row>
</template>

<script>
import SellingModal  from '~/components/profile/vendor-selling/SellingModal.vue'
import {PRODUCT_IMG_WIDTH} from '~/static/constants'

export default {
  name: 'PurchaseSummary',

  components: {
    SellingModal,
  },

  props: {
    details: {
      type: Object,
      default: () => {},
    },
    listingId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      delist: false,
      relistItem: false,
      itemCount: this.details.quantity,
      productImageWidth: PRODUCT_IMG_WIDTH,
    }
  },

  computed: {
    // Image
    getImage: (vm) => {
      if (vm.details.inventory.product.image) {
        return vm.details.inventory.product.image
      }
      return `https://images.deadstock.co/404.png?width=${vm.productImageWidth}`
    },
  },

  methods: {
    // On Relist cancel
    onRelistCancel() {
      this.$bvModal.hide('relist-item-modal')
    },

    // On relist confirm
    onRelistConfirm() {
      this.$axios
        .put(`/listing-items/${this.details.id}/relist`)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$emit('reloadData')
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer('Relist item', err.res.data)
          this.$toasted.error(this.$t(err.response.data.message))
        })
      this.$bvModal.hide('relist-item-modal')
    },

    // On delist
    delistItem() {
      this.$bvModal.show('delist-item-modal')
    },
    // On delist confirm
    onDelistConfirm() {
      this.$axios
        .put(`/listing-items/${this.details.id}/delist`)
        .then((res) => {
          this.$toasted.success(this.$t(res.data.message))
          this.$nuxt.refresh()
          this.$emit('reloadData')
        })
        .catch((err) => {
          this.$logger.logToServer('Delist item', err.response)
        })
      this.$bvModal.hide('delist-item-modal')
    },

    // On delist cancel
    onDelistCancel() {
      this.$bvModal.hide('delist-item-modal')
    },
    // On relist click
    relist() {
      this.relistItem = true
      this.$bvModal.show('relist-item-modal')
    },

    // On image error
    imageLoadError(event) {
      event.target.src = `${this.fallbackImgUrl}${this.productImageWidth}`
    },

    // On modify listing click
    modifyListing(){
      this.$router.push({
        path: '/profile/vendor-selling/details/modify',
        query: { id: this.listingId },
      })
    }
  },
}
</script>

<style lang="sass" scoped>
.product-details-desc
  margin-top: 3rem
@media (max-width: 767px)
  .product-details-desc
    margin-top: 0
  .product-image
    width: 60%
@media (max-width:425px)
  .product-image
    width: 50%
</style>
