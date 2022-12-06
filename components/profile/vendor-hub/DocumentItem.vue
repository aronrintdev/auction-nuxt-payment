<template>
  <b-row>
    <div class="mr-3 file-icon">
      <img :src="require('~/assets/img/profile/vendor-hub/document.svg')">
    </div>
    <b-col sm="12" md="3" class="d-flex flex-column">
      <span class="column-label">{{$t('vendor_hub.document_name')}}</span>
      <span class="row-body document-name">{{document.name}}</span>
      <span v-if="fieldExist('url')" class="row-body document-file" role="button" @click="$emit('download', documentFile)">File</span>
      <span v-if="fieldExist('created_at')" class=" body-secondary-text">{{$t('vendor_hub.documents_tab.upload_date')}} {{documentFile.created_at | formatDate}}</span>
    </b-col>

    <b-col sm="12" md="4" class="d-flex flex-column">
      <span class="column-label">{{$t('vendor_hub.documents_tab.document_status')}}</span>
      <span class="row-body status-text" :class="documentStatusText.toLowerCase()">{{ documentStatusText }}</span>
      <span v-if="fieldExist('meta_values.seller_permit_no')" class=" body-secondary-text" role="button">{{$t('vendor_hub.documents_tab.seller_permit_number')}} {{documentFile.meta_values.seller_permit_no}}</span>
      <span v-if="fieldExist('meta_values.expiration_date')" class=" body-secondary-text">{{$t('vendor_hub.documents_tab.expire_date')}} {{documentFile.meta_values.expiration_date}}</span>
    </b-col>

    <b-col sm="12" md="4" class="d-flex flex-column">
      <span class="column-label">{{$t('vendor_hub.actions')}}</span>
      <Button
        v-if="!fieldExist('url')"
        pill
        class="mt-4 action-button"
        @click="$emit('upload', document)"
      >
        {{$t('vendor_hub.documents_tab.upload_form')}}
      </Button>

      <Button
        v-if="fieldExist('url')"
        pill
        class="mt-3 action-button w-100"
        @click="$emit('re-upload', document)"
      >
        {{$t('vendor_hub.documents_tab.re_upload_form')}}
      </Button>

      <Button
        v-if="fieldExist('url')"
        variant="outline-primary"
        class="mt-3 action-button"
        pill
        @click="$emit('download', document)"
      >
        {{$t('vendor_hub.documents_tab.download_form')}}
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import _ from 'lodash'
import {Button} from '~/components/common';
export default {
  name: 'DocumentItem',
  components: {Button},
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    documentStatusText(){
      return this.fieldExist('url')
        ? this.$t('vendor_hub.documents_tab.document_status_'+ this.documentFile.status.toLowerCase())
        : this.$t('vendor_hub.documents_tab.document_status_not_started')
    },
    documentFile(){
      return this.document.document
    }
  },
  methods:{
    fieldExist(field){
      return _.get(this.documentFile, field, false);
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.status-text.approved
  color: rgba($color-green-15, 1)

.status-text.action_required
  color: rgba($color-orange-1, 1)

.status-text
  &.resubmission_required,.expired
    color: rgba($color-red-3, 1)

.status-text
  @include body-3
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  color: $color-gray-4

.body-secondary-text
  @include body-5
  margin-top: 4px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  color: $color-gray-5

.document-file
  @include body-5
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  text-decoration-line: underline
  color: $color-blue-1

.row-body
  margin-top: 22px
  @include body-3
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal

.btn-primary.btn
  background: $color-blue-20
  &:hover
    background: rgba($color-blue-20, .9)

.btn-outline-primary.btn
  color: $color-blue-20
  &:hover
    background: rgba($color-blue-20, .9)

.action-button.btn
  padding-block: 20px
  max-width: max-content
  border: 1px solid $color-blue-20

.column-label
  @include body-4
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.file-icon
  margin-top: 40px
</style>
