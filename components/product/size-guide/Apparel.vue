<template>
  <b-row class="w-100">
    <b-col md="12">
      <b-row>
        <b-col md="12">
          <b-table
            responsive
            :items="items"
            striped
            thead-class="d-none"
            borderless
          >
            <template #cell(type)="data">
              <span class="body-4-medium">{{ data.item.type }}</span>
            </template>
            <template #cell()="data">
              <span v-if="isSizeSelected(data.field.key)" class="body-4-medium">{{ data.value }}</span>
              <span v-else class="body-4-regular">{{ data.value }}</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { APPAREL_SIZE_GUIDE_ITEMS } from '~/static/constants/sizes'

export default {
  name: 'ProductSizeGuideApparel',
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
      ],
      items: APPAREL_SIZE_GUIDE_ITEMS,
    }
  },
  methods: {
    isSizeSelected(sizeKey) {
      return this.items.find(item => {
        if (item.type === 'Standard') {
          const sizes = Object.keys(item).length

          for (let i = 1; i < sizes ; i++) {
            if (item[`s${i}`] === this.selectedSize.size) {
              return `s${i}` === sizeKey
            }
          }
        }

        return false
      })
    }
  },
}
</script>
