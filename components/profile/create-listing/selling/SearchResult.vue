<template>
  <div class="search-result bg-white">
    <div
      v-for="(result, index) in searchResult"
      :key="index"
      class="
        result
        d-flex
        justify-content-between
        px-2
        item
        search-result-item
        mb-1
      "
    >
      <!-- Product Thumb -->
      <img
        :src="result.image"
        alt="product-img"
        class="product-image my-auto"
      />
      <!-- Product Thumb ends -->
      <span class="product-name my-auto">
        {{ result.name }}
      </span>
      <Button
        variant="add"
        class="my-auto d-flex align-items-center text-center text-white text-decoration-none"
        @click="onAddItemClick(result)"
      >
        {{ $t('common.add') }}
      </Button>
    </div>
    <div v-if="searchResult.length" class="suggest-yours px-3 py-2">
      <span>{{ $t('inventory.dont_see_your_product') }}</span>
      &nbsp;
      <span class="float-right text-decoration-underline">{{
        $t('inventory.suggest_new_product')
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Button } from '~/components/common'
export default {
  name: 'SearchResult',

  components: {
    Button,
  },

  props: {
    searchResult: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    ...mapActions({
      showProductDetails: 'create-listing/showProductDetails',
      addSimilarProducts: 'create-listing/addSimilarProducts',
    }),

    // On add item click
    onAddItemClick(res) {
      this.showProductDetails({ sku: res.sku, id: res.id })
        .then((result) => {
          if (result.data && result.data.length > 1) {
            this.addSimilarProducts(result.data)
            this.$router.push(
              `/profile/create-listing/selling/${res.sku}/clarification`
            )
          } else {
            this.$router.push(
              `/profile/create-listing/selling/product/${res.id}`
            )
          }
        })
        .catch((err) => {
          this.$logger.logToServer(err.response)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.search-result
  .product-image
    width: 58px
    height: 36px
    left: 29px
    top: 185px
  .btn-add
    font-family: $font-sp-pro
    font-style: normal
    @include body-31-medium
    width: 54px
    color: $color-white-1
    height: 22px
    background: $color-blue-20
    border: 1px solid $color-blue-20
    border-radius: 5px
</style>