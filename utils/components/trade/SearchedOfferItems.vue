<template>
  <b-row v-show="searchedOfferItems.length" cols="1" class="text-xs w-100 searched-item-row" :style="{'max-width': width}">
    <b-col align-self="center">
      <b-list-group v-for="(item, index) in searchedOfferItems" :key="`searched-item-${index}`">
        <b-list-group-item class="text-xs">
          <span class="searched-product-image mr-2 col-md-2"><img :src="item.image" width="40px" height="40px" /></span>
          <span class="searched-product-name align-self-center mt-5 col-md-7">{{item.name}}</span>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SearchedOfferItems',
  props: {
    searchedOfferItems: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: 'unset',
    },
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_typography'
.searched-item-row
  font-weight: $normal
  z-index: 100000
</style>
