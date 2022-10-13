<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form class="custom-form" @submit.stop.prevent="handleSubmit(onSubmit)">
      <b-row>
        <b-col :class="!isScreenXS && 'text-center'" md="12">
          <b-card :class="mobileClass" class="card-wrapper shadow-none">
            <b-row>
              <b-col class="text-capitalize" md="12">
                <span :class="mobileClass" class="body-7-bold d-block title">{{
                    $t('rewards.invite_your_friends')
                  }}</span>
                <span :class="mobileClass" class="body-1-bold text-color-blue-2 mt-1 d-block subtitle text-nowrap">{{
                    $t('rewards.everybody_gets_points')
                  }}</span>
                <span :class="mobileClass" class="body-6-normal mt-2 d-block desc ">{{
                    $t('rewards.you_will_receive_points', {points: points})
                  }}</span>
              </b-col>

            </b-row>
            <div class="input-wrapper">
              <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('rewards.email').toString()"
                  :rules="{ required: true, email: true, min: 3, max: 128 }"
              >
                <b-input-group
                    :label-cols="!isScreenXS && '3'"
                    class="d-flex email-group"

                >
                  <template #label>
                    <span v-if="!isScreenXS" class="body-5-normal">{{ $t('rewards.email') }}</span>
                  </template>
                  <b-form-input
                      id="email"
                      v-model="email"
                      :class="mobileClass"
                      class="d-flex"
                      size="sm"
                      :placeholder="$t('rewards.enter_your_friend_email')"
                      :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-input-group-append v-if="isScreenXS">
                    <Button
                        :disabled="loading"
                        class="invite-link"
                        type="submit"
                        variant="link"
                    >
                      {{ $t('rewards.invite') }}
                      <arrowRightBlue class="button-icon"/>
                    </Button>
                  </b-input-group-append>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </ValidationProvider>
            </div>

            <b-row v-if="!isScreenXS" class="mt-2">
              <b-col md="12" class="text-center">
                <Button :disabled="loading" class="px-5" pill type="submit" variant="confirm">
                  {{ $t('rewards.send_invite') }}
                </Button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-form>
  </ValidationObserver>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import Button from '~/components/common/Button'
import {BAD_REQUEST} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize';
import arrowRightBlue from '~/assets/img/rewards/arrow-right-blue.svg?inline'

export default {
  name: 'InviteFriendsCard',
  components: {ValidationObserver, ValidationProvider, Button, arrowRightBlue},
  mixins: [screenSize],
  data() {
    return {
      email: '',
      // TODO: Temporary dummy data
      points: 50,
      loading: false
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.loading = true
      this.$axios.post('users/invite', {
        email: this.email
      }, {handleError: false})
          .then(() => {
            this.$toasted.success(this.$t('rewards.an_invitation_has_been_sent', {email: this.email}).toString())
          }).catch(error => {
        if (error.response.status === BAD_REQUEST)
          this.$toasted.error(this.$t(error.response.data.message).toString())
      }).finally(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.card-wrapper
  background: $color-gray-3

  &.mobile
    background: rgba($color-gray-3, 0.58)
    border-radius: 8px
    padding: 2px 0

.title
  &.mobile
    @include body-4
    font-family: $font-montserrat
    font-style: normal
    font-weight: $medium
    color: $color-black-16

.subtitle
  &.mobile
    @include body-1
    font-family: $font-montserrat
    font-style: normal
    font-weight: $medium
    letter-spacing: 0.05em
    color: $color-blue-1
    margin-top: 11px !important

.desc
  &.mobile
    @include body-5
    font-family: $font-montserrat
    font-style: normal
    font-weight: $normal
    letter-spacing: -0.02em
    color: $color-gray-22R
    margin-top: 11px !important

.input-wrapper
  margin-top: 28px

#email
  &.mobile
    background: $color-white-1
    box-shadow: 0 1px 4px $color-white-21, inset 0 2px 4px $color-white-21 !important
    border-radius: 23px 0 0 23px
    width: auto
    border-right: none !important

    &::placeholder
      font-family: $font-montserrat
      font-style: normal
      font-weight: $normal
      font-size: 14px
      line-height: 17px
      letter-spacing: -0.02em
      color: $color-gray-52c

    &.is-invalid
      padding-right: 0 !important
      border: none !important

    &.is-valid
      padding-right: 0 !important
      border: none !important


.email-group
  .input-group-append
    background: $color-white-1
    box-shadow: 0 1px 4px $color-white-21, inset 0 2px 4px $color-white-21 !important
    border-radius: 0 23px 23px 0
    margin-left: -18px
    border-left: none !important


::v-deep.invite-link
  margin-right: 13px

  &.btn
    @include body-5
    font-family: $font-montserrat
    font-style: normal
    font-weight: $medium
    letter-spacing: 0.05em
    color: $color-blue-1
    z-index: 100

.button-icon
  margin-left: 8px


</style>
