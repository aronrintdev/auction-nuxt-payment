<template>
  <b-row :class="meterText ? 'col-md-9': 'col-md-10'">
    <b-col md="8" class="">
      <b-col v-if="meterText" class="d-flex justify-content-between meter-text pb-1">
        <div>{{$t('trades.preferences.poor')}}</div>
        <div>{{$t('trades.preferences.fair')}}</div>
      </b-col>
      <client-only>
        <vue-slider
          :value="value"
          :drag-on-click="false"
          :enable-cross="false"
          :max="maxValue"
          :min="minValue"
          tooltip="none"
          v-bind="options"
          class="vue-slider-ltr-shop"
          :class="{'meter': meterText ,'meterSneaker' : meterTextSneaker }"
          @change="captureSliderValue"
        >
          <template v-if="meterText" #dot>
            <img :src="require('~/assets/img/trades/dot.svg')" class="custom-dot"/>
          </template>
          <template v-else-if="meterTextSneaker" #dot>
            <img height="24px" width="24px" :src="require('~/assets/img/grey-circle.svg')" class="custom-dot"/>
          </template>
          <template v-else #dot>
            <img :src="require('~/assets/img/trades/dot-blue.svg')" class="custom-dot"/>
          </template>
        </vue-slider>
      </client-only>
      <b-col v-if="belowText" class="d-flex justify-content-between below-text pt-2">
        <div>{{$t('trades.preferences.not_interested')}}</div>
        <div>{{$t('trades.preferences.interested')}}</div>
      </b-col>
    </b-col>
    <b-col md="4" class="pl-4 pr-0">
      <div class="input-box">
        <input class="percentage-value"  :value="`${value}%`" readonly />
        <span v-if="textToShow" class="input-text pl-2">{{textToShow}}</span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SingleSlider',
  props:{
    maxValue: {
      type: Number,
      default: 100,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    textToShow: {
      type: String,
      default: null,
    },
    meterText: {
      type: Boolean,
      default: false,
    },
    meterTextSneaker: {
      type: Boolean,
      default: false,
    },
    belowText: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      options: {
        height: 6,
        dotSize: 30,
      }
    }
  },
  methods: {
    captureSliderValue(val){
      this.$emit('slide', val)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.custom-dot
  margin-top: -17px

::v-deep.meter.vue-slider-ltr-shop .vue-slider-rail
  background: linear-gradient(180deg, $red-rgba 0%, $yellow-rgba 100%)

::v-deep.meter.vue-slider-ltr-shop .vue-slider-process
  background: linear-gradient(180deg, $red-rgba 0%, $yellow-rgba 293.51%, $yellow-rgba 293.54%)

::v-deep.meterSneaker.vue-slider-ltr-shop .vue-slider-process
  background: $color-blue-20

.percentage-value
  border: 1.5px solid $color-gray-60
  border-radius: 10px
  width: 62px
  height: 42px
  text-align: center
  font-family: $font-family-montserrat
  font-style: normal
  @include body-2-medium
  color: $color-black-1

.input-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-2-medium
  color: $color-black-1

.meter-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-black-1

.below-text
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 18px
  color: $color-black-1

</style>
