<template>
  <LineChart
    :chart-data="lineDatasets"
    :options="lineChartOptions"
    class="line-chart"
    chart-id="vendor-dashboard-line-chart"
  />
</template>
<script>
export default {
  name: 'VendorDashboardLineChart',
  props: {
    lineDatasets: {
      type: Object,
      default() {
        return {}
      },
    },
    lineChartOptions: {
      type: Object,
      default() {
        return {}
      },
    }
  },
  mounted(){
    console.log(this.lineChartOptions)
    console.log(this.lineChartOptions)
  }
}
</script>
<style lang="sass">
.doughnut-chart
  #vendor-dashboard-doughnut-chart
    height: 280px
.line-chart
  #vendor-dashboard-line-chart
    height: 280px
.dropdownSelect
  width: 180px
</style>