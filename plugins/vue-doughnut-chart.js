import Vue from 'vue'
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
Vue.component('DoughnutChart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    options: {
      handler() {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
    this.$emit('mounted')
  },
  methods: {
    redraw() {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    },
  },
})
