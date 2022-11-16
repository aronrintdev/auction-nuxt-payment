<template>
  <div class="countdown d-flex align-items-center">
    <i class="fa fa-clock-o mr-1 fa-2x" aria-hidden="true"></i>
    <vue-countdown
      :auto-start="true"
      :time="60000"
      v-slot="{ days, hours, minutes, seconds }"
      :transform="transformSlotProps"
    >
      <template v-if="days > 0">
         <span>{{ days }}</span>d <span>{{ hours }}</span>h
      </template>
      <template v-if="hours > 0">
        <span>{{ hours }}</span>h <span>{{ minutes }}</span>h
      </template>
      <template v-else>
         <span>{{ minutes }}</span>m <span>{{ seconds }}s</span>
      </template>
    </vue-countdown>
  </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
export default {
  name: 'CountdownItem',
  components: { VueCountdown },
  props: {
    time: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.countdown
  background-color: $color-red-30
  position: absolute
  width: auto
  top: 10px
  left: 15px
  padding: 5px
  @include body-18-medium
  color: $color-white
  z-index: 1
</style>
