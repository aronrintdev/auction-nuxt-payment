<template>
  <b-row class="h-100">
    <b-col md="12">
      <b-tabs content-class="mt-0 mt-sm-3" nav-class="pb-2">
        <b-tab 
          title-link-class="body-2-bold border-0 pl-2 d-none d-sm-block" 
          :title="$t('products.sales_graph')"
        >
          <b-row class="d-none d-sm-block">
            <b-col md="12">
              <LatestSales
                :value="product.latest_sales"
                :sku="sku || product.sku"
                :headerClass="chartHeaderClass"
                :labelsStyle="chartLabelsStyle"
              />
            </b-col>
          </b-row>
        </b-tab>
        <div class="d-flex pt-2 flex-column d-sm-none">
          <div class="d-flex justify-content-between align-items-center">
            <div class="body-5-medium text-black">{{ $t('products.latest_sales') }}</div>
            <Icon
              v-show="currentDataTab"
              src="close.svg"
              width="12"
              height="12"
              @click="currentDataTab = ''"
              class="btn-close mt-1"
            />
          </div>
          <div v-if="currentDataTab === 'sales'">
            <ProductRecentSales :sku="sku || product.sku" />
          </div>
          <div v-else-if="currentDataTab === 'asks'">
            <ProductRecentAsks :sku="sku || product.sku" />
          </div>
          <div v-else-if="currentDataTab === 'offers'">
            <ProductRecentOffers :sku="sku || product.sku" />
          </div>
          <div v-else>
            <LatestSales
              :value="product.latest_sales"
              :sku="sku || product.sku"
              :headerClass="chartHeaderClass"
              :labelsStyle="chartLabelsStyle"
            />
          </div>

          <div class="d-flex d-sm-none justify-content-between mt-2 h-auto">
            <div 
              class="chart-button col-3"
              @click="$root.$emit('bv::collapse::state', 'recent-asks-collapse', true)"
            >
              {{ $t('products.asks') }}
            </div>
            <div 
              class="chart-button col-3"
              @click="$root.$emit('bv::collapse::state', 'recent-offers-collapse', true)"
            >
              {{ $t('products.offers') }}
            </div>
            <div 
              class="chart-button col-3"
              @click="$root.$emit('bv::collapse::state', 'recent-sales-collapse', true)"
            >
              {{ $t('products.sales') }}
            </div>
          </div>
        </div>
        <b-tab 
          title-link-class="body-2-bold border-0 pl-5 d-none d-sm-block" 
          :title="$t('products.sales_data')"
        >
          <b-row>
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
                  <ProductRecentSales :sku="sku || product.sku" />
                </b-card>
              </b-collapse>
            </b-col>
            <b-col class="mt-2 mt-md-0" md="4">
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
                  <ProductRecentOffers :sku="sku || product.sku" />
                </b-card>
              </b-collapse>
            </b-col>
            <b-col class="mt-2 mt-md-0" md="4">
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
                  <ProductRecentAsks :sku="sku || product.sku" />
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
import { Icon } from '~/components/common'


export default {
  name: 'SalesSection',
  components: { ProductRecentSales, ProductRecentOffers, ProductRecentAsks, Button, LatestSales, Icon },
  props: {
    product: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    sku: {
      type: String,
      default: null
    },
    chartHeaderClass: {
      type: String,
      default: ''
    },
    chartLabelsStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isRecentSalesShown: false,
      isRecentOffersShown: false,
      isRecentAsksShown: false,
      currentDataTab: ''
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (id, state) => {
      switch (id) {
        case 'recent-sales-collapse': {
          this.isRecentSalesShown = state
          this.currentDataTab = 'sales'
          break
        }
        case 'recent-offers-collapse': {
          this.isRecentOffersShown = state
          this.currentDataTab = 'offers'
          break
        }
        default: {
          this.isRecentAsksShown = state
          this.currentDataTab = 'asks'
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
.chart-button
  height: 34px
  border: 1px solid $color-gray-23
  border-radius: 4px
  font-weight: 600
  font-size: 14px
  color: #000
  display: flex
  align-items: center
  justify-content: center

.chart-header
  font-family: $font-family-sf-pro-display
  font-size: 20px
  font-weight: 700

::v-deep
  .nav-tabs
    border: 0 !important
    @media (min-width: 574px)
      border-bottom: 0.5px solid $color-gray-23 !important

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
      color: $color-gray-4
    &.active
      color: #000
      &:hover
        color: #000

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
