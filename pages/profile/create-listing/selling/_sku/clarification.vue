<template>
  <div class="vd-create-listing-section">
    <b-container fluid class="vendor-dashboard-body">
      <div class="row">
        <!-- Mobile Header -->
        <MobileHeader
          class="mobile-heading-cl"
          :title="`Create a listing`"
          @back="$router.push($nuxt.context.from)"
        >
        </MobileHeader>
        <!-- Mobile Header ends -->
      </div>

      <div class="row page-content px-4 py-5">
        <div class="page-heading w-100 d-flex align-items-center text-center">
          {{ $t('createlisting.just_to_clarify') }}
        </div>

        <div class="page-description w-100 mt-3 d-flex align-items-center text-center">
          {{ $t('createlisting.clarification_desc') }}
        </div>
      </div>

      <template v-if="getSimilarProducts && getSimilarProducts.length">
        <!-- If has products -->
        <div class="row">
          <template v-for="(product, index) in getSimilarProducts">
            <!--  -->
            <b-col :key="index">
              <div class="inventory-card-wrapper mx-auto">
                <div class="product-info">
                  <div
                    class="
                      product-image
                      d-flex
                      align-items-center
                      justify-content-center
                      position-relative
                    "
                  >
                    <ProductThumb :product="product" />
                  </div>

                  <div class="product-detail position-relative">
                    <div
                      class="
                        product-title
                        text-truncate
                        d-flex
                        align-items-center
                      "
                    >
                      {{ product.name }}
                    </div>
                    <div
                      class="
                        product-color
                        text-truncate
                        d-flex
                        align-items-center
                      "
                    >
                      {{ product.colorway }}
                    </div>
                    <div
                      class="
                        product-size-type
                        text-truncate text-capitalize
                        d-flex
                        align-items-center
                      "
                    >
                      {{ $t('common.sizetype') }}&colon; {{ product.size_type }}
                    </div>
                  </div>
                  <b-button
                    variant="outline-clarification"
                    pill
                    class="border-2 mt-3 w-100"
                    @click="showDetails(product.id)"
                  >
                    {{ $t('createlisting.i_have_this_one') }}
                    <img
                      :src="require('~/assets/img/icons/right-arrow-icon.svg')"
                      class="img-fluid img-forward"
                    />
                  </b-button>
                </div>
              </div>
            </b-col>
            <!--  -->
          </template>
        </div>
        <!-- ./If has products -->
      </template>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileHeader from '~/components/mobile/MobileHeader.vue'
export default {
  name: 'ClarificationScreen',

  components: {
    MobileHeader,
  },

  layout: 'Profile',

  middleware: 'auth',

  computed: {
    ...mapGetters({
      getSimilarProducts: 'create-listing/getSimilarProducts',
    }),
  },

  methods: {
    showDetails(val) {
      this.$router.push(`/profile/create-listing/selling/product/${val}`)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.vd-create-listing-section
  .vendor-dashboard-body
    background-color: $color-white-1
    .mobile-heading-cl::v-deep
      .title
        font-family: $font-montserrat
        font-style: normal
        @include body-3-medium
        display: flex
        align-items: center
        color: $color-black-1
    .page-content
      .page-heading
        font-family: $font-montserrat
        font-style: normal
        @include body-4-medium
        color: $color-black-1
      .page-description
        font-family: $font-montserrat
        font-style: normal
        @include body-5-medium
        color: $color-gray-5
    .inventory-card-wrapper
      width: 164px
      height: 265px
      margin-bottom: 4rem
      .product-image::v-deep
        height: 200px
        background-color: $color-white-4
        .thumb-wrapper
          display: flex
          justify-content: center
          img
            width: 134px
      .product-detail
        padding: 5px 8px
        .product-title,
        .product-color,
        .product-size-type
          font-family: $font-sp-pro
          font-style: normal
          @include body-10-medium
        .product-title
          color: $color-black-1
        .product-color
          color: $color-gray-5
        .product-size-type
          color: $color-black-1
      .btn-outline-clarification
        width: 167px
        height: 32px
        background: $color-white-1
        border: 0.5px solid $color-blue-20
        border-radius: 46px
        font-family: $font-sp-pro
        font-style: normal
        @include body-5-medium
        color: $color-blue-20
</style>