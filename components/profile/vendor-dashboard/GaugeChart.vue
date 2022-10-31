<template>
  <div>
    <svg :height="maxHeight" :width="maxHeight">
      <path ref="gaugeDefault" :stroke="strokeColorBackground" :stroke-width="strokeWidth" fill="none"/>
      <path ref="gauge" :fill="fillColor" :stroke="strokeColor" :stroke-width="strokeWidth"/>
      <foreignObject :height="maxHeight/5*3" :width="maxWidth/5*3" :x="maxWidth/5" :y="maxHeight/5">
        <slot name="center"></slot>
      </foreignObject>
      <foreignObject :height="maxHeight/5*2" :width="maxWidth/5*1.5" :x="maxWidth/3" y="82%">
        <slot name="bottom"></slot>
      </foreignObject>
    </svg>

  </div>
</template>

<script>
export default {
  name: 'GaugeChart',
  props: {
    strokeColor: {
      type: String,
      default: '#000'
    },
    strokeColorBackground: {
      type: String,
      default: '#C4C4C4'
    },
    strokeWidth: {
      type: String,
      default: '20'
    },
    fillColor: {
      type: String,
      default: 'none'
    },
    progress: {
      type: Number,
      default: 70
    },
    radius: {
      type: Number,
      default: 100
    },
    maxWidth: {
      type: Number,
      default: 150
    },
    maxHeight: {
      type: Number,
      default: 150
    }
  },
  mounted() {
    const arcMax = this.progress * 3 - 150
    this.$refs.gauge.setAttribute('d', this.drawArc(this.maxWidth / 2, this.maxHeight / 2, this.radius, -150, arcMax))
    this.$refs.gaugeDefault.setAttribute('d', this.drawArc(this.maxWidth / 2, this.maxHeight / 2, this.radius, -150, 150))
  },
  methods: {
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    },
    drawArc(x, y, radius, startAngle, endAngle) {
      const start = this.polarToCartesian(x, y, radius, endAngle);
      const end = this.polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(' ');
    }

  }
}
</script>

<style scoped>

</style>
