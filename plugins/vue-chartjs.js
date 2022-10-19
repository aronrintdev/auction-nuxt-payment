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
            fill: true,
            label: '',
            borderWidth: 4,
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );      
    }
  },
});