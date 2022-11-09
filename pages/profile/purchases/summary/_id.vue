<template>
  <div :class="{
    'web-padding': !isScreenXS
  }"
       class="container-fluid vd-purchases-section">
    <div v-if="!isScreenXS">
      <div v-if="!viewShippingDetails" class="row ">
        <div class="col-md-12 col-lg-12">
          <!-- Row (Heading/ Search Fields/ Tabs) -->
          <div class="row mb-22">
            <!-- Heading -->
            <div class="col-12 d-flex align-items-center justify-content-between">
              <div class="heading-13 font-primary">
                {{ $t('vendor_purchase.purchases') }}
              </div>
              <Button
                  class="btn-back float-right"
                  to="/profile/purchases"
                  variant="link"
              >
                <img
                    :alt="$t('common.back')"
                    :src="require('~/assets/img/icons/arrow-back.svg')"
                    class="mr-2"
                />
                {{ $t('vendor_purchase.back_to_purchases') }}
              </Button>
            </div>
          </div>
          <!-- ./Row -->
          <template v-if="dataloaded">
            <!-- Purchase Summary Details -->
            <PurchaseSummary
                :orderDetails="orderDetails"
                @exportPDF="exportPDF"
            />
            <!-- ./Purchase Summary Details -->

            <!-- Payment Summary Details -->
            <PurchaseUpdatePaymentInfo
                v-if="status === processingPayment &&
              !paymentInfoIsUpdated
            "
                :orderDetails="orderDetails"
            />
            <PaymentSummary
                v-else
                :orderDetails="orderDetails"
                :paymentInfoIsUpdated="paymentInfoIsUpdated"
                class="payment-summary"
            />
            <!-- ./Payment Summary Details -->
            <!-- Refund Summary -->
            <RefundSummary
                v-if="orderDetails.status === cancelled"
                :orderDetails="orderDetails"
            />
            <!-- Refund Summary -->
          </template>
        </div>
      </div>
      <div v-else>
        <VendorPurchaseShippingDetails :orderDetails="orderDetails"/>
      </div>
    </div>
    <div v-else>
      <ViewSummary/>
    </div>
  </div>
</template>

<script>
import PurchaseSummary from '~/components/profile/purchases/summary/PurchaseSummary.vue'
import PaymentSummary from '~/components/profile/purchases/summary/PaymentSummary.vue'
import PurchaseUpdatePaymentInfo from '~/components/profile/purchases/summary/UpdatePaymentInfo.vue'
import RefundSummary from '~/components/profile/purchases/summary/RefundSummary.vue'
import VendorPurchaseShippingDetails from '~/components/profile/purchases/summary/shipping/ShippingDetails.vue'
import {Button} from '~/components/common'
import {
  PROCESSING_PAYMENT,
  CANCELLED,
  PAYMENT_METHOD_TYPE_CARD,
  PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  GOOGLE_MAPS_BASE_URL
} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize';
import ViewSummary from '~/components/profile/purchases/ViewSummary';

export default {
  name: 'PurchaseSummaryIndexPage',

  components: {
    ViewSummary,
    PurchaseSummary,
    PaymentSummary,
    PurchaseUpdatePaymentInfo,
    RefundSummary,
    VendorPurchaseShippingDetails,
    Button,
  },
  mixins: [screenSize],
  layout: 'Profile',

  data() {
    return {
      // listingItem: LISTING_ITEM,
      orderDetails: {},
      dataloaded: false,
      processingPayment: PROCESSING_PAYMENT,
      cancelled: CANCELLED,
      fields: [
        {
          key: 'products',
          label: this.$t('vendor_purchase.items'),
          tdClass: 'vd-img-col',
        },
        { key: 'details', label: '' },
        { key: 'quantity', label: this.$t('common.quantity') },
        { key: 'total', label: this.$t('common.total') },
      ],
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      paymentInfoIsUpdated: false,
      viewShippingDetails: false,
      fromAddress: {
        name: 'Deadstock',
        address: '25978 Buisness Center Drive',
        state: 'Redlands',
        country: 'CA 92374',
      },
    }
  },

  computed: {
    cardNumber: (vm) => {
      if (
        vm.orderDetails.transaction.payment_type === PAYMENT_METHOD_TYPE_CARD &&
        vm.orderDetails.payment_method
      ) {
        return vm.orderDetails.payment_method
          .card_last_digits
      } else {
        return null
      }
    },
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },

    status: (vm) => {
      if(vm.orderDetails.quantity === 1) {
        return vm.orderDetails.status;
      }
    }
  },

  // on view more tracking on click
  updated() {
    this.$root.$on('viewShippingDetails', (val) => {
      this.viewShippingDetails = val
    })
    this.$root.$on('updatePaymentInfo', (val) => {
      this.paymentInfoIsUpdated = val
      this.loadDetails(this.$route.params.id)
    })
  },

  mounted() {
    // Load the data
    this.loadDetails(this.$route.params.id)
    this.injectGoogleMapsApi()
  },

  methods: {
    // Load the datas
    loadDetails(orderId) {
      this.$axios
        .get(`purchases/${orderId}/details`)
        .then((res) => {
          this.orderDetails = res.data.data
          this.dataloaded = true
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.message))
          this.dataloaded = false
          this.$router.push('/profile/purchases')
        })
    },

    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImgUrl + '' + this.productImageWidth
    },

    // Export to PDF
    exportPDF(orderId) {
      this.$axios.get(`/purchases/${orderId}/generate-pdf`,
      {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          params: { id: orderId },
          responseType: 'blob',
        }).then((res) => {
          const fileURL = window.URL.createObjectURL(
            new Blob([res.data], {
              type: 'application/pdf',
            })
          )
          const fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', 'invoice.pdf')
          document.body.appendChild(fileLink)
          fileLink.click()
        }).catch((err) => {
          this.$logger.logToServer(err.response)
        })
    },

    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
      }
      return false
    },

    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true
      return scriptTag
    },
    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    },
  },
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"


</style>
