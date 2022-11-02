import Vue from 'vue'
import { Line ,mixins} from 'vue-chartjs'

const { reactiveProp } = mixins
Vue.component('LineChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
    data: {
      type: Array,
      default: null
    },
    labels: {
      type: Array,
      default: null
    },
    isGraph: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Array,
      default: null
    },
  },
  computed: {
    chartDetail() {
      return this.data;
    },
    chartLabels(){
      return this.labels
    }
  },
  watch: {
    data() {
      this.renderLineChart();
    }
  },
  mounted() {
    this.renderLineChart();
    this.$emit('mounted')
  },

  methods: {
    renderLineChart() {
      if (this.isGraph === true)
      {
        // this.renderChart(this.chartData, this.options)
        this.renderChart(this.chartData, this.options)
        // this.renderChart(
        //   {
        //     labels: this.chartLabels,
        //     datasets: [
        //       {
        //         label: 'Data One',
        //         backgroundColor: '#f87979',
        //         data: this.chartData
        //       }
        //     ]
        //   },
        //   { responsive: true, maintainAspectRatio: false }
        // )
      }else{
        this.renderChart(
          {
            labels: this.chartLabels,
            datasets: [
              {
                borderColor: '#18A0FB',
                backgroundColor: 'rgba(24, 160, 251, 0.15)',
                data: this.chartDetail,
                fill: true,
                label: '',
                borderWidth: 4,
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }


    }
  },
});
