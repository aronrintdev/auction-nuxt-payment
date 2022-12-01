<template>
  <div>
    <div class="horizontal-benefit-box">
      <div
        class="benefit-item-main-wrapper d-flex align-items-center justify-content-center flex-column align-items-xl-start justify-content-sm-start flex-sm-row gap-6 mb-sm-5 mb-4"
      >
        <div class="benefit-image">
          <img
            :src="benefitImage"
            alt="Benefit Image"
            width="100%"
            height="auto"
            class="d-none d-sm-block"
          />
          <img
            :src="benefitImageXS"
            alt="Benefit Image"
            width="100%"
            height="auto"
            class="d-block d-sm-none"
          />
        </div>
        <div class="d-block mt-2 mt-sm-3 benefit-text-section">
          <h2
            class="benefit-heading font-primary fs-32 fw-7 text-black text-capitalize"
          >
            {{ $t(benefitTitle) }}
          </h2>
          <p
            class="benefit-description mt-2 mb-0 mt-sm-4 mx-auto mx-sm-0 font-primary fs-18 fw-4"
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
    benefitImageXS: {
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
  .benefit-text-section
    h2.benefit-heading
      letter-spacing: -0.02em
@media screen and (max-width: 993px)
  .benefit-item-main-wrapper
    .benefit-image
      min-width: 272px
      height: auto
      .benefit-text-section
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
      img
        width: 180px
    .benefit-text-section
      h2.benefit-heading
        font-size: 24px
@media screen and (max-width: 577px)
  .benefit-item-main-wrapper
    row-gap: 0px
    column-gap: 0px
    width: 343px
    margin: 0 auto
    .benefit-image
      min-width: 343px
      max-width: 343px
      height: auto
      img
        width: 343px
    .benefit-text-section
      width: 343px
      h2.benefit-heading
        font-weight: 600
        font-size: 16px
        line-height: 20px
      p.benefit-description
        font-weight: 400
        font-size: 14px
        line-height: 163.4%
</style>
