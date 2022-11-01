import Vue from 'vue'
import { Line } from 'vue-chartjs'


Vue.component('LineChart', {
  extends: Line,
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
    fill: {
      type: Boolean,
      default: true
    },
    borderWidth: {
      type: Number,
      default: 4
    }
  },
  computed: {
    chartData() {
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
  },

  methods: {
    renderLineChart() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: this.chartData,
            fill: this.fill,
            label: '',
            borderWidth: this.borderWidth,
          }
        ]
      },
        {responsive: true, maintainAspectRatio: false, ...this.options}
    );
    }
  },
});
