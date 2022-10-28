<template>
  <div>
    <div
      class="invite-friend-main-wrapper px-4 px-sm-0 py-3 py-sm-0 d-flex justify-content-sm-start align-items-lg-end align-items-md-start position-relative mx-auto"
    >
      <div class="background-circle-section d-none d-md-block"></div>
      <div
        class="main-content-section d-flex align-items-center justify-content-center justify-content-sm-between"
      >
        <div
          class="text-and-input-section d-flex align-items-sm-start justify-content-sm-start flex-column"
        >
          <h4
            class="refer-a-friend font-primary fs-22 fw-5 text-capitalize mb-2 d-none d-sm-block"
          >
            Refer a Friend
          </h4>
          <h4
            class="invite-a-friend font-primary fs-16 fw-6 text-capitalize mb-2 ml-3 d-block d-sm-none"
          >
            Invite Your Friend, And
          </h4>
          <h2
            class="give-50-get-50 font-primary fs-32 fw-7 text-capitalize mb-2 d-none d-sm-block"
          >
            Give 50 Points, Get 50 Points
          </h2>
          <h2
            class="everybody-gets-50 font-primary fs-24 fw-6 text-capitalize mb-2 ml-3 d-block d-sm-none"
          >
            Everybody Gets Points
          </h2>
          <p class="font-primary fs-14 fw-5 text-capitalize mb-0 ml-3 ml-sm-0">
            Earn 50 Points After Each Sign Up
          </p>
          <div class="input-section position-relative mt-4 mx-auto mx-sm-0">
            <b-form-input
              v-model="inviteFriendEmail"
              type="email"
              placeholder="Enter Email Address"
              class="font-primary fs-14 fw-5"
            ></b-form-input>
            <b-button
              type="submit"
              class="font-primary fs-14 fw-6 text-capitalize"
              >Invite
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
        <div class="envelop-image-box d-none d-md-block">
          <img
            src="@/assets/img/features/newest-feature/envelope.png"
            alt="Envelop"
            width="100%"
            height="auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
    width: 886px
    height: 277px
    margin-bottom: 7rem
    .background-circle-section
        width: 242px
        height: 242px
        border-radius: 50%
        background-color: $color-white-1
        position: absolute
        top: 0
        right: 0
    .main-content-section
        width: 765px
        height: 182px
        z-index: 1
        .text-and-input-section
            width: 477px
            height: 162px
            h4.refer-a-friend
                letter-spacing: -0.02em
                line-height: 27px
                color: $color-gray-5
            h2.give-50-get-50
                letter-spacing: -0.02em
                line-height: 39px
                color: #5E85D1
            p
                line-height: 17px
                letter-spacing: -0.02em
                color: #5A5A5A
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
                        color: #C5C5C5
                        font-size: 14px
                        font-weight: 500
                    &::-webkit-input-placeholder
                        color: #C5C5C5
                        font-size: 14px
                        font-weight: 500
                    &::-ms-input-placeholder
                        color: #C5C5C5
                        font-size: 14px
                        font-weight: 500
                button
                    position: absolute
                    top: 2px
                    right: 2px
                    color: #295FF6
                    background-color: $color-white-1
                    border-radius: 0
                    border: none
                    letter-spacing: 0.05em
                    line-height: 17px
                    padding-left: 7px
                    padding-right: 10px
                    padding-top: 9px
                    padding-bottom: 8px
        .envelop-image-box
            width: 182px
            height: 182px
@media screen and (max-width: 1025px)
  .invite-friend-main-wrapper
      width: 740px
      height: 270px
      margin-bottom: 5rem
      .background-circle-section
          width: 185px
          height: 185px
      .main-content-section
          width: 665px
          height: 200px
          .text-and-input-section
            width: 400px
            height: auto
          .envelop-image-box
            width: 142px
            height: 142px
@media screen and (max-width: 770px)
  .invite-friend-main-wrapper
      width: 700px
      .background-circle-section
          width: 140px
          height: 140px
      .main-content-section
          width: 630px
          height: 200px
          .envelop-image-box
            width: 122px
            height: 122px
@media screen and (max-width: 577px)
  .invite-friend-main-wrapper
      width: 375px
      height: 202px
      background-color: $color-gray-1
      border-radius: 10px
      margin-bottom: 1rem
      .main-content-section
          width: 100%
          height: 100%
          .text-and-input-section
            h4.invite-a-friend
                line-height: 20px
                color: #303030
            h2.everybody-gets-50
                line-height: 29px
                letter-spacing: 0.05em
                color: #295FF6
            .input-section
              input
                  border-radius: 25px
                  border: 0
              button
                right: 10px
</style>
