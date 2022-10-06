<template>
  <div class="bottom-pop-confirmation text-center">
    <div class="delete-confirmation-text text-center">
      {{ $t('offers_received.delete_selected_confirm') }}
    </div>
    <div class="delete-confirmation-btn mt-4">
      <b-button
        variant="outline w-50"
        class="confirm-btn align-items-center text-align-center"
        @click="$emit('onDeleteConfirm')"
      >
        {{ $t('common.yes') }}
      </b-button>
      <b-button
        variant="outline w-50"
        class="confirm-btn bg-white align-items-center text-align-center"
        @click="$emit('onCancelConfirm')"
      >
        {{ $t('common.no') }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirmation',
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.bottom-pop-confirmation
  width: 375px
  height: 236px
  left: 0px
  top: 919px
  .delete-confirmation-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-normal
    color: $color-black-1
  .confirm-btn
    background: $color-blue-20
    border-radius: 21px
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-white-1
</style>