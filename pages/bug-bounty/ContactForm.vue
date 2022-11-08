<template>
    <b-row>
      <b-col md="12">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.stop.prevent="handleSubmit(createBug)">
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
                  <div class="d-flex col-sm-12 col-md-4 type-option">
                    <b-form-radio
                      v-model="form.bug_type"
                      value="visual"
                      class="rounded-pill input-login"
                      :placeholder="$t('bounty.form.name_placeholder')"
                      :state="getValidationState(validationContext)"
                    ></b-form-radio>
                    <p>{{ $t('bounty.stages.low_content') }}</p>
                  </div>
                  <div class="d-flex col-sm-12 col-md-4 type-option">
                    <b-form-radio
                      v-model="form.bug_type"
                      value="functional"
                      class="rounded-pill input-login"
                      :placeholder="$t('bounty.form.name_placeholder')"
                      :state="getValidationState(validationContext)"
                    ></b-form-radio>
                    <p>{{ $t('bounty.stages.mid_content') }}</p>
                  </div>
                  <div class="d-flex col-sm-12 col-md-4 type-option">
                    <b-form-radio
                      v-model="form.bug_type"
                      value="system"
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
                    v-model="form.url"
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
              :name="$t('bounty.form.device_used')"
              :rules="{ required: true }"
            >
              <b-form-group
              :label="$t('bounty.form.device_used')"
              class="text-black fw-5"
              >
                <b-input-group>
                  <b-form-input
                    v-model="form.device_name"
                    class="rounded-pill input-login input-append"
                    :placeholder="$t('bounty.form.device_used')"
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
                    v-model="form.proof"
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
            <UploadModal v-model="form.images" :form="fileForm" :show="showDocModal" @closed="modalClosed" :requirement="fileRequirement" @uploaded="fileUploaded"/>

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
                    v-model="form.is_agree"
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
                  block
                  pill
                  variant="confirm"
                  type="submit"
                  :class="{ 'btn-disabled': !isFormFilled }"
                >
                  <span>{{ $t('bounty.submit') }}</span>
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
  import {mapGetters} from 'vuex'
  import {ValidationProvider, ValidationObserver} from 'vee-validate'
  import {Button} from '~/components/common';
  import UploadModal from '~/pages/bug-bounty/UploadModal'

  export default {
    name: 'LoginForm',
    components: { ValidationProvider, ValidationObserver, Button, UploadModal },
    data() {
      return {
        form: {
          bug_type: '',
          name: '',
          email: '',
          title: '',
          description: '',
          url: '',
          device_name: '',
          proof: '',
          is_agree: '',
          images: [],
          imagesList: [],

        },
      }
    },
    computed: {
      ...mapGetters({
        vendorDocRequirements: 'vendor-hub/vendorDocRequirements',
      }),
      fileRequirement() {
        return this.vendorDocRequirements.filter(req => req.name === 'Retail Certification')[0]
      },

    },
    methods: {
      getValidationState({ dirty, validated, valid = null }) {
        // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
        return dirty || validated ? valid : null
      },
      fileUploaded(form) {
        this.fileForm = form
        this.applyForm.certified_reseller = true
      },
      showModal() {
        this.showDocModal = !this.showDocModal
      },
      modalClosed() {
        this.showDocModal = false
      },
      createBug() {
          const config = {
            headers: { 'content-type': 'multipart/form-data' }
          }
          const formData = new FormData();
          formData.append('images[]', this.form.images);
          formData.append('bug_type', this.form.bug_type);
          formData.append('name', this.form.name);
          formData.append('email', this.form.email);
          formData.append('title', this.form.title);
          formData.append('description', this.form.description);
          formData.append('url', this.form.url);
          formData.append('device_name', this.form.device_name);
          formData.append('proof', this.form.proof);
          formData.append('is_agree', this.form.is_agree);
          this.$axios
            .post('contact-us', formData, config)
            .then((response) => {
              if(response.data.success) {
                this.$toasted.success(this.$t('bounty.form.bug_created'))
                this.$router.push('/bug-bounty')
              }
            })
            .catch((error) => {
              this.$toasted.error(error)
            })

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
  @media(min-width: 575px)
    .type-option
      background: $color-white-4
      border-radius: 20px
      padding: 10px
      height: 45px
      justify-content: center
  @media(max-width: 575px)
    .bug-type
      border: 1px solid $color-gray-3
      border-radius: 10px
      div
        border-bottom: 1px solid $color-gray-3
  </style>
