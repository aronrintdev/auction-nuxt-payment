<template>
  <div class="w-100">
    <b-table
      responsive
      :items="items"
      striped
      :fields="fields"
      thead-class="d-none"
      borderless
      class="sbs-size-guide-table"
    >
      <template #cell(type)="data">
        <span class="body-4-medium no-wrap">{{ data.item.type }}</span>
      </template>
      <template #cell()="data">
        <span v-if="isSizeSelected(data.field.key)" class="body-4-medium">{{
          data.value
        }}</span>
        <span v-else class="body-4-regular">{{ data.value }}</span>
      </template>
    </b-table>
  </div>
</template>
<script>
import { SIZE_GUIDE_ITEMS } from '~/static/constants/sizes'

export default {
  name: 'ProductSizeGuideShoe',
  props: {
    selectedSize: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'type',
          stickyColumn: true,
        },
        's1',
        's2',
        's3',
        's4',
        's5',
        's6',
        's7',
        's8',
        's9',
        's10',
        's11',
        's12',
        's13',
        's14',
        's15',
        's16',
        's17',
      ],
      items: SIZE_GUIDE_ITEMS,
    }
  },
  methods: {
    isSizeSelected(sizeKey) {
      return this.items.find((item) => {
        if (item.label_key === this.selectedSize.type) {
          const sizes = Object.keys(item).length - 1

          for (let i = 1; i < sizes; i++) {
            if (item[`s${i}`] === this.selectedSize.size) {
              return `s${i}` === sizeKey
            }
          }
        }

        return false
      })
    },
  },
}
</script>
