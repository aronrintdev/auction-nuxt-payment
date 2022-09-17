<template>
  <div class="card-list-wrapper">
    <!-- No Products Found -->
    <h5 v-if="!products.total" class="text-center text-bold w-100">
      {{ $t('message.no_products_found') }}
    </h5>
    <!-- No Products Found -->

    <div v-else>
      <b-row v-if="products.data.length > 0">
        <b-col
          v-for="product in products.data"
          :key="`product-${product.id}`"
          class="product-card"
          :style="{
            flex: '0 0 ' + colWidth,
            'max-width': colWidth,
          }"
        >
          <ProductCard :product="product" />
        </b-col>
      </b-row>

      <Pagination
        v-if="products.total > 0"
        :value="page"
        :total="products.total"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="pagination-group"
        @input="handlePageChange"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/product/Card.vue'
import { Pagination } from '~/components/common'

export default {
  components: { ProductCard, Pagination },

  props: {
    products: {
      type: Object,
      default: () => {},
    },
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: null,
    },
    margin: {
      type: Object,
      default: () => {},
    },
    cardWidth: {
      type: Number,
      default: 213,
    },
    cardPadding: {
      type: Number,
      default: 65,
    },
    rows: {
      type: Array,
      default: () => [2, 4, 6, 8, 12],
    },
  },

  data() {
    return {
      perPageOptions: [],
    }
  },

  computed: {
    colWidth() {
      return (
        (100 / this.perPage) *
          this.rows[this.perPageOptions.indexOf(this.perPage)] +
        '%'
      )
    },
  },

  beforeMount() {
    window.addEventListener('resize', this.updatePerPageOptions)
    this.updatePerPageOptions()
  },

  destroyed() {
    window.removeEventListener('resize', this.updatePerPageOptions)
  },

  methods: {
    updatePerPageOptions() {
      const width = window.innerWidth
      let margin = 0
      Object.keys(this.margin)
        .sort((a, b) => a - b)
        .forEach((key) => {
          if (key < width) {
            margin = this.margin[key]
          }
        })
      let count = Math.floor((width - margin) / this.cardWidth)
      if (
        (width - margin - this.cardWidth * count) / this.cardPadding <
        count - 1
      ) {
        count = count - 1
      }
      const options = this.rows.map((row) => count * row)
      if (options[0] !== this.perPageOptions[0]) {
        this.perPageOptions = options
        this.$emit('page-change', 1, options[0])
      }
    },

    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.$emit('page-change', page, this.perPage)
      }
    },

    handlePageChange(value) {
      if (this.page !== value) {
        this.$emit('page-change', value, this.perPage)
      }
    },

    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.$emit('page-change', this.page, value)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
.card-list-wrapper
  .product-card
    flex: 0 0 100%
    max-width: 100%
</style>
