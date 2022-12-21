<template>
  <div>
    <hr class="my-3" />
    <b-row class="d-flex align-items-center body-9-medium px-3">
      <b-col cols="5">{{document.name}}</b-col>
      <b-col :cols="documentStatusText ? 5 : 7" :class="{'text-right': !documentStatusText.length}">
        <span v-if=documentStatusText class="status-text" :class="documentStatusText.toLowerCase()">{{ documentStatusText }}</span>
        <Button v-else pill class="bg-blue-20 body-9-normal" @click="$emit('upload', document)">
          {{ $t('vendor_hub.upload') }}
        </Button>
      </b-col>
      <b-col v-if="documentStatusText" cols="2" class="text-right">
        <a role="button" class="d-inline-block w-full p-1 text-black" @click="$emit('selected', document)">
          <img :src="require('~/assets/img/vendorhub/arrow-mobile.svg')" />
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash'
import {Button} from '~/components/common';
export default {
  name: 'DocumentMobileItem',
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
  color: $color-gray-4

.bg-blue-20.btn
  background-color: $color-blue-20
  border-color: $color-blue-20
</style>
