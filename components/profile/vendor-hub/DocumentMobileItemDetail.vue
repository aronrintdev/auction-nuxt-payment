<template>
  <div class="flex-grow-1">
    <div class="status-text body-9-medium text-right w-100" :class="documentStatusText.toLowerCase()">
      {{ documentStatusText }}
    </div>
    <hr />
    <div class="bg-gray-light rounded mt-3 p-3">
      <div class="flex">
        <img :src="require('~/assets/img/profile/vendor-hub/document.svg')" class="img">
        <span class="body-5-normal text-decoration-underline">{{document.name}}</span>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <span class="body-9-regular text-gray-24">{{ $t('vendor_hub.documents_tab.seller_permit_number') }}</span>
        <span class="body-9-regular text-gray-24">{{ documentFile.meta_values.seller_permit_no }}</span>
      </div>
      <div class="d-flex justify-content-between mt-1">
        <span class="body-9-regular text-gray-24">{{ $t('vendor_hub.documents_tab.expire_date') }}</span>
        <span class="body-9-regular text-gray-24">{{ documentFile.meta_values.expiration_date }}</span>
      </div>
    </div>
    <div class="text-right w-100 body-9-regular text-gray-24 mt-2">
      {{ $t('vendor_hub.documents_tab.upload_date') }} {{documentFile.created_at | formatDate}}
    </div>
    <div v-if="fieldExist('url')" class="mt-3 text-center">
      <Button pill class="bg-blue-20 body-9-normal" @click="$emit('upload', document)">
        {{$t('vendor_hub.documents_tab.re_upload_form')}}
      </Button>
    </div>
    <div v-if="fieldExist('url')" class="mt-3 text-center">
      <a role="button" @click="$emit('download', document)">
        <span class="text-blue-20 body-9-normal">{{$t('vendor_hub.documents_tab.download_form')}}</span>
      </a>
    </div>
    <div class="mt-3 text-center">
      <a role="button" @click="$emit('selected', null)">
        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {Button} from '~/components/common'
export default {
  name: 'DocumentMobileItemDetail',
  components: {Button},
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    documentStatusText(){
      return this.fieldExist('url')? this.$t('vendor_hub.documents_tab.document_status_'+ this.documentFile.status.toLowerCase()) : ''
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
  color: $color-orange-6
  margin-top: -15px

.bg-blue-20.btn
  background-color: $color-blue-20
  border-color: $color-blue-20

.text-blue-20
  color: $color-blue-20

.img
  width: 18px
  height: auto
</style>
