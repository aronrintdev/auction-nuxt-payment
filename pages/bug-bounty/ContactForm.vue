<template>
    <b-row>
      <b-col md="12">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.bug_type')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group
              :label="$t('bounty.form.bug_type')"
              class="text-black fw-5"
              >
                <div class="row bug-type">
                  <div class="d-flex col-sm-12 col-md-3">
                    <b-form-radio
                      id="login"
                      v-model="form.name"
                      class="rounded-pill input-login"
                      :placeholder="$t('bounty.form.name_placeholder')"
                      :state="getValidationState(validationContext)"
                    ></b-form-radio>
                    <p>{{ $t('bounty.stages.low_content') }}</p>  
                  </div>
                  <div class="d-flex col-sm-12 col-md-3">
                    <b-form-radio
                      id="login"
                      v-model="form.name"
                      class="rounded-pill input-login"
                      :placeholder="$t('bounty.form.name_placeholder')"
                      :state="getValidationState(validationContext)"
                    ></b-form-radio>
                    <p>{{ $t('bounty.stages.mid_content') }}</p>  
                  </div>
                  <div class="d-flex col-sm-12 col-md-3">
                    <b-form-radio
                      id="login"
                      v-model="form.name"
                      class="rounded-pill input-login"
                      :placeholder="$t('bounty.form.name_placeholder')"
                      :state="getValidationState(validationContext)"
                    ></b-form-radio>
                    <p>{{ $t('bounty.stages.high_content') }}</p>  
                  </div>
                  
                </div>
                
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.name')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group
              :label="$t('bounty.form.name')"
              class="text-black fw-5"
              >
                <b-form-input
                  id="login"
                  v-model="form.name"
                  class="rounded-pill input-login"
                  :placeholder="$t('bounty.form.name_placeholder')"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.email')"
              :rules="{ required: true }"
            >
              <b-form-group
              :label="$t('bounty.form.email')"
              class="text-black fw-5"
              >
                <b-input-group>
                  <b-form-input
                    id="password"
                    v-model="form.email"
                    class="rounded-pill input-login input-append"
                    :placeholder="$t('bounty.form.email_placeholder')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.title_of_issue')"
              :rules="{ required: true, min: 3, max: 128 }"
            >
              <b-form-group
              :label="$t('bounty.form.title_of_issue')"
              class="text-black fw-5"
              >
                <b-form-input
                  id="login"
                  v-model="form.title"
                  class="rounded-pill input-login"
                  :placeholder="$t('bounty.form.toi_placeholder')"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback>{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.description_of_issue')"
              :rules="{ required: true }"
            >
              <b-form-group
              :label="$t('bounty.form.description_of_issue')"
              class="text-black fw-5"
              >
                <b-input-group>
                  <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    rows="5"
                    size="sm"
                    class="input-login input-append"
                    :placeholder="$t('bounty.form.description_placeholder')"
                    :state="getValidationState(validationContext)"
                  ></b-form-textarea>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.link_of_issue')"
              :rules="{ required: true }"
            >
              <b-form-group
              :label="$t('bounty.form.link_of_issue')"
              class="text-black fw-5"
              >
                <b-input-group>
                  <b-form-input
                    id="password"
                    v-model="form.email"
                    class="rounded-pill input-login input-append"
                    :placeholder="$t('bounty.form.loi_placeholder')"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.proof_of_concept')"
              :rules="{ required: true }"
            >
              <b-form-group
              :label="$t('bounty.form.proof_of_concept')"
              class="text-black fw-5"
              >
                <b-input-group>
                  <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    rows="3"
                    size="sm"
                    class="input-login input-append"
                    :placeholder="$t('bounty.form.poc_placeholder')"
                    :state="getValidationState(validationContext)"
                  ></b-form-textarea>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
            <div class="d-flex">
              <img class="attachment cursor-pointer" src="~/assets/img/attachment.png" @click="showModal">
              <p class="ml-2 text-black fs-14 fw-5">{{ $t('bounty.form.attachment.title') }}</p>
            </div>
            <UploadModal :form="fileForm" :show="showDocModal" @closed="modalClosed" :requirement="fileRequirement" @uploaded="fileUploaded"/>
            
            <div class="d-flex">
              <ValidationProvider
              v-slot="validationContext"
              :name="$t('bounty.form.attachment.terms_condition')"
              :rules="{ required: true }"
            >
              <b-form-group
              >
                <b-input-group>
                  <b-form-checkbox
                    id="checkbox"
                    v-model="form.terms"
                    class="input-login input-append"
                    :state="getValidationState(validationContext)"
                  ></b-form-checkbox>
                  <b-form-invalid-feedback>{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
            </ValidationProvider>
              <p class="text-black fs-14 fw-5">{{ $t('bounty.form.attachment.terms') }}</p>
            </div>
  
            <b-row class="mt-5 w-100">
              <b-col md="4" offset-md="4" class="text-center">
                <Button
                  :disabled="!isFormFilled"
                  block
                  pill
                  variant="confirm"
                  type="submit"
                  :class="{ 'btn-disabled': !isFormFilled }"
                >
                  <span>{{ $t('bounty.form.submit') }}</span>
                </Button
                >
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </b-col>
    </b-row>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import {ValidationProvider, ValidationObserver} from 'vee-validate'
  import {Button} from '~/components/common';
  import { NO_CONTENT } from '~/static/constants'
  import UploadModal from '~/pages/bug-bounty/UploadModal'
  
  export default {
    name: 'LoginForm',
    components: { ValidationProvider, ValidationObserver, Button, UploadModal },
    data() {
      return {
        isPasswordShown: false,
        form: {
          login: '',
          password: '',
          rememberMe: false,
          verification_code: '',
        },
        showDocModal: false,
          
        fileForm: {
          file: null,
          permitNumber: '',
          date: ''
        },
        applyForm: {
          certified_reseller: false
        }
      }
    },
    computed: {
      ...mapGetters({
        isVendor: 'auth/isVendor',
        vendorDocRequirements: 'vendor-hub/vendorDocRequirements',
      }),
      fileRequirement() {
        return this.vendorDocRequirements.filter(req => req.name === 'Retail Certification')[0]
      },
      passwordFieldType(vm) {
        return vm.isPasswordShown ? 'text' : 'password'
      },
      isFormFilled(vm) {
        return !!(vm.form.login && vm.form.password)
      }
    },
    methods: {
      ...mapActions({
        getUserDetails: 'auth/getUserDetails',
        getUserRedeemedReward: 'redeemed-reward/getUserRedeemedReward'
      }),
      ...mapGetters({
        getLoginRedirectUrl: 'auth/getLoginRedirectUrl',
      }),
      getValidationState({ dirty, validated, valid = null }) {
        // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
        return dirty || validated ? valid : null
      },
      fileUploaded(form) {
        this.fileForm = form
        this.applyForm.certified_reseller = true
      },
      onSubmit() {
        // Do the login process
        this.$auth
          .login({ data: this.form, handleError: false })
          .then((response) => {
            if (response.status === NO_CONTENT) {
              this.$emit('verify', this.form)
            } else {
              this.$auth.strategy.token.set(response.data.access_token)
              this.getUserDetails(this.$store.state.auth.user.id)
              this.getUserRedeemedReward()
              this.$auth.$storage.removeCookie('rememberExpires')
              this.$store.dispatch('notifications/getNotifications')
              this.$store.dispatch('notifications/getUnreadCount')
              this.$toasted.success(this.$t('login.success_message.login_successfull').toString())
  
              // redirect if redirect url is set in state
              const redirectUrl = this.getLoginRedirectUrl()
              if (redirectUrl) {
                if (redirectUrl.includes('trades') && !this.isVendor) {
                  this.$router.push({
                    path: '/profile/vendor-hub/apply'
                  })
                } else {
                  this.$store.commit('auth/setLoginRedirectUrl', null)
                  this.$router.push(redirectUrl)
                }
              } else if (this.isVendor) {
                this.$router.push({
                  path: '/profile/vendor-dashboard'
                })
              } else {
                this.$router.push({
                  path: '/profile/buyer-dashboard'
                })
              }
            }
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message).toString())
          })
      },
      showModal() {
        this.showDocModal = !this.showDocModal
      },
      modalClosed() {
        this.showDocModal = false
      },
    }
  }
  </script>
  
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'

  .attachment
    width: 20px
    height: 20px
  
  /* Override bootstrap-vue 'b-form-input' styles */
  .input-login
    @include body-5-normal
    color: $black-1
    background-color: $color-white-5
    border: 0
    transition: border-color 0.01s ease-in-out, box-shadow 0.01s ease-in-out
    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder
      @include body-5-normal
      color: $color-gray-24
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-box-shadow: 0 0 0 30px $color-white-5 inset !important
    &.is-invalid,
    &.is-invalid:active,
    &.is-invalid:focus
      background-image: none
      border: $color-red-1 1px solid !important
    &.is-valid
      border: none
      background-image: none
    &:focus
      background-color: $color-white-5
      border: 0
  
  /* Override bootstrap-vue 'b-form-input' styles for prepending icons */
  .input-append
    border-bottom-right-radius: 0 !important
    border-top-right-radius: 0 !important
    &.is-invalid,
    &.is-invalid:active,
    &.is-invalid:focus
      background-image: none
      border: $color-red-1 1px solid !important
      border-right: none !important
      + .append-icon
        border: $color-red-1 1px solid !important
        border-left: none !important
  
  .append-icon
    background: $color-white-5
    border-bottom-right-radius: 3rem !important
    border-top-right-radius: 3rem !important
  
  .btn
    &.btn-confirm
      &.btn-disabled
        background: $color-gray-47
        opacity: 1
        cursor: not-allowed
        &:hover
          box-shadow: none
  @media(max-width: 575px)
    .bug-type
      border: 1px solid $color-gray-3
      border-radius: 10px
      div
        border-bottom: 1px solid $color-gray-3
  </style>
  