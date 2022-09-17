import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('LineChart', {
  extends: Line,
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
