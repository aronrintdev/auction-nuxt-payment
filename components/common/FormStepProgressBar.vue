<template>
  <!--
   Steps are necessary to show
   stepper in any component it will
   be either hard coded or from api
   in case of no steps it will hidden
   -->
  <b-row :cols="steps.length" class="trade_form_progress text-xs text-center">
    <b-col v-for="(step, index) in steps" :key="`step-name-${index}`" class="step-heading">
      {{ step.name }}
    </b-col>
    <b-col v-for="(step, index) in steps" :key="`step-circle-${index}`" class="step-indicator"
           :class="step.active ? 'active' : ''">
      <b-list-group column class="d-inline-block">
        <b-list-group-item class="border-0" :class="`back-color-${variant}`">
          <span class="d-inline-block circle rounded-circle bg-transparent border border-dark border-1"/>
        </b-list-group-item>
      </b-list-group>
      <span v-if="index < (steps.length - 1)" class="simple-line"></span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'FormStepProgressBar',
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    variant: {
      type: String,
      default: 'primary'
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.circle
  height: 15px
  width: 15px
  @media (max-width: 500px) and (min-width: 300px)
    margin-left: 20px

.step-indicator.active .circle
    background-color: $color-blue-2 !important

.simple-line
  margin-left: -10px
  height: 1px
  width: 77%
  background-color: $color-black-1
  position: absolute
  top: 47%
  @media (max-width: 500px) and (min-width: 300px)
    margin-left: -16px


.back-color-primary
  background: $color-white-1

.back-color-transparent
  background: transparent


.trade_form_progress
  @media (max-width: 399px) and (min-width: 350px)
    width: 320px
    height: 85px
  @media (max-width: 349px) and (min-width: 300px)
    width: 274px
    height: 85px
  @media (max-width: 500px) and (min-width: 400px)
    width: 363px
    height: 85px
.step-heading
  @media (max-width: 500px) and (min-width: 300px)
    font-size: 12px
</style>
