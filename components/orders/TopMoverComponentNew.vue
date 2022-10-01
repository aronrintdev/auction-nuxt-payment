<template>
  <div>
    <div v-if="multiple">
      <order-multiple-component :order="order" :is-selectable="isSelectable" :value="value"
                                @labelCreated="handleLabelCreated"
                                @checked="handleChecked"></order-multiple-component>
    </div>
    <div v-else>
      <order-single-component :order="order" :is-selectable="isSelectable" :value="value"
                              @labelCreated="handleLabelCreated"
                              @checked="handleChecked"></order-single-component>
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
      console.debug('checked top-movers-component-new')
      this.$emit('checked', newVal, oldVal)
    },
    handleLabelCreated() {
      this.$emit('labelCreated')
    }
  }
}
</script>

<style scoped>

</style>
