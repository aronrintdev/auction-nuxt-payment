<template>
  <b-row v-if="purchaseDatas && purchaseDatas.length > 0" class="mt-4 purchase-history-wrapper">
    <b-col
      v-for="(purchase, index) in purchaseDatas"
      :key="`purchase-${index}`"
      cols="12"
      class="purchase-card"
    >
      <PurchaseHistoryCard :purchase="purchase" />
    </b-col>
  </b-row>
</template>

<script>
import PurchaseHistoryCard from './PurchaseHistoryCard.vue'
import {
  MONTHS,
  PRODUCT_IMG_WIDTH,
  IMAGE_COUNT,
  IMAGE_BLUR,
  PRODUCT_FALLBACK_URL,
} from '~/static/constants'

export default {
  name: 'PurchaseHistory',
  components: {

    PurchaseHistoryCard
  },

  props: {
    purchaseDatas: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      purchaseDetail: [],
      months: MONTHS,
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      imageCount: IMAGE_COUNT,
      imageBlurOn: IMAGE_BLUR,
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
  },

  methods: {
    // Timestamp to Month Date, Year format
    getOrderedDate(val) {
      const d = new Date(val)
      return `${
        this.months[d.getMonth()].text
      } ${d.getDate()}, ${d.getFullYear()}`
    },

    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImgUrl + '' + this.productImageWidth
    },
    // Left of image count
    balanceImageCount(length, key) {
      return parseInt(length) - key
    },
    // Total quantity
    getTotalQuantity(items) {
      let quantity = 0
      // eslint-disable-next-line array-callback-return
      items.map((item) => {
        quantity += item.quantity
      })

      return quantity
    },
  },
}
</script>

<style lang="sass">
@import '~/assets/css/_variables'
@import '~/assets/css/components/purchases/summary'
.purchase-history-wrapper
  margin-bottom: 95px

@media (max-width:320px)
  .vd-purchase-history-slots
    .card-title
      @include body-5
    .ordered-date
      .date
        font-size: 0.85rem
@media (min-width:992px)
  .ordered-date
    br
      display: none
@media (min-width: 1920)
  :deep(.purchase-history-wrapper)
    justify-content: space-evenly

.purchase-card
  flex: 0 0 33%
  max-width: 100%
  padding-block: 15px
</style>
