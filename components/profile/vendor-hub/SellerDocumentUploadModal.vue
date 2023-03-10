<template>
  <Modal id="cert-reseller-doc-upload" :hide-footer="true" @hidden="$emit('closed')">
    <h4 class="modal-title text-left mt-n4 mb-4">
      {{ $t('vendor_hub.documents') }}
    </h4>
    <hr class="header-divider position-absolute w-100"/>
    <div class="mt-4 mb-3">
      <div class="text-left">
        <h6 class="document-name-label">{{ $t('vendor_hub.document_name') }}</h6>
        <h4 class="document-name">{{ requirement ? requirement.name : $t('vendor_hub.retailer_certification') }}</h4>
      </div>

      <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
        <b-form @submit.stop.prevent="handleSubmit(uploadFile)">
          <div class="mt-3 text-left ">
            <h5 class="attach_documents">{{ $t('vendor_hub.attach_documents') }}</h5>

            <SelectedFile v-if="fileForm.file" :file="fileForm.file" :disabled="false"
                          @delete="fileForm.file = null "></SelectedFile>
            <ValidationProvider
              v-slot="{validate, errors }"
              :name="$t('vendor_hub.file')"
              :rules="{ required: true }"
            >
              <b-form-group
              >
                <div v-if="!fileForm.file" class="text-center drag_upload_area" @drop.prevent="onDrop"
                     @dragenter.prevent @dragover.prevent>
                  <br>
                  <img class="mb-2" :src="require('~/assets/img/icons/drag-drop-upload.svg')"/>
                  <br>
                  <span>{{ $tc('vendor_hub.drag_drop_here', 1) }}</span>
                  <br>
                  <span>{{ $tc('vendor_hub.drag_drop_here', 2) }}</span>
                  <br>
                  <input ref="file"
                         type="file" class="file-input" accept="image/jpeg, image/png, application/pdf"
                         @change="onFileChange($event) || validate($event)"/>
                  <b-button variant="link" class="text-primary mb-3" @click="BrowseFiles">{{
                      $t('vendor_hub.browse_files')
                    }}
                  </b-button>
                </div>
                <span class="accepted_document_type mt-2">{{ $t('vendor_hub.accepted_document_types') }}</span>

                <p v-if="errors.length>0" class="text-red my-1">
                  {{ errors[0] }} *
                </p>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div class="mt-3">
            <div class="form-group">
              <div class="form-row">
                <div class="col">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.seller_permit_number')"
                    :rules="{ required: true, min: 3}"
                  >
                    <b-form-group
                      label-for="seller-permit-number"
                      class="text-left input-label"
                    >
                      <template #label>
                        <label class="input-label">{{ $t('vendor_hub.seller_permit_number') }}</label>
                      </template>
                      <b-form-input
                        id="seller-permit-number"
                        v-model="fileForm.permitNumber"
                        type="text"
                        :state="getValidationState(validationContext)"
                        class="modal-form-input"
                        :placeholder="$t('vendor_hub.enter_permit_number')"></b-form-input>
                      <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </ValidationProvider>


                </div>
                <div class="col">
                  <ValidationProvider
                    v-slot="validationContext"
                    :name="$t('vendor_hub.expiration_date')"
                    :rules="{ required: true }"
                  >
                    <b-form-group
                      label-for="seller-permit-number"
                      class="text-left input-label"
                    >
                      <template #label>
                        <label class="input-label">{{ $t('vendor_hub.expiration_date') }}</label>
                      </template>
                      <b-input-group>
                        <CalendarInput
                          id="expiration-date"
                          :placeholder="$t('vendor_hub.expiration_date_placeholder')"
                          :value="fileForm.date"
                          :input-disabled="true"
                          :min-date="tomorrowDate"
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
          <Button variant="secondary" class="upload-btn" block :disabled="invalid || uploading || disabled" type="submit">
            {{ $t('vendor_hub.upload') }}
          </Button>
        </b-form>
      </ValidationObserver>
    </div>
  </Modal>
</template>

<script>
import {mapActions} from 'vuex';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import CalendarInput from '~/components/common/form/CalendarInput';
import {Modal, Button} from '~/components/common';
import SelectedFile from '~/components/profile/vendor-hub/SelectedFile';

export default {
  name: 'SellerDocumentUploadModal',
  components: {SelectedFile, CalendarInput, Modal, Button, ValidationObserver, ValidationProvider},
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
  watch: {
    show(val) {
      if (val) {
        this.$bvModal.show('cert-reseller-doc-upload');
        this.$nextTick(() => {
          this.fileForm = {
            file: this.form.file,
            permitNumber: this.form.permitNumber,
            date: this.form.date
          }
        })

      }
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
        this.$bvModal.hide('cert-reseller-doc-upload');
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

#cert-reseller-doc-upload
  padding: 20px

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

.modal-form-input
  @include body-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  background-color: $color-white-1
  border-radius: 6px
  border: 1px solid $color-gray-60
  padding: 10px 20px
  height: 38px

  &:focus
    outline: none
</style>
