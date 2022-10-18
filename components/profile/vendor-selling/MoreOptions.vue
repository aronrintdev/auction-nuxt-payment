<template>
  <div class="more-options">
    <div :class="`header w-100 px-3 py-3 border-bottom`">
      <div :class="`filter-by w-100  justify-content-center`">
        <span class="more-option-heading d-flex align-items-center">{{ $t('common.options') }}</span>
      </div>
    </div>
    <div :class="`body w-100 px-3 py-3 border-bottom`">
      <div
        :class="`filter-by w-100  justify-content-center`"
        role="button"
        @click="$emit('delistMultiple')"
      >
        <span class="more-option-body d-flex align-items-center justify-content-between"
          >{{ $t('selling_page.delist_multiple') }}
          <span>
            <img
              :src="require('~/assets/img/icons/pagination-arrow-right.svg')"
              alt="more-option"
            />
          </span>
        </span>
      </div>
    </div>
    <div :class="`body w-100 px-3 py-3 border-bottom`">
      <div :class="`filter-by w-100  justify-content-center`">
        <span class="more-option-body d-flex align-items-center justify-content-between"
          >{{ $t('selling_page.enable_vacation_mode') }}
          <CheckboxSwitch v-model="enableVacationMode" />
        </span>
      </div>
    </div>
    <div :class="`body w-100 px-3 py-3`">
      <div :class="`filter-by w-100  justify-content-center`" >
        <span class="more-option-body d-flex align-items-center" role="button" @click="$emit('close')">{{ $t('common.cancel') }}</span>
      </div>
    </div>
    <div class="text-center">
      <img
        :src="require('~/assets/img/icons/home_indicator.svg')"
        alt="footer-icon"
      />
    </div>
  </div>
</template>

<script>
import { CheckboxSwitch } from '~/components/common'
export default {
  name: 'MoreOptions',

  components: {
    CheckboxSwitch,
  },

  data() {
    return {
      enableVacationMode: false,
    }
  },

  computed: {
    enableVacationModeSelection: (vm) => {
      return vm.enableVacationMode
    },
  },

  watch: {
    enableVacationModeSelection(value) {
      if (value === true) {
        this.$emit('enterVacationModeConfirmation')
      }
      if (value === false) {
        this.$emit('exitVacationModeConfirmation')
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.more-option-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-17-medium
  letter-spacing: -0.02em
  color: $color-black-1
.more-option-body
  font-family:$font-sp-pro
  font-style: normal
  @include body-17-normal
  letter-spacing: -0.02em
  color: $color-black-1
.more-option-body::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::before
      background-color: $color-green-16
      border-color: $color-green-16
</style>