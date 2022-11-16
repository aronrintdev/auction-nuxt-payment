<template>
  <div>
    <template v-if="!isDetailView">
      <hr class="my-3" />
      <b-row class="d-flex align-items-center body-9-medium">
        <b-col cols="4">
          <span>{{method.check_name}}</span>
        </b-col>
        <b-col cols="3">
          <span>{{method.check_account}}</span>
        </b-col>
        <b-col cols="4" class="text-green-33">
          <span>{{$t('vendor_hub.payout_method.verified')}}</span>
          <i class="fa fa-check-circle-o" aria-hidden="true"></i>

        </b-col>
        <b-col cols="1" class="text-right">
          <a role="button" class="d-inline-block w-full p-1 text-black"  @click="$emit('showDetail', method.id)">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
        </b-col>
      </b-row>
      <div v-if="method.is_default" class="mt-2">
        <Button size="sm" class="px-2">
          <span class="body-6-regular">
            {{ $t('vendor_hub.payout_method.default') }}
          </span>
        </Button>
      </div>
    </template>
    <div v-else class="mt-3 body-9-medium">
      <div class="d-flex justify-content-between">
        <a class="d-inline-block w-full p-1 text-black"  @click="$emit('showDetail', null)">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <div>
          <a role="button" class="text-blue-20" @click="$emit('edit', method)">{{  $t('common.edit') }}</a>
          <template v-if="!method.is_default">
            <span class="px-1 text-blue-20">|</span>
            <a role="button" class="text-blue-20" @click="$emit('delete', method)">
              {{ $t('common.delete') }}
            </a>
          </template>
        </div>

      </div>
      <div class="d-flex flex-column align-items-center mt-4 px-2">
        <b-form-group
          label-for="name"
          class="input-payout w-100"
        >
          <template #label>
            {{ $t('vendor_hub.payout_method.name_of_account') }}
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
              class="rounded-pill input-payout"
              :placeholder="$t('vendor_hub.payout_method.enter_name')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('vendor_hub.payout_method.account_number')"
          label-for="account_number"
          class="input-payout w-100"
        >
          <b-input-group>
            <b-form-input
              id="account_number"
              :value="method.check_account"
              :disabled="true"
              class="rounded-pill input-payout"
              :placeholder="$t('vendor_hub.payout_method.enter_account')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('vendor_hub.payout_method.routing_number')"
          label-for="routing_number"
          class="input-payout w-100"
        >
          <b-input-group>
            <b-form-input
              id="routing_number"
              :value="method.check_aba"
              :disabled="true"
              class="rounded-pill input-payout"
              :placeholder="$t('vendor_hub.payout_method.routing_number_placeholder')"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>

    </div>
  </div>
</template>

<script>
import Button from '~/components/common/Button';
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'VendorPayoutItemMobile',
  components: {Button},
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

:deep()label.d-block
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal

:deep().form-control:disabled
  @include body-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background: $color-white-5

.input-payout-mobile
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background-color: $color-white-1 !important
  padding: 10px 20px
  width: 100%
  height: 59px
  border: 1px solid $input-mobile-border-color
  border-radius: 10px !important

.text-blue-20
  color: $color-blue-20

.text-green-33
  color: $color-green-33

</style>
