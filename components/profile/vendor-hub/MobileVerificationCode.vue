<template>
<div class="p-3">
  <div class="text-center body-17">
    {{ $t('vendor_hub.mobile.verification_message_sent') }}<br><br>
    {{ $t('vendor_hub.mobile.verification_details_message') }}
  </div>
  <div class="my-4">
    <div class="d-flex justify-content-center">
      <div class="mr-2">
        <b-form-input
        id="verify"
        v-model="code"
        :placeholder="$t('vendor_hub.form.enter_code')"
        class="rounded-pill field-input verify-input"
        type="text">
      </b-form-input>
        <div v-if="showCodeFailError !== null && !showCodeFailError"
             class="text-red-6 body-9-normal pt-1">
        {{ $tc('vendor_hub.invalid_code', codeTry) }}
      </div>
      </div>
      <div>
        <div class="d-flex bg-dark d-flex align-items-center rounded mb-1">
          <ClockIcon :stroke-color="'#fff'" style="height: 14px" class="mx-2"></ClockIcon>
          <vue-countdown
            v-if="codeSent"
            v-slot="{minutes, seconds}"
            :auto-start="true"
            :time="VERIFICATION_TIMER"
            :transform="transformSlotProps"
            @end="onCountdownEnd"
            @progress="onTimerProgress">
          <div class="text-white pr-2 py-1 text-center">
            {{ minutes }}: {{ seconds }}
          </div>
          </vue-countdown>
        </div>
        <a class="text-decoration-underline body-10-normal" :class="codeTry > 0 ? 'text-gray-6' : 'text-black'"
           @click="() => codeTry === 0 ? $emit('resendCode') : null">
          Resend Code
        </a>
      </div>
    </div>


  </div>
  <div class="my-2 text-center">


    <b-form-checkbox v-model="agree" class="form-check-input ml-2" maxlength="6" pattern="\d*" type="text">
      <div class="position-relative">
        <div v-b-popover.hover.top="$t('vendor_hub.form.info_popover')"
             class="position-absolute mt-n2 mr-n3 info-icon body-5-regular text-gray-6" role="button" />
        <span class="body-5-regular text-gray-6">{{ $tc('vendor_hub.form.terms_conditions', 1) }}</span>
        <a href="#" class="body-5-regular">{{ $tc('vendor_hub.form.terms_conditions', 2) }}</a>
      </div>
    </b-form-checkbox>
  </div>
  <div class="d-flex flex-column">
    <Button :disabled="!agree || codeTry == 0" type="button" class="verify mt-4 mt-md-0 mx-3" pill @click="onSubmit">
      {{ $t(nextButtonText) }}
    </Button>
    <a role="button" class="verify-cancel text-center w-100 mt-3 body-5-medium" @click="$emit('close')" >
      {{ $t('common.cancel') }}
    </a>
  </div>
</div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
import {Button} from '~/components/common'
import {VERIFICATION_TIMER} from '~/static/constants'
import ClockIcon from '~/components/profile/vendor-hub/ClockIcon'

export default {
  name: 'MobileVerificationCode',
  components: {
    Button, ClockIcon, VueCountdown
  },
  props: {
    codeSent: {
      type: Boolean,
      required: true
    },
    showCodeFailError: {
      type: Boolean,
      default: null
    },
    codeTry: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true
    },
    nextButtonText: {
      type: String,
      default: 'common.next'
    }
  },
  data() {
    return {
      VERIFICATION_TIMER,
      secondsLeft: VERIFICATION_TIMER,
      agree: false,
      code: '',
    }
  },
  methods: {
    onTimerProgress(data) {
      this.secondsLeft = data.totalSeconds
    },
    onCountdownEnd() {
      this.$emit('ended')
    },
    transformSlotProps(props) {
      const formattedProps = {};
      // it checks if seconds or minute value less then 10 then it adds 0
      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
    onSubmit() {
      if (this.codeTry > 0) {
        this.$emit('submit', this.code)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.verify
  background-color: $color-blue-20 !important
  border-color: $color-blue-20 !important

.verify-cancel
  color: $color-blue-20

.verify-input
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background-color: $color-white-1 !important
  padding: 10px 20px
  width: 100%
  height: 59px
  border: 1px solid $input-mobile-border-color
  border-radius: 10px !important
</style>
