<template>
  <div>
    <div class="mb-3">
      <div class="text-center">
        <h4 class="document-name">{{ requirement ? requirement.name : $t('vendor_hub.retailer_certification') }}</h4>
        <div class="mt-2 body-9-normal px-3">{{ $t('vendor_hub.accepted_document_types') }}</div>
      </div>

      <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
        <b-form @submit.stop.prevent="handleSubmit(uploadFile)">

          <div class="mt-3">
            <div class="form-group">
              <div class="form-row mx-5">
                <div class="col-12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.seller_permit_number')"
                    :rules="{ required: true, min: 3}"
                  >
                    <b-form-group class="text-left input-label">
                      <b-form-input
                        id="seller-permit-number"
                        v-model="fileForm.permitNumber"
                        type="text"
                        :state="getValidationState(validationContext)"
                        class="form-input rounded border bg-white"
                        :placeholder="$t('vendor_hub.enter_permit_number')"></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>


                </div>
                <div class="col-12">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.expiration_date')"
                    :rules="{ required: true }"
                  >
                    <b-form-group class="text-left input-label">
                      <b-input-group>
                        <CalendarInput
                          id="expiration-date"
                          :placeholder="$t('vendor_hub.expiration_date_placeholder')"
                          :value="fileForm.date"
                          :input-disabled="true"
                          :min-date="tomorrowDate"
                          groupClass="mr-0"
                          @context="calendarContextChange"
                        />
                        <b-form-invalid-feedback>{{
                            validationContext.errors[0]
                          }}
                        </b-form-invalid-feedback>
                      </b-input-group>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 text-left px-5 mx-1">
            <SelectedFile v-if="fileForm.file" :file="fileForm.file" :disabled="false"
                          @delete="fileForm.file = null "></SelectedFile>
            <ValidationProvider
              v-slot="{validate, errors }"
              :name="$t('vendor_hub.file')"
              :rules="{ required: true }"
            >
              <b-form-group
              >
                <div v-if="!fileForm.file" class="text-center">
                  <input ref="file"
                         type="file" class="file-input" accept="image/jpeg, image/png, application/pdf"
                         @change="onFileChange($event) || validate($event)"/>
                  <input ref="fileCapture"
                         type="file" class="file-input" accept="image/jpeg, image/png" capture
                         @change="onFileChange($event) || validate($event)"/>
                    <div class="d-flex justify-content-between px-5">
                      <a class="text-primary mb-3" @click="openCamera">
                        <div class="py-3 px-4 bg-gray-light rounded">
                          <img src="~/assets/img/icons/camera-2.svg" />
                        </div>
                        <span class="body-5-normal text-gray">{{ $t('vendor_hub.camera') }}</span>
                      </a>
                      <a class="text-primary mb-3"  @click="BrowseFiles">
                        <div class="py-3 px-4 bg-gray-light rounded">
                          <img src="~/assets/img/icons/gallery.svg" />
                        </div>
                        <span class="body-5-normal text-gray">{{ $t('vendor_hub.gallery') }}</span>
                      </a>
                      <a class="text-primary mb-3"  @click="BrowseFiles">
                        <div class="py-3 px-4 bg-gray-light rounded">
                          <img src="~/assets/img/icons/files.svg" />
                        </div>
                        <span class="body-5-normal text-gray">{{ $t('vendor_hub.browse') }}</span>
                      </a>
                    </div>
                  </div>


                <p v-if="errors.length>0" class="text-red my-1">
                  {{ errors[0] }} *
                </p>
              </b-form-group>
            </ValidationProvider>
          </div>

          <div class="mx-5 px-3">
            <Button variant="secondary" class="upload-btn rounded-pill" block :disabled="invalid || uploading || disabled" type="submit">
              {{ $t('vendor_hub.upload') }}
            </Button>
          </div>
        </b-form>
      </ValidationObserver>
      <a class="px-5 text-center" @click="$emit('close')">
        <div class="text-blue-20 body-8-medium cursor-pointer">{{ $t('vendor_hub.cancel') }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import CalendarInput from '~/components/common/form/CalendarInput';
import {Button} from '~/components/common';
import SelectedFile from '~/components/profile/vendor-hub/SelectedFile';

export default {
  name: 'SellerDocumentUploadModal',
  components: {SelectedFile, CalendarInput, Button, ValidationObserver, ValidationProvider},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {
        return {
          file: null,
          permitNumber: '',
          date: ''
        }
      }
    },
    requirement: {
      type: Object,
      required: true
    },
    uploading: {
      type: Boolean,
      required: false
    },
  },
  data() {
    return {
      disabled: false,
      fileForm: {
        file: null,
        permitNumber: '',
        date: ''
      }
    }
  },
  computed: {
    tomorrowDate() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow
    }
  },
  methods: {
    ...mapActions({
      createVendorDocument: 'vendor-hub/createVendorDocument',
    }),
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    calendarContextChange(ctx) {
      if (ctx.selectedYMD)
        this.fileForm.date = ctx.selectedYMD
    },
    BrowseFiles() {
      this.$refs.file.click()
    },
    openCamera() {
      this.$refs.fileCapture.click()
    },
    onFileChange(e) {
      this.fileForm.file = e.target.files[0] || e.dataTransfer.files[0]
    },
    onDrop(e) {
      if (e.dataTransfer.files.length > 0) {
        if (['image/jpeg', 'image/png', 'application/pdf'].includes(e.dataTransfer.files[0].type)) {
          this.fileForm.file = e.dataTransfer.files[0];
        }
      }
    },
    uploadFile() {
      this.disabled = true
      const formData = new FormData();
      const metaValues = {
        expiration_date: this.fileForm.date,
        seller_permit_no: this.fileForm.permitNumber
      }

      formData.append('document', this.fileForm.file)
      formData.append('requirement_id', this.requirement.id)
      formData.append('meta_values[seller_permit_no]', metaValues.seller_permit_no)
      formData.append('meta_values[expiration_date]', metaValues.expiration_date)

      this.createVendorDocument(formData).then(res => {
        this.$emit('uploaded', this.fileForm)
        this.$emit('close');
      }).catch(err => {
        this.$toasted.error(err.response.message)
      }).finally(() => {
        this.disabled = false
      })
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

input.file-input
  display: none

.upload-btn.btn
  background-color: $color-blue-2
  border: none


.header-divider
  margin-left: -24px
  top: 15px

.document-name-label
  @include body-5
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.document-name
  @include body-3
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal

.modal-title
  @include body-2
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold

.attach_documents
  @include body-5
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.drag_upload_area
  @include body-4
  border: dashed 3px $color-gray-4
  font-weight: $medium
  font-style: normal
  z-index: 99999999 !important
  color: $color-gray-5


:deep().bg-light
  position: initial !important


span.accepted_document_type
  @include body-9
  display: flex
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

label.input-label
  @include body-5
  width: 100%
  display: flex
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.form-input
  border: 1px solid $color-gray-60

.text-blue-20
  color: $color-blue-20

</style>
