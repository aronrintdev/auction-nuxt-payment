<template>
  <b-row class="w-100">
    <b-col md="12">
      <b-row>
        <b-col md="12">
          <b-table
            responsive
            :items="items"
            striped
            :fields="fields"
            thead-class="d-none"
            borderless
          >
            <template #cell(type)="data">
              <span class="body-4-medium">{{ data.item.type }}</span>
            </template>
            <template #cell()="data">
              <span v-if="data.field.key === `s${selectedSize - 1}`" class="body-4-medium">{{ data.value }}</span>
              <span v-else class="body-4-regular">{{ data.value }}</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { SIZE_GUIDE_ITEMS } from '~/static/constants/sizes'

export default {
  name: 'ProductSizeGuideShoe',
  props: {
    selectedSize: {
      type: Number,
      required: false,
      default: 0,
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
}
</script>
