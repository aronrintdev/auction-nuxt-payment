import Vue from 'vue'
import { Doughnut } from 'vue-chartjs'


Vue.component('DoughnutChart', {
  extends: Doughnut,
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
    bgColors: {
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
    },
    colors(){
      return this.bgColors
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
        datasets: [{
            backgroundColor: this.colors,
            data: this.chartData,
          }
        ]
      },
      this.options
    );
    }
  },
});