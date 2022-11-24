<template>
  <b-container fluid class="container-profile-create-listing h-100">
    <div v-if="product">
      <!-- New ProductView component instead of DetailsListing -->
      <ProductView v-model="form" :product="product">
        <div slot="right-content">
          <ProductSellingForm
            v-model="form"
            :product="product"
            :action="`add`"
            @submit="addToDraft"
          />
        </div>
      </ProductView>

      <!-- Sales Graph and Sales Data Section -->
      <b-row class="my-5">
        <b-col md="12">
          <SalesSection :product="product"
                        :chart-header-class="'d-none mt-1'"
                        :chart-labels-style="chartLabelStyle" />
        </b-col>
      </b-row>
      <!-- End of Sales Graph and Sales Data Section -->
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import ProductSellingForm from '~/components/profile/create-listing/selling/ProductSellingForm'
import SalesSection from '~/components/product/SalesSection'
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'ProductDetails',

  components: {
    ProductView, ProductSellingForm, SalesSection
  },

  mixins: [screenSize],

  layout: 'Profile',

  data() {
    return {
      product: null,
      form: {
        currentSize: null,
        quantity: 1, // by default
        price: null,
        boxCondition: null,
        minOfferAmount: null,
        color: null,
      },
    }
  },

  computed: {
    chartLabelStyle() {
      if (this.isScreenSM)
        return 'width: 80%; margin-left: 140px'

      if (this.isScreenMD)
        return 'width: 70%; margin-left: 140px'

        return 'width: 60%; margin-left: 160px'
    }
  },

  created() {
    // Get the product details
    const { id } = this.$route.params
    this.$axios
      .get(`/product/${id}/details`)
      .then((res) => {
        this.product = res.data.data
      })
      .catch((err) => {
        this.$logger.logToServer(err.response)
        this.$router.push('/profile/create-listing/selling')
      })
  },

  methods: {
    ...mapActions({
      addListingToDraft: 'listingItems/addListingToDraft',
    }),

    // Add to Draft.
    addToDraft() {
      this.addListingToDraft({
        product: this.product,
        sizeId: Number(this.form.currentSize),
        quantity: Number(this.form.quantity),
        price: Number(this.form.price) * 100,
        packagingConditionId: Number(this.form.boxCondition),
        minOfferAmount: Number(this.form.minOfferAmount) * 100,
        color: this.form.color,
      })
      this.$router.push('/profile/create-listing/selling/confirm')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-create-listing
  .back-to-search
    @include body-4-regular
    position: absolute
    height: 19px
    left: 309px
    top: 130px
    font-style: normal
    letter-spacing: 0.06em
    color: $color-black-1
@media (min-width: 576px)
  .container-profile-create-listing
    padding: 30px  120px 0px 14px
    background-color: $color-white-5
@media (max-width: 576px)
  .container-profile-create-listing
    padding: 1.5rem
    background-color: $color-white-1
</style>
