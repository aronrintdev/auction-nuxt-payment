<template>
  <div class="sidebar-wrapper  d-flex w-100 flex-column align-items-start">
    <div class="header  w-100 px-5 py-3">
      <div class="filter-by w-100  d-flex aling-items-center justify-content-center">
        <span v-show="enteringVacationMode">{{ $t('selling_page.vacation_mode.entering_vacation_mode') }}</span>
        <span v-show="exitingVacationMode">{{ $t('selling_page.vacation_mode.exiting_vacation_mode') }}</span>
      </div>
    </div>
    <div class="filter-body  p-4 w-100 h-100 text-center">
      <div v-show="enteringVacationMode" class="vacation-mode-enter-text text-center">
        <p>{{ $t('selling_page.vacation_mode.active_listing_become_delisted') }}</p>
        <p>{{ $t('selling_page.vacation_mode.giveup_all_placed_offers') }}</p>
        <p>{{ $t('selling_page.vacation_mode.enable_vacation_mode') }}</p>
      </div>
      <div v-show="exitingVacationMode" class="vacation-mode-enter-text text-center">
        <p>{{ $t('selling_page.vacation_mode.all_listing_become_relisted') }}</p>
        <p>{{ $t('selling_page.vacation_mode.disable_vacation_mode') }}</p>
      </div>

      <div :class="`delete-confirmation-btn mt-4 ${!enteringVacationMode && 'bottom-0 w-100' } `">
      <b-button
        variant="outline w-50"
        class="confirm-btn align-items-center text-align-center"
        @click="$emit('onConfirm')"
      >
        {{ enteringVacationMode ?  $t('common.enable') : $t('common.disable')}}
      </b-button>
      <b-button
        variant="outline w-50"
        class="cancel-btn bg-white align-items-center text-align-center"
        @click="$emit('onCancel')"
      >
        {{ $t('common.cancel') }}
      </b-button>
      <div class="text-center">
      <img :src="require('~/assets/img/icons/home_indicator.svg')" alt="footer-icon">
    </div>
    </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'VacationModeConfirmation',

  props: {
    enteringVacationMode: {
      type: Boolean,
      default: false
    },

    exitingVacationMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.sidebar-wrapper
  font-family: $font-sp-pro
  height: 450px
  .section-actions
    margin-top: 20%

/** Filter css */
.filter-by
  font-family: $font-sp-pro
  font-style: normal
  @include body-17-bold
  letter-spacing: -0.02em
  color: $color-black-1
/** Filter css ends */
.vacation-mode-enter-text
  font-family: $font-sf-pro-text
  font-style: normal
  @include body-17-normal
  letter-spacing: -0.02em
  color: $color-black-1

.confirm-btn
  background: $color-blue-20
  border-radius: 21px
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-white-1
.cancel-btn
  font-family: $font-sp-pro
  font-style: normal
  @include body-17-medium
  color: $color-blue-20
</style>
