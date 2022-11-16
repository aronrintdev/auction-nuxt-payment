<template>
  <section class="navigation-links mb-5">
    <div class="custom-container p-0" :class="{ 'mx-auto': centered }">
      <div class="row justify-content-center gap-3" style="flex-flow: wrap">
        <div
          class="col-sm-3 border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
        >
          <img
            src="~/assets/img/bug-bounty/log-icon.png"
            class="fs-50"
          />
          <h2 class="text-black fw-7 mt-3 fs-24 font-primary">
            {{ $t('bounty.stages.low') }}
          </h2>
          <h6 class="text-gray mb-0 fw-6 fs-16 font-primary">
            {{ $t('bounty.stages.low_range') }}
          </h6>
          <p>
            {{ $t('bounty.stages.low_detail') }}
          </p>
          <u class="fs-14 fw-5 text-blue">{{ $t('bounty.stages.low_content') }}</u>
        </div>
        <div
          class="col-sm-3 offset-sm-1 border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
        >
          <img
            src="~/assets/img/bug-bounty/high.png"
            class="fs-50"
          />
          <h2 class="text-black fw-7 mt-3 fs-24 font-primary">
            {{ $t('bounty.stages.medium') }}
          </h2>
          <h6 class="text-gray mb-0 fw-6 fs-16 font-primary">
            {{ $t('bounty.stages.mid_range') }}
          </h6>
          <p>
            {{ $t('bounty.stages.mid_detail') }}
          </p>
          <u class="fs-14 fw-5 text-blue">{{ $t('bounty.stages.mid_content') }}</u>
        </div>
        <div
          class="offset-sm-1 col-sm-3 border p-4 br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
        >
          <img
            src="~/assets/img/bug-bounty/high1.png"
            class="fs-50"
          />
          <h2 class="text-black fw-7 mt-3 fs-24 font-primary">
            {{ $t('bounty.stages.high') }}
          </h2>
          <h6 class="text-gray mb-0 fw-6 fs-16 font-primary">
            {{ $t('bounty.stages.high_range') }}
          </h6>
          <p>
            {{ $t('bounty.stages.high_detail') }}
          </p>
          <u class="fs-14 fw-5 text-blue">{{ $t('bounty.stages.high_content') }}</u>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NavigationsLinks',
  props: {
    centered: Boolean,
  },
  methods: {
    openChat() {
      this.$tawkMessenger.toggle()
    },
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.navigation-links
  .navigation-card
    width: 260px
    height: 300px !important

    img
      width: 86px

.live-chat
  cursor: pointer

@media(max-width: 575px)
  .navigation-links
    .custom-container
      width: 348px
</style>
