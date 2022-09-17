<template>
  <vue-countdown v-slot="{ days, hours, minutes, seconds }" :auto-start="true"
                 :time="timeDiff" :transform="transformSlotProps">
    <div class="text-center remaining-time">
      <span class="heading-7-normal counter-span d-inline-block">{{ days }}</span>
      <span class="body-5-regular">/{{ $t('promotions.days') }}</span>
      <span class="heading-7-normal counter-span d-inline-block">{{ hours }}</span>
      <span class="body-5-regular">/{{ $t('promotions.hours') }}</span>
      <span class="heading-7-normal counter-span d-inline-block">{{ minutes }}</span>
      <span class="body-5-regular">/{{ $t('promotions.mins') }}</span>
      <span class="heading-7-normal counter-span d-inline-block">{{ seconds }}</span>
      <span class="body-5-regular m-0">/{{ $t('promotions.secs') }}</span>
    </div>

  </vue-countdown>
</template>
<script>
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
  name: 'CountDownTimer',
  components: {VueCountdown},
  props: {
    endDate: {
      type: String,
      required: true,
    }
  },
  computed: {
    timeDiff() {
      const startDate = new Date();
      const endDate = new Date(this.endDate);
      return (endDate.getTime() - startDate.getTime());
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
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/variables'
.remaining-time
  .heading-7-normal
    color: $color-gray-31

  .body-5-regular
    color: $color-gray-31
    margin-right: 4px

  .counter-span
    width: 39px
</style>