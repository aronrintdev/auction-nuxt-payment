export default {
  methods: {
    chartAfterDrawPlugin(chart, text) {
      let sum = 0
      sum = chart.data.datasets.reduce(
          (accumulator, item) =>
              accumulator + item.data.reduce((acc, val) => acc + val, 0),
          sum
      )
      if (sum === 0 && !chart.options.isAfterDrawDisabled) {
        const ctx = chart.chart.ctx
        const width = chart.chart.width
        const height = chart.chart.height
        ctx.clearRect(width * 0.25, height * 0.25, width * 0.75, height / 2 - 30)
        ctx.fillStyle = '#626262'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '500 18px Montserrat'

        ctx.fillText(text, width / 2, height / 2 - 30)
        ctx.restore()
      }
    },
  },
}
