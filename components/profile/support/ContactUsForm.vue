<template>
  <div class="contact-us-form">
    <div class="form-group">
      <label for="inputName">Name</label>
      <input id="inputName" v-model="form.name" type="text" class="form-control" :class="errorBorder(valid.name)"
             :placeholder="$t('contact_us.your_name')">
      <div v-if="valid.name==='no'" class="error-msg">{{$t('contact_us.please_enter_a_name')}}</div>
    </div>
    <div class="form-group">
      <label for="inputEmail">{{ $t('contact_us.email') }}</label>
      <input id="inputEmail" v-model="form.email" type="email" class="form-control" :class="errorBorder(valid.email)"
             aria-describedby="emailHelp"
             :placeholder="$t('contact_us.your_email_address')">
      <small id="emailHelp" class="form-text text-muted">{{$t('contact_us.we_will_never_share_your_email')}}</small>
      <div v-if="valid.email==='no'" class="error-msg">{{$t('contact_us.please_enter_a_valid_email_address')}}</div>
    </div>
    <div class="form-group">
      <label for="inputPhone">{{$t('contact_us.phone_optional')}}</label>
      <input id="inputPhone" v-model="form.phone" type="text" class="form-control" placeholder="( ) - ">
    </div>
    <div class="form-group" :class="errorBorder(valid.concern)">
      <label for="inputAreaOfConcern">{{ $t('contact_us.area_of_concern') }}</label>
      <CustomSelect
        id="category-types"
        :default="categorySelected"
        :threelineIcon="false"
        :options="{
              default: $t('contact_us.please_select_an_area_of_concern'),
              buying: $t('contact_us.buying'),
              selling: $t('contact_us.selling'),
              trading: $t('contact_us.trading'),
              seeking_partnership: $t('contact_us.seeking_partnership'),
              other: $t('contact_us.other')
            }"
        @input="handleSortByChange"
      />
      <div v-if="valid.concern==='no'" class="error-msg">{{$t('contact_us.please_enter_an_area_of_concern')}}</div>
    </div>
    <div class="form-group">
      <label for="inputOrderId">{{$t('contact_us.order_id_optional')}}</label>
      <input id="inputOrderId" v-model="form.orderId" type="text" class="form-control"
             :placeholder="$t('contact_us.please_enter_the_order_id_if_nec')">
    </div>
    <div class="form-group">
      <label for="inputSubject">Subject</label>
      <input id="inputSubject" v-model="form.subject" type="text" class="form-control"
             :class="errorBorder(valid.subject)"
             :placeholder="$t('contact_us.please_enter_your_message_subject')">
      <div v-if="valid.subject==='no'" class="error-msg">{{$t('contact_us.please_enter_a_subject')}}</div>
    </div>
    <div class="form-group">
      <label for="inputDescription">{{$t('contact_us.description')}}</label>
      <textarea id="inputDescription" v-model="form.description" type="text" class="form-control"
                :class="errorBorder(valid.description)"
                :placeholder="$t('contact_us.how_can_we_help_you')"
                rows="3"></textarea>
      <div v-if="valid.description==='no'" class="error-msg">{{$t('contact_us.please_enter_a_description')}}</div>
    </div>
    <div class="d-flex justify-content-start align-items-center">
      <file-upload-button @change="fileChanged"></file-upload-button>
      <div v-if="file" class="filename">{{ file.name }}
        <img :src="require('/assets/img/icons/close-round.svg')" @click="fileRemoved"/></div>
      <button type="submit" class="btn btn-primary px-5 ml-auto d-none d-md-block" @click="submitted">{{$t('contact_us.submit')}}</button>
    </div>
    <transparent-alert-modal :show="showModal" text="Ticket Created! We’ll start looking into your issue as soon as possible."></transparent-alert-modal>
  </div>
</template>

<script>
import {CustomSelect} from '~/components/common';
import FileUploadButton from '~/components/profile/support/FileUploadButton';
import TransparentAlertModal from '~/components/common/TransparentAlertModal';

export default {
  name: 'ContactUsForm',
  components: {
    CustomSelect,
    FileUploadButton,
    TransparentAlertModal
  },
  data() {
    return {
      categorySelected: '',
      file: null,
      showModal: false,
      form: {
        name: '',
        email: '',
        phone: '',
        concern: '',
        orderId: '',
        subject: '',
        description: ''
      },
      valid: {
        name: '',
        email: '',
        concern: '',
        subject: '',
        description: ''
      }
    }
  },
  methods: {
    errorBorder(field) {
      return field === 'no' ? 'error-border' : ''
    },
    handleSortByChange(e) {
      this.form.concern = e
    },
    fileChanged(e) {
      this.file = e.target.files[0]
    },
    fileRemoved() {
      this.file = null
    },
    submitted(e) {
      this.formValidate()
      if (!this.allValid()) {
        return false
      }
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('email', this.form.email)
      formData.append('phone', this.form.phone)
      formData.append('concern', this.form.concern)
      formData.append('orderId', this.form.orderId)
      formData.append('subject', this.form.subject)
      formData.append('description', this.form.description)
      formData.append('image', this.file)

      this.showModal = false
      this.$axios.post('/save-contact-us', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .then(resp => {
          this.showModal = true
          this.resetForm()
        })
        .catch(err => {

        })

    },
    formValidate() {
      this.valid.name = (this.form.name === '') ? 'no' : 'yes'
      this.valid.email = (this.form.email === '') ? 'no' : 'yes'
      this.valid.concern = (this.form.concern === '') ? 'no' : 'yes'
      this.valid.subject = (this.form.subject === '') ? 'no' : 'yes'
      this.valid.description = (this.form.description === '') ? 'no' : 'yes'
    },
    allValid() {
      return !Object.values(this.valid).includes('no')
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        concern: '',
        orderId: '',
        subject: '',
        description: ''
      }
      this.file = null
      this.categorySelected = ''
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.contact-us-form
  font-family: $font-montserrat-serif

  label
    @include body-5-normal

  .form-control
    background: $color-white-1
    border-radius: 20px

  ::v-deep .custom-selectbox, ::v-deep .custom-selectbox .selected
    background: $color-white-1
    border-radius: 20px

  ::v-deep .border-bottom
    border-bottom: none !important

  .btn.btn-primary
    background: $color-gray-47
    border: none
    border-radius: 20px
    color: $color-white-1

  .error-msg
    color: $color-red-3
    @include body-5-regular

  .form-control.error-border
    border: 1px solid $color-red-3

  .error-border
    ::v-deep .custom-selectbox
      border: 1px solid $color-red-3 !important

.filename
  color: $color-blue-1

  img
    cursor: pointer

@media (max-width: 767px)
  .contact-us-form
    .form-control
      border: 1px solid $white-5
      border-radius: 10px

    ::v-deep .border-bottom
      border-radius: 10px
      border: 1px solid $white-5 !important

</style>
