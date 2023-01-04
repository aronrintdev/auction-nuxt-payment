<template>
  <b-row class="card-list-item">
    <b-col cols="12" class="card-item-col">
      <div class="card-list">
        <b-row class="list-details">
          <!-- Select checkbox -->
          <b-col cols="1">
            <input
              :id="`checkbox-${data.id}`"
              class="form-check-input position-relative m-0"
              type="checkbox"
              :value="data.id"
              :checked="data.is_default === 1 ? true : false"
              @change="onChangeOption(data.id)"
            />
          </b-col>
          <b-col cols="6">
            <b-row>
              <b-col cols="12">
                <div class="card-details">
                  <div class="card-brand">
                    <img :src="cardBrand" alt="card-brand" />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12 d-flex">
                <span
                  v-if="data.is_default === 1"
                  class="
                    default-tag
                    d-flex
                    align-items-center
                    text-align-center
                    justify-content-center
                    mr-8
                  "
                >
                  <span class="default-tag-text">{{
                    $t('preferences.common.default')
                  }}</span>
                </span>
                <span
                  class="
                    d-flex
                    align-items-center
                    text-align-center
                    justify-content-center
                  "
                  :class="[
                    expiryStatus(data.card_expiry_date) === expiredStatus
                      ? 'expired-tag'
                      : 'active-tag',
                  ]"
                >
                  <span class="expired-tag-text d-flex align-items-center text-align-center">{{
                    expiryStatus(data.card_expiry_date)
                  }}</span>
                </span>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="4">
            <div class="card-ending-details float-right d-flex align-items-center mt-1">
              <span v-if="data && data.card_last_digits">
                &times;{{ data.card_last_digits }}
              </span>
            </div>
          </b-col>
          <b-col v-if="data && data.id" cols="1">
            <span
              class="more-options"
              role="button"
              @click="$emit('showOptions', data.id, cardExpired, isDefault)"
            >
              <img
                :src="require('~/assets/img/icons/extra_dot.png')"
                alt="more-options"
              />
            </span>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { ACTIVE, EXPIRED } from '~/static/constants'
export default {
  name: 'CardItem',

  props: {
    data: {
      type: Object,
      default: () => {},
    },

    defaultValue: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        cardBrand: '',
      },
      currentDate: '',
      activeStatus: ACTIVE,
      expiredStatus: EXPIRED,
      cardExpired: false,
    }
  },

  computed: {
    cardBrand: (vm) => {
      try {
        return require(`~/assets/img/preferences/${vm.data.card_brand}-logo.svg`)
      } catch (error) {
        return require('~/assets/img/preferences/visa-logo.svg')
      }
    },

    isDefault: (vm) => {
      return vm.data && vm.data.is_default
    },
  },

  methods: {
    // Update the card payments default status
    onChangeOption(id) {
      this.$axios
        .put(`/preferences/payments/update-default-status/${id}`, {
          default: this.data.is_default !== 1,
        })
        .then((res) => {
          if (!res.data.is_default) {
            this.$emit('newDefaultCard')
          }
          this.defaultCardPayment = res.data.id
          this.$nuxt.refresh()
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Preferences Payments make default: ',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
          this.$nuxt.refresh()
        })
    },

    // Return the active or expired status for cards
    // Currently the expiry date is shown in mm/yy format. So we are appending current year first 2 digit to make yyyy format.
    // TODO: refractor this to show the status with mm/yy format or save expiry as in mm/yyyy format.
    expiryStatus(date) {
      const today = new Date()
      const currentDate = today.getDate()
      const currentYear = today.getFullYear().toString().slice(0, 2)
      const exp = date.split('/')

      const now = this.$options.filters.formatDate(today) // in dd/mm/yy format
      const expDate = this.$options.filters.formatDate(
        new Date(`${currentYear}${exp[1]}-${exp[0]}-${currentDate}`)
      )

      if (new Date(expDate) < new Date(now)) {
        this.cardExpired = true
      }

      return new Date(expDate) > new Date(now)
        ? this.activeStatus
        : this.expiredStatus
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.card-list-item
  .card-ending-details
    font-family: $font-sf-pro-text
    font-style: normal
    @include body-34-medium
    color: $color-black-1
  .card-details
    .card-brand
      img
        width: 37px
        height: 12px
        left: 63px
        top: 602px

  .form-check-input
    accent-color: $color-black-1
    border: 2px solid $color-black-1

  .default-tag
    width: 61px
    height: 22px
    left: 63px
    top: 630px
    background: $color-blue-30
    border-radius: 4px
    &.mr-8
      margin-right: 8px

  .default-tag-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-18-medium
    color: $color-white-1

  .expired-tag
    width: 61px
    height: 22px
    left: 132px
    top: 630px
    background: $color-red-32
    border-radius: 4px

  .expired-tag-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-6-medium
    color: $color-white-1

  .active-tag
    width: 61px
    height: 22px
    left: 132px
    top: 630px
    background: $color-green-35
    border-radius: 4px
</style>