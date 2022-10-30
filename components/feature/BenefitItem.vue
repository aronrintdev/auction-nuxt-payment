<template>
  <div class="d-flex align-items-center benefit-item-wrapper">
    <b-row>
      <b-col md="4" lg="3" class="d-flex justify-content-center"
        ><div class="img-wrapper w-100">
          <img :src="icon" class="h-auto w-100" />
        </div>
      </b-col>
      <b-col md="8" lg="8">
        <div
          class="text-wrapper d-flex flex-column align-items-center align-items-md-start"
        >
          <div
            class="heading d-flex justify-content-center justify-content-md-start w-100"
          >
            {{ heading }}
          </div>
          <div
            class="helper-text d-flex justify-content-center justify-content-md-start w-100"
          >
            {{ description }}
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'FeatureBenefitItem',

  props: {
    icon: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.benefit-item-wrapper
  .img-wrapper
    min-width: 160px
    text-align: center
    margin-right: 79px
    max-width: 272px
    img
      width: 272px !important
      height: 191px !important

  .text-wrapper
    color: $color-black-1
    padding-left: 68px

    .heading
      @include heading-7
      font-weight: $bold
      font-size: 28px
      line-height: 34px
      font-family: "Montserrat"



    .helper-text
      @include body-3-regular
      margin-top: 18px
      font-family: 'Montserrat'
      line-height: 29px

@media (max-width: 768px)
  .benefit-item-wrapper::v-deep
    .text-wrapper
      padding-left: 0px
      .heading
        font-size: 16px !important
        font-weight: 600 !important
        line-height: 19px
        height: auto
        max-width: 272px
      .helper-text
        font-size: 14px
        line-height: 22px
        margin-top: 8px
        width: 290px !important
        max-width: 272px
</style>
