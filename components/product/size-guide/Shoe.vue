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
      <b-row class="mt-3">
        <b-col md="12" class="text-center">
          <OverallFitSVG />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import OverallFitSVG from '~/assets/img/product/overall-fit.svg?inline'

export default {
  name: 'ProductSizeGuideShoe',
  components: { OverallFitSVG },
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
      items: [
        {
          type: 'US - M',
          s1: '4',
          s2: '4.5',
          s3: '5',
          s4: '5.5',
          s5: '6',
          s6: '6.5',
          s7: '7',
          s8: '7.5',
          s9: '8',
          s10: '8.5',
          s11: '9',
          s12: '9.5',
          s13: '10',
          s14: '10.5',
          s15: '11',
          s16: '11.5',
          s17: '12',
        },
        {
          type: 'US - W',
          s1: '5.5',
          s2: '6',
          s3: '6.5',
          s4: '7',
          s5: '7.5',
          s6: '8',
          s7: '8.5',
          s8: '9',
          s9: '9.5',
          s10: '10',
          s11: '10.5',
          s12: '11',
          s13: '11.5',
          s14: '12',
          s15: '12.5',
          s16: '13',
          s17: '13.5',
        },
        {
          type: 'US - Kids',
          s1: '4Y',
          s2: '4.5Y',
          s3: '5Y',
          s4: '5.5Y',
          s5: '6Y',
          s6: '6.5Y',
          s7: '7Y',
          s8: '7.5Y',
          s9: '8Y',
          s10: '8.5Y',
          s11: '9Y',
          s12: '9.5Y',
          s13: '10.5Y',
          s14: '11Y',
          s15: '11.5Y',
          s16: '12Y',
          s17: '12.5Y',
        },
        {
          type: 'UK',
          s1: '3.5',
          s2: '4',
          s3: '4.5',
          s4: '5',
          s5: '5.5',
          s6: '6',
          s7: '6.5',
          s8: '7',
          s9: '7.5',
          s10: '8',
          s11: '8.5',
          s12: '9',
          s13: '9.5',
          s14: '10',
          s15: '10.5',
          s16: '11',
          s17: '11.5',
        },
        {
          type: 'CM',
          s1: '23',
          s2: '23.5',
          s3: '24',
          s4: '24.5',
          s5: '25',
          s6: '25.5',
          s7: '26',
          s8: '26.5',
          s9: '27',
          s10: '27.5',
          s11: '28',
          s12: '28.5',
          s13: '29',
          s14: '29.5',
          s15: '30',
          s16: '30.5',
          s17: '31',
        },
        {
          type: 'EU',
          s1: '36',
          s2: '36.5',
          s3: '37',
          s4: '37.5',
          s5: '38',
          s6: '38.5',
          s7: '39',
          s8: '39.5',
          s9: '40',
          s10: '40.5',
          s11: '41',
          s12: '41.5',
          s13: '42',
          s14: '42.5',
          s15: '43',
          s16: '43.5',
          s17: '44',
        },
      ],
    }
  },
}
</script>
