<template>
  <b-container fluid class="container-product-auction h-100">
    <!-- Back to search -->
    <b-row>
      <b-col mt="12">
        <NuxtLink to="/create-listing/search/inventory">
          <LeftArrowSvg class="back-arrow" />
          <span class="body-5-normal back-to-search-btn">{{ $t('create_listing.product.back_to_search') }}</span>
        </NuxtLink>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="8">
        <div class="heading-1-bold">{{ activeInventoryProduct.name }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('sell.confirm_listing.sku') }}: {{ activeInventoryProduct.sku }}</div>
        <div class="body-3-regular mt-1 text-capitalize">{{ $t('common.colorway') }}: {{ color }}</div>
      </b-col>
      <b-col md="4">
        <div class="d-flex flex-column align-items-end">
          <div>
            <CheckboxSwitch
              :value="status"
              customClass="green-mode scale-2"
              :labelOn="$t('create_listing.product.live_status')"
              :labelOff="$t('create_listing.product.schedule_status')"
              @change="productStatusChanged"
            />
            <div v-if="form.scheduled_date" class="body-5-regular my-2">{{ formatScheduleDate }}</div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="m-auto w-75">
      <b-col md="12">
        <div class="my-3 text-center">
          <ProductThumb :product="activeInventoryProduct" width="350" class="my-4" />
        </div>
        <div class="my-5 d-flex flex-column justify-content-center m-auto size-selector-box">
          <div class="d-flex align-items-center">
            <span class="body-3-normal">{{ $t('common.size') }}*</span>
            <span class="body-5-regular ml-3">({{ $t('create_listing.product.suggested_value_displayed') }})</span>
            <span v-if="showError && errors.size_id" class="ml-5 text-danger body-5-regular">{{ $t('create_listing.product.errors.size') }}</span>
          </div>
          <ProductSizePicker
            :sizes="sizes"
            :prices="pricesBySize"
            :value="form.size_id"
            viewMode="carousel"
            singleMode
            @update="handleSizeChange"
          />
          <div class="mt-3 mb-5 mx-4 d-flex justify-content-between min-medium-high-prices">
            <div class="text-left">
              <div>{{ $t('create_listing.product.lowest_price') }}:</div>
              <div>{{ lowestPrice ? lowestPrice : $t('common.n/a') }}</div>
            </div>
            <div class="text-center">
              <div>{{ $t('create_listing.product.last_sold') }}:</div>
              <div>{{ lastSold ? lastSold : $t('common.n/a') }}</div>
            </div>
            <div class="text-right">
              <div>{{ $t('create_listing.product.highest_sold') }}:</div>
              <div>{{ highestSold ? highestSold : $t('common.n/a') }}</div>
            </div>
          </div>
        </div>

      </b-col>
      <b-col v-if="!isSneakers" md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold mb-1">{{ $t('common.color') }}*</span>
          <FormDropdown
            id="colorSelector"
            :value="form.color"
            :placeholder="$t('common.color')"
            :items="colors"
            :icon-arrow-up="ArrowUpIcon"
            :icon-arrow-down="ArrowDownIcon"
            class="mb-1 mw-40"
            no-arrow
            can-clear
            @select="handleColorSelect"
          />
        </div>
        <div v-if="showError && errors.color" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.color') }}</div>
      </b-col>
      <b-col v-if="!isSneakers" md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold">{{ $t('common.year') }}*</span>
          <FormInput
            v-model="form.year"
            :placeholder="$t('create_listing.product.enter_year')"
            class="mw-40 mb-1 mt-n1"
            required
            number
          />
        </div>
        <div v-if="showError && errors.year" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.year') }}</div>
      </b-col>
      <b-col md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold mb-1">{{ $t('common.box_condition') }}*</span>
          <FormDropdown
            id="boxConditionSelector"
            :value="form.packaging_condition_id"
            :placeholder="$t('trades.create_listing.default_box_condition')"
            :items="packageConditions"
            :icon-arrow-up="ArrowUpIcon"
            :icon-arrow-down="ArrowDownIcon"
            class="mb-1 mw-40"
            no-arrow
            can-clear
            @select="handleBoxConditionSelect"
          />
        </div>
        <div v-if="showError && errors.packageCondition" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.box_condition') }}</div>
      </b-col>
       <b-col md="4">
        <div class="duration-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold mb-1">{{ $t('create_listing.confirm.duration') }}</span>
          <FormDropdown
            :id="'durationSelector'"
            :value="form.time_limit"
            :placeholder="$tc('create_listing.confirm.select_duration_placeholder')"
            :items="DURATIONS"
            :icon-arrow-up="ArrowUpIcon"
            :icon-arrow-down="ArrowDownIcon"
            class="mb-1 mw-40"
            no-arrow
            can-clear
            @select="handleDurationSelect"
          />
        </div>
        <div v-if="showError && errors.time_limit" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.duration') }}</div>
      </b-col>
      <b-col md="4">
        <div class="mt-2 reserve-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold mb-1">{{ $t('create_listing.confirm.reserve') }} <img :src="infoIcon" class="icon-info position-absolute mt-n2 mr-n5 scale-2" alt="Info icon" /></span>
          <div class="d-flex align-items-center mb-1">
            <CheckboxSwitch
              class="scale-2 green-mode"
              :value="form.is_reserved"
              @change="form.is_reserved = !form.is_reserved"
            />
            <FormInput
              v-model="form.reserve_price"
              :placeholder="$t('create_listing.confirm.reserve_price')"
              class="mt-n2 ml-n4"
              :disabled="!form.is_reserved"
              required
              number
            />
          </div>
          <div v-if="showError && errors.reserve_price" class="text-danger body-5-regular">{{ $t('create_listing.product.errors.reserve_price') }}</div>
        </div>
      </b-col>

      <b-col md="4">
        <div class="bid-section d-flex flex-column mt-4 mr-4">
          <span class="font-weight-bold">{{ $t('create_listing.confirm.starting_bid') }}&nbsp;<span class="body-5-regular">{{ $t('create_listing.product.min_start_bid') }}</span></span>
          <FormInput
            v-model="form.start_bid_price"
            :placeholder="$t('create_listing.confirm.enter_starting_bid')"
            class="mw-40 mb-1 mt-n1"
            required
            number
          />
          <div v-if="showError && errors.start_bid_price" class="text-danger body-5-regular">
            <span v-if="errors.start_bid_price === 'less_than_default'">{{ $t('create_listing.product.errors.start_bid_price2') }}</span>
            <span v-else>{{ $t('create_listing.product.errors.start_bid_price') }}</span>
          </div>
        </div>
      </b-col>

      <b-col md="12">
        <div v-if="form.is_reserved" class="my-4 reserve-info" >
          <img :src="infoIcon" class="icon-info" alt="Info icon" />
          {{$t('create_listing.confirm.reserve_text_info')}}
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="my-5 text-center">
        <Button
          variant="outline-primary"
          class="px-5"
          pill
          @click="addAuction"
        >
          {{ $t('create_listing.product.add_auction') }}
        </Button>
      </b-col>
    </b-row>
    <b-modal id="schedule-date-modal" centered hide-footer hide-header size="md" no-close-on-backdrop>
      <div class="p-5">
        <div class="mb-3 body-3-regular">{{ $t('create_listing.product.enter_date') }}</div>
        <b-form-datepicker
          v-model="tempScheduleDate"
          :dateFormatOptions="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
        ></b-form-datepicker>
        <div class="mt-3 d-flex align-items-center justify-content-between">
          <Button
            variant="primary"
            pill
            @click="setScheduleDate"
          >
            {{ $t('create_listing.product.next') }}
          </Button>
          <Button
            variant="outline-primary"
            :disabled="tempScheduleDate === null"
            pill
            @click="$bvModal.hide('schedule-date-modal')"
          >
            {{ $t('create_listing.product.cancel') }}
          </Button>
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import _ from 'lodash';
import {FormDropdown, FormInput, CheckboxSwitch, Button} from '~/components/common'
import auctionValidation from '~/plugins/mixins/create-listing-auction'

import ProductThumb from '~/components/product/Thumb.vue'
import LeftArrowSvg from '~/assets/img/home/arrow-left.svg?inline'
import ProductSizePicker from '~/components/product/SizePicker'
import infoIcon from '~/assets/img/icons/info-blue.svg'
import { MIN_BID_PRICE } from '~/static/constants';
import ArrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import ArrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'

export default {
  name: 'CreateListingDetails',
  components: {
    LeftArrowSvg,
    CheckboxSwitch,
    ProductThumb,
    FormDropdown,
    FormInput,
    Button,
    ProductSizePicker,
  },
  mixins: [auctionValidation],
  layout: 'Profile',
  data(){
    return {
      infoIcon,
      ArrowUpIcon,
      ArrowDownIcon,
      status: true,
      color: '',
      DURATIONS: Object.keys(this.$t('create_listing.confirm.select_duration')).map(a => {
        return {
          label: this.$t(`create_listing.confirm.select_duration.${a}`),
          value:a,
        }
      }),
      form: {
        size_id: null,
        is_reserved: false,
        time_limit: null,
        reserve_price: null,
        start_bid_price: null,
        packageCondition: null,
        scheduled_date: null,
        year: null,
        color: null,
        status: 'live',
      },
      tempScheduleDate: null,
      showError: false,
      errors: {},
      lowestPrice: null,
      lastSold: null,
      highestSold: null,
    }
  },
  computed:{
    ...mapGetters({
      packageConditionsData: 'inventory/getPackageConditions',
      inventoryColors: 'inventory/getColors',
      activeInventoryProduct: 'create-listing/getActiveInventoryProduct',
      selectedAuctionType: 'create-listing/getAuctionType',
    }),
    sizes() {
      return this.activeInventoryProduct?.sizes || []
    },
    pricesBySize() {
      const prices = []
      this.sizes.forEach(size => {
        const productPrice = this.activeInventoryProduct?.product_sizes.find(sz => sz.size === size.size)
        if (productPrice) {
          prices.push({ price: productPrice.price * 100, size_id: size.id })
        }
      })
      return prices
    },
    packageConditions() {
      return this.packageConditionsData.map(pc => ({ value: pc.id, label: pc.name }))
    },
    colors() {
      return this.inventoryColors.map(color => ({ value: color.id, label: color.name }))
    },
    isSneakers() {
      if (this.activeInventoryProduct && this.activeInventoryProduct.category) {
        return this.activeInventoryProduct.category.name === 'sneakers'
      }
      return false
    },
    // Get MM/DD/YYYY string from 'YYYY-MM-DD' date string
    formatScheduleDate() {
      if (this.form.scheduled_date) {
        const parts = this.form.scheduled_date.split('-')
        return `${parts[1]}/${parts[2]}/${parts[0]}`
      }
      return ''
    },
  },
  mounted() {
    this.fetchPackagingConditions(this.activeInventoryProduct.category.name)
    this.fetchColors()
  },
  methods: {
    ...mapActions({
      postAuction: 'create-listing/auctionPost',
      fetchPackagingConditions: 'inventory/fetchPackagingConditions',
      fetchColors: 'inventory/fetchColors',
    }),
    productStatusChanged(value) {
      this.showError = false
      this.status = value
      this.form = {
        ...this.form,
        status: value ? 'live' : 'scheduled',
      }
      if (!value) {
        this.tempScheduleDate = this.form.scheduled_date
        this.$bvModal.show('schedule-date-modal')
      }
    },
    handleSizeChange(sizeId) {
      this.showError = false
      if (sizeId) {
        this.form = {
          ...this.form,
          size_id: sizeId,
        }
      }
    },
    addAuction() {
      let hasErrors = false
      this.errors = {}
      // validate form
      _.keys(this.form).forEach(key => {
        if (key === 'reserve_price') {
          if (!this.form.reserve_price && this.form.is_reserved) {
            this.errors.reserve_price = true
            hasErrors = true
          }
        } else if (key === 'start_bid_price') {
          if (this.form.start_bid_price === null) {
            this.errors.start_bid_price = true
            hasErrors = true
          } else if (this.form.start_bid_price < MIN_BID_PRICE) {
            this.errors.start_bid_price = 'less_than_default'
            hasErrors = true
          }
        } else if (key === 'scheduled_date') {
          if (!this.form.scheduled_date && this.form.status === 'schedule') {
            this.errors.scheduled_date = true
            hasErrors = true
          }
        } else if (this.form[key] === null) {
          if (this.isSneakers && (key !== 'year' && key !== 'color')) {
            this.errors[key] = true
            hasErrors = true
          }
        }
      })
      this.showError = true
      if (!hasErrors) {
        const newInventory = {
          product: {
            ...this.activeInventoryProduct,
            sizes: this.sizes,
          },
          ...this.form,
          packaging_condition: {
            name: this.form.packageCondition,
          },
          color: this.form.color ? this.form.color : this.activeInventoryProduct.colorway,
          size: this.sizes.find(sz => sz.id === this.form.size_id),
          id: this.randomStringId(),
        }
        this.$store.commit('create-listing/addItemToNonInventoryAuctions', newInventory)
        this.$router.push('/create-listing/product/confirm')
      }
    },
    handleBoxConditionSelect(item) {
      this.showError = false
      this.form = {
        ...this.form,
        packageCondition: item.label,
        packaging_condition_id: item.value,
      }
    },
    handleDurationSelect(item) {
      this.showError = false
      this.form = {
        ...this.form,
        time_limit: item.value
      }
    },
    handleColorSelect(item) {
      this.showError = false
      this.form = {
        ...this.form,
        color: item.value,
        color_id: item.id,
      }   
    },
    setScheduleDate() {
      this.showError = false
      this.form = {
        ...this.form,
        scheduled_date: this.tempScheduleDate
      }
      this.$bvModal.hide('schedule-date-modal')
    }
  }
}
</script>

