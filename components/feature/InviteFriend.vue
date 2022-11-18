<template>
  <div>
    <div
      class="invite-friend-main-wrapper px-4 px-sm-0 py-3 py-sm-0 d-flex justify-content-sm-start align-items-lg-end align-items-md-end position-relative mx-auto"
      :style="`--image: url(${inviteBannerImage}); --imageXS: url(${inviteBannerImageXS})`"
    >
      <div
        class="main-content-section d-flex align-items-center justify-content-center justify-content-sm-between mb-sm-4 ml-sm-4 mb-0 ml-0"
      >
        <div
          class="text-and-input-section d-flex align-items-sm-start justify-content-sm-center flex-column justify-content-center p-sm-3 p-0"
        >
          <h4
            class="refer-a-friend font-primary fs-22 fw-5 text-white text-capitalize mb-2 d-none d-sm-block"
          >
            {{ $t('newest_features.refer_a_friend') }}
          </h4>
          <h4
            class="invite-a-friend font-primary fs-16 fw-6 text-capitalize mb-2 ml-3 d-block d-sm-none"
          >
            {{ $t('newest_features.invite_your_friend') }}
          </h4>
          <h2
            class="give-500-get-500 font-primary fs-32 fw-7 text-capitalize mb-2 d-none d-sm-block"
          >
            {{ $t('newest_features.give_500_get_500') }}
          </h2>
          <h2
            class="everybody-gets-50 font-primary fs-24 fw-6 text-capitalize mb-2 ml-3 d-block d-sm-none"
          >
            {{ $t('newest_features.everybody_gets_points') }}
          </h2>
          <p class="font-primary fs-14 fw-5 text-capitalize mb-0 ml-3 ml-sm-0">
            {{ $t('newest_features.earn_500_points') }}
          </p>
          <div class="input-section position-relative mt-4 mx-auto mx-sm-0">
            <b-form-input
              v-model="inviteFriendEmail"
              type="email"
              :placeholder="$t('newest_features.email_placeholder')"
              class="font-primary fs-14 fw-5"
            ></b-form-input>
            <b-button
              type="submit"
              class="font-primary fs-14 fw-6 text-capitalize"
              >{{ $t('newest_features.invite') }}
              <span class="ml-2"
                ><img
                  src="@/assets/img/features/newest-feature/right-arrow.png"
                  alt="Right Arrow"
                  width="14px"
                  height="auto"
                />
              </span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inviteBannerImage: {
      type: String,
      default: null,
    },
    inviteBannerImageXS: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      inviteFriendEmail: null,
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.invite-friend-main-wrapper
  width: 1209px
  height: 370px
  margin-bottom: 5rem
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  background-image: var(--image)
  @media (max-width: 577px)
    background-image: var(--imageXS)
  .background-circle-section
    width: 242px
    height: 242px
    border-radius: 50%
    background-color: $color-white-1
    position: absolute
    top: 0
    right: 0
  .main-content-section
    width: 542px
    height: 228px
    .text-and-input-section
        width: 542px
        height: 228px
        background-color: rgba(0, 0, 0, 0.4)
        h4.refer-a-friend
          letter-spacing: -0.02em
          line-height: 27px
        h2.give-500-get-500
          letter-spacing: -0.02em
          line-height: 39px
          color: $color-green-33
        p
          line-height: 17px
          letter-spacing: -0.02em
          color: $color-white-1
        .input-section
          width: 298px
          height: 38px
          input
            background-color: $color-white-1
            outline: none
            border: 1px solid $color-gray-23
            border-radius: 5px
            letter-spacing: -0.02em
            line-height: 17px
            width: 298px
            height: 38px
            &::placeholder
              color: $color-gray-52c
              font-size: 14px
              font-weight: 500
            &::-webkit-input-placeholder
              color: $color-gray-52c
              font-size: 14px
              font-weight: 500
            &::-ms-input-placeholder
              color: $color-gray-52c
              font-size: 14px
              font-weight: 500
          button
            position: absolute
            top: 2px
            right: 2px
            color: $color-blue-31
            background-color: $color-white-1
            border-radius: 0
            border: none
            letter-spacing: 0.05em
            line-height: 17px
            padding-left: 7px
            padding-right: 10px
            padding-top: 9px
            padding-bottom: 8px
@media screen and (max-width: 1025px)
  .invite-friend-main-wrapper
    width: 740px
    height: 270px
    .main-content-section
      width: 665px
      height: 230px
      .text-and-input-section
        width: 665px
        height: auto
@media screen and (max-width: 770px)
  .invite-friend-main-wrapper
    width: 700px
    .main-content-section
      width: 630px
      height: 200px
@media screen and (max-width: 577px)
  .invite-friend-main-wrapper
    width: 375px
    height: 202px
    margin-bottom: 2.5rem
    background-color: $color-gray-1
    border-radius: 10px
    .main-content-section
      width: 100%
      height: 100%
      .text-and-input-section
        width: 100%
        height: 100%
        background-color: transparent
        h4.invite-a-friend
          line-height: 20px
          color: $color-black-16
        h2.everybody-gets-50
          line-height: 29px
          letter-spacing: 0.05em
          color: $color-blue-31
        p
          color: $color-gray-22R
        .input-section
          input
            border-radius: 25px
            border: 0
          button
            right: 10px
</style>
