<template>
  <div class="sidebar-wrapper d-flex w-100 flex-column align-items-start">
    <div class="filter-body p-4 w-100 h-100 text-center">
      <div class="vacation-mode-enter-text text-center">
        <p v-if="action === delist" class="text-bold">
          {{ $t('selling_page.confirmation.delist_the_listing') }}
        </p>
        <p v-if="action === delist">
          {{ $t('selling_page.confirmation.all_offers_will_be_lost') }}
        </p>
        <p v-if="action === relist">
          {{ $t('selling_page.confirmation.relist_text') }}
        </p>
      </div>

      <div :class="`delete-confirmation-btn mt-4 `">
        <b-button
          variant="outline w-50"
          class="confirm-btn align-items-center text-align-center"
          @click="$emit('onConfirm')"
        >
          {{
            action === delist
              ? $t('shopping_cart.continue')
              : $t('selling_page.relist')
          }}
        </b-button>
        <b-button
          variant="outline w-50"
          class="cancel-btn bg-white align-items-center text-align-center"
          @click="$emit('onCancel')"
        >
          {{ $t('common.cancel') }}
        </b-button>
        <div class="text-center">
          <img
            :src="require('~/assets/img/icons/home_indicator.svg')"
            alt="footer-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DELIST, RELIST } from '~/static/constants'

export default {
  name: 'ListingConfirmation',

  props: {
    action: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      delist: DELIST,
      relist: RELIST,
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.sidebar-wrapper
  font-family: $font-sp-pro
  height: 450px
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
