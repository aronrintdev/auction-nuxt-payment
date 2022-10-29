<template>
  <div class="more-options">
    <div :class="`header w-100 px-3 py-3 border-bottom`">
      <div :class="`filter-by w-100  justify-content-center`">
        <span class="more-option-heading d-flex align-items-center">{{ $t('common.options') }}</span>
      </div>
    </div>
    <div v-if="status === listed" :class="`body w-100 px-3 py-3 border-bottom`">
      <div
        :class="`filter-by w-100  justify-content-center`"
        role="button"
        @click="$emit('modifyListing')"
      >
        <span class="more-option-body d-flex align-items-center justify-content-between"
          >{{ $t('selling_page.modify_listing') }}
          
        </span>
      </div>
    </div>

    <div v-if="status === listed" :class="`body w-100 px-3 py-3 border-bottom`">
      <div
        :class="`filter-by w-100  justify-content-center`"
        role="button"
        @click="$emit('delist')"
      >
        <span class="more-option-body d-flex align-items-center justify-content-between"
          >{{ $t('selling_page.delist') }}
        </span>
      </div>
    </div>
    <div v-if="status === delisted" :class="`body w-100 px-3 py-3 border-bottom`">
      <div
        :class="`filter-by w-100  justify-content-center`"
        role="button"
        @click="$emit('relist')"
      >
        <span class="more-option-body d-flex align-items-center justify-content-between"
          >{{ $t('selling_page.relist') }}
        </span>
      </div>
    </div>
    <div :class="`body w-100 px-3 py-3`">
      <div :class="`filter-by w-100  justify-content-center`" >
        <span class="more-option-body" role="button" @click="$emit('close')">{{ $t('common.cancel') }}</span>
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
import { DELISTED, LISTED } from '~/static/constants'
export default {
  name: 'Actions',

  props: {
    details: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      enableVacationMode: false,
      delisted: DELISTED,
      listed: LISTED
    }
  },

  computed: {
    status: (vm) => {
      return vm.details && vm.details.status
    }
  }
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
  font-family: $font-sp-pro
  font-style: normal
  @include body-17-normal
  letter-spacing: -0.02em
  color: $color-black-1
</style>