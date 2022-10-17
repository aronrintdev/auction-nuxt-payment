<template>
  <div>
    <div class="horizontal-benefit-box">
      <div
        class="benefit-item-main-wrapper d-flex align-items-center justify-content-center flex-column align-items-xl-start justify-content-sm-start flex-sm-row gap-6 mb-5"
      >
        <div class="benefit-image">
          <img
            :src="benefitImage"
            alt="Benefit Image"
            width="100%"
            height="auto"
          />
        </div>
        <div class="d-block mt-3">
          <h2
            class="benefit-heading font-primary fs-32 fw-7 text-black text-center text-sm-left"
          >
            {{ $t(benefitTitle) }}
          </h2>
          <p
            class="benefit-description mt-2 mb-0 px-2 px-sm-0 mt-sm-4 font-primary fs-18 fw-4 text-center text-sm-left"
          >
            {{ $t(benefitDescription) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    benefitImage: {
      type: String,
      required: true,
    },
    benefitTitle: {
      type: String,
      required: true,
    },
    benefitDescription: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.benefit-item-main-wrapper
    .benefit-image
        min-width: 272px
        height: 191px
    div
        h2.benefit-heading
            letter-spacing: -0.02em
@media screen and (max-width: 993px)
    .benefit-item-main-wrapper
        .benefit-image
            min-width: 220px
            height: auto
        div
            h2.benefit-heading
                font-size: 28px
            p.benefit-description
                font-size: 14px
@media screen and (max-width: 770px)
    .benefit-item-main-wrapper
        row-gap: 40px
        column-gap: 40px
        .benefit-image
            min-width: 180px
        div
            h2.benefit-heading
                font-size: 24px
@media screen and (max-width: 577px)
    .benefit-item-main-wrapper
        row-gap: 0px
        column-gap: 0px
        .benefit-image
            min-width: 272px
            height: 191px
        div
            h2.benefit-heading
                font-size: 16px
                font-weight: 600
</style>
