<template>
  <b-row class="mt-2">
    <b-col md="12" sm="12" class="vd-selling-Inventory mt-md-4 mt-2">
      <h5 class="text-bold text-capitalize">
        {{ $t('selling_page.listings') }} &#40;{{
          totalCount
        }}&#41;
      </h5>
    </b-col>

    <b-col md="12" sm="12" class="mt-md-4 mt-2">
      <b-table
        borderless
        :items="searchResults"
        :fields="fields"
        :busy="loading"
        responsive
        tbody-tr-class="bg-white vd-selling-bt"
      >
        <template #head()="scope">
          <div class="text-nowrap" role="button" @click="orderBy(scope.column)">
            <span class="mr-1">{{ scope.label }}</span>
            <img v-if="isSortActive(scope.column)" :src="require('~/assets/img/icons/down-arrow-solid.svg')" :alt="scope.label"
                 class="sort-icon" :class="reverseDirection(scope.column)">
          </div>
        </template>
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center">
            <Loader :loading="loading"></Loader>
          </div>
        </template>
        <template #cell(products)="row">
          <div class="row">
            <div class="vd-sell-product-img text-center ">
              <div class="d-flex align-items-center mb-2">
                <b-form-checkbox
                    v-if="showCheckBox"
                    :id="`checkbox-${row.item.id}`"
                    v-model="selectedVal"
                    :value="row.item.id"
                    class="vd-checkbox mr-2"
                    name="checkbox-move-items"
                    @change="toggleSelect(row.item.id)"
                >
                </b-form-checkbox>
                <img
                    :src="getImage(row.item.inventory.product.image)"
                    alt="Product Picture"
                    width="auto"
                    @error="imageLoadError"
                />
              </div>
              <span class="list-id text-center text-decoration-underline" role="button" @click="handleEditClick(row.item.id)">&#35;{{ row.item.id }}</span>
            </div>
          </div>
        </template>

        <template #cell(product_details)="row">
          <div class="vd-product-title">
            {{ row.item.inventory.product.name }}
          </div>

          <div class="vd-sku">{{ $t('common.sku') }}&colon;
            <span v-if="row.item.inventory.product.sku">
              {{ row.item.inventory.product.sku }}</span>
            <span v-else>&#8211;</span>
          </div>

          <div class="vd-color">{{ $t('shopping_cart.color_way') }}&colon;
            <span v-if="row.item.inventory.product.colorway">
              {{ row.item.inventory.product.colorway }}
            </span>
            <span v-else>&#8211;</span>
            &comma;
            {{ $t('selling_page.size') }}&colon;
            <span v-if="row.item.inventory.size.size">
              {{ row.item.inventory.size.size }}
            </span>
            <span v-else>&#8211;</span>
          </div>

          <div class="vd-condition">{{ $t('common.box_condition') }}&colon;
            <span v-if="row.item.inventory.packaging_condition">
              {{ row.item.inventory.packaging_condition.name }}</span>
            <span v-else>&#8211;</span>
          </div>
        </template>

        <template #cell(date_listed)="row">
          <span class="table-text text-center">{{
            row.item.created_at | formatDate
          }}</span>
        </template>

        <template #cell(price)="row">
          <span class="table-text text-center">
            {{ row.item.inventory.sale_price | toCurrency('USD', 'N/A') }}
          </span>
        </template>

        <template #cell(last_sold)>
            <!-- TODO -->
          <span class="table-text text-center">--</span>
        </template>

        <template #cell(offers)="row">
          <span v-if="row.item.inventory.product.offers && row.item.status === listedOffer" class="table-text">{{
            getOffers(row.item.inventory)
          }}</span>
          <span v-else>&#8211;</span>
        </template>

        <template #cell(qty)="row">
          <span v-if="row.item.quantity" class="table-text">
            {{ row.item.quantity }}
          </span>
          <span v-else> &#8211; </span>
        </template>

        <template #cell(status)="row">
          <span class="table-text text-capitalize ">{{
            row.item.status
          }}</span>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import {
  PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  PENDING_OFFER,
  ACCEPTED_OFFER,
  LISTED
} from '~/static/constants'
import Loader from '~/components/common/Loader';

export default {
  name: 'ListItem',
  components: {Loader},
  props: {
    // Search result
    searchResults: {
      type: Array,
      default: () => [],
    },

    // Loading
    loading: {
      type: Boolean,
      default: false,
    },

    showCheckBox: {
      type: Boolean,
      default: false,
    },

    selected: {
      type: Array,
      default: () => [],
    },
    // new
    totalCount:{
      type: Number,
      default: 0,
    }
    // new
  },

  data() {
    return {
      selectedVal: [],
      // Table fields
      fields: [
        {
          key: 'products',
          label: this.$t('selling_page.product'),
          sortable: false,
          thClass: 'body-4-bold font-primary text-nowrap mr-4',
          thStyle: { width: '170px' }
        },
        {
          key: 'product_details',
          label: '',
          sortable: false,
          thClass: 'body-4-bold font-primary text-nowrap '
        },
        {
          key: 'date_listed',
          label: this.$t('selling_page.date_listed'),
          sortable: false,
          tdClass: 'body-4-regular text-center custom-width',
          thClass: 'body-4-bold font-primary text-nowrap text-center custom-width',
        },
        {
          key: 'price',
          label: this.$t('common.price'),
          sortable: false,
          tdClass: 'body-4-regular text-center custom-width',
          thClass: 'body-4-bold font-primary text-nowrap text-center custom-width',
        },
        {
          key: 'last_sold',
          label: this.$t('sell.sell_now.last_sold'),
          sortable: false,
          tdClass: 'body-4-regular text-center custom-width',
          thClass: 'body-4-bold font-primary text-nowrap text-center custom-width',
        },
        {
          key: 'offers',
          label: this.$t('selling_page.offers'),
          sortable: false,
          tdClass: 'body-4-regular text-center',
          thClass: 'body-4-bold font-primary text-nowrap text-center',
        },
        {
          key: 'qty',
          label: this.$t('selling_page.qty'),
          sortable: false,
          tdClass: 'body-4-regular text-center',
          thClass: 'body-4-bold font-primary text-nowrap text-center',
        },
        {
          key: 'status',
          label: this.$t('selling_page.status'),
          sortable: false,
          tdClass: 'body-4-regular text-center',
          thClass: 'body-4-bold font-primary text-nowrap text-center',
        },
      ],
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackUrl: PRODUCT_FALLBACK_URL,
      pendingOffer: PENDING_OFFER,
      acceptedOffer: ACCEPTED_OFFER,
      listedOffer: LISTED,
      orderByField: 'id',
      orderByDirection: 'asc',
    }
  },

  watch: {
    selected() {
      this.selectedVal = this.selected
    },
  },

  methods: {
    isSortActive(column){
      return !['products', 'product_details'].includes(column)
    },
    orderBy(column){
      if (this.isSortActive(column)){
        this.orderByDirection = this.reverseDirection(column)
        this.orderByField = column
        this.$emit('sort', {
          orderByField: this.orderByField,
          orderByDirection: this.orderByDirection,
        })
      }
    },
    reverseDirection(column){
      return column === this.orderByField? (this.orderByDirection === 'asc'? 'desc' : 'asc'): 'desc'
    },
    // On edit click
    handleEditClick(id) {
      this.$router.push(`/profile/vendor-selling/details/${id}`)
    },

    // Checkbox on change event
    toggleSelect(checked) {
      this.$emit('selectedItem', checked)
    },

    // Image on load error
    imageLoadError(event) {
      event.target.src = `${this.fallbackUrl}${this.productImageWidth}`
    },

    // Return the image
    getImage(data) {
      if (data) {
        return data
      }
      return `${this.fallbackUrl}${this.productImageWidth}`
    },

    getOffers(inventory) {
      const sizeId = inventory.size_id
      const productId = inventory.product_id
      const offers = inventory.product.offers
      let count = 0

      offers.forEach((element) => {
        if (
          (element.size_id === sizeId &&
            element.product_id === productId &&
            element.status === this.pendingOffer) ||
          (element.status === this.acceptedOffer &&
            element.sell_details &&
            element.sell_details.vendor_id === this.$auth.user.vendor.id)
        ) {
          count = count + 1
        }
      })
      return count
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.sort-icon
  &.asc
    transform: rotate(180deg)

.mt-3p
  margin-top: 3px

.vd-sku,
.vd-color,
.vd-condition
  font-family: $font-sp-pro
  font-style: normal
  @include body-21-normal
  color: $color-gray-6
  margin-top: 3px

.vd-product-title
  font-family: $font-sf-pro-text
  font-style: normal
  @include body-5-medium
  color: $color-black-1
.vd-sell-product-img
  margin-right: 30px
  margin-left: auto
  img
    width: 100px
    object-fit: cover

.table-text
  font-family: $font-sp-pro
  font-style: normal
  color: $color-black-1
.list-id
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-bold
  color: $color-blue-1
</style>
