<template>
  <b-row class="mt-md-4 mt-4 vd-selling-details">
    <b-col class="body-15-bold text-black font-secondary" md="12">
      {{ $t('selling_page.product_summary') }}
    </b-col>
    <b-col md="12 mt-md-4 mt-2">
      <b-card class="purchase-summary-details">
        <div class="d-flex align-items-start justify-content-between">
          <div class="d-flex flex-column">
            <div>
              <span class="body-2-bold font-secondary text-black">{{
                  $t('selling_page.list_id', {list_id: `#${details.id}`})
                }}</span>
              <span
                  :id="`status-${details.status}`"
                  class="text-capitalize ml-2 text-bold"
              >&#183;&nbsp;{{ details.status }}</span
              >
            </div>
            <!-- Listed on -->
            <div class="mt-md-1 mt-2 d-flex justify-content-between w-100">
              <span class="body-13-normal font-secondary text-capitalize"
              >{{ $t('selling_page.listed_on') }}
                {{ details.created_at | formatDateTimeString }}
              </span>
            </div>
            <!-- ./Listed On -->
            <!-- Price -->
            <div class="mt-1 mb-0">
              <span class="body-13-normal font-secondary"
              >{{ $t('selling_page.price_at') }} &dollar;{{
                  details.inventory.sale_price | formatPrice
                }}</span
              >
            </div>
            <!-- ./Price -->
          </div>

          <div class="d-flex flex-column flex-grow-0">
            <Button
                v-if="details.status !== 'delisted'"
                class="float-right px-3"
                pill
                variant="dark-blue"
                @click="delistItem()"
            >
              {{ $t('selling_page.delist') }}
            </Button>
            <Button
                v-else
                class="float-right px-3"
                pill
                variant="dark-blue"
                @click="relist()"
            >
              {{ $t('selling_page.relist') }}
            </Button>
            <div class="text-ds mt-13" role="button" @click="modifyListing">
              {{ $t('selling_page.modify_listing') }}
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="mt-4">
          <span
              class="body-12-normal font-secondary"
          >{{ $t('selling_page.you_listed') }}&colon; {{ itemCount }}</span
          >
        </div>
        <div>
          <b-row class="details-row">
            <!-- Product Image -->
            <b-col md="3" sm="12" xl="2">
              <b-img
                  :src="getImage"
                  alt="product-image"
                  class="product-image"
                  fluid
                  @error="imageLoadError"
              ></b-img>
            </b-col>
            <!-- ./Product Image -->
            <!-- Product Details -->
            <b-col md="4" sm="12" xl="3">
              <div class="body-12-medium font-secondary text-gray-simple mb-2">
                {{ $t('selling_page.product_details') }}
              </div>
              <div class="body-13-regular font-secondary mb-1">
                {{ details.inventory.product.name }}
              </div>
              <div class="body-13-regular font-secondary mb-1">
                {{ $t('selling_page.colorway') }}&colon;
                {{ details.inventory.product.colorway }}
              </div>
              <div class="body-13-regular font-secondary mb-1">
                {{ $t('selling_page.box_condition') }}&colon;
                {{ details.inventory.packaging_condition.name }}
              </div>
            </b-col>
            <!-- ./Product Details -->
            <!-- Size/ SKU -->
            <b-col class="" md="3" sm="12">
              <p class="body-13-regular font-secondary mb-1 mt-4">
                {{ $t('selling_page.size') }}&colon;
                {{ details.inventory.size.size }}
              </p>
              <p class="body-13-regular font-secondary mb-1">
                {{ $t('selling_page.sku') }}&colon;
                {{ details.inventory.product.sku }}
              </p>
            </b-col>
            <!-- ./Size/ SKU -->
            <b-col md="4" sm="12"></b-col>
          </b-row>
          <!-- ./Details -->
        </div>
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
      ref="relistModal"
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
import SellingModal from '~/components/profile/vendor-selling/SellingModal.vue'
import {PRODUCT_IMG_WIDTH} from '~/static/constants'
import Button from '~/components/common/Button'

export default {
  name: 'PurchaseSummary',

  components: {
    Button,
    SellingModal,
  },

  props: {
    details: {
      type: Object,
      default: () => {
      },
    },
    listingId: {
      type: Number,
      default: null,
    },
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
      this.addStyle('delist-item-modal')

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
      this.addStyle('relist-item-modal')
    },
    addStyle(id){
      setTimeout(() => {
        const modal = document.getElementById(id)
        const modalBody = modal.querySelector('.modal-content')
        modalBody.style.width = '438px'
        modalBody.style.borderRadius = '12px !important'
        modal.style.background = 'rgba(0, 0, 0, 0.25)'
        modal.style.backdropFilter = 'blur(2px)'
        // this.$refs.relistModal.$el.setAttribute('style', 'background: red')
      }, 1)
    },
    // On image error
    imageLoadError(event) {
      event.target.src = `${this.fallbackImgUrl}${this.productImageWidth}`
    },

    // On modify listing click
    modifyListing() {
      this.$router.push({
        path: '/profile/vendor-selling/details/modify',
        query: {id: this.listingId},
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.mt-13
  margin-top: 13px

.product-image
  height: 81px
  width: 130px
  object-fit: cover

.purchase-summary-details
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px
  box-shadow: none
  padding: 14px 0 22px 46px

.product-details-desc
  margin-top: 3rem

@media (max-width: 767px)
  .product-details-desc
    margin-top: 0
  .product-image
    width: 60%
</style>
