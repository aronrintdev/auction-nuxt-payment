<template>
  <div :class="mobileClass" class="password-component">
    <div id="password-component-title" :class="mobileClass">{{ $t('change_password.password') }}</div>
    <div id="change-password-form-title" :class="{
      'mb-4 mt-4 text-bold': !isScreenXS,
      'mobile': isScreenXS
    }">{{ $t('change_password.change_password') }}
    </div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
      <b-form @submit.prevent="handleSubmit(changePassword)" @reset.prevent="resetForm">
        <ValidationProvider
            v-slot="validationContext"
            :name="$t('change_password.current_password').toString()"
            :rules="{ required: true, min: 8, oneUppercase: true, oneDigit: true, oneSymbol: true  }"
        >
          <b-form-group
              id="group-current-password"
              :label="$t('change_password.current_password').toString()"
              label-for="current-password"
          >
            <b-form-input
                id="current-password"
                v-model="form.current_password"
                :state="getValidationState(validationContext)"
                :class="{
                    'rounded-pill': !isScreenXS
                }"
                :placeholder="isScreenXS? null: $t('change_password.current_password')"
                type="password"
            ></b-form-input>
            <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
            v-slot="validationContext"
            :name="$t('change_password.new_password').toString()"
            :rules="{ required: true, min: 8, oneUppercase: true, oneDigit: true, oneSymbol: true  }"
        >
          <b-form-group
              id="group-new-password"
              :class="mobileClass"
              :description="validationContext.errors.length === 0? $t('change_password.password_policy_long').toString(): null"
              :label="$t('change_password.new_password').toString()"
              label-for="new-password"
          >
            <b-form-input
                id="new-password"
                v-model="form.password"
                :state="getValidationState(validationContext)"
                :class="{
                  'rounded-pill': !isScreenXS
                }"
                :placeholder="isScreenXS? null: $t('change_password.new_password')"
                type="password"
            ></b-form-input>
            <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
            v-slot="validationContext"
            :name="$t('change_password.confirm_password').toString()"
            :rules="{ required: true, min: 8, oneUppercase: true, oneDigit: true, oneSymbol: true, confirmed: $t('change_password.new_password').toString() }"
        >
          <b-form-group
              id="group-confirm-password"
              :label="$t('change_password.confirm_password').toString()"
              label-for="confirm-password"
          >
            <b-form-input
                id="confirm-password"
                v-model="form.password_confirmation"
                :state="getValidationState(validationContext)"
                :class="{
                    'rounded-pill': !isScreenXS
                }"
                :placeholder="isScreenXS? null: $t('change_password.confirm_password')"
                type="password"
            ></b-form-input>
            <b-form-invalid-feedback>{{
                validationContext.errors[0]
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <div v-if="!isScreenXS" class="text-right ">
          <Button :disabled="invalid || loading" class="submit-btn lg" pill type="submit" variant="dark-blue">
            {{ $t('common.update') }}
          </Button>
        </div>
        <div v-else class="position-absolute bottom-button w-100">
          <Button :disabled="invalid || loading" block class="submit-btn" pill type="submit" variant="dark-blue">
            {{ $t('common.update') }}
          </Button>
        </div>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import screenSize from '~/plugins/mixins/screenSize';
import Button from '~/components/common/Button';

export default {
  name: 'PasswordChangeComponent',
  components: {Button, ValidationObserver, ValidationProvider},
  mixins: [screenSize],
  data() {
    return {
      form: {
        current_password: null,
        password: null,
        password_confirmation: null
      },
      loading: false
    }
  },
  methods: {
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    resetForm() {
      this.form.current_password = null;
      this.form.password = null;
      this.form.password_confirmation = null;
    },
    changePassword() {
      this.loading = true
      const url = '/change-password';
      this.$axios.post(url, this.form)
          .then(resp => {
          if (resp.status === 200) {
            this.$toasted.success(this.$t('change_password.msg_password_change_success').toString()).toString();
            this.resetForm();
          }
        })
          .catch(err => {
            const errors = err.response.data.errors;

            errors.current_password.forEach(msg => {
              this.$toasted.error(msg).toString();
            });

            errors.password.forEach(msg => {
              this.$toasted.error(msg).toString();
            });
          }).finally(() => {
        this.loading = false
      });
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.bottom-button
  bottom: -100px
  left: 0
  padding-inline: 9px

::v-deep.submit-btn
  &.lg
    padding: 5px 50px

    &:disabled
      background: $color-gray-47 !important
      border-color: $color-gray-47 !important
      color: $color-white-1 !important

  &.btn
    @include body-17-medium
    font-family: $font-family-sf-pro-display
    font-style: normal

    &:disabled
      background: $color-gray-21
      color: $color-gray-4
      border: solid 1px $color-gray-21

.password-component
  ::v-deep.form-group
    label
      @include body-5-normal
      font-family: $font-family-montserrat
      font-style: normal
      color: $color-black-1
      margin-bottom: 16px

    input
      padding: 13px 22px
      height: 40px

      &::placeholder
        @include body-5-normal
        font-family: $font-family-montserrat
        font-style: normal
        color: $color-gray-24


  &.mobile
    background: $color-white-1
    box-shadow: 0 1px 4px rgba($color-black-1, 0.25)
    border-radius: 24px
    padding: 20px 22px

    ::v-deep.form-group
      label
        @include body-6-medium
        font-family: $font-family-montserrat
        font-style: normal
        color: $color-black-17
        margin-bottom: 8px

      input
        &.form-control
          background: #FFFFFF
          border: 1px solid #E8E8E8
          border-radius: 10px
          height: 49px

  ::v-deep#group-new-password
    small
      @include body-6-medium
      font-family: $font-family-montserrat
      font-style: normal
      color: $color-gray-4 !important


#password-component-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 30px
  line-height: 37px
  color: $color-blue-20

  &.mobile
    @include body-13-medium
    font-family: $font-family-sf-pro-display
    font-style: normal
    letter-spacing: 0.02em

#change-password-form-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 20px
  line-height: 24px

  &.mobile
    @include body-21-regular
    margin-top: 4px
    margin-bottom: 16px
    font-family: $font-family-montserrat
    color: $color-gray-5


.btn-update
  background: $color-gray-47
  border-radius: 20px
  border-color: $color-gray-47
  padding: 5px 50px

  &:hover
    box-shadow: 0 0.15rem 0.25rem $color-black-rgb3

@media (max-width: 767px)
  .password-component
    font-family: $font-family-sf-pro-display
    padding: 20px
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px
    @include body-10-medium

  #password-component-title
    font-family: $font-family-sf-pro-display
    @include body-13-medium

  #change-password-form-title
    font-family: $font-family-sf-pro-display
    @include body-10-medium

</style>
