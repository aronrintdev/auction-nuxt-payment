<template>
  <div class="mobile-result">
    <b-col class="inventory-card">
      <InventoryItem
        showAddIcon
        :inventory="inventory"
        :selectedItems="selectedItems"
        @select="selectedItem"
      />
    </b-col>
  </div>
</template>

<script>
import InventoryItem from './InventoryItem.vue'
export default {
  name: 'MobileResult',

  components: {
    InventoryItem,
  },

  props: {
    inventory: {
      type: Object,
      default: () => {},
    },

    selectedItems: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    // On item select
    selectedItem({ id, checked }) {
      this.$emit('select', id, checked)
    },
  },
}
</script>