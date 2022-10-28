<template>
  <b-row class="h-100">
    <b-col md="12">
      <b-tabs content-class="mt-3" nav-class="pb-2">
        <b-tab title-link-class="body-2-bold border-0 pl-3" :title="$t('products.sales_graph')">
          <b-row>
            <b-col md="12">
              <LatestSales
                :value="product.latest_sales"
                :sku="product.sku"
              />
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title-link-class="body-2-bold border-0 pl-5" :title="$t('products.sales_data')">
          <b-row class="mt-3">
            <b-col md="4">
              <Button v-b-toggle.recent-sales-collapse block variant="outline-dark">
                <template #default>
                  <div class="d-flex align-items-center">
                    <span class="pull-left dropdown-label">{{ $t('products.recent_sales') }}</span>
                    <b-img v-if="isRecentSalesShown" :src="require('~/assets/img/icons/arrow-up-gray.svg')" class="ml-auto" />
                    <b-img v-else :src="require('~/assets/img/icons/arrow-down-gray.svg')" class="ml-auto" />
                  </div>
                </template>
              </Button>
              <b-collapse id="recent-sales-collapse" class="border-dark">
                <b-card>
                  <ProductRecentSales :sku="product.sku" />
                </b-card>
              </b-collapse>
            </b-col>
            <b-col md="4">
              <Button v-b-toggle.recent-offers-collapse block variant="outline-dark" class="text-left">
                <template #default>
                  <div class="d-flex align-items-center">
                    <span class="pull-left dropdown-label">{{ $t('products.recent_offers') }}</span>
                    <b-img v-if="isRecentOffersShown" :src="require('~/assets/img/icons/arrow-up-gray.svg')" class="ml-auto" />
                    <b-img v-else :src="require('~/assets/img/icons/arrow-down-gray.svg')" class="ml-auto" />
                  </div>
                </template>
              </Button>
              <b-collapse id="recent-offers-collapse" class="border-dark">
                <b-card>
                  <ProductRecentOffers :sku="product.sku" />
                </b-card>
              </b-collapse>
            </b-col>
            <b-col md="4">
              <Button v-b-toggle.recent-asks-collapse block variant="outline-dark" class="text-left">
                <template #default>
                  <div class="d-flex align-items-center">
                    <span class="pull-left dropdown-label">{{ $t('products.recent_asks') }}</span>
                    <b-img v-if="isRecentAsksShown" :src="require('~/assets/img/icons/arrow-up-gray.svg')" class="ml-auto" />
                    <b-img v-else :src="require('~/assets/img/icons/arrow-down-gray.svg')" class="ml-auto" />
                  </div>
                </template>
              </Button>
              <b-collapse id="recent-asks-collapse" class="border-dark">
                <b-card>
                  <ProductRecentAsks :sku="product.sku" />
                </b-card>
              </b-collapse>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import LatestSales from '~/components/product/LatestSales'
import Button from '~/components/common/Button'
import ProductRecentSales from '~/components/product/RecentSales'
import ProductRecentOffers from '~/components/product/RecentOffers'
import ProductRecentAsks from '~/components/product/RecentAsks'

export default {
  name: 'SalesSection',
  components: {ProductRecentSales, ProductRecentOffers, ProductRecentAsks, Button, LatestSales },
  props: {
    product: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      isRecentSalesShown: false,
      isRecentOffersShown: false,
      isRecentAsksShown: false,
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (id, state) => {
      switch (id) {
        case 'recent-sales-collapse': {
          this.isRecentSalesShown = state

          break
        }
        case 'recent-offers-collapse': {
          this.isRecentOffersShown = state

          break
        }
        default: {
          this.isRecentAsksShown = state
        }
      }
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.dropdown-label
  font-weight: 600
  font-size: 16px
  font-family: $font-family-sf-pro-display
  color: #000

.text-color-gray-5
  color: $color-gray-5

::v-deep
  .nav-tabs
    border-bottom: 0.5px solid $color-gray-23 !important

/* Overriding admin-lite theme styles */
::v-deep
  .nav-link
    color: $color-gray-47
    font-family: $font-family-sf-pro-display
    font-weight: 700
    font-size: 20px
    &:hover
      color: $color-gray-5
    &.active
      color: $black-1
      &:hover
        color: $black-1

/* Collapse card content styles */
.card
  border-top: none
  border-bottom: 1px solid $color-gray-47
  border-left: 1px solid $color-gray-47
  border-right: 1px solid $color-gray-47
  box-shadow: none
  border-top-left-radius: 0
  border-top-right-radius: 0

/* Collapse buttons custom styles */
.btn
  padding: 0 14px
  &.btn-block
    &.btn-outline-dark
      height: 59px
      border: 1px solid $color-gray-47

      &:hover
        background: $white
        color: $black-1
        border: 1px solid $color-gray-47

      &.not-collapsed
        border-bottom: none
        border-top: 1px solid $color-gray-47
        border-left: 1px solid $color-gray-47
        border-right: 1px solid $color-gray-47
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        &:hover
          border-bottom: none

</style>
