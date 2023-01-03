<template>
  <div>
    <template v-if="!isDetailView">
      <hr class="my-3" />
      <b-row class="d-flex align-items-center body-9-medium mx-3">
        <b-col cols="4" class="px-0">
          <span class="info">{{method.check_name}}</span>
        </b-col>
        <b-col cols="3">
          <span class="info">{{method.check_account.replace(/^.{1}/g, '*').split('x').join('*')}}</span>
        </b-col>
        <b-col cols="4" class="text-green-33 d-flex align-items-center">
          <span class="info">{{$t('vendor_hub.payout_method.verified')}}</span>
          <i class="fa fa-check-circle-o fa-font px-1" aria-hidden="true"></i>
        </b-col>
        <b-col cols="1" class="text-right px-0">
          <a role="button" class="d-inline-block w-full p-1 text-black"  @click="$emit('showDetail', method.id)">
            <img :src="require('~/assets/img/vendorhub/arrow-mobile.svg')" />
          </a>
        </b-col>
      </b-row>
      <div v-if="method.is_default" class="mt-2 mx-3">
        <div class="default-item">
            {{ $t('vendor_hub.payout_method.default') }}
        </div>
      </div>
    </template>
    <div v-else class="mt-3 body-9-medium mx-2">
      <Portal to="vendor-mobile-button-area">
        <div class="body-9-medium mr-3">
          <a role="button" class="text-blue-20" @click="$emit('edit', method)">{{  $t('common.edit') }}</a>
          <template v-if="!method.is_default">
            <span class="px-1 text-blue-20">|</span>
            <a role="button" class="text-blue-20" @click="$emit('delete', method)">
              {{ $t('common.delete') }}
            </a>
          </template>
        </div>
      </Portal>
      <div class="d-flex flex-column align-items-center mt-4 px-2">
        <b-form-group
          label-for="name"
          class="w-100"
        >
          <template #label>
            <span class="label">{{ $t('vendor_hub.payout_method.name_of_account') }}</span>
            <!--          This code should stay untill this feature activated    -->
            <!--          <span :class="method.is_verified? 'verified': 'not-verified'">-->
            <!--            {{method.is_verified? $t('vendor_hub.payout_method.verified') : $t('vendor_hub.payout_method.not_verified')}}-->
            <!--            <img :src="itemImage" >-->
            <!--          </span>-->
          </template>
          <b-input-group>
            <b-form-input
              id="name"
              :value="method.check_name"
              :disabled="true"
              class="rounded-pill input-payout-mobile"
              :placeholder="$t('vendor_hub.payout_method.enter_name')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-for="account_number"
          class="w-100"
        >
          <template #label>
            <span class="label">{{ $t('vendor_hub.payout_method.account_number') }}</span>
          </template>
          <b-input-group class="position-relative">
            <b-form-input
              id="account_number"
              :value="method.check_account"
              :disabled="true"
              class="rounded-pill input-payout-mobile"
              :placeholder="$t('vendor_hub.payout_method.enter_account')"
            ></b-form-input>
            <img :src="require('~/assets/img/icons/eye3.svg')" class="position-absolute right-0 eye-icon" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-for="routing_number"
          class="w-100"
        >
          <template #label>
            <span class="label">{{ $t('vendor_hub.payout_method.routing_number') }}</span>
          </template>
          <b-input-group>
            <b-form-input
              id="routing_number"
              :value="method.check_aba"
              :disabled="true"
              class="rounded-pill input-payout-mobile"
              :placeholder="$t('vendor_hub.payout_method.routing_number_placeholder')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'VendorPayoutItemMobile',
  mixins: [screenSize],
  props: {
    method: {
      type: Object,
      required: true
    },
    isDetailView: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isShowDetail: false,
    }
  },
  computed:{
    itemImage(){
      return this.method.is_verified? require('~/assets/img/profile/vendor-hub/check-outline.svg'): require('~/assets/img/profile/vendor-hub/cross-outline.svg')
    }
  },
  methods: {
    onDetails() {
      this.$emit('show-detail', this.method)
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.label
  @include body-6-medium
  font-family: $font-family-montserrat

:deep().form-control:disabled
  @include body-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background: $color-white-5

.input-payout-mobile
  @include body-9-medium
  font-family: $font-family-montserrat
  background-color: $color-white-1 !important
  padding: 10px 20px
  width: 100%
  height: 49px
  border: 1px solid $input-mobile-border-color
  border-radius: 10px !important

.text-blue-20
  color: $color-blue-20

.text-green-33
  color: $color-green-33

.info
  font-family: $font-montserrat

.default-item
  width: 61px
  height: 22px
  background-color: $color-blue-1
  color: $white
  @include body-6-regular
  display: flex
  align-items: center
  justify-content: center
  border-radius: 4px

.fa-font
  font-size: 17px

.eye-icon
  right: 20px
  margin-top: 18px

</style>
