<template>
  <div>
    <div class="bg-white my-3 my-md-2 top-movers-row py-2">
      <div v-if="multiple" class="overflow-hidden">
        <order-multiple-component :order="order" :is-selectable="isSelectable" :value="value"
                                  @labelCreated="handleLabelCreated"
                                  @checked="handleChecked"></order-multiple-component>
      </div>
      <div v-else class="overflow-hidden">
        <order-single-component :order="order" :is-selectable="isSelectable" :value="value"
                                @labelCreated="handleLabelCreated"
                                @checked="handleChecked"></order-single-component>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSingleComponent from '~/components/orders/OrderSingleComponent';
import OrderMultipleComponent from '~/components/orders/OrderMultipleComponent';

export default {
  name: 'TopMoverComponentNew',
  components: {
    OrderMultipleComponent,
    OrderSingleComponent
  },
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    },
    isSelectable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    multiple() {
      return this.order.items.length > 1;
    }
  },
  methods: {
    handleChecked(newVal, oldVal) {
      this.$emit('checked', newVal, oldVal)
    },
    handleLabelCreated() {
      this.$emit('labelCreated')
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'
::v-deep .sf-pro
  font-family: $font-family-sf-pro-display

::v-deep a span.order-id
  text-decoration: underline

::v-deep
  .title
    @include body-5-bold

  .sku, .attribute
    @include body-10
    color: $color-gray-6
    font-weight: $normal

  .status
    width: 141px
    padding: 10px 15px
    border-radius: 4px


@media (max-width: 993px)
  .top-movers-row
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 8px

  ::v-deep .top-movers-row table.table-striped td
    padding: 5px 15px
    font-family: $font-montserrat
    font-size: 12px

  ::v-deep .table-striped tbody tr:nth-of-type(2n)
    background-color: $color-white-5

  ::v-deep .table-striped tbody tr:nth-of-type(2n+1)
    background-color: $color-white-1

  ::v-deep .top-movers-row table.table-striped td:nth-child(1)
    font-weight: $medium

  ::v-deep .top-movers-row table.table-striped td:nth-child(2)
    color: $color-gray-6

</style>
