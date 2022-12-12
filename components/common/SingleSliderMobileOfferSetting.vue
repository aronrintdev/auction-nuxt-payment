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
              :class="{'meter': meterText }"
              @change="captureSliderValue"
            >
              <template v-if="meterText" #dot>
                <img :src="require('~/assets/img/trades/dot.svg')" class="custom-dot"/>
              </template>
              <template v-else #dot>
                <img :src="require('~/assets/img/grey-circle.svg')" class="custom-dot"/>
              </template>
            </vue-slider>
          </client-only>
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
        height: 3,
        dotSize: 15,
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
  margin-top: -9px
  height : 15px

::v-deep.meter.vue-slider-ltr-shop .vue-slider-rail
  background: linear-gradient(180deg, $red-rgba 0%, $yellow-rgba 100%)

::v-deep.meter.vue-slider-ltr-shop .vue-slider-process
  background: linear-gradient(180deg, $red-rgba 0%, $yellow-rgba 293.51%, $yellow-rgba 293.54%)

.percentage-value
  width: 35px
  height: 35px
  background: #F7F7F7
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25)
  border: 1px solid #F7F7F7
  border-radius: 5px
  @include body-9
  color: $color-black-1
  float: right
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  line-height: 100%


.input-text
  font-family: $font-family-montserrat
  font-style: normal
  font-size: 12px
  color: $color-black-1
  float: right

.meter-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-9
  color: $color-black-1

.below-text
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $light
  @include body-9
  line-height: 100%
  color: $color-black-16
.small-space
  margin-right: 7.2rem
.slider-div
  width: 100%
.percent-div
  margin-top: -10px
  margin-left: 20px
   //width: 30%
</style>
