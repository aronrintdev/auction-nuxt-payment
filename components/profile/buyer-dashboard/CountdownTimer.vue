<template>
  <div class="countdown-timer">
    <div class="d-flex gap-2">
      <div class="text-center">
        <h1 class="fs-50 fw-7 font-primary mb-0">{{ days }}</h1>
        <p class="font-primary fw-5 fs-14">
          {{ $t('buyer_dashboard.promotions.days') }}
        </p>
      </div>
      <h1 class="fs-50 fw-7 font-primary mb-0">:</h1>
      <div class="text-center">
        <h1 class="fs-50 fw-7 font-primary mb-0">{{ hours }}</h1>
        <p class="font-primary fw-5 fs-14">
          {{ $t('buyer_dashboard.promotions.hours') }}
        </p>
      </div>
      <h1 class="fs-50 fw-7 font-primary mb-0">:</h1>
      <div class="text-center">
        <h1 class="fs-50 fw-7 font-primary mb-0">{{ minutes }}</h1>
        <p class="font-primary fw-5 fs-14">
          {{ $t('buyer_dashboard.promotions.minutes') }}
        </p>
      </div>
      <h1 class="fs-50 fw-7 font-primary mb-0">:</h1>
      <div class="text-center">
        <h1 class="fs-50 fw-7 font-primary mb-0">{{ seconds }}</h1>
        <p class="font-primary fw-5 fs-14">
          {{ $t('buyer_dashboard.promotions.seconds') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // TODO Dummy data
      countDownToTime: new Date('Sep 26, 2022 00:00:00').getTime(),
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    }
  },
  mounted() {
    setInterval(() => {
      this.startTimer()
    }, 1000)
  },
  methods: {
    startTimer() {
      const timeNow = new Date().getTime()
      const timeDifference = this.countDownToTime - timeNow
      const millisecondsInOneSecond = 1000
      const millisecondsInOneMinute = millisecondsInOneSecond * 60
      const millisecondsInOneHour = millisecondsInOneMinute * 60
      const millisecondsInOneDay = millisecondsInOneHour * 24
      const differenceInDays = timeDifference / millisecondsInOneDay
      const remainderDifferenceInHours =
        (timeDifference % millisecondsInOneDay) / millisecondsInOneHour
      const remainderDifferenceInMinutes =
        (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute
      const remainderDifferenceInSeconds =
        (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond
      const remainingDays = Math.floor(differenceInDays)
      const remainingHours = Math.floor(remainderDifferenceInHours)
      const remainingMinutes = Math.floor(remainderDifferenceInMinutes)
      const remainingSeconds = Math.floor(remainderDifferenceInSeconds)
      this.days = remainingDays
      this.hours = remainingHours
      this.minutes = remainingMinutes
      this.seconds = remainingSeconds
    },
  },
}
</script>
