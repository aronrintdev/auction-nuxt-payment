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
    fill: {
      type: Boolean,
      default: true
    },
    borderWidth: {
      type: Number,
      default: 4
    },
    borderColor: {
      type: String,
      default: '#18A0FB'
    }
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
        this.renderChart(this.chartData, this.options)
      }else{
        this.renderChart(
          {
            borderColor: this.borderColor,
            backgroundColor: 'rgba(24, 160, 251, 0.15)',
            data: this.chartData,
            fill: this.fill,
            label: '',
            borderWidth: this.borderWidth,
          },
        {responsive: true, maintainAspectRatio: false, ...this.options}
    );

    }
    }
  },
});
