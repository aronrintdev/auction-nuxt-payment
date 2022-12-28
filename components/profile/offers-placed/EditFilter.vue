<template>
  <div class="edit-filter-wrapper" @closed="inputAmount = ''">
    <div class="w-100 d-flex justify-content-between ">
        <span class="ml-3 edit-offer-title d-flex align-items-center text-center">{{ $t('placed_offers.edit_offer') }}</span>
        <span
          class="header-cancel d-flex align-items-center text-center"
          role="button"
          @click="$emit('closed')"
        >{{ $t('common.cancel') }}</span>
    </div>
    <hr class="title-underline" />
    <div
      class="
        edit-amount-bottom-sheet
        w-100
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <span class="ml-3 edit-amount" role="button">
        {{ $t('placed_offers.edit_offer_amount') }}
      </span>

      <span class="edit-amount-sheet">
        <input
          id="edit-amount-box"
          type="number"
          class="edit-amount-btn align-items-center text-center"
          :value="$options.filters.formatPrice(highestOfferAmount)"
          @input="onInputAmount"
        />
      </span>
    </div>
    <div
      class="
        edit-amount-bottom-sheet
        w-100
        px-3
        d-flex
        align-items-center
        justify-content-between
      "
      @click="$emit('deleteEditOffer')"
    >
      <span role="button">
        {{ $t('placed_offers.edit_offer_delete') }}
      </span>
      <span
        ><img
          :src="require('~/assets/img/icons/arrow-right-black-small.svg')"
          alt="more-option"
      /></span>
    </div>

    <div class="d-flex justify-content-center">
      <b-button
        variant="save-edit-offer"
        class="
          align-items-center
          text-align-center
          d-flex
          justify-content-center
        "
        @click="editOffer"
      >
        {{ $t('common.save') }}
      </b-button>
    </div>
    <div class="text-center position-absolute bottom-indicator w-100">
      <img
        :src="require('~/assets/img/icons/home_indicator.svg')"
        alt="footer-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditFilter',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      required: true,
    },
    highestOfferAmount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      showSaveBtn: false,
      inputAmount: '',
    }
  },


  methods: {
    // enabling save button
    showSaveButton() {
      this.showSaveBtn = true
    },

    onInputAmount(event){
      this.inputAmount = event.target.value
    },

    // Editing the offer amount
    editOffer() {
      this.$axios
        .patch(`offers/${this.id}`, {
          amount: this.inputAmount * 100,
        })
        .then((res) => {
          this.$emit('closed')
          this.$bvModal.show('edit-offer-success')
          this.offer = res.data.data
        })
        .catch((err) => {
          this.$logger.logToServer('Edit Offer', err.response)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.edit-filter-wrapper
  .title-underline
    border: 0.5px solid $color-gray-47
  .btn-save-edit-offer
    margin-top: 20px
    background: $color-blue-20
    border-radius: 21px
    width: 216px
    height: 40px
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-white-1
  .edit-amount-bottom-sheet
    width: 111px
    height: 20px
    left: 22px
    top: 630px
    font-family: $font-sp-pro
    font-style: normal
    @include body-8-normal
    padding-top: 26px
    padding-bottom: 26px
    border-bottom: 0.5px solid $color-gray-4

  .edit-amount-btn
    box-sizing: border-box
    border: 1px solid $color-gray-4
    border-radius: 8px
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-medium
    color: $color-black-1
    background: $color-white-1
    width: 75px
    height: 37px
    text-size: 10px
  .bottom-indicator
    bottom: 0
  #edit-amount-box
    margin-right: 20px
    margin-top: 8px
    margin-bottom: 8px
    &::placeholder
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-bold
      letter-spacing: 0.045em
      color: $color-black-1
  .edit-offer-title
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-bold
    letter-spacing: -0.02em
    color: $color-black-1
  .header-cancel
    font-family: $font-sp-pro
    font-style: normal
    margin-right: 20px
    @include body-17-bold
    color: $color-blue-20
</style>
