<template>
  <div class="d-stepper">
    <div class="d-stepper-header d-flex justify-content-between">
      <div class="d-stepper-header-bar"></div>
      <div class="d-stepper-header-bar-active" :style="{ width: `${step * 100 / (visibleSteps.length - 1)}%` }"></div>
      <div
        v-for="(stepItem, i) in steps"
        :key="i"
        class="step-number-content text-center"
        :class="{ active: step > i, 'd-none': !stepItem.visible }"
      >
        <div class="step-number align-items-center justify-content-center mx-auto">
          <checkmark v-if="step > i" class="status checkmark" />
          <double-down-arrow v-if="step == i"  class="status" />
          <div class="icon" v-html="require(`~/assets/img/icons/${stepItem.icon}.svg?raw`)" />
        </div>
        <div class="mt-1 small">{{ stepItem.name }}</div>
      </div>
    </div>

    <div v-if="!fatalError">
      <transition :name="effect" mode="out-in">
        <keep-alive>
          <component
            :is="stepComponent"
            ref="step"
            :step="step"
            :data="form"
            @loading="loadingAction"
            @fatal-error="blockStepper"
            @can-continue="nextStepAction"
            @set-step="setStep"
          />
        </keep-alive>
      </transition>
    </div>
    <div v-else>{{ fatalErrorMsg }}</div>
  </div>
</template>

<script>
import Checkmark from '~/assets/img/icons/green-check-mark.svg?inline'
import DoubleDownArrow from '~/assets/img/icons/double-down-arrow.svg?inline'

export default {
  name: 'NewCollectionAuctionStepper',
  components: {
    Checkmark,
    DoubleDownArrow,
  },
  props: {
    steps: { type: Array, default: () => [] },
    initialState: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      step: 0,
      loading: false,
      error: false,
      fatalError: false,
      fatalErrorMsg: '',
      effect: 'in-out-translate-fade',
      shake: false,
      form: {},
    };
  },
  computed: {
    // Get current step
    activeStep() {
      return this.steps[this.step];
    },
    // Get the list of steps that can be displayed in the page
    visibleSteps() {
      return this.steps.filter(step => step.visible);
    },
    stepComponent() {
      return this.steps[this.step].component;
    },
    iconClasses() {
      if (!this.activeStep.icon) return '';
      else if (/\s/.test(this.activeStep.icon)) return this.activeStep.icon;
      return `fas ${this.activeStep.icon}`;
    }
  },
  methods: {
    // Set current active step
    setStep(step) {
      if (step >= 1 && step <= this.steps.length) this.step = step - 1;
    },
    // Stop stepping if there is any error
    blockStepper(msg) {
      this.resetParams();
      this.fatalErrorMsg = msg;
      this.fatalError = true;
    },
    // Reset all properties
    resetParams() {
      this.error = false;
      this.loading = false;
      this.fatalErrorMsg = '';
      this.fatalError = false;
    },
    // Go to next step
    nextStepAction(data) {
      this.effect = 'in-out-translate-fade';
      this.resetParams();
      this.form = {
        ...this.form,
        ...data,
      }
      if (this.step < this.steps.length - 1) this.step++;
    },
    // Go back to prev step
    backStep() {
      this.effect = 'out-in-translate-fade';
      this.resetParams();
      if (this.step > 0) this.step--;
    },
    // Set loading mode
    loadingAction(status) {
      this.loading = status;
    }
  }
};
</script>
