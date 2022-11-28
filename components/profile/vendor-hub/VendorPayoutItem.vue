<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center mt-4">
      <b-form-group
        label-for="name"
        class="input-payout"
      >
        <template #label>
          <div class="d-flex">
            <span>{{ $t('vendor_hub.payout_method.name_of_account') }} - </span>
              <span class="verified d-flex align-items-center">
                <span class="pr-1">
                  {{ $t('vendor_hub.payout_method.verified') }}
                </span>
                <i class="fa fa-check-circle-o" />
              </span>
<!--          This code should stay untill this feature activated    -->
<!--          <span :class="method.is_verified? 'verified': 'not-verified'">-->
<!--            {{method.is_verified? $t('vendor_hub.payout_method.verified') : $t('vendor_hub.payout_method.not_verified')}}-->
<!--            <img :src="itemImage" >-->
<!--          </span>-->
          </div>
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
        class="m-40 input-payout"
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
        class="m-40 input-payout"
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
      <Button
        variant="link"
        class="btn-edit-inventory ml-5 mr-2 mt-3"
        :tooltip-text="$t('common.edit')"
        @click="$emit('edit', method)"
      ></Button>
      <Button
        v-if="!method.is_default"
        variant="link"
        class="btn-delete mt-3"
        :tooltip-text="$t('common.delete')"
        @click="$emit('delete', method)"
      ></Button>
    </div>
    <div :class="method.is_default? 'default-class' : 'non-default'"
         class="d-flex align-items-center justify-content-center mt-2 mb-3">
      {{method.is_default? $t('vendor_hub.payout_method.default') : $t('vendor_hub.payout_method.non_default')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'VendorPayoutItem',
  props: {
    method: {
      type: Object,
      required: true
    }
  },
  computed:{
    itemImage(){
      return this.method.is_verified? require('~/assets/img/profile/vendor-hub/check-outline.svg'): require('~/assets/img/profile/vendor-hub/cross-outline.svg')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.verified
  color: rgba($color-green-15, 1)
  .fa
    font-size:  18px

.not-verified
  color: rgba($color-red-3, 1)

.default-class
  @include body-4
  width: 150px
  height: 40px
  color: $color-blue-20
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  background: rgba($color-blue-24, 0.08)
  border-radius: 4px

.non-default
  @include body-4
  width: 150px
  height: 40px
  color: $color-gray-5
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  background: rgba($color-gray-5, 0.08)
  border-radius: 4px

.m-40
  margin-left: 40px

::v-deep label.d-block
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

.btn-edit-inventory
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: center
  border: none
  border-radius: 4px

.btn-delete
  width: 30px
  height: 30px
  background-image: url('~/assets/img/product/actions.png')
  background-position: right
  border: none
  border-radius: 4px
</style>
