<template>
  <b-row class="mt-4">
    <div class="vd-selling-Inventory col-sm-12 col-md-12">
      <h5 class="text-bold text-capitalize inventory-heading">
        {{ $t('createlisting.inventory') }}
        <span class="inventory-length">
          &#040;{{ inventory }}
          <span v-show="showResult">
            {{ $t('common.results') }}
          </span>
          &#041;
        </span
        >
      </h5>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'InventoryCount',

  props: {
    inventory: {
      type: Number,
      default: 0
    },

    showResult: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 576px)
  .vd-selling-Inventory
    .inventory-heading
      font-family: $font-montserrat
      font-style: normal
      @include body-4-medium
      color: $color-black-1

@media (min-width: 576px)
  .vd-selling-Inventory
    .inventory-heading
      font-family: $font-sp-pro
      font-style: normal
      @include body-1-bold
      color: $color-black-1
</style>